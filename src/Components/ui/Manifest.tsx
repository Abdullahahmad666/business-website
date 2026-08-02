import React from "react";
import { cn } from "../../lib/utils.ts";

/**
 * The manifest label — a mono spec line sitting on a short gold rule.
 *
 * It always carries real trade information (commodity class, HS code,
 * port, tonnage), never an ornamental section number. On a trading
 * house's site the specification *is* the decoration.
 */
export function SpecLabel({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.22em] uppercase",
        tone === "dark" ? "text-gold" : "text-gold-deep",
        className
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      {children}
    </span>
  );
}

/**
 * Section heading in Archivo Expanded. `lead` is the quiet first line,
 * `children` the emphatic second — the pairing gives the type scale
 * somewhere to breathe without needing a huge font size.
 */
export function SectionTitle({
  children,
  lead,
  tone = "light",
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  lead?: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-display uppercase leading-[0.95] tracking-[-0.01em]",
        "text-[clamp(1.9rem,4.4vw,3.25rem)]",
        tone === "dark" ? "text-bone" : "text-ink",
        className
      )}
    >
      {lead && (
        <span className="block font-normal opacity-45">{lead}</span>
      )}
      <span className="block font-bold">{children}</span>
    </Tag>
  );
}

/** Hairline divider tuned for each background. */
export function Rule({
  tone = "light",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <hr
      className={cn(
        "border-0 h-px w-full",
        tone === "dark" ? "bg-ink-line" : "bg-bone-line",
        className
      )}
    />
  );
}
