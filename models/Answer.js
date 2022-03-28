const answersCollection = require('../db').db().collection("answers")


let Answer = function(data, ticketId, managerId){
    this.data = data
    this.errors = []
    this.ticketId =  ticketId
    this.managerId = ticketId
}

Answer.prototype.cleanUp = function(){
    this.data ={
        ticketId : this.ticketId,
        reply: this.data.reply,
        managerId: this.managerId
    }
}


Answer.prototype.saveAnser = async function(){
    this.cleanUp()
    await answersCollection.insertOne(this.data)
}
module.exports = Answer