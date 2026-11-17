import { supabase } from "@/lib/supabase";

// Admin account email. The password is never stored in the client; it is
// checked by Supabase Auth. The email is not secret, so a Vite env var is fine.
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

export function isAdminAuthConfigured() {
  return !!supabase && !!ADMIN_EMAIL;
}

/** Sign in with the admin account. Throws on failure. */
export async function signInAdmin(password) {
  if (!isAdminAuthConfigured()) {
    throw new Error("Admin auth is not configured (Supabase or VITE_ADMIN_EMAIL missing).");
  }
  const { error } = await supabase.auth.signInWithPassword({
    email: ADMIN_EMAIL,
    password,
  });
  if (error) throw error;
}

/** Returns the current Supabase session, or null. */
export async function getAdminSession() {
  if (!supabase) return null;
  try {
    const { data } = await supabase.auth.getSession();
    return data.session ?? null;
  } catch {
    return null;
  }
}

export async function signOutAdmin() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

/** Subscribe to sign-in / sign-out events. Returns an unsubscribe function. */
export function onAdminAuthChange(callback) {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
  return () => data.subscription.unsubscribe();
}
