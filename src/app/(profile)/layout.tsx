"use client";

import Sidebar from "@/components/dashboard/sidebar";
import { ActiveMenuContext } from "@/components/dashboard/ActiveMenuContext";
import { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeMenu, setActiveMenu] = useState("Workspaces");

  return (
    <div className="relative h-auto bg-yellow text-black flex">
      <ActiveMenuContext.Provider value={{ activeMenu, setActiveMenu }}>
        <Sidebar />
        <main className="p-8">{children}</main>
      </ActiveMenuContext.Provider>
    </div>
  );
}
