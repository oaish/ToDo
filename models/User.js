const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/ToDo"
const Schema = mongoose.Schema;
const Model = mongoose.model;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [String]
})

const User = Model("User", UserSchema);

module.exports = User;

