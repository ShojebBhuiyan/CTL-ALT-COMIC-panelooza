import { LuAlertTriangle } from "react-icons/lu";

interface FormErrorProps {
  message: string;
}

export default function FormError({ message }: FormErrorProps) {
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <LuAlertTriangle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
