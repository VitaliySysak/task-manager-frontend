import { CreateTask, Task, TaskStatus, UpdateTask } from "@/@types/user-tasks";
import { axiosInstance } from "./axios-instance";

export const getAllUsersTasks = async () => {
  return (await axiosInstance.get<Task[]>("/tasks/all")).data;
};

export const getUserTasks = async (title?: string, description?: string, status?: TaskStatus) => {
  const params: Record<string, string> = {};

  if (title) params.title = title;
  if (description) params.description = description;
  if (status) params.status = status;

  return (await axiosInstance.get<Task[]>("/tasks", { params })).data;
};

export const createUserTask = async (newTask: CreateTask) => {
  return (await axiosInstance.post<Task[]>("/tasks", newTask)).data;
};

export const updateUserTask = async (id: number, updatedTask: UpdateTask) => {
  return (await axiosInstance.put<Task[]>("/tasks/" + id, updatedTask)).data;
};

export const deleteUserTask = async (id: number) => {
  return (await axiosInstance.delete<Task[]>("/tasks/" + id)).data;
};
