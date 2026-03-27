const express = require("express")

const app = express()

const PORT = 3000

const cors = require("cors")
app.use(cors())
const authRoutes = require("./routes/auth")
const taskRoutes = require("./routes/tasks")

app.use(express.json())

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

const mongoose = require("mongoose")

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

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})

app.use((req,res,next)=>{
  console.log("BODY:", req.body)
  next()
})