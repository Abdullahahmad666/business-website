// ProductDetailPage.tsx
import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight, MessageCircle, PackageX } from "lucide-react";
import { Reveal } from "../Components/ui/Reveal.tsx";
import { SpecLabel } from "../Components/ui/Manifest.tsx";
import { CONTACT } from "../data/company.ts";
import { cn } from "../lib/utils.ts";
import { PRODUCTS } from "../data/catalogue.ts";

/** Main plate plus thumbnails. Handles single-image lines gracefully. */
function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const shots = images.filter(Boolean);
  const [index, setIndex] = useState(0);
  const go = (step: number) => setIndex((i) => (i + step + shots.length) % shots.length);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden border border-bone-line bg-ink">
        {shots.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === index ? name : ""}
            aria-hidden={i !== index}
            loading={i === 0 ? "eager" : "lazy"}
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              i === index ? "opacity-100" : "opacity-0"
            )}
          />
        ))}

        {shots.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center border border-bone/25 bg-ink/70 text-bone backdrop-blur transition-colors hover:border-gold hover:bg-gold hover:text-ink"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center border border-bone/25 bg-ink/70 text-bone backdrop-blur transition-colors hover:border-gold hover:bg-gold hover:text-ink"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {shots.length > 1 && (
        <div className="mt-4 flex gap-3">
          {shots.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "relative size-20 shrink-0 overflow-hidden border transition-colors duration-300",
                i === index ? "border-gold" : "border-bone-line hover:border-ink/40"
              )}
            >
              <img src={src} alt="" loading="lazy" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  const { subcategory } = useParams<{ subcategory: string }>();
  // Local, synchronous data - read during render rather than via an effect,
  // which previously flashed the not-found state on every load.
  const product = subcategory ? PRODUCTS[subcategory]?.[0] : undefined;

  if (!product) {
    return (
      <section className="bg-ink">
        <div className="mx-auto flex max-w-[84rem] flex-col items-start px-6 py-24 lg:px-10 lg:py-36">
          <PackageX className="size-10 text-gold" aria-hidden="true" />
          <h1 className="mt-8 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-bone">
            Line not found
          </h1>
          <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-bone/55">
            We have no line called &ldquo;{subcategory}&rdquo; on the book right now.
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

  const specs = Object.entries(product.specifications);
  const enquiry = `Enquiry: ${product.name}`;

  return (
    <>
      {/* -- Masthead -- */}
      <section className="border-b border-ink-line bg-ink">
        <div className="mx-auto max-w-[84rem] px-6 py-12 lg:px-10 lg:py-16">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone/40">
                <li><Link to="/" className="transition-colors hover:text-gold">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link to="/categories" className="transition-colors hover:text-gold">Collections</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-gold">{product.name}</li>
              </ol>
            </nav>
            <h1 className="mt-7 font-display text-[clamp(2rem,5.5vw,4.25rem)] font-bold uppercase leading-[0.92] tracking-[-0.02em] text-bone">
              {product.name}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* -- Plate -- */}
      <section className="bg-bone">
        <div className="mx-auto grid max-w-[84rem] gap-12 px-6 py-14 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
          <Reveal from="left">
            <ProductGallery images={product.images} name={product.name} />
          </Reveal>

          <Reveal from="right">
            <SpecLabel tone="light">Line detail</SpecLabel>

            <p className="mt-6 text-[1.0625rem] leading-relaxed text-slate">
              {product.description}
            </p>

            {/* Price is quoted, not listed - say so plainly. */}
            <div className="mt-8 border border-bone-line bg-white p-6">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-gold-deep">
                Indicative pricing
              </p>
              <p className="mt-2 font-display text-2xl font-bold uppercase tracking-[-0.01em]">
                {product.price}
              </p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-slate">
                Final price depends on grade, volume and destination port.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 border border-ink bg-ink px-7 py-3.5 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-bone transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
              >
                Request a quote
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
              <a
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent(enquiry)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-ink/20 px-7 py-3.5 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:border-ink"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Ask on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -- Specification plate. A buyer decides from this table, so it
             carries the manifest treatment rather than sitting in prose. -- */}
      <section className="border-t border-bone-line bg-bone-dim/50">
        <div className="mx-auto max-w-[84rem] px-6 py-16 lg:px-10 lg:py-24">
          <Reveal className="max-w-2xl">
            <SpecLabel tone="light">Specification</SpecLabel>
            <h2 className="mt-6 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold uppercase leading-[0.98] tracking-[-0.015em]">
              What you are buying
            </h2>
          </Reveal>

          <Reveal className="mt-10">
            <dl className="grid gap-px border border-bone-line bg-bone-line sm:grid-cols-2">
              {specs.map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col gap-1.5 bg-white p-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold-deep">
                    {key}
                  </dt>
                  <dd className="font-mono text-[0.9375rem] text-ink sm:text-right">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="mt-10">
            <p className="font-mono text-[0.75rem] leading-relaxed tracking-[0.04em] text-slate">
              Need a grade or volume that is not listed?{" "}
              <a
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(enquiry)}`}
                className="border-b border-gold/50 text-ink transition-colors hover:border-gold hover:text-gold-deep"
              >
                Write to the desk
              </a>{" "}
              and we will tell you what we can source.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
