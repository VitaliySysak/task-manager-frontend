import React from "react";
import { cn } from "@/src/lib/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const GlowButton: React.FC<React.PropsWithChildren<Props>> = ({ className, children, ...props }) => {
  return (
    <button className={cn("p-[3px] relative rounded-2xl", className)} {...props}>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl" />
      <div className="px-4 sm:px-8 py-2  bg-black rounded-2xl  relative group transition duration-200 text-white hover:bg-transparent ">
        {children}
      </div>
    </button>
  );
};
