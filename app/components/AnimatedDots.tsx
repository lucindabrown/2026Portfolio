"use client";

import { useEffect, useRef, useState } from "react";

const R = 13;         // circle radius
const SPACING = 36;   // distance between pair centers
const FIELD_R = 248;  // overall circular field radius
const CX = 260;       // viewBox center x
const CY = 260;       // viewBox center y
const SEP = 26;       // per-group separation offset (total spread = 2×SEP)

function generatePositions(): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = [];
  for (let y = CY - FIELD_R; y <= CY + FIELD_R; y += SPACING) {
    for (let x = CX - FIELD_R; x <= CX + FIELD_R; x += SPACING) {
      if (Math.sqrt((x - CX) ** 2 + (y - CY) ** 2) <= FIELD_R - R * 2) {
        out.push({ x, y });
      }
    }
  }
  return out;
}

// Generate once at module level — stable across renders
const POSITIONS = generatePositions();

const TRANSITION = "transform 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

export default function AnimatedDots({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="-20 -20 560 560"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{
        filter: active ? "blur(0px)" : "blur(3.5px)",
        transition: "filter 1.4s ease-out",
        overflow: "visible",
      }}
    >
      {/* Blue group — starts shifted left, slides to center */}
      <g
        style={{
          transform: active ? "translateX(0px)" : `translateX(${-SEP}px)`,
          transition: TRANSITION,
        }}
      >
        {POSITIONS.map(({ x, y }, i) => (
          <circle
            key={i}
            cx={x - R / 2}
            cy={y}
            r={R}
            fill="#0092D1"
            fillOpacity={0.61}
            opacity={0.5}
          />
        ))}
      </g>

      {/* Pink group — starts shifted right, slides to center */}
      <g
        style={{
          transform: active ? "translateX(0px)" : `translateX(${SEP}px)`,
          transition: TRANSITION,
        }}
      >
        {POSITIONS.map(({ x, y }, i) => (
          <circle
            key={i}
            cx={x + R / 2}
            cy={y}
            r={R}
            fill="#FF17BF"
            fillOpacity={0.60}
            opacity={0.5}
          />
        ))}
      </g>
    </svg>
  );
}
