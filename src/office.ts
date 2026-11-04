import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import combinedBackWallURL from '../Nodeworks-Assets/nodeworks-back-wall-combined/04-nodeworks-back-wall-center copy.glb?url';
import { whenScrollIdle } from './scroll-idle';

type Vec3 = [number, number, number];
type Placement = { asset: number; name: string; at: Vec3; size?: Vec3; scale?: number; turn?: number; pitch?: number };

export type CharacterStoryRig = {
  anchor: THREE.Object3D;
  head: THREE.Group;
  primaryHand: THREE.Group;
  secondaryHand?: THREE.Group;
  monitorGroups: THREE.Group[];
  monitorMaterials: THREE.MeshStandardMaterial[];
};

export type OfficeStoryTargets = {
  listener: CharacterStoryRig;
  builder: CharacterStoryRig;
  automator: CharacterStoryRig;
  presenter: CharacterStoryRig;
};

const HEAD_PART = /^(peach_head|(?:left|right)_(?:inner_)?ear|(?:left|right)_eye(?:_white|_glint)?|(?:left|right)_eyebrow|small_rounded_nose|.*smile.*|small_white_smile_teeth|hair_|swept_dark_hairstyle|gathered_dark_hairstyle|low_curved_ponytail|ponytail_hair_tie)/;
const armPart = (side: 'left' | 'right') => new RegExp(`^${side}_(?:upper|short|exposed|elbow|raised|lifted|typing|shirt_cuff|white_cuff|thinking|presenting|open_hand|hand_|curled)`);

function mergeStoryGroup(group: THREE.Group, cloneMaterials = false) {
  const meshes = group.children.filter((child): child is THREE.Mesh => child instanceof THREE.Mesh);
  if (!meshes.length) return [];
  group.updateWorldMatrix(true, true);
  const inverse = group.matrixWorld.clone().invert();
  const batches = new Map<THREE.Material, THREE.BufferGeometry[]>();
  meshes.forEach(mesh => {
    const material = mesh.material as THREE.Material;
    let geometry = mesh.geometry.clone().applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse, mesh.matrixWorld));
    if (!geometry.getAttribute('normal')) geometry.computeVertexNormals();
    if (geometry.index) {
      const indexed = geometry;
      geometry = geometry.toNonIndexed();
      indexed.dispose();
    }
    Object.keys(geometry.attributes).forEach(name => {
      if (name !== 'position' && name !== 'normal') geometry.deleteAttribute(name);
    });
    if (!batches.has(material)) batches.set(material, []);
    batches.get(material)!.push(geometry);
    mesh.removeFromParent();
  });
  const materials: THREE.MeshStandardMaterial[] = [];
  batches.forEach((geometries, sourceMaterial) => {
    const geometry = mergeGeometries(geometries);
    geometries.forEach(part => part.dispose());
    if (!geometry) throw new Error(`Unable to merge ${group.name}.`);
    const material = (cloneMaterials ? sourceMaterial.clone() : sourceMaterial) as THREE.MeshStandardMaterial;
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = `${group.name} / ${material.name}`;
    mesh.castShadow = mesh.receiveShadow = true;
    group.add(mesh);
    materials.push(material);
  });
  group.userData.storyDynamic = true;
  return materials;
}

function createStoryGroup(
  model: THREE.Group,
  name: string,
  matches: (meshName: string) => boolean,
  pivot: (bounds: THREE.Box3) => THREE.Vector3,
  cloneMaterials = false,
) {
  const meshes = model.children.filter((child): child is THREE.Mesh => child instanceof THREE.Mesh && matches(child.name));
  if (!meshes.length) throw new Error(`Missing story meshes for ${name}.`);
  model.updateWorldMatrix(true, true);
  const bounds = new THREE.Box3();
  meshes.forEach(mesh => bounds.expandByObject(mesh));
  const group = new THREE.Group();
  group.name = name;
  group.position.copy(pivot(bounds).applyMatrix4(model.matrixWorld.clone().invert()));
  model.add(group);
  model.updateWorldMatrix(true, true);
  meshes.forEach(mesh => group.attach(mesh));
  const materials = mergeStoryGroup(group, cloneMaterials);
  return { group, materials };
}

