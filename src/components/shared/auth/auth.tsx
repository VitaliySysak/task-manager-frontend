import React from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "../../ui/button";
import { AuthModal } from "./auth-modal";
import { GoogleButton } from "../../ui/google-button";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

export const Auth: React.FC<Props> = ({ className }) => {
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [openSignIn, setOpenSignIn] = React.useState(false);

  return (
    <section className={cn("flex flex-col-reverse h-screen lg:flex-row ", className)}>
      {/* Left side */}
      <aside className="bg-secondary relative flex flex-col justify-baseline items-center sm:flex-1 h-[30%] sm:h-auto overflow-hidden">
        <ul className="relative flex flex-col my-auto text-[var(--primary-font)] text-sm md:text-sm lg:text-xl font-bold space-y-5 sm:space-y-8 px-10">
          <li className="flex items-center gap-2">Stay organized and focused every day.</li>
          <li className="flex items-center gap-2">Track your tasks and boost your productivity.</li>
          <li className="flex items-center gap-2">Start your day with clear priorities.</li>
        </ul>
        <div className="flex justify-center sm:justify-start items-center w-full h-18 px-4">
          <Link to={"/privacy"} className="text-blue-600">
            Privacy and policy
          </Link>
        </div>
      </aside>

      {/* Right side */}
      <aside className="relative flex flex-col justify-center items-center flex-1">
        <img
          src="/images/bg-mobile-dark.webp"
          fetchPriority="high"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <img
          src="/images/bg-desktop-dark.webp"
          fetchPriority="high"
          alt="Background"
          className="hidden absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="realtive z-10 flex flex-col px-10 my-auto text-[var(--primary-font)] gap-4">
          <h1 className="self-start text-4xl font-bold mb-12">Stay on top of your tasks, every day</h1>

          <p className="font-bold">Get started with your Todo journey now.</p>
          <Button onClick={() => setOpenSignUp(true)} className="bg-black font-semibold rounded-2xl">
            Register
          </Button>
          <button className="p-[3px] relative rounded-2xl" onClick={() => setOpenSignIn(true)}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl" />
            <div className="px-8 py-2  bg-black rounded-2xl  relative group transition duration-200 text-white hover:bg-transparent ">
              Log In
            </div>
          </button>
          <GoogleButton />
          {openSignUp && <AuthModal type="sign-up" open={openSignUp} setOpen={setOpenSignUp} />}
          {openSignIn && <AuthModal type="sign-in" open={openSignIn} setOpen={setOpenSignIn} />}
        </div>
      </aside>
    </section>
  );
};
