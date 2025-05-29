import React from "react";
import { cn } from "@/src/lib/utils";
import { Filter } from "./filter";

interface Props {
  className?: string;
}

export const TodoHeader: React.FC<Props> = ({ className }) => {
  return (
    <header className="flex justify-between items-center mb-2 2xl:mb-6 sm:gap-16 md:gap-24">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[600] text-white tracking-[1rem]">
        TODO
      </h1>
      <Filter />
    </header>
  );
};
