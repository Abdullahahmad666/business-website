import React, { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Mail,
  Phone,
  Search,
  Ship,
  Truck,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "../Components/ui/Reveal.tsx";
import { Marquee } from "../Components/ui/Marquee.tsx";
import { Testimonials } from "../Components/ui/Testimonials.tsx";
import { SpecLabel } from "../Components/ui/Manifest.tsx";
import { BOOK, COMMODITIES, CONTACT, TEAM, TESTIMONIALS } from "../data/company.ts";
import { cn } from "../lib/utils.ts";

const SERVICES = [
  {
    icon: Boxes,
    title: "Bulk purchasing",
    body: "We buy in container quantities from vetted suppliers, so the price you get reflects the volume we move rather than a middleman's margin.",
  },
  {
    icon: Ship,
    title: "Import & export",
    body: "Documentation, freight booking and customs handled end to end between Europe, the Gulf and South Asia.",
  },
  {
    icon: Truck,
    title: "Wholesale distribution",
    body: "Stock broken down and delivered to retailers and processors at wholesale pricing.",
  },
  {
    icon: Search,
    title: "Sourcing & research",
    body: "Tell us the specification you need and we'll find who has it, what it costs and how quickly it can load.",
  },
];

const FEATURED = [
  {
    name: "Motor Scrap",
    image: "/asuppal/motorscrap.jpg",
    to: "/products/motor-scrap",
    body: "Electric motors bought by the tonne for copper recovery and remanufacture.",
  },
  {
    name: "Walnuts",
    image: "/asuppal/walnut.jpg",
    to: "/products/walnuts",
    body: "In-shell and kernel walnuts, graded and packed for export.",
  },
  {
    name: "Laptops",
    image: "/asuppal/usedlap.jpg",
    to: "/products/used-laptops",
    body: "Working stock and scrap units for refurbishment or component recovery.",
  },
];

const MISSION_IMAGES = [
  { src: "/asuppal/usedcar.jpg", alt: "Used cars ready for export" },
  { src: "/asuppal/alumland.jpg", alt: "Baled aluminium scrap" },
  { src: "/asuppal/walnut.jpg", alt: "Walnuts graded for packing" },
  { src: "/asuppal/oilland.jpg", alt: "Cooking oil in bulk containers" },
];

/* ── Hero ─────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img
        src="/asuppal/scrapabout.jpg"
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-ink via-ink/85 to-ink/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="mx-auto max-w-[84rem] px-6 pb-14 pt-20 lg:px-10 lg:pb-20 lg:pt-28">
        <Reveal>
          <SpecLabel>A.S. Uppal Trading GmbH · Mainz, DE</SpecLabel>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-8 max-w-[70rem] font-display text-[clamp(2.25rem,6vw,5rem)] font-bold uppercase leading-[0.9] tracking-[-0.025em] text-bone">
            Metal, machines and produce —
            <span className="block text-gold">moved by the container.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-9 max-w-xl text-[1.125rem] leading-relaxed text-bone/60">
            We buy and sell scrap metal, vehicles, laptops and produce in bulk,
            shipping out of Germany to buyers across the Gulf and South Asia.
            Send a specification and we'll quote against it.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 border border-gold bg-gold px-8 py-4 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:border-gold-lit hover:bg-gold-lit"
            >
              Request a quote
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              to="/categories"
              className="group inline-flex items-center gap-3 border border-bone/25 px-8 py-4 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-bone transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-ink"
            >
              See what we carry
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Manifest strip — the whole book in one line, and a way in. */}
      <Reveal delay={0.3} className="relative border-t border-ink-line/80 bg-ink/50 backdrop-blur-sm">
        <ul className="mx-auto grid max-w-[84rem] grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {BOOK.map((entry) => (
            <li key={entry.slug} className="border-b border-r border-ink-line/80 last:border-r-0">
              <Link
                to={`/categories/${entry.slug}`}
                className="group flex h-full flex-col justify-between gap-6 p-5 transition-colors duration-300 hover:bg-gold/10 lg:p-6"
              >
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-bone/35">
                  {String(entry.lines).padStart(2, "0")}{" "}
                  {entry.lines === 1 ? "line" : "lines"}
                </span>
                <span className="flex items-end justify-between gap-3">
                  <span className="font-display text-xl font-bold uppercase text-bone transition-colors group-hover:text-gold">
                    {entry.name}
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-bone/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ── The book ─────────────────────────────────────────────────── */

