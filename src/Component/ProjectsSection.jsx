import React from "react";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import "./ProjectsSection.css";

const projects = [
  {
    id: 1,
    title: "EstateFlow",
    description:
      "A comprehensive house brokerage platform with AI-based property recommendations, advanced filters, and an interactive dashboard.",
    image: "/projects/estateflow.png", // Replace with your actual image path
    tags: ["React", "Spring Boot", "MySQL", "AI"],
    demoUrl: "#", // Replace with live demo if available
    githubUrl: "https://github.com/yourusername/estateflow", // Replace with actual repo
  },
  {
    id: 2,
    title: "Vortex Play",
    description:
      "A cloud gaming application with real-time multiplayer support, performance optimizations, and interactive leaderboards.",
    image: "/projects/vortexplay.png", // Replace with your actual image path
    tags: ["HTML", "CSS", "JavaScript", "WebSockets"],
    demoUrl: "#",
    githubUrl: "https://github.com/yourusername/vortex-play", // Replace with actual repo
  },
  {
    id: 3,
    title: "Grocery Store Website",
    description:
      "An e-commerce platform for groceries with secure payments, responsive UI/UX, and real-time order tracking.",
    image: "/projects/grocery.png", // Replace with your actual image path
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    demoUrl: "#",
    githubUrl: "https://github.com/yourusername/grocery-store", // Replace with actual repo
  },
];

export const ProjectsSection = () => {
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
            <div key={project.id} className="project-card">
              <div className="project-image-container">
                <img src={project.image} alt={project.title} />
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
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
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
            href="https://github.com/vigneashm007"
            rel="noopener noreferrer"
          >
            Check My Github <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};
