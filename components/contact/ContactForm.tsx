"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}`);
      setStatus("success");
      formElement.reset();
    } catch (error) {
      console.error("Contact form submission failed", error);
      setStatus("error");
    }
  }

  return <form onSubmit={submit} className="space-y-5 border border-surface-border bg-legal-black-panel p-6 md:p-8">
    <label className="block text-sm text-white">{t("name")}<input name="name" required maxLength={120} autoComplete="name" className="mt-2 block w-full border border-surface-border bg-legal-black px-4 py-3 text-sm outline-none focus:border-waveform-cyan" /></label>
    <label className="block text-sm text-white">{t("email")}<input name="email" type="email" required maxLength={254} autoComplete="email" className="mt-2 block w-full border border-surface-border bg-legal-black px-4 py-3 text-sm outline-none focus:border-waveform-cyan" /></label>
    <label className="block text-sm text-white">{t("phone")} <span className="text-surface-muted">{t("phoneOptional")}</span><input name="phone" type="tel" maxLength={40} autoComplete="tel" className="mt-2 block w-full border border-surface-border bg-legal-black px-4 py-3 text-sm outline-none focus:border-waveform-cyan" /></label>
    <label className="block text-sm text-white">{t("message")}<textarea name="message" required maxLength={5000} rows={5} className="mt-2 block w-full resize-y border border-surface-border bg-legal-black px-4 py-3 text-sm outline-none focus:border-waveform-cyan" /></label>
    <button type="submit" disabled={status === "sending"} className="w-full bg-waveform-cyan px-5 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black transition hover:bg-waveform-cyan-soft disabled:opacity-60">{status === "sending" ? t("sending") : t("send")}</button>
    {status === "success" && <p role="status" className="text-sm text-waveform-cyan">{t("thanks")}</p>}
    {status === "error" && <p role="alert" className="text-sm text-red-400">{t("genericError")}</p>}
  </form>;
}
