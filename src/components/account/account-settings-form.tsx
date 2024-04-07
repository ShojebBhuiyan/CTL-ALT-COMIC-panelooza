"use client";

import { updateUser } from "@/actions/user/update-user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AccountSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { SettingsCardWrapper } from "./settings-card-wrapper";

interface AccountSettingsProps {
  id: string;
  name: string;
  username: string;
  email: string;
}

export default function AccountSettings({
  id,
  name,
  username,
  email,
}: AccountSettingsProps) {
  const [isPending, startTransition] = useTransition();

  const { update } = useSession();

  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: name,
      username: username,
      email: email,
    },
  });

  function onSubmit(values: z.infer<typeof AccountSchema>) {
    startTransition(() => {
      updateUser(id, values.name, values.username, values.email)
        .then(() => {
          update({
            id: id,
            name: values.name,
            username: values.username,
            email: values.email,
          });

          toast({
            variant: "default",
            title: "Account updated",
            description: "Your account has been updated successfully.",
          });

          if (username !== values.username) {
            router.push(`/${values.username}`);
          }
        })
        .catch(() => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was an error updating your account.",
          });
        });
    });
  }

  return (
    <SettingsCardWrapper
      title="Account"
      description="Make changes to your account here. Click save when you're done. Page will be reloaded if username is changed."
    >
      <Form {...form}>
        <form className="spaces-y-1" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-6">
            <Button
              disabled={isPending}
              type="submit"
              className="w-1/4 bg-green rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black text-lg hover:bg-yellow"
            >
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </SettingsCardWrapper>
  );
}
