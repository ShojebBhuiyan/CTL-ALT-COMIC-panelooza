import { LuAlertTriangle } from "react-icons/lu";
import AuthCard from "./auth-card";

export const ErrorCard = () => {
  return (
    <AuthCard
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/signin"
      backButtonLabel="Back to sign in"
    >
      <div className="w-full flex justify-center items-center">
        <LuAlertTriangle className="text-destructive" />
      </div>
    </AuthCard>
  );
};
