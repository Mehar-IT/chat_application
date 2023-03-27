import React, { createContext, useReducer } from "react";
import {
  createNotificationReducer,
  getNotificationReducer,
  deleteNotificationReducer
} from "./notificationReducer";

export const NotificationContext = createContext();

export default function NotificationContextProvider({ children }) {
  const [notification, dispatch] = useReducer(createNotificationReducer, []);
  const [allNotifications, allNotificationReducer] = useReducer(
    getNotificationReducer,
    []
  );
  const [deleteNotification, deleteNotifyReducer] = useReducer(
    deleteNotificationReducer,
    []
  );

  return (
    <NotificationContext.Provider
      value={{
        notification,
        dispatch,
        allNotifications,
        allNotificationReducer,
        deleteNotification,
        deleteNotifyReducer
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
