import { createRoot } from "react-dom/client";
import KineticBackground from "@/components/ui/kinetic-background";

/*
 * Standalone entry: every page in the portfolio loads this one, while only the
 * home page loads the heavier carousel/hero bundle. It ships no stylesheet, so
 * it cannot affect the host page's own CSS.
 */
const el = document.getElementById("kinetic-bg-root");
if (el) {
  createRoot(el).render(<KineticBackground />);
}
