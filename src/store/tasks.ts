import { CreateTask, DeleteTask, Task, UpdateTask } from "@/@types/user-tasks";
import { axiosInstance } from "@/src/services/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { RootState } from "./redux/store";
import { Api } from "../services/api-client";

export const getAllUsersTasks = async () => {
  return (await axiosInstance.get<Task[]>("/tasks/all")).data;
};

export const getUserTasks = createAsyncThunk<Task[], void, { state: RootState }>(
  "tasks/getAllTasks",
  async (_, thunkApi) => {
    const token = thunkApi.getState().auth.accessToken;
    try {
      const allTasks = await Api.tasks.getTasks(token!);

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
      const taskData = await Api.tasks.addTask(newTask, token!);

      return taskData;
    } catch (error) {
      console.error("Error while execution tasks/createUserTask:", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateUserTask = createAsyncThunk<Task, UpdateTask, { state: RootState }>(
  "tasks/updateUserTask",
  async (updateTask, thunkApi) => {
    const { id, ...task } = updateTask;
    const token = thunkApi.getState().auth.accessToken;
    try {
      const taskData = await Api.tasks.updateTask(id, task, token!);

      return taskData;
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
      const taskData = Api.tasks.deleteTask(taskToDelete, token!);

      return taskData;
    } catch (error) {
      console.error("Error while execution tasks/deleteUserTask:", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteCompletedUserTasks = createAsyncThunk<number[], number[], { state: RootState }>(
  "tasks/deleteCompletedUserTasks",
  async (tasksToDelete, thunkApi) => {
    const token = thunkApi.getState().auth.accessToken;
    const ids = { ids: tasksToDelete };
    try {
      const tasksId = Api.tasks.deleteCompletedTasks(ids, token!);

      return tasksId;
    } catch (error) {
      console.error("Error while execution tasks/deleteCompletedUserTasks:", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
