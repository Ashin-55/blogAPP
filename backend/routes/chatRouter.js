const express = require("express")
const router = express.Router()
const {accessChat,fetchChats} = require('../controllers/chatController')
const protect = require("../middleware/authMiddleware")

router.route('/').post(protect,accessChat)
router.route('/').get(protect,fetchChats)
// router.route('/group').post(createGroupChat)
// router.route('/rename').put(renameGroup)     
// router.route('/groupremove').put(removeFromGroup)
// router.route('/groupadd').put(addToGroup)
module.exports= router