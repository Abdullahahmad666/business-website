import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote as QuoteMark } from "lucide-react";
import type { Testimonial } from "../../data/company.ts";
import { cn } from "../../lib/utils.ts";

const INTERVAL_MS = 7000;
const EASE = [0.16, 1, 0.3, 1] as const;

/** Slides travel with the direction of travel: next enters from the right. */
const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? 64 : -64, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -64 : 64, opacity: 0 }),
};

function Quote({ item }: { item: Testimonial }) {
  return (
    <blockquote className="text-center">
      <p className="text-[clamp(1.25rem,2.6vw,1.75rem)] leading-[1.45] text-bone">
        &ldquo;{item.quote}&rdquo;
      </p>
      <footer className="mt-8">
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold">
          {item.name}
        </p>
        <p className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone/40">
          {item.company}
        </p>
      </footer>
    </blockquote>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  const reduce = useReducedMotion();
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  const go = useCallback(
    (dir: number) => setState(([i]) => [(i + dir + count) % count, dir]),
    [count]
  );
  const jumpTo = (next: number) =>
    setState(([i]) => [next, next > i ? 1 : -1]);

  // Auto-advance, unless the reader is hovering, focused inside, or has asked
  // for reduced motion. Restarting on `index` keeps each slide's dwell equal.
  const tick = useRef(go);
  tick.current = go;
  useEffect(() => {
    if (paused || reduce || count < 2) return;
    const id = window.setInterval(() => tick.current(1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, count, index]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
  };

  const active = items[index];
  if (!active) return null;

  return (
    <div
      className="mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={onKeyDown}
      role="group"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <QuoteMark className="mx-auto size-8 text-gold" aria-hidden="true" />

      <div className="relative mt-8">
        {/* Invisible stack of every quote, grid-collapsed into one cell. It
            reserves the height of the longest so switching slides can't make
            the section jump. */}
        <div aria-hidden="true" className="invisible grid">
          {items.map((item) => (
            <div key={item.id} className="col-start-1 row-start-1">
              <Quote item={item} />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-start justify-center">
          {reduce ? (
            <Quote item={active} />
          ) : (
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={active.id}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: EASE }}
                className="w-full"
              >
                <Quote item={active} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Announce changes without moving focus. */}
      <p className="sr-only" aria-live="polite">
        Testimonial {index + 1} of {count}: {active.quote} — {active.name}, {active.company}
      </p>

      {count > 1 && (
        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid size-10 shrink-0 place-items-center border border-bone/20 text-bone transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>

          {/* Each tab is a countdown bar; the active one fills over the dwell
              so the auto-advance is visible rather than surprising. */}
          <div className="flex items-center gap-2.5">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className="group relative h-1 w-10 overflow-hidden bg-bone/15 transition-colors hover:bg-bone/30"
              >
                {i === index && (
                  <motion.span
                    key={reduce || paused ? "static" : `run-${index}`}
                    className="absolute inset-y-0 left-0 bg-gold"
                    initial={{ width: reduce || paused ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: reduce || paused ? 0 : INTERVAL_MS / 1000,
                      ease: "linear",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className={cn(
              "grid size-10 shrink-0 place-items-center border border-bone/20 text-bone",
              "transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
            )}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
