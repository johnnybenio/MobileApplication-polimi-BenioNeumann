const router = require('express').Router();
const CartController = require('../controllers/cartController');


// endspoint for the cart router
router.get("/find/:id", CartController.retrieveCart);
router.post("/", CartController.addToCart);
router.delete("/:cartProductId", CartController.deleteCartProduct);
router.post("/quantity", CartController.decrementCartProduct);


module.exports = router;