import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router";
import {
  ArrowUpRight,
  Check,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  TriangleAlert,
} from "lucide-react";
import { Reveal } from "../Components/ui/Reveal.tsx";
import { SpecLabel } from "../Components/ui/Manifest.tsx";
import { CONTACT } from "../data/company.ts";
import { cn } from "../lib/utils.ts";

/* EmailJS public keys are designed to be client-visible. Restrict the
   allowed domains in the EmailJS dashboard rather than hiding these. */
const EMAILJS_SERVICE = "service_z62x6r3";
const EMAILJS_TEMPLATE = "template_eneux2l";
const EMAILJS_PUBLIC_KEY = "M_DT9HlnT38Urw4IF";

type Status = "idle" | "sending" | "sent" | "error";

const EMPTY = { name: "", email: "", subject: "", message: "" };

const REACH = [
  {
    icon: Phone,
    label: "Talk to us",
    value: CONTACT.tel,
    href: `tel:${CONTACT.tel.replace(/\s/g, "")}`,
    note: "Fastest for pricing and availability",
  },
  {
    icon: Mail,
    label: "Write to us",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    note: "Send specs, photos or a packing list",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONTACT.tel,
    href: CONTACT.whatsapp,
    note: "Good for quick back-and-forth",
    external: true,
  },
];

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold-deep"
      >
        {label}
      </label>
      {children}
      {hint && <p className="mt-2 text-[0.8125rem] text-slate">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full border border-bone-line bg-white px-4 py-3.5 text-[0.9375rem] text-ink " +
  "placeholder:text-slate/50 transition-colors duration-200 " +
  "focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear a previous result once the buyer starts a new message.
    if (status === "sent" || status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, form, EMAILJS_PUBLIC_KEY);
      setStatus("sent");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <>
      {/* ── Masthead ─────────────────────────────────────────────── */}
      <section className="border-b border-ink-line bg-ink">
        <div className="mx-auto max-w-[84rem] px-6 py-16 lg:px-10 lg:py-24">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone/40">
                <li>
                  <Link to="/" className="transition-colors hover:text-gold">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-gold">Contact</li>
              </ol>
            </nav>

            <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.25rem,6vw,4.75rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-bone">
              Tell us what you need
              <span className="block text-gold">and how much of it.</span>
            </h1>

            <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-bone/55">
              Grade, volume and destination port are enough to get a price back.
              If you have photos or a packing list, send those too.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Reach + form ─────────────────────────────────────────── */}
      <section className="bg-bone">
        <div className="mx-auto grid max-w-[84rem] gap-12 px-6 py-16 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:py-24">
          {/* Channels */}
          <Reveal from="left">
            <SpecLabel tone="light">Reach the desk</SpecLabel>

            <ul className="mt-8 space-y-px border border-ink-line bg-ink-line">
              {REACH.map(({ icon: Icon, label, value, href, note, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex gap-4 bg-ink p-6 transition-colors duration-300 hover:bg-ink-raised"
                  >
                    <span className="grid size-10 shrink-0 place-items-center border border-gold/35 text-gold transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.625rem] uppercase tracking-[0.2em] text-bone/40">
                        {label}
                      </span>
                      <span className="mt-1.5 block break-all font-mono text-[0.875rem] text-bone transition-colors group-hover:text-gold">
                        {value}
                      </span>
                      <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-bone/45">
                        {note}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 border border-bone-line bg-white p-6">
              <p className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-slate">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
                <span>
                  {CONTACT.street}
                  <br />
                  {CONTACT.postcode} {CONTACT.city}, {CONTACT.country}
                </span>
              </p>
              <p className="mt-4 flex items-center gap-3 font-mono text-[0.8125rem] tracking-[0.06em] text-slate">
                <Clock className="size-4 shrink-0 text-gold-deep" aria-hidden="true" />
                Monday to Sunday
              </p>
            </div>
          </Reveal>

          {/* Enquiry */}
          <Reveal from="right">
            <div className="border border-bone-line bg-white p-8 lg:p-10">
              <SpecLabel tone="light">Send an enquiry</SpecLabel>
              <h2 className="mt-5 font-display text-[clamp(1.5rem,3vw,2.125rem)] font-bold uppercase leading-tight tracking-[-0.01em]">
                Request a quote
              </h2>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate={false}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="name" label="Your name">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      disabled={sending}
                      value={form.name}
                      onChange={update}
                      placeholder="Jane Fischer"
                      className={inputClass}
                    />
                  </Field>

                  <Field id="email" label="Email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      disabled={sending}
                      value={form.email}
                      onChange={update}
                      placeholder="you@company.com"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field id="subject" label="Subject">
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    disabled={sending}
                    value={form.subject}
                    onChange={update}
                    placeholder="Copper scrap — 2 x 40ft to Karachi"
                    className={inputClass}
                  />
                </Field>

                <Field
                  id="message"
                  label="Message"
                  hint="Include the grade, the volume and the destination port if you know them."
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    disabled={sending}
                    value={form.message}
                    onChange={update}
                    placeholder="What you're after, how much, and when you need it loaded."
                    className={cn(inputClass, "resize-y")}
                  />
                </Field>

                <div className="flex flex-wrap items-center gap-5">
                  <button
                    type="submit"
                    disabled={sending}
                    className={cn(
                      "group inline-flex items-center gap-3 border px-8 py-4",
                      "font-mono text-[0.75rem] uppercase tracking-[0.16em]",
                      "transition-colors duration-300",
                      "disabled:cursor-not-allowed disabled:opacity-60",
                      "border-ink bg-ink text-bone hover:border-gold hover:bg-gold hover:text-ink"
                    )}
                  >
                    {sending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        Sending
                      </>
                    ) : (
                      <>
                        Send enquiry
                        <ArrowUpRight
                          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </button>

                  {/* Result reported inline and announced, rather than in an
                      alert() the buyer has to dismiss. */}
                  <p aria-live="polite" className="min-h-6">
                    {status === "sent" && (
                      <span className="flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-gold-deep">
                        <Check className="size-4" aria-hidden="true" />
                        Sent — we'll come back to you shortly
                      </span>
                    )}
                    {status === "error" && (
                      <span className="flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-[#B4231F]">
                        <TriangleAlert className="size-4" aria-hidden="true" />
                        Didn't send. Email us at {CONTACT.email}
                      </span>
                    )}
                  </p>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
