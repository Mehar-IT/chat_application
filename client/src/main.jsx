import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import UserContextProvider from "./context/userContext/UserContextProvider";
import ChatContextProvider from "./context/chatContext/chatContextProvider";
import MessageContextProvider from "./context/messageContext/MessageContextProvider";
import NotificationContextProvider from "./context/notificationContext/notificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <ChatContextProvider>
      <MessageContextProvider>
        <NotificationContextProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </NotificationContextProvider>
      </MessageContextProvider>
    </ChatContextProvider>
  </UserContextProvider>
);
