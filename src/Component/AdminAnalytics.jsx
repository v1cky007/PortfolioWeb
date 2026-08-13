import React, { useState, useEffect } from "react";
import { Eye, TrendingUp, Globe, Calendar, AlertTriangle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    todayViews: 0,
    weekViews: 0,
    monthViews: 0,
    topPosts: [],
    viewsByDay: [],
    recentViews: [],
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");

  useEffect(() => {
    if (isSupabaseConfigured()) {
      fetchAnalytics();
    } else {
      setLoading(false);
    }
  }, [timeRange]);

  async function fetchAnalytics() {
    setLoading(true);
    const now = new Date();
    let startDate = new Date();

    switch (timeRange) {
      case "24h":
        startDate.setHours(now.getHours() - 24);
        break;
      case "7d":
        startDate.setDate(now.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(now.getDate() - 30);
        break;
      case "all":
        startDate = new Date(0);
        break;
    }

    const { count: totalViews } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { count: todayViews } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("viewed_at", todayStart.toISOString());

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    const { count: weekViews } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("viewed_at", weekStart.toISOString());

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const { count: monthViews } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("viewed_at", monthStart.toISOString());

    const { data: topPosts } = await supabase
      .from("posts")
      .select("id, title, views, category, category_color")
      .order("views", { ascending: false })
      .limit(10);

    const { data: viewsData } = await supabase
      .from("page_views")
      .select("viewed_at")
      .gte("viewed_at", startDate.toISOString())
      .order("viewed_at", { ascending: true });

    const viewsByDay = {};
    viewsData?.forEach((v) => {
      const day = new Date(v.viewed_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      viewsByDay[day] = (viewsByDay[day] || 0) + 1;
    });

    const { data: recentViews } = await supabase
      .from("page_views")
      .select("post_id, viewed_at, posts(title)")
      .order("viewed_at", { ascending: false })
      .limit(20);

    setAnalytics({
      totalViews: totalViews || 0,
      todayViews: todayViews || 0,
      weekViews: weekViews || 0,
      monthViews: monthViews || 0,
      topPosts: topPosts || [],
      viewsByDay: Object.entries(viewsByDay).map(([day, count]) => ({ day, count })),
      recentViews: recentViews || [],
    });
    setLoading(false);
  }

  const maxDayViews = Math.max(...analytics.viewsByDay.map((d) => d.count), 1);

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
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400 text-sm mt-1">Traffic and engagement statistics</p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle size={20} className="text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-yellow-500 font-semibold text-sm mb-1">Supabase not configured</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Set up Supabase to track blog traffic, view counts, and engagement analytics.
            </p>
            <div className="mt-3 text-xs text-gray-500 font-mono bg-black/20 rounded-lg p-3">
              VITE_SUPABASE_URL=your-url<br />
              VITE_SUPABASE_ANON_KEY=your-key
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400 text-sm mt-1">
            Traffic and engagement statistics
          </p>
        </div>
        <div className="flex gap-1 bg-white/5 rounded-lg p-1">
          {["24h", "7d", "30d", "all"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                timeRange === range
                  ? "bg-[#BF00FF]/20 text-[#BF00FF]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {range === "all" ? "All Time" : range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Views", value: analytics.totalViews, icon: Eye, color: "#BF00FF" },
          { label: "Today", value: analytics.todayViews, icon: Calendar, color: "#00D4AA" },
          { label: "This Week", value: analytics.weekViews, icon: TrendingUp, color: "#FF6B35" },
          { label: "This Month", value: analytics.monthViews, icon: Globe, color: "#FFD700" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-xs">{stat.label}</span>
              <stat.icon size={16} style={{ color: stat.color }} />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <h2 className="text-white font-semibold text-sm mb-4">Views Over Time</h2>
          {analytics.viewsByDay.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No data yet</p>
          ) : (
            <div className="space-y-2">
              {analytics.viewsByDay.slice(-14).map((d) => (
                <div key={d.day} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-16 shrink-0">{d.day}</span>
                  <div className="flex-1 h-5 bg-white/5 rounded overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#BF00FF]/60 to-[#BF00FF]/30 rounded transition-all duration-500"
                      style={{ width: `${(d.count / maxDayViews) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8 text-right">{d.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <h2 className="text-white font-semibold text-sm mb-4">Top Posts by Views</h2>
          {analytics.topPosts.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No posts yet</p>
          ) : (
            <div className="space-y-3">
              {analytics.topPosts.map((post, i) => (
                <div key={post.id} className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-600 w-6 text-right">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{post.title}</p>
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5 inline-block"
                      style={{
                        backgroundColor: `${post.category_color || "#BF00FF"}15`,
                        color: post.category_color || "#BF00FF",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-300">
                    {(post.views || 0).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-white/[0.02] border border-white/5 rounded-xl">
        <div className="px-5 py-4 border-b border-white/5">
          <h2 className="text-white font-semibold text-sm">Recent Activity</h2>
        </div>
        {analytics.recentViews.length === 0 ? (
          <div className="px-5 py-8 text-center text-gray-500 text-sm">
            No views recorded yet
          </div>
        ) : (
          <div className="divide-y divide-white/5 max-h-80 overflow-y-auto">
            {analytics.recentViews.map((view, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-white/[0.02]">
                <div className="min-w-0">
                  <p className="text-white text-sm truncate">
                    {view.posts?.title || "Unknown post"}
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
