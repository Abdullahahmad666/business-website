/**
 * Single source of truth for company facts.
 *
 * These figures were previously duplicated across Home, About Us, Categories
 * and the Footer, and had already drifted apart — the two pages disagreed on
 * who held which title. Everything reads from here now so it can't happen again.
 */

export const CONTACT = {
  tel: "+49 162 9775400",
  email: "info@asuppaltradinggmbh.com",
  whatsapp: "https://wa.me/491629775400",
  street: "Obere Zahlbacher Str. 56",
  postcode: "55131",
  city: "Mainz",
  country: "Germany",
} as const;

export type TeamMember = {
  name: string;
  initials: string;
  role: string;
  email: string;
  /** Only listed for the people who take calls directly. */
  tel?: string;
};

/**
 * Roles follow the company's own contact-card artwork in /public/asuppal,
 * which lists Sohaib Uppal as CEO. The old About Us page contradicted this.
 */
export const TEAM: TeamMember[] = [
  {
    name: "Sohaib Uppal",
    initials: "SU",
    role: "Chief Executive Officer",
    email: "sohaibuppal65@gmail.com",
    tel: "+49 162 9775400",
  },
  {
    name: "Muhammad Essa",
    initials: "ME",
    role: "Chairman",
    email: "muhammadessa1992@gmail.com",
  },
  {
    name: "Shahbaz Ahmad",
    initials: "SA",
    role: "Project Manager",
    email: "info@asuppal.com",
  },
];

/**
 * The catalogue, ordered by depth of book. `lines` counts the product lines
 * under a class; `listings` totals the units across them.
 */
export const BOOK = [
  {
    name: "Scrap",
    slug: "scrap",
    lines: 5,
    listings: 38,
    image: "/asuppal/scrapcategory.jpg",
    detail: "Motor · Copper · Iron · Compressor · Aluminium",
    blurb: "Motor, copper, iron, compressor and aluminium scrap — sorted and baled by grade.",
  },
  {
    name: "Nuts",
    slug: "nuts",
    lines: 4,
    listings: 14,
    image: "/asuppal/nutscategory.jpg",
    detail: "Almonds · Walnuts · Pistachios · Peanuts",
    blurb: "Almonds, walnuts, pistachios and peanuts, packed for export.",
  },
  {
    name: "Cars",
    slug: "cars",
    lines: 3,
    listings: 31,
    image: "/asuppal/carcategory.jpg",
    detail: "Used · Accidental · Construction trucks",
    blurb: "Used cars, accidental units and construction trucks.",
  },
  {
    name: "Laptop",
    slug: "laptop",
    lines: 2,
    listings: 30,
    image: "/asuppal/laptopcategory.jpg",
    detail: "Working stock · Laptop scrap",
    blurb: "Working stock and laptop scrap, graded and pallet-packed.",
  },
  {
    name: "Oil",
    slug: "oil",
    lines: 1,
    listings: 7,
    image: "/asuppal/oilcategory.jpg",
    detail: "Cooking oil, drum and bulk",
    blurb: "Cooking oil in drum and bulk quantities.",
  },
] as const;

export const TOTAL_LINES = BOOK.reduce((n, c) => n + c.lines, 0);
export const TOTAL_LISTINGS = BOOK.reduce((n, c) => n + c.listings, 0);

/** Named for the marquee — what actually moves through the yard. */
export const COMMODITIES: string[] = [
  "Copper Scrap",
  "Aluminium",
  "Iron",
  "Electric Motors",
  "Compressors",
  "Used Cars",
  "Construction Trucks",
  "Laptops",
  "Almonds",
  "Walnuts",
  "Pistachios",
  "Cooking Oil",
];

/**
 * Figures carried over from the original About Us page, unchanged in value.
 * Stored as numbers rather than "960+" strings so the counter can animate to
 * them exactly; the suffix is rendered separately.
 */
export const TRACK_RECORD = [
  { label: "Scrap", value: 960, suffix: "+" },
  { label: "Laptops", value: 860, suffix: "+" },
  { label: "Nuts", value: 750, suffix: "+" },
  { label: "Cooking Oil", value: 520, suffix: "+" },
] as const;

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  company: string;
};

/**
 * ⚠️ PLACEHOLDER COPY — REPLACE BEFORE LAUNCH.
 *
 * The first entry is the original site's own placeholder ("XYZ Industries
 * Ltd"); the other two follow the same obviously-fictional convention so the
 * carousel can be designed and tested. These are not real customers, and
 * publishing invented quotes as genuine reviews would be misleading. Swap in
 * real quotes with permission, or delete the section from Home.tsx.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Working with A.S. Uppal Trading GmbH has been a game-changer for our business. Their bulk procurement service is reliable, and their pricing is competitive.",
    name: "John D.",
    company: "CEO, XYZ Industries Ltd",
  },
  {
    id: "t2",
    quote:
      "They quoted against our specification the same day and the container loaded in the window they gave us. That is rare enough in this trade to be worth saying.",
    name: "Andres",
    company: "Procurement Lead, AD Metals Co.",
  },
  {
    id: "t3",
    quote:
      "What we ordered is what arrived — graded and packed the way it was described. We have moved four consignments with them since.",
    name: "Sheikh Ahmad",
    company: "Operations Director, Ahmad Trading Ltd.",
  },
];
