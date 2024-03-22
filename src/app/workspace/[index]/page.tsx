"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import Strip from "@/components/workspace/strip";
import { FiUpload } from "react-icons/fi";
import { LuSend } from "react-icons/lu";

export default function Canvas() {
  return (
    <div className="bg-gray-100 text-black flex p-4">
      <div className="w-1/4 bg-gray-200 p-4 flex flex-col">
        <p className="text-lg text-center font-bold mb-4">Styles</p>
        <button className="bg-black text-white px-4 py-2 mb-4">
          <FiUpload className="inline-block me-2" />
          Upload your own
        </button>
        <div className="grid grid-cols-2 gap-2 justify-items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-32 w-32 rounded-none bg-white" />
          ))}
        </div>
      </div>
      <div className="flex-grow bg-gray-100 py-4 px-32 flex flex-col">
        <div className="flex justify-end mb-4 space-x-2">
          <Select>
            <SelectTrigger id="grid" className="rounded-none">
              <SelectValue placeholder="Select grid" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
            </SelectContent>
          </Select>
          <button className="bg-black text-white px-4 py-2">Export</button>
          <button className="bg-black text-white px-4 py-2">Save</button>
        </div>
        <Strip />
        <div className="mt-10 relative">
          <Textarea
            className="border-2 rounded-none pr-10"
            placeholder="Enter your message here."
          />
          <LuSend className="text-xl absolute right-4 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
      <div className="w-1/12 bg-gray-200 p-4"></div>
    </div>
  );
}
