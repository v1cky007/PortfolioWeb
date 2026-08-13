import React, { useState, useEffect, useRef } from "react";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { cn } from "@/lib/utils";
import "./SkillsSection.css";

const orbitLogos = [
  { alt: "React", src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { alt: "Angular", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" },
  { alt: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { alt: "C", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { alt: "C++", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { alt: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { alt: "Spring Boot", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { alt: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { alt: "CSS3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { alt: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { alt: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { alt: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" }
];

const outer = [...orbitLogos, ...orbitLogos];
const middle = [...orbitLogos];
const inner = orbitLogos.slice(0, 8);

const skills = [
  { name: "HTML/CSS", level: 95, category: "Frontend/Backend" },
  { name: "JavaScript", level: 90, category: "Frontend/Backend" },
  { name: "React", level: 90, category: "Frontend/Backend" },
  { name: "Angular", level: 85, category: "Frontend/Backend" },
  { name: "SpringBoot", level: 70, category: "Frontend/Backend" },
  { name: "MySQL", level: 65, category: "Frontend/Backend" },
  { name: "Git/GitHub", level: 90, category: "Tools" },
  { name: "VS Code", level: 95, category: "Tools" },
  { name: "Python", level: 88, category: "Coding" },
  { name: "C", level: 75, category: "Coding" },
  { name: "C++", level: 80, category: "Coding" }
];

const categories = ["Frontend/Backend", "Tools", "Coding"];

const AnimatedBar = ({ level, isVisible }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setAnimatedWidth(level), 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, level]);

  return (
    <div className="skill-bar-bg">
      <div
        className="skill-bar-fill"
        style={{
          width: `${animatedWidth}%`,
          transition: "width 1s ease-out",
        }}
      />
    </div>
  );
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend/Backend");
  const [barsVisible, setBarsVisible] = useState(false);
  const barsRef = useRef(null);
  const filteredSkills = skills.filter(skill => skill.category === activeCategory);

  useEffect(() => {
    setBarsVisible(false);
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setBarsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );

      if (barsRef.current) observer.observe(barsRef.current);
      return () => observer.disconnect();
    }, 50);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <section id="skills">
      <div className="skills-wrapper">
        <div className="left-skills">
          <OrbitingCircles radius={180} className="orbiting-circles">
            {outer.map((logo, index) => (
              <div key={`outer-${index}`} className="orbit-icon-wrapper">
                <img src={logo.src} alt={`${logo.alt} - Technology Skill`} className="icon" loading="lazy" />
                <span className="tooltip">{logo.alt}</span>
              </div>
            ))}
          </OrbitingCircles>

          <OrbitingCircles radius={120} reverse className="orbiting-circles">
            {middle.map((logo, index) => (
              <div key={`middle-${index}`} className="orbit-icon-wrapper">
                <img src={logo.src} alt={`${logo.alt} - Technology Skill`} className="icon" loading="lazy" />
                <span className="tooltip">{logo.alt}</span>
              </div>
            ))}
          </OrbitingCircles>

          <OrbitingCircles radius={60} className="orbiting-circles">
            {inner.map((logo, index) => (
              <div key={`inner-${index}`} className="orbit-icon-wrapper">
                <img src={logo.src} alt={`${logo.alt} - Technology Skill`} className="icon" loading="lazy" />
                <span className="tooltip">{logo.alt}</span>
              </div>
            ))}
          </OrbitingCircles>
        </div>

        <div className="right-skills" ref={barsRef}>
          <h2 className="progress-title">Skills</h2>
          <div className="categories">
            {categories.map((category, key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(category)}
                className={cn("category-btn", activeCategory === category ? "active" : "")}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="progress-bars">
            {filteredSkills.map((skill, key) => (
              <div key={`${activeCategory}-${key}`} className="skill-card">
                <div className="skill-name">{skill.name}</div>
                <AnimatedBar level={skill.level} isVisible={barsVisible} />
                <div className="skill-percent">{skill.level}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
