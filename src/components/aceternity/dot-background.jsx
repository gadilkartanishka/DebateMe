import React from "react";

export function DotBackground({ children, className }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(122,158,126,0.25) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        maskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        pointerEvents: "none",
      }}
    />
  );
}
