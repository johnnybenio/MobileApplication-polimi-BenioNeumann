const router = require('express').Router();
const ProductController = require('../controllers/ProductsController');

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.get('/search/:key', ProductController.searchProduct)
router.post('/', ProductController.createProduct)

module.exports = router