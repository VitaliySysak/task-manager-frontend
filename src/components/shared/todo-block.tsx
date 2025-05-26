import React from "react";
import { cn } from "@/src/lib/utils";
import { TodoList } from "./todo-list";
import { CreateTask } from "./create-task";
import { Filter } from "./filter";
import { TodoFooter } from "./todo-footer";

interface Props {
  className?: string;
}

export const TodoBlock: React.FC<Props> = ({ className }) => {
  return (
    <section
      className={cn(
        "sm:gap-8",
        "gap-4 flex flex-col w-[clamp(20rem,80vw,42rem)] absolute justify-center top-1/4 -translate-y-1/4 md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2"
      )}>
      <header className="flex justify-between items-center mb-2 sm:mb-6 sm:gap-16 md:gap-24">
        <h1 className="text-4xl sm:text-6xl font-[600] text-white tracking-[1rem]">TODO</h1>
        <Filter />
      </header>
      <CreateTask />
      <div>
        <TodoList />
        <TodoFooter />
      </div>
    </section>
  );
};
