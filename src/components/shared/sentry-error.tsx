import React from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "../ui/button";

interface Props {
  className?: string;
}

export const SentryError: React.FC<Props> = ({ className }) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Button
        onClick={() => {
          throw new Error("This is your first error!");
        }}>
        Break the world
      </Button>
    </div>
  );
};
