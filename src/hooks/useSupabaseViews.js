import { useEffect } from "react";
import { supabase, isSupabaseConfigured, checkTablesExist } from "@/lib/supabase";

/**
 * Record a page view in Supabase when a blog post is visited.
 * Falls back to localStorage if Supabase is not configured or tables don't exist.
 */
export function useRecordView(postId) {
  useEffect(() => {
    if (!postId) return;

    // Don't record views from admin
    if (sessionStorage.getItem("admin_auth")) return;

    // Only record once per session
    const key = `viewed_${postId}`;
    if (sessionStorage.getItem(key)) return;

    async function record() {
      // Fire and forget - don't block rendering
      if (isSupabaseConfigured() && (await checkTablesExist())) {
        // Record in Supabase (non-blocking)
        supabase.from("page_views").insert({
          post_id: postId,
          viewed_at: new Date().toISOString(),
        }).then(() => {
          // Increment post view count after insert
          return supabase
            .from("posts")
            .select("views")
            .eq("id", postId)
            .single();
        }).then(({ data: post }) => {
          if (post) {
            supabase
              .from("posts")
              .update({ views: (post.views || 0) + 1 })
              .eq("id", postId);
          }
        }).catch(() => {
          // Silently fail - don't break the experience
        });
      } else {
        // Fallback: use localStorage
        try {
          const raw = localStorage.getItem("blog_views");
          const views = raw ? JSON.parse(raw) : {};
          views[postId] = (views[postId] || 0) + 1;
          localStorage.setItem("blog_views", JSON.stringify(views));
        } catch {
          // ignore
        }
      }

      sessionStorage.setItem(key, "1");
    }

    record();
  }, [postId]);
}
