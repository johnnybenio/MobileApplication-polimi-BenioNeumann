const Product = require('../models/ProductModel');

module.exports = {

    // Create a product, retrieve data from body of POST request
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body);

        try {
            await newProduct.save();
            res.status(200).json({ messege: "Product created", product: newProduct });
        }
        catch (error) {
            res.status(500).json({ message: `failed to create the product, error: ${error.message}` });
        }
    },

    // Get all products
    getProducts: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 })
            res.status(200).json(products)
        } 
        catch (error) {
            res.status(500).json({ message: `Failed to get products, error: ${error.message}` })
        }
    },

    // Get product by ID
    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        } 
        catch (error) {
            res.status(500).json({ message: `Failed to get product by ID, error: ${error.message}` })
        }
    },

    // Search for a product with a keyword 
    searchProduct: async (req, res) => {
        try {
            const result = await Product.aggregate(
                [
                    {
                        $search: {
                            index: "clothing",
                            text: {
                                query: req.params.key,
                                path: {
                                    wildcard: "*"
                                }
                            }
                        }
                    }
                ]
            )
            res.status(200).json(result)
        } 
        catch (err) {
            res.status(500).json({ message: "Failed to get products" })
        }
    }
}