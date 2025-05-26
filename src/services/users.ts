import { LoginUser, ReginsterUser, User } from "@/@types/users";
import { axiosInstance } from "./axios-instance";
import axios from "axios";
import toast from "react-hot-toast";

export const getUsers = async () => {
  return (await axiosInstance.get("/users/all")).data;
};

export const registerAdmin = async (data: ReginsterUser) => {
  return (await axiosInstance.post<User>("/users/admin/register", data)).data;
};

export const register = async (data: ReginsterUser) => {
  try {
    const { token } = (await axiosInstance.post("/users/register", data)).data;
    return token;
  } catch (error) {
    if (axios.isAxiosError(error))
      if (error.code === "ERR_NETWORK") {
        toast.error("Failed to register, network error", { icon: "❌" });
      } else if (error.response?.data?.message === "User with email " + data.email + " already exists") {
        toast.error("User with email " + data.email + " already exists", { icon: "❌" });
      } else {
        throw new Error();
      }
  }
};

export const login = async (data: LoginUser) => {
  try {
    const { token } = (await axiosInstance.post("/users/login", data)).data;
    return token;
  } catch (error) {
    if (axios.isAxiosError(error))
      if (error.code === "ERR_NETWORK") {
        toast.error("Failed to login, network error", { icon: "❌" });
      } else if (error.response?.data?.message === "Wrong email or password") {
        toast.error("Wrong Email or Password", { icon: "❌" });
      }
  }
};
