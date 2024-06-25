import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
};

export const initial_state = {
  user: initialUser,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setAuthentication: () => {},
};

const AuthContext = createContext(initial_state);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      const user = await getCurrentUser();
      if (user[0] === 0) {
        const avatar = user[2];
        const newUser = await saveUser({
          accountid: user[1].$id,
          email: user[1].email,
          url: avatar,
          fullname: user[1].name,
        });
        if (newUser) {
          setUser({
            id: newUser.$id,
            email: newUser.email,
            fullname: newUser.fullname,
            avatar: newUser.url,
            roomno: newUser.roomno,
            rollno: newUser.rollno,
            phone: newUser.phone,
            hostelname: newUser.hostelname,
          });
          setIsAuthenticated(true);
          navigate("/allnotes");
        } else {
          alert("Something went wrong");
        }
      } else if (user[0] !== undefined) {
        setUser(user[3]);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkSession();
  }, [navigate]);

  const value = {
    user,
    isLoading: loading,
    isAuthenticated,
    setUser,
    setAuthentication: setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUserContext = () => useContext(AuthContext);