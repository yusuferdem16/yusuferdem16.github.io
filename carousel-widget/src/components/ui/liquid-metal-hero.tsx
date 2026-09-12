import { useEffect, useState } from "react";
import { LiquidMetal, liquidMetalPresets } from "@paper-design/shaders-react";
import { motion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface HeroCta {
  label: string;
  href?: string;
  target?: "_blank" | "_self";
  onClick?: () => void;
}

export interface LiquidMetalHeroProps {
  badge?: string;
  title: string;
  eyebrow?: string;
  subtitle: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  tertiaryCta?: HeroCta;
  features?: string[];
  avatarSrc?: string;
  avatarAlt?: string;
  className?: string;
}

/*
 * The "Backdrop" preset ships light grey, which would blow out the host page's
 * dark glassmorphism palette — retint it to the site's near-black + cyan.
 * Note the preset shape is `{ name, params }`, so only `.params` is spread.
 */
const shaderParams = {
  ...liquidMetalPresets[2].params,
  colorBack: "#05070d",
  colorTint: "#22d3ee",
  softness: 0.28,
  repetition: 2.4,
  contour: 0.55,
  distortion: 0.16,
  speed: 0.45,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.15, staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

/** Honours the same reduced-motion contract the host stylesheet already uses. */
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion() {
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

function CtaButton({
  cta,
  variant,
  className,
}: {
  cta: HeroCta;
  variant: "primary" | "outline";
  className?: string;
}) {
  const classes =
    variant === "primary"
      ? "bg-white text-[#05070d] shadow-[0_0_28px_rgba(34,211,238,0.45)] hover:bg-white/90"
      : "border border-white/30 bg-white/[0.06] text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/15";

  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
      <Button
        asChild={Boolean(cta.href)}
        onClick={cta.onClick}
        size="lg"
        variant="ghost"
        className={cn(
          "h-auto px-7 py-4 text-base font-semibold transition-all duration-300",
          classes,
          className,
        )}
      >
        {cta.href ? (
          <a
            href={cta.href}
            target={cta.target ?? "_self"}
            rel={cta.target === "_blank" ? "noopener noreferrer" : undefined}
          >
            {cta.label}
          </a>
        ) : (
          <span>{cta.label}</span>
        )}
      </Button>
    </motion.div>
  );
}

export default function LiquidMetalHero({
  badge,
  title,
  eyebrow,
  subtitle,
  primaryCta,
  secondaryCta,
  tertiaryCta,
  features = [],
  avatarSrc,
  avatarAlt = "",
  className,
}: LiquidMetalHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      className={cn(
        "relative isolate flex w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      {/*
        The shader host sets `isolation: isolate` on itself and paints its canvas
        at `z-index: -1`, so it is wrapped in a plain positioned div that owns
        the stacking order instead of being positioned directly.
      */}
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <LiquidMetal
          {...shaderParams}
          speed={prefersReducedMotion ? 0 : shaderParams.speed}
          style={{ width: "100%", height: "100%", opacity: 0.55 }}
        />
      </div>
      {/* Keeps headline contrast above the moving shader. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_100%_80%_at_50%_40%,rgba(5,7,13,0.55)_0%,rgba(5,7,13,0.88)_70%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl transform-gpu px-6 py-20 lg:px-8 lg:py-28">
        <motion.div
          className="flex flex-col items-center gap-10 text-center lg:flex-row lg:items-center lg:gap-14 lg:text-left"
          variants={containerVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
        >
          {avatarSrc && (
            <motion.img
              src={avatarSrc}
              alt={avatarAlt}
              loading="eager"
              variants={itemVariants}
              className="h-40 w-40 shrink-0 rounded-full border-[3px] border-white/90 object-cover shadow-[0_0_0_4px_rgba(5,7,13,0.6),0_0_30px_rgba(34,211,238,0.55),0_0_60px_rgba(168,85,247,0.5)] sm:h-48 sm:w-48"
            />
          )}

          <div className="flex w-full min-w-0 flex-col items-center gap-6 lg:items-start">
            {badge && (
              <motion.div variants={itemVariants}>
                <Badge
                  variant="outline"
                  className="max-w-full whitespace-normal border-[rgba(34,211,238,0.55)] bg-[rgba(34,211,238,0.08)] px-4 py-1.5 text-center text-[0.8rem] font-medium tracking-wide text-[#a5f3fc] shadow-[0_0_16px_rgba(34,211,238,0.55),inset_0_0_12px_rgba(34,211,238,0.08)] backdrop-blur-sm"
                >
                  {badge}
                </Badge>
              </motion.div>
            )}

            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold leading-tight tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
            >
              {title}
            </motion.h1>

            {eyebrow && (
              <motion.p
                variants={itemVariants}
                className="text-lg font-semibold text-[#a5f3fc] sm:text-xl"
              >
                {eyebrow}
              </motion.p>
            )}

            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg"
            >
              {subtitle}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <CtaButton cta={primaryCta} variant="primary" />
              {secondaryCta && (
                <CtaButton cta={secondaryCta} variant="outline" />
              )}
              {tertiaryCta && <CtaButton cta={tertiaryCta} variant="outline" />}
            </motion.div>
          </div>
        </motion.div>

        {features.length > 0 && (
          <motion.div
            className="pt-12"
            variants={itemVariants}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate="visible"
          >
            <Card className="border-white/15 bg-white/[0.06] shadow-2xl backdrop-blur-md">
              <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-3">
                {features.map((feature, index) => (
                  <motion.p
                    key={feature}
                    className="text-center text-base font-medium text-white/90"
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 12 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  >
                    {feature}
                  </motion.p>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
