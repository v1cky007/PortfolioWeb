// Navbar.jsx
import React from "react";
import logo from "../assets/logo.png";
import { useLenis } from "../Component/LenisContext";

const Navbar = () => {
  const lenis = useLenis();

  const handleScroll = (targetId) => {
    const section = document.getElementById(targetId);
    if (section && lenis) {
      lenis.scrollTo(section);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black bg-opacity-80 w-full">
      <div className="flex items-center space-x-3">
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 rounded-full border-2 border-purple-500"
        />
        <h1 className="text-white text-xl font-bold">M. Vigneash</h1>
      </div>

      <ul className="flex space-x-6 text-white">
        <li
          className="cursor-pointer hover:text-purple-400"
          onClick={() => handleScroll("home")}
        >
          Home
        </li>
        <li
          className="cursor-pointer hover:text-purple-400"
          onClick={() => handleScroll("about")}
        >
          About Me
        </li>
        <li
          className="cursor-pointer hover:text-purple-400"
          onClick={() => handleScroll("projects")}
        >
          Projects
        </li>
        <li
          className="cursor-pointer hover:text-purple-400"
          onClick={() => handleScroll("contact")}
        >
          Contact
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
