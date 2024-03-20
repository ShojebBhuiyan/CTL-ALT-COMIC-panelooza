import { LuCheckCircle } from "react-icons/lu";

interface FormSuccessProps {
  message: string;
}

export default function FormSuccess({ message }: FormSuccessProps) {
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <LuCheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}