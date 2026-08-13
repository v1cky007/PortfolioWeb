import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Fetch blog posts from Supabase.
 * Falls back to static blogData if Supabase is not configured.
 */
export function useBlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      if (!isSupabaseConfigured()) {
        const { default: staticPosts } = await import("@/Component/blogData");
        setPosts(staticPosts);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          // Table exists but empty, fall back to static
          const { default: staticPosts } = await import("@/Component/blogData");
          setPosts(staticPosts);
        }
      } catch (err) {
        console.warn("Supabase fetch failed, using static data:", err.message);
        const { default: staticPosts } = await import("@/Component/blogData");
        setPosts(staticPosts);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading };
}

/**
 * Fetch a single blog post by ID from Supabase.
 * Falls back to static blogData if not found.
 */
export function useBlogPost(postId) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }

    async function fetchPost() {
      if (!isSupabaseConfigured()) {
        const { default: staticPosts } = await import("@/Component/blogData");
        const staticPost = staticPosts.find((p) => p.id === postId);
        setPost(staticPost || null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", postId)
          .single();

        if (error) throw error;
        setPost(data);
      } catch {
        const { default: staticPosts } = await import("@/Component/blogData");
        const staticPost = staticPosts.find((p) => p.id === postId);
        setPost(staticPost || null);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [postId]);

  return { post, loading };
}
