const router = require("express").Router();
const User = require("../models/User");
const Order = require("../models/order");

router.post("/place-order", async (req, res) => {
    try {
        const { id } = req.headers;
        const order = req.body;
        console.log(order.id)
        const newOrder = new Order({
            user: id,
            books: order.id,
        });
        await newOrder.save();
        await User.findByIdAndUpdate(
            id,
            { $push: { orders: newOrder._id } },
            { new: true }
        );
        return res.status(200).json({ message: "Order placed successfully." });

    } catch (err) {
        console.error("Order placement failed:", err);
        return res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;
