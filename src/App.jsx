import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect";
import { MovingBorder } from "@/components/aceternity/moving-border";

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  bg: "#0e0f0e",
  surface: "#161714",
  surfaceHi: "#1e1f1c",
  border: "#252623",
  borderSub: "#1c1d1a",
  sage: "#8faa8b",
  sageDim: "#8faa8b22",
  sageMid: "#8faa8b55",
  sageGlow: "#8faa8b0d",
  textPri: "#e8e6e0",
  textSec: "#9a9890",
  textMut: "#5a5a55",
  white: "#f5f3ee",
};

// ── Global styles ─────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    height: 100%;
    background: ${C.bg};
    color: ${C.textPri};
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
  ::selection { background: ${C.sageMid}; color: ${C.white}; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50%       { opacity: 1; }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(8px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .fu  { animation: fadeUp 0.55s ease both; }
  .fu1 { animation: fadeUp 0.55s 0.12s ease both; }
  .fu2 { animation: fadeUp 0.55s 0.24s ease both; }
  .fu3 { animation: fadeUp 0.55s 0.38s ease both; }
  .fu4 { animation: fadeUp 0.55s 0.52s ease both; }
  .msg { animation: fadeUp 0.35s ease both; }
  .tab-body { animation: slideIn 0.25s ease both; }

  /* shadcn overrides — map to our dark sage theme */
  :root {
    --background: 82 6% 6%;
    --foreground: 60 5% 90%;
    --card: 82 5% 9%;
    --card-foreground: 60 5% 90%;
    --border: 80 4% 14%;
    --input: 80 4% 14%;
    --primary: 112 14% 60%;
    --primary-foreground: 82 6% 6%;
    --secondary: 82 5% 11%;
    --secondary-foreground: 60 5% 60%;
    --muted: 82 5% 11%;
    --muted-foreground: 60 4% 36%;
    --accent: 112 14% 60%;
    --accent-foreground: 82 6% 6%;
    --ring: 112 14% 60%;
    --radius: 0.625rem;
  }

  input, textarea, button { font-family: 'DM Sans', sans-serif !important; }
  input:focus, textarea:focus { outline: none; }
`;

// ── Atoms ─────────────────────────────────────────────────────────────────────

function ScorePill({ score }) {
  const color = score >= 8 ? C.sage : score >= 5 ? "#c8a96e" : "#a86a6a";
  return (
    <Badge
      style={{
        background: `${color}11`,
        border: `1px solid ${color}44`,
        color,
        fontSize: 12,
        fontWeight: 500,
        padding: "3px 11px",
        borderRadius: 20,
      }}
    >
      {score}
      <span style={{ color: C.textMut, fontSize: 10, marginLeft: 3 }}>/10</span>
    </Badge>
  );
}

function Dots() {
  return (
    <div style={{ display: "flex", gap: 5, padding: "4px 0" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: C.sage,
            animation: `pulse 1.4s ${i * 0.22}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p
      style={{
        color: C.textMut,
        fontSize: 10,
        letterSpacing: 2,
        textTransform: "uppercase",
        marginBottom: 10,
      }}
    >
      {children}
    </p>
  );
}

// ── Landing ───────────────────────────────────────────────────────────────────

