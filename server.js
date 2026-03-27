const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(cors())
app.use(express.json())

// ✅ ROUTES IMPORT
const authRoutes = require("./routes/auth")
const taskRoutes = require("./routes/tasks")

// ✅ ROUTES USE
app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})

mongoose.connect("mongodb+srv://harshvardhan1362004_db_user:harsh@cluster0.s8rmx6t.mongodb.net/taskDB?retryWrites=true&w=majority")
.then(() => {
  console.log("MongoDB Connected")
})
.catch(err => {
  console.log(err)
})

app.use((req,res,next)=>{
  console.log(`Incoming: ${req.method} ${req.url}`)
  next()
})



app.get("/", (req,res)=>{
  res.send("Task API is running")
})

app.use((req,res,next)=>{
  console.log("BODY:", req.body)
  next()
})