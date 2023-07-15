require('dotenv').config();
const express = require('express')
const session = require('express-session')
const authRouter = require('./routes/auth')
const listRouter = require('./routes/list')
const app = express()

//App Set
app.set('view engine', 'ejs')

//App Use
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
}))
const isAuth = (req, res, next) => {
    if(req.session.isAuth) {
        next()
    } else {
        res.status(401).redirect('/')
    }
}
app.use('/ToDo/', isAuth)
app.use('/', authRouter)
app.use('/', listRouter)

app.all('/:err', (req, res) => {
    res.status(404).render('404')
})
app.listen(process.env.PORT || 5000, () => console.log("Server: http://localhost:5000/"))
