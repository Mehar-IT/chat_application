import React, { createContext, useReducer, useState } from "react";
import {
  createChatReducer,
  getChatReducer,
  crateGroupReducer,
  renameGroupReducer,
} from "./chatReducer";

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [chat, dispatch] = useReducer(createChatReducer, {});
  const [chats, getChatDispatch] = useReducer(getChatReducer, {});
  const [createGroup, crateGroupDispatch] = useReducer(crateGroupReducer, {});
  const [renameGroup, renameGroupDispatch] = useReducer(renameGroupReducer, {});
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <ChatContext.Provider
      value={{
        chat,
        dispatch,
        chats,
        getChatDispatch,
        crateGroupDispatch,
        createGroup,
        selectedChat,
        setSelectedChat,
        renameGroup,
        renameGroupDispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
