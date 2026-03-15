export const C = {
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

  [data-slot="tabs-trigger"][data-state="active"] {
    color: ${C.sage} !important;
  }
  [data-slot="tabs-trigger"][data-state="active"]::after {
    background: ${C.sage} !important;
    opacity: 1 !important;
  }
`;
