const mongoose = require('mongoose')
const config = require('./config.json')

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => console.log('MongoDB connected'))
mongoose.connection.on('error', () => console.log('Failed to connect MongoDB'))