import React, { useState, useEffect, useRef } from "react";
import { Briefcase, FolderCode, Wrench, Award } from "lucide-react";

const stats = [
  { icon: Briefcase, label: "Internships", value: 4, suffix: "+" },
  { icon: FolderCode, label: "Projects Built", value: 3, suffix: "+" },
  { icon: Wrench, label: "Technologies", value: 12, suffix: "+" },
  { icon: Award, label: "Certifications", value: 5, suffix: "+" },
];

const useCountUp = (end, duration = 2000, startCounting) => {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!startCounting) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, startCounting]);

  return count;
};

const StatCard = ({ icon: Icon, label, value, suffix, isVisible }) => {
  const count = useCountUp(value, 2000, isVisible);

  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#BF00FF]/40 hover:bg-[#BF00FF]/5 transition-all duration-300 group">
      <div className="w-14 h-14 rounded-full bg-[#BF00FF]/10 flex items-center justify-center group-hover:bg-[#BF00FF]/20 transition-colors">
        <Icon className="w-7 h-7 text-[#BF00FF]" />
      </div>
      <div className="text-4xl sm:text-5xl font-bold text-white">
        {count}
        <span className="text-[#BF00FF]">{suffix}</span>
      </div>
      <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
    </div>
  );
};

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 px-4 sm:px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#BF00FF] text-sm uppercase tracking-widest mb-2 font-medium">
            By the Numbers
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            My Impact in <span className="text-[#BF00FF]">Numbers</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
