const CartModel = require("../models/CartRelation");

module.exports = {
    addToCart: async (req, res) => {            // Adding items to shop cart
        const userId = req.user.id
        const {cartProduct, quantity} = req.body;

        try {
            const cart = (await CartModel.find({userId: userId}))[0]
            if(cart){
                const existingProduct = cart.items.find((item) => item.cartProduct.toString() === cartProduct);

                // if the product already exists
                if(existingProduct){ existingProduct.quantity += 1}

                // if the product didn't exists in the cart before
                else{cart.items.push({cartProduct, quantity})}

                await cart.save();
                res.status(200).json("Product has been added to cart")
            }else{
                const newCart = new CartModel({
                    userId: userId, items:[{ cartProduct: cartProduct, quantity: quantity }]});
                
                await newCart.save();
                res.status(200).json("Product has been added to cart")}
        } catch (err) {
            res.status(500).json(err)
        }

    },
    retrieveCart: async (req, res) => {
        const userId = req.user.id;

        try {
            const cart = await CartModel.find({userId: userId}).populate("items.cartProduct", "_id name price brand imageURL");
            res.status(200).json(cart)

        } catch (err) {
            res.status(500).json(err)
        }
    },


    
    deleteCartProduct: async (req, res) => {
        const cartItemId = req.params.cartProductId;
        try {
            const updatedCart = await CartModel.findOneAndUpdate({"items.cartProduct": cartItemId},{$pull: {items: {cartProduct: cartItemId}}},{new: true})    
            if (!updatedCart){return res.status(404).json({messege: "Item was not found"})}
            res.status(200).json(updatedCart)
        } catch (err) {
            res.status(500).json(err)            
        }

    },
    decrementCartProduct: async (req, res) => {
        const {userId, cartProduct} = req.body;

        try {
            const cart = (await CartModel.find({userId: userId}))[0];
            if(!cart){return res.status(404).json("Cart was not found")}

            const availableProduct = cart.items.find(
                (item) => item.cartProduct.toString() === cartProduct);       // if true -> we have existing product
            if(!availableProduct){return res.status(404).json("Product was not found")}
            
            // if we only have one product of the item we delete the product from the cart by filtering the item out of the cart
            if(availableProduct.quantity === 1 ){cart.items = cart.items.filter((item) => item.cartProduct.toString() !== cartProduct)}
            else{availableProduct.quantity -= 1;}
            await cart.save();

            if(availableProduct.quantity === 0){
                await cart.updateOne({userId}, {$pull: {cartProduct}})}

            res.status(200).json({messege: "Product has been updated"})
                
                
        } catch (err) {
            res.status(500).json(err)
        }

    },
}

