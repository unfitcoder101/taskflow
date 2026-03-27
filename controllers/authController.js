const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

// SIGNUP
const signup = async (req,res)=>{
  try{
    const { email, password } = req.body

    if(!email || !password){
      return res.status(400).json({error:"Email and password required"})
    }

    const existingUser = await User.findOne({ email })

    if(existingUser){
      return res.status(400).json({error:"User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      email,
      password: hashedPassword
    })

    res.json({message:"User created"})

  }catch(err){
    console.log(err) // 🔥 IMPORTANT
    res.status(500).json({error:"Signup failed"})
  }
}

// LOGIN
const login = async (req,res)=>{
  try{
    console.log("LOGIN BODY:", req.body)  // 🔥 ADD

    const { email, password } = req.body

    const user = await User.findOne({ email })

    console.log("USER FOUND:", user)  // 🔥 ADD

    if(!user){
      return res.status(400).json({error:"User not found"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    console.log("PASSWORD MATCH:", isMatch)  // 🔥 ADD

    if(!isMatch){
      return res.status(400).json({error:"Wrong password"})
    }

    const token = jwt.sign(
      { userId: user._id },
      "secretkey"
    )

    res.json({token})

  }catch(err){
    console.log("LOGIN ERROR:", err)  // 🔥 IMPORTANT
    res.status(500).json({error:"Login failed"})
  }
}

module.exports = { signup, login }