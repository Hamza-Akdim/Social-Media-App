import { Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      display="inline-block"
      px={2}
      py={1}
      m={1}
      mb={2}
      borderRadius={"lg"}
      variant="solid"
      fontSize={12}
      backgroundColor="purple"
      color={"white"}
      cursor={"pointer"}
      onClick={handleFunction}
    >
      {user.firstName}
      <CloseIcon pl="1px" />
    </Box>
  );
};

export default UserBadgeItem;
