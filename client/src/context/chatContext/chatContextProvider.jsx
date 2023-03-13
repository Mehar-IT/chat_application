import React, { createContext, useReducer } from "react";
import { userReducer } from "./userReducer";

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [chat, dispatch] = useReducer(userReducer, {});

  return (
    <ChatContext.Provider value={{ chat, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}
