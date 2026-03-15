"use client";

import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
  // Default to false so desktop layout renders correctly during SSR/hydration.
  // Mobile users get a brief flash of desktop layout before useEffect corrects it,
  // which is preferable to desktop users never seeing headshots.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}
