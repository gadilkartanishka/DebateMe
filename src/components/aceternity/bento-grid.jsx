import { motion } from "framer-motion";
import { C } from "@/lib/theme";

export function BentoGrid({ children, className = "" }) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 20,
        maxWidth: 1100,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  icon,
  title,
  description,
  colSpan = 1,
  rowSpan = 1,
  index = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "32px 28px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = C.sageMid;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.border;
      }}
    >
      {/* Top glow on hover */}
      <div
        style={{
          position: "absolute",
          top: -1,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${C.sage}, transparent)`,
          opacity: 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
        className="bento-glow"
      />
      <div
        style={{
          fontSize: 28,
          marginBottom: 16,
          color: C.sage,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: 17,
          fontWeight: 500,
          color: C.white,
          marginBottom: 8,
          letterSpacing: -0.2,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 14,
          color: C.textSec,
          lineHeight: 1.7,
          fontWeight: 300,
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}
