import { C } from "@/lib/theme";

export function InfiniteMarquee({
  items,
  direction = "left",
  speed = 30,
  className = "",
}) {
  const animName = direction === "left" ? "marqueeLeft" : "marqueeRight";

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        width: "100%",
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <style>
        {`
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
      <div
        style={{
          display: "flex",
          gap: 14,
          width: "max-content",
          animation: `${animName} ${speed}s linear infinite`,
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "10px 24px",
              borderRadius: 28,
              border: `1px solid ${C.border}`,
              color: C.textSec,
              fontSize: 14,
              fontWeight: 300,
              whiteSpace: "nowrap",
              background: C.surface,
              letterSpacing: 0.3,
              flexShrink: 0,
              transition: "border-color 0.2s, color 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = C.sageMid;
              e.currentTarget.style.color = C.sage;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.color = C.textSec;
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
