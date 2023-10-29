const { default: mongoose } = require('mongoose');
const mongoDB = require('mongoose')

const CartRelation = new mongoDB.Schema({
    user: {type: Number, required: "pending"},
    items: [{                       // list of the items added to the cart
        cartProduct: {type: mongoose.Schema.Types.ObjectId, ref: "Product"}, // product ID
        quantity: {type: Number, default: 1}}]      // if no number of items specified add only 1 to the cart
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartRelation)