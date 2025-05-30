import React from "react";
import { cn } from "@/src/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveFilter,
  selectTasks,
  setActive,
  setAll,
  setCompleted,
} from "@/src/redux/slices/tasksSlice";
import { TaskStatus } from "@/@types/user-tasks";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { deleteCompletedUserTasks } from "@/src/services/tasks";
import { useAppDispatch } from "@/src/redux/hooks";
import toast from "react-hot-toast";
import { FilterType } from "@/@types/filter";

interface Props {
  className?: string;
}

export const TodoFooter: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const activeFilter = useSelector(selectActiveFilter);
  const tasks = useSelector(selectTasks);
  const taskToCompleteCount = tasks.filter(({ status }) => status === TaskStatus.TODO).length;
  const completedTasksId = tasks.filter(({ status }) => status === TaskStatus.DONE).map(({ id }) => id);

  const deleteCompletedTasks = () => {
    if (completedTasksId.length) {
      appDispatch(deleteCompletedUserTasks(completedTasksId));
    } else {
      toast.error("No tasks completed", { icon: "❌" });
    }
  };

  return (
    <footer className="flex flex-col gap-4">
      <div
        className={cn(
          "flex items-center justify-between px-4 sm:px-8 h-12 2xl:h-16 bg-primary rounded-b-md text-[var(--light-grayish-blue-hover)]/40",
          className
        )}>
        {taskToCompleteCount !== undefined ? (
          <h3 className="text-sm sm:text-md 2xl:text-lg font-light min-w-[100px]">
            <span className="tabular-nums">{taskToCompleteCount}</span>{" "}
            {taskToCompleteCount === 1 ? "task" : "tasks"} left
          </h3>
        ) : (
          <Skeleton className="w-18 h-6" />
        )}
        <div className="hidden sm:flex">
          <Button
            onClick={() => dispatch(setAll())}
            className={cn(
              "2xl:text-lg text-[var(--light-grayish-blue-hover)]/40 p-2 cursor-pointer",
              activeFilter === FilterType.ALL && "text-[var(--active-font)]"
            )}>
            All
          </Button>
          <Button
            onClick={() => dispatch(setActive())}
            className={cn(
              "2xl:text-lg text-[var(--light-grayish-blue-hover)]/40 p-2 cursor-pointer",
              activeFilter === FilterType.ACTIVE && "text-[var(--active-font)]"
            )}>
            Active
          </Button>
          <Button
            onClick={() => dispatch(setCompleted())}
            className={cn(
              "2xl:text-lg text-[var(--light-grayish-blue-hover)]/40 p-2 cursor-pointer",
              activeFilter === FilterType.COMPLETED && "text-[var(--active-font)]"
            )}>
            Completed
          </Button>
        </div>
        <Button
          onClick={deleteCompletedTasks}
          className="2xl:text-lg text-[var(--light-grayish-blue-hover)]/40 font-light cursor-pointer">
          Clear Completed
        </Button>
      </div>
      <div
        className={cn(
          "sm:hidden flex items-center justify-center px-4 sm:px-8 h-12",
          "bg-primary rounded-md text-[var(--very-dark-grayish-blue)]"
        )}>
        <div className="flex">
          <Button
            onClick={() => dispatch(setAll())}
            className={cn(
              "text-[var(--light-grayish-blue-hover)]/40 p-2 cursor-pointer",
              activeFilter === FilterType.ALL && "text-[var(--active-font)]"
            )}>
            All
          </Button>
          <Button
            onClick={() => dispatch(setActive())}
            className={cn(
              "text-[var(--light-grayish-blue-hover)]/40 p-2 cursor-pointer",
              activeFilter === FilterType.ACTIVE && "text-[var(--active-font)]"
            )}>
            Active
          </Button>
          <Button
            onClick={() => dispatch(setCompleted())}
            className={cn(
              "text-[var(--light-grayish-blue-hover)]/40 p-2 cursor-pointer",
              activeFilter === FilterType.COMPLETED && "text-[var(--active-font)]"
            )}>
            Completed
          </Button>
        </div>
      </div>
    </footer>
  );
};
