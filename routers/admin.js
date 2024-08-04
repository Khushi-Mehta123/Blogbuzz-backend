
const express = require('express')
const router = express.Router()

const {postadmin} = require('../functions/admin')

router.route('/').post(postadmin)

module.exports = router