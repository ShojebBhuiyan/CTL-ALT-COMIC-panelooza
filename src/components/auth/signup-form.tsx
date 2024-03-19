"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignupSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form/form-error";
import { signup } from "@/actions/auth/signup";
import { useState, useTransition } from "react";
import FormSuccess from "@/components/form/form-success";
import { useRouter } from "next/navigation";
import AuthCard from "./auth-card";

export function SignupForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const router = useRouter();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignupSchema>) {
    startTransition(() => {
      setError(undefined);
      setSuccess(undefined);
      signup(values).then((data) => {
        if (data.success) {
          setSuccess(data?.success);
          router.push("/auth/signin");
        } else {
          setError(data?.error);
        }
      });
    });
  }

  return (
    <AuthCard
      backButtonHref="/auth/signin"
      backButtonLabel="Already have an account?"
      headerLabel="Sign Up"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none bg-white text-black font-medium border-none focus:ring-0"
                    placeholder="Whimsy Doodlebottom"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
                <FormDescription>
                  Use at least one letter, one numeral, and seven characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="w-1/3 bg-green rounded-none drop-shadow-[3px_3px_0px_rgba(255,255,255,1)] text-black text-lg hover:bg-yellow"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>


  );
}