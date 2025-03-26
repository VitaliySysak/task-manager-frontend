import React from "react";
import { cn } from "@/src/lib/utils";
import { TodoRow } from "./todo-row";
import { getUserTasks } from "@/src/services/tasks";
import { Task } from "@/@types/user-tasks";

interface Props {
  className?: string;
  filtredTasks?: Task[];
  refreshKey: number;
  onTaskChange: () => void;
}

export const TodoList: React.FC<Props> = ({ className, refreshKey, filtredTasks, onTaskChange }) => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const taskSource = filtredTasks !== undefined ? filtredTasks : tasks;

  React.useEffect(() => {
    async function fetchTasksInfo() {
      const data = await getUserTasks();
      setTasks(data);
    }
    fetchTasksInfo();
  }, [refreshKey]);

  return (
    <ul className={cn("bg-primary", className)}>
      {taskSource.map((task) => (
        <TodoRow
          onTaskDeleted={onTaskChange}
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
        />
      ))}
    </ul>
  );
};
