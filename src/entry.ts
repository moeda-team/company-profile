import { initLocale } from './i18n';
import { initTheme } from './theme';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const pagePath = window.location.pathname.slice(basePath.length);

initTheme();
await initLocale();

if (pagePath.startsWith("/work/")) {
  void import("./work-detail");
} else {
  void import("./main");
}
