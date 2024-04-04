"use client";

import { createNewStyle } from "@/actions/style/create-new-style";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { StyleSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function CreateStylePopup({
  isOpen,
  setOpen,
  userId,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  userId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof StyleSchema>>({
    resolver: zodResolver(StyleSchema),
    defaultValues: {
      thumbnail: undefined,
      label: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    form.setValue("thumbnail", file);
  };

  async function onSubmit(values: z.infer<typeof StyleSchema>) {
    try {
      const formData = new FormData();
      formData.append("file-input", values.thumbnail, "image.png");

      await fetch("/api/image", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Image = reader.result as string;
            startTransition(() => {
              createNewStyle(values.label, userId, data.filename.toString(), base64Image)
                .then((style) => {
                  if (style) {
                    setOpen(false);
                    toast({
                      variant: "default",
                      title: "Style created",
                      description: "Your style has been created successfully.",
                    });
                  } else {
                    setOpen(false);
                    toast({
                      variant: "destructive",
                      title: "Uh oh! Something went wrong.",
                      description: "Please try again.",
                    });
                  }
                })
                .catch(() => {
                  setOpen(false);
                  toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Please try again.",
                  });
                });
            });
          };
          reader.readAsDataURL(values.thumbnail);
        });
    } catch (error: unknown) {
      setOpen(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: String(error),
      });
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogDescription className="w-full text-center text-xl font-bold text-magenta">
            Create Style
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center justify-evenly gap-2">
              <div>
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your drawing</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className={`${preview !== null && "hidden"}`}
                          onChange={handleImageChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
              </div>
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>A name for your style</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-white text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
      </DialogContent>
    </Dialog>
  );
}
