const Campaign = require("../models/Campaign")
const Ticket = require("../models/Ticket")
const Answer = require("../models/Answer")

exports.raiseTicket = async function(req, res){
    try{
let ticket = new Ticket(req.body, req.params.id, req.session.user._id)
// console.log("Hi:" + req.params.id)
await ticket.raiseTicket()
req.flash("success", "Ticket Added Successfully.")
req.session.save(function() {
  res.redirect('/')

})
    }
    catch(e){
        console.log(e)
    }
}


exports.displayTicketForm= async function(req,res){
    // console.log(req.params.id)
    let campaign = await new Campaign().findCampaignById(req.params.id)
    res.render('raise-ticket-form', {
        campaign: campaign
    })
}


exports.openReplyForm = async function(req, res){

    let ticket = new Ticket()
    let ticketData= await ticket.findTicketById(req.params.id)
// console.log(ticketData)

    res.render('ticket-reply-form',{
        ticket: ticketData
    })
}

exports.viewTicket_influencer = async function(req, res){
    let ticket = new Ticket()
    let ticketData= await ticket.findTicketById(req.params.id)

    let answer = new Answer()
    let answerToTicket = await answer.getAnswerByTicketId(req.params.id)
    console.log(answerToTicket)
    res.render('viewticketdetails-influencer',{
        ticket:ticketData,
    answers: answerToTicket
        })
  }


  exports.closeTicket = async function(req, res){
      let ticket = new Ticket()
      await ticket.closeTicket(req.params.id)
      req.flash("success", "Ticket Closed Successfully.")
req.session.save(function() {
  res.redirect('/')

})
  }

  exports.changeStatusToOngoing = async function(ticketId){
      let ticket = new Ticket()
      await ticket.changeStatusToOngoing(ticketId)
  }
