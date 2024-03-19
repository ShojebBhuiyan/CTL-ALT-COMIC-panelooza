"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

export function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button
      variant="link"
      className="font-syne w-full text-magenta hover:text-yellow"
      size="sm"
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}
