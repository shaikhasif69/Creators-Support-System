//Require Models
const User = require('../models/User')
const Campaign = require('../models/Campaign')
const Ticket = require('../models/Ticket')
const { ObjectID } = require('mongodb')
 
exports.mustBeManager = function(req, res, next) {
    if (req.session.user.role == "manager") {
      next()
    } else {
      req.flash("errors", "You must be logged in as manager to perform that action.")
      req.session.save(function() {
        res.redirect('/')
      })
    }
  }

exports.mustBeInfluencer = function(req, res, next) {
    if (req.session.user.role == "influencer") {
      next()
    } else {
      req.flash("errors", "You must be logged in as manager to perform that action.")
      req.session.save(function() {
        res.redirect('/')
      })
    }
  }

  exports.signin = function(req, res){
res.render('signin')
  }
  exports.signUp = function(req, res){
res.redirect('/')
  }

  exports.login = function(req, res) {
    let user = new User(req.body)


    user.login(req.body.role).then(function(result) {
      req.session.user = {username: user.data.username, _id: user.data._id, role: user.data.role}
      req.session.save(function() {
        res.redirect('/')
      })
    }).catch(function(e) {
      req.flash('errors', e)
      req.session.save(function() {
        res.redirect('/signin')
      })
    })
  }

  exports.register = function(req, res) {
    let user = new User(req.body)
    user.register().then(() => {
      req.session.user = {username: user.data.username, _id: user.data._id, role: user.data.role}
      req.session.save(function() {
        res.redirect('/')
      })
    }).catch((regErrors) => {
      regErrors.forEach(function(error) {
         req.flash('regErrors', error)
      })
      req.session.save(function() {
        res.redirect('/')
      })
    })
  }

  exports.logout = function(req, res) {
    req.session.destroy(function() {
      res.redirect('/')
    })
  }

  exports.home = async function(req, res) {
    if (req.session.user) {
      if(req.session.user.role =="influencer"){
let campain = new Campaign()
let campaigns = await campain.getAllCampaigns()
        res.render("influencer-dashboard", {
          username: req.session.user.username,
          role: req.session.user.role, //remove this later
          campaigns: campaigns
        })
      }
     else if(req.session.user.role =="manager"){

let campaign = new Campaign()




let campaigns = await campaign.getCampaigns(req.session.user._id)
// console.log(campaigns)
 let ticket = new Ticket()

let tickets = await Promise.all(campaigns.map(async (campaign)=>{
  return await ticket.findTicketbyCampaignId(campaign._id)
}))

console.log(tickets)
// let arr = []
// // let campaigns = ['green']

//  let arr2 = campaigns.map(async (elem)=>{
//   console.log(elem._id)
//   let t = await ticket.findTicketbyCampaignId(elem._id)
//   return  t
// // console.log(arr)
// })

// console.log(arr2)
// console.log(arr)



// console.log("camp:" + campaigns.to )


// console.log(campains[0].managerId)

// campaigns.map(function())

//   campaigns.map(function(campaign){
//   console.log("oy" + campaign._id)
//   return campaign._id
// })

// console.log(cam)

let allTickets = await ticket.getAllTickets()

// let campaignsOwned = campaigns.filter((campaign)=>{
//   return campaign.managerId == new ObjectID(req.session.user._id)
// })


// console.log(campaignsOwned)


// let  influencerData =allTickets.map(async function(ticket){
//   try{
//   let user =  new User()
//  let influencer =  await user.findInfluencerById(ticket.influencerId)
//  console.log("hello:" + influencer)
//   return   influencer
//   }
//   catch(e){
//     console.log(e)
//   }
// })

// let influencerData =  allTickets.map(async function(ticket){
// let user =   new User()
// return  await user.findInfluencerById(ticket.influencerId)
// })

// console.log(influencerData[0])

// try{
// await ticket.lookUP()
// } catch(e){
// console.log("Lookup:"+e)
// }

        res.render("dashboard-manager", {
          username: req.session.user.username,
          role: req.session.user.role, //remove this later
          campaigns: campaigns,
          // tickets: allTickets,
          tickets: tickets
        })}
        else{
          res.send("Something else")
        }
    } else {
      // res.send("hello")
     res.render('homepage-guest', {regErrors: req.flash('regErrors')})
      // res.render('homepage-guest')
    }
  }


exports.pageLoad=function(req, res){
  res.render('idk')
}
exports.displayDashboard=function(req, res){
  res.redirect('/')
}

  // exports.home = async function(req, res){
  //   res.render('homepage-guest', {regErrors: req.flash('regErrors')})
  // }