function createCharacterStoryRig(model: THREE.Group, asset: 18 | 19 | 20 | 21): CharacterStoryRig {
  model.updateWorldMatrix(true, true);
  const bounds = new THREE.Box3().setFromObject(model);
  const centre = bounds.getCenter(new THREE.Vector3());
  const anchor = new THREE.Object3D();
  anchor.name = `Story anchor / ${asset}`;
  anchor.position.set(centre.x, bounds.max.y + .12, centre.z);
  model.add(anchor);
  const atHeadBase = (partBounds: THREE.Box3) => {
    const partCentre = partBounds.getCenter(new THREE.Vector3());
    return new THREE.Vector3(partCentre.x, partBounds.min.y + partBounds.getSize(new THREE.Vector3()).y * .08, partCentre.z);
  };
  const atShoulder = (partBounds: THREE.Box3) => {
    const partCentre = partBounds.getCenter(new THREE.Vector3());
    return new THREE.Vector3(partCentre.x, partBounds.max.y - partBounds.getSize(new THREE.Vector3()).y * .04, partCentre.z);
  };
  const head = createStoryGroup(model, `Story head / ${asset}`, name => HEAD_PART.test(name), atHeadBase).group;
  const rightHand = createStoryGroup(model, `Story right arm / ${asset}`, name => armPart('right').test(name), atShoulder).group;
  const leftHand = asset >= 20
    ? createStoryGroup(model, `Story left arm / ${asset}`, name => armPart('left').test(name), atShoulder).group
    : undefined;
  const monitorGroups: THREE.Group[] = [];
  const monitorMaterials: THREE.MeshStandardMaterial[] = [];
  const monitorGroup = (name: string, matches: (meshName: string) => boolean) => {
    const result = createStoryGroup(model, name, matches, groupBounds => groupBounds.getCenter(new THREE.Vector3()), true);
    monitorGroups.push(result.group);
    monitorMaterials.push(...result.materials);
  };
  if (asset === 20) {
    monitorGroup('Story code display', name => name === 'laptop_code_display');
    monitorGroup('Story code activity A', name => /^code_(?:header_accent|line_[1357]|status_line)$/.test(name));
    monitorGroup('Story code activity B', name => /^code_(?:line_[246]|bottom_accent)$/.test(name));
  }
  if (asset === 21) {
    monitorGroup('Story dashboard display', name => name === 'laptop_dashboard_display' || /^dashboard_(?:header|subtitle|grid_|trend_)/.test(name));
    monitorGroup('Story dashboard activity A', name => /^dashboard_bar_[1357]$/.test(name));
    monitorGroup('Story dashboard activity B', name => /^dashboard_bar_[246]$/.test(name));
    monitorGroup('Story dashboard status', name => /^dashboard_(?:dot_|top_stat)/.test(name));
  }
  return {
    anchor,
    head,
    primaryHand: asset === 20 ? leftHand! : rightHand,
    secondaryHand: asset === 20 || asset === 21 ? (asset === 20 ? rightHand : leftHand) : undefined,
    monitorGroups,
    monitorMaterials,
  };
}

