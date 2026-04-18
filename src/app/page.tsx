export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950">
      {/* ── Ambient glow orbs ── */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/30 blur-3xl animate-glow" />
        <div
          className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-400/20 blur-3xl animate-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-3xl animate-glow"
          style={{ animationDelay: "2s" }}
        />

        {/* ── Floating particles ── */}
        <div className="absolute left-1/4 top-20 h-3 w-3 rounded-full bg-blue-400 animate-float" />
        <div
          className="absolute right-1/3 top-1/3 h-2 w-2 rounded-full bg-cyan-300 animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute bottom-1/4 left-1/3 h-4 w-4 rounded-full bg-indigo-400 animate-float-reverse" />
        <div
          className="absolute right-1/4 top-2/3 h-2 w-2 rounded-full bg-blue-300 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/2 h-3 w-3 rounded-full bg-cyan-400 animate-float-reverse"
          style={{ animationDelay: "1.5s" }}
        />

        {/* ── Geometric shapes ── */}
        <div
          className="absolute right-1/4 top-1/4 h-16 w-16 rounded-lg border-2 border-blue-400/30 animate-float-reverse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 h-20 w-20 rounded-full border-2 border-cyan-400/20 animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute right-1/3 top-1/2 h-12 w-12 rotate-45 border-2 border-indigo-400/25 animate-float-reverse"
          style={{ animationDelay: "2.5s" }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-2xl px-6 text-center">
        {/* Logo / Icon */}
        <div className="relative mb-8 inline-block animate-fade-in-up">
          <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-50 blur-xl" />
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-2xl">
            <svg
              className="h-12 w-12 animate-pulse text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          <h1
            className="mb-6 inline-block text-6xl font-bold text-white md:text-7xl"
            style={{
              textShadow:
                "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.2)",
            }}
          >
            Coming Soon
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <p className="mb-8 text-2xl text-blue-200">
            We&apos;re working on something amazing. Stay tuned!
          </p>
        </div>

        {/* Bouncing dots */}
        <div
          className="flex justify-center gap-2 animate-fade-in-up"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-400" />
          <div
            className="h-3 w-3 animate-bounce rounded-full bg-cyan-400"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="h-3 w-3 animate-bounce rounded-full bg-indigo-400"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>

      {/* ── Corner sparkles ── */}
      <div
        className="absolute left-10 top-10 h-2 w-2 rounded-full bg-white animate-sparkle"
      />
      <div
        className="absolute right-20 top-20 h-2 w-2 rounded-full bg-white animate-sparkle"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-20 left-20 h-2 w-2 rounded-full bg-white animate-sparkle"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-10 right-10 h-2 w-2 rounded-full bg-white animate-sparkle"
        style={{ animationDelay: "1.5s" }}
      />
    </main>
  );
}
