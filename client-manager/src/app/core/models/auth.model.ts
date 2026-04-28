export enum UserRole {
  Customer = 0,
  Assembler = 1,
  Courier = 2,
  Manager = 3,
  Admin = 4
}

export interface User {
  id: number;
  username: string;
  phone: string;
  name?: string;
  avatarUrl?: string;
  role: UserRole;
  isActive: boolean;
  isDeleted: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}