// The supplied models have individual inferred scales, not a shared room scale.
// Sizes below are in metres (X width, Y height, Z depth), with a bottom-centre pivot.
// +Z is the open front of the room. Floor surface is Y=.3; the base is 16 x 10 m.
const floor = .3;
const placements: Placement[] = [
  { asset: 1, name: 'Base floor', at: [0, 0, 0], size: [16, floor, 10] },
  // Preserve the supplied combined wall's proportions; its front faces -Z natively.
  { asset: 4, name: 'Combined back wall', at: [0, floor, -4.45], size: [10.6, 5.9, 1.21], turn: Math.PI },
  { asset: 2, name: 'Left structure', at: [-5.9, floor, -4.35], size: [3.6, 5.9, .6] },
  { asset: 3, name: 'Right structure', at: [5.95, floor, -4.35], size: [3.5, 5.9, .6] },
  { asset: 5, name: 'Left glass wall', at: [-7.45, floor, -.3], size: [7.6, 5.9, .16], turn: Math.PI / 2 },
  { asset: 6, name: 'Right glass wall', at: [7.45, floor, -.3], size: [7.6, 5.9, .16], turn: -Math.PI / 2 },
  { asset: 7, name: 'Back ceiling rail', at: [0, 6, -4.35], size: [15.4, .62, .5] },
  { asset: 7, name: 'Left ceiling rail', at: [-7.45, 5.85, -.3], size: [7.7, .62, .5], turn: Math.PI / 2 },
  { asset: 7, name: 'Right ceiling rail', at: [7.45, 5.85, -.3], size: [7.7, .62, .5], turn: -Math.PI / 2 },
  { asset: 1, name: 'Ceiling canopy', at: [0, 6.32, -.3], size: [15.25, .28, 8.6] },
  { asset: 8, name: 'Suspended studio light', at: [0, 5.85, -2.6], size: [4.5, .72, .8] },
  { asset: 15, name: 'Desk cluster', at: [0, floor, 1], size: [7.4, 1.7, 2.4] },
  // Working assets include their own chair and laptop. Scale keeps the embedded
  // laptop bases level with the resized desk's actual worktop (Y=1.46 m).
  { asset: 20, name: 'Left working team member', at: [-1.95, floor, 2], scale: 1.4, turn: Math.PI },
  { asset: 21, name: 'Right working team member', at: [1.95, floor, 2], scale: 1.4, turn: Math.PI },
  { asset: 18, name: 'Thinking team member', at: [-4.9, floor, 2.15], scale: 1.35, turn: .15 },
  { asset: 19, name: 'Presenting team member', at: [4.9, floor, 2.15], scale: 1.35, turn: -.15 },
  { asset: 26, name: 'Coffee on left desk', at: [-2.95, 1.46, 1.55], scale: 1.6 },
  { asset: 26, name: 'Coffee on right desk', at: [2.95, 1.46, 1.55], scale: 1.6 },
  { asset: 27, name: 'Desk notebook', at: [.65, 1.46, 1.3], scale: 1.7, turn: -.15 },
  { asset: 28, name: 'Desk pen holder', at: [-.65, 1.46, .65], scale: 1.8 },
  { asset: 29, name: 'Front left plant', at: [-6.6, floor, 3.6], size: [.85, 1.3, .85] },
  { asset: 29, name: 'Front right plant', at: [6.6, floor, 3.6], size: [.85, 1.3, .85] },
  { asset: 30, name: 'Left tall planter', at: [-5.9, floor, .1], size: [1.2, 1.85, .65] },
  { asset: 30, name: 'Right tall planter', at: [5.9, floor, .1], size: [1.2, 1.85, .65] },
  { asset: 9, name: 'Front left LED', at: [-4.4, .18, 5.02], size: [3, .05, .16], pitch: Math.PI / 2 },
  { asset: 9, name: 'Front right LED', at: [4.4, .18, 5.02], size: [3, .05, .16], pitch: Math.PI / 2 },
  { asset: 9, name: 'Left roof LED', at: [-7.17, 6.14, -.1], size: [3.1, .05, .12], pitch: Math.PI / 2, turn: Math.PI / 2 },
  { asset: 9, name: 'Right roof LED', at: [7.45, 6.48, -.3], size: [3.1, .035, .1], turn: Math.PI / 2 },
];

// Only assembled models are bundled. Working characters already include their laptops.
const files = import.meta.glob<string>(
  [
    '../Nodeworks-Assets/{01,02,03,05,06,07,08,09,15,18,19,20,21,26,27,28,29,30}-*/*.glb',
    '!../Nodeworks-Assets/{20,21}-*/16-*.glb',
  ],
  { eager: true, query: '?url', import: 'default' },
);
const assetURLs = new Map<number, string>([[4, combinedBackWallURL]]);
for (const [path, url] of Object.entries(files)) {
  const match = path.match(/\/(\d+)-[^/]+\/(\d+)-nodeworks-[^/]+\.glb$/);
  if (match && match[1] === match[2]) assetURLs.set(Number(match[1]), url);
}

