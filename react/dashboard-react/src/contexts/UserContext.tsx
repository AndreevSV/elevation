import { ReactNode, createContext, useState } from "react";
import { Role, User } from "../types/user";
import usersData from "../mocks/jsons/users.json";

interface UserContextType {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  clearUserContext: () => void;
}

const initialState: UserContextType = {
  id: "",
  setId: () => {},
  email: "",
  setEmail: () => {},
  firstName: "",
  setFirstName: () => {},
  lastName: "",
  setLastName: () => {},
  role: Role.user,
  setRole: () => {},
  users: [],
  setUsers: () => {},
  clearUserContext: () => {},
};

export const UserContext = createContext<UserContextType>(initialState);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<Role>(Role.user);
  const [users, setUsers] = useState<User[]>(
    usersData.map((user) => ({
      ...user,
      role: Role[user.role as keyof typeof Role],
    }))
  );

  const clearUserContext = () => {
    setId("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setRole(Role.user);
  };

  return (
    <UserContext.Provider
      value={{
        id,
        setId,
        email,
        setEmail,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        role,
        setRole,
        users,
        setUsers,
        clearUserContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
