import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye, Trash2, Edit, ExternalLink, AlertTriangle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (isSupabaseConfigured()) {
      fetchPosts();
    } else {
      // Load from static data
      import("./blogData").then((mod) => {
        setPosts(mod.default || []);
        setLoading(false);
      });
    }
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setPosts(data || []);
    setLoading(false);
  }

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    await supabase.from("posts").delete().eq("id", id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  }

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
            <p className="text-gray-400 text-sm mt-1">Static posts (Supabase not configured)</p>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 flex items-start gap-4 mb-6">
          <AlertTriangle size={20} className="text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-yellow-500 font-semibold text-sm mb-1">Supabase not configured</h3>
            <p className="text-gray-400 text-sm">
              Set up Supabase to create, edit, and delete posts from this panel.
            </p>
          </div>
        </div>
        {/* Show static posts as read-only */}
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white/[0.02] border border-white/5 rounded-xl p-5 flex items-center gap-4"
            >
              {post.image && (
                <img src={post.image} alt="" className="w-16 h-16 rounded-lg object-cover hidden sm:block shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded inline-block mb-1"
                  style={{
                    backgroundColor: `${post.categoryColor || post.category_color || "#BF00FF"}15`,
                    color: post.categoryColor || post.category_color || "#BF00FF",
                  }}
                >
                  {post.category}
                </span>
                <h3 className="text-white font-medium text-sm truncate">{post.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Eye size={11} /> {post.views || 0} views
                  </span>
                </div>
              </div>
              <Link
                to={`/blog/${post.id}`}
                target="_blank"
                className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors shrink-0"
              >
                <ExternalLink size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-gray-400 text-sm mt-1">
            {posts.length} post{posts.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          to="/v1cky/posts/new"
          className="flex items-center gap-2 bg-[#BF00FF] hover:bg-[#BF00FF]/90 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-xl">
          <p className="text-gray-400 mb-4">No posts yet</p>
          <Link to="/v1cky/posts/new" className="text-[#BF00FF] text-sm hover:underline">
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white/[0.02] border border-white/5 rounded-xl p-5 flex items-center gap-4 hover:border-white/10 transition-colors"
            >
              {post.image && (
                <img src={post.image} alt="" className="w-16 h-16 rounded-lg object-cover hidden sm:block shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {post.featured && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#BF00FF] bg-[#BF00FF]/10 px-1.5 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: `${post.category_color || post.categoryColor || "#BF00FF"}15`,
                      color: post.category_color || post.categoryColor || "#BF00FF",
                    }}
                  >
                    {post.category}
                  </span>
                </div>
                <h3 className="text-white font-medium text-sm truncate">{post.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Eye size={11} /> {post.views || 0} views
                  </span>
                  <span>{new Date(post.created_at || post.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/blog/${post.id}`}
                  target="_blank"
                  className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  title="View live"
                >
                  <ExternalLink size={16} />
                </Link>
                <Link
                  to={`/v1cky/posts/edit/${post.id}`}
                  className="p-2 text-gray-500 hover:text-[#BF00FF] hover:bg-[#BF00FF]/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(post.id, post.title)}
                  disabled={deleting === post.id}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
