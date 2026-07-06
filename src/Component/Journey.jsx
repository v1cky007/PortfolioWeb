import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Journey.css';

const Journey = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const educationData = [
    {
      year: '2022 - 2026',
      title: 'B.E. in Cyber Security',
      institution: 'Sri Krishna College of Technology, Coimbatore',
      description: 'CGPA: 7.39. Gained a strong foundation in network security, digital forensics, ethical hacking, and secure software development.'
    },
    {
      year: '2008 - 2022',
      title: 'Higher Secondary Education',
      institution: 'Cochin Refinery School',
      description: 'Completed schooling with a focus on science and mathematics. Built a strong academic foundation.'
    }
  ];

  const experienceData = [
    {
      status: 'INTERNSHIP',
      statusColor: '#aaa',
      company: 'BPCL',
      role: 'Information Systems Intern',
      location: 'Kochi Refinery',
      date: 'Dec 2024 – Jan 2025',
      points: [
        'Worked in cybersecurity, ERP systems (SAP-MES), and smart infrastructure.',
        'Developed an E-Register app using ASP.NET (MVC), C, and SQL Server.',
        'Collaborated with cross-functional teams to optimize internal digital workflows.'
      ],
      tags: ['ASP.NET', 'C#', 'SQL Server', 'SAP-MES', 'Cybersecurity']
    },
    {
      status: 'INTERNSHIP',
      statusColor: '#aaa',
      company: 'Livewire',
      role: 'Cyber Security Intern',
      location: 'Coimbatore',
      date: 'Jun 2024 – Jul 2024',
      points: [
        'Performed penetration testing and vulnerability assessments on internal networks.',
        'Conducted security analysis, network audits, and risk assessments.',
        'Utilized industry-standard tools like Burp Suite, Wireshark, and Nmap.'
      ],
      tags: ['Penetration Testing', 'Burp Suite', 'Wireshark', 'Nmap', 'Risk Assessment']
    },
    {
      status: 'INTERNSHIP',
      statusColor: '#aaa',
      company: 'Prodigy Infotech',
      role: 'Cyber Security Intern',
      location: 'Coimbatore',
      date: 'Mar 2024 – Apr 2024',
      points: [
        'Assessed vulnerabilities in web applications using OWASP methodology.',
        'Conducted penetration tests using Burp Suite and prepared detailed security reports.',
        'Gained hands-on experience in secure coding practices and remediation strategies.'
      ],
      tags: ['Web App Security', 'Burp Suite', 'OWASP', 'Reporting']
    }
  ];

  return (
    <div className="journey-container">
      {/* Experience Section */}
      <div className="exp-section">
        <p className="exp-label">PROFESSIONAL TIMELINE</p>
        <h2 className="exp-title">Experience</h2>

        <div className="exp-list">
          {experienceData.map((item, index) => (
            <div
              key={index}
              className="exp-item"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="exp-item-grid">
                {/* Left Column */}
                <div className="exp-left">
                  <div className="exp-status">
                    <span
                      className="exp-status-dot"
                      style={{ backgroundColor: item.statusColor }}
                    ></span>
                    <span className="exp-status-text">{item.status}</span>
                  </div>
                  <h3 className="exp-company">{item.company}</h3>
                  <p className="exp-role">{item.role}</p>
                  <p className="exp-location">{item.location}</p>
                  <p className="exp-date">{item.date}</p>
                </div>

                {/* Right Column */}
                <div className="exp-right">
                  <div className="exp-points">
                    {item.points.map((point, i) => (
                      <p key={i} className="exp-point">{point}</p>
                    ))}
                  </div>
                  <div className="exp-tags">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="exp-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {index !== experienceData.length - 1 && (
                <div className="exp-divider"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="edu-section">
        <p className="exp-label">ACADEMIC BACKGROUND</p>
        <h2 className="exp-title">Education</h2>

        <div className="edu-grid">
          {educationData.map((item, index) => (
            <div
              key={index}
              className="edu-card"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <span className="edu-year">{item.year}</span>
              <h3 className="edu-title">{item.title}</h3>
              <p className="edu-institution">{item.institution}</p>
              <p className="edu-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Journey;
