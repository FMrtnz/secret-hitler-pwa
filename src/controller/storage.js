const KEY = 'secret-hitler-pass-and-play:v1';

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore corrupted or unavailable storage */
  }
  return null;
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage may be full or disabled */
  }
}
