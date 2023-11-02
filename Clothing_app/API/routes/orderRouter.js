const router = require('express').Router();
const OrdersController = require('../controllers/ordersController');


// the orders router endpoint
router.get("/:id", OrdersController.getUserOrders);


module.exports = router;