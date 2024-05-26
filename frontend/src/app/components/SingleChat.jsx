import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import UpdateGroupChatModal from "./Diverse/UpdateGroupChatModal";
import axios from "axios";
import "./styles.css";
import ScrollableChat from "./ScrollableChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { userInfo, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const toast = useToast();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: `Error Occured when fetching messages. ${error.response.data}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (newMessage) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        setNewMessage("");
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: `Error Occured when sending message. ${error.response.data}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  return (
    <>
      {selectedChat ? (
        <>
          <Flex
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily={"Work sans"}
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex alignItems="center">
              <IconButton
                d={{ base: "flex", md: "none" }}
                mr={5}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
              />
              {!selectedChat.isGroupChat ? (
                <Text>{selectedChat.users[1].firstName}</Text>
              ) : (
                <Text>{selectedChat.chatName}</Text>
              )}
            </Flex>
            {selectedChat.isGroupChat && (
              <Box ml="auto">
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </Box>
            )}
          </Flex>
          <Flex
            flexDir="column"
            p={3}
            bg={"#E8E8E8"}
            w="100%"
            h="100%"
            borderRadius={"lg"}
            overflowY="hidden"
          >
            {loading ? (
              <Center flex="1">
                <Spinner size={"xl"} w={20} h={20} />
              </Center>
            ) : (
              <Box flex="1" overflowY="auto">
                <div className="messages">
                  <ScrollableChat messages={messages} />
                </div>
              </Box>
            )}

            <Flex mt={3}>
              <Input
                variant={"filled"}
                bg={"#E0E0E0"}
                value={newMessage}
                placeholder="Enter a message..."
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") sendMessage();
                }}
              />
              <Button onClick={sendMessage} ml={3}>
                Send
              </Button>
            </Flex>
          </Flex>
        </>
      ) : (
        <Center height="100vh">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Center>
      )}
    </>
  );
};

export default SingleChat;
