"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SettingsCardWrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export function SettingsCardWrapper({
  children,
  title,
  description,
}: SettingsCardWrapperProps) {
  return (
    <Card className="bg-white border-none rounded-none text-black">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">{children}</CardContent>
    </Card>
  );
}
