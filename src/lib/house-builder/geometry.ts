import * as THREE from 'three';
import {
  CLADDING_OPTIONS,
  PLOT_SPECS,
  WALL_FINISHES,
  WINDOW_STYLES,
} from './configurations';
import { CladdingId, HouseConfig } from './types';

// 1 Three.js unit = 4 feet (0.25 scale keeps geometry crisp & camera framing clean)
export const FT = 0.25;

/**
 * Recursively disposes geometries, materials, and textures on an Object3D subtree
 * to prevent WebGL memory leaks when the user switches styles/plots repeatedly.
 */
export function disposeObject3D(root: THREE.Object3D) {
  root.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry?.dispose();
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((mat) => {
        if (!mat) return;
        for (const key of Object.keys(mat)) {
          const val = (mat as unknown as Record<string, unknown>)[key];
          if (val && val instanceof THREE.Texture) {
            val.dispose();
          }
        }
        mat.dispose();
      });
    }
  });
}

function createCladdingTexture(cladding: CladdingId): THREE.CanvasTexture | null {
  if (cladding === 'none' || typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const base = CLADDING_OPTIONS.find((c) => c.id === cladding)?.hex || '#8F8578';
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 128, 128);

  if (cladding === 'cedar-wood') {
    for (let x = 0; x < 128; x += 8) {
      ctx.fillStyle = x % 16 === 0 ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.08)';
      ctx.fillRect(x, 0, 2, 128);
    }
  } else if (cladding === 'natural-stone') {
    const rows = [0, 24, 48, 72, 96];
    rows.forEach((y, idx) => {
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.fillRect(0, y, 128, 2);
      const offset = (idx % 2) * 20;
      for (let x = offset; x < 128; x += 42) {
        ctx.fillRect(x, y, 2, 24);
      }
      ctx.fillStyle = idx % 2 === 0 ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
      ctx.fillRect(0, y + 2, 128, 22);
    });
  } else if (cladding === 'dark-brick') {
    for (let y = 0; y < 128; y += 14) {
      ctx.fillStyle = 'rgba(255,255,255,0.14)';
      ctx.fillRect(0, y, 128, 2);
      const shift = ((y / 14) % 2) * 16;
      for (let x = shift; x < 128; x += 32) {
        ctx.fillRect(x, y, 2, 14);
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function addBox(
  parent: THREE.Group,
  w: number,
  h: number,
  d: number,
  x: number,
  y: number,
  z: number,
  material: THREE.Material,
  castShadow = true,
  receiveShadow = true
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = receiveShadow;
  parent.add(mesh);
  return mesh;
}

function addWindowUnit(
  parent: THREE.Group,
  w: number,
  h: number,
  x: number,
  y: number,
  z: number,
  frameMat: THREE.Material,
  glassMat: THREE.Material,
  hasGrid: boolean,
  isArched: boolean
) {
  const depth = 0.14;
  // Outer frame
  addBox(parent, w + 0.14, h + 0.14, depth * 0.75, x, y, z, frameMat, true, false);
  // Glass pane
  addBox(parent, w, h, depth, x, y, z + 0.02, glassMat, false, false);

  // Classic arched top accent for Contemporary Classic style
  if (isArched) {
    const archGeo = new THREE.CylinderGeometry(w / 2, w / 2, depth * 0.85, 16, 1, false, 0, Math.PI);
    const archMesh = new THREE.Mesh(archGeo, frameMat);
    archMesh.rotation.z = Math.PI / 2;
    archMesh.rotation.y = Math.PI / 2;
    // Simpler: use half-disc rotated upright
    archGeo.dispose();

    const semiShape = new THREE.Shape();
    semiShape.absarc(0, 0, w / 2 + 0.06, 0, Math.PI, false);
    semiShape.lineTo(-w / 2 - 0.06, 0);
    const semiGeo = new THREE.ExtrudeGeometry(semiShape, { depth: depth * 0.8, bevelEnabled: false });
    const semiFrame = new THREE.Mesh(semiGeo, frameMat);
    semiFrame.position.set(x, y + h / 2, z - depth * 0.4);
    parent.add(semiFrame);

    const glassShape = new THREE.Shape();
    glassShape.absarc(0, 0, w / 2 - 0.02, 0, Math.PI, false);
    glassShape.lineTo(-w / 2 + 0.02, 0);
    const glassArchGeo = new THREE.ExtrudeGeometry(glassShape, { depth: depth, bevelEnabled: false });
    const glassArch = new THREE.Mesh(glassArchGeo, glassMat);
    glassArch.position.set(x, y + h / 2, z - depth * 0.35);
    parent.add(glassArch);
  }

  // Mullion grid bars
  if (hasGrid) {
    addBox(parent, 0.05, h, depth + 0.03, x, y, z + 0.02, frameMat, false, false);
    addBox(parent, w, 0.05, depth + 0.03, x, y, z + 0.02, frameMat, false, false);
  }
}

function addPitchedGableRoof(
  parent: THREE.Group,
  width: number,
  depth: number,
  ridgeHeight: number,
  yBase: number,
  zCenter: number,
  roofMat: THREE.Material,
  trimMat: THREE.Material
) {
  const over = 0.35;
  const halfW = width / 2 + over;
  const shape = new THREE.Shape();
  shape.moveTo(-halfW, 0);
  shape.lineTo(0, ridgeHeight);
  shape.lineTo(halfW, 0);
  shape.closePath();

  const extrude = new THREE.ExtrudeGeometry(shape, {
    depth: depth + over * 2,
    bevelEnabled: false,
  });
  const mesh = new THREE.Mesh(extrude, roofMat);
  mesh.position.set(0, yBase, zCenter - (depth + over * 2) / 2);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);

  // Ridge cap beam
  addBox(parent, 0.2, 0.14, depth + over * 2 + 0.1, 0, yBase + ridgeHeight, zCenter, trimMat);
}

/**
 * Builds the complete procedural 3D house assembly into a fresh THREE.Group.
 */
export function buildHouseAssembly(config: HouseConfig, isGoldenHour: boolean): THREE.Group {
  const root = new THREE.Group();
  const plot = PLOT_SPECS[config.plotSize];

  const plotW = plot.widthFt * FT;
  const plotD = plot.depthFt * FT;

  const frontSetback = plot.setbackFrontFt * FT;
  const backSetback = plot.setbackBackFt * FT;
  const sideSetback = plot.setbackSideFt * FT;

  const houseW = Math.max(3.5, plotW - sideSetback * 2);
  const houseD = Math.max(4.5, plotD - frontSetback - backSetback);
  const houseZ = -plotD / 2 + backSetback + houseD / 2;

  const wallSpec = WALL_FINISHES.find((w) => w.id === config.wallFinish) || WALL_FINISHES[0];
  const claddingSpec = CLADDING_OPTIONS.find((c) => c.id === config.cladding) || CLADDING_OPTIONS[0];
  const winSpec = WINDOW_STYLES.find((w) => w.id === config.windowStyle) || WINDOW_STYLES[0];

  // Shared materials for this build
  const wallMat = new THREE.MeshStandardMaterial({
    color: wallSpec.hex,
    roughness: 0.78,
    metalness: 0.04,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: wallSpec.accentHex,
    roughness: 0.65,
    metalness: 0.08,
  });
  const claddingTex = createCladdingTexture(config.cladding);
  const claddingMat = new THREE.MeshStandardMaterial({
    color: claddingTex ? '#ffffff' : wallSpec.accentHex,
    map: claddingTex || undefined,
    roughness: 0.85,
    metalness: 0.05,
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: winSpec.frameHex,
    roughness: 0.4,
    metalness: 0.35,
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: isGoldenHour ? '#FDE68A' : winSpec.glassHex,
    emissive: isGoldenHour ? new THREE.Color('#F59E0B') : new THREE.Color('#000000'),
    emissiveIntensity: isGoldenHour ? 0.55 : 0,
    transparent: true,
    opacity: winSpec.opacity,
    roughness: 0.12,
    metalness: 0.65,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: '#272B28', roughness: 0.35, metalness: 0.65 });
  const roofSlateMat = new THREE.MeshStandardMaterial({ color: '#37413B', roughness: 0.82, metalness: 0.1 });
  const timberMat = new THREE.MeshStandardMaterial({ color: '#8A5A36', roughness: 0.72, metalness: 0.04 });
  const stonePlinthMat = new THREE.MeshStandardMaterial({ color: '#78716C', roughness: 0.9, metalness: 0.03 });
  const lawnMat = new THREE.MeshStandardMaterial({ color: '#587A47', roughness: 0.95 });
  const paveMat = new THREE.MeshStandardMaterial({ color: '#D6D0C4', roughness: 0.88 });
  const roadMat = new THREE.MeshStandardMaterial({ color: '#9CA3AF', roughness: 0.9 });

  // 1. Plot Base & Street Apron
  addBox(root, plotW + 2.4, 0.16, plotD + 2.4, 0, -0.08, 0, paveMat, false, true);
  // Subtle street strip at front
  addBox(root, plotW + 3.2, 0.06, 1.8, 0, -0.03, plotD / 2 + 1.1, roadMat, false, true);

  // 2. Front Lawn & Courtyard
  if (config.amenities.frontLawn) {
    const lawnD = Math.max(1.2, frontSetback - 0.15);
    const lawnZ = plotD / 2 - lawnD / 2 - 0.12;
    const lawnW = config.amenities.carPorch ? plotW * 0.6 : plotW - 0.35;
    const lawnX = config.amenities.carPorch ? -plotW * 0.18 : 0;
    addBox(root, lawnW, 0.05, lawnD, lawnX, 0.025, lawnZ, lawnMat, false, true);
  }

  // 3. Building Floors
  const gfHeight = 2.75; // 11 ft
  const ffHeight = 2.6;  // 10.4 ft
  const hasFirstFloor = config.floors === 'double' || config.floors === 'double-rooftop';
  const hasRooftop = config.floors === 'double-rooftop';

  // Plinth foundation
  addBox(root, houseW + 0.18, 0.25, houseD + 0.18, 0, 0.125, houseZ, stonePlinthMat);

  // Ground Floor Core Mass
  const gfY = 0.25 + gfHeight / 2;
  addBox(root, houseW, gfHeight, houseD, 0, gfY, houseZ, wallMat);

  // Ground Floor Accent Cladding Pier (Left/Center Feature)
  if (config.cladding !== 'none') {
    addBox(
      root,
      houseW * 0.34,
      gfHeight + 0.05,
      0.18,
      -houseW * 0.26,
      gfY,
      houseZ + houseD / 2 + 0.06,
      claddingMat
    );
  }

  // Main Entrance Door + Glazing
  const frontFaceZ = houseZ + houseD / 2;
  addBox(root, 1.05, 2.05, 0.14, 0, 0.25 + 1.025, frontFaceZ + 0.04, timberMat);
  addBox(root, 1.2, 2.15, 0.08, 0, 0.25 + 1.075, frontFaceZ + 0.02, frameMat);

  // Ground Floor Windows
  const isArched = config.style === 'contemporary-classic';
  addWindowUnit(
    root,
    houseW * 0.24,
    1.55,
    houseW * 0.28,
    0.25 + 1.4,
    frontFaceZ + 0.05,
    frameMat,
    glassMat,
    winSpec.hasGrid,
    isArched
  );
  addWindowUnit(
    root,
    houseW * 0.2,
    1.45,
    -houseW * 0.26,
    0.25 + 1.4,
    frontFaceZ + 0.08,
    frameMat,
    glassMat,
    winSpec.hasGrid,
    false
  );

  // Side windows
  addWindowUnit(
    root,
    0.1,
    1.35,
    -houseW / 2 - 0.02,
    gfY,
    houseZ,
    frameMat,
    glassMat,
    false,
    false
  );

  // Architectural Style Details — Ground Level
  if (config.style === 'contemporary-classic') {
    // Grand Entry Portico with twin columns & entablature
    const colMat = new THREE.MeshStandardMaterial({ color: '#F8F6F0', roughness: 0.65 });
    const colGeo = new THREE.CylinderGeometry(0.14, 0.17, gfHeight, 16);
    [-0.85, 0.85].forEach((cx) => {
      const col = new THREE.Mesh(colGeo, colMat);
      col.position.set(cx, 0.25 + gfHeight / 2, frontFaceZ + 0.85);
      col.castShadow = true;
      root.add(col);
    });
    // Portico roof slab & cornice
    addBox(root, 2.3, 0.25, 1.15, 0, 0.25 + gfHeight, frontFaceZ + 0.55, colMat);
    addBox(root, houseW + 0.35, 0.18, houseD + 0.35, 0, 0.25 + gfHeight, houseZ, trimMat);
  } else if (config.style === 'modern-minimalist') {
    // Sleek cantilevered slab overhang + wood slat feature fin
    addBox(root, houseW + 0.7, 0.22, houseD + 0.75, 0, 0.25 + gfHeight, houseZ + 0.15, darkMetalMat);
    for (let i = 0; i < 5; i++) {
      addBox(
        root,
        0.07,
        gfHeight,
        0.22,
        houseW * 0.42 - i * 0.16,
        gfY,
        frontFaceZ + 0.2,
        timberMat
      );
    }
  } else if (config.style === 'mountain-villa') {
    // Timber porch beams + stone plinth wrap
    addBox(root, houseW + 0.25, 0.65, houseD + 0.25, 0, 0.55, houseZ, claddingMat);
    addBox(root, 2.1, 0.2, 0.95, 0, 0.25 + gfHeight - 0.1, frontFaceZ + 0.45, timberMat);
    [-0.8, 0.8].forEach((tx) => {
      addBox(root, 0.16, gfHeight - 0.1, 0.16, tx, 0.25 + (gfHeight - 0.1) / 2, frontFaceZ + 0.8, timberMat);
    });
  }

  // First Floor (Double Story or Double + Rooftop)
  let topY = 0.25 + gfHeight;
  if (hasFirstFloor) {
    const ffBaseY = topY + 0.1;
    const ffDepth = houseD * 0.88;
    const ffZ = houseZ - (houseD - ffDepth) / 2;
    const ffY = ffBaseY + ffHeight / 2;

    addBox(root, houseW, ffHeight, ffDepth, 0, ffY, ffZ, wallMat);

    // Cladding accent on upper floor
    if (config.cladding !== 'none') {
      addBox(
        root,
        houseW * 0.34,
        ffHeight,
        0.18,
        -houseW * 0.26,
        ffY,
        ffZ + ffDepth / 2 + 0.06,
        claddingMat
      );
    }

    // Upper floor front windows
    const ffFrontZ = ffZ + ffDepth / 2;
    addWindowUnit(
      root,
      houseW * 0.3,
      1.6,
      houseW * 0.24,
      ffY + 0.05,
      ffFrontZ + 0.05,
      frameMat,
      glassMat,
      winSpec.hasGrid,
      isArched
    );
    addWindowUnit(
      root,
      houseW * 0.22,
      1.45,
      -houseW * 0.26,
      ffY + 0.05,
      ffFrontZ + 0.08,
      frameMat,
      glassMat,
      winSpec.hasGrid,
      false
    );

    // Balcony Terrace Slab & Railing (occupies stepped front portion)
    const terraceD = houseD - ffDepth + 0.35;
    const terraceZ = ffFrontZ + terraceD / 2;
    if (config.amenities.balconyRailing) {
      addBox(root, houseW + 0.1, 0.15, terraceD, 0, ffBaseY, terraceZ, trimMat);
      const glassRailMat = new THREE.MeshStandardMaterial({
        color: '#93C5FD',
        transparent: true,
        opacity: 0.42,
        roughness: 0.1,
        metalness: 0.4,
      });
      addBox(root, houseW, 0.65, 0.06, 0, ffBaseY + 0.4, terraceZ + terraceD / 2 - 0.05, glassRailMat, false, false);
      addBox(root, houseW + 0.06, 0.07, 0.09, 0, ffBaseY + 0.74, terraceZ + terraceD / 2 - 0.05, darkMetalMat);
    }

    topY = ffBaseY + ffHeight;

    // Architectural Style Roofs (on Double Story)
    if (config.style === 'modern-minimalist') {
      addBox(root, houseW + 0.65, 0.22, ffDepth + 0.75, 0, topY + 0.1, ffZ + 0.15, darkMetalMat);
      if (!hasRooftop) {
        addBox(root, houseW, 0.45, 0.16, 0, topY + 0.32, ffFrontZ + 0.08, wallMat);
      }
    } else if (config.style === 'contemporary-classic') {
      // Classical parapet + corner pilasters + pediment crown
      addBox(root, houseW + 0.35, 0.22, ffDepth + 0.35, 0, topY + 0.1, ffZ, trimMat);
      addBox(root, houseW, 0.6, 0.2, 0, topY + 0.42, ffFrontZ - 0.1, wallMat);
      addBox(root, houseW * 0.42, 0.85, 0.24, 0, topY + 0.55, ffFrontZ - 0.08, trimMat);
    } else if (config.style === 'mountain-villa') {
      addPitchedGableRoof(
        root,
        houseW,
        ffDepth,
        hasRooftop ? 1.05 : 1.75,
        topY,
        ffZ,
        roofSlateMat,
        timberMat
      );
      // Mountain stone chimney stack
      addBox(root, 0.75, 2.2, 0.75, -houseW * 0.35, topY + 0.9, ffZ - ffDepth * 0.2, stonePlinthMat);
    }
  } else {
    // Single Story Roof Styles
    if (config.style === 'modern-minimalist') {
      addBox(root, houseW + 0.65, 0.24, houseD + 0.75, 0, topY + 0.12, houseZ + 0.15, darkMetalMat);
    } else if (config.style === 'contemporary-classic') {
      addBox(root, houseW + 0.35, 0.24, houseD + 0.35, 0, topY + 0.12, houseZ, trimMat);
      addBox(root, houseW, 0.55, 0.18, 0, topY + 0.42, frontFaceZ - 0.08, wallMat);
    } else if (config.style === 'mountain-villa') {
      addPitchedGableRoof(root, houseW, houseD, 1.6, topY, houseZ, roofSlateMat, timberMat);
      addBox(root, 0.75, 2.1, 0.75, -houseW * 0.35, topY + 0.85, houseZ - houseD * 0.2, stonePlinthMat);
    }
  }

  // Rooftop Lounge / Mumty (Double + Rooftop)
  let solarY = topY + 0.22;
  let solarZ = houseZ;
  if (hasRooftop && hasFirstFloor) {
    const rtW = houseW * 0.46;
    const rtD = houseD * 0.42;
    const rtH = 2.05;
    const rtX = houseW * 0.2;
    const rtZ = houseZ - houseD * 0.18;
    const rtBaseY = config.style === 'mountain-villa' ? topY + 0.6 : topY + 0.2;

    addBox(root, rtW, rtH, rtD, rtX, rtBaseY + rtH / 2, rtZ, wallMat);
    addBox(root, rtW + 0.4, 0.18, rtD + 0.45, rtX, rtBaseY + rtH + 0.08, rtZ + 0.06, darkMetalMat);
    addWindowUnit(
      root,
      rtW * 0.65,
      1.2,
      rtX,
      rtBaseY + rtH / 2,
      rtZ + rtD / 2 + 0.04,
      frameMat,
      glassMat,
      false,
      false
    );

    // Rooftop shaded pergola beams
    for (let i = 0; i < 4; i++) {
      addBox(root, rtW * 0.9, 0.12, 0.14, -houseW * 0.22, rtBaseY + rtH - 0.15, rtZ + i * 0.45 - 0.4, timberMat);
    }

    solarY = rtBaseY + 0.12;
    solarZ = rtZ;
  }

  // 4. Rooftop Solar Panels
  if (config.amenities.solarPanels) {
    const panelFrameMat = new THREE.MeshStandardMaterial({ color: '#1E293B', roughness: 0.35, metalness: 0.7 });
    const panelCellMat = new THREE.MeshStandardMaterial({ color: '#1E3A8A', roughness: 0.2, metalness: 0.8 });
    const panelGroup = new THREE.Group();
    const count = config.plotSize === '5-marla' ? 2 : 3;
    for (let i = 0; i < count; i++) {
      const pX = -houseW * 0.25 + i * 0.85;
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.06, 1.15), panelCellMat);
      panel.position.set(pX, 0.25, 0);
      panel.rotation.x = 0.32;
      panel.castShadow = true;
      panelGroup.add(panel);

      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.04, 1.19), panelFrameMat);
      frame.position.set(pX, 0.23, 0);
      frame.rotation.x = 0.32;
      panelGroup.add(frame);
    }
    const baseHeight = config.style === 'mountain-villa' && !hasRooftop ? topY + 0.9 : solarY;
    panelGroup.position.set(0, baseHeight, solarZ - 0.35);
    root.add(panelGroup);
  }

  // 5. Covered Car Porch / Garage (placed in front-right zone, cleanly clear of house door)
  if (config.amenities.carPorch) {
    const porchW = Math.max(2.1, plotW * 0.34);
    const porchD = Math.max(2.2, frontSetback - 0.35);
    const porchX = plotW / 2 - porchW / 2 - 0.25;
    const porchZ = frontFaceZ + porchD / 2 + 0.05;
    const porchH = 2.35;

    // Paved driveway slab
    addBox(root, porchW, 0.08, porchD + 0.25, porchX, 0.04, porchZ, paveMat, false, true);
    // Roof canopy
    addBox(root, porchW + 0.25, 0.18, porchD + 0.15, porchX, porchH, porchZ, trimMat);
    // Support pillars
    [
      [porchX - porchW / 2 + 0.15, porchZ + porchD / 2 - 0.15],
      [porchX + porchW / 2 - 0.15, porchZ + porchD / 2 - 0.15],
    ].forEach(([px, pz]) => {
      addBox(root, 0.18, porchH, 0.18, px, porchH / 2, pz, wallMat);
    });
    // Stylized parked vehicle silhouette
    const carMat = new THREE.MeshStandardMaterial({ color: '#334155', roughness: 0.3, metalness: 0.7 });
    addBox(root, 1.15, 0.55, 2.1, porchX, 0.38, porchZ, carMat);
    addBox(root, 1.0, 0.42, 1.15, porchX, 0.82, porchZ - 0.08, carMat);
  }

  // 6. Outdoor Patio Deck (7 Marla+, placed in front-left zone)
  if (config.amenities.patioDeck && plot.allowsPatioDeck) {
    const deckW = Math.min(2.6, plotW * 0.28);
    const deckD = Math.min(2.1, frontSetback * 0.52);
    const deckX = -plotW / 2 + deckW / 2 + 0.35;
    const deckZ = frontFaceZ + deckD / 2 + 0.18;
    addBox(root, deckW, 0.12, deckD, deckX, 0.08, deckZ, timberMat);
    // Minimalist outdoor lounge bench
    addBox(root, deckW * 0.65, 0.25, 0.55, deckX, 0.26, deckZ - 0.25, wallMat);
    addBox(root, 0.65, 0.18, 0.42, deckX, 0.22, deckZ + 0.35, darkMetalMat);
  }

  // 7. Swimming Pool (10 Marla & 1 Kanal only, placed forward of patio deck so zero overlap)
  if (config.amenities.swimmingPool && plot.allowsPool) {
    const poolW = plotW * 0.32;
    const poolD = Math.max(1.8, frontSetback * 0.4);
    const poolX = -plotW * 0.16;
    const poolZ = plotD / 2 - poolD / 2 - 0.45;
    const waterMat = new THREE.MeshStandardMaterial({
      color: '#38BDF8',
      roughness: 0.15,
      metalness: 0.35,
      transparent: true,
      opacity: 0.85,
    });
    const copingMat = new THREE.MeshStandardMaterial({ color: '#F1F5F9', roughness: 0.7 });
    addBox(root, poolW + 0.25, 0.1, poolD + 0.25, poolX, 0.06, poolZ, copingMat, false, true);
    addBox(root, poolW - 0.05, 0.12, poolD - 0.05, poolX, 0.07, poolZ, waterMat, false, true);
  }

  // 8. Trees & Stepping-Stone Pathway
  if (config.amenities.treesAndPathways) {
    // Stepping stones from front street to main door
    const pathSteps = 4;
    for (let i = 0; i < pathSteps; i++) {
      const stepZ = frontFaceZ + 0.55 + i * ((frontSetback - 0.8) / pathSteps);
      addBox(root, 0.78, 0.07, 0.42, 0.12, 0.04, stepZ, paveMat, false, true);
    }

    const trunkMat = new THREE.MeshStandardMaterial({ color: '#6B4423', roughness: 0.9 });
    const leafMat = new THREE.MeshStandardMaterial({ color: '#3F6234', roughness: 0.85 });
    const treePositions: Array<[number, number]> = [
      [-plotW / 2 + 0.65, plotD / 2 - 0.7],
      [plotW * 0.12, plotD / 2 - 0.7],
    ];
    if (plotW > 8) {
      treePositions.push([-plotW / 2 + 0.65, houseZ]);
    }
    treePositions.forEach(([tx, tz]) => {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.95, 8), trunkMat);
      trunk.position.set(tx, 0.48, tz);
      trunk.castShadow = true;
      root.add(trunk);

      const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 10), leafMat);
      canopy.position.set(tx, 1.15, tz);
      canopy.castShadow = true;
      root.add(canopy);
    });
  }

  // 9. Boundary Wall & Main Entrance Gate
  const wallH = 1.15;
  const wallT = 0.16;
  if (config.amenities.boundaryWall) {
    // Left, Right & Back walls
    addBox(root, wallT, wallH, plotD, -plotW / 2 + wallT / 2, wallH / 2, 0, wallMat);
    addBox(root, wallT, wallH, plotD, plotW / 2 - wallT / 2, wallH / 2, 0, wallMat);
    addBox(root, plotW, wallH, wallT, 0, wallH / 2, -plotD / 2 + wallT / 2, wallMat);

    // Front wall segments leaving gate opening on right/center-right
    const gateW = Math.min(2.6, plotW * 0.34);
    const gateX = config.amenities.carPorch ? plotW / 2 - gateW / 2 - 0.3 : 0.2;
    const leftSegW = Math.max(0.4, gateX - gateW / 2 - (-plotW / 2));
    addBox(
      root,
      leftSegW,
      wallH,
      wallT,
      -plotW / 2 + leftSegW / 2,
      wallH / 2,
      plotD / 2 - wallT / 2,
      wallMat
    );
    const rightSegW = Math.max(0.25, plotW / 2 - (gateX + gateW / 2));
    if (rightSegW > 0.25) {
      addBox(
        root,
        rightSegW,
        wallH,
        wallT,
        plotW / 2 - rightSegW / 2,
        wallH / 2,
        plotD / 2 - wallT / 2,
        wallMat
      );
    }
  }

  if (config.amenities.entranceGate) {
    const gateW = Math.min(2.6, plotW * 0.34);
    const gateX = config.amenities.carPorch ? plotW / 2 - gateW / 2 - 0.3 : 0.2;
    const gateZ = plotD / 2 - wallT / 2;

    // Gate pillars
    addBox(root, 0.32, wallH + 0.3, 0.32, gateX - gateW / 2, (wallH + 0.3) / 2, gateZ, stonePlinthMat);
    addBox(root, 0.32, wallH + 0.3, 0.32, gateX + gateW / 2, (wallH + 0.3) / 2, gateZ, stonePlinthMat);
    // Double metal & wood slat gate leaves
    addBox(root, gateW - 0.24, wallH - 0.05, 0.08, gateX, (wallH - 0.05) / 2 + 0.05, gateZ, darkMetalMat);
    addBox(root, gateW * 0.65, wallH * 0.55, 0.1, gateX, wallH * 0.55, gateZ, timberMat);
  }

  return root;
}

