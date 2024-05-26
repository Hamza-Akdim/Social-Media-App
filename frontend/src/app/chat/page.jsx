"use client";
import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/Diverse/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const page = () => {
  const { userInfo } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {userInfo && <SideDrawer />}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        padding="10px"
      >
        {userInfo && (
          <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        {userInfo && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default page;
