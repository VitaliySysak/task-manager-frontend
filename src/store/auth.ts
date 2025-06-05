import { LoginUser, ReginsterUser, User } from "@/@types/users";
import axios from "axios";
import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "@/src/services/api-client";
import { axiosInstance } from "../services/axios-instance";

export const getUsers = async () => {
  return (await axiosInstance.get("/users/all")).data;
};

export const registerAdmin = async (data: ReginsterUser) => {
  return (await axiosInstance.post<User>("/auth/admin/register", data)).data;
};

export const registerUser = createAsyncThunk<string, ReginsterUser>(
  "auth/register",
  async (data, thunkApi) => {
    try {
      const accessToken = await Api.auth.register(data);

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
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Error while execution auth/register");
    }
  }
);

export const loginUser = createAsyncThunk<string, LoginUser>("auth/login", async (data, thunkApi) => {
  try {
    const accessToken = await Api.auth.login(data);

    return accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Failed to login, network error", { icon: "❌" });
      } else if (error.response?.data?.message === "Wrong email or password") {
        toast.error("Wrong Email or Password", { icon: "❌" });
      }
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue("Error while execution auth/login");
  }
});

export const logOutUser = createAsyncThunk("auth/logOut", async () => {
  try {
    await Api.auth.logOut();
  } catch (error) {
    console.error("Error while execution auth/logOut:", error);
  }
});

export const refreshToken = createAsyncThunk<string, void>("auth/refreshToken", async (_, thunkApi) => {
  try {
    const accessToken = await Api.auth.refresh();

    return accessToken;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Failed to refresh, network error", { icon: "❌" });
      }
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue("Error while execution auth/refreshToken");
  }
});

export const calendarUserLogin = createAsyncThunk("auth/calendarUserLogin", async (_, thunkApi) => {
  try {
    const accessToken = await Api.auth.calendarLogin();

    return accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Failed to calendarUserLogin, network error", { icon: "❌" });
      }
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue("Error while execution auth/calendarUserLogin");
  }
});

export const calendarRefreshToken = createAsyncThunk("auth/calendarRefreshToken", async (_, thunkApi) => {
  try {
    const accessToken = await Api.auth.calendarRefresh();

    return accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Failed to calendarRefreshToken, network error", { icon: "❌" });
      }
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue("Error while execution auth/calendarRefreshToken");
  }
});
