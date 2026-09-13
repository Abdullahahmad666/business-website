/**
 * Per-route metadata for search results and link previews.
 *
 * The app ships as one HTML document behind a catch-all rewrite, so every
 * route used to serve the homepage's <title>, description and card:
 * /products/copper-scrap pasted into WhatsApp looked exactly like /contact.
 * Crawlers do not run JavaScript, so nothing done at runtime reaches them —
 * the fix has to be static HTML, which tools/prerender.mjs stamps out per
 * route from the table below during the build.
 *
 * Copy is derived from the catalogue rather than retyped, so a product
 * renamed in catalogue.ts is renamed in its search result and on its shared
 * card at the next build. Only the five hand-written entries in STATIC carry
 * prose of their own, and each one mirrors the headline its page renders.
 */

import { BOOK, CONTACT } from "./company.ts";
import { PRODUCTS, SUBCATEGORIES } from "./catalogue.ts";

export const SITE = {
  /**
   * Absolute origin for canonical, og:url and og:image. Crawlers fetch the
   * card over the network from whatever this says, so a host that does not
   * resolve yields a blank preview — update here when a custom domain goes
   * live and every route follows.
   */
  origin: "https://asuppaltrading-website.vercel.app",
  name: "A.S. Uppal Trading GmbH",
  locale: "en_US",
} as const;

/** Typography for one generated card. See tools/og-card.html. */
export type CardCopy = {
  /** Small mono rail along the top left. */
  kicker: string;
  /** The display line, set wide and uppercase. Wraps on its own. */
  headline: string;
  /** Gold mono line directly under the headline. */
  sub: string;
  /** Mono list along the bottom of the plate. */
  line: string;
};

export type RouteMeta = {
  /** Path as the router sees it, always rooted, never trailing-slashed. */
  path: string;
  title: string;
  ogTitle: string;
  description: string;
  imageAlt: string;
  card: CardCopy;
};

/* ── Text fitting ──────────────────────────────────────────────────────────
   Google truncates a description near 160 characters and a title near 60.
   Cutting mid-word looks like a bug, so both clamp on a word boundary. */

const DESCRIPTION_MAX = 158;
const TITLE_MAX = 60;

