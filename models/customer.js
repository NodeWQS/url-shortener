const { Schema, model } = require('mongoose')

const customerSchema = new Schema({
    username: { type: String, unique: true, length: 20 },
    email: { type: String, unique: true, length: 50 },
    password: String,
    name: String,
    coins: { type: Number, default: 0 },
    registred_at: { type: Date, default: Date.now },
    
})

module.exports = model('customer', customerSchema)