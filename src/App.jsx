// App.js
import React, { useEffect, useRef } from 'react';
import './index.css';
import LandingPage from './Component/LandingPage';
import AboutMe from './Component/AboutMe';
import Navbar from './Component/Navbar';
import SkillsSection from './Component/SkillsSection';
import { ProjectsSection } from './Component/ProjectsSection';
import { ContactSection } from './Component/ContactSection';
import { LenisContext } from './Component/LenisContext';
import Lenis from '@studio-freight/lenis';

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      <div className="min-h-screen bg-black relative text-white">
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"></div>
        <div className="relative z-10">
          <Navbar />
          <LandingPage />
          <AboutMe />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </div>
    </LenisContext.Provider>
  );
}

export default App;
