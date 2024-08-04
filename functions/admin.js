const admin = require('../models/admin')

const postadmin = async (req,res) => {

    const user = req.body

    const username = req.body.username
    const password = req.body.password

    try {
        // Find if the username exists in the database
        const existingUser = await admin.findOne({ username: username , password : password});

        if (!existingUser) {
            // console.log("User not found");
            return res.status(200).json({
                msg: "Not Authorized"
            });
        }

        console.log(existingUser);

        return res.status(200).json({
            msg: "User exists",
            user: existingUser
        });
    } catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({
            msg: "Server error"
        });
    }
}

module.exports = {postadmin}