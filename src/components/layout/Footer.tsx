"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUp } from "lucide-react";

const footerLinks = {
  Navigate: [
    { label: "Home", href: "#" },
    { label: "Candidates", href: "#candidates" },
    { label: "Platform", href: "#platform" },
    { label: "Campus Life", href: "#campus" },
    { label: "Get Involved", href: "#involved" },
  ],
  "Belmont SGA": [
    { label: "Official SGA Page", href: "#" },
    { label: "Student Senate", href: "#" },
    { label: "Election Info", href: "#" },
  ],
  Campaign: [
    { label: "Press Kit", href: "#" },
    { label: "Media Inquiries", href: "#" },
    { label: "Volunteer", href: "#involved" },
  ],
};

export function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative bg-cream-deep">
      {/* Large watermark tagline */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 flex items-start justify-center overflow-hidden pt-12"
        aria-hidden="true"
      >
        <span className="select-none whitespace-nowrap font-[family-name:var(--font-cormorant)] text-[clamp(4rem,12vw,10rem)] font-bold italic leading-none text-dark/[0.03]">
          Make It Golden
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-[family-name:var(--font-cormorant)] text-xl font-bold tracking-[-0.02em]">
              Daugherty & Honey
            </span>
            <p className="mt-3 max-w-[240px] font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed text-text-secondary">
              A golden vision for Belmont. Student wellness, campus unity,
              academic advocacy, and sustainability.
            </p>
            <div className="mt-5 flex gap-3">
              {["IG", "X", "TK"].map((platform) => (
                <MagneticButton key={platform}>
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-dark/5 font-[family-name:var(--font-figtree)] text-xs font-semibold text-text-secondary transition-colors duration-200 hover:bg-gold hover:text-dark"
                  >
                    {platform}
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <Eyebrow className="text-text-muted">{title}</Eyebrow>
              <ul className="mt-4 flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center font-[family-name:var(--font-dm-sans)] text-sm text-text-secondary transition-all duration-200 hover:text-text-primary"
                    >
                      <span className="inline-block w-0 overflow-hidden text-gold transition-all duration-200 group-hover:mr-2 group-hover:w-3">
                        —
                      </span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-dark/5 pt-8 sm:flex-row">
          <p className="font-[family-name:var(--font-dm-sans)] text-xs text-text-muted">
            &copy; 2026 Daugherty & Honey Campaign. Belmont University.
          </p>

          <div className="flex items-center gap-4">
            <p className="font-[family-name:var(--font-cormorant)] text-sm font-semibold italic text-text-muted">
              Make It Golden <span className="text-gold">✦</span>
            </p>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-gold-hover transition-colors duration-200 hover:bg-gold hover:text-dark"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
