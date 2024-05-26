import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import GroupChatModel from "./Diverse/GroupChatModel";

const MyChats = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, userInfo, chats, setChats } =
    ChatState();

  const { token } = userInfo;

  const toast = useToast();

  const fetchChats = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured when fetching chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg={"white"}
      w={{ base: "100%", md: "31%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={2}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={"Work sans"}
        d="flex"
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        My chats
        <GroupChatModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}>
          <Button
            d="flex"
            ml={6}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModel>
      </Box>
      <Box
        d="flex"
        flexDir={"column"}
        p={3}
        bg={"#F8F8F8"}
        w="100%"
        h="100%"
        borderRaduis="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY={"scroll"} maxHeight="420px">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor={"pointer"}
                _hover={
                  !selectedChat && {
                    background: "#BEE3F8",
                    color: "black",
                  }
                }
                bg={selectedChat === chat ? "#BEE3F8" : "#E8E8E8"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat ? chat.users[1].firstName : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
