import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

export function MovingBorder({
  children,
  duration = 3000,
  style,
  onClick,
  disabled,
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const progressRef = useRef(0);

  useAnimationFrame((time) => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const perimeter = 2 * (width + height);
    const p = ((time % duration) / duration) * perimeter;

    let x, y;
    if (p < width) {
      x = p;
      y = 0;
    } else if (p < width + height) {
      x = width;
      y = p - width;
    } else if (p < 2 * width + height) {
      x = width - (p - width - height);
      y = height;
    } else {
      x = 0;
      y = height - (p - 2 * width - height);
    }
    setPos({ x, y });
  });

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10,
        ...style,
      }}
    >
      {/* Glowing dot that travels the border */}
      <motion.div
        style={{
          position: "absolute",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(143,170,139,0.9) 0%, rgba(143,170,139,0.3) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
          x: pos.x - 40,
          y: pos.y - 40,
        }}
      />
      {/* Subtle border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 10,
          border: "1px solid rgba(143,170,139,0.25)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      {/* Content */}
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          height: "100%",
          background: "transparent",
          border: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </button>
    </div>
  );
}
