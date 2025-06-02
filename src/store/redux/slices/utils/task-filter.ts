import { FilterType } from "@/@types/filter";
import { Task, TaskStatus } from "@/@types/user-tasks";

export const applyFilter = (allTasks: Task[], filter: FilterType): Task[] => {
  switch (filter) {
    case "active":
      return allTasks.filter((t) => t.status === TaskStatus.TODO);
    case "completed":
      return allTasks.filter((t) => t.status === TaskStatus.DONE);
    default:
      return allTasks;
  }
};
