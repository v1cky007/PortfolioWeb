import React from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
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
    <section className="w-full px-4 sm:px-6 py-20 sm:py-24 lg:py-32 text-white relative z-10 overflow-hidden">
      {/* Social Sidebar (hidden on small screens) */}
      <div className="hidden md:flex absolute left-4 top-1/3 flex-col space-y-5 z-20">
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-[#0e76a8] text-2xl transition"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-[#1DA1F2] text-2xl transition"
        >
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-[#C13584] text-2xl transition"
        >
          <FaInstagram />
        </a>
        <a
          href="mailto:youremail@example.com"
          className="text-gray-300 hover:text-[#EA4335] text-2xl transition"
        >
          <HiOutlineMail />
        </a>
        <a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white text-2xl transition"
        >
          <FaGithub />
        </a>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 relative z-10">
        {/* Text Section */}
        <div className="text-center lg:text-left w-full lg:w-1/2 px-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 leading-tight">
            I am <AuroraText>M. Vigneash</AuroraText>
          </h1>

          <div className="text-[#BF00FF] text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 whitespace-nowrap inline-block">
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

          <p className="text-gray-300 mb-6 text-base sm:text-lg">
            Passionate developer crafting secure, scalable digital solutions with a
            focus on performance and innovation. Explore my projects to see how
            ideas become impactful real-world applications.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <button
              onClick={handleScrollToProjects}
              className="bg-[#9A00CC] hover:bg-[#7B00A8] text-white font-semibold px-6 py-2 rounded-full text-sm transition duration-200 w-[180px] text-center"
            >
              View My Works
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#9A00CC] hover:bg-[#7B00A8] text-white font-semibold px-6 py-2 rounded-full text-sm transition duration-200 w-[180px] text-center"
            >
              Resume
            </a>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="relative w-60 h-60 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] mx-auto">
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
