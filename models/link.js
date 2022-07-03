const { Schema, model } = require('mongoose')

const linkSchema = new Schema({
    link: { type: String, unique: true },
    short_url: String,
    created_at: { type: Date, default: Date.now }
})

module.exports = model('link', linkSchema)
