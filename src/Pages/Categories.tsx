import React from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "../Components/ui/Reveal.tsx";
import { SpecLabel } from "../Components/ui/Manifest.tsx";
import { BOOK, TOTAL_LINES, TOTAL_LISTINGS } from "../data/company.ts";
import { cn } from "../lib/utils.ts";


/**
 * The two deepest classes take a wider cell, so the grid reads 2-up then
 * 3-up and the amount of shelf space matches the depth of the book.
 */
function CategoryCard({ item, index }: { item: (typeof BOOK)[number]; index: number }) {
  return (
    <RevealItem
      as="article"
      className={cn("min-w-0 h-full", index < 2 ? "lg:col-span-3" : "lg:col-span-2")}
    >
      <Link
        to={`/categories/${item.slug}`}
        className="group flex h-full flex-col border border-bone-line bg-white transition-colors duration-500 hover:border-gold"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-ink">
          <img
            src={item.image}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
          />

          {/* Line count sits on the image as a stamped figure. */}
          <span className="absolute right-4 top-4 border border-bone/25 bg-ink/60 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-bone backdrop-blur-sm">
            {String(item.lines).padStart(2, "0")} {item.lines === 1 ? "line" : "lines"}
          </span>

          <h2 className="absolute bottom-4 left-5 font-display text-[1.75rem] font-bold uppercase leading-none tracking-[-0.01em] text-bone">
            {item.name}
          </h2>
        </div>

        <div className="flex flex-1 items-start justify-between gap-5 p-5">
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="text-[0.9375rem] leading-relaxed text-slate">{item.blurb}</p>
            <p className="mt-auto pt-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold-deep">
              {item.listings} listings
            </p>
          </div>
          <span
            aria-hidden="true"
            className="mt-0.5 grid size-9 shrink-0 place-items-center border border-bone-line text-ink transition-colors duration-300 group-hover:border-gold group-hover:bg-gold"
          >
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </RevealItem>
  );
}

export default function CategoriesPage() {
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
                <li className="text-gold">Collections</li>
              </ol>
            </nav>

            {/* Floor is 2rem, not 2.5rem: "Collections" is a single
                unbreakable word, and at 2.5rem it is wider than a 360px
                viewport, which scrolls the whole page sideways. */}
            <h1 className="mt-8 font-display text-[clamp(2rem,7vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-bone">
              Collections
            </h1>

            <div className="mt-8 flex flex-col gap-8 border-t border-ink-line pt-8 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-xl text-[1.0625rem] leading-relaxed text-bone/55">
                Five classes of goods, moved in container quantities out of Mainz.
                Open a class to see the lines we carry and what's currently on the book.
              </p>
              {/* Wraps and tightens on narrow screens — the mono labels carry
                  0.2em tracking, so three of them at a fixed gap-10 overflow
                  a 360px viewport. shrink-0 only applies once side by side. */}
              <dl className="flex flex-wrap gap-x-8 gap-y-5 font-mono sm:gap-x-10 lg:shrink-0 lg:flex-nowrap">
                <div>
                  <dt className="text-[0.625rem] uppercase tracking-[0.2em] text-bone/40">
                    Classes
                  </dt>
                  <dd className="mt-1.5 font-display text-3xl font-bold text-gold">
                    {String(BOOK.length).padStart(2, "0")}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.625rem] uppercase tracking-[0.2em] text-bone/40">
                    Lines
                  </dt>
                  <dd className="mt-1.5 font-display text-3xl font-bold text-gold">
                    {TOTAL_LINES}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.625rem] uppercase tracking-[0.2em] text-bone/40">
                    Listings
                  </dt>
                  <dd className="mt-1.5 font-display text-3xl font-bold text-gold">
                    {TOTAL_LISTINGS}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Index ────────────────────────────────────────────────── */}
      <section className="bg-bone">
        <div className="mx-auto max-w-[84rem] px-6 py-16 lg:px-10 lg:py-24">
          <Reveal className="mb-10">
            <SpecLabel tone="light">Index · by depth of book</SpecLabel>
          </Reveal>

          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {BOOK.map((item, i) => (
              <CategoryCard key={item.slug} item={item} index={i} />
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
