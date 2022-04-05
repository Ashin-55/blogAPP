const asyncHandler = require("express-async-handler")

const Chat = require("../model/chatModel");
const User = require("../model/userModel");

const  accessChat = asyncHandler(async (req, res) => {
  console.log("here in access chat");
  const { userId } = req.body;

  if (!userId) {
    console.log("userId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "firstName email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    //create a new chat
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      // usezrs: [req.user._id, userId],
      // users2: [ userId],
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      console.log("the error is :", error);
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = async (req, res) => {
  // const result1 = await Chat.find()
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "firstName email",
        });
        // console.log("this is result1",result1)
        // console.log(resSults[0].users)
        res.status(200).send(results);
      });
  } catch (error) {
    console.log("in fetchchat error ", error);
    res.status(400);
    throw new Error(error.message);
  }
};
module.exports = { accessChat, fetchChats };
