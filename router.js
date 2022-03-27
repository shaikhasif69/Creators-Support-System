const express= require('express')
const router = express.Router()
const Ticket = require('./models/Ticket')
const userController = require('./controllers/userController')
const campaignController = require('./controllers/campaignController')
const ticketController = require('./controllers/campaignController')


router.get('/', userController.home)
router.post('/register', userController.register)
router.get('/signin', userController.signin)
router.get('/signUp', userController.signUp)
router.post('/login', userController.login)
router.post('/logout', userController.logout)


//Testing purposes
router.get('/add', campaignController.addCampaign)


//ticket related routes
router.post('/raise-ticket', ticketController)
module.exports = router
