const asyncHandler = require("express-async-handler");
const Message = require("../model/messageModel");
const Chat = require("../model/chatModel");
const User = require("../model/userModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "firstName email")
      .populate("chat");
    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.messages);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("data is empty");
    return res.sendStatus(400);
  }
  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "firstName ");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "firstName email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.status(200).json(message);
  } catch (error) {
    console.log("the error is ==>", error);
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages };
