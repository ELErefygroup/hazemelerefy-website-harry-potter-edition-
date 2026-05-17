"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { site } from "@/lib/site";
import { OwlIcon } from "@/components/icons/HpIcons";
import { submitContactForm } from "@/app/actions/contact";

/**
 * "Send the Owl" — service-request form. 
 * Refactored to use a Next.js Server Action to insert directly into Supabase.
 *
 * UX:
 *   - Honeypot field (`botcheck`) for low-effort spam.
 *   - HTML5 validation (required + email type).
 *   - Pending → success / error state with announcer-friendly copy.
 *   - On reduced-motion the success animation collapses to a plain swap.
 */
export function OwlForm() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    
    const f = e.currentTarget;
    const formData = new FormData(f);

    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setStatus("sent");
        setMessage(result.message);
        f.reset();
      } else {
        setStatus("error");
        setMessage(result.message);
      }
    } catch (err) {
      setStatus("error");
      setMessage("The owl couldn't take off. Please try again or write to me directly.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Honeypot — hidden from humans, bots happily fill it in. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <Field label="Your name" name="name" required placeholder="Albus Dumbledore" />
      <Field label="Reply-to email" name="email" type="email" required placeholder="albus@hogwarts.edu" />
      <Field label="Project type" name="project_type" placeholder="Dashboard · App · Audit · Other" className="md:col-span-2" />
      <Textarea label="Your brief" name="message" required placeholder="Sketch the project — what does success look like?" />

      <div className="md:col-span-2 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-heading text-xs text-parchment/55">
          Replies usually within 24 hours · or post directly to{" "}
          <a href={`mailto:${site.email}`} className="text-candle underline decoration-candle/40 underline-offset-4 hover:text-parchment">
            {site.email}
          </a>
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#E6B25E] via-[#D49B45] to-[#C8853A] px-7 py-3.5 font-display text-[12px] font-bold uppercase tracking-[0.3em] text-ink shadow-[0_0_30px_rgba(230,178,94,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(230,178,94,0.6)] disabled:cursor-progress disabled:opacity-70"
        >
          <OwlIcon width={16} height={16} />
          {status === "sending" ? "Saddling the Owl…" : "Send the Owl"}
        </button>
      </div>

      {status !== "idle" && status !== "sending" && (
        <motion.p
          role="status"
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.4 }}
          className={`md:col-span-2 rounded-2xl border px-5 py-3 font-heading text-sm ${
            status === "sent"
              ? "border-[#5fa178]/40 bg-[#2e6b48]/12 text-[#7ec39a]"
              : "border-[#cb6975]/40 bg-[#9a3640]/12 text-[#e2939c]"
          }`}
        >
          {message}
        </motion.p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="block font-display text-[10px] font-semibold uppercase tracking-[0.32em] text-parchment/60">
        {label}
        {required ? <span aria-hidden="true" className="ml-1 text-candle">*</span> : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 block w-full rounded-2xl border border-parchment/12 bg-night/65 px-4 py-3 font-heading text-sm text-parchment placeholder:text-parchment/30 outline-none transition-all duration-300 focus:border-candle/60 focus:bg-night/85 focus:ring-2 focus:ring-candle/25"
      />
    </label>
  );
}

function Textarea({
  label,
  name,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="md:col-span-2 block">
      <span className="block font-display text-[10px] font-semibold uppercase tracking-[0.32em] text-parchment/60">
        {label}
        {required ? <span aria-hidden="true" className="ml-1 text-candle">*</span> : null}
      </span>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={5}
        className="mt-2 block w-full resize-y rounded-2xl border border-parchment/12 bg-night/65 px-4 py-3 font-heading text-sm text-parchment placeholder:text-parchment/30 outline-none transition-all duration-300 focus:border-candle/60 focus:bg-night/85 focus:ring-2 focus:ring-candle/25"
      />
    </label>
  );
}
