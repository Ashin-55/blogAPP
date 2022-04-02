import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  FormControl,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import { ChatState } from "../../Context/ChatProvider";
import { getSender } from "../../ChatConfig/ChatLogic";
import ScrollableChat from "./ScrollableChat";
import "../../Components/styles.css";

const ENDPOINT = "http://localhost:3500";
var socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, notification, setNotification} = ChatState();
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [newMessages, setNewMessages] = React.useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //give notification
        if(!notification.includes(newMessageRecieved)){
          setNotification([newMessageRecieved,...notification])
          setFetchAgain(!fetchAgain)
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log("the message::", messages);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log("the fetching error is that ::", error.messages);
      alert(error.messages);
    }
  };
  const typingHandler = (e) => {
    setNewMessages(e.target.value);
    //typing indicator
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessages) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessages("");
        const { data } = await axios.post(
          "/api/message",
          { content: newMessages, chatId: selectedChat._id },
          config
        );
        console.log(data);

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        alert("error occured");
      }
    }
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Typography
            alignItems='center'
            display='flex'
            justifyContent='space-between'
            width='100%'
            fontSize={{ xs: "20px", sm: "20px", md: "25px" }}
            paddingBottom={3}
            paddingX={2}
            fontFamily='Poppins'
          >
            <IconButton
              onClick={() => setSelectedChat("")}
              sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
            >
              <ArrowBackIcon />
            </IconButton>

            {!selectedChat.isGroupChat ? (
              <>{getSender(user, selectedChat.users)}</>
            ) : (
              <>{selectedChat.chatName}</>
            )}
          </Typography>
          <Box
            sx={{
              padding: 2,
              justifyContent: "flex-end",
              display: "flex",
              overflowY: "hidden",
              borderRadius: 3,
              flexDirection: "column",
              background: "#E8E8E8",
              width: "100%",
              height: "100%",
            }}
          >
            {loading ? (
              <CircularProgress
                sx={{
                  size: "25px",
                  width: 40,
                  height: 40,
                  alignSelf: "center",
                  margin: "auto",
                }}
              />
            ) : (
              <div className='messages'>
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl>
              {isTyping ? (
                <div style={{ color: "#757678" }}>typping...</div>
              ) : (
                <></>
              )}
              <TextField
                variant='outlined'
                background='#E0E0E0'
                placeholder='Enter Message..'
                onChange={typingHandler}
                onKeyDown={sendMessage}
                value={newMessages}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            height: "100%",
            flexDirection: "row",
          }}
        >
          <Typography
            sx={{ fontSize: 15, paddingBottom: 3, fontFamily: "Poppins" }}
          >
            Click any author to Chat
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
