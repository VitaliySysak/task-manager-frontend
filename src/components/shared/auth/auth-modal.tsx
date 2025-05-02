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
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string;
  type: "sign-up" | "sign-in";
  setOpen: (variable: boolean) => void;
}

export const AuthModal: React.FC<Props> = ({ className, type, setOpen }) => {
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
      if (type === "sign-up") {
        const { token } = await register(data);
        Cookies.set("token", token, {
          expires: 7,
          sameSite: "strict",
        });
      } else {
        const { token } = await login(data);
        Cookies.set("token", token, {
          expires: 7,
          sameSite: "strict",
        });
      }

      setOpen(false);

      navigate("/");
    } catch (error) {
      console.error("Error while execution value:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => setOpen(false)}>
      <DialogTitle></DialogTitle>
      <DialogContent className={cn("w-[700px] min-h-[400px]", className)}>
        <section className="">
          <FormProvider {...form}>
            <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
              <header className="flex items-center justify-center mb-8">
                <div className="absolute left-1/2 transform -translate-x-1/2"></div>
                <Button className="ml-auto rounded-full font-bold" type="submit">
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
