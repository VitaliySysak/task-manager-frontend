export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum TaskStatus {
  TODO = "TODO",
  DONE = "DONE",
}

////////////////////////////////////////

export interface UserTasks {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface CreateTask {
  title: string;
  description?: string;
}

export interface UpdateTask {
  id: number;
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface DeleteTask {
  id: number;
}
