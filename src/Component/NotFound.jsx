import React from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen section-dark flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl sm:text-9xl font-bold text-[#BF00FF]/20 mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-themed mb-3">Page Not Found</h2>
        <p className="text-themed-muted text-sm sm:text-base mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#BF00FF] text-white font-semibold text-sm hover:bg-[#a000e6] transition-colors"
        >
          <Home size={16} />
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
