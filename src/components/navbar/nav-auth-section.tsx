"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProfileOptions from "./profile-options";

export default function NavAuthSection() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <ProfileOptions
          imageUrl={session.user?.image!}
          name={session.user?.name!}
        />
      ) : (
        <div className="flex justify-end space-x-4">
          <Link href={`/auth/signin`}>
            <Button variant="outline" className="w-[8rem] text-lg">
              Signin
            </Button>
          </Link>
          <Link href={`/auth/signup`}>
            <Button
              variant="outline"
              className="w-[8rem] text-lg text-primary border-primary border-2"
            >
              Signup
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}