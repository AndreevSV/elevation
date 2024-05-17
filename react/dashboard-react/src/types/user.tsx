export enum Role {
  admin = "admin",
  user = "user",
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}
