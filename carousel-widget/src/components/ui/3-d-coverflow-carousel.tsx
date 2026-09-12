import React, { useState, useEffect, useCallback, useRef } from "react";

// Inline Icons (Zero external dependencies)
const ChevronLeftIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export interface CarouselItem {
  tag?: string;
  titleLine1: string;
  titleLine2?: string;
  desc?: string;
  img: string;
  ctaText?: string;
  ctaUrl?: string;
  ctaTarget?: "_blank" | "_self";
}

export interface CoverFlowCarouselProps {
  items?: CarouselItem[];
  sectionLabel?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
  onCtaClick?: (item: CarouselItem) => void;
}

/**
 * Coverflow geometry scales with the viewport: the stage used to be locked to a
 * 330x500 card, which left the carousel looking undersized on large desktops.
 */
interface CoverflowMetrics {
  card: number;
  cardHeight: number;
  near: number;
  far: number;
  stage: number;
  minHeight: number;
  pad: string;
  titleSize: string;
  descSize: string;
}

const COVERFLOW_METRICS: ReadonlyArray<readonly [number, CoverflowMetrics]> = [
  [1536, { card: 430, cardHeight: 650, near: 372, far: 665, stage: 690, minHeight: 960, pad: "26px 24px 28px", titleSize: "1.6rem", descSize: "0.95rem" }],
  [1280, { card: 400, cardHeight: 606, near: 346, far: 620, stage: 646, minHeight: 916, pad: "24px 22px 26px", titleSize: "1.5rem", descSize: "0.92rem" }],
  [1024, { card: 366, cardHeight: 554, near: 316, far: 566, stage: 592, minHeight: 856, pad: "22px 20px 24px", titleSize: "1.38rem", descSize: "0.9rem" }],
  [640, { card: 330, cardHeight: 500, near: 285, far: 510, stage: 534, minHeight: 782, pad: "20px 18px 22px", titleSize: "1.25rem", descSize: "0.88rem" }],
  [0, { card: 272, cardHeight: 418, near: 232, far: 418, stage: 452, minHeight: 700, pad: "16px 15px 18px", titleSize: "1.1rem", descSize: "0.84rem" }],
];

function metricsForWidth(width: number): CoverflowMetrics {
  for (const [min, metrics] of COVERFLOW_METRICS) {
    if (width >= min) return metrics;
  }
  return COVERFLOW_METRICS[COVERFLOW_METRICS.length - 1][1];
}

