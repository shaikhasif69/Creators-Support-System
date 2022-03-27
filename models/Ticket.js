
const ticketsCollection = require('../db').db().collection("tickets")

let Ticket = function(data) {
    this.data = data
    this.errors = []
  }

  Ticket.prototype.cleanUp = function(){
    if (typeof(this.data.title) != "string") {this.data.title = ""}
    if (typeof(this.data.body) != "string") {this.data.body = ""}
    
    this.data = {
        ticketTitle: this.title,
        ticketBody : this.body,
        campaignId : this.campaignId, //has to be thought ho to take in
        raisedDate: new Date(),
        influencerId: this.influencerId,  //has to be thought ho to take in
        // issueImg: ,
    }
  }


  Ticket.prototype.addTicket = function(){

  }

  Ticket.prototype.editTicket = function(){

  }

  Ticket.prototype.DeleteTicket = function(){

  }

  module.exports = Ticket