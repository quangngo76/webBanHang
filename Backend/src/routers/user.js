const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router.post('/addUser', UserController.addUser)
router.get('/getUser', UserController.getUser)
router.post('/deleteUser', UserController.deleteUser)

module.exports = router