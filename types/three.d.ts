// `three` doesn't resolve a declaration file in this project's module
// resolution setup (Vercel build: "Could not find a declaration file for
// module 'three'"). It's only used as `any` via a dynamic import in the
// unused UnderstandScene3D.tsx fallback component, so a blanket ambient
// module declaration is enough to satisfy the type checker.
declare module 'three';
