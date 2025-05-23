import React from "react";
import { cn } from "@/src/lib/utils";
import { TodoRow } from "./todo-row";
import { getUserTasks } from "@/src/services/tasks";
import { useAppDispatch } from "@/src/redux/hooks";
import { useSelector } from "react-redux";
import { selectTasks } from "@/src/redux/slices/tasksSlice";
import { selectTitleFilter } from "@/src/redux/slices/filterSlice";

interface Props {
  className?: string;
}

export const TodoList: React.FC<Props> = ({ className }) => {
  const appDispatch = useAppDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const tasks = useSelector(selectTasks);
  const filteredTasks = tasks.filter((task) =>
    task.title.toLocaleLowerCase().includes(titleFilter.toLocaleLowerCase())
  );

  React.useEffect(() => {
    appDispatch(getUserTasks());
  }, [appDispatch]);

  return (
    <ul className={cn("bg-primary", className)}>
      {filteredTasks.map(({ id, title, description, status }) => (
        <TodoRow key={id} id={id} title={title} description={description} status={status} />
      ))}
    </ul>
  );
};
