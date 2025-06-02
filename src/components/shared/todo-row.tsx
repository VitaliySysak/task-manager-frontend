import React from "react";
import { cn } from "@/src/lib/utils";
import { IoIosArrowDown } from "react-icons/io";
import { TaskStatus } from "@/@types/user-tasks";
import { useAppDispatch } from "@/src/store/redux/hooks";
import { LucideLoaderCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { selectTaskIdLoading } from "@/src/store/redux/slices/tasksSlice";
import { deleteUserTask, updateUserTask } from "@/src/store/tasks";

interface Props {
  className?: string;
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export const TodoRow: React.FC<Props> = ({ className, id, title, description, status }) => {
  const dispatch = useAppDispatch();
  const loadingTaskId = useSelector(selectTaskIdLoading);
  const isLoading = loadingTaskId === id;
  const [showDrawer, setShowDrawer] = React.useState(false);

  const onUpdate = async () => {
    const isDone = status === TaskStatus.DONE;
    const newStatus = isDone ? TaskStatus.TODO : TaskStatus.DONE;
    await dispatch(updateUserTask({ id, title, description, status: newStatus }));
  };

  return (
    <>
      <li
        className={cn(
          "flex py-2 2xl:py-4 px-4 sm:px-8 gap-4 sm:gap-8 items-center bg-primary min-h-16 2xl:min-h-20 h-auto rounded-t-md border-b-1 border-[var(--very-dark-grayish-blue-2)]",
          className
        )}>
        {isLoading ? (
          <LucideLoaderCircle className="w-6 h-6 sm:w-8 sm:h-8 animate-spin" color="white" />
        ) : (
          <figure
            onClick={onUpdate}
            className={cn(
              status === TaskStatus.DONE
                ? "bg-[image:var(--linear-gradient)] before:text-xs sm:before:text-base before:content-['✔'] before:text-white before:flex before:items-center before:justify-center pt-1"
                : "bg-transparent",
              "border w-6 h-6 sm:w-8 sm:h-8 rounded-full border-[var(--very-dark-grayish-blue-2)] cursor-pointer"
            )}
          />
        )}

        <h2
          className={cn(
            "text-base sm:text-xl 2xl:text-2xl caret-white text-[var(--primary-font)]",
            "focus:outline-none flex-1 break-words whitespace-normal overflow-hidden",
            status === TaskStatus.DONE && "line-through text-[var(--very-dark-grayish-blue)]"
          )}>
          {title}
        </h2>
        <div className="flex gap-2 items-center">
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
            onClick={() => dispatch(deleteUserTask({ id }))}
            className="flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 cursor-pointer">
            <img
              className="w-4 h-4 sm:w-5 sm:h-5"
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
