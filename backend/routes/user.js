const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const authentication=require("./userauth")
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;
        if (username.length < 4) {
            return res.json({ message: "Username should be at least 4 characters long" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ message: "Username already exists" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.json({ message: "Email already exists" });
        }

        if (password.length <= 5) {
            return res.json({ message: "Password should be longer than 5 characters" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username:username,
            email:email,
            password: hashedPassword,
            address:address 
        });
        await newUser.save();
        return res.status(200).json({ message: "Signup successful" });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
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
        const user=await User.findById(id)

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
    const address=req.body.address
    const user=await User.findByIdAndUpdate(
      id,
      {
        address:address
      },
      {new:true}
    )
    return res.status(200).json({message:user})
})

module.exports = router;