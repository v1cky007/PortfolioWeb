import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, FileText, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    recentViews: 0,
    topPost: null,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured()) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchDashboardData() {
    try {
      const { count: totalPosts } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true });

      const { data: posts } = await supabase
        .from("posts")
        .select("id, title, views, created_at")
        .order("views", { ascending: false });

      const totalViews = posts?.reduce((sum, p) => sum + (p.views || 0), 0) || 0;
      const topPost = posts?.[0] || null;

      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const { count: recentViews } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .gte("viewed_at", weekAgo.toISOString());

      const { data: recentViewsData } = await supabase
        .from("page_views")
        .select("post_id, viewed_at, posts(title)")
        .order("viewed_at", { ascending: false })
        .limit(10);

      setStats({
        totalPosts: totalPosts || 0,
        totalViews,
        recentViews: recentViews || 0,
        topPost,
      });
      setRecentActivity(recentViewsData || []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  const statCards = [
    {
      label: "Total Posts",
      value: stats.totalPosts,
      icon: FileText,
      color: "#00D4AA",
    },
    {
      label: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: "#BF00FF",
    },
    {
      label: "Views (7 days)",
      value: stats.recentViews.toLocaleString(),
      icon: TrendingUp,
      color: "#FF6B35",
    },
    {
      label: "Top Post Views",
      value: stats.topPost?.views?.toLocaleString() || "0",
      icon: Clock,
      color: "#FFD700",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#BF00FF]/30 border-t-[#BF00FF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSupabaseConfigured()) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            Overview of your blog performance
          </p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle size={20} className="text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-yellow-500 font-semibold text-sm mb-1">Supabase not configured</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Add your Supabase environment variables to see analytics and manage posts from the admin panel.
              The blog still works using static data.
            </p>
            <div className="mt-3 text-xs text-gray-500 font-mono bg-black/20 rounded-lg p-3">
              VITE_SUPABASE_URL=your-url<br />
              VITE_SUPABASE_ANON_KEY=your-key
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <Link
            to="/v1cky/posts"
            className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:bg-white/[0.04] transition-colors"
          >
            <h3 className="text-white font-semibold mb-1">Blog Posts</h3>
            <p className="text-gray-400 text-sm">Manage your blog content</p>
          </Link>
          <Link
            to="/blog"
            target="_blank"
            className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:bg-white/[0.04] transition-colors"
          >
            <h3 className="text-white font-semibold mb-1">View Blog</h3>
            <p className="text-gray-400 text-sm">See your live blog</p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Overview of your blog performance
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white/[0.02] border border-white/5 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-xs">{card.label}</span>
              <card.icon size={16} style={{ color: card.color }} />
            </div>
            <p className="text-2xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Link
          to="/v1cky/posts/new"
          className="bg-[#BF00FF]/10 border border-[#BF00FF]/20 rounded-xl p-5 hover:bg-[#BF00FF]/15 transition-colors group"
        >
          <h3 className="text-white font-semibold mb-1 group-hover:text-[#BF00FF] transition-colors">
            + New Blog Post
          </h3>
          <p className="text-gray-400 text-sm">Create and publish a new article</p>
        </Link>
        <Link
          to="/v1cky/analytics"
          className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:bg-white/[0.04] transition-colors group"
        >
          <h3 className="text-white font-semibold mb-1 group-hover:text-[#BF00FF] transition-colors">
            View Analytics
          </h3>
          <p className="text-gray-400 text-sm">Detailed traffic and view statistics</p>
        </Link>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-xl">
        <div className="px-5 py-4 border-b border-white/5">
          <h2 className="text-white font-semibold text-sm">Recent Views</h2>
        </div>
        {recentActivity.length === 0 ? (
          <div className="px-5 py-8 text-center text-gray-500 text-sm">
            No views recorded yet. Deploy and share your blog!
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {recentActivity.map((view, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-white text-sm truncate">
                    {view.posts?.title || view.post_id}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {new Date(view.viewed_at).toLocaleString()}
                  </p>
                </div>
                <Eye size={14} className="text-gray-600 shrink-0 ml-3" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
