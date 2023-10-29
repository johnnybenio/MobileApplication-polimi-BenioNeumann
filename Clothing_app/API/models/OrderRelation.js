const { default: mongoose } = require('mongoose');
const mongoDB = require('mongoose')

const OrderRelation = new mongoDB.Schema({
    user : {type: String, required: true},
    constumer : {type: String, required: true},
    product : {type: mongoose.Schema.Types.ObjectId, ref: "Product"},     // represents a product object
    quantity : {type: Number, required: true},
    subTotal : {type: Number, required: true},
    total : {type: Number, required: true},
    deliveryStatus: {type: Number, default: "pending"}, // changes in order stages ex: from pending to processing 
    paymentStatus: {type: String, required: true},      // when payments are verified
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderRelation)