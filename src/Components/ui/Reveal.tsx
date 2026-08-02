import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Direction = "up" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 22 },
  left: { x: -22 },
  right: { x: 22 },
  none: {},
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to hold before the element starts moving. */
  delay?: number;
  from?: Direction;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

/**
 * Fades content in once as it scrolls into view. Under
 * `prefers-reduced-motion` the content renders immediately with no transform.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offset[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Parent that releases its `<RevealItem>` children in sequence. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "section";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Tag>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  );
}
