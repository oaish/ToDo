const express = require('express');
const User = require('../models/User')
const router = express.Router();

router.get('/ToDo/', async (req, res) => {
    const user = await User.findOne({username: req.session.user})
    const date = new Date().toLocaleString("en", {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });
    res.render('main', {user: user.username, title: date, tasks: user.tasks})
});

router.post('/ToDo/add', async (req, res) => {
    const user = await User.findOne({ username: req.session.user });
    user.tasks.push(req.body.insert);
    await user.save();
    res.json({ success: true });
})

router.post('/ToDo/remove', async (req, res) => {
    const user = await User.findOne({ username: req.session.user });
    let arr = user.tasks;
    arr.splice(arr.indexOf(req.body.delete), 1)
    user.tasks = arr
    await user.save();
    res.json({ success: true });
})

module.exports = router;
