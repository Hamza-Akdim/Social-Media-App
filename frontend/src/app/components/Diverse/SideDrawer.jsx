import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import {
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Input,
  useToast,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { userInfo, chats, setChats, selectedChat, setSelectedChat } =
    ChatState();
  const { token, user } = userInfo;
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logout = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const toast = useToast();
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };

      const { data } = await axios.get(`/api/users?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userInfoId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json", 
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "/api/chat",
        { userId: userInfoId },
        config
      );
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      console.log(data);
      setSelectedChat(data);
      setLoading(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error when fetching the chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        bg="white"
        p="5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search userInfos to chat" hasArrow placement="bottom">
          <Button
            variant="ghost"
            display="flex"
            alignItems="center"
            onClick={onOpen}
          >
            <i className="fas fa-search" style={{ marginRight: "5px" }}></i>
            <Text>Search UserInfo</Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans" flex="1" textAlign="center">
          Welcome into Chat
        </Text>
        <Menu>
          <MenuButton p={1}>
            <BellIcon fontSize={"2xl"} />
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar
              size={"sm"}
              cursor="pointer"
              name={user.firstName}
              //You should provide the user its picture and fix the part of firstName and lastName
              src={user.picturePath}
            />
          </MenuButton>
          <MenuList>
            <MenuItem>My Profile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Flex alignItems="center" pb={4}>
              <Input
                flex="1"
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Flex>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => {
                return (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                );
              })
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
