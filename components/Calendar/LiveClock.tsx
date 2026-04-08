"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function LiveClock() {
  const [time, setTime] = useState<Date | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <div style={{
        fontFamily: "var(--font-heading)",
        fontSize: "0.9rem",
        fontWeight: 600,
        height: "20px",
        width: "80px",
        color: "transparent"
      }} />
    );
  }

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        fontFamily: "var(--font-heading)",
        fontSize: "0.95rem",
        fontWeight: 700,
        color: isHovered ? "var(--primary)" : "var(--text-faint)",
        letterSpacing: "0.05em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 0.5rem",
        cursor: "default",
        transition: "color 0.2s ease"
      }}
    >
      {format(time, "HH:mm:ss")}
    </div>
  );
}
