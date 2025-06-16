import React from "react";
import { TodoBlock } from "./todo-block";
import { useRefresh } from "@/src/hooks/use-refresh";

interface Props {
  className?: string;
}

export const Home: React.FC<Props> = ({ className }) => {
  useRefresh();

  return (
    <div className="relative gap-6 min-h-screen h-dvh bg-secondary flex flex-col border-box w-full">
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
