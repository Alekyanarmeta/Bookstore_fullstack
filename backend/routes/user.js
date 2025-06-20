const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const authentication=require("./userauth")
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password,address} = req.body
        if (username.length < 4) {
            return res.json({ message: "username length should be greater than 4" })
        }

        const user = await User.findOne({ username: username })
        if (user) {
            return res.json({ message: "username already exists" })
        }
        const em = await User.findOne({ email: email })
        if (em) {
            return res.json({ message: "email already exists" })
        }
        if (password.length <= 5) {
            return res.json({ message: "password length should greater than 5" })
        }
        const hashpassword = await bcrypt.hash(password, 10)
        const newuser = new User({
            username: username,
            email: email,
            password: hashpassword
        })

        await newuser.save()
        res.status(200).json({ message: "signup sucessfull" })
    }
    catch (err) {
        return res.status(400).json({ message: "internal server error" })
    }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.json({ message: "Invalid credentials." });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.json({ message: "Invalid credentials." });
    }
    const payload = {
      id:   existingUser._id,
      role: existingUser.role,

    };
    const token = jwt.sign(payload, "bookstore", {
      expiresIn: "30d",
    });

    return res.status(200).json({
      id:existingUser._id,
      token:token,
      role: existingUser.role,
    });
  } catch (err) {
    console.error("Sign-in error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/user-information",authentication,async(req,res)=>{
    try{
        const {id}=req.headers
        console.log(id)
        const user=await User.findById(id)
        console.log(user)
        if(!user)
        {
            return res.json({message:"information not found"})
        }
        return res.status(200).json(user)
    }
    catch(err)
    {
        return res.json("login again")
    }
})

router.put("/update-address",async(req,res)=>{
    const {id}=req.headers
    const address=req.body
    await User.findByIdAndUpdate(id,address)
    return res.status(200).json({message:"upadte address sucess"})
})

module.exports = router;