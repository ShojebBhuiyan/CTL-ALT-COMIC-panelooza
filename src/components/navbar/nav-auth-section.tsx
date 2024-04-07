"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ProfileOptions from "./profile-options";

export default function NavAuthSection() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <ProfileOptions
          imageUrl={session.user?.image!}
          name={session.user?.username!}
        />
      ) : (
        <div className="flex justify-end space-x-4">
          <Link href={`/auth/signin`}>
            <Button
              variant="outline"
              className="w-[8rem] bg-blue text-black font-medium text-lg h-16 px-4 py-2 rounded-none hover:bg-blue-secondary"
            >
              Sign In
            </Button>
          </Link>
          <Link href={`/auth/signup`}>
            <Button
              variant="outline"
              className="w-[8rem] bg-blue text-black font-medium text-lg h-16 px-4 py-2 rounded-none hover:bg-blue-secondary"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
