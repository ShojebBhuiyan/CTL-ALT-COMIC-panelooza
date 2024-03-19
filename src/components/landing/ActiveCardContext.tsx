import React from "react";

export const ActiveCardContext = React.createContext({
  activeCard: 0,
  setActiveCard: (index: number) => {},
});
