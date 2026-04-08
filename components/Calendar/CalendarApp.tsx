"use client";
import { useEffect } from "react";
import { useCalendar } from "@/hooks/useCalendar";
import { motion, AnimatePresence } from "framer-motion";
import BinderRing from "./BinderRing";
import HeroImage from "./HeroImage";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import LiveClock from "./LiveClock";
import ConfirmModal from "./ConfirmModal";
import RangeNotePopup from "./RangeNotePopup";
import { useState } from "react";

export default function CalendarApp() {
  const {
    today, year, month, dateRanges, pendingRangeStart,
    selectionState, hoveredDate, setHoveredDate, navDirection,
    monthlyNote, updateMonthlyNote, updateRangeNote, removeRange,
    clearAllRanges, goToNextMonth, goToPrevMonth, goToMonth, handleDayClick,
  } = useCalendar();

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  // Navigate to today
  const handleToday = () => {
    // Current approach is just a placeholder, relying on the header actions instead.
  };

  return (
    <div className="page-wrapper">
      <div className="page-bg-pattern" />
      <div className="page-content">

        {/* Top Bar */}
        <div className="top-bar">
          <div className="brand">
            Wall<span>Calendar</span>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <LiveClock />
          </div>
        </div>
        {/* Calendar Card */}
        <div className="calendar-card" style={{ perspective: "1500px" }}>
          <BinderRing currentMonthIndex={month} onRingClick={goToMonth} />

          <AnimatePresence initial={false} custom={navDirection} mode="wait">
            <motion.div
              key={`${year}-${month}`}
              className="calendar-animator"
              custom={navDirection}
              initial={{ opacity: 0, rotateX: navDirection === "next" ? -30 : 30, y: navDirection === "next" ? 30 : -30, scale: 0.95 }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, rotateX: navDirection === "next" ? 30 : -30, y: navDirection === "next" ? -30 : 30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              style={{ transformOrigin: "top center", width: "100%", overflow: "visible" }}
            >
              <div className="calendar-body" style={{ overflow: "visible" }}>
                {/* Hero Image (Left) */}
                <HeroImage month={month} year={year} direction={navDirection} />

                {/* Right Panel: Header + Grid + Notes */}
                <div className="right-panel">
                  <CalendarHeader
                    month={month}
                    year={year}
                    direction={navDirection}
                    onPrev={goToPrevMonth}
                    onNext={goToNextMonth}
                    onToday={handleToday}
                  />

                  <CalendarGrid
                    year={year}
                    month={month}
                    today={today}
                    dateRanges={dateRanges}
                    pendingRangeStart={pendingRangeStart}
                    hoveredDate={hoveredDate}
                    selectionState={selectionState}
                    direction={navDirection}
                    onDayClick={handleDayClick}
                    onDayHover={setHoveredDate}
                  />

                  <div className="selection-divider" />

                  <NotesPanel
                    monthlyNote={monthlyNote}
                    onMonthlyNoteChange={updateMonthlyNote}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Action Bar */}
        {dateRanges.length > 0 && (
          <div className="global-clear-wrap">
            <button 
              className="btn-small-clear"
              onClick={() => setIsClearModalOpen(true)}
              title="Wipe all date ranges and notes"
            >
              Clear Selection
            </button>
          </div>
        )}

        <ConfirmModal
          isOpen={isClearModalOpen}
          onClose={() => setIsClearModalOpen(false)}
          onConfirm={clearAllRanges}
          title="Clear All Selections?"
          message="This will permanently delete all your selected date ranges and associated notes. This action cannot be undone."
        />

        {/* Dynamic List of Active Range Note Popups */}
        <AnimatePresence>
          {dateRanges.map((range, index) => (
            <RangeNotePopup
              key={range.id}
              id={range.id}
              rangeNote={range.note}
              rangeStart={range.start}
              rangeEnd={range.end}
              isLast={index === dateRanges.length - 1}
              allRanges={dateRanges}
              onRangeNoteChange={updateRangeNote}
              onClearSelection={removeRange}
            />
          ))}
        </AnimatePresence>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: "1.25rem",
          fontFamily: "var(--font-body)",
          fontSize: "0.7rem",
          color: "var(--text-faint)",
          letterSpacing: "0.06em",
          paddingBottom: "1rem"
        }}>
          {selectionState === "selecting"
            ? "Click a second date to complete your selection"
            : "Click a date to start selecting a range, and select again to create a note."}
        </div>
      </div>
    </div>
  );
}
