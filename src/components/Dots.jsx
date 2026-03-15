import { C } from "@/lib/theme";

export function Dots() {
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
