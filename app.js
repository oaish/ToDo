require('dotenv').config();
const express = require('express')
const session = require('express-session')
const authRouter = require('./routes/auth')
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
    saveUninitialized: false
}))
app.use('/', authRouter)

app.listen(5000, () => console.log("Server: http://localhost:5000/"))
