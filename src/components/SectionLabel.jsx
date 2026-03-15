import { C } from "@/lib/theme";

export function SectionLabel({ children }) {
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
