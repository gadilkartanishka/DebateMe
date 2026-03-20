import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { C } from "@/lib/theme";

const NAV_ITEMS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Topics", href: "#topics" },
  { label: "Testimonials", href: "#testimonials" },
];

export function Header({ onStartSetup }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastY.current;
    setHidden(diff > 5 && latest > 100);
    setScrolled(latest > 30);
    lastY.current = latest;
  });

  function handleNav(e, href) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 32px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? "rgba(14, 15, 14, 0.75)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.8)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.8)" : "none",
        borderBottom: scrolled
          ? `1px solid ${C.border}`
          : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 24,
            height: 24,
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              border: `1.5px solid ${C.sage}`,
              borderRadius: 5,
              transform: "rotate(-9deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              border: `1.5px solid ${C.sageMid}`,
              borderRadius: 5,
              transform: "rotate(9deg)",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20,
            fontWeight: 600,
            color: C.white,
            letterSpacing: 0.3,
          }}
        >
          DebateMe
        </span>
      </div>

      {/* Nav links */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        {NAV_ITEMS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleNav(e, href)}
            style={{
              color: C.textSec,
              fontSize: 14,
              fontWeight: 400,
              textDecoration: "none",
              transition: "color 0.2s",
              letterSpacing: 0.2,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.white)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.textSec)}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <button
        onClick={onStartSetup}
        style={{
          padding: "9px 22px",
          borderRadius: 8,
          background: `linear-gradient(135deg, ${C.sage}, #6a9a68)`,
          color: "#0e0f0e",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: 0.4,
          border: "none",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = `0 4px 20px ${C.sageDim}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        Start Debating
      </button>
    </motion.header>
  );
}
