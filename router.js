const express= require('express')
const router = express.Router()
const Ticket = require('./models/Ticket')
const userController = require('./controllers/userController')


router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router
