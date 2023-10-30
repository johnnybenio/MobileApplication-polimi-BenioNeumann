const ProductModel = require("../models/ProductModel");
const CartModel = require("../models/CartRelation");


module.exports = {
    addToCart: async (req, res) => {            // Adding items to shop cart
        const {userId, cartItem,quantity} = req.body; 
        try {
            const cart = await CartModel.findOne({userId})
            if(cart){           // if cart exists
                const existingItem = cart.items.findOne((item) => item.cartProduct.toString() === cartItem);
                // if item already exists in the cart and we want to add more of it then we increase the quantity by 1
                if(existingItem){existingItem.quantity += 1}else{cart.items.push({ cartItem, quantity})}
                await cart.save();
                res.status(200).json("The product has been added to your cart")
            }
            // if cart does not exists we create a new cart and add the item to the cart
            else{
                const newCart = new CartModel({
                    userId, products: [{cartProduct, quantity: quantity}]
                });
                await newCart.save();
                res.status(200).json("The product has been added to your cart")
            }
        } catch (err) {
            res.status(500).json(err)

        }
    },
    getCart: async (req, res) => {
        const userId = req.params.id;
        try {
            
        } catch (err) {
            
        }
    },
    deleteCartItem: async (req, res) => {
        const {userId, cartItem} = req.body; 

    },
    decrementCartItem: async (req, res) => {
        const {userId, cartItem} = req.body; 

    },
}

