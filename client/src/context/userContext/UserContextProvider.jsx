import React, { createContext, useReducer, useEffect } from "react";
import { userReducer, usersReducer } from "./userReducer";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, {}, () => {
    const localData = localStorage.getItem("user");
    return localData ? JSON.parse(localData) : {};
  });
  const [users, usersDispatch] = useReducer(usersReducer, {});

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, dispatch, users, usersDispatch }}>
      {children}
    </UserContext.Provider>
  );
}
