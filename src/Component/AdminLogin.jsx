import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { verifyPassword, checkRateLimit, setAuthorized, isAuthorized, isSessionValid } from "@/lib/security";
import logo from "@/assets/logo.png";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rateLimit, setRateLimit] = useState(null);
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // If already authorized and session valid, go to dashboard
    if (isAuthorized() && isSessionValid()) {
      navigate("/v1cky", { replace: true });
    }
  }, [navigate]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          setRateLimit(null);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Check rate limit
    const rl = checkRateLimit();
    if (rl.locked) {
      setRateLimit(rl);
      setCooldown(rl.waitMinutes * 60);
      setLoading(false);
      return;
    }

    // Small delay to prevent timing attacks
    await new Promise((r) => setTimeout(r, 300 + Math.random() * 200));

    if (verifyPassword(password)) {
      setAuthorized();
      setPassword("");
      navigate("/v1cky", { replace: true });
    } else {
      setError(`Invalid password. ${rl.attemptsLeft || 0} attempts remaining.`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img
            src={logo}
            alt="Logo"
            className="w-14 h-14 rounded-full mb-4 ring-2 ring-[#BF00FF]/20"
          />
          <h1 className="text-xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Enter your credentials</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#BF00FF]/50 focus:ring-1 focus:ring-[#BF00FF]/20 transition-colors"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              <AlertTriangle size={12} />
              {error}
            </div>
          )}

          {rateLimit && (
            <div className="text-yellow-500/80 text-xs text-center">
              Too many attempts. Try again in {cooldown}s.
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password || cooldown > 0}
            className="w-full bg-[#BF00FF] hover:bg-[#BF00FF]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg text-sm transition-colors"
          >
            {loading ? "Authenticating..." : cooldown > 0 ? `Locked (${cooldown}s)` : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
