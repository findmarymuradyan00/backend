const express = require("express")
const router = express.Router()
const auth = require("../middlewares/authMiddleware")
const {  getAll, getById, create, update, remove  } = require("../controllers/noteController")

router.get("/", auth, getAll)           
router.get("/:id",auth, getById)                 
router.post("/",auth, create)        
router.patch("/:id",auth, update)
router.delete("/:id",auth, remove)              

module.exports = router