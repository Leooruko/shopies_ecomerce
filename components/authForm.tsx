"use client";
import { auth } from "@/actions/auth_action";
import { useActionState } from "react";
import Link from "next/link";
export default function AuthForm({ mode }) {
  const [formState, formAction] = useActionState(auth.bind(null, mode), {
    errors: {} as { email: string; password: string },
  });
  return (
    <>
      <form
        action={formAction}
        className="flex flex-col h-max  w-full gap-5 self-center"
      >
        <input
          className="border-2 border-blue-900 p-3 rounded-md"
          type="text"
          placeholder="Enter your email"
          name="email"
        />
        <input
          className="border-2 border-blue-900 p-3 rounded-md"
          type="text"
          placeholder="Enter your Password"
          name="password"
        />
        <ul className="text-red-600 flex flex-col">
          {formState?.errors &&
            Object.keys(formState.errors).map((error) => {
              return (
                <li
                  key={error as string}
                  className="bg-red-300 rounded-sm p-1 px-3"
                >
                  {formState.errors[error]}
                </li>
              );
            })}
        </ul>
        <input
          type="submit"
          value={`${mode === "login" ? "LOGIN" : "SIGNUP"}`}
          className="bg-black text-white p-3 mt-1"
        />
        {mode === "login" && (
          <Link
            href={"/auth/?mode=signup"}
            className="w-full h-full p-3 flex justify-center bg-blue-500  hover:bg-blue-300 text-white"
          >
            Create New account
          </Link>
        )}
        {mode === "signup" && (
          <Link
            href={"/auth/?mode=login"}
            className="h-full p-3 w-full flex justify-center bg-blue-400  hover:bg-blue-300 text-white"
          >
            Login using existing account
          </Link>
        )}
      </form>
    </>
  );
}
