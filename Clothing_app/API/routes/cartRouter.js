const router = require('express').Router();
const CartController = require('../controllers/cartController');
const { verifyToken } = require('../middleware/verifyToken');



// endspoint for the cart router
router.get("/find", verifyToken, CartController.retrieveCart);
router.post("/",verifyToken, CartController.addToCart);
router.delete("/:cartProductId", CartController.deleteCartProduct);
router.post("/quantity", CartController.decrementCartProduct);


module.exports = router;