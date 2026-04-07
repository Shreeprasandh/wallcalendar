"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MONTH_NAMES } from "@/lib/monthImages";

interface CalendarHeaderProps {
  month: number;
  year: number;
  direction: "next" | "prev";
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  month, year, direction, onPrev, onNext, onToday,
}: CalendarHeaderProps) {
  return (
    <div className="cal-header">
      <button className="cal-nav-btn" onClick={onPrev} aria-label="Previous month">
        <ChevronLeft size={16} />
      </button>

      <div className="cal-title" style={{ overflow: "hidden", position: "relative" }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`${year}-${month}`}
            custom={direction}
            initial={{ y: direction === "next" ? 20 : -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: direction === "next" ? -20 : 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <span className="cal-title-month">{MONTH_NAMES[month]}</span>
            <span className="cal-title-year">{year}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <button className="cal-nav-btn" onClick={onNext} aria-label="Next month">
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
