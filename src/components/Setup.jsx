import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, Target, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MovingBorder } from "@/components/aceternity/moving-border";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { Spotlight } from "@/components/aceternity/spotlight";
import { C } from "@/lib/theme";
import { SectionLabel } from "./SectionLabel";

export function Setup({ onStart, onBack }) {
  const [topic, setTopic] = useState("");
  const [pos, setPos] = useState("");
  const [err, setErr] = useState("");

  function go() {
    if (!topic.trim()) {
      setErr("Please enter a topic to debate.");
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
    <div style={{ 
      minHeight: "100vh", 
      background: C.bg, 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      position: "relative",
      overflow: "hidden"
    }}>
      <BackgroundBeams />
      <Spotlight fill="rgba(168,162,248,0.1)" />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        style={{
          position: "absolute",
          top: 32,
          left: 32,
          background: "transparent",
          border: "none",
          color: C.textSec,
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          fontSize: 14,
          zIndex: 10
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = C.white)}
        onMouseLeave={(e) => (e.currentTarget.style.color = C.textSec)}
      >
        <ArrowLeft size={18} /> Back to Home
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: 540, position: "relative", zIndex: 1 }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 48, 
            fontWeight: 600, 
            color: C.white,
            marginBottom: 12,
            letterSpacing: -1
          }}>
            Prepare for <span style={{ color: C.sage, fontStyle: "italic" }}>Battle</span>
          </h1>
          <p style={{ color: C.textSec, fontSize: 16, fontWeight: 300 }}>
            Enter your topic and position to face the most advanced debate AI.
          </p>
        </div>

        <Card style={{ 
          background: C.surface, 
          border: `1px solid ${C.border}`,
          borderRadius: 20,
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
        }}>
          <CardContent style={{ padding: 40 }}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Target size={16} style={{ color: C.sage }} />
                <SectionLabel style={{ marginBottom: 0 }}>Debate Topic</SectionLabel>
              </div>
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
                  fontSize: 16,
                  height: 56,
                  padding: "0 20px",
                  borderRadius: 12
                }}
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <MessageSquare size={16} style={{ color: C.sage }} />
                <SectionLabel style={{ marginBottom: 0 }}>Your Position</SectionLabel>
              </div>
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
                  fontSize: 16,
                  height: 56,
                  padding: "0 20px",
                  borderRadius: 12
                }}
              />
            </div>

            {err && (
              <Alert style={{
                background: "#a86a6a11",
                border: "1px solid #a86a6a44",
                marginBottom: 24,
                borderRadius: 10
              }}>
                <AlertDescription style={{ color: "#a86a6a" }}>
                  {err}
                </AlertDescription>
              </Alert>
            )}

            <MovingBorder
              onClick={go}
              style={{
                width: "100%",
                padding: "16px",
                background: C.sage,
                color: C.white,
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: 0.5,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10
              }}
            >
              Enter Arena
            </MovingBorder>
          </CardContent>
        </Card>

        <div style={{ marginTop: 40, textAlign: "center", display: "flex", justifyContent: "center", gap: 32 }}>
           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ color: C.sageMid, fontSize: 12, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Strategy</div>
              <div style={{ color: C.textMut, fontSize: 13 }}>Fact-based arguments</div>
           </div>
           <div style={{ width: 1, height: 40, background: C.border }} />
           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ color: C.sageMid, fontSize: 12, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Difficulty</div>
              <div style={{ color: C.textMut, fontSize: 13 }}>Adaptive / Hard</div>
           </div>
           <div style={{ width: 1, height: 40, background: C.border }} />
           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ color: C.sageMid, fontSize: 12, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>AI Model</div>
              <div style={{ color: C.textMut, fontSize: 13 }}>GPT-4 Grounded</div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
