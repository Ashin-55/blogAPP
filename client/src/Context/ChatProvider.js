import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  let [user, setUser] = useState();
  let [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo2");
    const userInfo2 = JSON.parse(userInfo);
    setUser(userInfo2);
    // if (!userInfo2) {
    //   navigate("/");
    // }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
