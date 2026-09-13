import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export interface TimelineProps {
  data: TimelineEntry[];
  heading?: string;
  subheading?: React.ReactNode;
  className?: string;
}

/*
 * Adapted from the Aceternity UI timeline component for a Vite + React SPA
 * (no "use client" directive, no next/image) and restyled for this site's
 * permanent dark/glass aesthetic instead of Tailwind's light/dark: variants —
 * the page this mounts into never toggles theme, so a static dark palette is
 * simpler and avoids fighting the host page's own un-scoped CSS.
 */
export const Timeline = ({ data, heading, subheading, className }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  // Re-measure if the viewport resizes (e.g. rotation, responsive reflow).
  useMotionValueEvent(scrollYProgress, "change", () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (Math.abs(rect.height - height) > 4) setHeight(rect.height);
    }
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className={cn("w-full font-sans", className)} ref={containerRef}>
      {(heading || subheading) && (
        <div className="mx-auto max-w-4xl pb-12">
          {heading && (
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="max-w-2xl text-base text-white/70">{subheading}</p>
          )}
        </div>
      )}

      <div ref={ref} className="relative mx-auto max-w-5xl pb-4">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start gap-6 pt-10 first:pt-0 md:gap-10">
            <div className="sticky top-24 z-10 flex max-w-[220px] shrink-0 flex-col self-start pt-1 sm:max-w-xs">
              <div className="absolute -left-[34px] top-1 hidden h-8 w-8 items-center justify-center rounded-full border border-[rgba(34,211,238,0.4)] bg-[#0b0f16] shadow-[0_0_12px_rgba(34,211,238,0.45)] sm:flex">
                <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#a855f7]" />
              </div>
              <h3 className="text-lg font-semibold leading-snug text-white/90 sm:pl-10 sm:text-xl">
                {item.title}
              </h3>
            </div>

            <div className="w-full min-w-0 pb-4">{item.content}</div>
          </div>
        ))}

        <div
          style={{ height: height + "px" }}
          className="absolute left-3 top-0 hidden w-px overflow-hidden bg-[linear-gradient(to_bottom,transparent_0%,rgba(148,163,184,0.25)_10%,rgba(148,163,184,0.25)_90%,transparent_100%)] sm:block"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-px rounded-full bg-gradient-to-b from-[#22d3ee] via-[#a855f7] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
