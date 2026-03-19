import { C } from "@/lib/theme";
import {
  Github,
  Twitter,
  MessageCircle,
} from "lucide-react";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Start a Debate", href: "#" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Debate Guide", href: "#" },
      { label: "Argument Tips", href: "#" },
      { label: "Blog", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: Twitter, label: "X / Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: MessageCircle, label: "Discord", href: "#" },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${C.border}`,
        background: C.bg,
        padding: "60px 32px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: 48,
        }}
      >
        {/* Brand Column */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
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
              }}
            >
              DebateMe
            </span>
          </div>
          <p
            style={{
              color: C.textMut,
              fontSize: 14,
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: 260,
              marginBottom: 24,
            }}
          >
            Sharpen your reasoning. Debate any topic against an AI that never
            backs down.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: `1px solid ${C.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.textMut,
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.sageMid;
                  e.currentTarget.style.color = C.sage;
                  e.currentTarget.style.background = C.sageDim;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.color = C.textMut;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {COLUMNS.map(({ title, links }) => (
          <div key={title}>
            <p
              style={{
                color: C.textMut,
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 20,
                fontWeight: 500,
              }}
            >
              {title}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    color: C.textSec,
                    fontSize: 14,
                    fontWeight: 300,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = C.white)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = C.textSec)
                  }
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          borderTop: `1px solid ${C.border}`,
          marginTop: 48,
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            color: C.textMut,
            fontSize: 13,
            fontWeight: 300,
          }}
        >
          © 2026 DebateMe. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Cookies"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                color: C.textMut,
                fontSize: 13,
                fontWeight: 300,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = C.textSec)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = C.textMut)
              }
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
