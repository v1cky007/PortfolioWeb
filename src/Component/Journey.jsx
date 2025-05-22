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
      title: 'B.E. in Cyber Security – Sri Krishna College of Technology, Coimbatore',
      description: 'CGPA: 7.39. Gained a strong foundation in network security, digital forensics, ethical hacking, and secure software development.'
    },
    {
      year: '2008 - 2022',
      title: 'Cochin Refinery School',
      description: 'Completed schooling with a focus on science and mathematics. Built a strong academic foundation.'
    }
  ];

  const experienceData = [
    {
      year: 'Dec 2024 – Jan 2025',
      title: 'Information Systems Intern – BPCL, Kochi Refinery',
      description: 'Worked in cybersecurity, ERP systems (SAP-MES), smart infrastructure. Developed an E-Register app using ASP.NET (MVC), C, and SQL Server.'
    },
    {
      year: 'Jun 2024 – Jul 2024',
      title: 'Cyber Security Intern – Livewire, Coimbatore',
      description: 'Performed penetration testing, security analysis, network audits, and risk assessments using various cybersecurity tools.'
    },
    {
      year: 'Mar 2024 – Apr 2024',
      title: 'Cyber Security Intern – Prodigy Infotech, Coimbatore',
      description: 'Assessed vulnerabilities in web apps, conducted penetration tests using Burp Suite, and prepared security reports.'
    }
  ];

  return (
    <div className="journey-container">
      <h2 className="journey-title">My <span>Journey</span></h2>
      <div className="journey-sections">
        <div className="journey-column">
          <h3>Education</h3>
          <div className="timeline education">
            {educationData.map((item, index) => (
              <div
                key={index}
                className="timeline-box"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <span className="timeline-date">📅 {item.year}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="journey-column">
          <h3>Experience</h3>
          <div className="timeline experience">
            {experienceData.map((item, index) => (
              <div
                key={index}
                className="timeline-box"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <span className="timeline-date">📅 {item.year}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
