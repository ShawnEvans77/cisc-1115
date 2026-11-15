// localStorage can throw (blocked site data, some private modes). Progress and the
// theme are conveniences, so the app treats a failure as "nothing stored" and keeps going.

export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // the change still applies for this visit
  }
}
