"use client";

import { deleteSelectedStyle } from "@/actions/style/delete-selected-style";
import { Button } from "@/components/ui/button";
import { Style } from "@prisma/client";
import Link from "next/link";
import { useToast } from "../ui/use-toast";

interface StyleCardProps {
  style: Style;
}

export default function StyleCard({ style }: StyleCardProps) {
  const { toast } = useToast();
  return (
    <li className="flex items-center justify-between w-full h-fit p-5 rounded-none border-2 bg-white text-black">
      <div className="flex items-center">
        <img
          src={style.thumbnail}
          alt={style.label}
          className="w-16 h-16 object-cover"
        />
        <span className="mx-4">{style.label}</span>
      </div>
      <div className="flex space-x-4">
        <Link href={`/workspace/${style.id}`}>
          <Button className="bg-green rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black hover:bg-yellow">
            Edit
          </Button>
        </Link>
        <Button
          onClick={async () => {
            await deleteSelectedStyle(style.id).then(() => {
              toast({
                variant: "destructive",
                title: "Style deleted",
                description: "Your Style has been deleted successfully.",
              });
            });
          }}
          className="bg-red rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black hover:bg-yellow"
        >
          Delete
        </Button>
      </div>
    </li>
  );
}
