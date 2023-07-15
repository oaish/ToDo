const mongoose = require('mongoose')
const mongoURI = "mongodb://0.0.0.0:27017/ToDo"
const atlasURI = "mongodb+srv://mercenary:adgjmptw786@mercenarycluster.k8r01yr.mongodb.net/ToDo?retryWrites=true&w=majority"
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

