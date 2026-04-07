"use client";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { X, CalendarRange, DownloadCloud } from "lucide-react";
import { jsPDF } from "jspdf";

export interface DateRangeShape {
  id: string;
  start: Date;
  end: Date;
  note: string;
}

interface RangeNoteProps {
  id: string;
  rangeNote: string;
  rangeStart: Date;
  rangeEnd: Date;
  isLast?: boolean;
  allRanges?: DateRangeShape[];
  onRangeNoteChange: (id: string, text: string) => void;
  onClearSelection: (id: string) => void;
}

function formatDateRange(start: Date, end: Date): string {
  if (start.toDateString() === end.toDateString()) {
    return format(start, "MMMM d, yyyy");
  }
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${format(start, "MMMM d")} – ${format(end, "d, yyyy")}`;
  }
  return `${format(start, "MMM d, yyyy")} – ${format(end, "MMM d, yyyy")}`;
}

export default function RangeNotePopup({
  id, rangeNote, rangeStart, rangeEnd,
  isLast, allRanges,
  onRangeNoteChange, onClearSelection,
}: RangeNoteProps) {

  const handleDownloadPDF = () => {
    if (!allRanges) return;
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Interactive Wall Calendar Notes", 20, 20);
    
    let yPos = 35;
    
    // Sort ranges by start date chronologically
    const sortedRanges = [...allRanges].sort((a, b) => a.start.getTime() - b.start.getTime());

    sortedRanges.forEach((range, idx) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setTextColor(104, 59, 43); // Matches --primary
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      const rangeText = formatDateRange(range.start, range.end);
      doc.text(rangeText, 20, yPos);
      yPos += 8;
      
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      if (range.note.trim()) {
        const splitText = doc.splitTextToSize(range.note, 170);
        doc.text(splitText, 20, yPos);
        yPos += (splitText.length * 6) + 12;
      } else {
        doc.setTextColor(150, 150, 150);
        doc.setFont("helvetica", "italic");
        doc.text("(No notes recorded)", 20, yPos);
        yPos += 14;
      }
    });

    doc.save(`calendar-all-notes-${format(new Date(), 'MMM-d')}.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 450, damping: 30 }}
      style={{
        marginTop: "1.25rem",
        width: "100%",
        maxWidth: "600px",
        background: "var(--white)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        padding: "1rem 1.5rem",
        border: "2px solid var(--medium-dark)",
        position: "relative",
        zIndex: 10,
        margin: "1rem auto 0"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ 
          fontFamily: "var(--font-heading)", 
          fontSize: "1.1rem", 
          fontWeight: 700, 
          color: "var(--primary)",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem"
        }}>
          <CalendarRange size={18} />
          {formatDateRange(rangeStart, rangeEnd)}
        </span>
        <button
          onClick={() => onClearSelection(id)}
          aria-label="Clear selection"
          style={{
            background: "var(--medium)",
            border: "none",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--primary)",
            transition: "all 150ms"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--text-faint)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "var(--medium)"}
        >
          <X size={14} />
        </button>
      </div>
      
      <textarea
        className="notes-area"
        rows={2}
        value={rangeNote}
        onChange={(e) => onRangeNoteChange(id, e.target.value)}
        placeholder={`Add a note for this selected timeframe...`}
        aria-label="Date range notes"
        style={{ minHeight: "50px", width: "100%", border: "none", outline: "none", background: "transparent", resize: "none" }}
      />

      {isLast && allRanges && allRanges.some(r => r.note.trim().length > 0) && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
          <button
            onClick={handleDownloadPDF}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              padding: "0.4rem 0.8rem",
              background: "var(--primary)",
              color: "var(--white)",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <DownloadCloud size={14} />
            Download All Notes
          </button>
        </div>
      )}
    </motion.div>
  );
}
