"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MONTH_IMAGES, MONTH_NAMES } from "@/lib/monthImages";

interface HeroImageProps {
  month: number;
  year: number;
  direction: "next" | "prev";
}

const variants = {
  enter: (dir: "next" | "prev") => ({
    x: dir === "next" ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: "next" | "prev") => ({
    x: dir === "next" ? "-100%" : "100%",
    opacity: 0,
  }),
};

export default function HeroImage({ month, year, direction }: HeroImageProps) {
  const img = MONTH_IMAGES[month];

  return (
    <div className="hero-panel">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={`${year}-${month}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={true}
            className="hero-img"
            style={{ objectFit: "cover" }}
          />
          <div className="hero-overlay" />

          {/* Chevron SVG wave */}
          <div className="hero-chevron-wrap">
            <svg
              viewBox="0 0 340 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hero-chevron"
              preserveAspectRatio="none"
            >
              <path
                d="M0 45 L120 10 L200 45 L340 5 L340 70 L0 70 Z"
                fill="#683b2b"
                fillOpacity="0.9"
              />
              <path
                d="M0 55 L100 20 L200 55 L340 15 L340 70 L0 70 Z"
                fill="#faf6f2"
                fillOpacity="0.95"
              />
            </svg>
          </div>

          {/* Month & Year tag */}
          <div className="hero-month-tag">
            <span className="hero-year">{year}</span>
            <span className="hero-month-name">{MONTH_NAMES[month].toUpperCase()}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
