import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";

export function AnimatedCounter({ value, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (v) =>
    Math.floor(v).toLocaleString()
  );

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    const unsub = display.on("change", (v) => setDisplayValue(v));
    return unsub;
  }, [display]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}
