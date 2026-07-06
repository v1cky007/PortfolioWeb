import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./ExperienceSection.css";

const experiences = [
  {
    status: "INTERNSHIP",
    statusColor: "#BF00FF",
    company: "Cognizant",
    role: "Programmer Analyst Intern",
    location: "Chennai, TN",
    dateRange: "Feb 2026 – Jun 2026",
    bullets: [
      "Developed full-stack features using Angular and Spring Boot as part of the GenC Next program.",
      "Collaborated with cross-functional teams in an enterprise-level development environment.",
      "Gained hands-on experience in building scalable web applications and RESTful APIs.",
    ],
    tags: ["Angular", "Spring Boot", "Full-Stack Development"],
  },
  {
    status: "INTERNSHIP",
    statusColor: "#BF00FF",
    company: "BPCL",
    role: "Information Systems Intern",
    location: "Kochi Refinery",
    dateRange: "Dec 2024 – Jan 2025",
    bullets: [
      "Gained hands-on experience in cybersecurity, ERP systems (SAP-MES), and smart infrastructure.",
      "Contributed to digital transformation by supporting secure enterprise system workflows.",
      "Developed an E-Register application using ASP.NET (MVC), C#, and SQL Server.",
    ],
    tags: ["Cybersecurity", "SAP-MES", "ASP.NET", "C#", "SQL Server"],
  },
  {
    status: "INTERNSHIP",
    statusColor: "#BF00FF",
    company: "Livewire",
    role: "Cyber Security Intern",
    location: "Coimbatore",
    dateRange: "Jun 2024 – Jul 2024",
    bullets: [
      "Performed penetration testing on web applications and networked environments.",
      "Conducted security analysis, network audits, and risk assessments.",
      "Used industry-standard cybersecurity tools to identify and report vulnerabilities.",
    ],
    tags: ["Penetration Testing", "Network Audits", "Risk Assessment"],
  },
  {
    status: "INTERNSHIP",
    statusColor: "#BF00FF",
    company: "Prodigy Infotech",
    role: "Cyber Security Intern",
    location: "Coimbatore",
    dateRange: "Mar 2024 – Apr 2024",
    bullets: [
      "Assessed vulnerabilities in web applications through structured security testing.",
      "Conducted penetration tests using Burp Suite and documented findings.",
      "Prepared detailed security reports with remediation recommendations.",
    ],
    tags: ["Burp Suite", "VAPT", "Security Reporting"],
  },
];

const educationData = [
  {
    year: "2022 – 2026",
    title: "B.E. in Cyber Security",
    institution: "Sri Krishna College of Technology, Coimbatore",
    description:
      "CGPA: 7.39. Gained a strong foundation in network security, digital forensics, ethical hacking, and secure software development.",
  },
  {
    year: "2008 – 2022",
    title: "Higher Secondary Education",
    institution: "Cochin Refinery School",
    description:
      "Completed schooling with a focus on science and mathematics. Built a strong academic foundation.",
  },
];

/* Inline SVG icons to avoid external deps */
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ExperienceSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="experience-container">
        {/* Section Header */}
        <p className="experience-label" data-aos="fade-up">
          PROFESSIONAL TIMELINE
        </p>
        <h2 className="experience-title" data-aos="fade-up" data-aos-delay="100">
          Experience
        </h2>
        <p className="experience-subtitle" data-aos="fade-up" data-aos-delay="150">
          A chronological journey through my professional career and the impactful work I've contributed to.
        </p>

        {/* Timeline */}
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-timeline-item"
              data-aos="fade-up"
              data-aos-delay={index * 120}
            >
              {/* Timeline node & connector */}
              <div className="timeline-node" />
              <div className="timeline-node-connector" />

              {/* Date badge */}
              <div className="timeline-date-badge">
                <CalendarIcon />
                {exp.dateRange}
              </div>

              {/* Card */}
              <article className="experience-card">
                <div className="card-header">
                  <div className="card-header-left">
                    <span className="experience-status" style={{ color: exp.statusColor }}>
                      <span className="status-dot" style={{ backgroundColor: exp.statusColor }} />
                      {exp.status}
                    </span>
                    <h3 className="experience-company">{exp.company}</h3>
                    <p className="experience-role">{exp.role}</p>
                  </div>
                  <span className="card-location-badge">
                    <MapPinIcon />
                    {exp.location}
                  </span>
                </div>

                <div className="card-body">
                  <ul className="experience-bullets">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="experience-tags">
                    {exp.tags.map((tag, i) => (
                      <span key={i} className="experience-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="edu-section" data-aos="fade-up">
          <p className="experience-label">ACADEMIC BACKGROUND</p>
          <h2 className="experience-title">Education</h2>
          <p className="experience-subtitle">
            The academic foundation that shaped my expertise in technology and cybersecurity.
          </p>

          <div className="edu-grid">
            {educationData.map((item, index) => (
              <div
                key={index}
                className="edu-card"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <span className="edu-year">{item.year}</span>
                <h3 className="edu-card-title">{item.title}</h3>
                <p className="edu-institution">{item.institution}</p>
                <p className="edu-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
