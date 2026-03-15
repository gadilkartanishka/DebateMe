import { useState } from "react";
import { Landing } from "./components/Landing";
import { Arena } from "./components/Arena";
import { GLOBAL_CSS } from "./lib/theme";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [topic, setTopic] = useState("");
  const [pos, setPos] = useState("");

  function start(t, p) {
    setTopic(t);
    setPos(p);
    setScreen("debate");
  }

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      {screen === "landing" ? (
        <Landing onStart={start} />
      ) : (
        <Arena
          topic={topic}
          position={pos}
          onBack={() => setScreen("landing")}
        />
      )}
    </>
  );
}