import { useEffect, useState } from "react";
import { Warp, type WarpProps } from "@paper-design/shaders-react";

/*
 * Site-wide animated backdrop. It sits behind everything at a fixed position,
 * so it is deliberately styled inline: this component ships in its own bundle
 * that the content pages load without the Tailwind stylesheet.
 */
const WARP_PARAMS = {
  colors: ["#05070d", "#0e3b4a", "#06121f", "#2b1745"],
  proportion: 0.42,
  softness: 1,
  distortion: 0.22,
  swirl: 0.72,
  swirlIterations: 10,
  shapeScale: 0.09,
  shape: "checks",
  scale: 1.35,
  speed: 0.22,
} satisfies WarpProps;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Stops animating while the tab is in the background so it costs nothing there. */
function usePageVisible() {
  const [visible, setVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  return visible;
}

export default function KineticBackground() {
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisible();
  const speed = reducedMotion || !pageVisible ? 0 : WARP_PARAMS.speed;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -3,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <Warp
        {...WARP_PARAMS}
        speed={speed}
        style={{ width: "100%", height: "100%", opacity: 0.85 }}
      />
      {/* Sinks the midtones so body copy keeps its contrast over the motion. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 120% 90% at 50% 0%, rgba(5,7,13,0.35) 0%, rgba(5,7,13,0.82) 55%, rgba(5,7,13,0.94) 100%)",
        }}
      />
    </div>
  );
}