function disposeModels(roots: THREE.Object3D[]) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  roots.forEach(root => root.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return;
    geometries.add(object.geometry);
    (Array.isArray(object.material) ? object.material : [object.material]).forEach(m => materials.add(m));
  }));
  geometries.forEach(geometry => geometry.dispose());
  materials.forEach(material => material.dispose());
}

// Static room: merge opaque geometry by PBR appearance to keep draw calls low.
// Glass stays separate so transparent panes can still be sorted independently.
function batchRoom(room: THREE.Group) {
  const batches = new Map<string, { material: THREE.MeshStandardMaterial; geometries: THREE.BufferGeometry[] }>();
  const originals = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  room.updateMatrixWorld(true);
  const meshes: THREE.Mesh[] = [];
  room.traverse(object => { if (object instanceof THREE.Mesh) meshes.push(object); });
  meshes.forEach(mesh => {
    const material = mesh.material as THREE.MeshStandardMaterial;
    mesh.castShadow = mesh.receiveShadow = true;
    let ancestor: THREE.Object3D | null = mesh;
    while (ancestor && ancestor !== room && !ancestor.userData.storyDynamic) ancestor = ancestor.parent;
    if (ancestor?.userData.storyDynamic) return;
    if (material.transparent) {
      mesh.castShadow = false;
      material.depthWrite = false;
      return;
    }
    const key = [material.color.getHex(), material.emissive.getHex(), material.emissiveIntensity,
      material.metalness, material.roughness, material.opacity, material.side].join(':');
    if (!batches.has(key)) batches.set(key, { material, geometries: [] });
    let geometry = mesh.geometry.clone().applyMatrix4(mesh.matrixWorld);
    if (!geometry.getAttribute('normal')) geometry.computeVertexNormals();
    if (geometry.index) {
      const indexed = geometry;
      geometry = geometry.toNonIndexed();
      indexed.dispose();
    }
    // The pack uses embedded flat PBR colours; it has no texture dependencies.
    Object.keys(geometry.attributes).forEach(name => {
      if (name !== 'position' && name !== 'normal') geometry.deleteAttribute(name);
    });
    batches.get(key)!.geometries.push(geometry);
    originals.add(mesh.geometry);
    materials.add(material);
    mesh.removeFromParent();
  });
  const retained = new Set<THREE.Material>();
  batches.forEach(({ material, geometries }) => {
    const geometry = mergeGeometries(geometries);
    geometries.forEach(part => part.dispose());
    if (!geometry) throw new Error('Unable to batch the studio geometry.');
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = `Studio material / ${material.name}`;
    mesh.castShadow = mesh.receiveShadow = true;
    room.add(mesh);
    retained.add(material);
  });
  originals.forEach(geometry => geometry.dispose());
  materials.forEach(material => { if (!retained.has(material)) material.dispose(); });
  room.userData.drawCalls = batches.size;
}

