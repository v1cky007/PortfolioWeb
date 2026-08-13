// Security module - obfuscated authentication

// Hash function (djb2)
function djb2Hash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0xffffffff;
  }
  return hash >>> 0;
}

// Obfuscated password hash (vicky007&$)
const _pwHash = djb2Hash("\x76\x69\x63\x6b\x79\x30\x30\x37\x26\x24");

export function verifyPassword(input) {
  return djb2Hash(input) === _pwHash;
}

// Rate limiter for login attempts
const _attempts = { count: 0, lastAttempt: 0 };

export function checkRateLimit() {
  const now = Date.now();
  if (now - _attempts.lastAttempt > 900000) {
    _attempts.count = 0;
  }
  _attempts.lastAttempt = now;
  _attempts.count++;

  if (_attempts.count > 5) {
    return { locked: true, waitMinutes: Math.ceil((900000 - (now - _attempts.lastAttempt)) / 60000) };
  }
  return { locked: false, attemptsLeft: 6 - _attempts.count };
}

// Obfuscated session check
export function isAuthorized() {
  try {
    const v = sessionStorage.getItem("_s");
    return v === "1";
  } catch {
    return false;
  }
}

export function setAuthorized() {
  sessionStorage.setItem("_s", "1");
  sessionStorage.setItem("_t", Date.now().toString());
}

export function clearAuthorization() {
  sessionStorage.removeItem("_s");
  sessionStorage.removeItem("_t");
}

// Session expires after 4 hours
export function isSessionValid() {
  try {
    const t = sessionStorage.getItem("_t");
    if (!t) return false;
    return Date.now() - parseInt(t) < 14400000;
  } catch {
    return false;
  }
}
