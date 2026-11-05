export type Theme = 'light' | 'dark';

const storageKey = 'nodeworks-theme';
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme: Theme | null = null;

try {
  const saved = localStorage.getItem(storageKey);
  if (saved === 'light' || saved === 'dark') savedTheme = saved;
} catch { /* Theme still works when storage is unavailable. */ }

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#09142f' : '#eef4ff');
  document.querySelectorAll<HTMLButtonElement>('.theme-toggle').forEach(button => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const label = document.documentElement.lang === 'id'
      ? `Aktifkan mode ${next === 'light' ? 'terang' : 'gelap'}`
      : `Switch to ${next} mode`;
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  });
}

export function initTheme() {
  applyTheme(savedTheme ?? (systemTheme.matches ? 'dark' : 'light'));
  systemTheme.addEventListener('change', () => {
    if (!savedTheme) applyTheme(systemTheme.matches ? 'dark' : 'light');
  });
}

export function themeToggle() {
  return `<button class="theme-toggle" type="button" aria-label="Switch theme" aria-pressed="false"><svg class="theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z"/></svg><svg class="theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg></button>`;
}

export function mountThemeToggle() {
  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  document.querySelectorAll<HTMLButtonElement>('.theme-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      savedTheme = next;
      try { localStorage.setItem(storageKey, next); } catch { /* Keep this session's choice. */ }
      applyTheme(next);
    });
  });
}
