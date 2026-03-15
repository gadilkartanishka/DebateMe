import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect";
import { MovingBorder } from "@/components/aceternity/moving-border";
import { C } from "@/lib/theme";
import { SectionLabel } from "./SectionLabel";

export function Landing({ onStart }) {
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
      <BackgroundBeams />

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse 55% 40% at 50% 0%, ${C.sageGlow} 0%, transparent 70%)`,
        }}
      />

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
                <AlertDescription style={{ color: "#a86a6a", fontSize: 13 }}>
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
      </div>

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
          ["◈", "Argument reframer"],
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
