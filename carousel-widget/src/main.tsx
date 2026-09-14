import { createRoot } from "react-dom/client";
import { CoverFlowCarousel } from "@/components/ui/3-d-coverflow-carousel";
import LiquidMetalHero from "@/components/ui/liquid-metal-hero";
import ExperienceTimeline from "@/components/ui/experience-timeline";
import { projectItems } from "@/data/projects";
import { achievementItems } from "@/data/achievements";
import { experienceItems } from "@/data/experience";
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
    eyebrow="AI Engineer · Actively Seeking a Werkstudent Role"
    subtitle="AI Engineering graduate student building agentic AI and production ML systems — a passion that grew during my internship building multi-agent AI at Martur Fompak International. Also a language enthusiast, currently learning German (A2) alongside fluent English."
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
      "Agentic AI Systems",
      "Production ML & MLOps",
      "Applied AI Research",
    ]}
  />
);

mount("experience-root", <ExperienceTimeline items={experienceItems} />);

mount(
  "projects-carousel-root",
  <CoverFlowCarousel items={projectItems} sectionLabel="PROJECTS" />
);

mount(
  "achievements-carousel-root",
  <CoverFlowCarousel items={achievementItems} sectionLabel="ACHIEVEMENTS" autoplayDelay={6000} />
);
