"use client";
import { useState } from "react";
import { isSameDay } from "date-fns";
import { isInRange, isRangeStart, isRangeEnd } from "@/lib/calendarUtils";
import { getHoliday } from "@/lib/holidays";
import { CalendarDay } from "@/lib/calendarUtils";

import { DateRange } from "@/hooks/useCalendar";

interface DayCellProps {
  day: CalendarDay;
  today: Date;
  dateRanges: DateRange[];
  pendingRangeStart: Date | null;
  hoveredDate: Date | null;
  selectionState: "idle" | "selecting";
  colIndex: number; // 0-6 (Mon-Sun)
  onClick: (date: Date) => void;
  onHover: (date: Date | null) => void;
}

export default function DayCell({
  day, today, dateRanges, pendingRangeStart, hoveredDate, selectionState, colIndex, onClick, onHover,
}: DayCellProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const isToday = isSameDay(day.date, today);

  const isConfirmedStart = dateRanges.some(r => isSameDay(day.date, r.start));
  const isConfirmedEnd = dateRanges.some(r => isSameDay(day.date, r.end));
  const isPendingStart = pendingRangeStart && isSameDay(day.date, pendingRangeStart);
  const isPreviewEnd = selectionState === "selecting" && pendingRangeStart && hoveredDate && isSameDay(day.date, hoveredDate);

  // confirmed or pending start (clicked)
  const isStart = isConfirmedStart || isPendingStart;
  // confirmed end (clicked)
  const isEnd = isConfirmedEnd;
  // just the preview (hovered)
  const isPreview = isPreviewEnd && !isConfirmedEnd && !isConfirmedStart;

  const inRange = dateRanges.some(r => isInRange(day.date, r.start, r.end)) || 
                  (selectionState === "selecting" && pendingRangeStart && hoveredDate && isInRange(day.date, pendingRangeStart, hoveredDate));

  const holiday = getHoliday(day.date.getMonth(), day.date.getDate());
  const isWeekend = colIndex === 5 || colIndex === 6;

  let cellClass = "day-cell";
  if (!day.isCurrentMonth) cellClass += " day-other-month";
  if (isToday && !isStart && !isEnd) cellClass += " day-today";
  if (isStart) cellClass += " day-range-start";
  if (isEnd) cellClass += " day-range-end";
  if (isPreview) cellClass += " day-range-preview";
  if (inRange && !isStart && !isEnd && !isPreview) cellClass += " day-in-range";
  if (selectionState === "selecting" && day.isCurrentMonth) cellClass += " day-selecting-cursor";

  const handleEnter = () => {
    if (day.isCurrentMonth) {
      onHover(day.date);
      if (holiday) setShowTooltip(true);
    }
  };

  const handleLeave = () => {
    onHover(null);
    setShowTooltip(false);
  };

  return (
    <div
      className={cellClass}
      onClick={() => day.isCurrentMonth && onClick(day.date)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-label={`${day.dayNumber}${holiday ? `, ${holiday.name}` : ""}`}
      role="button"
      tabIndex={day.isCurrentMonth ? 0 : -1}
      onKeyDown={(e) => e.key === "Enter" && day.isCurrentMonth && onClick(day.date)}
    >
      {isToday && !isStart && !isEnd && (
        <div className="day-today-ring" />
      )}
      <div className="day-number-wrap">
        <span className={`day-number${isWeekend && !isStart && !isEnd ? " weekend-num" : ""}`}>
          {day.dayNumber}
        </span>
      </div>
      {holiday && day.isCurrentMonth && (
        <div className="holiday-dot" title={holiday.name} />
      )}
      {holiday && showTooltip && (
        <div className="tooltip-wrap">
          <div className="tooltip-box">
            {holiday.emoji} {holiday.name}
          </div>
        </div>
      )}
    </div>
  );
}
