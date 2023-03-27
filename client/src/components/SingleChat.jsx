import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import "./style.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModel";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../animation/typing.json";
import io from "socket.io-client";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { useContext } from "react";
import { ChatContext } from "../context/chatContext/chatContextProvider";
import { UserContext } from "../context/userContext/UserContextProvider";
import { MessageContext } from "../context/messageContext/MessageContextProvider";
import { NotificationContext } from "../context/notificationContext/notificationContext";
import {
  createMessage,
  reset,
  getAllMessage,
} from "../context/messageContext/messageAction";
import { createNotification } from "../context/notificationContext/notificationAction";
// const ENDPOINT = "http://localhost:3000";
// const ENDPOINT = "https://chat-application-two-gamma.vercel.app/";
const ENDPOINT = "https://hamza-chat-mern.herokuapp.com/";
var socket, selectedChatCompare;

const SingleChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { message, messageDispatch, allMessages, messagesDispatch } =
    useContext(MessageContext);
  const {
    selectedChat,
    setSelectedChat,
    notification,
    setFetchAgain,
    fetchAgain,
  } = useContext(ChatContext);
  const { user: userData } = useContext(UserContext);
  const { dispatch: notificationDispatcher } = useContext(NotificationContext);
  const { user } = userData;
  const { message: messageData, error: messageError } = message;
  const {
    messages: allMessageData,
    loading,
    error: allMessageError,
  } = allMessages;

  const fetchMessages = async () => {
    if (!selectedChat) return;
    getAllMessage(messagesDispatch, selectedChat._id);
    socket.emit("join chat", selectedChat._id);
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      const data = {
        chatId: selectedChat._id,
        content: newMessage,
      };

      createMessage(messageDispatch, data);
      setNewMessage("");
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allMessageError) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      reset(messagesDispatch);
    }
    if (messageError) {
      toast({
        title: "Error Occured!",
        description: "Failed to send the Message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      reset(messageDispatch);
    }
  }, [allMessageError, messageError]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    allMessageData && setMessages(allMessageData);
  }, [allMessageData]);
  useEffect(() => {
    messageData && setMessages([...messages, messageData]);
    messageData && socket.emit("new message", messageData);
    messageData && createNotification(notificationDispatcher, messageData._id);
  }, [messageData]);

  useEffect(() => {
    socket.on(
      "message recieved",
      (newMessageRecieved) => {
        if (
          !selectedChatCompare || // if chat is not selected or doesn't match current chat
          selectedChatCompare._id !== newMessageRecieved.chat._id
        ) {
          const result = Object.entries(
            [newMessageRecieved].reduce((acc, cur) => {
              acc[cur._id] = acc[cur._id] || [
                {
                  notification: cur,
                },
                0,
              ];

              acc[cur._id][1] = 1 + acc[cur._id][1];
              return acc;
            }, {})
          ).map(([notification, count]) => {
            return [{ notification }, count][1];
          });

          if (!notification.includes(result)) {
            setFetchAgain(!fetchAgain);
          }
        } else {
          setMessages([...messages, newMessageRecieved]);
        }
      },
      [socket]
    );
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />

            {
              // messages &&
              !selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    // fetchAgain={fetchAgain}
                    // setFetchAgain={setFetchAgain}
                  />
                </>
              )
            }
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
