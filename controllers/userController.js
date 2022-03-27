//Require Models
const User = require('../models/User')

exports.mustBeLoggedIn = function(req, res, next) {
    if (req.session.user) {
      next()
    } else {
      req.flash("errors", "You must be logged in to perform that action.")
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
        res.render("influencerPage", {
          username: req.session.user.username,
          role: req.session.user.role //remove this later
        })
      }
     else if(req.session.user.role =="manager"){
        res.render("dashboard-manager", {
          username: req.session.user.username,
          role: req.session.user.role //remove this later
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

  // exports.home = async function(req, res){
  //   res.render('homepage-guest', {regErrors: req.flash('regErrors')})
  // }