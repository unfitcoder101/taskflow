const Task = require("../models/Task")

const getTasks = async (req,res)=>{
  const tasks = await Task.find()
  res.json(tasks)
}

const createTask = async (req,res)=>{
  try{
    const taskText = req.body.task

    if(!taskText){
      return res.status(400).json({error:"Task required"})
    }

    const newTask = await Task.create({
      task: taskText
    })

    res.status(201).json(newTask)

  }catch(err){
    res.status(500).json({error:"Server error"})
  }
}

const deleteTask = async (req,res)=>{
  const id = req.params.id

  await Task.findByIdAndDelete(id)

  res.json({message:"Task deleted"})
}

const updateTask = async (req,res)=>{
  const id = req.params.id

  const updated = await Task.findByIdAndUpdate(
    id,
    { completed: req.body.completed },
    { new: true }
  )

  res.json(updated)
}

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask
}