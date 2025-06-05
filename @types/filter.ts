import { Task } from "./user-tasks";

export interface TasksState {
  formData: {
    title: string;
    description: string;
    isCompleted: boolean;
    showDrawer: boolean;
    isGoogleEvent: boolean;
    startGoogleEventTime: string | null
    endGoogleEventTime: string | null
  };
  allTasks: Task[];
  tasks: Task[];
  isLoading: boolean;
  isTaskLoading: boolean,
  loadingTaskId: number | null;
  activeFilter: FilterType;
}

export enum FilterType {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed",
}
