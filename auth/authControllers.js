const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config.json')

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await User.findOne({email})
        if (!user) throw new Error('authentication')
        
        const isPasswordCorrect = await bcrypt.compareSync(password, user.hashedPassword)
        if (!isPasswordCorrect) throw new Error('authentication')

        const jwtToken = jwt.sign({ user }, config.JWT_SECRET)

        res.json({ message: 'Loged in', user, jwtToken })

    } catch (err) {

        let errorMessage = 'Unknown error'
        if (err.message === 'authentication') {
            errorMessage = 'User with this pair of email and password does not exists'
        }

        res.status(422).json({ errorMessage })

    }
}