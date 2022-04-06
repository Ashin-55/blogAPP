const express = require("express");
const creatError = require("http-errors");
const cors = require("cors");
const app = express();
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

// const userSchema = require("../model/userModel");

const data = require("./data/Data");

require("dotenv").config();
connectDB();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const userRouter = require("./routes/userRouter");
const authorRouter = require("./routes/authorRouter");
const chatRouter = require("./routes/chatRouter");
const messageRoutes = require("./routes/messageRouter");
const adminRouter = require("./routes/adminRouter");

const port = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

// app.use("/api/user",)
app.use("/", userRouter);
app.use("/author", authorRouter);
app.use("/admin", adminRouter);

app.use("/api/chat", chatRouter);
app.use("/api/message", messageRoutes);

app.use((req, res, next) => {
  console.log("in not found case");
  const error = new Error(`not found -${req.originalUrl}`);
  res.status(404);
  console.log(error);
  next(error);
});
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`server listenin on port ${port}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    console.log(userData._id,"hhh")
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room)  => {
    socket.join(room);
    console.log("user joined in Room:" + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  //send user message
  socket.on("new message", (newMessageRecieved) => {

    var chat = newMessageRecieved.chat;
    console.log("the send message chat is in user",chat)
    console.log("the send message newMessageRecieved is in user",newMessageRecieved)
    if (!chat.authers) return console.log("chat.users not defined");
    chat.authers.forEach((auther) => {
      console.log(auther)
      if (auther._id == newMessageRecieved.sender) return;
      socket.in(auther._id).emit("message recieved", newMessageRecieved);
    });
  });
  //send author message
  socket.on("new messageAuthor", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;
    console.log("the send message chat is in author",chat)
    console.log("the send message newMessageRecieved is in author",newMessageRecieved)
    if (!chat.users) return console.log("chat.users is  not defined");
    chat.users.forEach((user) => {

      if (user._id == newMessageRecieved.sender) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
