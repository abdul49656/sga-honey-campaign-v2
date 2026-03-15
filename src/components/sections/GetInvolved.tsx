"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TextSwapButton } from "@/components/ui/TextSwapButton";
import { useScrollReveal, slideLeft, fadeUp } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxT5KQsuLEFscY4drvf_FSMxHaOl3Ogs7p4q3f3NTKX9FoPhPY5LfzN19zTrWWy_E93og/exec";

const contactItems = [
  { emoji: "📧", label: "Email", value: "abigail.daugherty@bruins.belmont.edu", href: "mailto:abigail.daugherty@bruins.belmont.edu" },
  { emoji: "📸", label: "Instagram", value: "@policythatsticks", href: "https://instagram.com/policythatsticks" },
];

const classYearOptions = ["Freshman", "Sophomore", "Junior", "Senior"];

export function GetInvolved() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [classYear, setClassYear] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const { ref: leftRef, visible: leftVisible } = useScrollReveal();
  const { ref: rightRef, visible: rightVisible } = useScrollReveal();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const message = (formData.get("message") as string).trim();

    if (!name || !email) return;

    setStatus("sending");

    const body = new URLSearchParams({ name, email, interest: classYear, message });

    try {
      await fetch(GOOGLE_SHEET_URL, { method: "POST", mode: "no-cors", body });
      setStatus("sent");
      form.reset();
      setClassYear("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <section
      id="involved"
      className="bg-cream-deep"
      style={{ padding: "var(--section-pad-y) var(--section-pad-x)" }}
    >
      <div className="mx-auto max-w-[90rem]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          {/* Left — Info */}
          <div ref={leftRef} style={slideLeft(leftVisible)}>
            <span className="text-label text-text-muted">Get Involved</span>
            <h2 className="mt-1.5 text-display-md text-text-primary">
              Join the{" "}
              <em className="font-[family-name:var(--font-cormorant)] text-gold">Hive.</em>
            </h2>
            <p className="mt-4 max-w-md font-[family-name:var(--font-montserrat)] text-[0.9375rem] leading-[1.7] text-text-secondary">
              Whether you want to volunteer, ask a question, or just connect,
              we want to hear from you.
            </p>

            <div className="mt-12 flex flex-col gap-8">
              {contactItems.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Instagram" ? "_blank" : undefined}
                  rel={item.label === "Instagram" ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-5"
                  style={fadeUp(leftVisible, 200 + i * 80)}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-dark/15 bg-white shadow-sm transition-all duration-300 group-hover:border-gold/40 group-hover:bg-gold/5">
                    <span className="text-lg">{item.emoji}</span>
                  </div>
                  <div>
                    <span className="block text-label text-[0.6rem] text-text-muted">{item.label}</span>
                    <span className="font-[family-name:var(--font-montserrat)] text-[0.9375rem] text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
                      {item.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div ref={rightRef} style={fadeUp(rightVisible, 100)}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-8 rounded-3xl bg-white p-6 md:p-10"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)" }}
            >
              <input type="text" name="name" required placeholder="Full name" className="input-underline" />
              <input type="email" name="email" required placeholder="you@belmont.edu" className="input-underline" />

              <div>
                <span className="text-label text-[0.6rem] text-text-muted">I am a...</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {classYearOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setClassYear(opt)}
                      className={cn(
                        "rounded-full border px-4 py-2 font-[family-name:var(--font-montserrat)] text-[0.75rem] font-semibold transition-all duration-300",
                        classYear === opt
                          ? "border-dark bg-dark text-white"
                          : "border-dark/10 text-text-secondary hover:border-dark/25"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                name="message"
                rows={3}
                placeholder="Tell us what's on your mind... (optional)"
                className="input-underline resize-none"
              />

              <div className="pt-2">
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.div key="idle" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <TextSwapButton type="submit" variant="dark">Send It</TextSwapButton>
                    </motion.div>
                  )}
                  {status === "sending" && (
                    <motion.p key="sending" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-label text-text-muted">
                      Sending...
                    </motion.p>
                  )}
                  {status === "sent" && (
                    <motion.p key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-label text-emerald-600">
                      Sent!
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p key="error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-label text-red-500">
                      Something went wrong
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
