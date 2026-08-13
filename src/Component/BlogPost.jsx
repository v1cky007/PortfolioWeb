import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Clock, Calendar, Share2, Tag } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useBlogPost, useBlogPosts } from "@/hooks/useBlogPosts";
import { useRecordView } from "@/hooks/useSupabaseViews";
import logo from "@/assets/logo.png";

// Normalize post fields
function normalizePost(p) {
  if (!p) return null;
  return {
    id: p.id,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    categoryColor: p.category_color || p.categoryColor,
    image: p.image,
    date: p.date || p.created_at,
    readTime: p.read_time || p.readTime,
    views: p.views || 0,
    featured: p.featured,
    tags: p.tags || [],
    author: p.author || { name: "M. Vigneash", avatar: "/Profile.jpeg" },
  };
}

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post: rawPost, loading } = useBlogPost(id);
  const { posts: allRawPosts } = useBlogPosts();
  const post = normalizePost(rawPost);
  const allPosts = allRawPosts.map(normalizePost);
  const [readingProgress, setReadingProgress] = useState(0);

  useRecordView(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!loading && !rawPost) {
      navigate("/blog");
    }
  }, [rawPost, loading, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("article-content");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const current = -rect.top;
      setReadingProgress(Math.min(Math.max((current / total) * 100, 0), 100));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  if (loading || !post) return null;

  const currentIndex = allPosts.findIndex((p) => p.id === id);
  const nextPost = allPosts[currentIndex + 1] || null;
  const prevPost = allPosts[currentIndex - 1] || null;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const renderContent = (content) => {
    if (!content) return null;
    const lines = content.trim().split("\n");
    const elements = [];
    let inCodeBlock = false;
    let codeLines = [];
    let codeLanguage = "";

    lines.forEach((line, i) => {
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <div key={`code-${i}`} className="my-6 rounded-xl overflow-hidden border border-[#BF00FF]/10">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#BF00FF]/[0.04] border-b border-[#BF00FF]/10">
                <span className="text-[11px] text-[#BF00FF]/60 font-mono uppercase tracking-wider">{codeLanguage}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(codeLines.join("\n"))}
                  className="text-[10px] text-themed-muted hover:text-[#BF00FF] transition-colors font-mono"
                >
                  Copy
                </button>
              </div>
              <pre className="p-5 overflow-x-auto text-[13px] leading-relaxed">
                <code className="text-themed-secondary">{codeLines.join("\n")}</code>
              </pre>
            </div>
          );
          codeLines = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeLanguage = line.replace("```", "").trim() || "code";
        }
        return;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }

      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-2xl font-bold text-themed mt-12 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-[#BF00FF]" />
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-lg font-semibold text-themed mt-8 mb-3">
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="text-themed-secondary text-[15px] leading-[1.8] ml-4 mb-1 list-disc marker:text-[#BF00FF]/40">
            {renderInline(line.replace("- ", ""))}
          </li>
        );
      } else if (/^\d+\./.test(line)) {
        elements.push(
          <li key={i} className="text-themed-secondary text-[15px] leading-[1.8] ml-4 mb-1 list-decimal marker:text-[#BF00FF]/40">
            {renderInline(line.replace(/^\d+\.\s*/, ""))}
          </li>
        );
      } else if (line.startsWith("---")) {
        elements.push(
          <hr key={i} className="my-8 border-none h-px bg-gradient-to-r from-transparent via-[#BF00FF]/20 to-transparent" />
        );
      } else if (line.trim() === "") {
        elements.push(<div key={i} className="h-3" />);
      } else {
        elements.push(
          <p key={i} className="text-themed-secondary text-[15px] leading-[1.8] mb-3">
            {renderInline(line)}
          </p>
        );
      }
    });

    return elements;
  };

  const renderInline = (text) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-[#BF00FF]/10 text-[#BF00FF] text-[13px] font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-themed font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen section-dark text-themed">
      {/* Reading progress */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[9999]">
        <div
          className="h-full transition-[width] duration-150 ease-out"
          style={{
            width: `${readingProgress}%`,
            background: "linear-gradient(90deg, #BF00FF, #8A2BE2)",
          }}
        />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 navbar-themed backdrop-blur-md border-b border-[#BF00FF]/[0.06]">
        <div className="max-w-4xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="M. Vigneash Logo" className="h-8 w-8 rounded-full" />
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/" className="text-sm text-themed-muted hover:text-themed transition-colors">
              Home
            </Link>
            <Link to="/blog" className="text-sm text-[#BF00FF]">
              Blog
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-themed-muted hover:text-[#BF00FF] transition-colors mb-8"
          >
            <ArrowLeft size={12} />
            All articles
          </Link>

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: `${post.categoryColor}12`,
                  color: post.categoryColor,
                }}
              >
                {post.category}
              </span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs text-themed-muted hover:text-[#BF00FF] transition-colors"
            >
              <Share2 size={12} />
              Share
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-themed leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-themed-secondary text-base sm:text-lg leading-relaxed mb-8 pb-8 border-b border-[#BF00FF]/10">
            {post.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-8 border-b border-[#BF00FF]/10">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#BF00FF]/20"
              />
              <div>
                <p className="text-themed text-sm font-medium">{post.author.name}</p>
                <div className="flex items-center gap-2 text-[11px] text-themed-muted mt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    {formatDate(post.date)}
                  </span>
                  <span className="w-0.5 h-0.5 rounded-full bg-[#BF00FF]/40" />
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {post.readTime}
                  </span>
                  <span className="w-0.5 h-0.5 rounded-full bg-[#BF00FF]/40" />
                  <span className="flex items-center gap-1">
                    <Eye size={10} />
                    {post.views}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Tag size={11} className="text-themed-muted" />
              {(Array.isArray(post.tags) ? post.tags : []).map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-[#BF00FF]/10 text-[#BF00FF]/80 border border-[#BF00FF]/15"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div id="article-content" className="mb-14">
            {renderContent(post.content)}
          </div>

          <div className="p-6 rounded-2xl border border-[#BF00FF]/10 bg-[#BF00FF]/[0.03] mb-10">
            <div className="flex items-start gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#BF00FF]/20 shrink-0"
              />
              <div>
                <p className="text-themed font-semibold text-sm mb-1">Written by {post.author.name}</p>
                <p className="text-themed-muted text-xs leading-relaxed">
                  Cybersecurity enthusiast & Full-Stack Developer. Writing about security, development, and everything in between.
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <Link to="/" className="text-[11px] text-[#BF00FF] hover:underline">
                    Portfolio
                  </Link>
                  <Link to="/blog" className="text-[11px] text-[#BF00FF] hover:underline">
                    More articles
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prevPost && (
              <Link
                to={`/blog/${prevPost.id}`}
                className="group p-5 rounded-xl border border-[#BF00FF]/10 hover:border-[#BF00FF]/25 hover:bg-[#BF00FF]/[0.03] transition-all"
              >
                <span className="text-[10px] uppercase tracking-[0.15em] text-themed-muted">
                  Previous
                </span>
                <p className="text-themed text-sm font-medium mt-1.5 group-hover:text-[#BF00FF] transition-colors line-clamp-2">
                  {prevPost.title}
                </p>
              </Link>
            )}
            {nextPost && (
              <Link
                to={`/blog/${nextPost.id}`}
                className={`group p-5 rounded-xl border border-[#BF00FF]/10 hover:border-[#BF00FF]/25 hover:bg-[#BF00FF]/[0.03] transition-all text-right ${
                  !prevPost ? "sm:col-start-2" : ""
                }`}
              >
                <span className="text-[10px] uppercase tracking-[0.15em] text-themed-muted">
                  Next
                </span>
                <p className="text-themed text-sm font-medium mt-1.5 group-hover:text-[#BF00FF] transition-colors line-clamp-2">
                  {nextPost.title}
                </p>
              </Link>
            )}
          </div>
        </article>
      </main>

      <footer className="border-t border-[#BF00FF]/10 py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-themed-muted">
          <p>&copy; {new Date().getFullYear()} M. Vigneash</p>
          <Link to="/blog" className="hover:text-[#BF00FF] transition-colors">
            Back to Blog
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
