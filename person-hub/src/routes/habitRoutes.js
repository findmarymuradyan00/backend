const express = require("express")
const router = express.Router()
const auth = require("../middlewares/authMiddleware")
const { getAll, getById, create, update, handleCheckIn, remove } = require("../controllers/habitController")

router.get("/", auth, getAll)
router.get("/:id", auth, getById)
router.post("/", auth, create)
router.patch("/:id", auth, update)
router.post("/:id/check-in", auth, handleCheckIn)  
router.delete("/:id", auth, remove)

module.exports = router