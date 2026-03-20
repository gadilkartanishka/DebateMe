export const C = {
  bg: "#050510",
  surface: "#0d0d1c",
  surfaceHi: "#16162b",
  border: "#262645",
  borderSub: "#1a1a30",
  sage: "#00e5ff", // Electric Cyan
  sageDim: "#00e5ff22",
  sageMid: "#00e5ff55",
  sageGlow: "#00e5ff11",
  textPri: "#f8fafc",
  textSec: "#94a3b8",
  textMut: "#475569",
  white: "#ffffff",
};

export const GLOBAL_CSS = `
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

  /* shadcn overrides — map to our dark vibrant theme */
  :root {
    --background: 240 53% 4%;
    --foreground: 210 40% 98%;
    --card: 240 37% 8%;
    --card-foreground: 210 40% 98%;
    --border: 240 29% 21%;
    --input: 240 29% 21%;
    --primary: 186 100% 50%;
    --primary-foreground: 240 53% 4%;
    --secondary: 240 37% 12%;
    --secondary-foreground: 210 40% 80%;
    --muted: 240 37% 12%;
    --muted-foreground: 215 20% 65%;
    --accent: 186 100% 50%;
    --accent-foreground: 240 53% 4%;
    --ring: 186 100% 50%;
    --radius: 0.625rem;
  }

  input, textarea, button { font-family: 'DM Sans', sans-serif !important; }
  input:focus, textarea:focus { outline: none; }

  [data-slot="tabs-trigger"][data-state="active"] {
    color: ${C.sage} !important;
  }
  [data-slot="tabs-trigger"][data-state="active"]::after {
    background: ${C.sage} !important;
    opacity: 1 !important;
  }
`;
