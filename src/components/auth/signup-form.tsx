"use client";

import { signup } from "@/actions/auth/signup";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/components/ui/use-toast";
import { replaceSpaceInString } from "@/lib/utils";
import { SignupSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthCard from "./auth-card";

export function SignupForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignupSchema>) {
    startTransition(() => {
      signup(values).then((data) => {
        if (data.success) {
          toast({
            title: data?.success,
            description: "You can now sign in to your account.",
          });
          router.push("/auth/signin");
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: data?.error,
          });
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
                    className="bg-white text-black font-medium border-none focus:ring-0"
                    placeholder="Jalil Uddin"
                    {...field}
                  />
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
                  <Input
                    className="bg-white text-black font-medium border-none focus:ring-0"
                    placeholder="WhimsyDoodlebottom"
                    {...field}
                    onChange={(event) => {
                      event.target.value = replaceSpaceInString(
                        event.target.value
                      );
                      field.onChange(event);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is how everyone will see you. Don&apos;t use spaces.
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
                <FormDescription>
                  Choose a strong password with at least 8 characters.
                </FormDescription>
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
                  <Input
                    type="password"
                    className="bg-white text-black font-medium border-none focus:ring-0"
                    placeholder="use same password as above"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Re-enter your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center p-5">
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
