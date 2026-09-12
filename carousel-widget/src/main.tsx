import { createRoot } from "react-dom/client";
import { CoverFlowCarousel } from "@/components/ui/3-d-coverflow-carousel";
import { projectItems } from "@/data/projects";
import { achievementItems } from "@/data/achievements";
import "./index.css";

function mount(elementId: string, node: React.ReactNode) {
  const el = document.getElementById(elementId);
  if (!el) return;
  createRoot(el).render(node);
}

mount(
  "projects-carousel-root",
  <CoverFlowCarousel items={projectItems} sectionLabel="PROJECTS" />
);

mount(
  "achievements-carousel-root",
  <CoverFlowCarousel items={achievementItems} sectionLabel="ACHIEVEMENTS" autoplayDelay={6000} />
);
