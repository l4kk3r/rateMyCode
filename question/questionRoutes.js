const express = require('express')
const router = express.Router()

const questionControllers = require('./questionControllers')

const authenticateToken = require('../user/userMiddlewares').authenticateToken

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
 *     Database_Question:
 *       type: object
 *       required:
 *         - title
 *         - code
 *         - language
 *       properties:
 *         _id:
 *           type: ObjectI,
 *           description: Autogen MongoDB id
 *         creator_id:
 *           type: ObjectI,
 *           description: MongoDB id of creator of question
 *         title:
 *           type: string
 *           description: Question title
 *         code:
 *           type: string
 *           description: Question body (users code to review)
 *         language:
 *           type: string
 *           description: Programming language of users code
 *       example:
 *         _id: ObjectId(60a8225027a877841cc7c062)
 *         creator_id: ObjectId(60a83049ac3a8ba934465d91)
 *         title: Is my code looks like Seniors?
 *         code: console.log('Hello World')
 *         language: Node.JS
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Request_Question:
 *       type: object
 *       required:
 *         - title
 *         - code
 *         - language
 *       properties:
 *         title:
 *           type: string
 *           description: Question title
 *         code:
 *           type: string
 *           description: Question body (users code to review)
 *         language:
 *           type: string
 *           description: Programming language of users code
 *       example:
 *         title: Is my code looks like Seniors?
 *         code: console.log('Hello World')
 *         language: Node.JS
 */

/**
 * @swagger
 * tags:
 *   name: Question
 *   description: The questions managing API
 */

/**
 * @swagger
 * /question:
 *   get:
 *     summary: Get list of all questions
 *     tags: [Question]
 *     responses:
 *       200:
 *         description: The list of the questions
 *         contents:
 *           application/json:
 *           schema:
 *             type: array
 *           items:
 *             $ref: '#/components/schemas/Database_Question'
 */

/**
 * @swagger
 * /question/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get question by id
 *     tags: [Question]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: Question id
 *     responses:
 *       200:
 *         description: The question data
 *         contents:
 *           application/json:
 *           schema:
 *             type: array
 *           items:
 *             $ref: '#/components/schemas/Database_Question'
 */

/**
 * @swagger
 * /question/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update question by id
 *     tags: [Question]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Request_Question'
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: Question id
 *     responses:
 *       200:
 *         description: The question data
 *         contents:
 *           application/json:
 *           schema:
 *             type: array
 *           items:
 *             $ref: '#/components/schemas/Database_Question'
 */

/**
 * @swagger
 * /question/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete question by id
 *     tags: [Question]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: Question id
 *     responses:
 *       200:
 *         description: The question data
 *         contents:
 *           application/json:
 *           schema:
 *             type: array
 *           items:
 *             $ref: '#/components/schemas/Database_Question'
 */

/**
 * @swagger
 * /question:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new question
 *     tags: [Question]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request_Question'
 *     responses:
 *       200:
 *         description: The question data
 */

router.post("/", authenticateToken, questionControllers.questionCreate)
router.get("/", questionControllers.questionsGetAll)
router.get("/:id", authenticateToken, questionControllers.questionGetById)
router.put("/:id", authenticateToken, questionControllers.questionUpdate)
router.delete("/:id", authenticateToken, questionControllers.questionDelete)

module.exports = router