function useCoverflowMetrics(): CoverflowMetrics {
  const [metrics, setMetrics] = useState(() => metricsForWidth(window.innerWidth));

  useEffect(() => {
    const onResize = () => setMetrics(metricsForWidth(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return metrics;
}

export const defaultDishes: CarouselItem[] = [
  {
    tag: "#Signature",
    titleLine1: "BUTTER CHICKEN",
    titleLine2: "– DELHI HERITAGE",
    desc: "Velvety roasted tomato and fenugreek gravy with tender charred chicken",
    img: "https://cdn.21st.dev/assets/mirror/84/84cb320f9692895054c9e1774ca48848f1c9c62ccba43ad8ad0b186460bb3751.jpg",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
];

export function CoverFlowCarousel({
  items = defaultDishes,
  sectionLabel = "BEST SELLERS",
  autoplay = true,
  autoplayDelay = 5000,
  className = "",
  onCtaClick,
}: CoverFlowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const m = useCoverflowMetrics();
  const touchStartX = useRef(0);
  const total = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx % total);
  };

  useEffect(() => {
    if (!autoplay || isHovered || total <= 1) return;
    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isHovered, nextSlide, total]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section
      className={`cf-widget-scope relative w-full flex items-center justify-center overflow-hidden py-12 select-none ${className}`}
      style={{
        minHeight: `${m.minHeight}px`,
        backgroundColor: "#05070d",
        color: "#ffffff",
        fontFamily: "'Space Grotesk', system-ui, -apple-system, sans-serif",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src={items[currentIndex]?.img}
          alt="ambience background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.22) blur(32px)",
            transform: "scale(1.15)",
            transition: "opacity 1000ms ease, filter 1000ms ease",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(5,7,13,0.3) 0%, rgba(5,7,13,0.92) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4">
        {/* Eyebrow */}
        {sectionLabel && (
          <div className="flex items-center gap-3 mb-8">
            <span style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, transparent, #22d3ee)" }} />
            <h3
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#22d3ee",
                margin: 0,
              }}
            >
              {sectionLabel}
            </h3>
            <span style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, #a855f7, transparent)" }} />
          </div>
        )}

        {/* 3D Coverflow Stage */}
        <div
          className="relative mb-8 flex w-full items-center justify-center"
          style={{ height: `${m.stage}px`, perspective: "1600px" }}
        >
          {items.map((item, idx) => {
            const offset = (idx - currentIndex + total) % total;

            let transform = "translateX(0px) scale(0.4) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let filter = "brightness(0.4) blur(2px)";
            let isCenter = false;

            if (offset === 0) {
              isCenter = true;
              transform = "translateX(0px) scale(1) rotateY(0deg)";
              opacity = 1;
              zIndex = 30;
              filter = "brightness(1)";
            } else if (offset === 1) {
              transform = `translateX(${m.near}px) scale(0.84) rotateY(-24deg)`;
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (offset === 2) {
              transform = `translateX(${m.far}px) scale(0.68) rotateY(-38deg)`;
              opacity = 0.38;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            } else if (offset === total - 1) {
              transform = `translateX(-${m.near}px) scale(0.84) rotateY(24deg)`;
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (offset === total - 2) {
              transform = `translateX(-${m.far}px) scale(0.68) rotateY(38deg)`;
              opacity = 0.38;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            }

            return (
              <div
                key={idx}
                onClick={() => !isCenter && goToSlide(idx)}
                style={{
                  position: "absolute",
                  width: `${m.card}px`,
                  height: `${m.cardHeight}px`,
                  borderRadius: "20px",
                  overflow: "hidden",
                  backgroundColor: "#111726",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  transformOrigin: "center center",
                  transition: "all 800ms cubic-bezier(0.25, 1, 0.5, 1)",
                  boxShadow: isCenter
                    ? "0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(34,211,238,0.35), 0 0 60px rgba(168,85,247,0.2)"
                    : "0 15px 35px rgba(0,0,0,0.5)",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                {/* Photo */}
                <img
                  src={item.img}
                  alt={item.titleLine1}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.68) 60%, rgba(0,0,0,0.96) 100%)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />

                {/* Content Overlay */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    padding: m.pad,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "center",
                    zIndex: 20,
                    opacity: isCenter ? 1 : 0,
                    transform: isCenter ? "translateY(0px)" : "translateY(16px)",
                    transition: "opacity 500ms ease, transform 500ms ease",
                    pointerEvents: isCenter ? "auto" : "none",
                  }}
                >
                  {/* Tag */}
                  <div style={{ textAlign: "right", width: "100%", paddingRight: "4px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        color: "rgba(255,255,255,0.9)",
                        textShadow: "0 2px 6px rgba(0,0,0,0.8)",
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "3px",
                      marginTop: "auto",
                      paddingBottom: "4px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: m.titleSize,
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                        color: "#ffffff",
                        margin: 0,
                        lineHeight: 1.15,
                        textShadow: "0 3px 12px rgba(0,0,0,0.95)",
                      }}
                    >
                      {item.titleLine1}
                    </h2>

                    {item.titleLine2 && (
                      <span
                        style={{
                          fontSize: "1rem",
                          fontWeight: 700,
                          letterSpacing: "0.03em",
                          color: "#f3f0ea",
                          lineHeight: 1.25,
                          textShadow: "0 3px 10px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.titleLine2}
                      </span>
                    )}

                    <div
                      style={{
                        width: "34px",
                        height: "2px",
                        background: "linear-gradient(90deg, #22d3ee, #a855f7)",
                        borderRadius: "2px",
                        margin: "5px auto 4px",
                        boxShadow: "0 0 8px rgba(34,211,238,0.7)",
                      }}
                    />

                    {item.desc && (
                      <p
                        style={{
                          fontSize: m.descSize,
                          color: "rgba(255,255,255,0.9)",
                          maxWidth: `${m.card - 50}px`,
                          margin: "0 0 10px",
                          lineHeight: 1.35,
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.desc}
                      </p>
                    )}

                    <a
                      href={item.ctaUrl || "#"}
                      target={item.ctaTarget}
                      rel={item.ctaTarget === "_blank" ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (onCtaClick) {
                          e.preventDefault();
                          onCtaClick(item);
                        }
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "7px 18px",
                        borderRadius: "9999px",
                        background: "linear-gradient(135deg, #22d3ee 0%, #a855f7 100%)",
                        color: "#05070d",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.4), 0 0 15px rgba(34,211,238,0.4)",
                        cursor: "pointer",
                        transition: "transform 200ms ease, box-shadow 200ms ease",
                      }}
                    >
                      <span>{item.ctaText || "View More"}</span>
                      <ArrowRightIcon />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous item"
          style={{
            position: "absolute",
            left: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <ChevronLeftIcon />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next item"
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <ChevronRightIcon />
        </button>

        {/* Pagination Dots */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", zIndex: 30 }}>
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                height: "8px",
                width: idx === currentIndex ? "28px" : "8px",
                borderRadius: "9999px",
                background: idx === currentIndex ? "linear-gradient(90deg, #22d3ee, #a855f7)" : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                boxShadow: idx === currentIndex ? "0 0 10px rgba(34,211,238,0.7)" : "none",
                transition: "all 300ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export const Component = CoverFlowCarousel;
export default CoverFlowCarousel;
