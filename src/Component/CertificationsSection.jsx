import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck, ExternalLink } from "lucide-react";

const certifications = [
  {
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Google",
    date: "2024",
    url: "https://www.coursera.org/professional-certificates/google-cybersecurity",
    color: "#4285F4",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2024",
    url: "https://www.netacad.com/",
    color: "#049FD9",
  },
  {
    name: "Ethical Hacking Essentials (EHE)",
    issuer: "EC-Council",
    date: "2024",
    url: "https://elearning.eccouncil.org/",
    color: "#FF6B35",
  },
  {
    name: "React - The Complete Guide",
    issuer: "Udemy",
    date: "2024",
    url: "https://www.udemy.com/",
    color: "#A435F0",
  },
  {
    name: "Spring Boot Masterclass",
    issuer: "Udemy",
    date: "2024",
    url: "https://www.udemy.com/",
    color: "#6DB33F",
  },
];

const CertCard = ({ cert, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      ref={cardRef}
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#BF00FF]/40 hover:bg-[#BF00FF]/5 transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300"
          style={{ backgroundColor: `${cert.color}20` }}
        >
          <ShieldCheck
            size={24}
            style={{ color: cert.color }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm sm:text-base leading-tight group-hover:text-[#BF00FF] transition-colors">
            {cert.name}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            {cert.issuer} &middot; {cert.date}
          </p>
        </div>
        <ExternalLink
          size={16}
          className="text-gray-500 group-hover:text-[#BF00FF] transition-colors shrink-0 mt-1"
        />
      </div>
    </a>
  );
};

const CertificationsSection = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#BF00FF] text-sm uppercase tracking-widest mb-2 font-medium">
            Credentials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Certifications & <span className="text-[#BF00FF]">Courses</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-lg mx-auto text-sm sm:text-base">
            Continuous learning in cybersecurity and full-stack development to stay ahead of the curve.
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4">
          {certifications.map((cert, index) => (
            <CertCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
