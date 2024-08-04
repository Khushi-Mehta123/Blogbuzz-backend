
const contactus = require('../models/contactus')

const postQueries = async (req,res) => {

    try {
        let data = new contactus({
            name : req.body.name,
            email : req.body.email,
            subject : req.body.subject,
            message : req.body.message,
            
        })
        let doc = await data.save()
        res.status(200).json(doc)

    } catch (error) {
        console.log(error);
    }
}

const getQueries = async (req,res) => {
    try {
        const data = await contactus.find({}).sort({date : -1})
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}

const updateQueries = async(req,res) => {

    try {
        const {id:id} = req.params
        let query = {
            reply : req.body.reply
        }
        const updvalue = await contactus.findByIdAndUpdate({
            _id : id},
            {$set} = query,
            {new : true}
        )
        res.status(200).send(updvalue)
    } catch (error) {
        console.log(error);
    }
}

const deleteQueries = async(req,res)=>{
    try {
        const {id:id} = req.params
        const delquey = await contactus.findByIdAndDelete(id)
        // console.log(delquey);
        res.status(200).json(delquey)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getQueries,postQueries,updateQueries,deleteQueries}