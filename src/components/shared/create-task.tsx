import { cn } from "@/src/lib/utils";
import { createUserTask } from "@/src/services/tasks";
import { IoIosAdd, IoIosArrowDown } from "react-icons/io";
import React from "react";
import { useAppDispatch } from "@/src/redux/hooks";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectTasks } from "@/src/redux/slices/tasksSlice";

interface Props {
  className?: string;
}

export const CreateTask: React.FC<Props> = ({ className }) => {
  const initialFormData = { title: "", description: "", isCompleted: false, showDrawer: false };
  const [formData, setFormData] = React.useState(initialFormData);

  const appDispatch = useAppDispatch();

  const tasks = useSelector(selectTasks);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const isExist = tasks.some(({ title }) => title === formData.title);

      if (formData.title) {
        if (!isExist) {
          appDispatch(
            createUserTask({
              title: formData.title,
              description: formData.description,
              isCompleted: formData.isCompleted,
            })
          );
        } else {
          toast.error("Task with same title alredy exist", { icon: "❌" });
        }
        setFormData(initialFormData);
      } else {
        toast.error("Task title can't be empty", { icon: "❌" });
      }
    } catch (error) {
      console.error("Error while execution create-task/onSubmitHandler:", error);
    }
  };
  return (
    <>
      <form
        className={cn(
          "flex px-4 sm:px-8 gap-4 sm:gap-8 items-center bg-primary min-w-0 h-16 lg:h-20",
          "overflow-y-auto overflow-x-hidden dark:[color-scheme:dark] rounded-md",
          className
        )}
        onSubmit={onSubmitHandler}>
        <figure
          onClick={() => setFormData((prev) => ({ ...prev, isCompleted: !prev.isCompleted }))}
          className={cn(
            formData.isCompleted
              ? "bg-[image:var(--linear-gradient)] before:text-xs sm:before:text-base before:content-['✔'] before:text-white before:flex before:items-center before:justify-center pt-1"
              : "bg-transparent",
            "aspect-square border w-6 h-6 sm:w-8 sm:h-8 rounded-full border-[var(--very-dark-grayish-blue-2)] cursor-pointer"
          )}
        />
        <input
          name="create-task"
          className="min-w-0 h-8 text-base sm:text-xl lg:text-2xl text-[var(--light-grayish-blue)] caret-white focus:outline-none flex-1"
          placeholder="Create a new todo..."
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
        />
        <div className="flex gap-2 sm:pr-0">
          <button
            onClick={() => setFormData((prev) => ({ ...prev, showDrawer: !prev.showDrawer }))}
            className="flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
            type="button">
            <IoIosArrowDown
              color="var(--very-dark-grayish-blue)"
              className={cn(formData.showDrawer && "rotate-180", "w-5 h-5 sm:w-8 sm:h-8")}
            />
          </button>
          <button className="cursor-pointer" type="submit">
            <IoIosAdd className="w-8 h-8 sm:w-10 sm:h-10" color="var(--very-dark-grayish-blue)" size={40} />
          </button>
        </div>
      </form>

      {formData.showDrawer && (
        <div className="absolute top-36 sm:top-53 lg:top-57 h-[448px] lg:h-[480px]  rounded-md w-full px-4 sm:px-8 py-4 bg-[var(--very-dark-desaturated-blue)] text-white">
          <label htmlFor="description" className="block mb-2 text-sm sm:text-base">
            Add a description:
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full p-2 rounded bg-[var(--very-dark-grayish-blue)] text-white max-h-[400px] focus:outline-none"
            rows={3}
            placeholder="Write more details about your task..."
          />
        </div>
      )}
    </>
  );
};
