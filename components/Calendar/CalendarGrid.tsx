import { getCalendarMatrix, WEEKDAY_LABELS, WEEKEND_INDICES } from "@/lib/calendarUtils";
import DayCell from "./DayCell";

import { DateRange } from "@/hooks/useCalendar";

interface CalendarGridProps {
  year: number;
  month: number;
  today: Date;
  dateRanges: DateRange[];
  pendingRangeStart: Date | null;
  hoveredDate: Date | null;
  selectionState: "idle" | "selecting";
  direction: "next" | "prev";
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date | null) => void;
}

export default function CalendarGrid({
  year, month, today, dateRanges, pendingRangeStart, hoveredDate, selectionState,
  direction, onDayClick, onDayHover,
}: CalendarGridProps) {
  const matrix = getCalendarMatrix(year, month);

  return (
    <div className="cal-grid-wrap">
      {/* Weekday labels */}
      <div className="weekday-row">
        {WEEKDAY_LABELS.map((label, i) => (
          <div key={label} className={`weekday-label${WEEKEND_INDICES.includes(i) ? " weekend" : ""}`}>
            {label}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="days-grid">
        {matrix.map((day, idx) => {
          const colIndex = idx % 7;
          return (
            <DayCell
              key={day.date.toISOString()}
              day={day}
              today={today}
              dateRanges={dateRanges}
              pendingRangeStart={pendingRangeStart}
              hoveredDate={hoveredDate}
              selectionState={selectionState}
              colIndex={colIndex}
              onClick={onDayClick}
              onHover={onDayHover}
            />
          );
        })}
      </div>
    </div>
  );
}
