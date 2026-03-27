const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")

const {
  getTasks,
  createTask,
  deleteTask,
  updateTask
} = require("../controllers/taskController")

router.get("/",getTasks)
router.post("/", createTask)
router.delete("/:id",deleteTask)
router.patch("/:id", updateTask)

module.exports = router