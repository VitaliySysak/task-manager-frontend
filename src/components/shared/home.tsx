import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TodoBlock } from "./todo-block";

interface Props {
  className?: string;
}

export const Home: React.FC<Props> = ({ className }) => {
  const [users, setUsers] = React.useState([]);

  const navigate = useNavigate();

  const token = Cookies.get("token");
  const loggedIn = !!token;

  React.useEffect(() => {
    if (!loggedIn) {
      navigate("/auth");
    }
  }, [loggedIn, navigate]);

  // React.useEffect(() => {
  //   async function fetchUserInfo() {
  //     const data = await getUsers();
  //     setUsers(data);
  //   }
  //   fetchUserInfo();
  // }, []);


  return (
    <div className="relative gap-6 min-h-screen bg-secondary">
      <img className="w-full hidden sm:hidden md:hidden lg:block" src="/public/images/bg-desktop-dark.jpg" alt="hero" />
      <img className="w-full sm:block md:block lg:hidden" src="/public/images/bg-mobile-dark.jpg" alt="hero" />
      <TodoBlock />
    </div>
  );
};
