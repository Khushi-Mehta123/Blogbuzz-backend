

const express = require('express')
const router = express.Router()

const {getQueries,postQueries,updateQueries,deleteQueries} = require('../functions/contactus')

router.route('/').get(getQueries).post(postQueries)

router.route('/:id').put(updateQueries).delete(deleteQueries);

module.exports = router
