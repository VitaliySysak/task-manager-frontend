import { Task } from "./user-tasks";

export interface TasksState {
  allTasks: Task[];
  tasks: Task[];
  isLoading: boolean;
  loadingTaskId: number | null;
  activeFilter: FilterType;
}

export enum FilterType {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed",
}
