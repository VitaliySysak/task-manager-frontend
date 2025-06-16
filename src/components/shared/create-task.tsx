import { cn } from "@/src/lib/utils";
import { createUserGoogleEvent, createUserTask } from "@/src/store/tasks";
import { IoIosAdd, IoIosArrowDown } from "react-icons/io";
import React from "react";
import { useAppDispatch } from "@/src/store/redux/hooks";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  resetTaskForm,
  selectTaskForm,
  selectTasks,
  setShowTaskDrawer,
  setTaskTitle,
  toggleTaskIsCompleted,
} from "@/src/store/redux/slices/tasksSlice";
import { TodoDrawer } from "./todo-drawer";
import { selectIsLoggedIn } from "@/src/store/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string;
}

export const CreateTask: React.FC<Props> = ({ className }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const taskForm = useSelector(selectTaskForm);

  const dispatch = useAppDispatch();

  const tasks = useSelector(selectTasks);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const isTaskGoogleEvent = taskForm.isGoogleEvent;
      const isExist = tasks.some(({ title }) => title === taskForm.title);

      if (isLoggedIn) {
        if (taskForm.title) {
          if (!isExist) {
            if (!isTaskGoogleEvent) {
              dispatch(
                createUserTask({
                  title: taskForm.title,
                  description: taskForm.description,
                  isCompleted: taskForm.isCompleted,
                })
              );
            } else {
              dispatch(
                createUserGoogleEvent({
                  title: taskForm.title,
                  description: taskForm.description,
                  isCompleted: taskForm.isCompleted,
                  startEventTime: taskForm.startGoogleEventTime,
                  endEventTime: taskForm.endGoogleEventTime,
                })
              );
            }
          } else {
            toast.error("Task with same title alredy exist", { icon: "❌" });
          }
          dispatch(resetTaskForm());
        } else {
          toast.error("Task title can't be empty", { icon: "❌" });
        }
      } else {
        navigate("/auth");
        toast.error("You need to log in!", { icon: "❌" });
      }
    } catch (error) {
      console.error("Error while execution create-task/onSubmitHandler:", error);
    }
  };
  return (
    <>
      <form
        className={cn(
          "flex px-4 sm:px-8 gap-4 sm:gap-8 items-center bg-primary min-w-0 min-h-16 2xl:min-h-20",
          "overflow-y-auto overflow-x-hidden dark:[color-scheme:dark] rounded-md",
          className
        )}
        onSubmit={onSubmitHandler}>
        <figure
          onClick={() => dispatch(toggleTaskIsCompleted())}
          className={cn(
            taskForm.isCompleted
              ? "bg-[image:var(--linear-gradient)] before:text-xs sm:before:text-base before:content-['✔'] before:text-white before:flex before:items-center before:justify-center pt-1"
              : "bg-transparent",
            "aspect-square border w-6 h-6 sm:w-8 sm:h-8 rounded-full border-[var(--very-dark-grayish-blue-2)] cursor-pointer"
          )}
        />
        <input
          name="create-task"
          className="min-w-0 h-8 text-base sm:text-xl lg:text-2xl text-[var(--light-grayish-blue)] caret-white focus:outline-none flex-1"
          placeholder="Create a new todo..."
          value={taskForm.title}
          onChange={(e) => dispatch(setTaskTitle(e.target.value))}
        />
        <div className="flex gap-2 sm:pr-0">
          <button
            onClick={() => dispatch(setShowTaskDrawer())}
            className="flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
            type="button">
            <IoIosArrowDown
              color="var(--very-dark-grayish-blue)"
              className={cn(taskForm.showDrawer && "rotate-180", "w-5 h-5 sm:w-8 sm:h-8")}
            />
          </button>
          <button className="cursor-pointer" type="submit">
            <IoIosAdd className="w-8 h-8 sm:w-10 sm:h-10" color="var(--very-dark-grayish-blue)" size={40} />
          </button>
        </div>
      </form>

      {taskForm.showDrawer && <TodoDrawer formData={taskForm} />}
    </>
  );
};
