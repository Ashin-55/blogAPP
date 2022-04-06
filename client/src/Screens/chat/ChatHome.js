import { ChatState } from "../../Context/ChatProvider";
import SideDrawer from "../../Components/CHAT/SideDrawer";
import MyChat from "../../Components/CHAT/MyChat";
import ChatBox from "../../Components/CHAT/ChatBox";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import Header from "../../Components/navbar/Header";
import AuthHeader from "../../Components/navbar/AuthHeader";
import FooterComp from "../../Components/Footer/FooterComp";
const ChatHome = ({ author }) => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <>
      {!author ? <Header /> : <AuthHeader />}
      <Container style={{ width: "100%" }}>
        {user && <SideDrawer author={author} />}
        <Box
          display='flex'
          justifyContent='space-between'
          w='100%'
          height='91.5vh'
          p='10px'
        >
          {user && <MyChat fetchAgain={fetchAgain} author={author} />}
          {user && (
            <ChatBox
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              author={author}
            />
          )}
        </Box>
      </Container>
      <FooterComp />
    </>
  );
};

export default ChatHome;
