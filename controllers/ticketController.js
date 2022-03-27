const Campaign = require("../models/Campaign")
const Ticket = require("../models/Ticket")

exports.raiseTicket = async function(req, res){
    try{
let ticket = new Ticket(req.body, req.params.id, req.session.user._id)
console.log("Hi:" + req.params.id)
await ticket.raiseTicket()
req.flash("success", "Ticket Successfully.")
req.session.save(function() {
  res.redirect('/')
})
    }
    catch(e){
        console.log(e)
    }
}


exports.displayTicketForm= async function(req,res){
    console.log(req.params.id)
    let campaign = await new Campaign().findCampaignById(req.params.id)
    res.render('ticketForm', {
        campaign: campaign
    })
}