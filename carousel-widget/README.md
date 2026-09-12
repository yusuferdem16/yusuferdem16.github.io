# carousel-widget

Source project for the 3D coverflow carousel used on the portfolio's Projects
and Achievements sections. This is a small React + TypeScript + Tailwind CSS
project (shadcn `components/ui` structure) — the portfolio itself is a plain
static HTML/CSS/JS site, so this widget is built separately and the compiled
output is embedded as a self-contained script/stylesheet, not a full app.

## Structure

- `src/components/ui/3-d-coverflow-carousel.tsx` — the carousel component
- `src/data/projects.ts`, `src/data/achievements.ts` — real content shown in
  each carousel (edit these to change cards, not the component itself)
- `src/main.tsx` — mounts a carousel into `#projects-carousel-root` and
  `#achievements-carousel-root` if those elements exist on the page

## Rebuilding after a content/style change

```bash
cd carousel-widget
npm install
npm run build
cp dist/carousel-widget.js dist/carousel-widget.css ../carousel-dist/
```

The portfolio's `index.html` loads `carousel-dist/carousel-widget.css` and
`carousel-dist/carousel-widget.js` directly — GitHub Pages only serves static
files, so the built output must be committed to `carousel-dist/` (this
project's own `dist/` is gitignored).

## Local preview

`npm run dev` serves `index.html` in this folder, which mounts both carousels
with real data. It expects `public/images` to exist as a symlink to the
portfolio's `images/` folder (gitignored, dev-only convenience):

```bash
ln -s ../../images public/images
```
