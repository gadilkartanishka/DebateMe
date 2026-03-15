import { useState, useRef, useEffect } from "react";
import { getWikiReferences, getOpponentResponse, getDynamicContext } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { C } from "@/lib/theme";
import { ScorePill } from "./ScorePill";
import { Dots } from "./Dots";
import { AssistPanel } from "./AssistPanel";

export function Arena({ topic, position, onBack }) {
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
  const [strengthened, setStrengthened] = useState("");
  const [strengthening, setStrengthening] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  const [wikiReferences, setWikiReferences] = useState([]);
  const [dynamicContext, setDynamicContext] = useState(null);

  useEffect(() => {
    async function fetchWiki() {
      const refs = await getWikiReferences(topic, position);
      setWikiReferences(refs);
    }
    fetchWiki();
  }, [topic, position]);

  useEffect(() => {
    if (!input.trim() || input.trim().length < 20) {
      setDynamicContext(null);
      return;
    }
    const timer = setTimeout(async () => {
      const dyn = await getDynamicContext(topic, position, input);
      if (dyn) setDynamicContext(dyn);
    }, 1500);
    return () => clearTimeout(timer);
  }, [input, topic, position]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function send() {
    if (!input.trim() || sending) return;
    const txt = input.trim();
    setInput("");
    setSending(true);

    try {
      const response = await getOpponentResponse(topic, position, messages, txt);
      
      setScores((p) => [...p, response.score]);
      setMessages((p) => [
        ...p,
        {
          role: "user",
          content: txt,
          score: response.score,
          feedback: response.feedback,
        },
        {
          role: "assistant",
          content: response.rebuttal,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((p) => [
        ...p,
        {
          role: "user",
          content: txt,
          score: null,
          feedback: "Error capturing argument.",
        },
        {
          role: "assistant",
          content: "I am having trouble connecting to my knowledge base. Please check your API key and try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
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
              padding: "13px 16px",
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

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
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

        <AssistPanel
          topic={topic}
          position={position}
          wikiReferences={wikiReferences}
          dynamicContext={dynamicContext}
          input={input}
          setInput={setInput}
          strengthened={strengthened}
          setStrengthened={setStrengthened}
          strengthening={strengthening}
          setStrengthening={setStrengthening}
          scores={scores}
          avg={avg}
        />
      </div>
    </div>
  );
}
