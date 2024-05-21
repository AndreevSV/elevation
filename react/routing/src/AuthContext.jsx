import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (loginData) => {
    if (loginData.login !== "bob" || loginData.password !== "12345") {
      alert("Incorrect login or password");
      return;
    }
    setUser(loginData);
  };

  const logout = () => {
    setUser(null);
  };

  const authValues = { user, login, logout };

  return (
    <AuthContext.Provider value={authValues}> {children} </AuthContext.Provider>
  );
};
export default AuthContext;
