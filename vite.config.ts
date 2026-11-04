import { defineConfig, loadEnv } from "vite";

function contentSecurityPolicy(apiBase: string, mode: string) {
  let apiSource = "'self'";
  if (apiBase && !apiBase.startsWith("/")) {
    const apiURL = new URL(apiBase);
    if (apiURL.protocol !== "https:" && !(mode === "development" && apiURL.protocol === "http:")) {
      throw new Error("VITE_API_BASE_URL must use HTTPS outside development");
    }
    if (apiURL.username || apiURL.password) {
      throw new Error("VITE_API_BASE_URL must not contain credentials");
    }
    apiSource = apiURL.origin;
  }

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "form-action 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob:",
    `connect-src 'self' ${apiSource}${mode === "development" ? " ws:" : ""}`,
    "worker-src 'self' blob:",
  ].join("; ");
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");
  const apiBase = env.VITE_API_BASE_URL || (mode === "development" ? "http://localhost:8080" : "");
  const policy = contentSecurityPolicy(apiBase, mode);

  return {
    plugins: [{
      name: "content-security-policy",
      transformIndexHtml(html: string) {
        return html.replace("</head>", `  <meta http-equiv="Content-Security-Policy" content="${policy}">\n  </head>`);
      },
    }],
  };
});
