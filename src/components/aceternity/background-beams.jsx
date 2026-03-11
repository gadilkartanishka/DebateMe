import { useEffect, useRef } from "react";

export function BackgroundBeams({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const beams = Array.from({ length: 12 }, (_, i) => ({
      x: (canvas.width / 12) * i + Math.random() * 80,
      speed: 0.0004 + Math.random() * 0.0003,
      offset: Math.random() * Math.PI * 2,
      width: 1.5 + Math.random() * 1.5,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 1;

      beams.forEach((b) => {
        const alpha = 0.18 + 0.14 * Math.sin(t * b.speed * 100 + b.offset);
        const x1 = b.x + Math.sin(t * b.speed + b.offset) * 120;
        const x2 = x1 + canvas.width * 0.6;

        const grad = ctx.createLinearGradient(x1, 0, x2, canvas.height);
        grad.addColorStop(0, `rgba(143,170,139,0)`);
        grad.addColorStop(0.4, `rgba(143,170,139,${alpha})`);
        grad.addColorStop(0.6, `rgba(143,170,139,${alpha})`);
        grad.addColorStop(1, `rgba(143,170,139,0)`);

        ctx.beginPath();
        ctx.moveTo(x1, 0);
        ctx.lineTo(x2, canvas.height);
        ctx.strokeStyle = grad;
        ctx.lineWidth = b.width;
        ctx.stroke();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 1,
      }}
    />
  );
}
