import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Eye, AlertTriangle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const CATEGORIES = [
  { name: "Career", color: "#FF6B35" },
  { name: "Projects", color: "#00D4AA" },
  { name: "Cybersecurity", color: "#FF4444" },
  { name: "Tutorial", color: "#4488FF" },
  { name: "Thoughts", color: "#BF00FF" },
];

const EMPTY_POST = {
  title: "",
  excerpt: "",
  content: "",
  category: "Career",
  category_color: "#FF6B35",
  image: "",
  read_time: "5 min read",
  featured: false,
  tags: "",
};

export default function AdminPostEditor() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_POST);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (isEditing && isSupabaseConfigured()) fetchPost();
    else setFetching(false);
  }, [id]);

  async function fetchPost() {
    const { data } = await supabase.from("posts").select("*").eq("id", id).single();
    if (data) {
      setForm({
        title: data.title || "",
        excerpt: data.excerpt || "",
        content: data.content || "",
        category: data.category || "Career",
        category_color: data.category_color || "#FF6B35",
        image: data.image || "",
        read_time: data.read_time || "5 min read",
        featured: data.featured || false,
        tags: (data.tags || []).join(", "),
      });
    }
    setFetching(false);
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleCategoryChange(cat) {
    handleChange("category", cat.name);
    handleChange("category_color", cat.color);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      alert("Title and content are required");
      return;
    }

    if (!isSupabaseConfigured()) {
      alert("Supabase is not configured. Cannot save posts yet.");
      return;
    }

    setLoading(true);
    const postData = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      category: form.category,
      category_color: form.category_color,
      image: form.image.trim(),
      read_time: form.read_time,
      featured: form.featured,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      slug: form.title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    };

    if (isEditing) {
      await supabase.from("posts").update(postData).eq("id", id);
    } else {
      postData.views = 0;
      await supabase.from("posts").insert(postData);
    }

    setLoading(false);
    navigate("/v1cky/posts");
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#BF00FF]/30 border-t-[#BF00FF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSupabaseConfigured()) {
    return (
      <div>
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate("/v1cky/posts")} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">New Post</h1>
            <p className="text-gray-400 text-sm mt-0.5">Create a new blog article</p>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle size={20} className="text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-yellow-500 font-semibold text-sm mb-1">Supabase not configured</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Set up Supabase to create and manage blog posts from this editor.
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
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate("/v1cky/posts")} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isEditing ? "Edit Post" : "New Post"}
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {isEditing ? "Update your blog post" : "Create a new blog article"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Your blog post title"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#BF00FF]/50 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => handleChange("excerpt", e.target.value)}
                placeholder="Brief summary of the post"
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#BF00FF]/50 transition-colors resize-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-400">Content * (Markdown)</label>
                <button
                  type="button"
                  onClick={() => setPreview(!preview)}
                  className="text-xs text-[#BF00FF] hover:underline flex items-center gap-1"
                >
                  <Eye size={12} />
                  {preview ? "Edit" : "Preview"}
                </button>
              </div>
              {preview ? (
                <div className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm min-h-[400px] prose prose-invert prose-sm max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: form.content
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\*(.*?)\*/g, "<em>$1</em>")
                        .replace(/^## (.*$)/gm, '<h2 class="text-lg font-bold text-white mt-6 mb-2">$1</h2>')
                        .replace(/^### (.*$)/gm, '<h3 class="text-base font-semibold text-white mt-4 mb-2">$1</h3>')
                        .replace(/^- (.*$)/gm, '<li class="ml-4 text-gray-300">$1</li>')
                        .replace(/\n/g, "<br/>"),
                    }}
                  />
                </div>
              ) : (
                <textarea
                  value={form.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="Write your blog post content here... (Markdown supported)"
                  rows={20}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#BF00FF]/50 transition-colors resize-y font-mono"
                  required
                />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#BF00FF] hover:bg-[#BF00FF]/90 disabled:opacity-50 text-white font-semibold py-3 rounded-lg text-sm transition-colors"
            >
              <Save size={16} />
              {loading ? "Saving..." : isEditing ? "Update Post" : "Publish Post"}
            </button>

            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => handleChange("featured", e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 text-[#BF00FF] focus:ring-[#BF00FF]/20 bg-white/5"
                />
                <span className="text-sm text-white">Featured Post</span>
              </label>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
              <label className="block text-xs font-medium text-gray-400 mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      form.category === cat.name
                        ? "text-white"
                        : "text-gray-400 hover:text-white bg-white/5 hover:bg-white/10"
                    }`}
                    style={
                      form.category === cat.name
                        ? { backgroundColor: `${cat.color}30`, color: cat.color }
                        : {}
                    }
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
              <label className="block text-xs font-medium text-gray-400 mb-2">Cover Image URL</label>
              <input
                type="url"
                value={form.image}
                onChange={(e) => handleChange("image", e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-[#BF00FF]/50 transition-colors"
              />
              {form.image && (
                <img src={form.image} alt="Preview" className="mt-3 w-full h-32 object-cover rounded-lg" />
              )}
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
              <label className="block text-xs font-medium text-gray-400 mb-2">Read Time</label>
              <input
                type="text"
                value={form.read_time}
                onChange={(e) => handleChange("read_time", e.target.value)}
                placeholder="5 min read"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-[#BF00FF]/50 transition-colors"
              />
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
              <label className="block text-xs font-medium text-gray-400 mb-2">Tags (comma separated)</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
                placeholder="React, JavaScript, Tutorial"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-[#BF00FF]/50 transition-colors"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
