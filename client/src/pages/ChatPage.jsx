import { UserContext } from "../context/userContext/UserContextProvider";
import { useContext } from "react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { Box } from "@chakra-ui/layout";
import { useState } from "react";

export default function ChatPage() {
  const { user: users, dispatch } = useContext(UserContext);
  const { error, loading, isAuthenticated, user } = users;

  return (
    <div style={{ width: "100%" }}>
      {isAuthenticated && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {isAuthenticated && <MyChats />}
        {isAuthenticated && <ChatBox />}
      </Box>
    </div>
  );
}
