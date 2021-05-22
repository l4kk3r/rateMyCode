const mongoose = require('mongoose')

const questionModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    creator_id: {
        type: mongoose.ObjectId,
        required: true
    }
}, {timestamps: true})

mongoose.model("Question", questionModel)