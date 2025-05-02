import { LoginUser, ReginsterUser, User } from "@/@types/users";
import { axiosInstance } from "./axios-instance";

export const getUsers = async () => {
  return (await axiosInstance.get("/users/all")).data;
};

export const register = async (data: ReginsterUser) => {
  return (await axiosInstance.post("/users/register", data)).data;
};

export const registerAdmin = async (data: ReginsterUser) => {
  return (await axiosInstance.post<User>("/users/admin/register", data)).data;
};

export const login = async (data: LoginUser) => {
  return (await axiosInstance.post("/users/login", data)).data;
};
