import React, { useEffect, useState } from "react";

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading → reveal → done

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("reveal");
          // After animation finishes, mark as done so className applies opacity-0
          setTimeout(() => setPhase("done"), 900);
          return 100;
        }
        // Non-linear progress: fast start, slow middle, fast end
        const increment = prev < 60 ? 3 : prev < 90 ? 1.5 : 4;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
        phase === "done" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        animation: phase === "reveal" ? "splashExit 0.8s ease forwards" : undefined,
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#BF00FF]/5 rounded-full blur-[120px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo / Name with letter animation */}
        <div className="flex items-baseline gap-0.5 overflow-hidden">
          <span
            className="text-5xl sm:text-6xl font-black text-white tracking-tight"
            style={{ animation: "splashSlideUp 0.6s ease 0.2s both" }}
          >
            M.
          </span>
          <span
            className="text-5xl sm:text-6xl font-black text-[#BF00FF] tracking-tight"
            style={{ animation: "splashSlideUp 0.6s ease 0.35s both" }}
          >
            Vigneash
          </span>
        </div>

        {/* Tagline */}
        <p
          className="text-gray-500 text-xs sm:text-sm uppercase tracking-[0.3em] font-medium"
          style={{ animation: "splashFadeIn 0.6s ease 0.6s both" }}
        >
          Cybersecurity & Full-Stack Developer
        </p>

        {/* Progress bar */}
        <div
          className="w-48 sm:w-56 flex flex-col items-center gap-3"
          style={{ animation: "splashFadeIn 0.6s ease 0.8s both" }}
        >
          <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-none"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #BF00FF, #8A2BE2, #DA70D6)",
                boxShadow: "0 0 12px #BF00FF60",
              }}
            />
          </div>
          <span className="text-[10px] text-gray-600 font-mono tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-white/10" />
      <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-white/10" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-white/10" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-white/10" />

      <style>{`
        @keyframes splashSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes splashFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes splashExit {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.05);
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
