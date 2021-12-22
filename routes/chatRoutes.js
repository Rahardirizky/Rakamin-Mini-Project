const chatController = require("../controller/chatController")

const router = require("express").Router()

router.get("/", chatController.readAllConversations)
router.post("/", chatController.sendMessages)
router.get("/:id", chatController.getConversationById)

module.exports = router