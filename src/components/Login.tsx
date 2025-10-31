"use client";
import { loginAction } from "@/actions/users";
import React, { useState } from "react";

import z from "zod";
import { TNotAccountType } from "./NotLogin";

import { toast } from "sonner";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type TFormData = z.infer<typeof schema>;

interface ILoginProps {
  setNotAccountType: (type: TNotAccountType) => void;
}

function Login({ setNotAccountType }: ILoginProps) {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [errMessages, setErrMessages] = useState<{
    email: string[];
    password: string[];
  }>({
    email: [],
    password: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = (await schema.parseAsync({
        email,
        password,
      })) as TFormData;
      // 进行登录
      const result = await loginAction(res.email, res.password);
      setErrMessages({ email: [], password: [] });
      if (result.status !== 200) {
        toast.error(result.message as string);
        return;
      }
      toast.success(result.message as string);
      formRef.current?.reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors as {
          username: string[];
          password: string[];
        };
        setErrMessages({ ...{ email: [], password: [] }, ...fieldErrors });
      }
    }
  };

  return (
    <div className="relative py-3 sm:max-w-xs sm:mx-auto">
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="w-125 min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <div className=" flex flex-col justify-center items-center h-full select-none">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <div className="w-8 h-8 bg-gray-700"></div>
              <p className="m-0 text-[16px] font-semibold dark:text-white">
                Login to your Account
              </p>
              <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
                Get started with our app, just start section and enjoy
                experience.
              </span>
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full flex flex-col gap-2">
                <label className="font-semibold text-xs text-gray-400">
                  Email
                </label>
                <input
                  placeholder="Email"
                  className="border rounded-lg px-3 py-2  text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                  name="email"
                />
              </div>
              <div className="text-red-600 text-sm h-6">
                {errMessages.email[0]}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">
                Password
              </label>
              <input
                placeholder="••••••••"
                className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                type="password"
                name="password"
              />
            </div>
            <div className="text-red-600 text-sm h-6">
              {errMessages.password[0]}
            </div>
          </div>
          <div>
            <button
              className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
              type="submit"
            >
              Login
            </button>
            <div className="text-sm text-center mt-3">
              <span>{"Don't have an account?"}</span>
              <span
                className=" ml-1 text-[#2d79f3] cursor-pointer"
                onClick={() => setNotAccountType("register")}
              >
                Sign Up
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
