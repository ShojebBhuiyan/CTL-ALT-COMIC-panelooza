"use client";

import { ErrorCard } from "@/components/auth/error-card";

export default function AuthErrorPage() {
  return (
    <div
      className="bg-yellow bg-auth bg-cover bg-no-repeat"
    >
      <div className="p-10 flex justify-center">
        <ErrorCard />
      </div>
    </div>
  );
}