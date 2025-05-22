import React, { useState } from "react";
import { useLenis } from "./LenisContext";
import logo from "@/assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element && lenis) {
      lenis.scrollTo(element.offsetTop);
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false); 
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 py-4 px-6 shadow-md">
      <div className="flex justify-between items-center">
        {/* Left - Logo and Name */}
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={logo} alt="Logo" />
            <AvatarFallback>MV</AvatarFallback>
          </Avatar>
          <span className="text-xl font-semibold">M.Vigneash</span>
        </div>

        {/* Right - Links */}
        <div className="hidden md:flex space-x-6 text-sm sm:text-base">
          <button onClick={() => handleScroll("about")} className="hover:text-purple-400 transition">About</button>
          <button onClick={() => handleScroll("skills")} className="hover:text-purple-400 transition">Skills</button>
          <button onClick={() => handleScroll("projects")} className="hover:text-purple-400 transition">Projects</button>
          <button onClick={() => handleScroll("contact")} className="hover:text-purple-400 transition">Contact</button>
        </div>

        {/* Hamburger - Mobile only */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 text-base">
          <button onClick={() => handleScroll("about")} className="hover:text-purple-400 transition">About</button>
          <button onClick={() => handleScroll("skills")} className="hover:text-purple-400 transition">Skills</button>
          <button onClick={() => handleScroll("projects")} className="hover:text-purple-400 transition">Projects</button>
          <button onClick={() => handleScroll("contact")} className="hover:text-purple-400 transition">Contact</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
