import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, Clock, Calendar } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import logo from "@/assets/logo.png";

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// Normalize post fields (Supabase uses snake_case, static uses camelCase)
function normalizePost(p) {
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

/* ---- Featured Post ---- */
const FeaturedPost = ({ post }) => {
  const np = normalizePost(post);
  return (
    <Link
      to={`/blog/${np.id}`}
      className="group block rounded-2xl border border-[#BF00FF]/10 bg-gradient-to-br from-[#BF00FF]/[0.04] to-transparent overflow-hidden hover:border-[#BF00FF]/30 hover:shadow-[0_0_40px_-10px_rgba(191,0,255,0.15)] transition-all duration-500"
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#BF00FF] bg-[#BF00FF]/10 px-2.5 py-1 rounded-full border border-[#BF00FF]/20">
              Featured
            </span>
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: `${np.categoryColor}12`,
                color: np.categoryColor,
              }}
            >
              {np.category}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-themed leading-snug mb-4 group-hover:text-[#BF00FF] transition-colors">
            {np.title}
          </h2>
          <p className="text-themed-secondary text-sm sm:text-[15px] leading-relaxed mb-7 max-w-xl">
            {np.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={np.author.avatar}
                alt={np.author.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#BF00FF]/20"
              />
              <div>
                <p className="text-themed text-xs font-medium">{np.author.name}</p>
                <div className="flex items-center gap-2 text-[11px] text-themed-muted mt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    {formatDate(np.date)}
                  </span>
                  <span className="w-0.5 h-0.5 rounded-full bg-[#BF00FF]/40" />
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {np.readTime}
                  </span>
                  <span className="w-0.5 h-0.5 rounded-full bg-[#BF00FF]/40" />
                  <span className="flex items-center gap-1">
                    <Eye size={10} />
                    {np.views}
                  </span>
                </div>
              </div>
            </div>
            <span className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#BF00FF] group-hover:gap-3 transition-all">
              Read <ArrowRight size={14} />
            </span>
          </div>
        </div>
        <div className="md:w-[340px] lg:w-[400px] shrink-0 relative">
          <div className="h-56 md:h-full w-full overflow-hidden">
            <img
              src={np.image}
              alt={np.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#BF00FF]/5 to-transparent pointer-events-none" />
        </div>
      </div>
    </Link>
  );
};

/* ---- Most Read Card ---- */
const MostReadCard = ({ post, rank }) => {
  const np = normalizePost(post);
  return (
    <Link
      to={`/blog/${np.id}`}
      className="group flex items-start gap-4 p-5 rounded-xl border border-[#BF00FF]/[0.08] bg-[#BF00FF]/[0.02] hover:border-[#BF00FF]/25 hover:bg-[#BF00FF]/[0.04] transition-all duration-300"
    >
      <span className="text-3xl sm:text-4xl font-black leading-none mt-0.5 select-none bg-gradient-to-b from-[#BF00FF]/20 to-transparent bg-clip-text text-transparent">
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="text-themed font-semibold text-sm sm:text-[15px] leading-snug mb-2 group-hover:text-[#BF00FF] transition-colors line-clamp-2">
          {np.title}
        </h3>
        <div className="flex items-center gap-3 text-[11px] text-themed-muted">
          <span className="flex items-center gap-1">
            <Eye size={10} />
            {np.views}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {np.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
};

/* ---- All Posts Row ---- */
const PostRow = ({ post }) => {
  const np = normalizePost(post);
  return (
    <Link
      to={`/blog/${np.id}`}
      className="group flex items-center justify-between py-5 border-b border-[#BF00FF]/[0.06] hover:border-[#BF00FF]/20 transition-colors"
    >
      <div className="flex-1 min-w-0 pr-4">
        <h3 className="text-themed font-medium text-[15px] sm:text-base leading-snug mb-1.5 group-hover:text-[#BF00FF] transition-colors truncate">
          {np.title}
        </h3>
        <div className="flex items-center gap-2 text-[11px] text-themed-muted">
          <span
            className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: `${np.categoryColor}12`,
              color: np.categoryColor,
            }}
          >
            {np.category}
          </span>
          <span>{formatDate(np.date)}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-[#BF00FF]/30" />
          <span>{np.readTime}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-[#BF00FF]/30" />
          <span className="flex items-center gap-0.5">
            <Eye size={9} />
            {np.views}
          </span>
        </div>
      </div>
      <ArrowRight
        size={16}
        className="text-themed-muted group-hover:text-[#BF00FF] group-hover:translate-x-1 transition-all shrink-0"
      />
    </Link>
  );
};

/* ---- Empty State ---- */
const EmptyState = () => (
  <div className="text-center py-20">
    <div className="w-16 h-16 rounded-full bg-[#BF00FF]/10 flex items-center justify-center mx-auto mb-5">
      <span className="text-2xl">&#9997;</span>
    </div>
    <h3 className="text-themed font-semibold text-lg mb-2">No articles yet</h3>
    <p className="text-themed-muted text-sm max-w-sm mx-auto">
      New content is on the way. Check back soon for articles on cybersecurity and development.
    </p>
  </div>
);

/* ---- Blog Page ---- */
const BlogPage = () => {
  const { posts: rawPosts, loading } = useBlogPosts();
  const posts = rawPosts.map(normalizePost);
  const featured = posts.find((p) => p.featured);
  const mostRead = [...posts].sort((a, b) => b.views - a.views).slice(0, 3);
  const allPosts = posts;

  if (loading) {
    return (
      <div className="min-h-screen section-dark text-themed flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#BF00FF]/30 border-t-[#BF00FF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen section-dark text-themed">
      <nav className="fixed top-0 left-0 w-full z-50 navbar-themed backdrop-blur-md border-b border-[#BF00FF]/[0.06]">
        <div className="max-w-4xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="M. Vigneash Logo" className="h-8 w-8 rounded-full" />
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/" className="text-sm text-themed-muted hover:text-themed transition-colors">
              Home
            </Link>
            <Link to="/blog" className="text-sm font-medium text-[#BF00FF]">
              Blog
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <header className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#BF00FF] mb-3">
              Writing
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-themed mb-4">Blog</h1>
            <p className="text-themed-secondary text-[15px] sm:text-base max-w-lg leading-relaxed">
              Thoughts on cybersecurity, full-stack engineering, and building
              software that&apos;s fast, secure, and reliable.
            </p>
          </header>

          {allPosts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {featured && (
                <section className="mb-16">
                  <FeaturedPost post={featured} />
                </section>
              )}
              {mostRead.length > 0 && (
                <section className="mb-16">
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#BF00FF]">
                      Most Read
                    </h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-[#BF00FF]/15 to-transparent" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {mostRead.map((post, i) => (
                      <MostReadCard key={post.id} post={post} rank={i + 1} />
                    ))}
                  </div>
                </section>
              )}
              <section>
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#BF00FF]">
                    All Articles
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#BF00FF]/15 to-transparent" />
                  <span className="text-xs text-themed-muted">
                    {allPosts.length} post{allPosts.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div>
                  {allPosts.map((post) => (
                    <PostRow key={post.id} post={post} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-[#BF00FF]/10 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-themed-muted">
          <p>&copy; {new Date().getFullYear()} M. Vigneash</p>
          <Link to="/" className="hover:text-[#BF00FF] transition-colors">
            Back to Portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
