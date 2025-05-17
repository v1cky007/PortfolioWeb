import React from "react";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Briefcase, Code, User } from "lucide-react";
import "./AboutMe.css";

const AboutMe = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <BoxReveal>
          <h2 className="about-heading">
            About <span>Me</span>
          </h2>
        </BoxReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <BoxReveal>
            <div className="space-y-6">
              <h3 className="about-subheading">
                Passionate Cybersecurity & Full-Stack Developer
              </h3>

              <p className="about-text">
                Hello! I’m <span className="text-white font-semibold">M. Vigneash</span>, a
                <span className="text-[#BF00FF] font-medium"> Cybersecurity Enthusiast</span> and
                <span className="text-[#BF00FF] font-medium"> Full-Stack Developer</span> with a strong foundation in ethical hacking, vulnerability assessment, and secure web application development.
              </p>

              <p className="about-text">
                With hands-on experience in tools like Burp Suite, Wireshark, and Autopsy, I’ve interned at top organizations like BPCL and Livewire, contributing to cybersecurity audits, digital transformation, and full-stack application development. I’m passionate about building secure, scalable platforms using technologies like ReactJS, Spring Boot, and MySQL.
              </p>

              <p className="about-text">
                I’ve developed projects including <span className="text-white font-semibold">EstateFlow</span>, an AI-driven house brokerage platform, and <span className="text-white font-semibold">Vortex Play</span>, an interactive cloud gaming application. My aim is to merge technical expertise with creative problem-solving to deliver real-world impact.
              </p>

              <BoxReveal>
                <div className="about-buttons">
                  <a href="#contact" className="btn-primary">
                    Get In Touch
                  </a>
                  <a href="#works" className="btn-outline">
                    View My Works
                  </a>
                </div>
              </BoxReveal>
            </div>
          </BoxReveal>

          <BoxReveal>
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  Icon: Code,
                  title: "Full-Stack Development",
                  desc: "Building secure and scalable web platforms using React, Spring Boot, and MySQL.",
                },
                {
                  Icon: User,
                  title: "Cybersecurity",
                  desc: "Conducting vulnerability assessments, ethical hacking, and secure coding practices.",
                },
                {
                  Icon: Briefcase,
                  title: "Real-World Experience",
                  desc: "Interned at BPCL & Livewire, contributing to critical security and software systems.",
                },
              ].map(({ Icon, title, desc }, i) => (
                <div key={i} className="feature-card group">
                  <div className="flex items-start gap-4">
                    <div className="icon-box group-hover:bg-[#BF00FF]/20 transition">
                      <Icon className="icon h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="feature-card-title">{title}</h4>
                      <p className="feature-card-desc">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BoxReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
