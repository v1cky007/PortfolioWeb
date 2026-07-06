import React, { useState, useEffect, useCallback, useContext } from "react";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { LenisContext } from "./LenisContext";
import estateflowImg from "@/assets/Estateflow.png";
import vortexplayImg from "@/assets/VotexPlay.png";
import "./ProjectsSection.css";

const projects = [
  {
    id: 1,
    title: "EstateFlow",
    description:
      "A comprehensive house brokerage platform with AI-based property recommendations, advanced filters, and an interactive dashboard.",
    longDescription:
      "EstateFlow is a full-stack real estate brokerage platform designed to simplify property buying, selling, and renting. It features AI-powered property recommendations that match users with listings based on preferences and browsing behavior. The platform includes an interactive admin dashboard for managing listings, user analytics, and transaction tracking. Advanced search filters allow users to narrow down properties by price range, location, amenities, and property type. The responsive UI ensures a seamless experience across all devices.",
    image: estateflowImg,
    tags: ["React", "Spring Boot", "MySQL", "AI"],
    stack: [
      { name: "React", category: "Frontend", description: "Component-based UI with hooks and context API" },
      { name: "Spring Boot", category: "Backend", description: "RESTful API with JWT authentication" },
      { name: "MySQL", category: "Database", description: "Relational database for property & user data" },
      { name: "AI/ML", category: "Intelligence", description: "Property recommendation engine using collaborative filtering" },
    ],
    features: [
      "AI-powered property recommendations",
      "Advanced search with multiple filters",
      "Interactive admin dashboard",
      "Real-time notifications",
      "Responsive mobile-first design",
    ],
    challenges:
      "Implementing the recommendation engine required careful tuning of collaborative filtering algorithms to balance accuracy with performance. Optimizing MySQL queries for complex property searches with multiple join operations was also a key challenge.",
    demoUrl: "https://estate-f-low-of9u.vercel.app/",
    githubUrl: "https://github.com/v1cky007/EstateFLow",
    status: "Completed",
    year: "2025",
  },
  {
    id: 2,
    title: "Vortex Play",
    description:
      "A cloud gaming application with real-time multiplayer support, performance optimizations, and interactive leaderboards.",
    longDescription:
      "Vortex Play is a browser-based cloud gaming platform that delivers real-time multiplayer gaming experiences. Built with WebSockets for low-latency communication, the platform supports competitive gaming with interactive leaderboards and player statistics. Performance optimizations ensure smooth gameplay even on lower-end devices. The platform includes user profiles, achievement systems, and social features that let players connect and challenge each other.",
    image: vortexplayImg,
    tags: ["HTML", "CSS", "JavaScript", "WebSockets"],
    stack: [
      { name: "HTML5", category: "Frontend", description: "Semantic markup with Canvas API for game rendering" },
      { name: "CSS3", category: "Styling", description: "Animations, responsive layouts, and themed UI" },
      { name: "JavaScript", category: "Logic", description: "Game logic, state management, and DOM manipulation" },
      { name: "WebSockets", category: "Real-time", description: "Low-latency bidirectional communication for multiplayer" },
    ],
    features: [
      "Real-time multiplayer gameplay",
      "Interactive leaderboards",
      "Player profiles & achievements",
      "Performance-optimized rendering",
      "Cross-browser compatibility",
    ],
    challenges:
      "Achieving low-latency multiplayer synchronization was the primary challenge. Implemented client-side prediction and server reconciliation to ensure smooth gameplay. Canvas rendering optimizations were critical for maintaining 60fps.",
    demoUrl: "https://vortex-play-5izg.vercel.app/",
    githubUrl: "https://github.com/v1cky007/VortexPlay",
    status: "Completed",
    year: "2024",
  },
  {
    id: 3,
    title: "Grocery Store Website",
    description:
      "An e-commerce platform for groceries with secure payments, responsive UI/UX, and real-time order tracking.",
    longDescription:
      "A full-featured e-commerce platform specifically designed for grocery shopping. The application provides a seamless shopping experience with category-based browsing, smart search, and a streamlined checkout process powered by Stripe. Real-time order tracking keeps customers informed about their delivery status. The admin panel allows store managers to manage inventory, process orders, and view sales analytics. Built with a focus on security and performance.",
    image: "/projects/grocery.png",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    stack: [
      { name: "React", category: "Frontend", description: "Dynamic UI with React Router and state management" },
      { name: "Node.js", category: "Backend", description: "Express.js server with RESTful API architecture" },
      { name: "Stripe", category: "Payments", description: "Secure payment processing with webhook integration" },
      { name: "MongoDB", category: "Database", description: "NoSQL database for flexible product & order schemas" },
    ],
    features: [
      "Secure Stripe payment integration",
      "Real-time order tracking",
      "Category-based product browsing",
      "Admin inventory management",
      "Responsive mobile shopping experience",
    ],
    challenges:
      "Integrating Stripe webhooks for reliable payment confirmation required careful error handling and idempotency. Building a real-time order tracking system with status updates involved WebSocket connections alongside the REST API.",
    demoUrl: "#",
    githubUrl: "https://github.com/v1cky007/GroceryStore",
    status: "Completed",
    year: "2024",
  },
];

