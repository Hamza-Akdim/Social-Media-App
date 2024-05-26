import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const history = useHistory();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(data);

    if (!data) {
      history.push("/signin"); 
    }
  }, [history]);

  return (
    <ChatContext.Provider
      value={{
        userInfo,
        setUserInfo,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
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
