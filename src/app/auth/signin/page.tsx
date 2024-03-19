"use client";

import { SigninForm } from "@/components/auth/signin-form";

export default function SigninPage() {
  return (
    <div
      className="bg-yellow bg-auth bg-cover bg-no-repeat"
    >
      <div className="p-10 flex justify-center">
        <SigninForm />
      </div>
    </div>
  );
}