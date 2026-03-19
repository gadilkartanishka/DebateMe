import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Zap,
  Target,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect";
import { MovingBorder } from "@/components/aceternity/moving-border";
import { Spotlight } from "@/components/aceternity/spotlight";

import { C } from "@/lib/theme";
import { SectionLabel } from "./SectionLabel";

/* ───────────────────── DATA ───────────────────── */

const SUGGESTIONS = [
  "Artificial intelligence",
  "Remote work",
  "Social media",
  "Space exploration",
  "Universal basic income",
  "Electric vehicles",
];

const HOW_IT_WORKS = [
  {
    icon: <Target size={28} />,
    step: "01",
    title: "Pick a Topic",
    desc: "Choose from trending debates or bring your own controversial take to the table.",
  },
  {
    icon: <MessageSquare size={28} />,
    step: "02",
    title: "State Your Position",
    desc: "Tell us what you believe and why. The stronger your conviction, the better the debate.",
  },
  {
    icon: <Zap size={28} />,
    step: "03",
    title: "Debate the AI",
    desc: "Our AI opponent finds every weakness in your argument. Can you hold your ground?",
  },
];

/* ───────────────────── COMPONENT ───────────────────── */

export function Landing({ onStart }) {
  const [topic, setTopic] = useState("");
  const [pos, setPos] = useState("");
  const [err, setErr] = useState("");

  function go() {
    if (!topic.trim()) {
      setErr("Please enter a topic.");
      return;
    }
    if (!pos.trim()) {
      setErr("Please state your position.");
      return;
    }
    setErr("");
    onStart(topic.trim(), pos.trim());
  }

  return (
    <div style={{ background: C.bg, overflowX: "hidden" }}>
      {/* ════════════════════ HERO SECTION ════════════════════ */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <BackgroundBeams />
        <Spotlight fill="rgba(143,170,139,0.06)" />

        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(ellipse 55% 40% at 50% 0%, ${C.sageGlow} 0%, transparent 70%)`,
          }}
        />

        {/* Hero headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            marginBottom: 50,
            maxWidth: 600,
            position: "relative",
          }}
        >
          <TextGenerateEffect
            words="Argue your position."
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 60,
              fontWeight: 600,
              color: C.white,
              lineHeight: 1.08,
              letterSpacing: -0.5,
              marginBottom: 8,
              display: "block",
            }}
          />
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 60,
              fontWeight: 600,
              color: C.sage,
              lineHeight: 1.08,
              letterSpacing: -0.5,
              fontStyle: "italic",
              marginBottom: 24,
            }}
          >
            Defend it.
          </h1>
          <p
            style={{
              color: C.textSec,
              fontSize: 16,
              lineHeight: 1.8,
              fontWeight: 300,
              maxWidth: 420,
              margin: "0 auto",
            }}
          >
            State your opinion. An AI takes the hardest opposing stance and
            won't let you off easy. Sharpen your mind.
          </p>
        </motion.div>

        {/* Hero form */}
        <motion.div
          id="hero-form"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            width: "100%",
            maxWidth: 480,
            position: "relative",
            marginBottom: 28,
          }}
        >
          <Card
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
            }}
          >
            <CardContent style={{ padding: 30 }}>
              <div style={{ marginBottom: 18 }}>
                <SectionLabel>Debate Topic</SectionLabel>
                <Input
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                    setErr("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && go()}
                  placeholder="e.g. Artificial intelligence, Remote work…"
                  style={{
                    background: C.surfaceHi,
                    border: `1px solid ${C.border}`,
                    color: C.textPri,
                    fontSize: 15,
                    fontWeight: 300,
                    height: 52,
                    padding: "0 18px",
                  }}
                />
              </div>
              <div style={{ marginBottom: 22 }}>
                <SectionLabel>Your Position</SectionLabel>
                <Input
                  value={pos}
                  onChange={(e) => {
                    setPos(e.target.value);
                    setErr("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && go()}
                  placeholder="e.g. AI will create more jobs than it destroys"
                  style={{
                    background: C.surfaceHi,
                    border: `1px solid ${C.border}`,
                    color: C.textPri,
                    fontSize: 15,
                    fontWeight: 300,
                    height: 52,
                    padding: "0 18px",
                  }}
                />
              </div>

              {err && (
                <Alert
                  style={{
                    background: "#a86a6a11",
                    border: "1px solid #a86a6a44",
                    marginBottom: 16,
                    borderRadius: 8,
                    padding: "12px 16px",
                  }}
                >
                  <AlertDescription
                    style={{ color: "#a86a6a", fontSize: 13 }}
                  >
                    {err}
                  </AlertDescription>
                </Alert>
              )}

              <MovingBorder
                onClick={go}
                style={{
                  width: "100%",
                  padding: "13px",
                  background: C.sage,
                  color: "#0e0f0e",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: 0.4,
                  border: "none",
                }}
              >
                Begin Debate
              </MovingBorder>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            textAlign: "center",
            marginBottom: 48,
            position: "relative",
          }}
        >
          <SectionLabel>Try one of these</SectionLabel>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
              maxWidth: 700,
            }}
          >
            {SUGGESTIONS.map((s) => (
              <Badge
                key={s}
                onClick={() => setTopic(s)}
                variant="outline"
                style={{
                  cursor: "pointer",
                  padding: "0 20px",
                  borderRadius: 28,
                  border: `1px solid ${C.border}`,
                  color: C.textSec,
                  fontSize: 13,
                  fontWeight: 300,
                  background: "transparent",
                  transition: "all 0.18s",
                  letterSpacing: 0.3,
                  height: 34,
                  display: "inline-flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.sageMid;
                  e.currentTarget.style.color = C.sage;
                  e.currentTarget.style.background = C.sageDim;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.color = C.textSec;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {s}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div
            style={{
              width: 24,
              height: 38,
              borderRadius: 12,
              border: `1.5px solid ${C.border}`,
              display: "flex",
              justifyContent: "center",
              paddingTop: 8,
            }}
          >
            <div
              style={{
                width: 3,
                height: 8,
                borderRadius: 2,
                background: C.sageMid,
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section
        id="how-it-works"
        style={{
          padding: "120px 24px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <SectionLabel>How It Works</SectionLabel>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 44,
              fontWeight: 600,
              color: C.white,
              letterSpacing: -0.5,
              marginBottom: 12,
            }}
          >
            Three steps to a{" "}
            <span style={{ color: C.sage, fontStyle: "italic" }}>
              sharper mind
            </span>
          </h2>
          <p
            style={{
              color: C.textSec,
              fontSize: 16,
              fontWeight: 300,
              maxWidth: 460,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            No signup walls. No complex setup. Just pick a topic and start
            debating in seconds.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{
                padding: "36px 28px",
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                background: C.surface,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -1,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${C.sageMid}, transparent)`,
                }}
              />
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: C.sage,
                  letterSpacing: 2,
                  marginBottom: 20,
                  textTransform: "uppercase",
                }}
              >
                Step {item.step}
              </div>
              <div style={{ color: C.sage, marginBottom: 14 }}>
                {item.icon}
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  color: C.white,
                  marginBottom: 10,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: C.textSec,
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
