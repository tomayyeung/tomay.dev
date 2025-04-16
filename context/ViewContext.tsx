"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ViewMode = "game" | "text";

type ViewContextType = {
  viewMode: ViewMode;
  toggleViewMode: () => void;
};

const ViewContext = createContext<ViewContextType | null>(null);

export function ViewProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("game");

  const toggleViewMode = () => {
    setViewMode(prev => (prev === "game" ? "text" : "game"));
  };

  return (
    <ViewContext value={{ viewMode, toggleViewMode }}>
      {children}
    </ViewContext>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (!context) throw new Error("useView most be used within ViewProvider");
  return context;
}