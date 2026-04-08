"use client";
import { useState, useCallback, useEffect } from "react";
import { isBefore } from "date-fns";
import { navigateMonth } from "@/lib/calendarUtils";

export type SelectionState = "idle" | "selecting";

export interface DateRange {
  id: string;
  start: Date;
  end: Date;
  note: string;
}

interface MonthlyNote {
  monthly: string;
}

export function useCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  
  // Array of confirmed date ranges
  const [dateRanges, setDateRanges] = useState<DateRange[]>([]);
  
  // The first date clicked when forming a new range
  const [pendingRangeStart, setPendingRangeStart] = useState<Date | null>(null);
  const [selectionState, setSelectionState] = useState<SelectionState>("idle");
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  
  const [monthlyNotes, setMonthlyNotes] = useState<Record<string, MonthlyNote>>({});
  const [navDirection, setNavDirection] = useState<"next" | "prev">("next");

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const storedNotes = localStorage.getItem("calendar-notes-general");
      const storedRanges = localStorage.getItem("calendar-ranges");
      if (storedNotes) setMonthlyNotes(JSON.parse(storedNotes));
      if (storedRanges) {
        // Hydrate Date objects
        const parsed = JSON.parse(storedRanges).map((r: any) => ({
          ...r,
          start: new Date(r.start),
          end: new Date(r.end)
        }));
        setDateRanges(parsed);
      }
    } catch {}
  }, []);

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("calendar-notes-general", JSON.stringify(monthlyNotes));
      localStorage.setItem("calendar-ranges", JSON.stringify(dateRanges));
    } catch {}
  }, [monthlyNotes, dateRanges]);

  const goToNextMonth = useCallback(() => {
    setNavDirection("next");
    const next = navigateMonth(year, month, "next");
    setYear(next.year);
    setMonth(next.month);
  }, [year, month]);

  const goToPrevMonth = useCallback(() => {
    setNavDirection("prev");
    const prev = navigateMonth(year, month, "prev");
    setYear(prev.year);
    setMonth(prev.month);
  }, [year, month]);

  const goToMonth = useCallback((targetMonth: number) => {
    setNavDirection(targetMonth > month ? "next" : "prev");
    setMonth(targetMonth);
  }, [month]);

  const handleDayClick = useCallback((date: Date) => {
    if (selectionState === "idle") {
      setPendingRangeStart(date);
      setSelectionState("selecting");
    } else {
      let newRange: DateRange;
      const genericId = Math.random().toString(36).substr(2, 9);
      if (isBefore(date, pendingRangeStart!)) {
        newRange = { id: genericId, start: date, end: pendingRangeStart!, note: "" };
      } else {
        newRange = { id: genericId, start: pendingRangeStart!, end: date, note: "" };
      }
      setDateRanges(prev => [...prev, newRange]);
      setPendingRangeStart(null);
      setSelectionState("idle");
    }
  }, [selectionState, pendingRangeStart]);

  const removeRange = useCallback((id: string) => {
    setDateRanges(prev => prev.filter(r => r.id !== id));
  }, []);

  const updateRangeNote = useCallback((id: string, text: string) => {
    setDateRanges(prev => prev.map(r => r.id === id ? { ...r, note: text } : r));
  }, []);

  const noteKey = `${year}-${month}`;

  const updateMonthlyNote = useCallback((text: string) => {
    setMonthlyNotes(prev => ({
      ...prev,
      [noteKey]: { monthly: text },
    }));
  }, [noteKey]);

  const clearAllRanges = useCallback(() => {
    setDateRanges([]);
    setPendingRangeStart(null);
    setSelectionState("idle");
  }, []);

  return {
    today,
    year,
    month,
    dateRanges,
    pendingRangeStart,
    selectionState,
    hoveredDate,
    setHoveredDate,
    navDirection,
    monthlyNote: monthlyNotes[noteKey]?.monthly ?? "",
    updateMonthlyNote,
    updateRangeNote,
    removeRange,
    clearAllRanges,
    goToNextMonth,
    goToPrevMonth,
    goToMonth,
    handleDayClick,
  };
}
