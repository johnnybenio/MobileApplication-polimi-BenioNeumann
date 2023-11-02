const Order = require("../models/OrderRelation")

module.exports = {
    getUserOrders: async (req,res) => {
        const user = req.params.id;
        try {
            const userOrders = await Order.find({user: user}).populate({
                path: "product", select: "name price brand imageURL"
            }).exec();

            res.status(200).json(userOrders)
        } catch (err) {
            res.status(500).json(err)

        }



    }
}