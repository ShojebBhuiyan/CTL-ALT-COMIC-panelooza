"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { SigninSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signin } from "@/actions/auth/signin";
import { getSession } from "next-auth/react";
import AuthCard from "./auth-card";

export function SigninForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const router = useRouter();
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SigninSchema>) {
    startTransition(() => {
      signin(values).then(async (data) => {
        if (data?.error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: data?.error,
          });
        }
        const session = await getSession();
        session && router.push(callbackUrl || `/${session.user?.username!}`);
      });
    });
  }

  return (
    <AuthCard
      backButtonHref="/auth/signup"
      backButtonLabel="Don't have an account?"
      headerLabel="Sign in"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white text-black font-medium border-none focus:ring-0"
                    placeholder="doodlebottom@yourmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="bg-white text-black font-medium border-none focus:ring-0"
                    placeholder="a hard password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center p-5">
            <Button
              type="submit"
              className="w-1/3 bg-green rounded-none drop-shadow-[3px_3px_0px_rgba(255,255,255,1)] text-black text-lg hover:bg-yellow"
            >
              Sign In
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}
