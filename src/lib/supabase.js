import { createClient } from "@supabase/supabase-js";

// Environment variables are injected at build time by Vite
// They are NOT accessible at runtime via process.env
const _u = import.meta.env.VITE_SUPABASE_URL;
const _k = import.meta.env.VITE_SUPABASE_ANON_KEY;

const _isValid = _u && _k && !_u.includes("PASTE_YOUR") && !_k.includes("PASTE_YOUR");

export const supabase = _isValid ? createClient(_u, _k, {
  db: { schema: "public" },
  global: { fetch: (...args) => fetch(...args) },
}) : null;

// Cache key for table existence
const TABLES_CHECK_KEY = "supabase_tables_exist";
const TABLES_CHECK_TTL = 1000 * 60 * 60; // 1 hour

let _tablesExist = null;

/**
 * Check if the required Supabase tables exist.
 * Uses localStorage cache to avoid repeated queries.
 */
export async function checkTablesExist() {
  // Return cached value if available
  if (_tablesExist !== null) return _tablesExist;

  if (!supabase) {
    _tablesExist = false;
    return false;
  }

  // Check localStorage cache
  try {
    const cached = localStorage.getItem(TABLES_CHECK_KEY);
    if (cached) {
      const { exists, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < TABLES_CHECK_TTL) {
        _tablesExist = exists;
        return exists;
      }
    }
  } catch {
    // ignore
  }

  // Query Supabase with timeout
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout

    const { error } = await supabase
      .from("posts")
      .select("id")
      .limit(1)
      .abortSignal(controller.signal);

    clearTimeout(timeout);
    _tablesExist = !error;

    // Cache result
    try {
      localStorage.setItem(TABLES_CHECK_KEY, JSON.stringify({
        exists: !error,
        timestamp: Date.now(),
      }));
    } catch {
      // ignore
    }

    return _tablesExist;
  } catch {
    _tablesExist = false;

    // Cache negative result
    try {
      localStorage.setItem(TABLES_CHECK_KEY, JSON.stringify({
        exists: false,
        timestamp: Date.now(),
      }));
    } catch {
      // ignore
    }

    return false;
  }
}

export function isSupabaseConfigured() {
  return !!supabase;
}
