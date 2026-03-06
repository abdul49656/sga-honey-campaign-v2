"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice =
      window.matchMedia("(hover: none)").matches ||
      "ontouchstart" in window;
    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    function onMouseMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    }

    function onMouseEnter() {
      setIsVisible(true);
    }

    function onMouseLeave() {
      setIsVisible(false);
    }

    function addHoverListeners() {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]'
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    }

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: isHovering ? 48 : 12,
        height: isHovering ? 48 : 12,
        backgroundColor: isHovering ? "transparent" : "#1A1A1A",
        border: isHovering ? "2px solid #1A1A1A" : "2px solid rgba(255,255,255,0.8)",
        boxShadow: isHovering
          ? "0 0 0 1px rgba(255,255,255,0.5)"
          : "0 0 0 1px rgba(255,255,255,0.6), 0 2px 8px rgba(0,0,0,0.3)",
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        width: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        backgroundColor: { duration: 0.2 },
        border: { duration: 0.2 },
        opacity: { duration: 0.15 },
      }}
    />
  );
}
