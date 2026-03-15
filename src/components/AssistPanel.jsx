import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { C } from "@/lib/theme";
import { SectionLabel } from "./SectionLabel";
import { reframeArgument } from "@/services/api";
import { ScorePill } from "./ScorePill";

export function AssistPanel({
  topic,
  position,
  wikiReferences,
  dynamicContext,
  input,
  setInput,
  strengthened,
  setStrengthened,
  strengthening,
  setStrengthening,
  scores,
  avg,
}) {
  return (
    <div
      style={{
        width: "30%",
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
        defaultValue="references"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TabsList
          variant="line"
          style={{
            width: "100%",
            background: "transparent",
            borderBottom: `1px solid ${C.border}`,
            borderRadius: 0,
            padding: "0 18px",
            height: 40,
            gap: 0,
            justifyContent: "flex-start",
          }}
        >
          {["references", "factcheck", "reframe", "scores"].map((t) => (
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
              {t === "references"
                ? "References"
                : t === "factcheck"
                  ? "Fact Check"
                  : t === "reframe"
                    ? "Reframe"
                    : "Scores"}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* References Tab */}
        <TabsContent
          value="references"
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
                Wikipedia References
              </span>
            </div>
            {wikiReferences.length === 0 ? (
              <p style={{ color: C.textSec, fontSize: 13, fontWeight: 300 }}>
                Loading references...
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {wikiReferences.map((ref, idx) => (
                  <Card
                    key={idx}
                    style={{
                      background: C.surfaceHi,
                      border: `1px solid ${C.border}`,
                      borderRadius: 8,
                    }}
                  >
                    <CardContent style={{ padding: "12px" }}>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: C.white,
                          fontSize: 13,
                          fontWeight: 500,
                          display: "block",
                          marginBottom: 6,
                          textDecoration: "none",
                        }}
                      >
                        {ref.title} ↗
                      </a>
                      <p
                        style={{
                          color: C.textSec,
                          fontSize: 12,
                          lineHeight: 1.6,
                          margin: 0,
                          fontWeight: 300,
                        }}
                      >
                        {ref.snippet}...
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Fact Check Tab */}
        <TabsContent
          value="factcheck"
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
                Live Fact Check
              </span>
            </div>
            <p
              style={{
                color: dynamicContext ? C.sage : C.textSec,
                fontSize: 13,
                lineHeight: 1.82,
                fontWeight: 300,
                marginBottom: 16,
                whiteSpace: "pre-wrap",
              }}
            >
              {dynamicContext ||
                "Start typing your argument to see live statistics and fact-checking here..."}
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
                  AI facts update dynamically based on your drafting text.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reframe tab */}
        <TabsContent
          value="reframe"
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
                Argument Reframer
              </span>
            </div>

            {!input.trim() && !strengthened ? (
              <p
                style={{
                  color: C.textMut,
                  fontSize: 13,
                  lineHeight: 1.7,
                  fontStyle: "italic",
                }}
              >
                Start typing your argument below, then come here to reframe it
                into a stronger version.
              </p>
            ) : (
              <>
                <Card
                  style={{
                    background: C.surfaceHi,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    marginBottom: 14,
                  }}
                >
                  <CardContent style={{ padding: "13px 15px" }}>
                    <p
                      style={{
                        color: C.textMut,
                        fontSize: 10,
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      Your draft
                    </p>
                    <p
                      style={{
                        color: C.textSec,
                        fontSize: 13,
                        lineHeight: 1.72,
                        fontWeight: 300,
                        margin: 0,
                      }}
                    >
                      {input.trim() || "(empty)"}
                    </p>
                  </CardContent>
                </Card>

                <Button
                  onClick={async () => {
                    if (!input.trim()) return;
                    setStrengthening(true);
                    setStrengthened("");
                    try {
                      const stronger = await reframeArgument(
                        topic,
                        position,
                        input
                      );
                      setStrengthened(stronger);
                    } catch (err) {
                      setStrengthened(
                        "Failed to reframe argument. Please check your API key and try again."
                      );
                    } finally {
                      setStrengthening(false);
                    }
                  }}
                  disabled={!input.trim() || strengthening}
                  style={{
                    width: "100%",
                    background:
                      input.trim() && !strengthening ? C.sage : C.border,
                    color: input.trim() && !strengthening ? "#0e0f0e" : C.textMut,
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: 0.3,
                    height: 38,
                    marginBottom: 16,
                    transition: "all 0.2s",
                    border: "none",
                  }}
                >
                  {strengthening ? "Reframing…" : "Reframe Argument"}
                </Button>

                {strengthened && (
                  <Card
                    style={{
                      background: C.sageDim,
                      border: `1px solid ${C.sageMid}`,
                      borderRadius: 8,
                    }}
                  >
                    <CardContent style={{ padding: "13px 15px" }}>
                      <p
                        style={{
                          color: C.sage,
                          fontSize: 10,
                          letterSpacing: 1.5,
                          textTransform: "uppercase",
                          marginBottom: 6,
                        }}
                      >
                        Reframed
                      </p>
                      <p
                        style={{
                          color: C.textPri,
                          fontSize: 13,
                          lineHeight: 1.72,
                          fontWeight: 300,
                          marginBottom: 12,
                        }}
                      >
                        {strengthened}
                      </p>
                      <Button
                        onClick={() => {
                          setInput(strengthened);
                          setStrengthened("");
                        }}
                        style={{
                          background: "transparent",
                          border: `1px solid ${C.sageMid}`,
                          color: C.sage,
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 400,
                          height: 30,
                          padding: "0 14px",
                          transition: "all 0.15s",
                        }}
                      >
                        Use this
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
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
  );
}
