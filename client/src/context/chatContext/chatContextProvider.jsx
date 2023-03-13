import React, { createContext, useReducer } from "react";
import { createChatReducer, getChatReducer } from "./chatReducer";

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [chat, dispatch] = useReducer(createChatReducer, {});
  const [chats, getChatDispatch] = useReducer(getChatReducer, {});

  return (
    <ChatContext.Provider value={{ chat, dispatch, chats, getChatDispatch }}>
      {children}
    </ChatContext.Provider>
  );
}
