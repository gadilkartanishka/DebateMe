import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  BarChart3,
  Sparkles,
  Globe,
  RefreshCw,
  Zap,
  TrendingUp,
  Target,
  Quote,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect";
import { MovingBorder } from "@/components/aceternity/moving-border";
import { Spotlight } from "@/components/aceternity/spotlight";
import { AnimatedCounter } from "@/components/aceternity/animated-counter";
import { BentoGrid, BentoCard } from "@/components/aceternity/bento-grid";

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

const FEATURES = [
  {
    icon: <Globe size={26} />,
    title: "Wikipedia-Grounded Context",
    desc: "Every counter-argument is backed by real-world facts and sources, not hallucinations.",
    colSpan: 2,
  },
  {
    icon: <BarChart3 size={26} />,
    title: "Argument Scoring",
    desc: "Get a real-time breakdown of your logic, evidence use, and persuasion effectiveness.",
    colSpan: 1,
  },
  {
    icon: <RefreshCw size={26} />,
    title: "Argument Reframing",
    desc: "Stuck? Get AI suggestions on how to reframe your point for maximum impact.",
    colSpan: 1,
  },
  {
    icon: <Sparkles size={26} />,
    title: "Adaptive Difficulty",
    desc: "The AI calibrates its aggression to your skill level — beginner to expert.",
    colSpan: 1,
  },
  {
    icon: <TrendingUp size={26} />,
    title: "Performance History",
    desc: "Track your debating improvement over time with detailed analytics and insights.",
    colSpan: 1,
  },
];

const STATS = [
  { value: 50000, label: "Debates Completed", suffix: "+" },
  { value: 200000, label: "Arguments Made", suffix: "+" },
  { value: 98, label: "User Satisfaction", suffix: "%" },
  { value: 150, label: "Topics Available", suffix: "+" },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Philosophy Student, Stanford",
    quote:
      "DebateMe sharpened my argumentation skills more in a month than a whole semester of debate class. The AI doesn't let you get away with weak logic.",
    avatar: "SC",
  },
  {
    name: "Marcus Rivera",
    role: "Policy Analyst, Brookings",
    quote:
      "I use it to stress-test policy proposals before presenting them. The counter-arguments it generates are genuinely challenging and insightful.",
    avatar: "MR",
  },
  {
    name: "Aisha Patel",
    role: "Debate Coach, NYU",
    quote:
      "I recommend DebateMe to all my students. The scoring system gives them objective feedback that helps them improve systematically.",
    avatar: "AP",
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

      {/* ═══════════════ FEATURES BENTO ═══════════════ */}
      <section
        id="features"
        style={{
          padding: "100px 24px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${C.sageGlow} 0%, transparent 70%)`,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            marginBottom: 64,
            position: "relative",
          }}
        >
          <SectionLabel>Features</SectionLabel>
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
            Everything you need to{" "}
            <span style={{ color: C.sage, fontStyle: "italic" }}>
              win arguments
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
            Powered by advanced AI and real-world knowledge to push your
            reasoning to the limit.
          </p>
        </motion.div>

        <BentoGrid>
          {FEATURES.map((f, i) => (
            <BentoCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.desc}
              colSpan={f.colSpan}
              index={i}
            />
          ))}
        </BentoGrid>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section
        style={{
          padding: "100px 24px",
          background: C.surface,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.04,
            backgroundImage: `linear-gradient(${C.sage} 1px, transparent 1px), linear-gradient(90deg, ${C.sage} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            position: "relative",
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                textAlign: "center",
                padding: "24px 16px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 48,
                  fontWeight: 600,
                  color: C.sage,
                  marginBottom: 8,
                  letterSpacing: -1,
                }}
              >
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix}
                  duration={2.5}
                />
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: C.textMut,
                  fontWeight: 400,
                  letterSpacing: 0.5,
                }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section
        id="testimonials"
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
          <SectionLabel>Testimonials</SectionLabel>
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
            Loved by{" "}
            <span style={{ color: C.sage, fontStyle: "italic" }}>
              critical thinkers
            </span>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: "32px 28px",
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                background: C.surface,
                position: "relative",
              }}
            >
              <Quote
                size={20}
                style={{
                  color: C.sageMid,
                  marginBottom: 16,
                }}
              />
              <p
                style={{
                  fontSize: 15,
                  color: C.textSec,
                  lineHeight: 1.8,
                  fontWeight: 300,
                  marginBottom: 24,
                  fontStyle: "italic",
                }}
              >
                "{t.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `linear-gradient(135deg, ${C.sage}, #6a9a68)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0e0f0e",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: C.white,
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: C.textMut,
                      fontWeight: 300,
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
