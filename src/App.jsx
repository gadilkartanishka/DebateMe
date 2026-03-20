import { useState } from "react";
import { Landing } from "./components/Landing";
import { Arena } from "./components/Arena";
import { Setup } from "./components/Setup";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
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

  function handleNavigateToSetup() {
    setScreen("setup");
  }

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      {screen === "landing" && (
        <>
          <Header onStartSetup={handleNavigateToSetup} />
          <Landing 
            onStart={start} 
            onStartSetup={handleNavigateToSetup}
          />
          <Footer />
        </>
      )}

      {screen === "setup" && (
        <Setup 
          onStart={start} 
          onBack={() => setScreen("landing")} 
        />
      )}

      {screen === "debate" && (
        <Arena
          topic={topic}
          position={pos}
          onBack={() => setScreen("landing")}
        />
      )}
    </>
  );
}