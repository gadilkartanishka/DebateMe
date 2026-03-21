import { useState, useRef } from "react";
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
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 20,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      {/* Iridescent glow behind the pill */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "85%",
          height: "200%",
          background: scrolled
            ? `radial-gradient(ellipse at 50% 50%, rgba(122,158,126,0.45) 0%, rgba(122,158,126,0.20) 50%, transparent 100%)`
            : `radial-gradient(ellipse at 50% 50%, rgba(122,158,126,0.25) 0%, rgba(122,158,126,0.10) 50%, transparent 100%)`,
          filter: "blur(22px)",
          borderRadius: "999px",
          transition: "all 0.4s",
          pointerEvents: "none",
        }}
      />

      {/* The pill itself */}
      <motion.nav
        style={{
          pointerEvents: "all",
          display: "flex",
          alignItems: "center",
          width: "80%",
          maxWidth: 1200,
          height: 60,
          paddingLeft: 28,
          paddingRight: 16,
          borderRadius: 999,
          background: scrolled
            ? "rgba(22, 24, 26, 0.82)"
            : "rgba(22, 24, 26, 0.55)",
          backdropFilter: "blur(24px) saturate(1.6)",
          WebkitBackdropFilter: "blur(24px) saturate(1.6)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
          transition: "background 0.3s, box-shadow 0.3s",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle inner shine at top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              position: "relative",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                border: `1.5px solid ${C.sage}`,
                borderRadius: 4,
                transform: "rotate(-9deg)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                border: `1.5px solid ${C.sageMid}`,
                borderRadius: 4,
                transform: "rotate(9deg)",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 18,
              fontWeight: 600,
              color: C.white,
              letterSpacing: 0.3,
              whiteSpace: "nowrap",
            }}
          >
            DebateMe
          </span>
        </div>

        {/* Nav links — absolutely centered in the pill */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {NAV_ITEMS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNav(e, href)}
              style={{
                color: C.textSec,
                fontSize: 13,
                fontWeight: 400,
                textDecoration: "none",
                transition: "color 0.2s, background 0.2s",
                letterSpacing: 0.2,
                padding: "6px 16px",
                borderRadius: 999,
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = C.white;
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = C.textSec;
                e.currentTarget.style.background = "transparent";
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Buttons — pushed to the right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginLeft: "auto",
          }}
        >
          {/* Log In */}
          <button
            onClick={onStartSetup}
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              background: "transparent",
              color: C.textSec,
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: 0.3,
              border: "1px solid rgba(255,255,255,0.12)",
              cursor: "pointer",
              transition: "all 0.25s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${C.sage}, #60a5fa)`;
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "transparent";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = C.textSec;
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            Log In
          </button>

          {/* Sign Up */}
          <button
            onClick={onStartSetup}
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              background: C.sage,
              color: C.bg,
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: 0.3,
              border: "none",
              cursor: "pointer",
              transition: "all 0.25s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${C.sage}, #60a5fa)`;
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = C.sage;
              e.currentTarget.style.color = C.bg;
            }}
          >
            Sign Up
          </button>
        </div>
      </motion.nav>
    </motion.div>
  );
}
