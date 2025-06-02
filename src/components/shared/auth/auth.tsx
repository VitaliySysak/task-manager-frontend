import React from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "../../ui/button";
import { AuthModal } from "./auth-modal";
import { useAppDispatch } from "@/src/store/redux/hooks";

interface Props {
  className?: string;
}

export const Auth: React.FC<Props> = ({ className }) => {
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [openSignIn, setOpenSignIn] = React.useState(false);

  const dispatch = useAppDispatch();

  return (
    <section className={cn("flex flex-col-reverse h-screen lg:flex-row ", className)}>
      {/* Left side */}
      <aside className="bg-secondary relative flex justify-center items-center sm:flex-1 h-[30%] sm:h-auto overflow-hidden">
        <ul className="relative flex flex-col text-[var(--primary-font)] text-sm md:text-sm lg:text-xl font-bold space-y-5 sm:space-y-8 px-10">
          <li className="flex items-center gap-2">Stay organized and focused every day.</li>
          <li className="flex items-center gap-2">Track your tasks and boost your productivity.</li>
          <li className="flex items-center gap-2">Start your day with clear priorities.</li>
        </ul>
      </aside>

      {/* Right side */}
      <aside className="relative flex flex-col justify-baseline items-center flex-1">
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
        {/* <div className="flex justify-end items-center w-full h-18 px-4">
          <Button onClick={logOut} className=" bg-black h-10 w-20 z-10">
            Log out
          </Button>
        </div> */}
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
          <button
            onClick={() => (window.location.href = import.meta.env.VITE_PUBLIC_API_URL + "auth/google/login")}
            className="relative flex items-center justify-center gap-4 bg-white text-black px-6 py-2 rounded-2xl border border-gray-300 shadow hover:shadow-md transition duration-150 cursor-pointer">
            <div className="w-5 h-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-full h-full">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Sign in with Google</span>
          </button>
          {openSignUp && <AuthModal type="sign-up" open={openSignUp} setOpen={setOpenSignUp} />}
          {openSignIn && <AuthModal type="sign-in" open={openSignIn} setOpen={setOpenSignIn} />}
        </div>
      </aside>
    </section>
  );
};
