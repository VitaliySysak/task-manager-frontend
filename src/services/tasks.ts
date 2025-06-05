import { CreateTask, DeleteTask, Task, TaskStatus, UpdateTask } from "@/@types/user-tasks";
import { axiosInstance } from "./axios-instance";

export const getTasks = async (token: string) => {
  const tasks = (await axiosInstance.get<Task[]>("/tasks", { headers: { Authorization: `Bearer ${token}` } }))
    .data;

  return tasks;
};
export const addTask = async (newTask: CreateTask, token: string) => {
  const { data } = await axiosInstance.post<Task>("/tasks", newTask, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const updateTask = async (
  id: number,
  task: { title?: string; description?: string; status?: TaskStatus },
  token: string
) => {
  const { data } = await axiosInstance.put<Task>("/tasks/" + id, task, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const deleteTask = async (taskToDelete: DeleteTask, token: string) => {
  const { data } = await axiosInstance.delete<Task>("/tasks/" + taskToDelete.id, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const deleteCompletedTasks = async (ids: { ids: number[] }, token: string) => {
  const { tasksId } = (
    await axiosInstance.post<{ tasksId: number[] }>("/tasks/delete-many", ids, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;

  return tasksId;
};

export const createGoogleEvent = async (newTask: CreateTask, token: string, googleAccessToken: string) => {
  const taskData = { newTask, googleAccessToken };

  const { data } = await axiosInstance.post<Task>("/tasks/create-event", taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