function Landing({ onStart }) {
  const [topic, setTopic] = useState("");
  const [pos, setPos] = useState("");
  const [err, setErr] = useState("");

  const suggestions = [
    "Artificial intelligence",
    "Remote work",
    "Social media",
    "Space exploration",
    "Universal basic income",
    "Electric vehicles",
  ];

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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Aceternity — animated background beams */}
      <BackgroundBeams />

      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse 55% 40% at 50% 0%, ${C.sageGlow} 0%, transparent 70%)`,
        }}
      />

      {/* Wordmark */}
      <div
        className="fu"
        style={{ marginBottom: 56, textAlign: "center", position: "relative" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
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
              fontSize: 22,
              fontWeight: 600,
              color: C.white,
              letterSpacing: 0.3,
            }}
          >
            DebateMe
          </span>
        </div>
        <p
          style={{
            color: C.textMut,
            fontSize: 10,
            letterSpacing: 2.5,
            textTransform: "uppercase",
          }}
        >
          AI Sparring Partner
        </p>
      </div>

      {/* Hero — Aceternity TextGenerateEffect */}
      <div
        className="fu1"
        style={{
          textAlign: "center",
          marginBottom: 50,
          maxWidth: 520,
          position: "relative",
        }}
      >
        <TextGenerateEffect
          words="Argue your position."
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 54,
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
            fontSize: 54,
            fontWeight: 600,
            color: C.sage,
            lineHeight: 1.08,
            letterSpacing: -0.5,
            fontStyle: "italic",
            marginBottom: 22,
          }}
        >
          Defend it.
        </h1>
        <p
          style={{
            color: C.textSec,
            fontSize: 15,
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: 380,
            margin: "0 auto",
          }}
        >
          State your opinion. An AI takes the hardest opposing stance and won't
          let you off easy.
        </p>
      </div>

      {/* Form — shadcn Card + Input + Button */}
      <div
        className="fu2"
        style={{
          width: "100%",
          maxWidth: 460,
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
              {/* shadcn Input */}
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
              {/* shadcn Input */}
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
              /* shadcn Alert */
              <Alert
                style={{
                  background: "#a86a6a11",
                  border: "1px solid #a86a6a44",
                  marginBottom: 16,
                  borderRadius: 8,
                }}
              >
                <AlertDescription style={{ color: "#a86a6a", fontSize: 13 }}>
                  {err}
                </AlertDescription>
              </Alert>
            )}

            {/* Aceternity MovingBorder button */}
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
      </div>

      {/* Suggestions — shadcn Badge as chips */}
      <div
        className="fu3"
        style={{ textAlign: "center", marginBottom: 52, position: "relative" }}
      >
        <SectionLabel>Try one of these</SectionLabel>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            maxWidth: 720,
          }}
        >
          {suggestions.map((s) => (
            <Badge
              key={s}
              onClick={() => setTopic(s)}
              variant="outline"
              style={{
                cursor: "pointer",
                padding: "0 22px",
                borderRadius: 28,
                border: `1px solid ${C.border}`,
                color: C.textSec,
                fontSize: 13,
                fontWeight: 300,
                background: "transparent",
                transition: "all 0.18s",
                letterSpacing: 0.3,
                height: 35,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
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
      </div>

      {/* Feature row */}
      <div
        className="fu4"
        style={{
          display: "flex",
          gap: 36,
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {[
          ["⊕", "Wikipedia context"],
          ["◈", "Word strengthener"],
          ["◎", "Argument scoring"],
        ].map(([icon, label]) => (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: 7 }}
          >
            <span style={{ color: C.sage, fontSize: 13 }}>{icon}</span>
            <span style={{ color: C.textMut, fontSize: 13, fontWeight: 300 }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Debate Arena ──────────────────────────────────────────────────────────────

function Arena({ topic, position, onBack }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Your position has been noted. I disagree — and I intend to prove why. Make your opening argument.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [scores, setScores] = useState([]);
  const [wordSearch, setWordSearch] = useState("");
  const [wordResults, setWordResults] = useState([
    "compelling",
    "persuasive",
    "cogent",
    "forceful",
    "articulate",
    "lucid",
    "trenchant",
    "incisive",
  ]);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  // Placeholder data — APIs wired in next step
  const wikiText = `This topic has been the subject of extensive academic and public discourse. Scholars across disciplines have examined evidence from multiple angles, arriving at nuanced conclusions that challenge simplistic narratives on either side of the debate.`;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  function send() {
    if (!input.trim() || sending) return;
    const txt = input.trim();
    setInput("");
    const score = Math.floor(Math.random() * 4) + 5;
    setScores((p) => [...p, score]);
    setMessages((p) => [
      ...p,
      {
        role: "user",
        content: txt,
        score,
        feedback:
          "Good use of evidence — try anticipating the counter-argument.",
      },
    ]);
    setSending(true);
    setTimeout(() => {
      setMessages((p) => [
        ...p,
        {
          role: "assistant",
          content:
            "That's a surface-level reading. The data you're implying doesn't account for confounding variables — and even if it did, correlation isn't causation. You'll need to do better.",
        },
      ]);
      setSending(false);
    }, 1400);
  }

  const avg = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : null;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Topbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "0 28px",
          height: 54,
          flexShrink: 0,
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        {/* shadcn Button ghost */}
        <Button
          variant="ghost"
          onClick={onBack}
          style={{
            color: C.textMut,
            fontSize: 13,
            fontWeight: 300,
            padding: "0 8px",
            height: 32,
          }}
        >
          ← Back
        </Button>

        <div style={{ width: 1, height: 20, background: C.border }} />

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 12,
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 17,
              fontWeight: 600,
              color: C.white,
              whiteSpace: "nowrap",
            }}
          >
            {topic}
          </span>
          {/* shadcn Badge for position */}
          <Badge
            style={{
              background: C.sageDim,
              border: `1px solid ${C.sageMid}`,
              color: C.sage,
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: 0.3,
              maxWidth: 280,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              padding: "3px 12px",
              borderRadius: 20,
            }}
          >
            {position}
          </Badge>
        </div>

        {avg && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                color: C.textMut,
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Avg
            </span>
            <ScorePill score={avg} />
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Chat column */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "36px 44px",
              display: "flex",
              flexDirection: "column",
              gap: 30,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className="msg"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                    flexDirection: m.role === "user" ? "row-reverse" : "row",
                  }}
                >
                  {m.role === "assistant" && (
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: C.textMut,
                      }}
                    />
                  )}
                  <span
                    style={{
                      color: m.role === "user" ? C.sage : C.textMut,
                      fontSize: 10,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                    }}
                  >
                    {m.role === "user" ? "You" : "Opponent"}
                  </span>
                </div>

                {/* shadcn Card for message bubbles */}
                <Card
                  style={{
                    maxWidth: "62%",
                    background: m.role === "user" ? C.surfaceHi : C.surface,
                    border: `1px solid ${m.role === "user" ? C.border : C.borderSub}`,
                    borderRadius:
                      m.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                  }}
                >
                  <CardContent style={{ padding: "16px 20px" }}>
                    <p
                      style={{
                        color: C.textPri,
                        fontSize: 15,
                        fontWeight: 300,
                        lineHeight: 1.78,
                        margin: 0,
                      }}
                    >
                      {m.content}
                    </p>
                  </CardContent>
                </Card>

                {m.role === "user" && m.score != null && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 8,
                    }}
                  >
                    <ScorePill score={m.score} />
                    <span
                      style={{
                        color: C.textMut,
                        fontSize: 12,
                        fontStyle: "italic",
                        fontWeight: 300,
                      }}
                    >
                      {m.feedback}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {sending && (
              <div
                className="msg"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: C.textMut,
                    }}
                  />
                  <span
                    style={{
                      color: C.textMut,
                      fontSize: 10,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                    }}
                  >
                    Opponent
                  </span>
                </div>
                <Card
                  style={{
                    background: C.surface,
                    border: `1px solid ${C.borderSub}`,
                    borderRadius: "16px 16px 16px 4px",
                  }}
                >
                  <CardContent style={{ padding: "16px 20px" }}>
                    <Dots />
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div
            style={{
              padding: "18px 44px 26px",
              borderTop: `1px solid ${C.border}`,
              background: C.surface,
              flexShrink: 0,
            }}
          >
            <Card
              style={{
                background: C.surfaceHi,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
              }}
            >
              <CardContent
                style={{
                  padding: "15px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Make your argument… Enter to send, Shift+Enter for new line."
                  rows={3}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: C.textPri,
                    fontSize: 15,
                    fontWeight: 300,
                    lineHeight: 1.72,
                    resize: "none",
                    width: "100%",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: C.textMut, fontSize: 12 }}>
                    {input.trim()
                      ? `${input.trim().split(/\s+/).length} words`
                      : "Write clearly. Be specific."}
                  </span>
                  {/* shadcn Button */}
                  <Button
                    onClick={send}
                    disabled={!input.trim() || sending}
                    style={{
                      background: input.trim() && !sending ? C.sage : C.border,
                      color: input.trim() && !sending ? "#0e0f0e" : C.textMut,
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 500,
                      letterSpacing: 0.3,
                      height: 34,
                      padding: "0 20px",
                      transition: "all 0.2s",
                    }}
                  >
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Assist panel — shadcn Tabs */}
        <div
          style={{
            width: 290,
            flexShrink: 0,
            borderLeft: `1px solid ${C.border}`,
            background: C.surface,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 18px 0",
              borderBottom: `1px solid ${C.border}`,
              flexShrink: 0,
            }}
          >
            <SectionLabel>Writing Assist</SectionLabel>
          </div>

          <Tabs
            defaultValue="wiki"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <TabsList
              style={{
                background: "transparent",
                borderBottom: `1px solid ${C.border}`,
                borderRadius: 0,
                padding: "0 18px",
                height: 40,
                gap: 0,
                justifyContent: "flex-start",
              }}
            >
              {["wiki", "words", "scores"].map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  style={{
                    background: "transparent",
                    borderRadius: 0,
                    fontSize: 12,
                    letterSpacing: 0.3,
                    padding: "0 14px",
                    height: "100%",
                    color: C.textMut,
                    borderBottom: "2px solid transparent",
                    transition: "all 0.2s",
                  }}
                >
                  {t === "wiki"
                    ? "Context"
                    : t === "words"
                      ? "Words"
                      : "Scores"}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Context tab */}
            <TabsContent
              value="wiki"
              style={{ flex: 1, overflowY: "auto", padding: 18, margin: 0 }}
            >
              <div className="tab-body">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: C.sage,
                    }}
                  />
                  <span
                    style={{
                      color: C.textMut,
                      fontSize: 10,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                    }}
                  >
                    Wikipedia
                  </span>
                </div>
                <p
                  style={{
                    color: C.textSec,
                    fontSize: 13,
                    lineHeight: 1.82,
                    fontWeight: 300,
                    marginBottom: 16,
                  }}
                >
                  {wikiText}
                </p>
                <Card
                  style={{
                    background: C.surfaceHi,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                  }}
                >
                  <CardContent style={{ padding: "11px 13px" }}>
                    <p
                      style={{
                        color: C.textMut,
                        fontSize: 11,
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      Use as background context — not your only source.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Words tab */}
            <TabsContent
              value="words"
              style={{ flex: 1, overflowY: "auto", padding: 18, margin: 0 }}
            >
              <div className="tab-body">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: C.sage,
                    }}
                  />
                  <span
                    style={{
                      color: C.textMut,
                      fontSize: 10,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                    }}
                  >
                    Datamuse
                  </span>
                </div>
                {/* shadcn Input */}
                <Input
                  value={wordSearch}
                  onChange={(e) => setWordSearch(e.target.value)}
                  placeholder="Search a word…"
                  style={{
                    background: C.surfaceHi,
                    border: `1px solid ${C.border}`,
                    color: C.textPri,
                    fontSize: 13,
                    fontWeight: 300,
                    marginBottom: 14,
                    height: 38,
                  }}
                />
                <p style={{ color: C.textMut, fontSize: 11, marginBottom: 10 }}>
                  Click to insert:
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {wordResults.map((w) => (
                    <Badge
                      key={w}
                      onClick={() => setInput((p) => (p ? p + " " + w : w))}
                      variant="outline"
                      style={{
                        cursor: "pointer",
                        padding: "5px 12px",
                        borderRadius: 6,
                        border: `1px solid ${C.border}`,
                        color: C.textSec,
                        fontSize: 12,
                        fontWeight: 300,
                        background: "transparent",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = C.sageMid;
                        e.target.style.color = C.sage;
                        e.target.style.background = C.sageDim;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = C.border;
                        e.target.style.color = C.textSec;
                        e.target.style.background = "transparent";
                      }}
                    >
                      {w}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Scores tab */}
            <TabsContent
              value="scores"
              style={{ flex: 1, overflowY: "auto", padding: 18, margin: 0 }}
            >
              <div className="tab-body">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: C.sage,
                    }}
                  />
                  <span
                    style={{
                      color: C.textMut,
                      fontSize: 10,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                    }}
                  >
                    Argument History
                  </span>
                </div>
                {scores.length === 0 ? (
                  <p
                    style={{
                      color: C.textMut,
                      fontSize: 13,
                      lineHeight: 1.7,
                      fontStyle: "italic",
                    }}
                  >
                    Your scores will appear here as you debate.
                  </p>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        marginBottom: 16,
                      }}
                    >
                      {scores.map((s, i) => (
                        <Card
                          key={i}
                          style={{
                            background: C.surfaceHi,
                            border: `1px solid ${C.border}`,
                            borderRadius: 8,
                          }}
                        >
                          <CardContent
                            style={{
                              padding: "10px 14px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                color: C.textMut,
                                fontSize: 12,
                                fontWeight: 300,
                              }}
                            >
                              Argument {i + 1}
                            </span>
                            <ScorePill score={s} />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {avg && (
                      <Card
                        style={{
                          background: C.sageDim,
                          border: `1px solid ${C.sageMid}`,
                          borderRadius: 8,
                        }}
                      >
                        <CardContent
                          style={{
                            padding: "13px 15px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              color: C.sage,
                              fontSize: 12,
                              letterSpacing: 0.5,
                            }}
                          >
                            Session average
                          </span>
                          <ScorePill score={avg} />
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// ── App shell ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [topic, setTopic] = useState("");
  const [pos, setPos] = useState("");

  function start(t, p) {
    setTopic(t);
    setPos(p);
    setScreen("debate");
  }

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      {screen === "landing" ? (
        <Landing onStart={start} />
      ) : (
        <Arena
          topic={topic}
          position={pos}
          onBack={() => setScreen("landing")}
        />
      )}
    </>
  );
}
