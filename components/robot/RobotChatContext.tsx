"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface RobotChatState {
  open: boolean;
  openChat: () => void;
  closeChat: () => void;
}

const RobotChatContext = createContext<RobotChatState | null>(null);

export function RobotChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openChat = useCallback(() => setOpen(true), []);
  const closeChat = useCallback(() => setOpen(false), []);
  return (
    <RobotChatContext.Provider value={{ open, openChat, closeChat }}>
      {children}
    </RobotChatContext.Provider>
  );
}

export function useRobotChat() {
  const ctx = useContext(RobotChatContext);
  if (!ctx) throw new Error("useRobotChat must be used within RobotChatProvider");
  return ctx;
}
