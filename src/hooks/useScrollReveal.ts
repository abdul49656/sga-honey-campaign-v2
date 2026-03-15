"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "-60px"
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          ob.disconnect();
        }
      },
      { rootMargin }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [rootMargin]);

  return { ref, visible };
}

const DUR = "650ms";
const EASE = "cubic-bezier(0.16,1,0.3,1)";

function t(delay: number) {
  return `opacity ${DUR} ${EASE} ${delay}ms, transform ${DUR} ${EASE} ${delay}ms`;
}

export function slideLeft(visible: boolean, delay = 0): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(-48px)",
    transition: t(delay),
    willChange: visible ? "auto" : "transform, opacity",
  };
}

export function slideRight(visible: boolean, delay = 0): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(48px)",
    transition: t(delay),
    willChange: visible ? "auto" : "transform, opacity",
  };
}

export function fadeUp(visible: boolean, delay = 0): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(32px)",
    transition: t(delay),
    willChange: visible ? "auto" : "transform, opacity",
  };
}
