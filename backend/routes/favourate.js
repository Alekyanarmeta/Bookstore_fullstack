const router = require("express").Router();
const User = require("../models/User");

router.post("/add-to-favourites", async (req, res) => {
    try {
        const { bookid, id } = req.headers
        const existinguser = await User.findById(id)
        const isfavourate = existinguser.favourites.includes(bookid)
        if (isfavourate) {
            return res.status(400).json({ message: "book is already exist in favourates" })
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } })
        return res.status(200).json({ message: "added to favourates" })
    }
    catch (err) {
        return res.status(400).json({message: "internal error"})
    }
})

router.delete("/remove-from-favourites",async(req,res)=>{
    try{
    const {bookid,id}=req.headers
    await User.findByIdAndUpdate(
            id,
            { $pull: { favourites: bookid } },
            { new: true }
        );
    return res.status(200).json({message:"removed sucess"})
    }
    catch(err)
    {
        return res.status(400).json({message: "internal error"})

    }
})

router.get("/all-favourite-books",async(req,res)=>{
    try{
    const {id}=req.headers
    const user=await User.findById(id)
    console.log(user)
    return res.status(200).json({favourites:user.favourites})
    }
    catch(err)
    {
        return res.status(400).json({message: "internal error"})
    }
})
module.exports=router;