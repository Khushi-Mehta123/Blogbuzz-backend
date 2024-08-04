
const Users = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

  const updateImage = async (req, res) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join(__dirname, '..', 'UserImages'));
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
        }
      });

      const upload = multer({storage : storage}).single('image');
      
      upload(req,res,async(err) => {
        if(err){
            console.log(err);
            res.status(404).send('Something went wrong')
        }
    //    try {
    //         const userId = req.params.id;
    //         // console.log(userId);
    //         const fileName = req.file ? path.basename(req.file.path) : null;
    //         // console.log("hello"  + fileName);   
    //         const user = await Users.findById(userId);
    //         // console.log(user.image);
    //         if (user.image) {
    //             const oldImagePath = path.join(__dirname, '..', 'UserImages', user.image);
    //             if (fs.existsSync(oldImagePath)) {
    //               fs.unlinkSync(oldImagePath);
    //             }
    //           }

    //         user.image = fileName;
    //         await user.save();

    //         res.json({ imagePath: fileName });
            
    //         const updatedUser = await Users.findByIdAndUpdate(userId, updateData, { new: true });
    //         if (!updatedUser) {
    //             return res.status(404).send({ message: 'User not found' });
    //         }
    //         res.status(200).send(updatedUser);

    //    } 
    try {
        const userId = req.params.id;
        const updateData = req.body;

        // Check if image is included in the request
        if (req.file) { 
            const fileName = path.basename(req.file.path);
            const user = await Users.findById(userId);

            // Delete old image if it exists
            if (user.image) {
                const oldImagePath = path.join(__dirname, '..', 'UserImages', user.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            user.image = fileName;
            await user.save();
            return res.json({ imagePath: fileName });
        }

        // If no image, update user data
        const updatedUser = await Users.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(updatedUser);
    }
    catch (error) {
            console.log(error);
       }
      })
  };



const getSingleUser = async(req,res) =>{

    try {
        const {id : id} = req.params
        const user = await Users.findById(id)
        res.status(200).send(user)
    } catch (error) {
        console.log(error);
    }

}

const gatAllUser = async (req,res) => {
    try {
        const user = await Users.find({})
    res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }
}

const registerUser = async (req,res) => {

    const storage = multer.diskStorage({
        destination : 'UserImages/',
        filename : function(req,file,cb){
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
    
    const upload = multer({storage : storage}).single('UserImage');

    upload(req,res,async(err) =>  {
        if(err){
            console.log(err);
            res.status(404).send('Something went wrong')
        }
        const hashpass = await bcrypt.hash(req.body.password,10)
        username =  req.body.name
        emailid =  req.body.email
        const token = jwt.sign({username,emailid},process.env.JWT_SECRET,{expiresIn:'1d'})
        const fileName = req.file ? path.basename(req.file.path) : null;
        // console.log(fileName);

        let user =  Users({
            name : req.body.name,
            email : req.body.email,
            password : hashpass,
            date : req.body.date,
            token : token,
            image : fileName
        })
        console.log("hii");
        // console.log(user);
        
        try {
            const userData = new Users(user)
            await userData.save()

            res.status(200).send(userData)  
        } catch (error) {
            console.log(error);
        }
    })
}

// const registerUser = async (req,res) => {
//     try {
//         const hashpass = await bcrypt.hash(req.body.password,10)
//         username = req.body.name
//         emailid = req.body.email
//         const token = jwt.sign({username,emailid},process.env.JWT_SECRET,{expiresIn:'1d'})

//         let user = new Users({
//             name : req.body.name,
//             email : req.body.email,
//             password : hashpass,
//             date : req.body.date,
//             token : token
//         })

//         let doc = await user.save();
//         res.status(200).json(doc);

//     } catch (error) {
//         console.log(error);
//     }
// }

const loginUser =  async (req,res) => {

    var email=req.body.email;

    Users.find({email:email})

  .exec()
  .then(user=>{
      if(user.length<1){
          res.status(200).json({
            msg:"User is not valid",
            UserData:'',
            status:'error'
          });
      }else{
         bcrypt.compare(req.body.password, user[0].password, function(err, result) {
            
            if(err){
             res.json({
               msg:"Auth Failed",
               UserData:'',
               status:'error'
             });
            }
            if(result){
             res.status(200).json({
               msg:"User Login Successfully",
                 UserData:user,
                 token :user[0].token,
                 status:'success',
                 isLogIN : true,
             });
            }else{
             res.json({
               msg:"Auth Failed",
               UserData:'',
               status:'error'
             });
            }
         });
     
 }
 })
 .catch(err=>{
     res.json({
         error:err
     });
 })

}

const deleteUser = async (req,res) => {
    
    try {
        const {id : id} = req.params
        const user = await Users.findOneAndDelete({_id : id})
        // console.log(user);
        res.status(200).json({status : "Success"})
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async(req,res) =>{

    // try {
    //     const {id : id} = req.params
    //     const userdata = req.body
    //     const data = {
    //         mobileNumber : req.body.mobileNumber,
    //         address : req.body.address,
    //         state : req.body.state,
    //         country : req.body.country,
    //         education : req.body.education
    //     }
    //     console.log(id);
        
    //     const upduser = Users.findByIdAndUpdate(id , userdata , {new : true})
    //     if(!upduser){
    //         return res.status(404).send({ message: 'User not found' });
    //     }
    //     res.status(200).send(upduser);

    // } catch (error) {
    //     res.status(500).send({ message: 'Error updating user', error });
    // }
    // res.status(200).send(data)

}
    // try {
    //     const {id : id} = req.params
    //     let user = {
    //         isLogIN : !Users.isLogIN
    //     }

    //     const updUser = await findByIdAndUpdate({
    //         _id : id},
    //         {$set} = user,
    //         {new : true}
    //     )
    //     console.log(updUser);
    //     res.status(200).json(updUser)
    // } catch (error) {
    //     console.log(error);
    // }


module.exports = {gatAllUser,registerUser,loginUser,deleteUser,updateUser,getSingleUser,updateImage}