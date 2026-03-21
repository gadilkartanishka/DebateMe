// export const C = {
//   bg: "#fdfbf7", // Light creamy background
//   surface: "#ffffff",
//   surfaceHi: "#f4f1ea",
//   border: "#eae5d9",
//   borderSub: "#f4f1ea",
//   sage: "#fb923c", // Pastel Orange
//   sageDim: "#fb923c22",
//   sageMid: "#fb923c55",
//   sageGlow: "#fb923c11",
//   textPri: "#1e293b", // Dark slate for primary text
//   textSec: "#475569",
//   textMut: "#94a3b8",
//   white: "#0f172a", // "white" is now actually very dark for contrast
// };
export const C = {
  bg: "#1b1e1c",
  surface: "#232624",
  surfaceHi: "#2b2f2c",
  border: "#3a3f3b",
  borderSub: "#2b2f2c",
  sage: "#7a9e7e",
  sageDim: "#7a9e7e22",
  sageMid: "#7a9e7e55",
  sageGlow: "#7a9e7e11",
  textPri: "#d8ddd9",
  textSec: "#848f86",
  textMut: "#454a46",
  white: "#eaefeb",
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

  /* shadcn overrides — map to our light pastel theme */
  :root {
    --background: 40 33% 98%;      /* #fdfbf7 */
    --foreground: 222 47% 11%;
    --card: 0 0% 100%;             /* #ffffff */
    --card-foreground: 222 47% 11%;
    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;
    --primary: 27 96% 61%;         /* orange-400 */
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222 47% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222 47% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 27 96% 61%;
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