function TheBook() {
  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SpecLabel tone="light">The book · 15 lines</SpecLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.015em]">
              What we trade
            </h2>
          </div>
          <Link
            to="/categories"
            className="group inline-flex shrink-0 items-center gap-2.5 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ink"
          >
            <span className="border-b border-ink/25 pb-1 transition-colors group-hover:border-gold group-hover:text-gold-deep">
              Full catalogue
            </span>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </Reveal>

        {/* Read as a ledger: class, what sits under it, depth, units. */}
        <RevealGroup as="ul" className="mt-12 border-t border-bone-line">
          {BOOK.map((entry) => (
            <RevealItem as="li" key={entry.slug} className="border-b border-bone-line">
              <Link
                to={`/categories/${entry.slug}`}
                className="group grid grid-cols-1 items-center gap-3 py-6 transition-colors duration-300 sm:grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[14rem_minmax(0,1fr)_7rem_auto] md:gap-8"
              >
                <span className="font-display text-[1.75rem] font-bold uppercase leading-none tracking-[-0.01em] transition-colors duration-300 group-hover:text-gold-deep">
                  {entry.name}
                </span>
                <span className="font-mono text-[0.8125rem] tracking-[0.04em] text-slate">
                  {entry.detail}
                </span>
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold-deep md:text-right">
                  {entry.listings} units
                </span>
                <span
                  aria-hidden="true"
                  className="hidden size-9 place-items-center border border-bone-line transition-colors duration-300 group-hover:border-gold group-hover:bg-gold md:grid"
                >
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── Capabilities ─────────────────────────────────────────────── */

function Capabilities() {
  return (
    <section className="border-y border-ink-line bg-ink">
      <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
        <Reveal className="max-w-2xl">
          <SpecLabel>What we do</SpecLabel>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.015em] text-bone">
            Four things, done properly
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-bone/55">
            We are a supplier and a buyer on the same desk. That means one point of
            contact from the first enquiry to the loaded container.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-px border border-ink-line bg-ink-line sm:grid-cols-2">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <RevealItem key={title} className="group bg-ink p-8 transition-colors duration-500 hover:bg-ink-raised lg:p-10">
              <span className="grid size-12 place-items-center border border-gold/30 text-gold transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-7 font-display text-xl font-bold uppercase tracking-[-0.005em] text-bone">
                {title}
              </h3>
              <p className="mt-3.5 max-w-md text-[0.9375rem] leading-relaxed text-bone/50">
                {body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── Mission ──────────────────────────────────────────────────── */

function Mission() {
  return (
    <section className="bg-bone">
      <div className="mx-auto grid max-w-[84rem] gap-14 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">
        <Reveal from="left">
          <SpecLabel tone="light">Our mission</SpecLabel>
          <h2 className="mt-6 font-display text-[clamp(1.9rem,4.4vw,3rem)] font-bold uppercase leading-[0.98] tracking-[-0.015em]">
            Reliable bulk supply,
            <span className="block text-gold-deep">without the runaround.</span>
          </h2>
          <p className="mt-7 text-[1.0625rem] leading-relaxed text-slate">
            A.S. Uppal Trading GmbH gives businesses dependable access to
            high-quality goods in bulk, sourced from suppliers we have actually
            worked with. We compete on price, on loading times and on answering
            the phone — not on promises.
          </p>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate">
            Our aim is to be the partner you call when a shipment has to be right
            the first time.
          </p>
          <Link
            to="/about"
            className="group mt-9 inline-flex items-center gap-3 border border-ink px-7 py-3.5 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-ink hover:text-bone"
          >
            More about the firm
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>

        {/* lg:pb-8 reserves the room the staggered column drops into. */}
        <Reveal from="right" className="grid grid-cols-2 gap-4 self-start lg:pb-8">
          {MISSION_IMAGES.map((img, i) => (
            <div
              key={img.src}
              className={cn(
                "overflow-hidden bg-ink",
                // Offset the second column so the block reads as a stack rather
                // than a grid. Only from lg up: at narrow widths the two images
                // sit side by side in one glance and the drop just looks broken.
                i % 2 === 1 && "lg:translate-y-8"
              )}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="aspect-[4/5] size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── Featured lines ───────────────────────────────────────────── */

function Featured() {
  return (
    <section className="border-t border-bone-line bg-bone-dim/50">
      <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
        <Reveal className="max-w-2xl">
          <SpecLabel tone="light">Moving now</SpecLabel>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.015em]">
            Lines on the move
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {FEATURED.map((item) => (
            <RevealItem as="article" key={item.name} className="h-full">
              <Link
                to={item.to}
                className="group flex h-full flex-col border border-bone-line bg-white transition-colors duration-500 hover:border-gold"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold uppercase tracking-[-0.005em]">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">
                    {item.body}
                  </p>
                  <span className="mt-auto flex items-center gap-2 pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold-deep">
                    View line
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── Team ─────────────────────────────────────────────────────── */

function Team() {
  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
        <Reveal className="max-w-2xl">
          <SpecLabel tone="light">Who you deal with</SpecLabel>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.015em]">
            The desk
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-slate">
            Three people run the book. You'll be speaking to one of them, not a
            call centre.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((person) => (
            <RevealItem
              as="article"
              key={person.name}
              className="group relative flex h-full flex-col overflow-hidden border border-ink-line bg-ink p-8"
            >
              {/* Initials set oversized and low-contrast, so the card has a
                  face without pretending to have a photograph. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-7 select-none font-display text-[7.5rem] font-bold leading-none text-bone/[0.045] transition-colors duration-500 group-hover:text-gold/10"
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
                {person.tel && (
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
      </div>
    </section>
  );
}

/* ── Testimonial ──────────────────────────────────────────────── */

function Testimonial() {
  return (
    <section className="border-y border-ink-line bg-ink">
      <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-24">
        <Reveal>
          <Testimonials items={TESTIMONIALS} />
        </Reveal>
      </div>
    </section>
  );
}

/* ── Newsletter ───────────────────────────────────────────────── */

function Newsletter() {
  const [email, setEmail] = useState("");

  /**
   * There's no mailing-list backend, so the form opens a pre-addressed
   * message rather than pretending to subscribe anyone.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Add me to the trade list");
    const body = encodeURIComponent(`Please add ${email} to your trade updates.`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-[84rem] px-6 py-16 lg:px-10 lg:py-20">
        <Reveal className="flex flex-col gap-8 border border-bone-line bg-white p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div className="max-w-lg">
            <SpecLabel tone="light">Trade list</SpecLabel>
            <h2 className="mt-5 font-display text-[clamp(1.5rem,3vw,2rem)] font-bold uppercase leading-tight tracking-[-0.01em]">
              Get new lines as they land
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">
              Occasional notes on what we've bought and what's available. No more
              than one a month.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-0">
            <label htmlFor="trade-list-email" className="sr-only">
              Email address
            </label>
            <input
              id="trade-list-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="min-w-0 flex-1 border border-bone-line bg-bone px-5 py-4 font-mono text-[0.8125rem] text-ink placeholder:text-slate/60 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="group shrink-0 border border-ink bg-ink px-6 py-4 text-bone transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
            >
              <span className="sr-only">Join the trade list</span>
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ── WhatsApp ─────────────────────────────────────────────────── */

function WhatsAppButton() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-ink/25 transition-transform duration-300 hover:scale-105"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-7" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={COMMODITIES} />
      <TheBook />
      <Capabilities />
      <Mission />
      <Featured />
      <Team />
      <Testimonial />
      <Newsletter />
      <WhatsAppButton />
    </>
  );
}
