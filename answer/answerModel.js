const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    creator_id: {
        type: mongoose.ObjectId,
        required: true
    },
    question_id: {
        type: mongoose.ObjectId,
        required: true
    }
}, {timestamps: true})

mongoose.model("Answer", answerSchema)