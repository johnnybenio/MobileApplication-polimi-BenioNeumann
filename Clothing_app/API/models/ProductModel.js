const { default: mongoose } = require('mongoose');
const mongoDB = require('mongoose')

const productRelation = new mongoDB.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    type: { type: String, required: true },
    imageURL: { type: String, required: true },
    size: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Product", productRelation)