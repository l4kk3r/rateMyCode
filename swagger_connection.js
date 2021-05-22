const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "rateMyCode API",
            version: "1.0.0",
            description: "rateMyCode - forum for exchange of experience between coders.",
            contact: {
                name: "Tim Vetkin"
            }
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ],
    },
    apis: ["./*/*Routes.js"]
}

const specs = swaggerJsDoc(options)

module.exports = specs