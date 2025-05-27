import { Task } from "./user-tasks";

export interface TasksState {
  allTasks: Task[];
  tasks: Task[];
  isLoading: boolean;
  activeFilter: FilterType;
}

export enum FilterType {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed",
}
