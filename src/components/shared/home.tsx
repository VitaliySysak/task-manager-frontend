import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TodoBlock } from "./todo-block";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

interface Props {
  className?: string;
}

export const Home: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  const token = Cookies.get("task-manager-auth-token");

  const loggedIn = !!token;

  React.useEffect(() => {
    if (!loggedIn) {
      navigate("/auth");
    }
  }, [loggedIn, navigate]);

  return (
    loggedIn && (
      <div className="relative gap-6 min-h-screen bg-secondary flex flex-col border-box">
        <img
          className="w-full hidden sm:hidden md:hidden lg:block"
          src="/images/bg-desktop-dark.jpg"
          fetchPriority="high"
          alt="hero"
        />
        <img
          className="w-full sm:block md:block lg:hidden"
          src="/images/bg-mobile-dark.jpg"
          fetchPriority="high"
          alt="hero"
        />
        <TodoBlock />
      </div>
    )
  );
};
