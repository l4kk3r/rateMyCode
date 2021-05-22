const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')

process.env.TZ = 'Europe/Moscow';
const PORT = process.env.PORT || 8080;

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./database_connection')
require('./user/userModel')
require('./question/questionModel')
require('./answer/answerModel')

const authRoutes = require('./auth/authRoutes')
const userRoutes = require('./user/userRoutes')
const questionRoutes = require('./question/questionRoutes')
const answerRoutes = require('./answer/answerRoutes')
app.use('/auth/', authRoutes)
app.use('/user/', userRoutes)
app.use('/question/', questionRoutes)
app.use('/answer/', answerRoutes)

const swaggerSpecs = require('./swagger_connection')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))