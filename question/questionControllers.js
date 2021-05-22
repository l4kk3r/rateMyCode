const mongoose = require('mongoose')
const Question = mongoose.model("Question")
const Answer = mongoose.model("Answer")
const questionErrors = require('./questionErrors')

const questionValidator = require('./questionJoiValidator')

exports.questionCreate = async (req, res) => {
    try {

        await questionValidator.validateAsync(req.body)

        const question = new Question(req.body)
        question.creator_id = req.user._id
        await question.save()
        
        res.json({ message: 'Question created!' })

    } catch (err) {

        let errorMessage = 'Unknown error'
        if (err.isJoi) {
            errorMessage = questionErrors.joiError(err)
        }

        res.status(422).json({ errorMessage })

    }
}

exports.questionsGetAll = async (req, res) => {
    try {

        const language = req.query.language
        let questions = []

        if (language) {
            questions = await Question.find({language})
        } else {
            questions = await Question.find({})
        }

        res.json({ questions })

    } catch (err) {

        res.status(403).json({ errorMessage: "Unknown Error" })

    }
}

exports.questionGetById = async (req, res) => {
    try {

        const question = await Question.findOne({ _id: req.params.id })
        if (!question) return res.status(404).json({ errorMessage: "Question not found" })

        const answers = await Answer.find({ question_id: req.params.id })

        res.json({ question, answers })

    } catch (err) {

        res.status(403).json({ errorMessage: "Unknown Error" })

    }
}

exports.questionUpdate = async (req, res) => {
    try {

        await questionValidator.validateAsync(req.body)

        const question = await Question.find({ _id: req.params.id })
        if (!question) return res.status(404).json({ errorMessage: "Question not found" })
        if (!(question.creator_id !== req.user._id)) return res.status(403).json({ errorMessage: "Forbidden" })
        
        await Question.updateOne({_id: req.params.id}, {$set: req.body})

        res.json({ message: "Question changed" })

    } catch (err) {

        let errorMessage = 'Unknown error'
        if (err.isJoi) {
            errorMessage = questionErrors.joiError(err)
        }
        res.status(403).json({ errorMessage })

    }
}

exports.questionDelete = async (req, res) => {
    try {

        const question = await Question.find({ _id: req.params.id })
        if (!question) return res.status(404).json({ errorMessage: "Question not found" })
        if (!(question.creator_id !== req.user._id)) return res.status(403).json({ errorMessage: "Forbidden" })

        await Question.deleteOne({_id: req.params.id})

        res.json({ message: "Question deleted" })

    } catch (err) {
        
        res.status(403).json({ errorMessage: "Unknown Error" })

    }
}