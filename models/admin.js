
const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    username : {
        type : String
    },
    password : {
        type : Number
    }
})

module.exports = mongoose.model("admin", adminSchema)