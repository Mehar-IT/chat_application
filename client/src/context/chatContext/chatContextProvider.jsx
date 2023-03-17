import React, { createContext, useReducer, useState } from "react";
import {
  createChatReducer,
  getChatReducer,
  crateGroupReducer,
  renameGroupReducer,
  addGroupReducer,
  removeGroupReducer,
} from "./chatReducer";

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [chat, dispatch] = useReducer(createChatReducer, {});
  const [chats, getChatDispatch] = useReducer(getChatReducer, {});
  const [createGroup, crateGroupDispatch] = useReducer(crateGroupReducer, {});
  const [renameGroup, renameGroupDispatch] = useReducer(renameGroupReducer, {});
  const [addGroup, addGroupDispatch] = useReducer(addGroupReducer, {});
  const [removeGroup, removeGroupDispatch] = useReducer(removeGroupReducer, {});
  const [selectedChat, setSelectedChat] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(false);

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
        addGroup,
        addGroupDispatch,
        removeGroup,
        removeGroupDispatch,
        fetchAgain,
        setFetchAgain,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
