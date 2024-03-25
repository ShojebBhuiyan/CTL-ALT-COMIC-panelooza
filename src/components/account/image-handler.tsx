"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiEdit2 } from "react-icons/fi";

interface ImageHandlerProps {
  imageUrl: string;
  name: string;
}

export default function ImageHandler({ imageUrl, name }: ImageHandlerProps) {
  const [image, setImage] = useState<string>(imageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="group relative w-32 h-32">
      <Avatar className="w-32 h-32 relative">
        <AvatarImage src={image!} />
        <AvatarFallback className="bg-yellow border-2 border-black text-black text-8xl">
          {name![0].toUpperCase()}
        </AvatarFallback>
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
      </Avatar>
      <div className="z-10 absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <FiEdit2
          className="w-6 h-6 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
