const cryptojs = require("crypto-js");      // password encryption
const jsonWebToken = require("jsonwebtoken");
const UserRelation = require("../models/UserRelation");

module.exports = {                  // mapping data from req to the new user
    newUser: async (req, res) => {
        const user = new UserRelation({
            username: req.body.username, email: req.body.email, password: cryptojs.AES.encrypt(req.body.password, process.env.PASSWORD).toString()
        });

        try {           // user creation check
            await user.save();
            return res.status(200).json({ messege: "New user has been created" })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ messege: err })
        }
    },
    login: async (req, res) => {
        try {
            const user = await UserRelation.findOne({ email: req.body.email });           // find the user by searching for emails in the database
            if (!user) {
                return res.status(401).json({ messege: "There is no account connected to this email address" });
            }

            const passDecrypt = cryptojs.AES.decrypt(user.password, process.env.PASSWORD).toString(cryptojs.enc.Utf8); // decryption and converting to a string
            if (passDecrypt !== req.body.password) {
                return res.status(401).json({ messege: "Password incorrect, try again" });      // check for password matches the password from the database
            }
            const token = jsonWebToken.sign({ id: user.id }, process.env.JSONWEBTOKEN_SECRET, { expiresIn: "60d" });         // create usertoken, token expiration date 60 days
            const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
            res.status(200).json({ ...userData, token: token })
        } catch (err) {
            return res.status(500).json({ messege: err })
        }
    },
}