import React from "react";
import { Link, NavLink } from "react-router";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "./ui/Reveal.tsx";
import { SpecLabel } from "./ui/Manifest.tsx";
import { BOOK, CONTACT } from "../data/company.ts";
import { cn } from "../lib/utils.ts";


const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About Us" },
  { to: "/categories", label: "Categories" },
  { to: "/contact", label: "Contact" },
];


function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-6 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
      {children}
    </h3>
  );
}

const linkBase =
  "group inline-flex items-center gap-2 text-[0.9375rem] text-bone/60 transition-colors duration-300 hover:text-bone";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      {/* ── Closing call to action ───────────────────────────────── */}
      <div className="border-b border-ink-line">
        <div className="mx-auto max-w-[84rem] px-6 py-16 lg:px-10 lg:py-20">
          <Reveal className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <SpecLabel>Enquiries · Mainz, DE</SpecLabel>
              <p className="mt-6 font-display text-[clamp(1.75rem,4vw,3rem)] font-bold uppercase leading-[0.98] tracking-[-0.01em]">
                Send us a specification.
                <span className="block text-gold">We'll quote it.</span>
              </p>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-bone/55">
                Tell us the grade, the volume and the destination port. You'll get a
                price and a loading window back — not a brochure.
              </p>
            </div>

            <Link
              to="/contact"
              className={cn(
                "group inline-flex shrink-0 items-center gap-3 border border-gold bg-gold px-8 py-4",
                "font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ink",
                "transition-colors duration-300 hover:border-gold-lit hover:bg-gold-lit"
              )}
            >
              Request a quote
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* ── Colophon ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[84rem] px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-3.5">
              <span className="grid size-11 shrink-0 place-items-center border border-gold/50 font-display text-sm font-bold text-gold">
                AS
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.0625rem] font-bold uppercase">
                  A.S. Uppal
                </span>
                <span className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.3em] text-gold">
                  Trading GmbH
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-bone/55">
              A Mainz-based trading house moving scrap metal, vehicles, laptops and
              produce between Europe, the Gulf and South Asia.
            </p>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <ColumnHeading>Navigate</ColumnHeading>
            <ul className="space-y-3.5">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(linkBase, isActive && "text-gold hover:text-gold")
                    }
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4"
                    />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Catalogue */}
          <div>
            <ColumnHeading>What we trade</ColumnHeading>
            <ul className="space-y-3.5">
              {BOOK.map((item) => (
                <li key={item.slug}>
                  <Link to={`/categories/${item.slug}`} className={cn(linkBase, "justify-between w-full")}>
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4"
                      />
                      {item.name}
                    </span>
                    <span className="font-mono text-[0.6875rem] text-bone/30">
                      {String(item.lines).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach */}
          <div>
            <ColumnHeading>Reach us</ColumnHeading>
            <address className="space-y-4 not-italic">
              <a
                href={`tel:${CONTACT.tel.replace(/\s/g, "")}`}
                className="flex items-center gap-3 font-mono text-[0.875rem] tracking-[0.06em] text-bone/70 transition-colors hover:text-gold"
              >
                <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" />
                {CONTACT.tel}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-start gap-3 break-all text-[0.9375rem] text-bone/70 transition-colors hover:text-gold"
              >
                <Mail className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                {CONTACT.email}
              </a>
              <p className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-bone/55">
                <MapPin className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  Obere Zahlbacher Str. 56
                  <br />
                  55131 Mainz, Germany
                </span>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* ── Legal ────────────────────────────────────────────────── */}
      <div className="border-t border-ink-line">
        <div className="mx-auto flex max-w-[84rem] flex-col-reverse items-start gap-4 px-6 py-7 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-bone/35 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© {year} A.S. Uppal Trading GmbH</p>
          <p>Registered in Mainz · Rheinland-Pfalz · Germany</p>
        </div>
      </div>

      {/* ── Signature: the company name stencilled across the base,
             cropped by the viewport the way it would be on a container
             flank. Purely typographic, no image weight. ───────────── */}
      <div aria-hidden="true" className="pointer-events-none select-none px-6 pb-2 lg:px-10">
        <p className="font-display text-[16vw] font-bold uppercase leading-[0.78] tracking-[-0.02em] text-bone/[0.035]">
          Uppal Trading
        </p>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-6 left-6 z-40 grid size-11 place-items-center",
          "border border-gold/40 bg-ink/85 text-gold backdrop-blur",
          "transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
        )}
        aria-label="Back to top"
      >
        <ArrowUp className="size-4" aria-hidden="true" />
      </button>
    </footer>
  );
}
