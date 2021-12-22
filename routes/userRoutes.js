const userController = require("../controller/userController")

const router = require("express").Router()

router.get("/", userController.read)
router.post("/", userController.create)
router.get("/:id", userController.readById)
router.delete('/:id', userController.delete)

module.exports = router