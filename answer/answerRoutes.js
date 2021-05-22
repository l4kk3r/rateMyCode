const express = require('express')
const router = express.Router()

const authenticateToken = require('../user/userMiddlewares').authenticateToken

const answerControllers = require('./answerControllers')

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
 *     Database_Answer:
 *       type: object
 *       required:
 *         - body
 *         - rating
 *       properties:
 *         _id:
 *           type: ObjectId,
 *           description: Autogen MongoDB id
 *         creator_id:
 *           type: ObjectId,
 *           description: MongoDB id of creator of answer
 *         question_id:
 *           type: ObjectId,
 *           description: MongoDB id of question
 *         body:
 *           type: string
 *           description: Answer body
 *         rating:
 *           type: string
 *           description: Rating of code in question
 *       example:
 *         _id: ObjectId(60a8225027a877841cc7c062)
 *         creator_id: ObjectId(60a83049ac3a8ba934465d91)
 *         question_id: ObjectId(60a83049ac3a8ba934465d90)
 *         body: Wow! Nice code!
 *         rating: 5
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Request_Answer:
 *       type: object
 *       required:
 *         - body
 *         - rating
 *       properties:
 *         body:
 *           type: string
 *           description: Answer body
 *         rating:
 *           type: string
 *           description: Rating of code in question
 *       example:
 *         body: Wow! Nice code!
 *         rating: 5
 */

/**
 * @swagger
 * tags:
 *   name: Answer
 *   description: The answers managing API
 */

/**
 * @swagger
 * /answer:
 *   get:
 *     summary: Get list of all answers
 *     tags: [Answer]
 *     responses:
 *       200:
 *         description: The list of the answers
 *         contents:
 *           application/json:
 *           schema:
 *             type: array
 *           items:
 *             $ref: '#/components/schemas/Database_Answer'
 */

/**
 * @swagger
 * /answer/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get answer by id
 *     tags: [Answer]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: answer id
 *     responses:
 *       200:
 *         description: The answer data
 *         contents:
 *           application/json:
 *           schema:
 *             type: array
 *           items:
 *             $ref: '#/components/schemas/Database_Answer'
 */

/**
 * @swagger
 * /answer/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update answer by id
 *     tags: [Answer]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Request_Answer'
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: Answer id
 *     responses:
 *       200:
 *         description: The answer data
 *         contents:
 *           application/json:
 *           schema:
 *             type: array
 *           items:
 *             $ref: '#/components/schemas/Database_Answer'
 */

/**
 * @swagger
 * /answer/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete answer by id
 *     tags: [Answer]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: Answer id
 *     responses:
 *       200:
 *         description: The answer data
 *         contents:
 *           application/json:
 *           schema:
 *             type: array
 *           items:
 *             $ref: '#/components/schemas/Database_Answer'
 */

/**
 * @swagger
 * /answer:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new answer
 *     tags: [Answer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request_Answer'
 *     responses:
 *       200:
 *         description: The answer data
 */

router.post("/", answerControllers.createAnswer)
router.patch("/:id", authenticateToken, answerControllers.updateAnswer)
router.delete("/:id", authenticateToken, answerControllers.deleteAnswer)

module.exports = router
