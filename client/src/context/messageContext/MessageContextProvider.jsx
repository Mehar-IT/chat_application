import React, { createContext, useReducer } from "react";
import { createMessageReducer, getMessageReducer } from "./messageReducer";

export const MessageContext = createContext();

export default function MessageContextProvider({ children }) {
  const [message, messageDispatch] = useReducer(createMessageReducer, {});
  const [allMessages, messagesDispatch] = useReducer(getMessageReducer, []);
  return (
    <MessageContext.Provider
      value={{ message, messageDispatch, allMessages, messagesDispatch }}
    >
      {children}
    </MessageContext.Provider>
  );
}
