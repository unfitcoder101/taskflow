const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(cors())
app.use(express.json())

// DEBUG ROUTE
app.get("/debug", (req,res)=>{
  res.send("DEBUG WORKING")
})

// ROUTES
const authRoutes = require("./routes/auth")
const taskRoutes = require("./routes/tasks")

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

app.get("/tasks-test", (req,res)=>{
  res.send("TASK ROUTE HIT")
})

// ROOT
app.get("/", (req,res)=>{
  res.send("Task API is running")
})

// START SERVER AFTER DB CONNECT
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected")

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
.catch(err => console.log(err))