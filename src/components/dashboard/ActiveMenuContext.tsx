import React from "react";

export const ActiveMenuContext = React.createContext({
  activeMenu: "Workspaces",
  setActiveMenu: (index: string) => {},
});
