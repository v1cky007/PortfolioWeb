import React from "react";
import { Meteors } from "@/components/magicui/meteors"; // Adjust path if needed
import Hero from "./HeroSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center text-white relative overflow-hidden">
      {/* Meteors Effect */}
      <Meteors number={100} />
      <div className="absolute top-0 left-0 w-full h-full z-0">
      </div>
      {/* Hero Content */}
      <Hero />
    </div>
  );
};

export default LandingPage;
