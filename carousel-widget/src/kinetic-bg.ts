import { mountKineticBackground } from "@/lib/kinetic-background";

/*
 * Standalone entry: every page in the portfolio loads this one, while only
 * the home page also loads the heavier carousel/hero bundle. Plain DOM/canvas
 * (see lib/kinetic-background.ts) — no React here, no stylesheet, so it
 * cannot affect the host page's own CSS or drag in a runtime other pages have
 * no other use for.
 */
const el = document.getElementById("kinetic-bg-root");
if (el) {
  mountKineticBackground(el);
}
