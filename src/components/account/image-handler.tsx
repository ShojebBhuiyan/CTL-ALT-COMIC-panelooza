"use client";

import { changeImage } from "@/actions/user/change-image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { startTransition, useEffect, useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";

interface ImageHandlerProps {
  id: string;
  username: string;
  imageUrl: string;
}

export default function ImageHandler({
  id,
  username,
  imageUrl,
}: ImageHandlerProps) {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { update } = useSession();

  useEffect(() => {
    fetch(`/api/image?fileName=${imageUrl}`)
      .then((response) => response.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, [imageUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await fetch("/api/image", {
        method: "POST",
        body: new FormData(e.currentTarget),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          startTransition(() => {
            changeImage(id, data.filename.toString())
              .then(() => {
                toast({
                  variant: "default",
                  title: "Account updated",
                  description:
                    "Your profile picture has been updated successfully.",
                });
              })
              .catch(() => {
                toast({
                  variant: "destructive",
                  title: "Uh oh! Something went wrong.",
                  description:
                    "There was an error updating your profile picture.",
                });
              });
          });
        });
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: String(error),
      });
    }
  }

  return (
    <div className="group relative w-32 h-32">
      <Avatar className="w-32 h-32 relative">
        <AvatarImage src={image!} />
        <AvatarFallback className="bg-yellow border-2 border-black text-black text-8xl">
          {username![0].toUpperCase()}
        </AvatarFallback>
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
      </Avatar>
      <div className="z-10 absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <FiEdit2
          className="w-6 h-6 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          ref={fileInputRef}
          type="file"
          name="file-input"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <button type="submit">sub</button>
      </form>
    </div>
  );
}
