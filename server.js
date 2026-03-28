const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

// ✅ MIDDLEWARE FIRST
app.use(cors())
app.use(express.json())

app.use((req,res,next)=>{
  console.log(`Incoming: ${req.method} ${req.url}`)
  next()
})

// ✅ ROUTES
const authRoutes = require("./routes/auth")
const taskRoutes = require("./routes/tasks")

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

// ✅ ROOT
app.get("/", (req,res)=>{
  res.send("Task API is running")
})

// ✅ DB + SERVER START TOGETHER
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected")

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
.catch(err => {
  console.log(err)
})