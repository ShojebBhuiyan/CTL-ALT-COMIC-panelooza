"use client";

import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="bg-yellow bg-auth bg-cover bg-no-repeat">
      <div className="p-10 flex justify-center">
        <SignupForm />
      </div>
    </div>
  );
}
