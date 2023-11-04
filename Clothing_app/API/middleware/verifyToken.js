const jwt = require("jsonwebtoken");

const verifyToken = (req,res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JSONWEBTOKEN_SECRET, async (error, user) => {
            if(error){
                return res.status(403).json({messege: "The token is invalid"})
            }

            req.user = user;

            next();
        })}

    else{
        return res.status(401).json({messege: "You are not authenticated"})
    }
}



module.exports = {verifyToken};