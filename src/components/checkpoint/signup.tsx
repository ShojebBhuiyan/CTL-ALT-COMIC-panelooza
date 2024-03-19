"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { FiXCircle } from "react-icons/fi";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(2).max(50),
});

export function SignUp({ toggle }: { toggle: (value: boolean) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="px-10 py-8 bg-black w-1/3 h-fit text-yellow">
      <div className="flex justify-between items-center w-full">
        <p className="text-white text-center font-syne font-bold text-3xl flex-grow">
          Create Account
        </p>
        <Link href="/">
          <FiXCircle className="text-magenta text-2xl" />
        </Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
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
          <div className="flex items-center justify-center gap-10 p-5">
            <Button
              type="button"
              className="w-1/3 bg-magenta rounded-none drop-shadow-[3px_3px_0px_rgba(255,255,255,1)] text-black text-lg hover:bg-yellow"
              onClick={() => toggle(false)}
            >
              Log In
            </Button>
            <Button
              type="submit"
              className="w-1/3 bg-green rounded-none drop-shadow-[3px_3px_0px_rgba(255,255,255,1)] text-black text-lg hover:bg-yellow"
            >
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
