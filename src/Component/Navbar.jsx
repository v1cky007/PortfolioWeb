import React from "react";
import { useLenis } from "./LenisContext";

const Navbar = () => {
  const lenis = useLenis();

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element && lenis) {
      lenis.scrollTo(element.offsetTop);
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 py-4 px-6 flex justify-between items-center shadow-md">
      <div className="font-bold text-xl">Portfolio</div>
      <div className="flex space-x-6">
        <button onClick={() => handleScroll("about")} className="hover:text-purple-400 transition">About</button>
        <button onClick={() => handleScroll("skills")} className="hover:text-purple-400 transition">Skills</button>
        <button onClick={() => handleScroll("projects")} className="hover:text-purple-400 transition">Projects</button>
        <button onClick={() => handleScroll("contact")} className="hover:text-purple-400 transition">Contact</button>
      </div>
    </nav>
  );
};

export default Navbar;
