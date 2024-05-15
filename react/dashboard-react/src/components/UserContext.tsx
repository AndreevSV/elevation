import { ReactNode, createContext, useState } from "react";
import { Role } from "../pages/CreateUserPage";

interface UserContextType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
  clearContext: () => void;
}

const initialState: UserContextType = {
  email: "",
  setEmail: () => {},
  role: Role.user,
  setRole: () => {},
  clearContext: () => {},
};

export const UserContext = createContext<UserContextType>(initialState);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>(Role.user);

  const clearContext = () => {
    setEmail("");
    setRole(Role.user);
  };

  return (
    <UserContext.Provider
      value={{ email, setEmail, role, setRole, clearContext }}
    >
      {children}
    </UserContext.Provider>
  );
};