function tidy(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function clamp(text: string, max: number): string {
  const flat = tidy(text);
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  // Only honour the word boundary if it is not throwing away most of the
  // budget — a single very long word should still be cut at the limit.
  const kept = space > max * 0.6 ? cut.slice(0, space) : cut;
  return kept.replace(/[\s,;:.–—-]+$/, "") + "…";
}

/**
 * "Copper Scrap" -> "Copper Scrap | A.S. Uppal Trading GmbH".
 * The subject is clamped so the suffix always survives; a result that ends
 * "...Trad" identifies nobody.
 */
function pageTitle(subject: string): string {
  const suffix = ` | ${SITE.name}`;
  return clamp(subject, TITLE_MAX - suffix.length) + suffix;
}

/** The catalogue shouts ("USED CARS", "Compressor SCRAP"); titles should not. */
function titleCase(text: string): string {
  return tidy(text)
    .toLowerCase()
    .replace(/(^|[\s/–—-])([a-z])/g, (_, lead: string, ch: string) => lead + ch.toUpperCase());
}

/* ── Card file naming ──────────────────────────────────────────────────── */

/** "/products/copper-scrap" -> "products-copper-scrap"; "/" -> "home". */
export function cardSlug(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return trimmed === "" ? "home" : trimmed.replace(/\//g, "-");
}

/** Root-relative path of a route's card. Absolute URLs are built at stamp time. */
export function cardPath(path: string): string {
  return `/og/${cardSlug(path)}.png`;
}

/**
 * "1 line" / "5 lines" — the oil class holds exactly one and used to say
 * "1 lines". Takes the plural form explicitly because appending "s" turns
 * "class" into "classs".
 */
function plural(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

function altFor(subject: string, detail: string): string {
  return `${subject} — ${detail}. ${SITE.name}, Mainz, Germany.`;
}

/* ── The five pages with prose of their own ───────────────────────────────
   Each description restates the headline and standfirst that page actually
   renders, so a search result is not a surprise when the page opens. */

const STATIC: RouteMeta[] = [
  {
    path: "/",
    title: "A.S. Uppal Trading GmbH | Scrap Metal, Cars, Laptops & Nuts",
    ogTitle: "A.S. Uppal Trading GmbH — Bulk Commodity Trading, Mainz",
    description:
      "A.S. Uppal Trading GmbH trades scrap metal, used cars, laptops, nuts and cooking oil in bulk from Mainz, Germany — sorted, graded and shipped worldwide.",
    imageAlt: altFor(
      "A.S. Uppal Trading GmbH",
      "scrap metal, used cars, laptops, nuts and cooking oil traded in bulk"
    ),
    card: {
      kicker: "Mainz · Germany",
      headline: "A.S. Uppal Trading GmbH",
      sub: "Bulk Commodity Trading",
      line: "Scrap Metal / Used Cars / Laptops / Nuts / Cooking Oil",
    },
  },
  {
    path: "/about",
    title: pageTitle("About — A Trading Desk"),
    ogTitle: "A trading desk, not a catalogue — A.S. Uppal Trading GmbH",
    description:
      "A.S. Uppal Trading GmbH buys and sells in bulk out of a warehouse in Mainz, dealing only in goods we can inspect, price and load ourselves.",
    imageAlt: altFor("About A.S. Uppal Trading GmbH", "a bulk trading desk run out of a warehouse in Mainz"),
    card: {
      kicker: "About Us",
      headline: "A trading desk, not a catalogue",
      sub: "Supplier and buyer, one desk",
      line: "Inspected / Priced / Loaded in house",
    },
  },
  {
    path: "/categories",
    title: pageTitle("Collections — What We Trade"),
    ogTitle: "Collections — Five classes of goods, moved by the container",
    description:
      "Five classes of goods moved in container quantities out of Mainz: scrap metal, nuts, cars, laptops and cooking oil. Open a class to see the lines we carry.",
    imageAlt: altFor("The A.S. Uppal catalogue", "five classes of goods moved in container quantities"),
    card: {
      kicker: "Collections",
      headline: "Five classes, moved by the container",
      sub: `${plural(BOOK.length, "class", "classes")} · ${plural(
        BOOK.reduce((n, c) => n + c.lines, 0),
        "line",
        "lines"
      )}`,
      line: BOOK.map((c) => c.name).join(" / "),
    },
  },
  {
    path: "/contact",
    title: pageTitle("Contact & Quotes"),
    ogTitle: "Request a quote — A.S. Uppal Trading GmbH, Mainz",
    description: `Tell us the grade, volume and destination port and we will quote against it. A.S. Uppal Trading GmbH, ${CONTACT.street}, ${CONTACT.postcode} ${CONTACT.city}.`,
    imageAlt: altFor("Contact A.S. Uppal Trading GmbH", "request a bulk quote by phone, email or WhatsApp"),
    card: {
      kicker: "Contact",
      headline: "Tell us what you need",
      // Not the phone number: the card already carries it along the bottom.
      sub: "Request a quote",
      line: "Grade / Volume / Destination port",
    },
  },
];

/* ── One route per class ──────────────────────────────────────────────────
   BOOK carries the prose (name, blurb, detail) and SUBCATEGORIES carries the
   lines under the class. Both are keyed by the same slug, which is also the
   URL segment, so a class missing from either side simply gets no route
   rather than a card describing something that will not render. */

function categoryRoutes(): RouteMeta[] {
  return BOOK.filter((cls) => SUBCATEGORIES[cls.slug] !== undefined).map((cls) => {
    const entry = SUBCATEGORIES[cls.slug]!;
    const subject = `${cls.name} — Bulk Supply`;
    return {
      path: `/categories/${cls.slug}`,
      title: pageTitle(subject),
      ogTitle: `${cls.name} — ${cls.detail}`,
      description: clamp(`${cls.blurb} ${entry.description}`, DESCRIPTION_MAX),
      imageAlt: altFor(cls.name, cls.detail),
      card: {
        kicker: "Class",
        headline: titleCase(entry.title),
        sub: `${plural(cls.lines, "line", "lines")} · ${plural(cls.listings, "listing", "listings")}`,
        line: entry.subcategories.map((line) => titleCase(line.name)).join(" / "),
      },
    };
  });
}

/* ── One route per product line ─────────────────────────────────────────── */

/** Which class a /products/:slug sits under, read off the catalogue's links. */
function parentIndex(): Map<string, { className: string; count: number }> {
  const index = new Map<string, { className: string; count: number }>();
  for (const cls of BOOK) {
    const entry = SUBCATEGORIES[cls.slug];
    if (!entry) continue;
    for (const line of entry.subcategories) {
      const slug = line.link.replace(/^\/products\//, "");
      index.set(slug, { className: cls.name, count: line.count });
    }
  }
  return index;
}

function productRoutes(): RouteMeta[] {
  const parents = parentIndex();

  return Object.entries(PRODUCTS).flatMap(([slug, products]) => {
    // The page renders products[0]; anything past it is unreachable today, so
    // the card describes exactly what a visitor would land on.
    const product = products[0];
    if (!product) return [];

    const parent = parents.get(slug);
    const name = titleCase(product.name);

    return [
      {
        path: `/products/${slug}`,
        title: pageTitle(parent ? `${name} — ${parent.className}` : name),
        ogTitle: `${name} — ${SITE.name}`,
        description: clamp(product.description, DESCRIPTION_MAX),
        imageAlt: altFor(name, parent ? `${parent.className} traded in bulk` : "traded in bulk"),
        card: {
          kicker: parent ? parent.className : "Catalogue",
          headline: name,
          sub: product.price,
          line: parent ? `${plural(parent.count, "listing", "listings")} on the book` : "On the book",
        },
      },
    ];
  });
}

/**
 * Every route the router answers, in the order they should be crawled.
 * The two :param routes are expanded here — a path absent from this list gets
 * no shell, falls through the rewrite to index.html and inherits the
 * homepage's card, which is the right outcome for a URL we do not recognise.
 */
export const ROUTES: RouteMeta[] = [...STATIC, ...categoryRoutes(), ...productRoutes()];

/** The shell index.html itself is built from, and the fallback for unknown paths. */
export const HOME: RouteMeta = STATIC[0]!;
