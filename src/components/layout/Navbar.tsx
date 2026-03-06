"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Candidates", href: "#candidates" },
  { label: "Platform", href: "#platform" },
  { label: "Campus", href: "#campus" },
  { label: "Get Involved", href: "#involved" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[11] h-[2px] origin-left bg-gold"
        style={{ scaleX: scrollYProgress }}
      />

      <nav
        className={cn(
          "fixed left-0 right-0 top-[2px] z-10 transition-all duration-300 ease-[cubic-bezier(0,0,0.2,1)]",
          scrolled
            ? "bg-cream/85 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-2xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8 lg:py-5">
          <a
            href="#"
            className={cn(
              "font-[family-name:var(--font-cormorant)] text-xl font-bold tracking-[-0.02em] transition-colors duration-300",
              scrolled ? "text-text-primary" : "text-white"
            )}
          >
            D&H <span className="text-gold">✦</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative font-[family-name:var(--font-figtree)] text-[0.8125rem] font-semibold uppercase tracking-[0.06em] transition-colors duration-300 ease-out hover:text-gold",
                  scrolled ? "text-text-secondary" : "text-white/70"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-200 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <a
            href="#involved"
            className={cn(
              "hidden rounded-full px-5 py-2 font-[family-name:var(--font-figtree)] text-[0.8125rem] font-semibold uppercase tracking-[0.04em] transition-all duration-300 ease-out md:inline-block",
              scrolled
                ? "bg-dark text-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                : "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            )}
          >
            Vote for Us
          </a>

          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-center md:hidden"
            aria-label="Open menu"
          >
            <Menu className={cn("h-5 w-5 transition-colors duration-300", scrolled ? "text-text-primary" : "text-white")} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-cream"
          >
            <div className="flex items-center justify-between px-4 py-4">
              <span className="font-[family-name:var(--font-cormorant)] text-xl font-bold tracking-[-0.02em]">
                D&H <span className="text-gold">✦</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-text-primary" />
              </button>
            </div>

            <div className="flex flex-col gap-6 px-8 pt-12">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1 + i * 0.06,
                    ease: [0, 0, 0.2, 1],
                  }}
                  className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-text-primary"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#involved"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 + navLinks.length * 0.06,
                  ease: [0, 0, 0.2, 1],
                }}
                className="mt-4 inline-block w-fit rounded-full bg-dark px-6 py-3 font-[family-name:var(--font-figtree)] text-sm font-semibold uppercase tracking-[0.04em] text-white"
              >
                Vote for Us
              </motion.a>
            </div>

            {/* Tagline at bottom */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute bottom-12 left-8 font-[family-name:var(--font-cormorant)] text-lg italic text-text-muted"
            >
              Make It Golden <span className="text-gold">✦</span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
