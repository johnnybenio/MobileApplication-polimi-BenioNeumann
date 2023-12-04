const { default: mongoose } = require('mongoose');
const mongoDB = require('mongoose')

const UserRelation = new mongoDB.Schema({
    username : {type: String, required: true},
    email : {type: String, required: true, unique: true}, // unique so that users don't user the same email for different accounts
    password : {type: String, required: true},
}, { timestamps: true });

module.exports = mongoose.model("User", UserRelation)