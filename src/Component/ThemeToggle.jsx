import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setIsDark(saved === "dark");
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-9 h-9 rounded-full border border-themed bg-transparent flex items-center justify-center hover:bg-[#BF00FF]/10 hover:border-[#BF00FF]/40 transition-all duration-300"
    >
      <Moon
        size={16}
        className={`absolute transition-all duration-300 text-themed ${
          isDark ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
        }`}
      />
      <Sun
        size={16}
        className={`absolute transition-all duration-300 text-themed ${
          isDark ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
