import React from "react";
import { cn } from "@/src/lib/utils";
import { TodoRow } from "./todo-row";
import { useSelector } from "react-redux";
import { selectActiveFilter, selectIsTasksLoading, selectTasks } from "@/src/redux/slices/tasksSlice";
import { selectTitleFilter } from "@/src/redux/slices/filtersSlice";
import { TodoRowSkeleton } from "../ui/todo-row-skeleton";
import { FilterType } from "@/@types/filter";

interface Props {
  className?: string;
}

export const TodoList: React.FC<Props> = ({ className }) => {
  
  const activeFilter = useSelector(selectActiveFilter);
  const titleFilter = useSelector(selectTitleFilter);
  const tasks = useSelector(selectTasks);
  const filteredTasks = tasks.filter((task) =>
    task.title.toLocaleLowerCase().includes(titleFilter.toLocaleLowerCase())
  );
  const isTasksLoading = useSelector(selectIsTasksLoading);

  const isActiveEmpty = activeFilter === FilterType.ACTIVE && !filteredTasks.length;
  const isCompletedEmpty = activeFilter === FilterType.COMPLETED && !filteredTasks.length;

  return isTasksLoading ? (
    <ul
      className={cn(
        "bg-primary h-[385px] sm:h-[385px] 2xl:h-[481px] rounded-t-md overflow-y-auto dark:[color-scheme:dark]",
        className
      )}>
      {[...Array(4)].map((_, i) => (
        <TodoRowSkeleton key={i} />
      ))}
    </ul>
  ) : (
    <ul
      className={cn(
        "bg-primary h-[385px] sm:h-[385px] 2xl:h-[481px] rounded-t-md border-b-1",
        "border-[var(--very-dark-grayish-blue-2)] overflow-y-auto dark:[color-scheme:dark]",
        className
      )}>
      {!filteredTasks.length ? (
        <div className="h-full flex justify-center items-center">
          <h1 className="text-[var(--light-grayish-blue-hover)]/40 text-md sm:text-xl lg:text-2xl">
            {isActiveEmpty ? (
              "No active tasks set"
            ) : isCompletedEmpty ? (
              "No completed tasks set"
            ) : (
              <>
                Nothing here,
                <br />
                Add your first task for this day
              </>
            )}
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
