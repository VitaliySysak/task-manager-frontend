import { LoginUser, ReginsterUser } from "@/@types/users";
import { axiosInstance } from "./axios-instance";

export const register = async (data: ReginsterUser) => {
  const { accessToken } = (
    await axiosInstance.post<{ accessToken: string }>("/auth/register", {
      ...data,
      email: data.email.toLowerCase(),
    })
  ).data;

  return accessToken;
};

export const login = async (data: LoginUser) => {
  const { accessToken } = (
    await axiosInstance.post<{ accessToken: string }>("/auth/login", {
      ...data,
      email: data.email.toLowerCase(),
    })
  ).data;

  return accessToken;
};

export const refresh = async () => {
  const { accessToken } = (
    await axiosInstance.post<{ accessToken: string }>("/auth/refresh", {}, { withCredentials: true })
  ).data;

  return accessToken;
};

export const logOut = async () => {
  const isSuccess = await axiosInstance.post("/auth/logout", {}, { withCredentials: true });

  return isSuccess;
};

export const calendarLogin = async () => {
  await axiosInstance.get<{ accessToken: string }>("/auth/calendar/connect", {
    withCredentials: true,
  });
};

export const calendarRefresh = async () => {
  const { accessToken } = (
    await axiosInstance.get<{ accessToken: string }>("/auth/calendar/refresh", {
      withCredentials: true,
    })
  ).data;

  return accessToken;
};
