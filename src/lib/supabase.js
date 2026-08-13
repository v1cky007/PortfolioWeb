import { createClient } from "@supabase/supabase-js";

// Environment variables are injected at build time by Vite
// They are NOT accessible at runtime via process.env
const _u = import.meta.env.VITE_SUPABASE_URL;
const _k = import.meta.env.VITE_SUPABASE_ANON_KEY;

const _isValid = _u && _k && !_u.includes("PASTE_YOUR") && !_k.includes("PASTE_YOUR");

export const supabase = _isValid ? createClient(_u, _k) : null;

// Cache for table existence check (avoid repeated queries)
let _tablesChecked = false;
let _tablesExist = false;

/**
 * Check if the required Supabase tables exist.
 * Returns cached result after first check.
 */
export async function checkTablesExist() {
  if (_tablesChecked) return _tablesExist;

  if (!supabase) {
    _tablesChecked = true;
    _tablesExist = false;
    return false;
  }

  try {
    const { error } = await supabase.from("posts").select("id").limit(1);
    _tablesChecked = true;
    _tablesExist = !error;
    return _tablesExist;
  } catch {
    _tablesChecked = true;
    _tablesExist = false;
    return false;
  }
}

export function isSupabaseConfigured() {
  return !!supabase;
}
