import React from "react";
import { Link } from "react-router";
import { cn } from "../../lib/utils.ts";

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 " +
  "font-mono text-[0.75rem] uppercase tracking-[0.16em] " +
  "px-7 py-3.5 rounded-none border " +
  "transition-[background-color,color,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold " +
  "active:translate-y-px disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  /** Struck gold. The one loud control on any given view. */
  gold: "bg-gold border-gold text-ink hover:bg-gold-lit hover:border-gold-lit",
  /** For use on ink backgrounds. */
  outline:
    "bg-transparent border-gold/45 text-gold hover:bg-gold hover:border-gold hover:text-ink",
  /** For use on bone backgrounds. */
  ink: "bg-ink border-ink text-bone hover:bg-transparent hover:text-ink",
  ghost:
    "bg-transparent border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-bone",
} as const;

type Variant = keyof typeof variants;

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

export function Button({
  children,
  variant = "gold",
  className,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

/** Same surface, but navigates. Internal paths route; the rest open normally. */
export function ButtonLink({
  children,
  to,
  variant = "gold",
  className,
  ...rest
}: CommonProps & { to: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(base, variants[variant], className);
  const isInternal = to.startsWith("/");

  if (isInternal) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={to} className={classes} {...rest}>
      {children}
    </a>
  );
}
