import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="grid place-items-center h-screen bg-slate-900">
      <div
        className="flex gap-4 bg-white p-4 px-6 items-center rounded-md cursor-pointer"
        onClick={() => signIn("google")}
      >
        <FcGoogle className="text-30px" />
        Sign In with Google
      </div>
    </div>
  );
}
