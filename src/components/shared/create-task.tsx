import { cn } from "@/src/lib/utils";
import { createUserTask } from "@/src/services/tasks";
import { IoIosAdd, IoIosArrowDown } from "react-icons/io";
import React from "react";
import { useAppDispatch } from "@/src/redux/hooks";

interface Props {
  className?: string;
  setToggleAll: React.Dispatch<React.SetStateAction<boolean>>;
  toggleAll: boolean;
}

export const CreateTask: React.FC<Props> = ({ className, toggleAll, setToggleAll }) => {
  const initialFormData = { title: "", description: "", showDrawer: false };

  const appDispatch = useAppDispatch();
  const [formData, setFormData] = React.useState(initialFormData);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      appDispatch(createUserTask({ title: formData.title, description: formData.description }));
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error while execution create-task/onSubmitHandler:", error);
    }
  };
  return (
    <>
      <form
        className={cn("flex px-4 sm:px-8 gap-4 sm:gap-8 items-center bg-primary overflow-y-auto dark:[color-scheme:dark] min-w-0", className)}
        onSubmit={onSubmitHandler}>
        <figure
          onClick={() => setToggleAll((prev) => !prev)}
          className={cn(
            toggleAll
              ? "bg-[image:var(--linear-gradient)] before:text-xs sm:before:text-base before:content-['✔'] before:text-white before:flex before:items-center before:justify-center pt-1"
              : "bg-transparent",
            "aspect-square border w-6 h-6 sm:w-8 sm:h-8 rounded-full border-[var(--very-dark-grayish-blue-2)] cursor-pointer"
          )}
        />
        <input
          className="h-8 text-base sm:text-2xl text-[var(--light-grayish-blue)] caret-white focus:outline-none flex-1"
          placeholder="Create a new todo..."
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
        />
        <div className="flex gap-2 sm:pr-0">
          <button
            onClick={() => setFormData((prev) => ({ ...prev, showDrawer: !prev.showDrawer }))}
            className="flex justify-center items-center w-6 h-6 sm:w-10 sm:h-10 cursor-pointer"
            type="button">
            <IoIosArrowDown
              color="var(--very-dark-grayish-blue)"
              className={cn(formData.showDrawer && "rotate-180", "w-5 h-5 sm:w-8 sm:h-8")}
            />
          </button>
          <button className="cursor-pointer" type="submit">
            <IoIosAdd className="w-6 h-6 sm:w-10 sm:h-10" color="var(--very-dark-grayish-blue)" size={40} />
          </button>
        </div>
      </form>

      {formData.showDrawer && (
        <div className="rounded-md w-full px-4 sm:px-8 py-4 bg-[var(--very-dark-desaturated-blue)] text-white">
          <label htmlFor="description" className="block mb-2 text-sm sm:text-base">
            Add a description:
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full p-2 rounded bg-[var(--very-dark-grayish-blue)] text-white resize-none focus:outline-none"
            rows={3}
            placeholder="Write more details about your task..."
          />
        </div>
      )}
    </>
  );
};
