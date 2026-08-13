import React, { useEffect, useRef } from "react";
import { useLenis } from "./LenisContext";

const ScrollProgress = () => {
  const barRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !barRef.current) return;

    const bar = barRef.current;

    const onScroll = (e) => {
      const scrollTop = e.scroll;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min((scrollTop / docHeight) * 100, 100);
        // Use scaleX for GPU-accelerated transform (no layout reflow)
        bar.style.transform = `scaleX(${progress / 100})`;
        bar.style.opacity = progress > 0 ? "1" : "0";
      }
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-[3px] z-[9999] pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full origin-left will-change-transform"
        style={{
          transform: "scaleX(0)",
          opacity: 0,
          background:
            "linear-gradient(90deg, #BF00FF, #8A2BE2, #DA70D6)",
          boxShadow: "0 0 10px #BF00FF80, 0 0 20px #BF00FF40",
          transition: "opacity 0.15s ease",
        }}
      />
    </div>
  );
};

export default ScrollProgress;
