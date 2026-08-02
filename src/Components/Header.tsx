import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils.ts";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About Us" },
  { to: "/categories", label: "Categories" },
  { to: "/contact", label: "Contact" },
];

const TEL = "+49 162 9775400";
const EMAIL = "info@asuppaltradinggmbh.com";

function Wordmark({ onDark = true }: { onDark?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3.5" aria-label="A.S. Uppal Trading GmbH — home">
      {/* Monogram struck like a grade stamp on a metal bale. */}
      <span
        className={cn(
          "grid size-11 shrink-0 place-items-center border font-display text-sm font-bold tracking-[0.02em]",
          "transition-colors duration-300",
          onDark
            ? "border-gold/50 text-gold group-hover:border-gold group-hover:bg-gold group-hover:text-ink"
            : "border-ink/25 text-ink group-hover:bg-ink group-hover:text-bone"
        )}
      >
        AS
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.0625rem] font-bold uppercase tracking-[0.01em]",
            onDark ? "text-bone" : "text-ink"
          )}
        >
          A.S. Uppal
        </span>
        <span
          className={cn(
            "mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.3em]",
            onDark ? "text-gold" : "text-gold-deep"
          )}
        >
          Trading GmbH
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { pathname } = useLocation();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Close the mobile sheet whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Lock the page behind the open sheet, and let Escape dismiss it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ── Utility strip: where the firm is, and how to reach it.
             Retracts on scroll to give the page back its height. ── */}
      <div
        className={cn(
          "hidden overflow-hidden border-b border-ink-line bg-ink-raised md:block",
          "transition-[height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled ? "h-0 opacity-0" : "h-9 opacity-100"
        )}
      >
        <div className="mx-auto flex h-9 max-w-[84rem] items-center justify-between px-6 lg:px-10">
          <span className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-slate">
            <MapPin className="size-3.5 text-gold" aria-hidden="true" />
            Obere Zahlbacher Str. 56 · 55131 Mainz · Germany
          </span>
          <div className="flex items-center gap-7 font-mono text-[0.6875rem] tracking-[0.14em] text-slate">
            <a
              href={`tel:${TEL.replace(/\s/g, "")}`}
              className="flex items-center gap-2 transition-colors hover:text-gold"
            >
              <Phone className="size-3.5 text-gold" aria-hidden="true" />
              {TEL}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 transition-colors hover:text-gold"
            >
              <Mail className="size-3.5 text-gold" aria-hidden="true" />
              {EMAIL}
            </a>
          </div>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div
        className={cn(
          "border-b transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border-gold/25 bg-ink/92 backdrop-blur-xl"
            : "border-ink-line bg-ink"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[84rem] items-center justify-between px-6 lg:px-10",
            "transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled ? "h-[4.25rem]" : "h-20"
          )}
        >
          <Wordmark />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end} className="group relative block px-5 py-2.5">
                    {({ isActive }) => (
                      <>
                        <span
                          className={cn(
                            "font-mono text-[0.75rem] uppercase tracking-[0.16em] transition-colors duration-300",
                            isActive ? "text-gold" : "text-bone/65 group-hover:text-bone"
                          )}
                        >
                          {item.label}
                        </span>
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-x-3 -bottom-px h-px bg-gold"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        {!isActive && (
                          <span className="absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-bone/30 transition-transform duration-300 group-hover:scale-x-100" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className={cn(
                "hidden items-center gap-2 border border-gold bg-gold px-6 py-3 sm:inline-flex",
                "font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink",
                "transition-colors duration-300 hover:bg-gold-lit hover:border-gold-lit"
              )}
            >
              Request a quote
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center border border-ink-line text-bone transition-colors hover:border-gold hover:text-gold lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile sheet ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-20 items-center justify-between border-b border-ink-line px-6">
              <Wordmark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-11 place-items-center border border-ink-line text-bone transition-colors hover:border-gold hover:text-gold"
                aria-label="Close menu"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="px-6 pt-6">
              <ul>
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-ink-line"
                  >
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        cn(
                          "flex items-baseline justify-between py-5 font-display text-2xl font-bold uppercase transition-colors",
                          isActive ? "text-gold" : "text-bone hover:text-gold"
                        )
                      }
                    >
                      {item.label}
                      <ArrowUpRight className="size-5 self-center opacity-40" aria-hidden="true" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.5 }}
                className="mt-10 space-y-4 font-mono text-[0.75rem] tracking-[0.1em] text-slate"
              >
                <a href={`tel:${TEL.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-gold">
                  <Phone className="size-4 text-gold" aria-hidden="true" />
                  {TEL}
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 break-all hover:text-gold">
                  <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" />
                  {EMAIL}
                </a>
                <p className="flex items-start gap-3">
                  <MapPin className="size-4 shrink-0 text-gold" aria-hidden="true" />
                  Obere Zahlbacher Str. 56
                  <br />
                  55131 Mainz, Germany
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
