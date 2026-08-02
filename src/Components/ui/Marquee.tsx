import React from "react";

/**
 * Signature element — the commodity band.
 *
 * A trading house's identity is the list of what it moves, so the list itself
 * runs across the page in the display face, the way a name runs along a
 * container flank. Pauses on hover; holds still under reduced motion.
 */
export function Marquee({ items }: { items: string[] }) {
  const run = [...items, ...items];

  return (
    <div className="marquee relative overflow-hidden border-y border-ink-line bg-ink py-7">
      {/* Fade the band into the page edges rather than cutting it off. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-ink via-ink/80 to-transparent sm:w-56"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-ink via-ink/80 to-transparent sm:w-56"
      />

      <ul className="marquee-track flex w-max items-center gap-10 sm:gap-14">
        {run.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= items.length}
            className="flex shrink-0 items-center gap-10 sm:gap-14"
          >
            <span className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold uppercase leading-none tracking-[-0.01em] text-bone/85">
              {item}
            </span>
            <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-gold" />
          </li>
        ))}
      </ul>
    </div>
  );
}
