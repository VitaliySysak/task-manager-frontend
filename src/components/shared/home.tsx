import React from "react";
import { useNavigate } from "react-router-dom";
import { TodoBlock } from "./todo-block";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/redux/slices/authSlice";
import { refreshToken } from "@/src/services/users";
import { useAppDispatch } from "@/src/redux/hooks";
import { getUserTasks } from "@/src/services/tasks";
import { setTasksloading } from "@/src/redux/slices/tasksSlice";
import { unwrapResult } from "@reduxjs/toolkit";

interface Props {
  className?: string;
}

export const Home: React.FC<Props> = ({ className }) => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(selectAccessToken);

  React.useEffect(() => {
    try {
      if (accessToken) {
        appDispatch(getUserTasks());
      } else {
        const refresh = async () => {
          appDispatch(setTasksloading(true));
          const resultAction = await appDispatch(refreshToken());
          const newAccessToken = unwrapResult(resultAction);

          if (newAccessToken) {
            appDispatch(getUserTasks());
          }
        };
        refresh();
      }
    } catch (error) {
      navigate("/auth");
      console.error("Error while execution home:", error);
    }
  }, [accessToken]);

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
