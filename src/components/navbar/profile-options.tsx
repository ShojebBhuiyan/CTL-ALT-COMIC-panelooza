import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ProfileOptionsProps {
  imageUrl?: string;
  name: string;
}
export default function ProfileOptions({
  imageUrl,
  name,
}: ProfileOptionsProps) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full me-16 focus:ring-0">
            <Avatar>
              {imageUrl && <AvatarImage src={imageUrl} alt="avatar" />}
              <AvatarFallback className="bg-yellow border-2 border-black text-black text-2xl">
                {name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 rounded-none bg-yellow text-black  font-syne">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={`/${name}`} className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/explore`} className="w-full">
                Explore
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/${name}/account`} className="w-full">
                Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              signOut();
            }}
            className="w-full"
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
