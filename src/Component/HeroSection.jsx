import React from "react";
import {
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { WordRotate } from "@/components/magicui/word-rotate";
import { AuroraText } from "../components/magicui/aurora-text";
import profileImage from "@/assets/profileImage.jpeg";
import { ShineBorder } from "@/components/magicui/shine-border";
import { useLenis } from "./LenisContext";

const Hero = () => {
  const lenis = useLenis();

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection && lenis) {
      lenis.scrollTo(projectsSection.offsetTop);
    } else if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 py-16 sm:py-20 lg:py-28 text-white relative z-10 overflow-hidden">
      {/* Content Container */}
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
        {/* Text Section */}
        <div className="text-center lg:text-left w-full lg:w-1/2 px-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 leading-tight">
            I am <AuroraText>M. Vigneash</AuroraText>
          </h1>

          <div className="text-[#BF00FF] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 whitespace-nowrap inline-block">
            <WordRotate
              words={[
                "Cybersecurity Enthusiast",
                "Web Developer",
                "Ethical Hacker",
                "Full-Stack Developer",
              ]}
              duration={2500}
            />
          </div>

          <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">
            Passionate developer crafting secure, scalable digital solutions with a
            focus on performance and innovation. Explore my projects to see how
            ideas become impactful real-world applications.
          </p>

          <div className="about-buttons">
            <button
              onClick={handleScrollToProjects}
              className="btn-primary"
            >
              View My Works
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Resume
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center lg:justify-start gap-5 mt-8">
            <a
              href="https://github.com/v1cky007"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-xl transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/m-vigneash-5aa770299"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#0e76a8] text-xl transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:v1gneashm007@gmail.com"
              className="text-gray-400 hover:text-[#EA4335] text-xl transition"
            >
              <HiOutlineMail />
            </a>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-[360px] lg:h-[360px] xl:w-[400px] xl:h-[400px] mx-auto">
          <ShineBorder
            className="rounded-full h-full w-full"
            shineColor={["#BF00FF", "#8A2BE2", "#DA70D6"]}
            duration={12}
          />
          <div className="absolute top-0 left-0 w-full h-full rounded-full p-1">
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-full w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
