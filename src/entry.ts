const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const pagePath = window.location.pathname.slice(basePath.length);

if (pagePath.startsWith("/work/")) {
  void import("./work-detail");
} else {
  void import("./main");
}
