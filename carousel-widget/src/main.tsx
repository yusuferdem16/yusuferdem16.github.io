import { createRoot } from "react-dom/client";
import { CoverFlowCarousel } from "@/components/ui/3-d-coverflow-carousel";
import LiquidMetalHero from "@/components/ui/liquid-metal-hero";
import { projectItems } from "@/data/projects";
import { achievementItems } from "@/data/achievements";
import "./index.css";

function mount(elementId: string, node: React.ReactNode) {
  const el = document.getElementById(elementId);
  if (!el) return;
  createRoot(el).render(node);
}

mount(
  "hero-root",
  <LiquidMetalHero
    badge="🎓 M.Sc. AI Engineering @ University of Passau"
    title="Yusuf Erdem"
    eyebrow="Computer Engineer | AI Engineering Graduate Student"
    subtitle="Building production-grade systems with expertise in data engineering, machine learning, and MLOps. Pursuing a Master of Artificial Intelligence Engineering at the University of Passau, Germany — passionate about transforming real-world problems into data-driven solutions."
    avatarSrc="images/profile_photo.jpg"
    avatarAlt="Yusuf Erdem"
    primaryCta={{
      label: "GitHub",
      href: "https://github.com/yusuferdem16",
      target: "_blank",
    }}
    secondaryCta={{
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/yusuferdem16/",
      target: "_blank",
    }}
    tertiaryCta={{
      label: "Email Me",
      href: "mailto:abdullahyusuferdem@gmail.com",
    }}
    features={[
      "Production ML & MLOps",
      "Data Engineering at Scale",
      "Applied AI Research",
    ]}
  />
);

mount(
  "projects-carousel-root",
  <CoverFlowCarousel items={projectItems} sectionLabel="PROJECTS" />
);

mount(
  "achievements-carousel-root",
  <CoverFlowCarousel items={achievementItems} sectionLabel="ACHIEVEMENTS" autoplayDelay={6000} />
);
