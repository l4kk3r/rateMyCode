const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    knownLanguages: [{
        type: String
    }],
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    hashedPassword: {
        type: String,
        required: true
    }
}, {timestamps: true})

mongoose.model("User", userSchema)