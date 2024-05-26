import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../context/ChatProvider";
import { Avatar } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { userInfo } = ChatState();

  const isSameSender = (messages, msg, i) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== msg.sender._id || 
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userInfo.user._id 
    );
  };

  const isLastMessage = (messages, i) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userInfo.user._id &&
      messages[messages.length - 1] 
    );
  };

  const isSameSenderMargin = (messages, msg, i) => {
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === msg.sender._id && 
      messages[i].sender._id !== userInfo.user._id
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== msg.sender._id &&
        messages[i].sender._id !== userInfo.user._id) ||
      (i === messages.length - 1 &&
        messages[i].sender._id !== userInfo.user._id)
    )
      return 0;
    else return "auto";
  };

  const isSameUser = (messages, msg, i) => {
    return i > 0 && messages[i - 1].sender._id === msg.sender._id;
  };

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((msg, i) => (
          <div style={{ display: "flex" }} key={msg._id}>
            {(isSameSender(messages, msg, i) || isLastMessage(messages, i)) && (
              <Avatar
                mt={7}
                mr={1}
                cursor={"pointer"}
                size={"sm"}
                name={msg.sender.firstName}
                // src={msg.sender.pathPicture}
              />
            )}
            <span
              style={{
                backgroundColor: `${
                  msg.sender._id === userInfo.user._id ? "#BEE3F8" : "#FFFFFF"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, msg, i),
                marginTop: isSameUser(messages, msg) ? 3 : 10,
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
