export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface ReginsterUser {
  fullName?: string;
  email: string;
  password: string;
}

export interface LoginUser {
  fullName?: string;
  email: string;
  password: string;
}
