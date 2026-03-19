import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export function Spotlight({ className = "", fill = "rgba(143,170,139,0.08)" }) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "auto",
      }}
    >
      <motion.div
        animate={{ opacity, x: position.x - 300, y: position.y - 300 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${fill} 0%, transparent 70%)`,
          position: "absolute",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
