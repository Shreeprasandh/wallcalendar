import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  isAfter,
  isBefore,
  addMonths,
  subMonths,
  getDay,
} from "date-fns";

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  dayNumber: number;
  dayOfWeek: number;
}

export function getCalendarMatrix(year: number, month: number): CalendarDay[] {
  const referenceDate = new Date(year, month, 1);
  const monthStart = startOfMonth(referenceDate);
  const monthEnd = endOfMonth(referenceDate);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const rawDays = eachDayOfInterval({ start: calStart, end: calEnd });
  const resultDays = rawDays.map((date) => ({
    date,
    isCurrentMonth: isSameMonth(date, referenceDate),
    dayNumber: parseInt(format(date, "d"), 10),
    dayOfWeek: getDay(date),
  }));

  // Force exact 42 days array (6 weeks) to prevent calendar vertical shifting.
  const diff = 42 - resultDays.length;
  if (diff > 0) {
    const lastRendered = resultDays[resultDays.length - 1].date;
    for (let i = 1; i <= diff; i++) {
      const extraDate = new Date(lastRendered);
      extraDate.setDate(lastRendered.getDate() + i);
      resultDays.push({
        date: extraDate,
        isCurrentMonth: false,
        dayNumber: extraDate.getDate(),
        dayOfWeek: getDay(extraDate),
      });
    }
  }

  return resultDays;
}

export function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const rangeStart = isBefore(start, end) ? start : end;
  const rangeEnd = isAfter(end, start) ? end : start;
  return isWithinInterval(date, { start: rangeStart, end: rangeEnd });
}

export function isRangeStart(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start) return false;
  if (!end) return isSameDay(date, start);
  return isSameDay(date, isBefore(start, end) ? start : end);
}

export function isRangeEnd(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  return isSameDay(date, isAfter(end, start) ? end : start);
}

export function formatMonthYear(year: number, month: number): { monthName: string; year: string } {
  const date = new Date(year, month, 1);
  return {
    monthName: format(date, "MMMM").toUpperCase(),
    year: format(date, "yyyy"),
  };
}

export function navigateMonth(
  year: number,
  month: number,
  direction: "prev" | "next"
): { year: number; month: number } {
  const date = direction === "next"
    ? addMonths(new Date(year, month, 1), 1)
    : subMonths(new Date(year, month, 1), 1);
  return { year: date.getFullYear(), month: date.getMonth() };
}

export const WEEKDAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
export const WEEKEND_INDICES = [5, 6]; // SAT=5, SUN=6 in our 0-indexed Mon-start grid
