"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { LuFrame, LuHeart, LuUser2, LuHistory, LuCoins } from "react-icons/lu";
import { ActiveMenuContext } from "./ActiveMenuContext";

export default function Sidebar() {
  const { data: session } = useSession();
  const { activeMenu, setActiveMenu } = useContext(ActiveMenuContext);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const Button = ({
    name,
    Icon,
  }: {
    name: string;
    Icon: React.ComponentType<{ className?: string }>;
  }) => {
    return (
      <button
        onClick={() => setActiveMenu(name)}
        className={`flex items-center justify-center p-2 hover:bg-black hover:text-white transition-all duration-200 ease-in-out h-10 w-full ${
          activeMenu === name && isMenuExpanded ? "text-white bg-black" : ""
        }`}
      >
        <Icon
          className={`${
            activeMenu === name && !isMenuExpanded
              ? "text-black"
              : "text-yellow"
          }`}
        />
        {isMenuExpanded && <p>&ensp;{name}</p>}
      </button>
    );
  };

  return (
    <div
      className={`flex-shrink-0 p-4 space-y-4 bg-white transition-all duration-200 ease-in-out`}
      onMouseEnter={() => {
        setIsMenuExpanded(true);
      }}
      onMouseLeave={() => {
        setIsMenuExpanded(false);
      }}
    >
      <Link href={`/${session?.user?.username!}/`}>
        <Button name="Workspaces" Icon={LuFrame} />
      </Link>
      <Link href={`#`}>
        <Button name="Your Styles" Icon={LuHistory} />
      </Link>
      <Link href={`#`}>
        <Button name="Favorites" Icon={LuHeart} />
      </Link>
      <Link href={`/${session?.user?.username!}/account`}>
        <Button name="Edit Profile" Icon={LuUser2} />
      </Link>
      <Link href={`#`}>
        <Button name="Subscription" Icon={LuCoins} />
      </Link>
    </div>
  );
}
