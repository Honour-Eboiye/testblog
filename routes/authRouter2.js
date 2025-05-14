const express = require('express')
const router = express.Router()
const {
  login,
  register
} = require('../controller/auth2')

router
  .route('/login')
  .get(login)

router
  .route('/register')
  .post(register)
module.exports = router