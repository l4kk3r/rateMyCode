exports.mongooseError = (err) => {
    if (err.code === 11000) {
        const repeatedField = Object.keys(err.keyPattern)[0]
        return `User with this ${repeatedField} already exists`
    }
    return 'Unknown DataBase Error'
}

exports.joiError = (err) => err.message