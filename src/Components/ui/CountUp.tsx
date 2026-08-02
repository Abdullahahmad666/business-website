import React, { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { cn } from "../../lib/utils.ts";

/**
 * Counts from zero up to `value` the first time it scrolls into view.
 *
 * Eases out hard, so the number sprints early and settles onto its final
 * figure rather than crawling the last stretch at a constant rate.
 *
 * The animating digits are hidden from assistive tech — a rapidly changing
 * number is noise in a screen reader — and the settled figure is exposed once,
 * statically, instead.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1.8,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const count = useMotionValue(0);
  const display = useTransform(count, (n) => Math.round(n).toLocaleString("en-GB"));

  useEffect(() => {
    if (!inView) return;

    // Reduced motion: land on the figure without the run-up.
    if (reduce) {
      count.set(value);
      return;
    }

    const controls = animate(count, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration, count]);

  return (
    <p ref={ref} className={cn("tabular-nums", className)}>
      <span aria-hidden="true">
        <motion.span>{display}</motion.span>
        {suffix}
      </span>
      <span className="sr-only">
        {value.toLocaleString("en-GB")}
        {suffix}
      </span>
    </p>
  );
}
