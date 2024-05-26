import React from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={() => handleFunction(user)}
      cursor={"pointer"}
      bg={"#E8E8E8"}
      _hover={{
        background: "#BEE3F8",
        color: "black",
      }}
      w="100%"
      d="flex"
      alignItems={"center"}
      color={"black"}
      px={3}
      py={2}
      mb={2}
      borderRaduis="lg"
    >
      <Avatar
        mr={2}
        size={"sm"}
        cursor={"pointer"}
        name={user.firstName}
        // src={user.picturePath}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize={"xs"}>
          <b>Email :</b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
