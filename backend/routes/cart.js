const router = require("express").Router()
const User = require("../models/User")

router.post("/add-to-cart/:bookid", async (req, res) => {
    try {
        const {bookid}=req.params
        const {id} = req.headers
        const existinguser = await User.findById(id)
        const isfavourate = existinguser.cart.includes(bookid)
        if (isfavourate) {
            return res.status(400).json({ message: "book is already exist in cart" })
        }
        await User.findByIdAndUpdate(id, { $push: { cart: bookid } })
        return res.status(200).json({ message: "added to cart" })
    }
    catch (err) {
        return res.status(400).json({ message: "internal error" })
    }
})

router.put("/remove-from-cart/:bookid", async (req, res) => {
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
        return res.status(400).json({ message: "internal error" })

    }
})

router.get("/get-user-cart",async(req,res)=>{
     try {
        const {id} = req.headers
        const usercart=await User.findById(id)
        return res.status(200).json({ cart:usercart.cart})
    }
    catch (err) {
        return res.status(400).json({ message: "internal error" })

    }
})

module.exports = router