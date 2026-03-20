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

import { AnimatedCounter } from "@/components/aceternity/animated-counter";
import { BentoGrid, BentoCard } from "@/components/aceternity/bento-grid";
import { InfiniteMarquee } from "@/components/aceternity/infinite-marquee";
import { Spotlight } from "@/components/aceternity/spotlight";
import { BackgroundBeams } from "@/components/aceternity/background-beams";

import { C } from "@/lib/theme";
import { SectionLabel } from "./SectionLabel";
import HeroVisual from "./HeroVisual";

/* ───────────────────── DATA ───────────────────── */

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

const TOPICS_ROW_1 = [
  "Artificial Intelligence",
  "Climate Change Policy",
  "Cryptocurrency Regulation",
  "Gene Editing Ethics",
  "Nuclear Energy",
  "Student Debt Forgiveness",
  "Mars Colonization",
  "Social Media Censorship",
];

const TOPICS_ROW_2 = [
  "Universal Basic Income",
  "Electric Vehicle Mandates",
  "Remote Work Future",
  "Space Debris",
  "Privacy in the Digital Age",
  "Renewable Energy Subsidies",
  "AI in Healthcare",
  "The 4-Day Work Week",
];

/* ───────────────────── COMPONENT ───────────────────── */

export function Landing({ onStartSetup }) {
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
        <HeroVisual />

        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(14, 15, 14, 0.4) 0%, ${C.bg} 100%)`,
            zIndex: 1
          }}
        />

        {/* Hero headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            textAlign: "center",
            maxWidth: 800,
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ marginBottom: 24 }}
          >
            <SectionLabel>The Arena of Reason</SectionLabel>
          </motion.div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(60px, 10vw, 100px)",
              fontWeight: 600,
              color: C.white,
              lineHeight: 0.95,
              letterSpacing: -2,
              marginBottom: 16,
            }}
          >
            Argue your <br />
            <span style={{ color: C.sage, fontStyle: "italic" }}>position.</span>
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p
              style={{
                color: C.textSec,
                fontSize: "clamp(16px, 2vw, 20px)",
                lineHeight: 1.6,
                fontWeight: 300,
                maxWidth: 500,
                margin: "24px auto 48px",
                letterSpacing: 0.2
              }}
            >
              Face an AI that finds every flaw in your logic. 
              Sharpen your mind in the ultimate debate simulator.
            </p>

            <motion.button
              onClick={onStartSetup}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "18px 48px",
                borderRadius: 14,
                background: `linear-gradient(135deg, ${C.sage}, #0284c7)`,
                color: "#0e0f0e",
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: 0.5,
                border: "none",
                cursor: "pointer",
                boxShadow: `0 10px 40px ${C.sageGlow}`,
              }}
            >
              Start Debating
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: 24,
              height: 40,
              borderRadius: 12,
              border: `1.5px solid ${C.border}`,
              display: "flex",
              justifyContent: "center",
              paddingTop: 8,
            }}
          >
            <div
              style={{
                width: 2,
                height: 8,
                borderRadius: 1,
                background: C.sageMid,
              }}
            />
          </motion.div>
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
                    background: `linear-gradient(135deg, ${C.sage}, #0284c7)`,
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

      {/* ═══════════════ TRENDING TOPICS ═══════════════ */}
      <section
        id="topics"
        style={{
          padding: "100px 0",
          background: C.bg,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 50, padding: "0 24px" }}
        >
          <SectionLabel>Trending Topics</SectionLabel>
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
            What the world is{" "}
            <span style={{ color: C.sage, fontStyle: "italic" }}>debating</span>
          </h2>
        </motion.div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            width: "100%",
          }}
        >
          <InfiniteMarquee items={TOPICS_ROW_1} direction="left" speed={35} />
          <InfiniteMarquee items={TOPICS_ROW_2} direction="right" speed={40} />
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section
        style={{
          padding: "120px 24px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <Spotlight fill="rgba(143,170,139,0.08)" />

        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(circle at 50% 50%, ${C.sageGlow} 0%, transparent 70%)`,
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 54,
              fontWeight: 600,
              color: C.white,
              letterSpacing: -1,
              marginBottom: 16,
            }}
          >
            Ready to defend{" "}
            <span style={{ color: C.sage, fontStyle: "italic" }}>
              your ideas?
            </span>
          </h2>
          <p
            style={{
              color: C.textSec,
              fontSize: 17,
              fontWeight: 300,
              maxWidth: 480,
              margin: "0 auto 40px",
              lineHeight: 1.6,
            }}
          >
            Jump in and challenge yourself against an AI that won't go easy on
            you.
          </p>

          <button
            onClick={onStartSetup}
            style={{
              padding: "16px 36px",
              borderRadius: 12,
              background: `linear-gradient(135deg, ${C.sage}, #0284c7)`,
              color: "#0e0f0e",
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: 0.4,
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              e.currentTarget.style.boxShadow = `0 10px 30px ${C.sageDim}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Start Your First Debate
          </button>
        </motion.div>
      </section>
    </div>
  );
}
