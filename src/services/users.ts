import { axiosInstance } from "./axios-instance";

export const getUsers = async () => {
  return (await axiosInstance.get("/users/all")).data;
};

export const register = async (data: any) => {
  return (await axiosInstance.post("/users/register", data)).data;
};

export const registerAdmin = async (data: any) => {
  return (await axiosInstance.post("/users/admin/register", data)).data;
};

export const login = async (data: any) => {
  return (await axiosInstance.post("/users/login", data)).data;
};
