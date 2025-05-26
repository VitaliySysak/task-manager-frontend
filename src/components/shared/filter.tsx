import React from "react";
import { cn } from "@/src/lib/utils";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { selectTitleFilter, setTitleFilter } from "@/src/redux/slices/filtersSlice";

interface Props {
  className?: string;
}

export const Filter: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);

  return (
    <label className="flex-1 h-8 sm:h-12 flex px-3 md:px-4 items-center justify-between bg-primary rounded-md">
      <input
        className="w-full pt-0.5 h-8 caret-white focus:outline-none text-[var(--light-grayish-blue-hover)] text-xl"
        type="text"
        placeholder="Search"
        value={titleFilter}
        onChange={(e) => dispatch(setTitleFilter(e.target.value))}
      />
      <button className="cursor-pointer">
        <CiSearch className="w-4 h-4 sm:w-6 sm:h-6" color="var(--light-grayish-blue-hover)" />
      </button>
    </label>
  );
};
