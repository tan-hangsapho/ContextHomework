"use client";
import React, { ReactNode } from "react";
import { useContext, useState, createContext, useEffect } from "react";
import {
  getLocalStorage,
  setLocalStorage,
} from "@/LocalStorage/UseLocalStorage";

// Define the type for user information
interface UserInfo {
  id: string;
  username: string;
  description: string;
  profile: string | null;
}

interface ContextProps {
  users: UserInfo[];
  setuserInfo: React.Dispatch<React.SetStateAction<UserInfo[]>>;

  handleDelete: (id: string) => void;

  selectUser: string;
  setselectUser: React.Dispatch<React.SetStateAction<string>>;

  FindUser: UserInfo | undefined;

  updateUser: (id: string, newUpdateUser: UserInfo) => void;
}

interface MyContextProps {
  children: ReactNode;
}

// Create a context with a default value
const MyContext = createContext<ContextProps>({
  users: [],
  setuserInfo: () => {}, // Provide a default value

  handleDelete: () => {}, // Provide a default value

  setselectUser: () => {}, // Provide a default value
  selectUser: "",

  FindUser: undefined,

  updateUser: () => {},
});

// create a provider component
export const MyContextProvider: React.FC<MyContextProps> = ({ children }) => {
  // store state
  const [users, setuserInfo] = useState<UserInfo[]>([]);

  const [selectUser, setselectUser] = useState("");

  useEffect(() => {
    const userStorage = getLocalStorage("users")
      ? getLocalStorage("users")
      : [];
    setuserInfo(userStorage);
  }, []);

  // handle Delete Card
  const handleDelete = (id: string) => {
    const newUser = users.filter((item) => item.id !== id);
    setLocalStorage("users", newUser);
    setuserInfo(newUser);
    // If the deleted card was selected, clear the selection
    if (selectUser === id) {
      setselectUser("");
    }
  };

  // find selectuser
  const FindUser = users.find((item) => item.id === selectUser);

  const updateUser = (id: string, newUpdateUser: UserInfo) => {
    const newUsers = users.map((user) => {
      // If the existed user id === id we want to update
      // Update the info of user
      if (user.id === id) {
        return {
          ...user,
          ...newUpdateUser,
        };
      }
      // Else, return the existed user
      return user;
    });
    setuserInfo(newUsers);
    setLocalStorage("users", newUsers);
    setselectUser("");
  };

  // Provide the shared state and update function to the context
  const contextValue = {
    users,
    setuserInfo,
    handleDelete,
    setselectUser,
    selectUser,
    FindUser,
    updateUser,
  };

  return (
    <>
      <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
    </>
  );
};

// Create a custom hook to consume the context
export const useMyContext = () => useContext(MyContext);
