const { ObjectID } = require('mongodb')

const ticketsCollection = require('../db').db().collection("tickets")

let Ticket = function(data, campaignId, influencerId) {
    this.data = data
    this.errors = []
    this.campaignId = new ObjectID(campaignId)
    this.influencerId = new ObjectID(influencerId)
  }

  Ticket.prototype.cleanUp = function(){
    if (typeof(this.data.title) != "string") {this.data.title = ""}
    if (typeof(this.data.body) != "string") {this.data.body = ""}
    
    this.data = {
        ticketTitle: this.data.title,
        ticketBody : this.data.body,
        campaignId : this.campaignId, //has to be thought ho to take in
        raisedDate: new Date(),
        influencerId: this.influencerId,  //has to be thought ho to take in
        ticketStatus: "Open",
        category: this.data.category
        // issueImg: ,
    }
  }


  Ticket.prototype.raiseTicket = async function(){
    this.cleanUp()
    // console.log(this.data)
 await ticketsCollection.insertOne(this.data)
  }

  Ticket.prototype.editTicket = function(){}

  Ticket.prototype.DeleteTicket = function(){}

  Ticket.prototype.getAllTickets=async function(){
let allTickets = await ticketsCollection.find().toArray()
return allTickets
  }


// Ticket.prototype.findInfluencerById = async function(id){

// }


//   Ticket.prototype.lookUP= async function(){
//     try{
// let influencer = await ticketsCollection.aggregate([

//         {$lookup: {from: "tickets", localField: "influencerId", foreignField: "username", as: "userDoc"}},
//         {$project: {
//           username: {$arrayElemAt: ["$userDoc.username", 0]},
//         }}
//   ]).toArray()

//   influencer.map(function(inf){
//     return inf
//   })
//   console.log("Test"+influencer)
  
//   } 

//   catch(e){
//     console.log("Model LOOkup:" + e)
//   }
//   }


Ticket.prototype.findTicketbyCampaignId = async function(id){
  console.log(id)
  let tickets = await ticketsCollection.find({campaignId: id}).toArray()
  // console.log(tickets[0])
  return tickets
    }

  module.exports = Ticket