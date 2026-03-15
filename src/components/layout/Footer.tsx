"use client";

import { MagneticWrapper } from "@/components/ui/MagneticWrapper";

const footerLinks = {
  Navigate: [
    { label: "Home", href: "#" },
    { label: "Candidates", href: "#candidates" },
    { label: "Platform", href: "#platform" },
    { label: "Campus Life", href: "#campus" },
    { label: "Get Involved", href: "#involved" },
  ],
};

export function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="border-t border-dark/[0.06] bg-cream">
      <div className="mx-auto max-w-[90rem] px-6 py-16 md:px-10 md:py-20 lg:px-14">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr]">
          {/* Brand */}
          <div>
            <span className="font-[family-name:var(--font-cormorant)] text-xl font-bold tracking-[-0.02em]">
              Daugherty & Honey
            </span>
            <p className="mt-4 max-w-[260px] font-[family-name:var(--font-montserrat)] text-[0.875rem] leading-[1.7] text-text-secondary">
              A golden vision for Belmont. Student wellness, campus unity,
              academic advocacy, and sustainability.
            </p>
            <div className="mt-6 flex gap-3">
              <MagneticWrapper strength={0.4}>
                <a
                  href="https://instagram.com/policythatsticks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-dark/8 font-[family-name:var(--font-montserrat)] text-[0.625rem] font-semibold text-text-secondary transition-all duration-300 hover:border-dark/20 hover:text-text-primary"
                >
                  IG
                </a>
              </MagneticWrapper>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <span className="text-label text-text-muted">{title}</span>
              <ul className="mt-5 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center font-[family-name:var(--font-montserrat)] text-[0.875rem] text-text-secondary transition-colors duration-300 hover:text-text-primary"
                    >
                      <span className="inline-block h-px w-0 bg-dark transition-all duration-300 group-hover:mr-2.5 group-hover:w-4" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-dark/[0.06] pt-8 sm:flex-row">
          <p className="font-[family-name:var(--font-montserrat)] text-[0.75rem] text-text-muted">
            &copy; 2026 Daugherty & Honey Campaign. Belmont University.
          </p>

          <div className="flex items-center gap-6">
            <p className="font-[family-name:var(--font-cormorant)] text-[0.875rem] font-semibold italic text-text-muted">
              Make It Golden
            </p>

            <MagneticWrapper strength={0.5}>
              <button
                onClick={scrollToTop}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-dark/8 text-text-muted transition-all duration-300 hover:border-dark/20 hover:text-text-primary"
                aria-label="Back to top"
              >
                <span className="text-sm">⬆️</span>
              </button>
            </MagneticWrapper>
          </div>
        </div>
      </div>
    </footer>
  );
}
