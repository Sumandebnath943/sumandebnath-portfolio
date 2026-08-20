"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface RobotChatState {
  open: boolean;
  openChat: () => void;
  closeChat: () => void;
  /**
   * A page has taken the whole screen: no corner mascot, no chat launcher, no
   * tour tab.
   *
   * Two reasons this exists, and neither can be solved by `SiteOnly`, which
   * filters on pathname — a 404 has an arbitrary pathname and matches nothing.
   *
   * 1. **One WebGL context per page.** `RobotMascot` sits in the root layout,
   *    so a page rendering the robot at its own size has to stand the corner
   *    one down rather than draw a second canvas beside it. Two contexts would
   *    double the cost the whole of PAGE_OPTIMIZATION.md exists to keep down,
   *    and would simply look like a bug.
   * 2. **Some pages are a composition.** The 404 is one screen with no scroll;
   *    a floating chat pill and a tour tab bolted onto it are somebody else's
   *    furniture standing in the middle of it.
   *
   * Set from an effect on mount and cleared on unmount, so navigating away
   * restores everything with no further coordination.
   */
  solo: boolean;
  setSolo: (v: boolean) => void;
}

const RobotChatContext = createContext<RobotChatState | null>(null);

export function RobotChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [solo, setSolo] = useState(false);
  const openChat = useCallback(() => setOpen(true), []);
  const closeChat = useCallback(() => setOpen(false), []);
  return (
    <RobotChatContext.Provider value={{ open, openChat, closeChat, solo, setSolo }}>
      {children}
    </RobotChatContext.Provider>
  );
}

export function useRobotChat() {
  const ctx = useContext(RobotChatContext);
  if (!ctx) throw new Error("useRobotChat must be used within RobotChatProvider");
  return ctx;
}
