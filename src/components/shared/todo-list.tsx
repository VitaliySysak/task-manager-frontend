import React from "react";
import { cn } from "@/src/lib/utils";
import { TodoRow } from "./todo-row";
import { getUserTasks } from "@/src/services/tasks";
import { useAppDispatch } from "@/src/redux/hooks";
import { useSelector } from "react-redux";
import { selectTasks } from "@/src/redux/slices/tasksSlice";
import { selectTitleFilter } from "@/src/redux/slices/filterSlice";
import { TodoRowSkeleton } from "../ui/todo-row-skeleton";

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

  return tasks.length === 0 ? (
    <ul
      className={cn(
        "bg-primary h-[448px] lg:h-[480px] rounded-md overflow-y-auto dark:[color-scheme:dark]",
        className
      )}>
      {[...Array(8)].map((_, i) => (
        <TodoRowSkeleton key={i} />
      ))}
    </ul>
  ) : (
    <ul
      className={cn(
        "bg-primary h-[448px] lg:h-[480px] rounded-md overflow-y-auto dark:[color-scheme:dark]",
        className
      )}>
      {filteredTasks.map(({ id, title, description, status }) => (
        <TodoRow key={id} id={id} title={title} description={description} status={status} />
      ))}
    </ul>
  );
};