/* ---- Inline SVG Icons ---- */
const IconClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconLayers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IconZap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconTarget = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const IconFileText = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);

const IconArrowUpRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);

const catColors = {
  Frontend: "#3b82f6",
  Backend: "#10b981",
  Database: "#f59e0b",
  Intelligence: "#8b5cf6",
  Styling: "#ec4899",
  Logic: "#f97316",
  "Real-time": "#06b6d4",
  Payments: "#22c55e",
};

/* ============================
   Project Detail Modal (Clean)
   ============================ */
const ProjectModal = ({ project, onClose }) => {
  const lenis = useContext(LenisContext);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (lenis) lenis.stop();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (lenis) lenis.start();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!project) return null;

  return (
    <div className="modal-overlay" data-lenis-prevent onClick={handleBackdropClick}>
      <div className="modal-panel">
        {/* Top bar */}
        <div className="modal-topbar">
          <div className="modal-topbar-left">
            <span className="modal-topbar-dot" />
            <span className="modal-topbar-label">{project.title}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <IconClose />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="modal-body">
          {/* Header */}
          <header className="modal-header">
            <div className="modal-header-meta">
              <span className="modal-badge modal-badge--status">{project.status}</span>
              <span className="modal-badge modal-badge--year">{project.year}</span>
            </div>
            <h2 className="modal-project-title">{project.title}</h2>
            <p className="modal-project-subtitle">{project.description}</p>
            <div className="modal-tech-pills">
              {project.tags.map((tag, i) => (
                <span key={i} className="modal-pill">{tag}</span>
              ))}
            </div>
          </header>

          {/* Quick links */}
          <div className="modal-links-bar">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
              <Github size={16} />
              <span>Source Code</span>
              <IconArrowUpRight />
            </a>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="modal-link-btn modal-link-btn--primary">
              <ExternalLink size={16} />
              <span>Live Demo</span>
              <IconArrowUpRight />
            </a>
          </div>

          {/* Overview */}
          <section className="modal-block">
            <div className="modal-block-heading">
              <span className="modal-block-icon"><IconFileText /></span>
              <h3>Overview</h3>
            </div>
            <p className="modal-block-text">{project.longDescription}</p>
          </section>

          {/* Tech Stack */}
          <section className="modal-block">
            <div className="modal-block-heading">
              <span className="modal-block-icon"><IconLayers /></span>
              <h3>Tech Stack</h3>
            </div>
            <div className="modal-stack-list">
              {project.stack.map((tech, i) => {
                const color = catColors[tech.category] || "#BF00FF";
                return (
                  <div key={i} className="modal-stack-item" style={{ '--stack-color': color }}>
                    <div className="stack-item-indicator">
                      <span className="stack-item-ring" style={{ borderColor: color }} />
                      {i < project.stack.length - 1 && <span className="stack-item-line" />}
                    </div>
                    <div className="stack-item-content">
                      <div className="stack-item-row">
                        <span className="stack-item-name">{tech.name}</span>
                        <span className="stack-item-cat" style={{ color, borderColor: `${color}40`, backgroundColor: `${color}10` }}>
                          {tech.category}
                        </span>
                      </div>
                      <p className="stack-item-desc">{tech.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Features */}
          <section className="modal-block">
            <div className="modal-block-heading">
              <span className="modal-block-icon"><IconZap /></span>
              <h3>Key Features</h3>
            </div>
            <div className="modal-features-grid">
              {project.features.map((feature, i) => (
                <div key={i} className="modal-feature-card">
                  <span className="feature-card-check"><IconCheck /></span>
                  <span className="feature-card-label">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Challenges */}
          <section className="modal-block modal-block--last">
            <div className="modal-block-heading">
              <span className="modal-block-icon modal-block-icon--amber"><IconTarget /></span>
              <h3>Challenges & Solutions</h3>
            </div>
            <div className="modal-challenges-card">
              <p>{project.challenges}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

/* ============================
   Main Projects Section
   ============================ */
export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-heading">
          Featured <span>Projects</span>
        </h2>
        <p className="projects-subtext">
          These are some of the projects I've built recently—focused on security,
          scalability, and creating seamless user experiences.
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedProject(project);
              }}
            >
              <div className="project-image-container">
                <img src={project.image} alt={project.title} />
                <div className="project-image-overlay">
                  <span className="project-view-btn">
                    View Details
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
              <div className="project-content">
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-links">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            className="github-button"
            target="_blank"
            href="https://github.com/v1cky007"
            rel="noopener noreferrer"
          >
            Check My Github <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
