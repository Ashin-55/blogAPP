const express = require("express");
const router = express.Router();
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageController");
const protect  = require("../middleware/authMiddleware");
// router.get("/:chatId", protect, allMessages);
// router.post("/", protect, sendMessage);
router.route("/").post(protect,sendMessage)
router.route("/:chatId").get(protect,allMessages)
module.exports = router;
