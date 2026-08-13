import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './theme.css';
import LandingPage from './Component/LandingPage';
import AboutMe from './Component/AboutMe';
import Navbar from './Component/Navbar';
import SkillsSection from './Component/SkillsSection';
import { ProjectsSection } from './Component/ProjectsSection';
import { ContactSection } from './Component/ContactSection';
import { LenisContext } from './Component/LenisContext';
import Lenis from '@studio-freight/lenis';
import ExperienceSection from './Component/ExperienceSection';
import ScrollProgress from './Component/ScrollProgress';
import StatsSection from './Component/StatsSection';
import { CinematicFooter } from './components/ui/motion-footer';
import SplashScreen from './Component/SplashScreen';
import ErrorBoundary from './Component/ErrorBoundary';
import NotFound from './Component/NotFound';
import BlogPage from './Component/BlogPage';
import BlogPost from './Component/BlogPost';
import SectionDivider from './Component/SectionDivider';
import AdminLayout from './Component/AdminLayout';
import AdminLogin from './Component/AdminLogin';
import AdminDashboard from './Component/AdminDashboard';
import AdminPosts from './Component/AdminPosts';
import AdminPostEditor from './Component/AdminPostEditor';
import AdminAnalytics from './Component/AdminAnalytics';

function PortfolioPage() {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    try {
      const lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      setLenis(lenisInstance);

      let rafId;
      const raf = (time) => {
        lenisInstance.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenisInstance.destroy();
      };
    } catch (err) {
      console.error("Lenis init failed:", err);
      setLenis({ scrollTo: () => {}, on: () => {}, off: () => {} });
    }
  }, []);

  if (!lenis) return <SplashScreen />;

  return (
    <LenisContext.Provider value={lenis}>
      <div className="min-h-screen relative section-dark text-themed">
        <ScrollProgress />
        <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded">Skip to main content</a>
        <Navbar />
        <main className="relative z-10">
          <LandingPage />
          <SectionDivider variant="wave" />
          <AboutMe />
          <SectionDivider />
          <ExperienceSection />
          <SectionDivider />
          <StatsSection />
          <SectionDivider variant="wave" />
          <SkillsSection />
          <SectionDivider />
          <ProjectsSection />
          <SectionDivider />
          <ContactSection />
        </main>
        <CinematicFooter />
      </div>
    </LenisContext.Provider>
  );
}

function App() {
  useEffect(() => {
    const blockKeys = (e) => {
      if (e.key === 'F12') { e.preventDefault(); return; }
      if (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
        e.preventDefault(); return;
      }
      if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault(); return;
      }
    };
    document.addEventListener('keydown', blockKeys);
    const blockContext = (e) => e.preventDefault();
    document.addEventListener('contextmenu', blockContext);
    return () => {
      document.removeEventListener('keydown', blockKeys);
      document.removeEventListener('contextmenu', blockContext);
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />

          <Route path="/gate" element={<AdminLogin />} />
          <Route path="/v1cky" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/v1cky/posts" element={<AdminLayout><AdminPosts /></AdminLayout>} />
          <Route path="/v1cky/posts/new" element={<AdminLayout><AdminPostEditor /></AdminLayout>} />
          <Route path="/v1cky/posts/edit/:id" element={<AdminLayout><AdminPostEditor /></AdminLayout>} />
          <Route path="/v1cky/analytics" element={<AdminLayout><AdminAnalytics /></AdminLayout>} />

          <Route path="/admin" element={<NotFound />} />
          <Route path="/admin/*" element={<NotFound />} />
          <Route path="/dashboard" element={<NotFound />} />
          <Route path="/panel" element={<NotFound />} />
          <Route path="/cms" element={<NotFound />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
