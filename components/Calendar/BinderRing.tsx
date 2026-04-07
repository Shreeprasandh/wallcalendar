"use client";

interface BinderRingProps {
  onRingClick: (monthIndex: number) => void;
  currentMonthIndex: number;
}

export default function BinderRing({ onRingClick, currentMonthIndex }: BinderRingProps) {
  const rings = Array.from({ length: 12 });
  return (
    <div className="binder-ring-bar">
      {rings.map((_, i) => (
        <button
          key={i}
          className="ring"
          onClick={() => onRingClick(i)}
          aria-label={`Jump to month ${i + 1}`}
          title={`Jump to month ${i + 1}`}
          style={{
            cursor: "pointer",
            padding: 0,
            transition: "all 0.2s",
            opacity: 1, // force 1 opacity for all as requested
            transform: "scale(1)"
          }}
        />
      ))}
    </div>
  );
}
