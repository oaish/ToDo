const express = require("express")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const router = express.Router()

router.get('/', (req, res) => {
    if(req.session.isAuth) {
        res.redirect('/ToDo/')
    } else {
        res.render("auth")
    }
})

router.post('/login', async (req, res) => {
    const cred = req.body;
    const username = cred.username.trim()
    const user = await User.findOne({username: username})
    if (!user)
        return res.status(400).json({
            error: true,
            title: 'Authentication failed',
            msg: 'Username or Password is incorrect'
        })

    const isValid = await bcrypt.compare(cred.password, user.password)
    if (isValid) {
        req.session.isAuth = true;
        req.session.user = username;
        res.status(200).json({auth: true})
    } else {
        res.status(400).json({
            error: true,
            title: 'Authentication failed',
            msg: 'Username or Password is incorrect'
        })
    }
})

router.post('/signup', async (req, res) => {
    const cred = req.body
    const username = cred.username.trim()
    const userExists = await User.findOne({username: username})
    if (userExists) {
        return res.status(400).json({
            error: true,
            title: 'Username is Taken',
            msg: 'Please try a different username'
        })
    }
    const hashedPwd = await bcrypt.hash(cred.password, 10)
    const user = new User({
        username: username,
        password: hashedPwd,
        pwd: cred.password,
        tasks: []
    })
    await user.save()
    res.status(201).json({
        auth: true,
        error: false,
        title: 'Account Created',
        msg: 'You can log into your account now'
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy()
    res.json({destroy: true})
})



module.exports = router