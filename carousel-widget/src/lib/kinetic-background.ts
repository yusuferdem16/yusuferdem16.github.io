/*
 * Site-wide animated backdrop: a canvas of dots that drift toward the cursor
 * (or the nearest touch point) and settle back to rest as it moves away.
 *
 * Plain DOM/canvas, no React: this mounts standalone on every page (the home
 * page loads it alongside the full carousel/hero bundle), so pulling in
 * react-dom here just to render one <canvas> would cost every other page a
 * ~68KB-gzip shared React runtime chunk it has no other use for.
 *
 * This also replaces an earlier version built on a WebGL Warp shader
 * (@paper-design/shaders-react). That looked good but was a fixed ambient
 * loop with no pointer interaction, and pulled ~96KB of gzipped JS onto every
 * page just for the backdrop. A grid of a few hundred circles redrawn on a
 * 2D canvas is materially cheaper, and is the actual "dotted surface that
 * moves with the mouse" effect that was asked for — a shader can't easily do
 * per-dot pointer repulsion without hand-written GLSL, which is exactly what
 * plain canvas arithmetic is for.
 */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// Grid + interaction tuning, in CSS pixels.
const GAP = 32;
const BASE_RADIUS = 1.9;
const MAX_RADIUS = 3.4;
const INFLUENCE = 160;
const REPEL = 22;
const EASE_POSITION = 0.18;
const EASE_POINTER = 0.16;
const BASE_ALPHA = 0.32;
const MAX_ALPHA = 0.85;

interface Dot {
  /** Rest position (grid coordinates). */
  x: number;
  y: number;
  /** Current rendered position, eased toward its pointer-influenced target. */
  rx: number;
  ry: number;
  /** ~30% of dots lean violet instead of cyan, matching the site's two-tone accent. */
  violet: boolean;
}

export function mountKineticBackground(container: HTMLElement): () => void {
  // The container (#kinetic-bg-root) is a plain, unstyled div sitting first
  // in <body> in normal document flow — it carries no CSS of its own. Fixing
  // and sizing the canvas here (not relying on any host-page stylesheet) is
  // what takes it out of flow and pins it full-viewport behind everything;
  // without this it renders as an in-flow block element and pushes the whole
  // page down by its own height.
  container.style.position = "fixed";
  container.style.inset = "0";
  container.style.zIndex = "-3";
  container.style.pointerEvents = "none";
  container.style.overflow = "hidden";

  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.inset = "0";
  canvas.style.display = "block";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return () => container.removeChild(canvas);

  const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let dots: Dot[] = [];
  let width = 0;
  let height = 0;
  let pointerX = -9999;
  let pointerY = -9999;
  let targetX = -9999;
  let targetY = -9999;
  let rafId = 0;
  let running = true;

  function buildGrid() {
    dots = [];
    const cols = Math.ceil(width / GAP) + 2;
    const rows = Math.ceil(height / GAP) + 2;
    const offsetX = (width - (cols - 1) * GAP) / 2;
    const offsetY = (height - (rows - 1) * GAP) / 2;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * GAP;
        const y = offsetY + row * GAP;
        dots.push({ x, y, rx: x, ry: y, violet: Math.random() < 0.3 });
      }
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildGrid();
  }

  function drawStatic() {
    ctx!.clearRect(0, 0, width, height);
    for (const dot of dots) {
      ctx!.beginPath();
      ctx!.fillStyle = dot.violet
        ? `rgba(168, 85, 247, ${BASE_ALPHA})`
        : `rgba(34, 211, 238, ${BASE_ALPHA})`;
      ctx!.arc(dot.x, dot.y, BASE_RADIUS, 0, Math.PI * 2);
      ctx!.fill();
    }
  }

  function drawFrame() {
    ctx!.clearRect(0, 0, width, height);
    pointerX += (targetX - pointerX) * EASE_POINTER;
    pointerY += (targetY - pointerY) * EASE_POINTER;

    for (const dot of dots) {
      let tx = dot.x;
      let ty = dot.y;
      let radius = BASE_RADIUS;
      let alpha = BASE_ALPHA;

      const dx = dot.x - pointerX;
      const dy = dot.y - pointerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < INFLUENCE) {
        const t = 1 - dist / INFLUENCE;
        const angle = Math.atan2(dy, dx);
        tx = dot.x + Math.cos(angle) * REPEL * t;
        ty = dot.y + Math.sin(angle) * REPEL * t;
        radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * t;
        alpha = BASE_ALPHA + (MAX_ALPHA - BASE_ALPHA) * t;
      }

      dot.rx += (tx - dot.rx) * EASE_POSITION;
      dot.ry += (ty - dot.ry) * EASE_POSITION;

      ctx!.beginPath();
      ctx!.fillStyle = dot.violet
        ? `rgba(168, 85, 247, ${alpha})`
        : `rgba(34, 211, 238, ${alpha})`;
      ctx!.arc(dot.rx, dot.ry, radius, 0, Math.PI * 2);
      ctx!.fill();
    }
  }

  function loop() {
    if (!running) return;
    drawFrame();
    rafId = requestAnimationFrame(loop);
  }

  function onPointerMove(e: PointerEvent) {
    targetX = e.clientX;
    targetY = e.clientY;
  }

  function onPointerLeave() {
    targetX = -9999;
    targetY = -9999;
  }

  function onVisibilityChange() {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(rafId);
    } else if (!prefersReducedMotion) {
      running = true;
      rafId = requestAnimationFrame(loop);
    }
  }

  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", onVisibilityChange);

  if (prefersReducedMotion) {
    // Static grid, no pointer tracking, no per-frame work at all.
    drawStatic();
  } else {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    rafId = requestAnimationFrame(loop);
  }

  return function cleanup() {
    running = false;
    cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerleave", onPointerLeave);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    container.removeChild(canvas);
  };
}
