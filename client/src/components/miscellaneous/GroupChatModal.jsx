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
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { ChatContext } from "../../context/chatContext/chatContextProvider";
import { UserContext } from "../../context/userContext/UserContextProvider";
import { searchChat } from "../../context/userContext/userAction";
import {
  createGroupChat,
  getUserChat,
  reset,
} from "../../context/chatContext/chatAction";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";
import { useEffect } from "react";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  // const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { users, usersDispatch } = useContext(UserContext);
  // const { user } = userData;
  const { users: searcheduser, error } = users;

  const {
    chat,
    chats: allChats,
    dispatch,
    getChatDispatch,
    crateGroupDispatch,
    createGroup,
  } = useContext(ChatContext);
  const { chats, error: chatError } = allChats;
  const { group, error: groupErros, groupCreated } = createGroup;

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    setLoading(true);
    searchChat(usersDispatch, search);
    setLoading(false);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const data = JSON.stringify({
      name: groupChatName,
      users: JSON.stringify(selectedUsers.map((u) => u._id)),
    });
    createGroupChat(crateGroupDispatch, data);
  };

  useEffect(() => {
    getUserChat(getChatDispatch);
  }, [crateGroupDispatch, group]);

  useEffect(() => {
    if (groupCreated) {
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      onClose();
      reset(crateGroupDispatch);
    }
    if (error) {
      toast({
        title: "Error Occured!",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      reset(usersDispatch);
    }
    if (groupErros) {
      toast({
        title: "Error Occured!",
        description: groupErros,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      reset(crateGroupDispatch);
    }
    if (chatError) {
      toast({
        title: "Error Occured!",
        description: chatError,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });

      reset(getChatDispatch);
    }
  }, [error, groupErros, chatError, groupCreated]);

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              // <ChatLoading />
              <div>Loading...</div>
            ) : (
              searcheduser
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
