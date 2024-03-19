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
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signin } from "@/actions/auth/signin";
import FormError from "@/components/form/form-error";
import AuthCard from "./auth-card";

export function SigninForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

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
      setError(undefined);

      signin(values).then((data) => {
        if (data?.error) {
          setError(data?.error);
        }
        router.push(callbackUrl || "/dashboard");
        // router.refresh();
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
                    className="rounded-none bg-white text-black font-medium border-none focus:ring-0"
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
                    className="rounded-none bg-white text-black font-medium border-none focus:ring-0"
                    placeholder="a hard password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormError message={error} />}
          <div className="flex items-center justify-center">
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