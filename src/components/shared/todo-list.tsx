import React from "react";
import { cn } from "@/src/lib/utils";
import { TodoRow } from "./todo-row";
import { getUserTasks } from "@/src/services/tasks";
import { useAppDispatch } from "@/src/redux/hooks";
import { useSelector } from "react-redux";
import { selectIsTasksLoading, selectTasks } from "@/src/redux/slices/tasksSlice";
import { selectTitleFilter } from "@/src/redux/slices/filtersSlice";
import { TodoRowSkeleton } from "../ui/todo-row-skeleton";
import { selectErrorMessage } from "@/src/redux/slices/errorSlice";

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
  const isTasksLoading = useSelector(selectIsTasksLoading);
  const errorMessage = useSelector(selectErrorMessage);

  console.log("errorMessage", errorMessage);

  React.useEffect(() => {
    appDispatch(getUserTasks());
  }, [appDispatch]);

  return isTasksLoading ? (
    <ul
      className={cn(
        "bg-primary h-[448px] lg:h-[480px] rounded-t-md overflow-y-auto dark:[color-scheme:dark]",
        className
      )}>
      {[...Array(4)].map((_, i) => (
        <TodoRowSkeleton key={i} />
      ))}
    </ul>
  ) : (
    <ul
      className={cn(
        "bg-primary h-[448px] lg:h-[480px] rounded-t-md border-b-1 border-[var(--very-dark-grayish-blue-2)] overflow-y-auto dark:[color-scheme:dark]",
        className
      )}>
      {!filteredTasks.length ? (
        <div className="h-full flex justify-center items-center">
          <h1 className="text-[var(--light-grayish-blue-hover)]/40 text-xl lg:text-2xl">
            Nothing here, <br /> Add your first task for this day
          </h1>
        </div>
      ) : (
        filteredTasks.map(({ id, title, description, status }) => (
          <TodoRow key={id} id={id} title={title} description={description} status={status} />
        ))
      )}
    </ul>
  );
};
