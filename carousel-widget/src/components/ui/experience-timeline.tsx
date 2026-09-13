import { Timeline } from "@/components/ui/timeline";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ExperienceItem } from "@/data/experience";

function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <Card className="border-white/12 bg-white/[0.04] p-6 shadow-xl backdrop-blur-md sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-lg font-semibold text-white sm:text-xl">{item.role}</h4>
        <span className="text-sm font-medium text-[#a5f3fc]">{item.company}</span>
      </div>
      <p className="mt-1 text-sm text-white/60">{item.location}</p>

      <ul className="mt-4 space-y-2.5">
        {item.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-white/85 sm:text-[0.95rem]">
            <span aria-hidden className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[#22d3ee]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="border-[rgba(168,85,247,0.35)] bg-[rgba(168,85,247,0.08)] text-xs font-medium text-[#e9d5ff]"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {item.projectHref && (
        <a
          href={item.projectHref}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#22d3ee] transition-colors hover:text-[#67e8f9]"
        >
          {item.projectLabel ?? "Read more"} →
        </a>
      )}
    </Card>
  );
}

export default function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const data = items.map((item) => ({
    title: item.period,
    content: <ExperienceCard item={item} />,
  }));

  return (
    <Timeline
      data={data}
      heading="Experience"
      subheading="Internships and contract work alongside my studies, in AI engineering, enterprise systems, and full-stack development."
    />
  );
}
