/**
 * Stamps a static HTML shell per route so link previews and search results
 * differ from page to page.
 *
 * Why a build step and not a <Helmet>: the site is a client-rendered SPA
 * behind a catch-all rewrite. Facebook, X, LinkedIn, Slack, Discord and
 * WhatsApp read the head of whatever HTML the server returns and never run
 * the bundle, so tags written by React are invisible to all of them. Only
 * bytes already in the document count.
 *
 * Each shell is dist/index.html with the block between the seo markers
 * swapped, written to dist/<route>/index.html. The body is untouched: React
 * still boots and routes on the URL exactly as before, so this changes what
 * crawlers read and nothing about what visitors get. Page *content* is still
 * client-rendered — this is head-only prerendering, not SSR.
 *
 * Vercel checks the filesystem before it applies the rewrite in vercel.json,
 * so /categories/scrap now resolves to its own shell and only unrecognised
 * paths fall through to index.html.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const START = "<!-- seo:start -->";
const END = "<!-- seo:end -->";

/** Cards are generated at this size by tools/build-cards.mjs. */
const CARD = { width: 1200, height: 630, type: "image/png" };

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Absolute URL on the production origin. Crawlers fetch og:image over the
 * network from a cold cache, so a root-relative path here means no card.
 */
function absolute(origin, routePath) {
  return origin.replace(/\/+$/, "") + routePath;
}

/**
 * The whole replaceable block, indented to sit where the markers sit.
 * Kept in one place so the homepage and every generated shell cannot drift.
 */
export function seoBlock(route, site, cardPath, indent = "    ") {
  const url = absolute(site.origin, route.path === "/" ? "/" : route.path);
  const image = absolute(site.origin, cardPath(route.path));

  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    ``,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(route.ogTitle)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:locale" content="${esc(site.locale)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:type" content="${CARD.type}" />`,
    `<meta property="og:image:width" content="${CARD.width}" />`,
    `<meta property="og:image:height" content="${CARD.height}" />`,
    `<meta property="og:image:alt" content="${esc(route.imageAlt)}" />`,
    ``,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(route.ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    `<meta name="twitter:image:alt" content="${esc(route.imageAlt)}" />`,
  ];

  return tags.map((line) => (line === "" ? "" : indent + line)).join("\n");
}

/**
 * Where a route's shell has to sit for the static file server to find it.
 *
 * "/about" is written twice, as dist/about/index.html and dist/about.html,
 * because Vercel documents extensionless resolution only one way: cleanUrls
 * serves about.html at /about. Directory indexes are the universal static
 * convention and near certainly resolve too, but "near certainly" is not
 * something to bet 24 link previews on, and the duplicate costs ~4 KB of
 * build output apiece. Whichever rule the filesystem phase applies, one of
 * the two matches; if neither did, the request would fall through the
 * catch-all rewrite to index.html, which is exactly today's behaviour.
 *
 * Deliberately NOT paired with cleanUrls: true — that would also rewrite the
 * directory copies to /about/index, giving two live URLs for one page.
 */
function shellPaths(outDir, routePath) {
  if (routePath === "/") return [path.join(outDir, "index.html")];
  const segments = routePath.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  return [
    path.join(outDir, ...segments, "index.html"),
    path.join(outDir, ...segments.slice(0, -1), `${last}.html`),
  ];
}

export function prerender({ routes, site, cardPath }) {
  let outDir;

  return {
    name: "asu:prerender-routes",
    // Dev serves index.html for every path already, and its static block is
    // representative enough to work against. Only the build needs shells.
    apply: "build",

    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },

    async writeBundle() {
      const indexPath = path.join(outDir, "index.html");
      const template = await readFile(indexPath, "utf8");

      const from = template.indexOf(START);
      const to = template.indexOf(END);
      if (from === -1 || to === -1 || to < from) {
        // Failing the build beats shipping 26 copies of the homepage card.
        throw new Error(
          `prerender: could not find the ${START} / ${END} markers in index.html. ` +
            `Per-route metadata is stamped between them; restore them or remove this plugin.`
        );
      }

      // Preserve whatever indentation the opening marker sits at.
      const lineStart = template.lastIndexOf("\n", from) + 1;
      const indent = template.slice(lineStart, from);

      const seen = new Set();
      for (const route of routes) {
        if (seen.has(route.path)) {
          throw new Error(`prerender: duplicate route ${route.path} in the metadata table.`);
        }
        seen.add(route.path);

        const html =
          template.slice(0, from + START.length) +
          "\n" +
          seoBlock(route, site, cardPath, indent) +
          "\n" +
          indent +
          template.slice(to);

        for (const file of shellPaths(outDir, route.path)) {
          await mkdir(path.dirname(file), { recursive: true });
          await writeFile(file, html, "utf8");
        }
      }

      this.info?.(`prerendered ${routes.length} route shells`);
    },
  };
}
