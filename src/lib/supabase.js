import { createClient } from "@supabase/supabase-js";

// Environment variables are injected at build time by Vite
// They are NOT accessible at runtime via process.env
const _u = import.meta.env.VITE_SUPABASE_URL;
const _k = import.meta.env.VITE_SUPABASE_ANON_KEY;

const _isValid = _u && _k && !_u.includes("PASTE_YOUR") && !_k.includes("PASTE_YOUR");

export const supabase = _isValid ? createClient(_u, _k) : null;

export function isSupabaseConfigured() {
  return !!supabase;
}
