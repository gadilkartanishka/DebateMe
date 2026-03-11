import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

export function TextGenerateEffect({ words, className, style }) {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      { opacity: 1, filter: "blur(0px)" },
      { duration: 0.4, delay: stagger(0.1) },
    );
  }, []);

  return (
    <motion.div ref={scope} className={className} style={style}>
      {wordsArray.map((word, i) => (
        <motion.span
          key={i}
          style={{
            opacity: 0,
            filter: "blur(8px)",
            display: "inline-block",
            marginRight: "0.25em",
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
