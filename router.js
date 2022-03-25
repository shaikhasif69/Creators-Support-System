const express= require('express')
const router = express.Router()
const Ticket = require('./models/Ticket')
//Testing routes
router.get('/', function(req, res){
    res.send("Everything is working")
})



module.exports = router
