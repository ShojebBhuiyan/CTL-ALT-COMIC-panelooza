"use client";

import { createNewProject } from "@/actions/project/create-new-project";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProjectSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useToast } from "../ui/use-toast";

interface CreateProjectCardProps {
  userId: string;
}

export default function CreateProjectCard({
  userId,
}: 
CreateProjectCardProps) {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof ProjectSchema>) {
    startTransition(() => {
      createNewProject(values.name, userId, values.description)
        .then((project) => {
          if (project) {
            toast({
              variant: "default",
              title: "Project created",
              description: "Your project has been created successfully.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "Please try again.",
            });
          }
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
    <Card className="w-[300px] h-[270px] rounded-none border-2 bg-violet text-black">
      <CardHeader>
        <CardTitle>Add New</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder="Name of your project"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder="Description of your project"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="py-3">
              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-green rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black hover:bg-yellow"
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
