import { Avatar, Tooltip } from "@mui/material";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../ChatConfig/ChatLogic";
import { ChatState } from "../../Context/ChatProvider";
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip title={m.sender.firstName} arrow>
                <Avatar
                  alt='sender profilepic'
                  src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                  sx={{
                    width: 24,
                    height: 24,
                    cursor: "pointer",
                    marginTop: "7px",
                  }}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#a0f2b6"
                }`,
                padding: "5px 15px",
                maxWidth: "75%",
                borderRadius: "20px",
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
