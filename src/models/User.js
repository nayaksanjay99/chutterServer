const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    name: String,
    username: String,
    phoneNo: Number,
    password: String
})

module.exports = model('User', userSchema)