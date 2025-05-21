// App.js
import React, { useEffect, useState } from 'react';
import './index.css';
import LandingPage from './Component/LandingPage';
import AboutMe from './Component/AboutMe';
import Navbar from './Component/Navbar';
import SkillsSection from './Component/SkillsSection';
import { ProjectsSection } from './Component/ProjectsSection';
import { ContactSection } from './Component/ContactSection';
import { LenisContext } from './Component/LenisContext';
import Lenis from '@studio-freight/lenis';
import Journey from './Component/Journey';

function App() {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    setLenis(lenisInstance);

    const raf = (time) => {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  if (!lenis) return null; // Wait for Lenis to be initialized

  return (
    <LenisContext.Provider value={lenis}>
      <div className="min-h-screen bg-black relative text-white">
        <Navbar />
        <LandingPage />
        <AboutMe />
        <SkillsSection />
        <Journey/>
        <ProjectsSection />
        <ContactSection />
      </div>
    </LenisContext.Provider>
  );
}

export default App;
