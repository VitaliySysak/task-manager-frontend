import React from "react";
import { cn } from "@/src/lib/utils";
import { CiSearch } from "react-icons/ci";
import { getUserTasks } from "@/src/services/tasks";

interface Props {
  className?: string;
  onSearch: (title?: string) => void;
}

export const Search: React.FC<Props> = ({ className, onSearch }) => {
  const [title, setTitle] = React.useState("");
  const onSearchClick = async () => {
    try {
      onSearch(title);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <label className="flex px-4 items-center justify-between bg-primary rounded-md">
      <input
        className="w-20 sm:w-36 h-8 caret-white focus:outline-none text-[var(--light-grayish-blue-hover)]"
        type="text"
        placeholder="search"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="cursor-pointer" onClick={onSearchClick}>
        <CiSearch className="w-4 h-4 sm:w-6 sm:h-6" color="var(--light-grayish-blue-hover)" />
      </button>
    </label>
  );
};
