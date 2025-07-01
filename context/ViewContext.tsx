"use client";

import { createContext, useContext, useState } from "react";

type ViewMode = "game" | "text";

type ViewContextType = {
  viewMode: ViewMode;
  toggleViewMode: () => void;
};

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("game");

  const toggleViewMode = () => {
    setViewMode(prev => (prev === "game" ? "text" : "game"));
  };

  return (
    <ViewContext.Provider value={{ viewMode, toggleViewMode }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (!context) throw new Error("useView most be used within ViewProvider");
  return context;
}