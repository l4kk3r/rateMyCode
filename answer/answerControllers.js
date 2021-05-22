const mongoose = require('mongoose')
const Answer = mongoose.model("Answer") 
const answerErrors = require('./answerErrors')

const validators = require('./answerJoiValidators')

exports.createAnswer = async (req, res) => {
    try {

        await validators.createValidator.validateAsync(req.body)

        const answer = new Answer(req.body)
        answer.creator_id = req.user._id
        await answer.save()

        res.json({ message: 'Answer created!' })

    } catch (err) {

        let errorMessage = 'Unknown error'
        if (err.isJoi) {
            errorMessage = answerErrors.joiError(err)
        }

        res.status(422).json({ errorMessage })

    }
}

exports.updateAnswer = async (req, res) => {
    try {

        await validators.updateValidator.validateAsync(req.body)

        const answer = await Answer.findOne({_id: req.params.id})
        if (!(answer.creator_id !== req.user._id)) return res.status(403).json({ errorMessage: "Forbidden" })

        await Answer.updateOne({_id: req.params.id}, {$set: req.body})

        res.json({ message: 'Answer updated!' })

    } catch (err) {

        let errorMessage = 'Unknown error'
        if (err.isJoi) {
            errorMessage = answerErrors.joiError(err)
        }
        res.status(422).json({ errorMessage })

    }
}

exports.deleteAnswer = async (req, res) => {
    try {

        await validators.updateValidator.validateAsync(req.body)

        if (!(answer.creator_id !== req.user._id)) return res.status(403).json({ errorMessage: "Forbidden" })
        await Answer.deleteOne({_id: req.params.id})
        
        res.json({ message: 'Answer deleted!' })

    } catch (err) {

        let errorMessage = 'Unknown error'
        if (err.isJoi) {
            errorMessage = answerErrors.joiError(err)
        }
        res.status(422).json({ errorMessage })

    }
}