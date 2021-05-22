const mongoose = require('mongoose')
const User = mongoose.model("User")
const Question = mongoose.model("Question")
const Answer = mongoose.model("Answer")
const bcrypt = require('bcryptjs')
const userErrors = require('./userErrors')

const validators = require('./userJoiValidators')

const saltRounds = 10

exports.userCreate = async (req, res) => {
    try {

        await validators.createValidator.validateAsync(req.body)

        const user = new User(req.body)
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
        user.hashedPassword = hashedPassword
        await user.save()

        res.json({ message: 'User created!' })

    } catch (err) {

        let errorMessage = 'Unknown error'

        if (err.name === 'MongoError') {
            errorMessage = userErrors.mongooseError(err)
        }
        else if (err.isJoi) {
            errorMessage = userErrors.joiError(err)
        }
        
        res.status(422).json({ errorMessage })

    }
}

exports.userGetById = async (req, res) => {
    try {

        const user = await User.findById({_id: req.params.id})

        if (!user) return res.status(404).json({ errorMessage: "User not found" })

        const createdQuestions = await Question.find({creator_id: req.params.id})
        const answeredQuestions = []
        const answers = await Answer.find({creator_id: req.params.id})
        answers.forEach(answer => {
            const answeredQuestion = Question.find({_id: answer.question_id})
            answeredQuestion.user_answer = answer
            answeredQuestions.push(answeredQuestion)
        })

        return res.json({ user, createdQuestions, answeredQuestions })

    } catch (err) {

        let errorMessage = 'Unknown error'
        res.status(422).json({ errorMessage })

    }
}