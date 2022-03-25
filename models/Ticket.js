const bcrypt = require("bcryptjs")
const validator = require("validator")
const md5 = require('md5')

const userCollection = require('../db').db().collection("users")

