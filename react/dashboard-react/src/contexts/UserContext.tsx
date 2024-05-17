import { ReactNode, createContext, useState } from "react";
import { Role, User } from "../types/user";

interface UserContextType {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  clearContext: () => void;
}

const initialState: UserContextType = {
  id: "",
  setId: () => {},
  email: "",
  setEmail: () => {},
  role: Role.user,
  setRole: () => {},
  users: [],
  setUsers: () => {},
  clearContext: () => {},
};

export const UserContext = createContext<UserContextType>(initialState);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>(Role.user);
  const [users, setUsers] = useState<User[]>([]);

  const clearContext = () => {
    setId("");
    setEmail("");
    setRole(Role.user);
  };

  return (
    <UserContext.Provider
      value={{ id, setId, email, setEmail, role, setRole, users, setUsers, clearContext }}
    >
      {children}
    </UserContext.Provider>
  );
};
