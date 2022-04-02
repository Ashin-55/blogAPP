import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { ChatState } from "../../Context/ChatProvider";
import Chatloading from "../../skeleton/Chatloading";
import { getSender } from "../../ChatConfig/ChatLogic";

const MyChat = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      console.log("the servver output",data);
      setChats(data);
    } catch (error) {
      console.log("the error is ::", error);
      alert("this the error");
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo2")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      sx={{
        display: {
          xs: selectedChat ? "none" : "flex",
          sm: selectedChat ? "none" : "flex",
          md: "flex",
        },
        borderRadius: 2,
        background: "grey",
        borderWidth: "1px",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        width: { xs: "100%", sm: "100%", md: "40%" },
      }}
    >
      <Box
        sx={{
          paddingBottom: 3,
          paddingX: 3,
          fontSize: { xs: "26", sm: "26", md: "28px" },
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        Mychats
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "4%",
          width: "100%",
          height: "100%",
          backgroundColor: "#F8F8F8",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {chats ? (
          <Stack overflow='scroll'>
            {chats.map((chat) => (
              <Box
                onClick={() => {
                  setSelectedChat(chat);
                }}
                sx={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedChat === chat ? "#38B2Ac" : "#e8E8E8",
                  color: selectedChat === chat ? "white" : "black",
                  paddingX: 2,
                  paddingY: 2,
                  borderRadius: 1,
                }}
                key={chat._id}
              >
                <Typography>
                  {/* {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName} */}
                    
                  {
                    console.log(chat.users.length),
                    console.log("loggedUse", loggedUser)
                  } 
                  {chat.users.length > 1 ?getSender(loggedUser, chat.users):"No chats"}
                </Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <Chatloading />
        )}
      </Box>
    </Box>
  );
};

export default MyChat;
