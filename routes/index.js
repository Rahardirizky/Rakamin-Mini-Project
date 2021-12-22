const router = require("express").Router()
const userRoutes = require("./userRoutes")

router.get("/", (req, res) => {res.send("App is Running")});
router.use("/users", userRoutes)

module.exports = router