export function loadOffice(
  scene: THREE.Scene,
  canvas: HTMLCanvasElement,
  onLoad: (targets: OfficeStoryTargets) => void,
  onProgress: (progress: number) => void = () => {},
  onError: () => void = () => {},
) {
  const request = new AbortController();
  const models = new Map<number, THREE.Group>();
  let cancelled = false;
  let cancelParse = () => {};
  let errorLabel: HTMLParagraphElement | undefined;
  canvas.dataset.modelState = 'loading';
  const loader = new GLTFLoader();
  const assetIDs = [...new Set(placements.map(item => item.asset))];
  const room = new THREE.Group();
  const storyTargets: Partial<OfficeStoryTargets> = {};
  room.name = 'Nodeworks / supplied asset assembly';
  onProgress(0);

  async function load() {
    // Fetch together; parse one asset per idle slot to preserve scroll/input responsiveness.
    const downloads = await Promise.all(assetIDs.map(async id => {
      const url = assetURLs.get(id);
      if (!url) throw new Error(`Missing studio asset ${id}.`);
      const response = await fetch(url, { signal: request.signal });
      if (!response.ok) throw new Error(`Studio asset ${id} request failed (${response.status}).`);
      return { id, buffer: await response.arrayBuffer() };
    }));
    if (cancelled) return;
    let index = 0;
    const next = () => {
      if (cancelled) return;
      const download = downloads[index++];
      if (!download) {
        try { assemble(); } catch (error) { fail(error); }
        return;
      }
      loader.parse(download.buffer, '', gltf => {
        if (cancelled) { disposeModels([gltf.scene]); return; }
        models.set(download.id, gltf.scene);
        canvas.dataset.assetsLoaded = String(models.size);
        onProgress(models.size / assetIDs.length);
        cancelParse = whenScrollIdle(next);
      }, fail);
    };
    cancelParse = whenScrollIdle(next);
  }

  function assemble() {
    placements.forEach(item => {
      const model = models.get(item.asset)!.clone(true);
      const storyRig = item.asset >= 18 && item.asset <= 21
        ? createCharacterStoryRig(model, item.asset as 18 | 19 | 20 | 21)
        : undefined;
      if (item.asset === 9) {
        model.getObjectByName('pale_blue_top_inlay')?.removeFromParent();
        const diffuser = model.getObjectByName('white_emissive_band');
        if (diffuser) { diffuser.scale.x = .94; diffuser.scale.z = .64; }
      }
      if (item.asset === 2) {
        // Keep the front composition free of Nodeworks logo geometry.
        const badges: THREE.Object3D[] = [];
        model.traverse(object => {
          if (/^(nodeworks_badge|logo_spoke_|logo_node_|logo_hub)/.test(object.name)) badges.push(object);
        });
        badges.forEach(object => object.removeFromParent());
      }
      if (item.name === 'Ceiling canopy') {
        model.traverse(object => {
          if (!(object instanceof THREE.Mesh)) return;
          const material = (object.material as THREE.MeshStandardMaterial).clone();
          // Reuse the rounded base geometry as a pale architectural canopy.
          material.color.set(0xf5f7ff);
          material.emissive.set(0xaab7dc);
          material.emissiveIntensity = .22;
          material.metalness = .05;
          object.material = material;
        });
      }
      if (item.asset === 8 || item.asset === 9) {
        model.traverse(object => {
          if (!(object instanceof THREE.Mesh)) return;
          const original = object.material as THREE.MeshStandardMaterial;
          if (!/diffuser|emissive|blue_light|blue_band|blue_rim|led_base/i.test(`${object.name} ${original.name}`)) return;
          const material = original.clone();
          const white = /white|diffuser/i.test(`${object.name} ${original.name}`);
          material.emissive.set(white ? 0xd8f4ff : 0x007bff);
          material.emissiveIntensity = white ? 2.5 : 1.2;
          if (!white) material.color.set(0x007bff);
          object.material = material;
        });
      }
      const bounds = new THREE.Box3().setFromObject(model);
      const native = bounds.getSize(new THREE.Vector3());
      const centre = bounds.getCenter(new THREE.Vector3());
      const pivot = new THREE.Group();
      pivot.name = item.name;
      // Normalise bottom-centre before scaling and rotating, including asymmetric models.
      model.position.sub(new THREE.Vector3(centre.x, bounds.min.y, centre.z));
      pivot.add(model);
      if (item.size) pivot.scale.set(item.size[0] / native.x, item.size[1] / native.y, item.size[2] / native.z);
      else pivot.scale.setScalar(item.scale ?? 1);
      pivot.rotation.set(item.pitch ?? 0, item.turn ?? 0, 0, 'YXZ');
      pivot.position.set(...item.at);
      room.add(pivot);
      if (storyRig) {
        if (item.asset === 18) storyTargets.listener = storyRig;
        if (item.asset === 19) storyTargets.presenter = storyRig;
        if (item.asset === 20) storyTargets.builder = storyRig;
        if (item.asset === 21) storyTargets.automator = storyRig;
      }
    });
    for (const x of [-4.6, 4.6]) {
      const trim = new THREE.Mesh(new THREE.TorusGeometry(.36, .045, 8, 40),
        new THREE.MeshStandardMaterial({ color: 0x087dff, emissive: 0x087dff, emissiveIntensity: 1.6 }));
      trim.name = 'Recessed ceiling light trim';
      trim.rotation.x = Math.PI / 2;
      trim.position.set(x, 6.29, -1.8);
      room.add(trim);
      const diffuser = new THREE.Mesh(new THREE.CircleGeometry(.33, 40),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xe8f6ff, emissiveIntensity: 2.5 }));
      diffuser.name = 'Recessed ceiling light diffuser';
      diffuser.rotation.x = Math.PI / 2;
      diffuser.position.set(x, 6.28, -1.8);
      room.add(diffuser);
    }
    // Preserve real assembly bounds before material batching and before adding halos/shadows.
    const framingPoints: THREE.Vector3[] = [];
    room.updateMatrixWorld(true);
    for (const object of room.children) {
      const box = new THREE.Box3().setFromObject(object);
      if (box.isEmpty()) continue;
      for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) {
        framingPoints.push(new THREE.Vector3(x, y, z));
      }
    }
    room.userData.framingPoints = framingPoints;
    batchRoom(room);
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = glowCanvas.height = 128;
    const context = glowCanvas.getContext('2d')!;
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(125,220,255,.65)');
    gradient.addColorStop(.3, 'rgba(30,135,255,.22)');
    gradient.addColorStop(1, 'rgba(0,80,255,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);
    const haloMaterial = new THREE.SpriteMaterial({ map: glowTexture, transparent: true, opacity: .75,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
    const halo = (at: Vec3, size: [number, number]) => {
      const sprite = new THREE.Sprite(haloMaterial);
      sprite.position.set(...at);
      sprite.scale.set(size[0], size[1], 1);
      room.add(sprite);
    };
    const discCanvas = document.createElement('canvas');
    discCanvas.width = discCanvas.height = 128;
    const discContext = discCanvas.getContext('2d')!;
    const discGradient = discContext.createRadialGradient(64, 64, 0, 64, 64, 64);
    discGradient.addColorStop(0, 'rgba(255,255,255,1)');
    discGradient.addColorStop(.42, 'rgba(240,252,255,1)');
    discGradient.addColorStop(.5, 'rgba(0,125,255,.9)');
    discGradient.addColorStop(1, 'rgba(0,90,255,0)');
    discContext.fillStyle = discGradient;
    discContext.fillRect(0, 0, 128, 128);
    const discMaterial = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(discCanvas), transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
    for (const x of [-4.6, 4.6]) {
      const disc = new THREE.Sprite(discMaterial);
      disc.position.set(x, 6.25, -1.75);
      disc.scale.set(1.15, .34, 1);
      room.add(disc);
    }
    halo([0, 5.9, -2.3], [5, .42]);
    for (const x of [-4.4, 4.4]) halo([x, .2, 5.1], [3.5, .48]);
    // Original resources are shared with the cloned instances; the scene owns them now.
    models.clear();
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(36, 28), new THREE.ShadowMaterial({ opacity: .045 }));
    ground.name = 'Studio contact shadow';
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -.015;
    ground.receiveShadow = true;
    room.add(ground);
    scene.add(room);
    canvas.dataset.assetCount = String(assetIDs.length);
    canvas.dataset.placementCount = String(placements.length);
    canvas.dataset.modelState = 'preparing';
    onProgress(1);
    if (!storyTargets.listener || !storyTargets.builder || !storyTargets.automator || !storyTargets.presenter) {
      throw new Error('The office storytelling characters are incomplete.');
    }
    onLoad(storyTargets as OfficeStoryTargets);
  }

  function fail(error: unknown) {
    if (cancelled) return;
    request.abort();
    cancelParse();
    disposeModels([...models.values()]);
    models.clear();
    canvas.dataset.modelState = 'error';
    onError();
    console.error('Unable to assemble the Nodeworks studio.', error);
    errorLabel = document.createElement('p');
    errorLabel.className = 'scene-error';
    errorLabel.textContent = 'The studio preview could not load. Please refresh to try again.';
    canvas.parentElement!.append(errorLabel);
  }

  load().catch(fail);
  return () => {
    cancelled = true;
    request.abort();
    cancelParse();
    disposeModels([...models.values()]);
    models.clear();
    errorLabel?.remove();
  };
}
