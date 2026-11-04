import gsap from 'gsap';
import * as THREE from 'three';
import type { CharacterStoryRig, OfficeStoryTargets } from './office';

type StoryOptions = {
  camera: THREE.PerspectiveCamera;
  canvas: HTMLCanvasElement;
  draw: () => void;
  ledLights: THREE.PointLight[];
  stage: HTMLElement;
  targets: OfficeStoryTargets;
};

type TransformSnapshot = {
  object: THREE.Object3D;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
};

const storyScenes = [
  { key: 'listen', copy: 'Still managing everything manually?' },
  { key: 'build', copy: "Let's build a smarter system." },
  { key: 'automate', copy: 'Automated. Connected. Simplified.' },
  { key: 'talk', copy: "Got an idea? Let's make it real." },
] as const;

export function mountOfficeStory({ camera, canvas, draw, ledLights, stage, targets }: StoryOptions) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const lowPower = navigator.hardwareConcurrency <= 4 || deviceMemory <= 4;
  canvas.dataset.storyMode = reducedMotion ? 'reduced' : lowPower ? 'light' : 'full';
  if (reducedMotion) return () => { delete canvas.dataset.storyMode; };

  const characters: CharacterStoryRig[] = [targets.listener, targets.builder, targets.automator, targets.presenter];
  const animatedObjects = new Set<THREE.Object3D>();
  characters.forEach(character => {
    animatedObjects.add(character.head);
    animatedObjects.add(character.primaryHand);
    if (character.secondaryHand) animatedObjects.add(character.secondaryHand);
    character.monitorGroups.forEach(group => animatedObjects.add(group));
  });
  const snapshots: TransformSnapshot[] = [...animatedObjects].map(object => ({
    object,
    position: object.position.clone(),
    rotation: object.rotation.clone(),
    scale: object.scale.clone(),
  }));
  const monitorMaterials = [...new Set([
    ...targets.builder.monitorMaterials,
    ...targets.automator.monitorMaterials,
  ])];
  const materialSnapshots = monitorMaterials.map(material => ({
    material,
    emissive: material.emissive.clone(),
    emissiveIntensity: material.emissiveIntensity,
  }));
  monitorMaterials.forEach(material => {
    material.emissive.copy(material.color).lerp(new THREE.Color(0x1754f5), .55);
    material.emissiveIntensity = 0;
  });

  const layer = document.createElement('div');
  layer.className = 'scene-story-layer';
  layer.setAttribute('aria-hidden', 'true');
  const anchors = [targets.listener.anchor, targets.builder.anchor, targets.automator.anchor, targets.presenter.anchor];
  const bubbles = storyScenes.map(scene => {
    const wrapper = document.createElement('div');
    wrapper.className = 'scene-story-anchor';
    wrapper.dataset.storyBubble = scene.key;
    const bubble = document.createElement('div');
    bubble.className = 'scene-story-bubble';
    bubble.innerHTML = `<span class="scene-story-status"></span><span>${scene.copy}</span>`;
    wrapper.append(bubble);
    layer.append(wrapper);
    return { wrapper, bubble };
  });
  stage.append(layer);
  gsap.set(bubbles.map(item => item.bubble), { autoAlpha: 0, scale: .85, y: 10, transformOrigin: '50% 100%' });

  const headerCTA = document.querySelector<HTMLElement>('.header-cta');
  const timeline = gsap.timeline({ paused: true, repeat: -1, defaults: { overwrite: 'auto' } });
  const ledIntensities = ledLights.map(light => light.intensity);
  ledLights.forEach((light, index) => {
    timeline.to(light, {
      intensity: ledIntensities[index] + (lowPower ? .2 : .4),
      duration: 1.4,
      repeat: 9,
      yoyo: true,
      ease: 'sine.inOut',
    }, 0);
  });
  const bubblePhase = (index: number, at: number) => {
    const bubble = bubbles[index].bubble;
    timeline
      .call(() => { canvas.dataset.storyScene = storyScenes[index].key; }, [], at)
      .to(bubble, { autoAlpha: 1, scale: 1, y: 0, duration: .5, ease: 'power3.out' }, at + .18)
      .to(bubble, { y: -4, duration: .85, repeat: 1, yoyo: true, ease: 'sine.inOut' }, at + .75)
      .to(bubble, { autoAlpha: 0, scale: .96, y: -9, duration: .42, ease: 'power2.inOut' }, at + 2.48);
  };
  bubblePhase(0, 0);
  bubblePhase(1, 3);
  bubblePhase(2, 6);
  bubblePhase(3, 9);

  const breathe = (character: CharacterStoryRig, at = 0) => {
    const y = character.head.position.y;
    timeline.to(character.head.position, {
      y: y + .008,
      duration: 1.15,
      repeat: 10,
      yoyo: true,
      ease: 'sine.inOut',
    }, at);
  };
  characters.forEach(character => breathe(character));

  const listenHead = targets.listener.head.rotation.clone();
  const listenHand = targets.listener.primaryHand.rotation.clone();
  timeline
    .to(targets.listener.head.rotation, { y: listenHead.y + .075, z: listenHead.z - .025, duration: 1.05, ease: 'power2.inOut' }, .25)
    .to(targets.listener.primaryHand.rotation, { x: listenHand.x - .035, z: listenHand.z - .065, duration: .8, ease: 'power2.inOut' }, .45)
    .to(targets.listener.primaryHand.rotation, { x: listenHand.x, z: listenHand.z, duration: .75, ease: 'sine.inOut' }, 2.05)
    .to(targets.listener.head.rotation, { y: listenHead.y, z: listenHead.z, duration: .65, ease: 'sine.inOut' }, 2.2);

  const builderHead = targets.builder.head.rotation.clone();
  const builderPrimary = targets.builder.primaryHand.rotation.clone();
  const builderSecondary = targets.builder.secondaryHand!.rotation.clone();
  timeline
    .to(targets.builder.head.rotation, { x: builderHead.x + .045, y: builderHead.y - .025, duration: .75, ease: 'power2.inOut' }, 3.15)
    .to(targets.builder.primaryHand.rotation, { x: builderPrimary.x + .032, z: builderPrimary.z - .018, duration: .17, repeat: lowPower ? 5 : 9, yoyo: true, ease: 'sine.inOut' }, 3.38)
    .to(targets.builder.secondaryHand!.rotation, { x: builderSecondary.x - .03, z: builderSecondary.z + .018, duration: .19, repeat: lowPower ? 4 : 8, yoyo: true, ease: 'sine.inOut' }, 3.46)
    .to(targets.builder.primaryHand.rotation, { x: builderPrimary.x, z: builderPrimary.z, duration: .35, ease: 'sine.inOut' }, 5.35)
    .to(targets.builder.secondaryHand!.rotation, { x: builderSecondary.x, z: builderSecondary.z, duration: .35, ease: 'sine.inOut' }, 5.4)
    .to(targets.builder.head.rotation, { x: builderHead.x, y: builderHead.y, duration: .65, ease: 'sine.inOut' }, 5.65);
  targets.builder.monitorMaterials.forEach(material => {
    timeline.to(material, { emissiveIntensity: .42, duration: .65, ease: 'power2.inOut' }, 3.25)
      .to(material, { emissiveIntensity: .12, duration: .55, ease: 'sine.inOut' }, 5.75);
  });
  targets.builder.monitorGroups.slice(1).forEach((group, index) => {
    timeline.fromTo(group.scale, { x: .88 + index * .03 }, {
      x: 1,
      duration: .55 + index * .08,
      repeat: lowPower ? 1 : 3,
      yoyo: true,
      ease: 'sine.inOut',
    }, 3.45 + index * .12)
      .to(group.scale, { x: 1, duration: .3, ease: 'sine.inOut' }, 5.55);
  });

  const automatorHead = targets.automator.head.rotation.clone();
  const automatorPrimary = targets.automator.primaryHand.rotation.clone();
  const automatorSecondary = targets.automator.secondaryHand!.rotation.clone();
  timeline
    .to(targets.automator.head.rotation, { x: automatorHead.x + .04, y: automatorHead.y + .035, duration: .75, ease: 'power2.inOut' }, 6.12)
    .to(targets.automator.primaryHand.rotation, { x: automatorPrimary.x - .026, z: automatorPrimary.z + .018, duration: .2, repeat: lowPower ? 4 : 8, yoyo: true, ease: 'sine.inOut' }, 6.38)
    .to(targets.automator.secondaryHand!.rotation, { x: automatorSecondary.x + .024, z: automatorSecondary.z - .014, duration: .22, repeat: lowPower ? 3 : 7, yoyo: true, ease: 'sine.inOut' }, 6.5)
    .to(targets.automator.primaryHand.rotation, { x: automatorPrimary.x, z: automatorPrimary.z, duration: .35, ease: 'sine.inOut' }, 8.35)
    .to(targets.automator.secondaryHand!.rotation, { x: automatorSecondary.x, z: automatorSecondary.z, duration: .35, ease: 'sine.inOut' }, 8.4)
    .to(targets.automator.head.rotation, { x: automatorHead.x, y: automatorHead.y, duration: .65, ease: 'sine.inOut' }, 8.65);
  targets.automator.monitorMaterials.forEach(material => {
    timeline.to(material, { emissiveIntensity: .48, duration: .65, ease: 'power2.inOut' }, 6.25)
      .to(material, { emissiveIntensity: .12, duration: .55, ease: 'sine.inOut' }, 8.72);
  });
  targets.automator.monitorGroups.slice(1).forEach((group, index) => {
    const property = index === 2 ? 'x' : 'y';
    timeline.fromTo(group.scale, { [property]: .78 + index * .06 }, {
      [property]: 1,
      duration: .48 + index * .08,
      repeat: lowPower ? 1 : 3,
      yoyo: true,
      ease: 'sine.inOut',
    }, 6.42 + index * .13)
      .to(group.scale, { [property]: 1, duration: .3, ease: 'sine.inOut' }, 8.55);
  });

  const presenterHead = targets.presenter.head.rotation.clone();
  const presenterHand = targets.presenter.primaryHand.rotation.clone();
  const idleClock = { value: 0 };
  timeline
    .call(() => headerCTA?.classList.add('story-emphasis'), [], 9.12)
    .to(targets.presenter.head.rotation, { y: presenterHead.y - .075, z: presenterHead.z + .02, duration: .95, ease: 'power2.inOut' }, 9.2)
    .to(targets.presenter.primaryHand.rotation, { x: presenterHand.x + .035, z: presenterHand.z + .06, duration: .8, ease: 'power2.inOut' }, 9.4)
    .to(targets.presenter.primaryHand.rotation, { x: presenterHand.x, z: presenterHand.z, duration: .75, ease: 'sine.inOut' }, 11.05)
    .to(targets.presenter.head.rotation, { y: presenterHead.y, z: presenterHead.z, duration: .7, ease: 'sine.inOut' }, 11.2)
    .call(() => headerCTA?.classList.remove('story-emphasis'), [], 11.95)
    .call(() => { canvas.dataset.storyScene = 'idle'; }, [], 12)
    .to(idleClock, { value: 1, duration: 2, ease: 'none' }, 12);

  const projected = new THREE.Vector3();
  let stageWidth = Math.max(1, stage.clientWidth);
  let stageHeight = Math.max(1, stage.clientHeight);
  const bubbleSizes = bubbles.map(item => ({
    width: item.bubble.offsetWidth || 220,
    height: item.bubble.offsetHeight || 48,
  }));
  const updateBubblePositions = () => {
    anchors.forEach((anchor, index) => {
      anchor.getWorldPosition(projected).project(camera);
      const { width: bubbleWidth, height: bubbleHeight } = bubbleSizes[index];
      const x = THREE.MathUtils.clamp((projected.x * .5 + .5) * stageWidth, bubbleWidth / 2 + 8, stageWidth - bubbleWidth / 2 - 8);
      const y = THREE.MathUtils.clamp((-projected.y * .5 + .5) * stageHeight - bubbleHeight - 12, 8, stageHeight - bubbleHeight - 8);
      bubbles[index].wrapper.style.transform = `translate3d(${x - bubbleWidth / 2}px, ${y}px, 0)`;
      bubbles[index].wrapper.hidden = projected.z < -1 || projected.z > 1;
    });
  };

  const layoutObserver = new ResizeObserver(() => {
    stageWidth = Math.max(1, stage.clientWidth);
    stageHeight = Math.max(1, stage.clientHeight);
    bubbles.forEach((item, index) => {
      bubbleSizes[index].width = item.bubble.offsetWidth || 220;
      bubbleSizes[index].height = item.bubble.offsetHeight || 48;
    });
    updateBubblePositions();
  });
  layoutObserver.observe(stage);

  const stageIsVisible = () => {
    const rect = stage.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  };
  let visible = stageIsVisible();
  let scrolling = false;
  let scrollIdleTimer: number | undefined;
  let lastRender = -Infinity;
  let lastOverlayUpdate = -Infinity;
  const frameInterval = 1 / (lowPower ? 20 : 30);
  const tick = (time: number) => {
    if (!visible || document.hidden || scrolling || time - lastRender < frameInterval) return;
    lastRender = time;
    if (time - lastOverlayUpdate >= .25) {
      lastOverlayUpdate = time;
      canvas.dataset.storyTime = timeline.time().toFixed(2);
      canvas.dataset.storyDuration = timeline.duration().toFixed(2);
      updateBubblePositions();
    }
    draw();
  };
  gsap.ticker.add(tick);
  const syncPlayback = () => {
    const active = visible && !document.hidden && !scrolling;
    canvas.dataset.storyPlayback = active
      ? 'playing'
      : scrolling ? 'scroll-paused' : visible ? 'document-paused' : 'out-of-view';
    if (active) {
      bubbles.forEach(item => { item.wrapper.hidden = false; });
      headerCTA?.classList.toggle('story-emphasis', timeline.time() >= 9.12 && timeline.time() < 11.95);
      timeline.resume();
      updateBubblePositions();
    } else {
      timeline.pause();
      bubbles.forEach(item => { item.wrapper.hidden = true; });
      headerCTA?.classList.remove('story-emphasis');
    }
  };
  const onScrollActivity = () => {
    if (!scrolling) {
      scrolling = true;
      syncPlayback();
    }
    if (scrollIdleTimer !== undefined) window.clearTimeout(scrollIdleTimer);
    scrollIdleTimer = window.setTimeout(() => {
      scrolling = false;
      lastRender = -Infinity;
      syncPlayback();
      updateBubblePositions();
      draw();
    }, 120);
  };
  const scrollEvents = ['wheel', 'touchmove', 'scroll'] as const;
  scrollEvents.forEach(event => window.addEventListener(event, onScrollActivity, { passive: true }));
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting) || stageIsVisible();
    syncPlayback();
  }, { threshold: [.05, .2] });
  observer.observe(stage);
  syncPlayback();
  const onVisibilityChange = () => syncPlayback();
  document.addEventListener('visibilitychange', onVisibilityChange);

  return () => {
    observer.disconnect();
    layoutObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibilityChange);
    scrollEvents.forEach(event => window.removeEventListener(event, onScrollActivity));
    if (scrollIdleTimer !== undefined) window.clearTimeout(scrollIdleTimer);
    gsap.ticker.remove(tick);
    timeline.kill();
    headerCTA?.classList.remove('story-emphasis');
    layer.remove();
    snapshots.forEach(snapshot => {
      snapshot.object.position.copy(snapshot.position);
      snapshot.object.rotation.copy(snapshot.rotation);
      snapshot.object.scale.copy(snapshot.scale);
    });
    materialSnapshots.forEach(snapshot => {
      snapshot.material.emissive.copy(snapshot.emissive);
      snapshot.material.emissiveIntensity = snapshot.emissiveIntensity;
    });
    ledLights.forEach((light, index) => { light.intensity = ledIntensities[index]; });
    delete canvas.dataset.storyMode;
    delete canvas.dataset.storyScene;
    delete canvas.dataset.storyTime;
    delete canvas.dataset.storyDuration;
    delete canvas.dataset.storyPlayback;
  };
}
