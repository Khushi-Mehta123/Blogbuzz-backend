
const express = require('express')
const router = express.Router()

const {gatAllUser,registerUser,loginUser,deleteUser,updateUser,getSingleUser,updateImage} = require('../functions/Users')

router.route('/').get(gatAllUser)
router.route('/register').post(registerUser)

router.route('/:id').put(updateImage)

router.route('/login').post(loginUser)
router.route('/:id').delete(deleteUser).get(getSingleUser)
// router.route('login/:id').put(updateUser)

module.exports = router
