import React, { useState } from "react";
import { Link } from "react-router";
import {
  ArrowUpRight,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  Phone,
  Wallet,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "../Components/ui/Reveal.tsx";
import { SpecLabel } from "../Components/ui/Manifest.tsx";
import { CountUp } from "../Components/ui/CountUp.tsx";
import { TEAM, TRACK_RECORD, CONTACT } from "../data/company.ts";
import { cn } from "../lib/utils.ts";

const YARD = [
  { src: "/asuppal/wareabout.jpg", alt: "Goods palletised inside the Mainz warehouse" },
  { src: "/asuppal/wareabput1.jpg", alt: "Stock staged for loading" },
  { src: "/asuppal/ware.jpg", alt: "The warehouse floor at capacity" },
];

const OFFER = [
  {
    icon: Boxes,
    title: "Efficient bulk procurement",
    body: "We buy in the quantities that move the price, so businesses reach bulk rates without carrying the risk of a full container themselves.",
  },
  {
    icon: Clock,
    title: "Timely global delivery",
    body: "Import and export handled on one desk — documentation, freight and customs — so an order lands when we said it would.",
  },
  {
    icon: Wallet,
    title: "Cost-effective distribution",
    body: "Wholesale distribution that keeps the margin between us and you, rather than spread across three intermediaries.",
  },
];

/* ── Yard gallery ─────────────────────────────────────────────── */

function YardGallery() {
  const [index, setIndex] = useState(0);
  const go = (step: number) => setIndex((i) => (i + step + YARD.length) % YARD.length);

  return (
    <div className="relative">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        {YARD.map((shot, i) => (
          <img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            loading={i === 0 ? "eager" : "lazy"}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              i === index ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-slate">
          {String(index + 1).padStart(2, "0")} / {String(YARD.length).padStart(2, "0")}
          <span className="ml-3 text-gold-deep">Mainz warehouse</span>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photograph"
            className="grid size-10 place-items-center border border-bone-line text-ink transition-colors duration-300 hover:border-gold hover:bg-gold"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photograph"
            className="grid size-10 place-items-center border border-bone-line text-ink transition-colors duration-300 hover:border-gold hover:bg-gold"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function AboutUs() {
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
                <li className="text-gold">About Us</li>
              </ol>
            </nav>

            <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.25rem,6vw,4.75rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-bone">
              A trading desk,
              <span className="block text-gold">not a catalogue.</span>
            </h1>

            <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-bone/55">
              A.S. Uppal Trading GmbH buys and sells in bulk out of a warehouse in
              Mainz. We deal in goods we can inspect, price and load ourselves.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Welcome ──────────────────────────────────────────────── */}
      <section className="bg-bone">
        <div className="mx-auto grid max-w-[84rem] gap-14 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">
          <Reveal from="left">
            <SpecLabel tone="light">Who we are</SpecLabel>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,4.4vw,3rem)] font-bold uppercase leading-[0.98] tracking-[-0.015em]">
              Supplier and buyer,
              <span className="block text-gold-deep">on the same desk.</span>
            </h2>
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-slate">
              We are a reliable supplier and purchaser offering a wide range of
              products in bulk. With a strong focus on quality and competitive
              pricing, we serve businesses and individual buyers alike.
            </p>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate">
              Holding our own stock is what makes the difference: we can quote
              firm, load quickly, and tell you what a consignment actually looks
              like before you commit to it.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/categories"
                className="group inline-flex items-center gap-3 border border-ink bg-ink px-7 py-3.5 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-bone transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
              >
                See the catalogue
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border border-ink/20 px-7 py-3.5 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:border-ink"
              >
                Talk to us
              </Link>
            </div>
          </Reveal>

          <Reveal from="right" className="self-start">
            <YardGallery />
          </Reveal>
        </div>
      </section>

      {/* ── What we offer ────────────────────────────────────────── */}
      <section className="border-y border-ink-line bg-ink">
        <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
          <Reveal className="max-w-2xl">
            <SpecLabel>What we offer</SpecLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.015em] text-bone">
              Global sale &amp; bulk purchase
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-px border border-ink-line bg-ink-line md:grid-cols-3">
            {OFFER.map(({ icon: Icon, title, body }) => (
              <RevealItem
                key={title}
                className="group flex flex-col bg-ink p-8 transition-colors duration-500 hover:bg-ink-raised lg:p-10"
              >
                <span className="grid size-12 place-items-center border border-gold/30 text-gold transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-7 font-display text-xl font-bold uppercase tracking-[-0.005em] text-bone">
                  {title}
                </h3>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-bone/50">
                  {body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Track record ─────────────────────────────────────────── */}
      <section className="bg-bone">
        <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
          <Reveal className="max-w-xl">
            <SpecLabel tone="light">Track record</SpecLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.015em]">
              What we've moved
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-slate">
              We've sourced bulk orders of high-quality goods from suppliers across
              the globe, and the inventory keeps widening as demand does.
            </p>
          </Reveal>

          {/* On a trading page the figures are the argument, so they carry
              the display weight rather than sitting in body copy. */}
          <RevealGroup className="mt-14 grid gap-px border border-bone-line bg-bone-line sm:grid-cols-2 lg:grid-cols-4">
            {TRACK_RECORD.map((stat) => (
              <RevealItem key={stat.label} className="bg-white p-8 lg:p-10">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-none tracking-[-0.02em] text-ink"
                />
                <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-gold-deep">
                  {stat.label}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Staff ────────────────────────────────────────────────── */}
      <section className="border-t border-bone-line bg-bone-dim/50">
        <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
          <Reveal className="max-w-2xl">
            <SpecLabel tone="light">Our staff</SpecLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.015em]">
              Who runs the book
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-slate">
              Three people, reachable directly. Call the desk and you get one of them.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((person) => (
              <RevealItem
                as="article"
                key={person.name}
                className="group relative flex h-full flex-col overflow-hidden border border-ink-line bg-ink p-8"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 -top-7 select-none font-display text-[7.5rem] font-bold leading-none text-bone/[0.04] transition-colors duration-500 group-hover:text-gold/10"
                >
                  {person.initials}
                </span>

                <span className="grid size-12 place-items-center border border-gold/40 font-display text-sm font-bold text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                  {person.initials}
                </span>

                <h3 className="mt-7 font-display text-xl font-bold uppercase tracking-[-0.005em] text-bone">
                  {person.name}
                </h3>
                <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
                  {person.role}
                </p>

                <div className="mt-auto space-y-2.5 pt-8">
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center gap-2.5 break-all text-[0.875rem] text-bone/55 transition-colors hover:text-gold"
                  >
                    <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" />
                    {person.email}
                  </a>
                  {"tel" in person && person.tel && (
                    <a
                      href={`tel:${person.tel.replace(/\s/g, "")}`}
                      className="flex items-center gap-2.5 font-mono text-[0.8125rem] tracking-[0.06em] text-bone/55 transition-colors hover:text-gold"
                    >
                      <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" />
                      {person.tel}
                    </a>
                  )}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10">
            <p className="font-mono text-[0.75rem] tracking-[0.06em] text-slate">
              Prefer to write to the desk?{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="border-b border-gold/50 text-ink transition-colors hover:border-gold hover:text-gold-deep"
              >
                {CONTACT.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
