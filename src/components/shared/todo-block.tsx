import React from "react";
import { cn } from "@/src/lib/utils";
import { TodoList } from "./todo-list";
import { CreateTask } from "./create-task";
import { TodoFooter } from "./todo-footer";
import { TodoHeader } from "./todo-header";

interface Props {
  className?: string;
}

export const TodoBlock: React.FC<Props> = ({ className }) => {
  return (
    <section
      className={cn(
        "sm:gap-8",
        "gap-4 flex flex-col w-[clamp(16rem,80vw,30rem)] sm:w-[clamp(18rem,76vw,46rem)] md:w-[clamp(18rem,76vw,40rem)] lg:w-[40rem]  2xl:w-[clamp(18rem,76vw,46rem)]  absolute justify-center top-1/4 -translate-y-1/4 md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2"
      )}>
      <TodoHeader />
      <CreateTask />
      <div>
        <TodoList />
        <TodoFooter />
      </div>
    </section>
  );
};
