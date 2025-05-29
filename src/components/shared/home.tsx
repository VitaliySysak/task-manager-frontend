import React from "react";
import { useNavigate } from "react-router-dom";
import { TodoBlock } from "./todo-block";
import { useSelector } from "react-redux";
import { selectAccessToken, setAccessToken } from "@/src/redux/slices/authSlice";
import { refreshToken } from "@/src/services/users";
import { useAppDispatch } from "@/src/redux/hooks";
import { getUserTasks } from "@/src/services/tasks";
import { setTasksloading } from "@/src/redux/slices/tasksSlice";

interface Props {
  className?: string;
}

export const Home: React.FC<Props> = ({ className }) => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectAccessToken);

  React.useEffect(() => {
    if (token) {
      appDispatch(getUserTasks());
    } else {
      const refresh = async () => {
        appDispatch(setTasksloading(true));
        const accessToken = await refreshToken();
        if (accessToken) {
          appDispatch(setAccessToken(accessToken));
        } else {
          navigate("/auth");
        }
      };
      refresh();
    }
  }, [token, appDispatch, navigate]);

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
