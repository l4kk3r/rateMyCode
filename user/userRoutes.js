const express = require('express')
const router = express.Router()

const userControllers = require('./userControllers')

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - bearerAuth: []   
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Database_User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         _id:
 *           type: ObjectId,
 *           description: Autogen MongoDB id
 *         name:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description: User email
 *         knownLanguages:
 *           description: List of users known programming languages
 *           type: array
 *           items: 
 *             type: string
 *         hashedPassword:
 *           type: string
 *           description: Autohashed password (via bcryptjs)
 *       example:
 *         _id: ObjectId(60a8225027a877841cc7c062)
 *         name: John
 *         email: johndoe@yandex.ru
 *         knownLanguages: [Python, Go, C++]
 *         hashedPassword: $2a$10$3hgvJV1fh8HJr6iVXMSYRu06/e1ZUk50SxNpevWFikICyI1t78feG
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Request_User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - passwordConfirm
 *       properties:
 *         _id:
 *           type: ObjectId,
 *           description: Autogen MongoDB id
 *         name:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description: User email
 *         knownLanguages:
 *           description: List of users known programming languages
 *           type: array
 *           items: 
 *             type: string
 *         password:
 *           type: string
 *           description: User password
 *         confirmPassword:
 *           type: string
 *           description: Repeated user password (to prevent mispelling)
 *       example:
 *         name: John
 *         email: johndoe@yandex.ru
 *         knownLanguages: [Python, Go, C++]
 *         password: JohnPassword123
 *         confirmPassword: JohnPassword123
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The users managing API
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get user by id
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     responses:
 *       200:
 *         description: The user data
 *         contents:
 *           application/json:
 *           schema:
 *             type: array
 *           items:
 *             $ref: '#/components/schemas/Database_User'
 */

/**
 * @swagger
 * /user:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request_User'
 *     responses:
 *       200:
 *         description: The user data
 */
router.post("/", userControllers.userCreate)
router.get("/:id", userControllers.userGetById)

module.exports = router