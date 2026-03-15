"use client";

import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
  // Lazy initializer reads matchMedia synchronously on the client so the very
  // first render already has the correct value — no double-render / re-animation.
  // Falls back to false on the server (SSR) where window is unavailable.
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}
