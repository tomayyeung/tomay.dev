"use client";

import { createContext, ReactNode, useContext, useState, useCallback } from "react";

export interface Camera {
  x: number;
  y: number;
}

export interface CameraContextValue {
  camera: Camera;
  setCamera: (newCamera: Partial<Camera>) => void;
  resetCamera: () => void;
}

const defaultCamera: Camera = {
  x: 0,
  y: 0
};

const CameraContext = createContext<CameraContextValue | undefined>(undefined);

export function CameraProvider({ children }: { children: ReactNode }) {
  const [camera, setCameraState] = useState<Camera>(defaultCamera);

  const setCamera = useCallback((newCamera: Partial<Camera>) => {
    setCameraState(prev => ({ ...prev, ...newCamera }));
  }, []);

  const resetCamera = useCallback(() => {
    setCameraState(defaultCamera);
  }, []);

  return (
    <CameraContext.Provider value={{ camera, setCamera, resetCamera }}>
      {children}
    </CameraContext.Provider>
  );
}

export function useCamera() {
  const context = useContext(CameraContext);
  if (!context) throw new Error("useCamera must be used within ContextProvider");
  return context;
}