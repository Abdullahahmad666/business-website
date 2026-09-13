import React from "react";
import { Link, useParams } from "react-router";
import { ArrowUpRight, PackageX } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "../Components/ui/Reveal.tsx";
import { SpecLabel } from "../Components/ui/Manifest.tsx";
import { SUBCATEGORIES } from "../data/catalogue.ts";

export default function SubcategoryPage() {
  const { category } = useParams<{ category: string }>();
  // The catalogue is local and synchronous, so read it during render.
  // The old effect-then-setState pass flashed "not found" on every load.
  const entry = category ? SUBCATEGORIES[category] : undefined;

  if (!entry) {
    return (
      <section className="bg-ink">
        <div className="mx-auto flex max-w-[84rem] flex-col items-start px-6 py-24 lg:px-10 lg:py-36">
          <PackageX className="size-10 text-gold" aria-hidden="true" />
          <h1 className="mt-8 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-bone">
            No such class
          </h1>
          <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-bone/55">
            We don't carry a class called &ldquo;{category}&rdquo;. The five we do
            carry are listed in the catalogue.
          </p>
          <Link
            to="/categories"
            className="group mt-9 inline-flex items-center gap-3 border border-gold bg-gold px-7 py-3.5 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:border-gold-lit hover:bg-gold-lit"
          >
            Back to the catalogue
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    );
  }

  const units = entry.subcategories.reduce((n, s) => n + s.count, 0);

  return (
    <>
      {/* -- Masthead -- */}
      <section className="border-b border-ink-line bg-ink">
        <div className="mx-auto max-w-[84rem] px-6 py-16 lg:px-10 lg:py-24">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone/40">
                <li>
                  <Link to="/" className="transition-colors hover:text-gold">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/categories" className="transition-colors hover:text-gold">Collections</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-gold">{entry.title}</li>
              </ol>
            </nav>

            <h1 className="mt-8 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-bone">
              {entry.title}
            </h1>

            <div className="mt-8 flex flex-col gap-8 border-t border-ink-line pt-8 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-xl text-[1.0625rem] leading-relaxed text-bone/55">
                {entry.description}
              </p>
              <dl className="flex flex-wrap gap-x-8 gap-y-5 font-mono sm:gap-x-10 lg:shrink-0 lg:flex-nowrap">
                <div>
                  <dt className="text-[0.625rem] uppercase tracking-[0.2em] text-bone/40">Lines</dt>
                  <dd className="mt-1.5 font-display text-3xl font-bold text-gold">
                    {String(entry.subcategories.length).padStart(2, "0")}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.625rem] uppercase tracking-[0.2em] text-bone/40">Units</dt>
                  <dd className="mt-1.5 font-display text-3xl font-bold text-gold">{units}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -- Lines -- */}
      <section className="bg-bone">
        <div className="mx-auto max-w-[84rem] px-6 py-16 lg:px-10 lg:py-24">
          <Reveal className="mb-10">
            <SpecLabel tone="light">Lines in this class</SpecLabel>
          </Reveal>

          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entry.subcategories.map((line) => (
              <RevealItem as="article" key={line.id} className="h-full">
                <Link
                  to={line.link}
                  className="group flex h-full flex-col border border-bone-line bg-white transition-colors duration-500 hover:border-gold"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                    <img
                      src={line.image}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"
                    />
                    <span className="absolute right-4 top-4 border border-bone/25 bg-ink/60 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-bone backdrop-blur-sm">
                      {line.count} units
                    </span>
                  </div>

                  <div className="flex flex-1 items-center justify-between gap-4 p-5">
                    <h2 className="font-display text-lg font-bold uppercase leading-tight tracking-[-0.005em]">
                      {line.name}
                    </h2>
                    <span
                      aria-hidden="true"
                      className="grid size-9 shrink-0 place-items-center border border-bone-line text-ink transition-colors duration-300 group-hover:border-gold group-hover:bg-gold"
                    >
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
