import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
  Spinner,
} from "@chakra-ui/react";

import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext/UserContextProvider";
import { ChatContext } from "../../context/chatContext/chatContextProvider";
import {
  renameGroupChat,
  reset,
  addGroupChat,
  removeGroupChat,
} from "../../context/chatContext/chatAction";
import { searchChat } from "../../context/userContext/userAction";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");

  const toast = useToast();

  const {
    selectedChat,
    setSelectedChat,
    renameGroup,
    renameGroupDispatch,
    fetchAgain,
    setFetchAgain,
    addGroup,
    addGroupDispatch,
    removeGroup,
    removeGroupDispatch,
  } = useContext(ChatContext);
  const { user: userData, usersDispatch, users } = useContext(UserContext);
  const { user } = userData;
  const {
    error: searchError,
    loading: searchLoading,
    users: searcheduser,
  } = users;
  const { loading: renameLoading, isRenamed, group, error } = renameGroup;
  const { loading: addLoading, isAdded, group: addedGroup } = addGroup;
  const {
    loading: removeLoading,
    isRemoved,
    group: removedGroup,
  } = removeGroup;

  const handleSearch = (query) => {
    if (!query) {
      toast({
        description: "Enter something to search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    searchChat(usersDispatch, query);
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    renameGroupChat(
      renameGroupDispatch,
      JSON.stringify({
        chatId: selectedChat._id,
        chatName: groupChatName,
      })
    );

    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    addGroupChat(
      addGroupDispatch,
      JSON.stringify({
        chatId: selectedChat._id,
        userId: user1._id,
      })
    );

    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    removeGroupChat(
      removeGroupDispatch,
      JSON.stringify({
        chatId: selectedChat._id,
        userId: user1._id,
      })
    );

    user1._id === user._id ? setSelectedChat() : setSelectedChat(removedGroup);
    setFetchAgain(!fetchAgain);
    setGroupChatName("");
  };

  useEffect(() => {
    if (isRenamed) {
      toast({
        title: "Success!",
        description: "Group name is changed",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setSelectedChat(group);
      setFetchAgain(!fetchAgain);

      reset(renameGroupDispatch);
    }
    if (isAdded) {
      toast({
        title: "Success!",
        description: "user is added into this group",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setSelectedChat(addedGroup);
      setFetchAgain(!fetchAgain);

      reset(addGroupDispatch);
    }
    if (error) {
      toast({
        title: "Error Occured!",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      reset(renameGroupDispatch);
    }
    if (searchError) {
      toast({
        title: "Error Occured!",
        description: searchError,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      reset(usersDispatch);
    }
    return () => {
      if (isRemoved) {
        toast({
          title: "Success!",
          description: "user is removed from group",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        // setSelectedChat(removedGroup);

        reset(removeGroupDispatch);
      }
    };
  }, [
    error,
    isRenamed,
    searchError,
    isAdded,
    isRemoved,
    renameGroupDispatch,
    usersDispatch,
    addGroupDispatch,
    removeGroupDispatch,
  ]);

  return (
    <>
      <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {searchLoading ? (
              <Spinner size="lg" />
            ) : (
              searcheduser?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
