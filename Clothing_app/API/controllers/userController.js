const UserRelation = require("../models/UserRelation");

module.exports = {
    deleteUser: async (req, res) => {
        try {
            await UserRelation.findByIdAndDelete(req.params.id);
            res.status(200).json({messege: "User has been deleted"});
        } catch (err) {
            res.status(500).json(err);
        }   
    },
    getUser: async (req, res) => {          // get the user data from the database
        try {
            const user = await UserRelation.findById(req.params.id);
            if(!user){return res.status(401).json({messege: "User not found"})}     // handle user not found
            const {password, __v, createdAt, updatedAt, ...userData} = user._doc;
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}