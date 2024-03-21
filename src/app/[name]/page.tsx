"use client";

import Profile from "@/components/dashboard/profile";
import Workspace from "@/components/dashboard/workspaces";
import { useState } from "react";
import { LuFrame, LuHeart, LuUser2, LuHistory, LuCoins } from "react-icons/lu";

export default function Dashboard() {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [activeButton, setActiveButton] = useState("Workspaces");

  const Button = ({
    name,
    Icon,
  }: {
    name: string;
    Icon: React.ComponentType<{ className?: string }>;
  }) => {
    return (
      <button
        onClick={() => setActiveButton(name)}
        className={`flex items-center justify-center p-2 hover:bg-black hover:text-white transition-all duration-200 ease-in-out h-10 w-full ${
          activeButton === name && isMenuExpanded ? "text-white bg-black" : ""
        }`}
      >
        <Icon
          className={`${
            activeButton === name && !isMenuExpanded
              ? "text-black"
              : "text-yellow"
          }`}
        />
        {isMenuExpanded && <p>&ensp;{name}</p>}
      </button>
    );
  };

  return (
    <div className="h-auto bg-yellow text-black flex">
      <div
        className={`flex-shrink-0 p-4 space-y-4 bg-white transition-all duration-200 ease-in-out`}
        onMouseEnter={() => {
          setIsMenuExpanded(true);
        }}
        onMouseLeave={() => {
          setIsMenuExpanded(false);
        }}
      >
        <Button name="Workspaces" Icon={LuFrame} />
        <Button name="Your Styles" Icon={LuHistory} />
        <Button name="Favorites" Icon={LuHeart} />
        <Button name="Edit Profile" Icon={LuUser2} />
        <Button name="Subscription" Icon={LuCoins} />
      </div>
      <div className="flex-grow p-8">
        {activeButton === "Workspaces" && <Workspace />}
        {activeButton === "Edit Profile" && <Profile />}
      </div>
    </div>
  );
}
