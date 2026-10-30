'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Prototype: the "Understand" illustration rebuilt as a live Three.js scene
 * instead of a rendered image/video.
 *
 * Round 2 — the first pass read as generic floating primitives (no
 * shadows, plain boxes/cards, nothing grounded). This version fixes the
 * concrete causes:
 * - Real shadow mapping (PCFSoft) + ACES tone mapping for depth instead of
 *   flat, shadowless lighting.
 * - Recognizable objects instead of abstract cubes: a laptop with a red
 *   warning triangle on screen, an analytics card with bar-chart meshes.
 * - Clutter sits ON the platform (grounded, casting/receiving shadows)
 *   instead of floating disconnected in mid-air — only the alert markers
 *   and the tangle blob hover, and only slightly.
 * - Tangle centerpiece is a solid dark core + a larger wireframe shell,
 *   so it reads as a tangled mass rather than a thin wireframe sketch.
 *
 * Canvas background stays fully transparent (alpha:true, clearColor
 * alpha 0) — there is no black-background problem with this approach,
 * unlike the mp4 clip.
 */
export default function UnderstandScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import('three').then((THREE: any) => {
      if (cancelled || !container) return;

      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;

      // ── Scene / isometric-style orthographic camera ──────────────────
      const scene = new THREE.Scene();

      const frustum = 3.5;
      let aspect = width / height;
      const camera = new THREE.OrthographicCamera(
        -frustum * aspect,
        frustum * aspect,
        frustum,
        -frustum,
        0.1,
        100,
      );
      camera.position.set(5.2, 4.6, 5.2);
      camera.lookAt(0, 0.5, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0); // fully transparent — never a black bg
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      container.appendChild(renderer.domElement);

      // ── Lights ─────────────────────────────────────────────────────
      scene.add(new THREE.HemisphereLight(0xfff5f5, 0xf3a9a9, 0.65));

      const key = new THREE.DirectionalLight(0xffffff, 1.05);
      key.position.set(4.5, 6.5, 3.5);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.left = -3.6;
      key.shadow.camera.right = 3.6;
      key.shadow.camera.top = 3.6;
      key.shadow.camera.bottom = -3.6;
      key.shadow.camera.near = 1;
      key.shadow.camera.far = 16;
      key.shadow.bias = -0.0015;
      scene.add(key);

      const fill = new THREE.DirectionalLight(0xffe4e4, 0.3);
      fill.position.set(-4, 2.5, -3);
      scene.add(fill);

      const group = new THREE.Group();
      scene.add(group);

      // ── Platform: rounded hexagon ─────────────────────────────────
      const sides = 6;
      const radius = 2.5;
      const platformShape = new THREE.Shape();
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) platformShape.moveTo(x, y);
        else platformShape.lineTo(x, y);
      }
      platformShape.closePath();

      const platformGeo = new THREE.ExtrudeGeometry(platformShape, {
        depth: 0.32,
        bevelEnabled: true,
        bevelThickness: 0.08,
        bevelSize: 0.09,
        bevelSegments: 4,
      });
      platformGeo.rotateX(-Math.PI / 2);
      const platform = new THREE.Mesh(
        platformGeo,
        new THREE.MeshStandardMaterial({ color: 0xfbd7d7, roughness: 0.6, metalness: 0.04 }),
      );
      platform.position.y = -0.32;
      platform.receiveShadow = true;
      group.add(platform);

      // ── Laptop — base + hinged screen with a warning triangle ──────
      const laptop = new THREE.Group();
      laptop.position.set(-1.5, 0, 0.3);
      laptop.rotation.y = 0.25;

      const base = new THREE.Mesh(
        new THREE.BoxGeometry(0.72, 0.045, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4, metalness: 0.3 }),
      );
      base.position.y = 0.0225;
      base.castShadow = true;
      base.receiveShadow = true;
      laptop.add(base);

      const hinge = new THREE.Group();
      hinge.position.set(0, 0.045, -0.25);
      // Screen geometry already extends straight up (+Y) from the hinge,
      // i.e. a fully vertical (90°) open position. A small extra negative
      // tilt leans it back slightly for a natural ~100-110° laptop angle.
      hinge.rotation.x = -0.22;
      laptop.add(hinge);

      const screen = new THREE.Mesh(
        new THREE.BoxGeometry(0.72, 0.46, 0.03),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.55 }),
      );
      screen.position.y = 0.23;
      screen.castShadow = true;
      hinge.add(screen);

      const face = new THREE.Mesh(
        new THREE.PlaneGeometry(0.62, 0.38),
        new THREE.MeshStandardMaterial({ color: 0xfef2f2, roughness: 0.9 }),
      );
      face.position.set(0, 0.23, 0.017);
      hinge.add(face);

      const triShape = new THREE.Shape();
      triShape.moveTo(0, 0.1);
      triShape.lineTo(-0.09, -0.06);
      triShape.lineTo(0.09, -0.06);
      triShape.closePath();
      const warningTriangle = new THREE.Mesh(
        new THREE.ShapeGeometry(triShape),
        new THREE.MeshBasicMaterial({ color: 0xef4444 }),
      );
      warningTriangle.position.set(0, 0.24, 0.019);
      hinge.add(warningTriangle);

      group.add(laptop);

      // ── Analytics card — upright panel with a small bar chart ──────
      const chart = new THREE.Group();
      chart.position.set(1.55, 0, -0.15);
      chart.rotation.y = -0.4;

      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(0.85, 0.95, 0.04),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85 }),
      );
      panel.position.y = 0.475;
      panel.rotation.x = -0.14;
      panel.castShadow = true;
      panel.receiveShadow = true;
      chart.add(panel);

      const barColors = [0x3b82f6, 0x2563eb, 0xf87171, 0x3b82f6];
      const barHeights = [0.22, 0.34, 0.16, 0.28];
      barHeights.forEach((h: number, i: number) => {
        const bar = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, h, 0.02),
          new THREE.MeshStandardMaterial({ color: barColors[i], roughness: 0.5 }),
        );
        bar.position.set(-0.28 + i * 0.19, 0.28 + h / 2, 0.045);
        bar.rotation.x = -0.14;
        bar.castShadow = true;
        chart.add(bar);
      });

      group.add(chart);

      // ── Tangle centerpiece — solid core + larger wireframe shell ───
      const tangle = new THREE.Group();
      tangle.position.set(0.05, 0.55, 0.15);

      const tangleCore = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.3, 1),
        new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.55 }),
      );
      tangleCore.castShadow = true;
      tangle.add(tangleCore);

      const tangleShell = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.42, 1),
        new THREE.MeshBasicMaterial({ color: 0x18181b, wireframe: true, transparent: true, opacity: 0.85 }),
      );
      tangle.add(tangleShell);

      group.add(tangle);

      // ── Scattered clutter — grounded on the platform, not floating ──
      const scatterColors = [0xffffff, 0xf87171, 0xe2e8f0, 0xfca5a5, 0xffffff, 0xf1f5f9];
      const scatterPositions: [number, number][] = [
        [-0.55, 0.75],
        [0.55, 0.65],
        [-0.15, 1.05],
        [0.35, -0.85],
        [-1.0, -0.55],
        [1.05, -0.6],
      ];
      const scatterCubes: any[] = [];
      scatterPositions.forEach(([x, z], i) => {
        const size = 0.11 + Math.random() * 0.07;
        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(size, size, size),
          new THREE.MeshStandardMaterial({ color: scatterColors[i % scatterColors.length], roughness: 0.6 }),
        );
        cube.position.set(x, size / 2, z);
        cube.rotation.y = Math.random() * Math.PI;
        cube.castShadow = true;
        cube.receiveShadow = true;
        group.add(cube);
        scatterCubes.push({ mesh: cube, offset: Math.random() * Math.PI * 2 });
      });

      // ── Floating alert markers — hover above the focal objects ─────
      const markerPositions: [number, number, number][] = [
        [-1.75, 1.1, 0.25],
        [-1.05, 1.55, 0.7],
        [1.5, 1.7, -0.55],
        [0.55, 1.9, 0.45],
      ];
      const markers: { mesh: any; offset: number }[] = [];
      markerPositions.forEach(([x, y, z], i) => {
        const marker = new THREE.Mesh(
          new THREE.CircleGeometry(0.14, 24),
          new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide }),
        );
        marker.position.set(x, y, z);
        marker.lookAt(camera.position);
        group.add(marker);
        markers.push({ mesh: marker, offset: i * 0.6 });
      });

      // ── Animate ────────────────────────────────────────────────────
      const clock = new THREE.Clock();
      let frameId = 0;
      const animate = () => {
        const t = clock.getElapsedTime();
        group.rotation.y = Math.sin(t * 0.14) * 0.16;

        tangleShell.rotation.x = t * 0.25;
        tangleShell.rotation.y = t * 0.18;
        tangle.position.y = 0.55 + Math.sin(t * 0.6) * 0.04;

        scatterCubes.forEach(({ mesh, offset }) => {
          mesh.rotation.y += 0.002;
          mesh.rotation.x = Math.sin(t * 0.3 + offset) * 0.03;
        });

        markers.forEach(({ mesh, offset }, i) => {
          mesh.position.y = markerPositions[i][1] + Math.sin(t * 0.8 + offset) * 0.07;
          mesh.lookAt(camera.position);
        });

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      // ── Resize ────────────────────────────────────────────────────
      const resizeObserver = new ResizeObserver(() => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        aspect = w / h;
        camera.left = -frustum * aspect;
        camera.right = frustum * aspect;
        camera.top = frustum;
        camera.bottom = -frustum;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
      resizeObserver.observe(container);

      cleanup = () => {
        cancelAnimationFrame(frameId);
        resizeObserver.disconnect();
        scene.traverse((obj: any) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
            else obj.material.dispose();
          }
        });
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <div ref={containerRef} className="understand-scene-3d" aria-hidden="true" />;
}
