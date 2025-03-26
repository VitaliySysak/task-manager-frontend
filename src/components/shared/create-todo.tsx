import { cn } from "@/src/lib/utils";
import { createUserTask } from "@/src/services/tasks";
import { IoIosAdd, IoIosArrowDown } from "react-icons/io";
import React from "react";

interface Props {
  className?: string;
  onTaskAdded: () => void;
  setToggleAll: React.Dispatch<React.SetStateAction<boolean>>;
  toggleAll: boolean;
}

export const CreateTodo: React.FC<Props> = ({ className, toggleAll, onTaskAdded, setToggleAll }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [showDrawer, setShowDrawer] = React.useState(false);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      await createUserTask({ title, description });
      onTaskAdded();
      setTitle("");
      setDescription("");
      setShowDrawer(false);
    } catch (error) {
      console.error("Error while execution create-todo/onSubmitHandler:", error);
    }
  };
  return (
    <>
      <form
        className={cn("flex px-4 sm:px-8 gap-4 sm:gap-8 items-center bg-primary", className)}
        onSubmit={onSubmitHandler}>
        <figure
          onClick={() => setToggleAll((prev) => !prev)}
          className={cn(
            toggleAll
              ? "bg-[image:var(--linear-gradient)] before:text-xs sm:before:text-base before:content-['✔'] before:text-white before:flex before:items-center before:justify-center pt-1"
              : "bg-transparent",
            "border w-6 h-6 sm:w-8 sm:h-8 rounded-full border-[var(--very-dark-grayish-blue-2)] cursor-pointer"
          )}
        />
        <input
          className="text-base sm:text-2xl text-[var(--light-grayish-blue)] caret-white focus:outline-none flex-1"
          placeholder="Create a new todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={() => setShowDrawer((prev) => !prev)}
            className="flex justify-center items-center w-6 h-6 sm:w-10 sm:h-10 cursor-pointer"
            type="button">
            <IoIosArrowDown
              color="var(--very-dark-grayish-blue)"
              className={cn(showDrawer && "rotate-180", "w-5 h-5 sm:w-8 sm:h-8")}
            />
          </button>
          <button className="cursor-pointer" type="submit">
            <IoIosAdd className="w-6 h-6 sm:w-10 sm:h-10" color="var(--very-dark-grayish-blue)" size={40} />
          </button>
        </div>
      </form>

      {showDrawer && (
        <div className="rounded-md w-full px-4 sm:px-8 py-4 bg-[var(--very-dark-desaturated-blue)] text-white">
          <label htmlFor="description" className="block mb-2 text-sm sm:text-base">
            Add a description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-[var(--very-dark-grayish-blue)] text-white resize-none focus:outline-none"
            rows={3}
            placeholder="Write more details about your task..."
          />
        </div>
      )}
    </>
  );
};
