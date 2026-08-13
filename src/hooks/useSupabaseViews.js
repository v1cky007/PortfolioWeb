import { useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Record a page view in Supabase when a blog post is visited.
 * Falls back to localStorage if Supabase is not configured.
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
      if (isSupabaseConfigured()) {
        // Record in Supabase
        await supabase.from("page_views").insert({
          post_id: postId,
          viewed_at: new Date().toISOString(),
        });

        // Increment post view count
        const { data: post } = await supabase
          .from("posts")
          .select("views")
          .eq("id", postId)
          .single();

        if (post) {
          await supabase
            .from("posts")
            .update({ views: (post.views || 0) + 1 })
            .eq("id", postId);
        }
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
