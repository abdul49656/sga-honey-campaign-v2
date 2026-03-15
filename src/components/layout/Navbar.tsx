"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Candidates", href: "#candidates" },
  { label: "Platform", href: "#platform" },
  { label: "Campus", href: "#campus" },
  { label: "Get Involved", href: "#involved" },
];

function SplitHoverLink({
  children,
  href,
  className,
}: {
  children: string;
  href: string;
  className?: string;
}) {
  const chars = children.split("");
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-block overflow-hidden font-[family-name:var(--font-montserrat)] text-[0.75rem] font-semibold uppercase tracking-[0.1em]",
        className
      )}
    >
      <span className="flex">
        {chars.map((char, i) => (
          <span
            key={`top-${i}`}
            className="inline-block transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      <span className="absolute left-0 top-0 flex">
        {chars.map((char, i) => (
          <span
            key={`bot-${i}`}
            className="inline-block translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:translate-y-0"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed left-0 right-0 top-0 z-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "bg-cream/90 backdrop-blur-2xl border-b border-dark/[0.10]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-6 py-5 md:px-10 lg:px-14 lg:py-6">
          {/* Logo — text-only, elegant */}
          <a
            href="#"
            className={cn(
              "font-[family-name:var(--font-cormorant)] text-[1.35rem] font-bold tracking-[-0.03em] transition-colors duration-500",
              scrolled ? "text-text-primary" : "text-white"
            )}
          >
            Daugherty & Honey
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <SplitHoverLink
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors duration-500",
                  scrolled ? "text-text-secondary" : "text-white/80"
                )}
              >
                {link.label}
              </SplitHoverLink>
            ))}

            {/* CTA */}
            <a
              href="#involved"
              className={cn(
                "group relative inline-flex items-center overflow-hidden font-[family-name:var(--font-montserrat)] text-[0.75rem] font-semibold uppercase tracking-[0.08em] transition-all duration-500",
                scrolled
                  ? "text-dark"
                  : "text-white"
              )}
            >
              <span className="relative">
                Vote for Us
                <span className={cn(
                  "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100",
                  scrolled ? "bg-dark" : "bg-white"
                )} />
              </span>
            </a>
          </div>

          {/* Mobile hamburger — minimal */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-col items-end gap-[5px] md:hidden"
            aria-label="Open menu"
          >
            <span className={cn(
              "block h-px w-6 transition-colors duration-500",
              scrolled ? "bg-dark" : "bg-white"
            )} />
            <span className={cn(
              "block h-px w-4 transition-colors duration-500",
              scrolled ? "bg-dark" : "bg-white"
            )} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2rem) 2rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-dark"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-[family-name:var(--font-cormorant)] text-[1.35rem] font-bold tracking-[-0.03em] text-white">
                D & H
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/50"
              >
                Close
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span className="absolute h-px w-4 rotate-45 bg-white/50" />
                  <span className="absolute h-px w-4 -rotate-45 bg-white/50" />
                </span>
              </button>
            </div>

            <div className="flex flex-col gap-2 px-6 pt-16">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-display-md text-white py-2"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Bottom tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute bottom-10 left-6 text-label text-white/30"
            >
              Belmont SGA 2026
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
