const mongoose = require('mongoose')
const atlasURI = process.env.MONGO
const Schema = mongoose.Schema;
const Model = mongoose.model;

mongoose.connect(atlasURI || mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

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

