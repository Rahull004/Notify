import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, saveUser } from "./appwrite/api";

export const initialUser = {
  id: "",
  email: "",
  fullname: "",
  avatar: "",
  roomno: "",
  rollno: "",
  phone: "",
  hostelname: "",
  $id: "" // Added for consistency with Appwrite response
};

const AuthContext = createContext({
  user: initialUser,
  isLoading: true,
  isAuthenticated: false,
  setUser: () => { },
  checkAuthStatus: async () => { },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      const response = await getCurrentUser();

      if (response[0] === 0) { // New user
        const [status, accountData, avatar] = response;
        const newUser = await saveUser({
          accountid: accountData.$id,
          email: accountData.email,
          url: avatar,
          fullname: accountData.name,
        });

        if (newUser) {
          setUser({
            ...newUser,
            id: newUser.$id,
            avatar: newUser.url
          });
          setIsAuthenticated(true);
        }
      } else if (response[3]) { // Existing user
        setUser(response[3]);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(initialUser);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated,
      setUser,
      checkAuthStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserContext = () => useContext(AuthContext);