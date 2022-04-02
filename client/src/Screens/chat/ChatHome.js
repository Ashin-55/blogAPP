import { ChatState } from "../../Context/ChatProvider";
import SideDrawer from "../../Components/CHAT/SideDrawer";
import MyChat from "../../Components/CHAT/MyChat";
import ChatBox from "../../Components/CHAT/ChatBox";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import Header from "../../Components/navbar/Header";
import FooterComp from '../../Components/Footer/FooterComp'
const ChatHome = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <>
    <Header/>
      <Container style={{ width: "100%" }}>
        {user && <SideDrawer />}
        <Box
          display='flex'
          justifyContent='space-between'
          w='100%'
          height='91.5vh'
          p='10px'
        >
          {user && (
            <MyChat fetchAgain={fetchAgain}  />
          )}
          {user && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </Container>
      <FooterComp/>
    </>
  );
};

export default ChatHome;
