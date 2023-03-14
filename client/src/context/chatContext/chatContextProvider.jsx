import React, { createContext, useReducer } from "react";
import {
  createChatReducer,
  getChatReducer,
  crateGroupReducer,
} from "./chatReducer";

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [chat, dispatch] = useReducer(createChatReducer, {});
  const [chats, getChatDispatch] = useReducer(getChatReducer, {});
  const [createGroup, crateGroupDispatch] = useReducer(crateGroupReducer, {});

  return (
    <ChatContext.Provider
      value={{
        chat,
        dispatch,
        chats,
        getChatDispatch,
        crateGroupDispatch,
        createGroup,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
