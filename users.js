var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    fname:String,
    lname:String,
    age:Number
})

var Users = mongoose.model('Users',usersSchema)

module.exports = Users;