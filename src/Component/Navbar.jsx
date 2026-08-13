import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLenis } from "./LenisContext";
import logo from "@/assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [lenis]);

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
    <nav className="fixed top-0 left-0 w-full z-50 py-3 sm:py-4 px-4 sm:px-6 shadow-md navbar-themed backdrop-blur-md" role="navigation" aria-label="Main navigation">
      <div className="flex justify-between items-center">
        {/* Left - Logo and Name */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
            <AvatarImage src={logo} alt="M. Vigneash Logo" />
            <AvatarFallback>MV</AvatarFallback>
          </Avatar>
          <span className="text-lg sm:text-xl font-semibold text-themed">M.Vigneash</span>
        </div>

        {/* Right - Links */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-xs sm:text-sm lg:text-base">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleScroll(id)}
              className={`transition ${
                activeSection === id ? "text-[#BF00FF]" : "text-themed-muted hover:text-themed"
              }`}
            >
              {label}
            </button>
          ))}
          <Link
            to="/blog"
            className="text-themed-muted hover:text-themed transition"
          >
            Blog
          </Link>
          <ThemeToggle />
        </div>

        {/* Hamburger - Mobile only */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={24} className="text-themed" /> : <Menu size={24} className="text-themed" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 sm:space-y-4 text-sm sm:text-base p-4 rounded-lg border border-themed navbar-themed">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleScroll(id)}
              className={`transition text-left ${
                activeSection === id ? "text-[#BF00FF]" : "text-themed-muted hover:text-themed"
              }`}
            >
              {label}
            </button>
          ))}
          <Link
            to="/blog"
            onClick={() => setMenuOpen(false)}
            className="text-themed-muted hover:text-themed transition text-left"
          >
            Blog
          </Link>
          <div className="pt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
