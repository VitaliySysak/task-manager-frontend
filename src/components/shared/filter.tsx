import React from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { selectTitleFilter, setTitleFilter } from "@/src/store/redux/slices/filtersSlice";

interface Props {
  className?: string;
}

export const Filter: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);

  return (
    <label className="mb-3 flex max-w-[180px] flex-1 sm:max-w-[210px] h-8 sm:h-12 px-3 md:px-4 items-center justify-between bg-primary rounded-md">
      <input
        name="search"
        className="w-full pt-0.5 h-8 caret-white focus:outline-none text-[var(--light-grayish-blue-hover)] text-md lg:text-lg"
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
