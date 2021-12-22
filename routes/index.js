const router = require("express").Router()
const userRoutes = require("./userRoutes")
const chatRoutes = require("./chatRoutes")

router.get("/", (req, res) => {res.send("App is Running")});
router.use("/users", userRoutes)
router.use("/chats", chatRoutes)

module.exports = router