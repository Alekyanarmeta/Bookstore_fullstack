const router = require("express").Router()
const User = require("../models/User")
const authentication = require("./userauth")

router.put("/add-to-cart/:bookid",authentication, async (req, res) => {
    try {
        const {bookid}=req.params;
        const {id} = req.headers;
        const existinguser = await User.findById(id)
        const iscart = existinguser.cart.includes(bookid)
        if (iscart) {
            return res.json({ message: "book is already exist in cart" })
        }
        await User.findByIdAndUpdate(id, { $push: { cart: bookid } })
        return res.status(200).json({ message: "added to cart" })
    }
    catch (err) {
        return res.json({ message: "internal error" })
    }
})

router.delete("/remove-from-cart/:bookid",authentication, async (req, res) => {
    try {
        const {bookid}=req.params
        const {id} = req.headers
        await User.findByIdAndUpdate(
            id,
            { $pull: { cart: bookid } },
            { new: true }
        );
        return res.status(200).json({ message: "removed from cart" })
    }
    catch (err) {
        return res.json({ message: "internal error" })

    }
})

router.delete("/remove-all-books", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.cart = [];
    await user.save();
    return res.json({ message: "Cart emptied successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/get-user-cart",authentication,async(req,res)=>{
     try {
        const {id} = req.headers
        const usercart=await User.findById(id)
        return res.status(200).json({ cart:usercart.cart})
    }
    catch (err) {
        return res.json({ message: "internal error" })

    }
})

module.exports = router