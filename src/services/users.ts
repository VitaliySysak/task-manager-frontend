import { LoginUser, ReginsterUser, User } from "@/@types/users";
import { axiosInstance } from "./axios-instance";
import axios from "axios";
import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = async () => {
  return (await axiosInstance.get("/users/all")).data;
};

export const registerAdmin = async (data: ReginsterUser) => {
  return (await axiosInstance.post<User>("/users/admin/register", data)).data;
};

export const register = createAsyncThunk<string, ReginsterUser>("auth/register", async (data, thunkApi) => {
  try {
    const { accessToken } = (
      await axiosInstance.post<{ accessToken: string }>("/auth/register", {
        ...data,
        email: data.email.toLowerCase(),
      })
    ).data;

    return accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Failed to register, network error", { icon: "❌" });
      } else if (error.response?.data?.message === "User with email " + data.email + " already exists") {
        toast.error("User with email " + data.email + " already exists", {
          icon: "❌",
        });
      }
    }
    return thunkApi.rejectWithValue(error);
  }
});

export const login = createAsyncThunk<string, LoginUser>("auth/login", async (data, thunkApi) => {
  try {
    const { accessToken } = (
      await axiosInstance.post<{ accessToken: string }>("/auth/login", {
        ...data,
        email: data.email.toLowerCase(),
      })
    ).data;

    return accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Failed to login, network error", { icon: "❌" });
      } else if (error.response?.data?.message === "Wrong email or password") {
        toast.error("Wrong Email or Password", { icon: "❌" });
      }
    }
    return thunkApi.rejectWithValue(error);
  }
});

export const refreshToken = createAsyncThunk<string, void>("auth/refreshToken", async (_, thunkApi) => {
  try {
    const { accessToken } = (
      await axiosInstance.post<{ accessToken: string }>("/auth/refresh", {}, { withCredentials: true })
    ).data;

    return accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Failed to refresh, network error", { icon: "❌" });
      }
    }
    return thunkApi.rejectWithValue(error);
  }
});

export const logOut = async () => {
  try {
    await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
  } catch (error) {
    console.error("Error while execution users/logOut:", error);
  }
};
