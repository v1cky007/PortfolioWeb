import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured, checkTablesExist } from "@/lib/supabase";

// Preload static data at module level (no dynamic import delay)
let _staticPosts = null;
async function getStaticPosts() {
  if (_staticPosts) return _staticPosts;
  const mod = await import("@/Component/blogData");
  _staticPosts = mod.default;
  return _staticPosts;
}

// Start preloading immediately
getStaticPosts();

/**
 * Fetch blog posts from Supabase.
 * Falls back to static blogData if Supabase is not configured or tables don't exist.
 */
export function useBlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchPosts() {
      const staticPosts = await getStaticPosts();

      if (!isSupabaseConfigured()) {
        if (!cancelled) {
          setPosts(staticPosts);
          setLoading(false);
        }
        return;
      }

      // Check if tables exist (uses localStorage cache)
      const tablesExist = await checkTablesExist();
      if (!tablesExist || cancelled) {
        if (!cancelled) {
          setPosts(staticPosts);
          setLoading(false);
        }
        return;
      }

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false })
          .abortSignal(controller.signal);

        clearTimeout(timeout);

        if (cancelled) return;

        if (error) throw error;
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(staticPosts);
        }
      } catch {
        if (!cancelled) {
          setPosts(staticPosts);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPosts();
    return () => { cancelled = true; };
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
    let cancelled = false;

    if (!postId) {
      setLoading(false);
      return;
    }

    async function fetchPost() {
      const staticPosts = await getStaticPosts();

      if (!isSupabaseConfigured()) {
        if (!cancelled) {
          setPost(staticPosts.find((p) => p.id === postId) || null);
          setLoading(false);
        }
        return;
      }

      // Check if tables exist (uses localStorage cache)
      const tablesExist = await checkTablesExist();
      if (!tablesExist || cancelled) {
        if (!cancelled) {
          setPost(staticPosts.find((p) => p.id === postId) || null);
          setLoading(false);
        }
        return;
      }

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", postId)
          .single()
          .abortSignal(controller.signal);

        clearTimeout(timeout);

        if (cancelled) return;

        if (error) throw error;
        setPost(data);
      } catch {
        if (!cancelled) {
          setPost(staticPosts.find((p) => p.id === postId) || null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPost();
    return () => { cancelled = true; };
  }, [postId]);

  return { post, loading };
}
