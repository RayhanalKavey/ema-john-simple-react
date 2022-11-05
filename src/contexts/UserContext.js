import React from "react";
import { createContext } from "react";

export const AuthContext = createContext({ children });
const user = { email: "rohim@gmail.com" };
const authInfo = { user };
const UserContext = () => {
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
