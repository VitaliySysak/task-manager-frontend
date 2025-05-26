import { CreateTask, DeleteTask, Task, TaskStatus, UpdateTask, UserTasks } from "@/@types/user-tasks";
import { axiosInstance } from "./axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getAllUsersTasks = async () => {
  return (await axiosInstance.get<Task[]>("/tasks/all")).data;
};

export const getUserTasks = createAsyncThunk<Task[], Partial<UserTasks | void>>(
  "tasks/getAllTasks",
  async (params, thunkApi) => {
    try {
      const allTasks = (await axiosInstance.get<Task[]>("/tasks", { params })).data;
  
      return allTasks;
    } catch (error) {
      toast.error("Faliled to load tasks", { icon: "❌" });
      console.error("Error while fetching tasks:", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createUserTask = createAsyncThunk(
  "tasks/createUserTask",
  async (newTask: CreateTask, thunkApi) => {
    try {
      const createdTask = (await axiosInstance.post<Task>("/tasks", newTask)).data;
      return createdTask;
    } catch (error) {
      console.error("Error while execution tasks/createUserTask:", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateUserTask = createAsyncThunk(
  "tasks/updateUserTask",
  async (updateTask: UpdateTask, thunkApi) => {
    try {
      const updatedTask = (await axiosInstance.put<Task>("/tasks/" + updateTask.id, updateTask)).data;

      return updatedTask;
    } catch (error) {
      console.error("Error while execution tasks/updateUserTask:", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteUserTask = createAsyncThunk(
  "tasks/deleteUserTask",
  async (deleteTask: DeleteTask, thunkApi) => {
    try {
      const deletedTask = (await axiosInstance.delete<Task>("/tasks/" + deleteTask.id)).data;

      return deletedTask;
    } catch (error) {
      console.error("Error while execution value:", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
