import React from "react";
import { TodoBlock } from "./todo-block";
import { useTasks } from "@/src/hooks/useTasks";

interface Props {
  className?: string;
}

export const Home: React.FC<Props> = ({ className }) => {
  useTasks();

  return (
    <div className="relative gap-6 min-h-screen h-dvh bg-secondary flex flex-col border-box">
      <img
        className="w-full hidden sm:hidden md:hidden lg:block"
        src="/images/bg-desktop-dark.webp"
        fetchPriority="high"
        alt="hero"
      />
      <img
        className="w-full sm:block md:block lg:hidden"
        src="/images/bg-mobile-dark.webp"
        fetchPriority="high"
        alt="hero"
      />
      <TodoBlock />
    </div>
  );
};
