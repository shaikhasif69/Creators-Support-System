const express= require('express')
const router = express.Router()
const Ticket = require('./models/Ticket')
const userController = require('./controllers/userController')
const campaignController = require('./controllers/campaignController')
const ticketController = require('./controllers/ticketController')


router.get('/', userController.home)
router.post('/register', userController.register)
router.get('/signin', userController.signin)
router.get('/signUp', userController.signUp)
router.post('/login', userController.login)
router.post('/logout', userController.logout)


//Testing purposes
router.get('/add', campaignController.addCampaign)


//ticket related routes
router.post('/raise-ticket/:id',  ticketController.raiseTicket)
router.get('/raise-ticket-form/:id',userController.mustBeInfluencer, ticketController.displayTicketForm)

//frontend manager related
router.get('/idk', userController.pageLoad)
router.get('/dashboard', userController.displayDashboard)
router.get('/answer-ticket/:id', userController.mustBeManager ,ticketController.openReplyForm)

module.exports = router
