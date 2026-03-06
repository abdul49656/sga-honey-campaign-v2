"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mail, AtSign, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxT5KQsuLEFscY4drvf_FSMxHaOl3Ogs7p4q3f3NTKX9FoPhPY5LfzN19zTrWWy_E93og/exec";

const contactItems = [
  { icon: Mail, label: "Email", value: "campaign@belmont.edu" },
  { icon: AtSign, label: "Instagram", value: "@daugherty.honey" },
  { icon: Clock, label: "Office Hours", value: "Tues & Thurs, 3–5 PM" },
];

const interestOptions = [
  "Volunteer",
  "Spread the Word",
  "Ask a Question",
  "Say Hi",
];

export function GetInvolved() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [interest, setInterest] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

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

    const body = new URLSearchParams({
      name,
      email,
      interest,
      message,
    });

    try {
      await fetch(GOOGLE_SHEET_URL, { method: "POST", mode: "no-cors", body });
      setStatus("sent");
      form.reset();
      setInterest("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <section id="involved" className="bg-gold-ultra py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          >
            <Eyebrow>Get Involved</Eyebrow>
            <SectionHeading className="mt-3">
              Join the <em className="text-gold-hover">Hive.</em>
            </SectionHeading>
            <p className="mt-4 max-w-md font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed text-text-secondary">
              Whether you want to volunteer, ask a question, or just connect —
              we want to hear from you.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    className="group flex items-center gap-4"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + i * 0.07,
                      ease: [0, 0, 0.2, 1],
                    }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 transition-colors duration-200 group-hover:bg-gold/25">
                      <Icon className="h-4 w-4 text-gold-hover" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="block font-[family-name:var(--font-figtree)] text-[0.625rem] font-bold uppercase tracking-[0.12em] text-text-muted">
                        {item.label}
                      </span>
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-text-secondary">
                        {item.value}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-2xl border border-gold/10 bg-white/70 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-xl md:p-8"
            >
              <div className="space-y-5">
                {/* Name */}
                <div className="group relative">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full name"
                    className="peer h-11 w-full rounded-lg border border-dark/8 bg-cream/30 px-3.5 font-[family-name:var(--font-dm-sans)] text-sm text-text-primary outline-none transition-all duration-200 placeholder:text-text-muted focus:border-gold focus:bg-white focus:shadow-[0_2px_20px_rgba(253,206,0,0.08)]"
                  />
                </div>

                {/* Email */}
                <div className="group relative">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@belmont.edu"
                    className="peer h-11 w-full rounded-lg border border-dark/8 bg-cream/30 px-3.5 font-[family-name:var(--font-dm-sans)] text-sm text-text-primary outline-none transition-all duration-200 placeholder:text-text-muted focus:border-gold focus:bg-white focus:shadow-[0_2px_20px_rgba(253,206,0,0.08)]"
                  />
                </div>

                {/* Interest — pill toggle */}
                <div>
                  <span className="mb-2 block font-[family-name:var(--font-figtree)] text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
                    I want to...
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setInterest(opt)}
                        className={cn(
                          "relative rounded-full px-4 py-2 font-[family-name:var(--font-figtree)] text-xs font-semibold transition-all duration-200",
                          interest === opt
                            ? "bg-gold text-dark"
                            : "bg-dark/5 text-text-secondary hover:bg-dark/10"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us what's on your mind... (optional)"
                    className="w-full resize-none rounded-lg border border-dark/8 bg-cream/30 px-3.5 py-2.5 font-[family-name:var(--font-dm-sans)] text-sm text-text-primary outline-none transition-all duration-200 placeholder:text-text-muted focus:border-gold focus:bg-white focus:shadow-[0_2px_20px_rgba(253,206,0,0.08)]"
                  />
                </div>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="mt-6 w-full overflow-hidden rounded-xl bg-dark py-3.5 font-[family-name:var(--font-figtree)] text-sm font-bold uppercase tracking-[0.04em] text-white transition-all duration-200 ease-out hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] disabled:opacity-50"
                whileHover={status === "idle" ? { scale: 1.01 } : {}}
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
              >
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                    >
                      Send It
                    </motion.span>
                  )}
                  {status === "sending" && (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                    >
                      Sending...
                    </motion.span>
                  )}
                  {status === "sent" && (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-emerald-400"
                    >
                      Sent!
                    </motion.span>
                  )}
                  {status === "error" && (
                    <motion.span
                      key="error"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-red-400"
                    >
                      Something went wrong
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
