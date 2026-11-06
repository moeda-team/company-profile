# Nodeworks Selected Works

Next.js App Router + TypeScript, no animation dependency. Use CSS transform / clip-path, vertical wipe, typography transition, fixed 00. counter, progress, magnetic hover, compact navigation, reduced-motion fallback.

## Installation

1. Copy `components/*` into your Next.js project's `components` directory.
2. Add `<SelectedWorks onActiveChange={onActiveChange} />` to your page and pass the `compact` boolean to `<NodeworksNavbar compact={worksActive} />`. See `app/page.tsx` for example.
3. Replace `defaultProjects` with real data: `image: "/projects/papanclip.webp"`, etc. Put them in `public/projects/`.
4. Replace route URLs `/works/...` with real project routes. Or supply your array through `projects` prop.
5. Don't replace the existing hero: `app/page.tsx` is a working integration sample.

If your project uses `src/app`, adjust import paths. This component intentionally uses `<img>` for easy remote example previews. For production, use `next/image` with optimized local images and preload only the active or adjacent slide.
