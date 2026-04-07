"use client";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { PenLine, X } from "lucide-react";

interface NotesPanelProps {
  monthlyNote: string;
  rangeNote: string;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  onMonthlyNoteChange: (text: string) => void;
  onRangeNoteChange: (text: string) => void;
  onClearSelection: () => void;
}

function formatDateRange(start: Date | null, end: Date | null): string {
  if (!start) return "";
  if (!end || start.toDateString() === end.toDateString()) {
    return format(start, "MMM d, yyyy");
  }
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${format(start, "MMM d")} – ${format(end, "d, yyyy")}`;
  }
  return `${format(start, "MMM d")} – ${format(end, "MMM d, yyyy")}`;
}

export default function NotesPanel({
  monthlyNote, onMonthlyNoteChange
}: Pick<NotesPanelProps, "monthlyNote" | "onMonthlyNoteChange">) {
  return (
    <div className="notes-panel">
      {/* Monthly note */}
      <div className="notes-header">
        <span className="notes-title">
          <PenLine size={13} />
          Monthly Memo
        </span>
      </div>
      <textarea
        className="notes-area"
        rows={3}
        value={monthlyNote}
        onChange={(e) => onMonthlyNoteChange(e.target.value)}
        placeholder="Add general monthly memo..."
        aria-label="Monthly notes"
      />
    </div>
  );
}
