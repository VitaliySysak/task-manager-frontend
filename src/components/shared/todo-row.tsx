import React from "react";
import { cn } from "@/src/lib/utils";
import { deleteUserTask, updateUserTask } from "@/src/services/tasks";
import { IoIosArrowDown } from "react-icons/io";
import { TaskStatus } from "@/@types/user-tasks";
import { useAppDispatch } from "@/src/redux/hooks";
import { LucideLoaderCircle } from "lucide-react";

interface Props {
  className?: string;
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export const TodoRow: React.FC<Props> = ({ className, id, title, description, status }) => {
  const appDispatch = useAppDispatch();
  const [toggleTask, setToggleTask] = React.useState<TaskStatus>(status);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onUpdate = async () => {
    setIsLoading(true);
    const newStatus = toggleTask === TaskStatus.DONE ? TaskStatus.TODO : TaskStatus.DONE;
    setToggleTask(newStatus);
    await appDispatch(updateUserTask({ id, title, description, status: newStatus }));
    setIsLoading(false);
  };

  return (
    <>
      <li
        className={cn(
          "flex px-4 sm:px-8 gap-4 sm:gap-8 items-center bg-primary h-16 lg:h-20 rounded-t-md border-b-1 border-[var(--very-dark-grayish-blue-2)]",
          className
        )}>
        {isLoading ? (
          <LucideLoaderCircle className="w-6 h-6 sm:w-8 sm:h-8 animate-spin" color="white" />
        ) : (
          <figure
            onClick={onUpdate}
            className={cn(
              toggleTask === TaskStatus.DONE
                ? "bg-[image:var(--linear-gradient)] before:text-xs sm:before:text-base before:content-['✔'] before:text-white before:flex before:items-center before:justify-center pt-1"
                : "bg-transparent",
              "border w-6 h-6 sm:w-8 sm:h-8 rounded-full border-[var(--very-dark-grayish-blue-2)] cursor-pointer"
            )}
          />
        )}

        <p className="text-base sm:text-2xl text-[var(--primary-font)] caret-white focus:outline-none flex-1">
          {title}
        </p>
        <div className="flex gap-2">
          {description && (
            <button
              onClick={() => setShowDrawer((prev) => !prev)}
              className="flex justify-center items-center w-6 h-6 sm:w-10 sm:h-10 cursor-pointer"
              type="button">
              <IoIosArrowDown
                color="var(--very-dark-grayish-blue)"
                className={cn(showDrawer && "rotate-180", "w-5 h-5 sm:w-8 sm:h-8")}
              />
            </button>
          )}

          <button
            onClick={() => appDispatch(deleteUserTask({ id }))}
            className="flex justify-center items-center w-6 h-6 sm:w-10 sm:h-10 cursor-pointer">
            <img
              className="w-3 h-3 sm:w-5 sm:h-5"
              src="/icons/icon-cross.svg"
              fetchPriority="high"
              alt="cross"
            />
          </button>
        </div>
      </li>

      {showDrawer && description && (
        <div className="px-14 sm:px-24 py-3 bg-[var(--very-dark-desaturated-blue)] text-white rounded-b-md text-sm sm:text-base border-t border-[var(--very-dark-grayish-blue-2)]">
          <p className="whitespace-pre-line break-words">{description}</p>
        </div>
      )}
    </>
  );
};
