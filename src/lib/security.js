// Client-side login throttle. This is only a UX guard against repeated
// attempts; real protection comes from Supabase Auth and RLS.

const WINDOW_MS = 900000; // 15 minutes
const MAX_ATTEMPTS = 5;

const _attempts = { count: 0, lastAttempt: 0 };

export function checkRateLimit() {
  const now = Date.now();
  if (now - _attempts.lastAttempt > WINDOW_MS) {
    _attempts.count = 0;
  }
  _attempts.lastAttempt = now;
  _attempts.count++;

  if (_attempts.count > MAX_ATTEMPTS) {
    return {
      locked: true,
      waitMinutes: Math.ceil(WINDOW_MS / 60000),
    };
  }
  return { locked: false, attemptsLeft: MAX_ATTEMPTS + 1 - _attempts.count };
}
