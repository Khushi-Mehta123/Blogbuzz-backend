
const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({

    name : {
        type : String,
        default : ""
    },
    email : {
        type : String,
        default : ""
    },
    subject : {
        type : String
    },
    message : {
        type : String
    },
    reply : {
        type: String,
        default : "Your query will be resolved"
    },
    date : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model('userQueries',ContactSchema)