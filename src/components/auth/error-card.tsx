import { AlertTriangle } from "lucide-react";

import { CardWrapper } from "@/components/form/card-wrapper";
import AuthCard from "./auth-card";

export const ErrorCard = () => {
  return (
    <AuthCard
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/signin"
      backButtonLabel="Back to sign in"
    >
      <div className="w-full flex justify-center items-center">
        <AlertTriangle className="text-destructive" />
      </div>
    </AuthCard>
  );
};