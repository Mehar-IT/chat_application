import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import {
  logoutUser,
  reset,
  searchChat,
} from "../../context/userContext/userAction";
import { createUserChat } from "../../context/chatContext/chatAction";
import { UserContext } from "../../context/userContext/UserContextProvider";
import { ChatContext } from "../../context/chatContext/chatContextProvider";
import ProfileModel from "./ProfileModel";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

export default function SideDrawer() {
  const {
    user: userData,
    users,
    usersDispatch,
    dispatch,
  } = useContext(UserContext);
  const {
    chats,
    dispatch: chatDispatch,
    fetchAgain,
    setFetchAgain,
  } = useContext(ChatContext);
  const { loading: chatLoading, chat, error: chatError } = chats;
  const { error, loading, isAuthenticated, user } = userData;
  const {
    users: searchResult,
    error: searchError,
    loading: searchLoading,
  } = users;

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search) {
      toast({
        description: "Enter something to search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    searchChat(usersDispatch, search);
  };

  const accessChat = (id) => {
    createUserChat(chatDispatch, id);
    setFetchAgain(!fetchAgain);
    onClose();
  };

  useEffect(() => {
    if (error) {
      toast({
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      reset(dispatch);
    }
    if (searchError) {
      toast({
        description: searchError,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      reset(usersDispatch);
    }
    if (chatError) {
      toast({
        description: chatError,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      reset(usersDispatch);
    }
  }, [error, searchError, chatError]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search User to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search" style={{ marginRight: "10px" }}></i>
            <Text display={{ base: "none", md: "flex" }}>Search User</Text>
          </Button>
        </Tooltip>
        <Text>Hamza's chat</Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor={"pointer"}
                name={user.name}
                src={user.avatar.image_url}
              />
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>
              <hr />
              <MenuItem
                onClick={() => {
                  logoutUser(dispatch);
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {searchLoading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {chatLoading && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
