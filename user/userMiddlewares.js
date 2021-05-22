const jwt = require('jsonwebtoken')
const config = require('../config.json')

exports.authenticateToken = (req, res, next) => {
    // Необходимо отправлять заголовок вида: Authorization: Bearer TOKEN
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ errorMessage: 'Authorization token is required' })

    jwt.verify(token, config.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ errorMessage: 'Invalid token' })
        req.user = user.user
        next()
    })
}