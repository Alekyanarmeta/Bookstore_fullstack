const router = require("express").Router();
const Books = require("../models/Books");
const User = require("../models/User");
const Order = require("../models/order");
const authentication = require("./userauth");
router.post("/place-order",authentication,async (req, res) => {
    try {
        const { id } = req.headers;
        const orders = req.body.books;
        console.log(orders)
        for (const order of orders) {
            const newOrder = new Order({
                user: id,
                books: order,
            });
            await newOrder.save();
            await User.findByIdAndUpdate(
                id,
                { $push: { orders: newOrder._id } },
                { new: true }
            );
            await User.findByIdAndUpdate(
                id,
                { $pull: { cart: order} },
                { new: true }
            )
        }
        return res.status(200).json({ message: "Order placed successfully." });
    } catch (err) {
        console.error("Order placement failed:", err);
        return res.status(500).json({ message: "Internal server error." });
    }
});

router.get("/get-orders-history",authentication,async (req, res) => {
    try {
        const {id}=req.headers

        const user = await User.findById(id).populate({
            path: "orders",
            populate: { path: "books" },
        });
        return res.status(200).json({ orders: user.orders});
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    }
})

router.get("/get-user-orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("books");
    return res.status(200).json({ orders });
  } catch (err) {
    console.error("Error fetching user orders:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
});

router.put("/update-status", async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }
    return res.json({ message: "Updated successfully", order: updatedOrder });
  } catch (err) {
    console.error("Status update failed:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
})
module.exports = router;
