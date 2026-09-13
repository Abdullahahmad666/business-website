/**
 * Renders one 1200×630 link-preview card per route into public/og.
 *
 * Run with `npm run cards` after changing card copy in src/data/seo.ts, and
 * commit the PNGs. This is deliberately NOT part of `npm run build`: it needs
 * a real browser to lay out the card, and Vercel's build container has none —
 * wiring it into the build would break every deploy. The committed PNGs are
 * what ship.
 *
 * Chrome is found via CHROME_PATH, or the usual install locations. Any
 * Chromium build works; set CHROME_PATH=... to point at Edge or Brave.
 */

import { execFile } from "node:child_process";
import { access, mkdir, readdir, unlink } from "node:fs/promises";
import { constants } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";

import { createServer } from "vite";

const run = promisify(execFile);

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const TEMPLATE = path.join(ROOT, "tools", "og-card.html");
const OUT_DIR = path.join(ROOT, "public", "og");

/** How many browsers to run at once. Each card is a cold Chrome start. */
const CONCURRENCY = 4;

const CHROME_CANDIDATES = {
  win32: [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  ],
  darwin: [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  ],
  linux: [
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ],
};

async function exists(file) {
  try {
    await access(file, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

async function findChrome() {
  if (process.env.CHROME_PATH) {
    if (await exists(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
    throw new Error(`CHROME_PATH is set to ${process.env.CHROME_PATH}, which is not executable.`);
  }
  for (const candidate of CHROME_CANDIDATES[process.platform] ?? []) {
    if (await exists(candidate)) return candidate;
  }
  throw new Error(
    "No Chrome or Edge found. Install one, or set CHROME_PATH to a Chromium binary."
  );
}

/**
 * The route table is TypeScript and imports more TypeScript, so it is loaded
 * through Vite rather than duplicated here in JavaScript. Same module the app
 * and the prerender plugin read.
 */
async function loadRoutes() {
  const server = await createServer({
    root: ROOT,
    configFile: false,
    logLevel: "warn",
    server: { middlewareMode: true },
  });
  try {
    return await server.ssrLoadModule("/src/data/seo.ts");
  } finally {
    await server.close();
  }
}

function cardUrl(card) {
  const query = new URLSearchParams({
    kicker: card.kicker,
    headline: card.headline,
    sub: card.sub,
    line: card.line,
  });
  return `${pathToFileURL(TEMPLATE).href}?${query.toString()}`;
}

async function renderCard(chrome, card, file) {
  // A private profile per process: concurrent Chromes sharing the default
  // one race over its lock and some of them exit without writing a file.
  const profile = await mkdtempProfile();
  await run(
    chrome,
    [
      "--headless",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=1200,630",
      // The template fits its headline once document.fonts.ready resolves.
      // Without a virtual clock the screenshot can be taken before that pass
      // runs, and the card ships with an overflowing headline.
      "--virtual-time-budget=3000",
      `--user-data-dir=${profile}`,
      `--screenshot=${file}`,
      cardUrl(card),
    ],
    { timeout: 60_000 }
  );

  // Chrome reports success on a page it failed to load, so check the file.
  try {
    await access(file, constants.F_OK);
  } catch {
    throw new Error(`Chrome exited without writing ${path.basename(file)}`);
  }
}

async function mkdtempProfile() {
  const dir = path.join(os.tmpdir(), `asu-card-${process.pid}-${Math.random().toString(36).slice(2)}`);
  await mkdir(dir, { recursive: true });
  return dir;
}

/** Runs jobs with a fixed number in flight, preserving the first error. */
async function pool(items, limit, worker) {
  let next = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      await worker(items[index], index);
    }
  });
  await Promise.all(runners);
}

async function main() {
  const chrome = await findChrome();
  const { ROUTES, cardSlug } = await loadRoutes();
  await mkdir(OUT_DIR, { recursive: true });

  const wanted = new Map(ROUTES.map((route) => [`${cardSlug(route.path)}.png`, route]));

  let done = 0;
  await pool([...wanted.entries()], CONCURRENCY, async ([name, route]) => {
    await renderCard(chrome, route.card, path.join(OUT_DIR, name));
    done += 1;
    process.stdout.write(`  ${String(done).padStart(2)}/${wanted.size}  ${name}\n`);
  });

  // A route deleted from the table leaves its card behind, where it would sit
  // in the repo forever describing a page that no longer exists.
  const stale = (await readdir(OUT_DIR)).filter(
    (name) => name.endsWith(".png") && !wanted.has(name)
  );
  for (const name of stale) {
    await unlink(path.join(OUT_DIR, name));
    process.stdout.write(`  removed stale ${name}\n`);
  }

  process.stdout.write(`\n${wanted.size} cards written to public/og\n`);
}

main().catch((error) => {
  process.stderr.write(`\ncards: ${error.message}\n`);
  process.exitCode = 1;
});
