import Link from "next/link";
import React from "react";
import { FiXCircle } from "react-icons/fi";
import { BackButton } from "./back-button";

interface AuthCardProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export default function AuthCard({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: AuthCardProps) {
  return (
    <div className="px-10 py-8 bg-black w-1/3 h-fit text-yellow">
      <div className="flex justify-between items-center w-full">
        <p className="text-white text-center font-syne font-bold text-3xl flex-grow">
          {headerLabel}
        </p>
        <Link href={"/"}>
          <FiXCircle className="text-magenta text-2xl" />
        </Link>
      </div>
      {children}
      <BackButton href={backButtonHref} label={backButtonLabel} />
    </div>
  );
}
