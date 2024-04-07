"use client";

import { changePassword } from "@/actions/user/change-password";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { SettingsCardWrapper } from "./settings-card-wrapper";

interface PasswordSettingsProps {
  id: string;
}

export default function PasswordSettings({ id }: PasswordSettingsProps) {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof PasswordSchema>) {
    startTransition(() => {
      changePassword(id, values.currentPassword, values.newPassword)
        .then(() => {
          toast({
            variant: "default",
            title: "Password updated",
            description: "Your password has been updated successfully.",
          });
        })
        .catch(() => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Please try again.",
          });
        });
    });
  }

  return (
    <SettingsCardWrapper
      title="Password"
      description="Make changes to your account here. Click save when you're done."
    >
      <Form {...form}>
        <form className="spaces-y-1" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="p-6">
            <Button
              disabled={isPending}
              type="submit"
              className="w-1/4 bg-green rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black text-lg hover:bg-yellow"
            >
              Save Password
            </Button>
          </div>
        </form>
      </Form>
    </SettingsCardWrapper>
  );
}
