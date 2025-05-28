import { CreateTask, DeleteTask, Task, UpdateTask, UserTasks } from "@/@types/user-tasks";
import { axiosInstance } from "./axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { RootState } from "../redux/store";

export const getAllUsersTasks = async () => {
  return (await axiosInstance.get<Task[]>("/tasks/all")).data;
};

export const getUserTasks = createAsyncThunk<Task[], void, { state: RootState }>(
  "tasks/getAllTasks",
  async (_, thunkApi) => {
    const token = thunkApi.getState().auth.accessToken;
    try {
      const allTasks = (
        await axiosInstance.get<Task[]>("/tasks", { headers: { Authorization: `Bearer ${token}` } })
      ).data;

      return allTasks;
    } catch (error) {
      if (error) toast.error("Faliled to load tasks", { icon: "❌" });
      console.error("Error while fetching tasks:", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createUserTask = createAsyncThunk<Task, CreateTask, { state: RootState }>(
  "tasks/createUserTask",
  async (newTask, thunkApi) => {
    const token = thunkApi.getState().auth.accessToken;
    try {
      const { data } = await axiosInstance.post<Task>("/tasks", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.error("Error while execution tasks/createUserTask:", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateUserTask = createAsyncThunk<Task, UpdateTask, { state: RootState }>(
  "tasks/updateUserTask",
  async (updateTask, thunkApi) => {
    const token = thunkApi.getState().auth.accessToken;
    try {
      const { data } = await axiosInstance.put<Task>("/tasks/" + updateTask.id, updateTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.error("Error while execution tasks/updateUserTask:", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteUserTask = createAsyncThunk<Task, DeleteTask, { state: RootState }>(
  "tasks/deleteUserTask",
  async (taskToDelete, thunkApi) => {
    const token = thunkApi.getState().auth.accessToken;
    try {
      const { data } = await axiosInstance.delete<Task>("/tasks/" + taskToDelete.id, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.error("Error while execution tasks/deleteUserTask:", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteCompletedUserTasks = createAsyncThunk<{ ids: number[] }, number[], { state: RootState }>(
  "tasks/deleteCompletedUserTasks",
  async (tasksToDelete, thunkApi) => {
    const token = thunkApi.getState().auth.accessToken;
    const ids = { ids: tasksToDelete };
    try {
      await axiosInstance.post<{ status: boolean }>("/tasks/delete-many", ids, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return ids;
    } catch (error) {
      console.error("Error while execution tasks/deleteCompletedUserTasks:", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
