import { Badge } from "@/components/ui/badge";
import { C } from "@/lib/theme";

export function ScorePill({ score }) {
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
