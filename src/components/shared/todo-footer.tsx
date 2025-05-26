import React from "react";
import { cn } from "@/src/lib/utils";
import { useSelector } from "react-redux";
import { selectTasks } from "@/src/redux/slices/tasksSlice";
import { TaskStatus } from "@/@types/user-tasks";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface Props {
  className?: string;
}

export const TodoFooter: React.FC<Props> = ({ className }) => {
  const tasks = useSelector(selectTasks);
  const taskToCompleteCount = tasks.filter(({ status }) => status === TaskStatus.TODO).length;
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 sm:px-8 h-12 bg-primary rounded-b-md text-[var(--very-dark-grayish-blue)]",
        className
      )}>
      {taskToCompleteCount ? (
        <h3 className="text-sm sm:text-md">
          {taskToCompleteCount} {taskToCompleteCount === 1 ? "task" : "tasks"} left
        </h3>
      ) : (
        <Skeleton className="w-18 h-6" />
      )}
      <Button className="text-[var(--very-dark-grayish-blue)] cursor-pointer">Clear Completed</Button>
    </div>
  );
};
