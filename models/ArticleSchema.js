
const mongoose = require('mongoose')

const ArticleSchema = mongoose.Schema({
    name : {
        type : String,
        default : ""
    },
    email : {
        type : String,
        default : ""
    },
    title : {
        type:String,
    },
    data : {
        type : String
    },
    verified : {
        type:Boolean,
        default : false
    },
    date : {
        type : Date,
        default : Date.now()
    },
    image : {
        type : String
    },
    category :{
        type : String
    }
})

module.exports = mongoose.model("Articles",ArticleSchema)