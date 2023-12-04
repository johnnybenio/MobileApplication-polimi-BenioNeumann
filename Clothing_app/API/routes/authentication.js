const router = require("express").Router();
const authenticationController = require("../controllers/authenticationController");

// creating endpoints
router.post("/register", authenticationController.newUser);
router.post("/login", authenticationController.login);


module.exports = router;