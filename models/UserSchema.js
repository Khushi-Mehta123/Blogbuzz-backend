
const mongoose = require('mongoose')
const UsersSchema = mongoose.Schema({
    // _id: {
    //     type : String
    // },
    name : {
        type : String
    },
    email : {
        type:String
    },
    password : {
        type : String
    },
    token : {
        type:String,
        default : ""
    },
    date : {
        type:Date,
        default : Date.now()
    },
    isLogIN : {
        type:Boolean,
        default : false
    },
    image : {
        type : String,
    },
    mobileNumber : {
        type : Number,
    },
    address : {
        type : String
    },
    state : {
        type : String,
    },
    country : {
        type : String
    },
    education : {
        type : String
    }
})

module.exports = mongoose.model("Users",UsersSchema)
