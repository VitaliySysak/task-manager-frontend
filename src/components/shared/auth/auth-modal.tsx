import React from "react";
import { cn } from "@/src/lib/utils";
import { Dialog } from "../../ui/dialog";
import { DialogContent, DialogTitle } from "@/src/components/ui/dialog";
import { Description } from "@radix-ui/react-dialog";
import { Button } from "../../ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { AuthFormValues, loginFormSchema, registerFormSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "./form-input";
import { login, register } from "@/src/services/users";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setAccessToken } from "@/src/redux/slices/authSlice";
import { useDispatch } from "react-redux";

interface Props {
  className?: string;
  type: "sign-up" | "sign-in";
  open: boolean;
  setOpen: (variable: boolean) => void;
}

export const AuthModal: React.FC<Props> = ({ className, type, open, setOpen }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(type === "sign-up" ? registerFormSchema : loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: type === "sign-up" ? "" : undefined,
      confirmPassword: type === "sign-up" ? "" : undefined,
    },
  });

  const onSubmit = async (data: AuthFormValues) => {
    try {
      setIsLoading(true);

      const accessToken = type === "sign-up" ? await register(data) : await login(data);

      if (accessToken) {
        dispatch(setAccessToken(accessToken));
        navigate("/");
      }
    } catch (error) {
      toast.error("Server error, try again", { icon: "❌" });
      console.error("Error while execution onSubmit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)} modal={true}>
      <DialogTitle></DialogTitle>
      <DialogContent
        className={cn("w-[700px] min-h-[400px] translate-y-[-70%] sm:translate-y-[-50%]", className)}>
        <section className="">
          <FormProvider {...form}>
            <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
              <header className="flex items-center justify-center mb-8">
                <div className="absolute left-1/2 transform -translate-x-1/2"></div>
                <Button
                  disabled={isLoading}
                  loading={isLoading}
                  className="ml-auto rounded-full font-bold !min-w-[78px]"
                  type="submit">
                  {type === "sign-up" ? "Sign up" : "Sign in"}
                </Button>
              </header>
              <h1 className="text-2xl font-bold mb-4 text-[#131619]">
                {type === "sign-up" ? "Create your account" : "Log in to Twitter"}
              </h1>

              {type === "sign-up" && (
                <>
                  <FormInput name="fullName" label="Full Name" />
                  <FormInput name="email" label="E-mail" />
                  <FormInput name="password" label="Password" type="password" />
                  <FormInput name="confirmPassword" label="Confirm Password" type="password" />
                </>
              )}
              {type === "sign-in" && (
                <>
                  <FormInput name="email" label="E-mail" />
                  <FormInput name="password" label="Password" type="password" />
                </>
              )}
            </form>
          </FormProvider>
        </section>
      </DialogContent>
      <Description />
    </Dialog>
  );
};
