const router = require("express").Router()
const User = require("../models/User")
const Books = require("../models/Books")
const authentication = require("./userauth")
router.post("/add-books",async (req, res) => {
    try {
        const { id } = req.headers
        const existingUser = await User.findById(id)
        if (existingUser.role != "admin") {
            return res.status(400).json({ message: "not admin" })
        }
        const { url, title, author, price, desc, language } = req.body
        const book = await Books({
            url,
            title,
            author,
            price,
            desc,
            language
        })
        await book.save()
        return res.status(200).json({ message: "book added successfully" })
    }
    catch (err) {
        return res.status(400).json({ message: "err found" })
    }
});

router.get("/get-all-books", async (req, res) => {
    try {
        const books = await Books.find()
        res.status(200).json(books)

    }
    catch (err) {
        return res.status(400).json({ message: "err found" })
    }

})
router.get("/recent-books", async (req, res) => {
    try {
        const books = await Books.find()
        const recent=books.reverse().slice(0,4)
        return res.status(200).json(recent)

    }
    catch (err) {
        return res.status(400).json({ message: "err found" })
    }

})
router.get("/get-book/:id", async (req, res) => {
    try {
        const {id}=req.params
        const books = await Books.findById(id)
        console.log(books)
        return res.status(200).json({message:books})
    }
    catch (err) {
        return res.status(400).json({ message: "err found" })
    }

})


module.exports = router;