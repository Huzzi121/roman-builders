import * as THREE from 'three';
import { disposeObject3D } from '@/lib/house-builder/geometry';
import { SocietyLandmark, SocietyLayout, SocietyPark, SocietyPlot, SocietyRoad } from './types';

export const S_FT = 0.25; // 1 unit = 4 ft

export interface PlotVisualHandles {
  plotId: string;
  plot: SocietyPlot;
  hitMesh: THREE.Mesh;
  padMaterial: THREE.MeshStandardMaterial;
  borderLine: THREE.LineLoop;
  borderMaterial: THREE.LineBasicMaterial;
  highlightRing: THREE.Mesh;
  highlightMaterial: THREE.MeshBasicMaterial;
  houseGroup: THREE.Group;
  labelSprite: THREE.Sprite;
  labelMaterial: THREE.SpriteMaterial;
  worldPos: THREE.Vector3;
}

export interface SocietySceneHandles {
  root: THREE.Group;
  plotHandles: Map<string, PlotVisualHandles>;
  hitMeshes: THREE.Mesh[];
  lampBulbMat: THREE.MeshStandardMaterial;
  windowWarmMat: THREE.MeshStandardMaterial;
  landmarkGlowMat: THREE.MeshStandardMaterial;
  waterMat: THREE.MeshStandardMaterial;
  fountainWaterMat: THREE.MeshStandardMaterial;
  nightPointLights: THREE.PointLight[];
  dispose: () => void;
}

function createLabelTexture(plotNumber: string, sizeLabel: string, dimLabel: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 112;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Pill badge
    ctx.fillStyle = 'rgba(22, 31, 24, 0.88)';
    ctx.beginPath();
    ctx.roundRect(8, 8, 240, 96, 22);
    ctx.fill();

    ctx.strokeStyle = 'rgba(157, 120, 62, 0.9)';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#F7F3EA';
    ctx.font = 'bold 34px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText(plotNumber, 128, 48);

    ctx.fillStyle = '#DFD2BA';
    ctx.font = '600 20px sans-serif';
    ctx.fillText(`${sizeLabel} • ${dimLabel}`, 128, 82);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createGateSignTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#1E251F';
    ctx.fillRect(0, 0, 512, 96);
    ctx.strokeStyle = '#C9A25E';
    ctx.lineWidth = 6;
    ctx.strokeRect(4, 4, 504, 88);
    ctx.fillStyle = '#F7E7C6';
    ctx.font = 'bold 34px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('ROMAN BUILDERS', 256, 46);
    ctx.fillStyle = '#DFD2BA';
    ctx.font = '600 18px sans-serif';
    ctx.fillText('HILLVIEW RESIDENTIAL ENCLAVE', 256, 76);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function addBox(
  parent: THREE.Object3D,
  w: number,
  h: number,
  d: number,
  x: number,
  y: number,
  z: number,
  mat: THREE.Material,
  castShadow = true,
  receiveShadow = true
) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = receiveShadow;
  parent.add(mesh);
  return mesh;
}

function buildGenericHouseVariation(
  variation: number,
  w: number,
  d: number,
  materials: {
    wallPalettes: THREE.MeshStandardMaterial[];
    trimMat: THREE.MeshStandardMaterial;
    roofSlateMat: THREE.MeshStandardMaterial;
    timberMat: THREE.MeshStandardMaterial;
    stoneMat: THREE.MeshStandardMaterial;
    windowWarmMat: THREE.MeshStandardMaterial;
    frameMat: THREE.MeshStandardMaterial;
  }
): THREE.Group {
  const g = new THREE.Group();
  const wallMat = materials.wallPalettes[variation % materials.wallPalettes.length];
  const { trimMat, roofSlateMat, timberMat, stoneMat, windowWarmMat, frameMat } = materials;

  const isTwoStory = variation !== 5;
  const gfH = 2.25;
  const ffH = 2.05;

  // Stone base plinth
  addBox(g, w + 0.12, 0.2, d + 0.12, 0, 0.1, 0, stoneMat, false, true);

  // Ground Floor mass
  addBox(g, w, gfH, d, 0, 0.2 + gfH / 2, 0, wallMat);

  // Front entry door + warm porch glow
  addBox(g, 0.85, 1.65, 0.1, 0, 0.2 + 0.825, d / 2 + 0.03, timberMat, false, false);
  // Front ground windows
  addBox(g, w * 0.25, 1.15, 0.08, w * 0.28, 0.2 + 1.15, d / 2 + 0.03, windowWarmMat, false, false);
  addBox(g, w * 0.22, 1.15, 0.08, -w * 0.28, 0.2 + 1.15, d / 2 + 0.03, windowWarmMat, false, false);

  // Side accent windows for architectural richness
  addBox(g, 0.08, 1.1, d * 0.25, -w / 2 - 0.02, 0.2 + 1.15, 0, windowWarmMat, false, false);
  addBox(g, 0.08, 1.1, d * 0.25, w / 2 + 0.02, 0.2 + 1.15, 0, windowWarmMat, false, false);

  // Variation-specific architectural styling
  if (variation === 0 || variation === 4 || variation === 6) {
    // Modern flat-roof overhangs
    addBox(g, w + 0.45, 0.18, d + 0.5, 0, 0.2 + gfH, 0.1, trimMat);
  } else if (variation === 3) {
    // Stone wrap accent
    addBox(g, w * 0.36, gfH, 0.14, -w * 0.26, 0.2 + gfH / 2, d / 2 + 0.05, stoneMat);
  } else if (variation === 2) {
    // Classical entry portico pillars
    addBox(g, 1.6, 0.18, 0.7, 0, 0.2 + gfH - 0.1, d / 2 + 0.32, trimMat);
    addBox(g, 0.14, gfH, 0.14, -0.62, 0.2 + gfH / 2, d / 2 + 0.55, trimMat);
    addBox(g, 0.14, gfH, 0.14, 0.62, 0.2 + gfH / 2, d / 2 + 0.55, trimMat);
  }

  let topY = 0.2 + gfH;

  if (isTwoStory) {
    const ffD = d * 0.84;
    const ffZ = -(d - ffD) / 2;
    const ffW = variation === 6 ? w * 0.88 : w;
    addBox(g, ffW, ffH, ffD, 0, topY + ffH / 2, ffZ, wallMat);

    // Upper floor warm glowing windows
    addBox(g, ffW * 0.32, 1.25, 0.08, ffW * 0.22, topY + ffH / 2, ffZ + ffD / 2 + 0.03, windowWarmMat, false, false);
    addBox(g, ffW * 0.24, 1.15, 0.08, -ffW * 0.24, topY + ffH / 2, ffZ + ffD / 2 + 0.03, windowWarmMat, false, false);

    // Front terrace parapet on stepped deck
    addBox(g, w, 0.38, 0.08, 0, topY + 0.2, d / 2 - 0.05, frameMat, false, false);

    topY += ffH;

    if (variation === 3) {
      // Mountain Villa pitched gable roof
      const shape = new THREE.Shape();
      shape.moveTo(-ffW / 2 - 0.25, 0);
      shape.lineTo(0, 1.35);
      shape.lineTo(ffW / 2 + 0.25, 0);
      shape.closePath();
      const geo = new THREE.ExtrudeGeometry(shape, { depth: ffD + 0.5, bevelEnabled: false });
      const roof = new THREE.Mesh(geo, roofSlateMat);
      roof.position.set(0, topY, ffZ - (ffD + 0.5) / 2);
      roof.castShadow = true;
      g.add(roof);
      // Chimney
      addBox(g, 0.55, 1.55, 0.55, -ffW * 0.32, topY + 0.65, ffZ - ffD * 0.2, stoneMat);
    } else if (variation === 2) {
      // Classical parapet + crown cornice
      addBox(g, ffW + 0.3, 0.18, ffD + 0.3, 0, topY + 0.08, ffZ, trimMat);
      addBox(g, ffW, 0.45, 0.14, 0, topY + 0.35, ffZ + ffD / 2 - 0.05, wallMat);
    } else {
      // Modern cantilevered top slab
      addBox(g, ffW + 0.45, 0.2, ffD + 0.5, 0, topY + 0.1, ffZ + 0.1, trimMat);
      if (variation === 6) {
        // Rooftop pergola slats
        for (let i = 0; i < 3; i++) {
          addBox(g, ffW * 0.5, 0.1, 0.12, 0, topY + 0.25, ffZ + i * 0.4 - 0.4, timberMat);
        }
      }
    }
  } else {
    // Compact single-story roof parapet
    addBox(g, w + 0.35, 0.2, d + 0.35, 0, topY + 0.1, 0, trimMat);
    addBox(g, w, 0.35, 0.14, 0, topY + 0.3, d / 2 - 0.05, wallMat);
  }

  return g;
}

export function buildSocietyScene(
  layout: SocietyLayout,
  isLowPower: boolean
): SocietySceneHandles {
  const root = new THREE.Group();
  const plotHandles = new Map<string, PlotVisualHandles>();
  const hitMeshes: THREE.Mesh[] = [];
  const nightPointLights: THREE.PointLight[] = [];

  const socW = layout.dimensions.width * S_FT;
  const socD = layout.dimensions.depth * S_FT;

  // Shared materials
  const surroundGroundMat = new THREE.MeshStandardMaterial({ color: '#6E7C5D', roughness: 0.96 });
  const societyEarthMat = new THREE.MeshStandardMaterial({ color: '#A8B197', roughness: 0.94 });
  const asphaltMat = new THREE.MeshStandardMaterial({ color: '#393E41', roughness: 0.85, metalness: 0.08 });
  const sidewalkMat = new THREE.MeshStandardMaterial({ color: '#D4CDC0', roughness: 0.88 });
  const roadLineMat = new THREE.MeshBasicMaterial({ color: '#F3EFE4' });
  const lawnMat = new THREE.MeshStandardMaterial({ color: '#4B7743', roughness: 0.92 });
  const medianMat = new THREE.MeshStandardMaterial({ color: '#476F3F', roughness: 0.9 });
  const parkPathMat = new THREE.MeshStandardMaterial({ color: '#DDD5C7', roughness: 0.88 });
  const wallMat = new THREE.MeshStandardMaterial({ color: '#DFD9CE', roughness: 0.85 });
  const trimMat = new THREE.MeshStandardMaterial({ color: '#2F3431', roughness: 0.45, metalness: 0.4 });
  const roofSlateMat = new THREE.MeshStandardMaterial({ color: '#36403A', roughness: 0.8 });
  const timberMat = new THREE.MeshStandardMaterial({ color: '#8C5835', roughness: 0.72 });
  const stoneMat = new THREE.MeshStandardMaterial({ color: '#7E766E', roughness: 0.9 });
  const goldMat = new THREE.MeshStandardMaterial({ color: '#B8924A', roughness: 0.32, metalness: 0.7 });
  const frameMat = new THREE.MeshStandardMaterial({ color: '#222624', roughness: 0.4, metalness: 0.5 });

  // Dynamic materials toggled smoothly between Day & Evening/Night
  const windowWarmMat = new THREE.MeshStandardMaterial({
    color: '#FDE68A',
    emissive: new THREE.Color('#F59E0B'),
    emissiveIntensity: 1.35,
    roughness: 0.2,
    metalness: 0.4,
  });
  const lampBulbMat = new THREE.MeshStandardMaterial({
    color: '#FFFBEB',
    emissive: new THREE.Color('#FBBF24'),
    emissiveIntensity: 2.4,
    roughness: 0.15,
  });
  const landmarkGlowMat = new THREE.MeshStandardMaterial({
    color: '#F5E6C8',
    emissive: new THREE.Color('#EAB308'),
    emissiveIntensity: 0.9,
    roughness: 0.25,
  });
  const waterMat = new THREE.MeshStandardMaterial({
    color: '#38BDF8',
    emissive: new THREE.Color('#0284C7'),
    emissiveIntensity: 0.4,
    roughness: 0.12,
    metalness: 0.3,
  });
  const fountainWaterMat = waterMat;

  const wallPalettes = [
    new THREE.MeshStandardMaterial({ color: '#F3EFE4', roughness: 0.78 }),
    new THREE.MeshStandardMaterial({ color: '#D9CAB3', roughness: 0.78 }),
    new THREE.MeshStandardMaterial({ color: '#7D8772', roughness: 0.8 }),
    new THREE.MeshStandardMaterial({ color: '#EFECE6', roughness: 0.75 }),
    new THREE.MeshStandardMaterial({ color: '#4B524E', roughness: 0.78 }),
    new THREE.MeshStandardMaterial({ color: '#E8DEC8', roughness: 0.8 }),
  ];

  // 1. Society Earth Pad & Extended Horizon Ground
  const outerGround = new THREE.Mesh(new THREE.PlaneGeometry(550, 550), surroundGroundMat);
  outerGround.rotation.x = -Math.PI / 2;
  outerGround.position.y = -0.14;
  outerGround.receiveShadow = true;
  root.add(outerGround);

  addBox(root, socW, 0.12, socD, 0, -0.06, 0, societyEarthMat, false, true);

  // Society Outer Compound Wall (South edge open across Main Entrance Gate)
  const wallH = 1.6;
  const wallT = 0.45;
  addBox(root, wallT, wallH, socD, -socW / 2, wallH / 2, 0, wallMat);
  addBox(root, wallT, wallH, socD, socW / 2, wallH / 2, 0, wallMat);
  addBox(root, socW, wallH, wallT, 0, wallH / 2, -socD / 2, wallMat);
  // Front perimeter walls left & right of Gate (gate width = 96ft)
  const gateHalf = 50 * S_FT;
  const segLen = socW / 2 - gateHalf;
  addBox(root, segLen, wallH, wallT, -gateHalf - segLen / 2, wallH / 2, socD / 2, wallMat);
  addBox(root, segLen, wallH, wallT, gateHalf + segLen / 2, wallH / 2, socD / 2, wallMat);

  // 2. Road Network, Sidewalks, Markings & Boulevard Median
  const streetLampPositions: Array<[number, number]> = [];
  const treePositions: Array<[number, number, number]> = []; // [x, z, scale]

  layout.roads.forEach((road: SocietyRoad) => {
    const rw = road.width * S_FT;
    const rl = road.length * S_FT;
    const rx = road.x * S_FT;
    const rz = road.z * S_FT;
    const sidewalkPad = 1.6;

    if (road.orientation === 'ns') {
      // Sidewalk & curb base
      addBox(root, rw + sidewalkPad, 0.08, rl, rx, 0.04, rz, sidewalkMat, false, true);
      // Asphalt strip
      addBox(root, rw, 0.1, rl, rx, 0.055, rz, asphaltMat, false, true);

      if (road.hasMedian) {
        // Landscaped central boulevard median
        addBox(root, 2.2, 0.18, rl - 4, rx, 0.09, rz, medianMat, false, true);
        for (let z = -rl / 2 + 8; z <= rl / 2 - 10; z += 11) {
          treePositions.push([rx, rz + z, 0.9]);
          streetLampPositions.push([rx, rz + z + 5.5]);
        }
      } else {
        // Dashed road centerline
        for (let z = -rl / 2 + 3; z <= rl / 2 - 3; z += 5) {
          addBox(root, 0.16, 0.02, 2.2, rx, 0.11, rz + z, roadLineMat, false, false);
        }
        // Streetlights along sidewalk
        for (let z = -rl / 2 + 10; z <= rl / 2 - 10; z += 18) {
          streetLampPositions.push([rx - rw / 2 - 0.45, rz + z]);
        }
      }
    } else {
      // East-West road
      addBox(root, rl, 0.08, rw + sidewalkPad, rx, 0.04, rz, sidewalkMat, false, true);
      addBox(root, rl, 0.1, rw, rx, 0.055, rz, asphaltMat, false, true);

      for (let x = -rl / 2 + 3; x <= rl / 2 - 3; x += 5) {
        addBox(root, 2.2, 0.02, 0.16, rx + x, 0.11, rz, roadLineMat, false, false);
      }

      if (road.isCulDeSac) {
        // Round Cul-de-Sac turnaround circle at East end
        const culR = (road.width * 0.95) * S_FT;
        const circleGeo = new THREE.CylinderGeometry(culR, culR, 0.1, 24);
        const circleMesh = new THREE.Mesh(circleGeo, asphaltMat);
        circleMesh.position.set(rx + rl / 2 - culR * 0.4, 0.055, rz);
        circleMesh.receiveShadow = true;
        root.add(circleMesh);
      }

      for (let x = -rl / 2 + 12; x <= rl / 2 - 12; x += 22) {
        if (Math.abs(rx + x) > 12) {
          streetLampPositions.push([rx + x, rz - rw / 2 - 0.45]);
        }
      }
    }
  });

  // 3. Parks & Green Spaces
  layout.parks.forEach((park: SocietyPark) => {
    const px = park.x * S_FT;
    const pz = park.z * S_FT;
    const pw = park.width * S_FT;
    const pd = park.depth * S_FT;

    // Border curb + grass
    addBox(root, pw + 1.2, 0.12, pd + 1.2, px, 0.06, pz, sidewalkMat, false, true);
    addBox(root, pw, 0.16, pd, px, 0.08, pz, lawnMat, false, true);

    // Cross walking paths
    addBox(root, pw * 0.88, 0.05, 1.3, px, 0.17, pz, parkPathMat, false, true);
    addBox(root, 1.3, 0.05, pd * 0.88, px, 0.17, pz, parkPathMat, false, true);

    if (park.hasFountain) {
      const basin = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.5, 0.45, 24), stoneMat);
      basin.position.set(px, 0.26, pz);
      root.add(basin);
      const water = new THREE.Mesh(new THREE.CylinderGeometry(2.7, 2.7, 0.48, 24), waterMat);
      water.position.set(px, 0.28, pz);
      root.add(water);
      const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.7, 1.6, 12), goldMat);
      spire.position.set(px, 0.9, pz);
      root.add(spire);
    }

    if (park.hasGazebo) {
      const gx = park.hasFountain ? px - pw * 0.28 : px;
      const gz = park.hasFountain ? pz - pd * 0.25 : pz;
      addBox(root, 3.2, 0.25, 3.2, gx, 0.25, gz, timberMat);
      [
        [-1.3, -1.3],
        [1.3, -1.3],
        [-1.3, 1.3],
        [1.3, 1.3],
      ].forEach(([dx, dz]) => addBox(root, 0.18, 2.0, 0.18, gx + dx, 1.25, gz + dz, timberMat));
      const cone = new THREE.Mesh(new THREE.ConeGeometry(2.6, 1.25, 4), roofSlateMat);
      cone.position.set(gx, 2.85, gz);
      cone.rotation.y = Math.PI / 4;
      cone.castShadow = true;
      root.add(cone);
    }

    // Perimeter park trees
    for (let dx = -pw / 2 + 2.2; dx <= pw / 2 - 2.2; dx += 5.5) {
      treePositions.push([px + dx, pz - pd / 2 + 2.0, 1.05]);
      treePositions.push([px + dx, pz + pd / 2 - 2.0, 1.05]);
    }
  });

  // 4. Community Landmarks
  layout.landmarks.forEach((lm: SocietyLandmark) => {
    const lg = new THREE.Group();
    lg.position.set(lm.x * S_FT, 0, lm.z * S_FT);
    lg.rotation.y = lm.rotation;
    const lw = lm.width * S_FT;
    const ld = lm.depth * S_FT;

    if (lm.kind === 'gate') {
      // Grand Roman Entrance Portal spanning Boulevard
      addBox(lg, lw, 0.2, ld, 0, 0.1, 0, sidewalkMat, false, true);
      [-lw * 0.44, -lw * 0.2, lw * 0.2, lw * 0.44].forEach((px) => {
        addBox(lg, 1.6, 5.2, 1.8, px, 2.6, 0, stoneMat);
        addBox(lg, 1.9, 0.4, 2.1, px, 5.3, 0, goldMat);
      });
      // Elevated Archway Bridge & Illuminated Brand Sign
      addBox(lg, lw * 0.94, 1.65, 2.2, 0, 5.8, 0, trimMat);
      const signTex = createGateSignTexture();
      const signMat = new THREE.MeshStandardMaterial({
        map: signTex,
        emissive: new THREE.Color('#FFF3D6'),
        emissiveMap: signTex,
        emissiveIntensity: 0.6,
      });
      const signFace = new THREE.Mesh(new THREE.PlaneGeometry(11.5, 1.9), signMat);
      signFace.position.set(0, 5.85, 1.15);
      lg.add(signFace);
      const signBack = signFace.clone();
      signBack.rotation.y = Math.PI;
      signBack.position.z = -1.15;
      lg.add(signBack);
      // Guard Houses
      addBox(lg, 2.6, 2.5, 2.8, -lw * 0.32, 1.25, 0, wallPalettes[0]);
      addBox(lg, 2.6, 2.5, 2.8, lw * 0.32, 1.25, 0, wallPalettes[0]);
    } else if (lm.kind === 'mosque') {
      // Jamia Masjid
      addBox(lg, lw, 0.35, ld, 0, 0.175, 0, sidewalkMat, false, true);
      addBox(lg, lw * 0.72, 3.6, ld * 0.72, -lw * 0.08, 2.0, 0, wallPalettes[0]);
      const dome = new THREE.Mesh(new THREE.SphereGeometry(3.2, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), goldMat);
      dome.position.set(-lw * 0.08, 3.8, 0);
      dome.castShadow = true;
      lg.add(dome);
      // Minaret
      addBox(lg, 1.4, 8.2, 1.4, lw * 0.32, 4.1, -ld * 0.28, wallPalettes[0]);
      const minCap = new THREE.Mesh(new THREE.ConeGeometry(0.95, 1.6, 12), goldMat);
      minCap.position.set(lw * 0.32, 8.95, -ld * 0.28);
      lg.add(minCap);
      const minLamp = new THREE.Mesh(new THREE.SphereGeometry(0.35, 10, 10), landmarkGlowMat);
      minLamp.position.set(lw * 0.32, 7.6, -ld * 0.28);
      lg.add(minLamp);
      // Glowing arched hall windows
      addBox(lg, lw * 0.5, 1.8, 0.1, -lw * 0.08, 2.1, ld * 0.36 + 0.04, windowWarmMat, false, false);
    } else if (lm.kind === 'commercial') {
      // 3-story Roman Commercial Square
      addBox(lg, lw, 0.2, ld, 0, 0.1, 0, sidewalkMat, false, true);
      addBox(lg, lw * 0.9, 6.2, ld * 0.78, 0, 3.2, 0, trimMat);
      addBox(lg, lw * 0.84, 5.2, ld * 0.8, 0, 2.9, 0, windowWarmMat, false, false);
      // Stone pilasters
      for (let x = -lw * 0.4; x <= lw * 0.4; x += lw * 0.2) {
        addBox(lg, 0.75, 6.4, ld * 0.82, x, 3.2, 0, stoneMat);
      }
      addBox(lg, lw * 0.94, 0.45, ld * 0.84, 0, 6.4, 0, goldMat);
    } else if (lm.kind === 'clubhouse') {
      addBox(lg, lw, 0.2, ld, 0, 0.1, 0, sidewalkMat, false, true);
      addBox(lg, lw * 0.82, 3.4, ld * 0.72, 0, 1.8, 0, wallPalettes[1]);
      addBox(lg, lw * 0.88, 0.3, ld * 0.8, 0, 3.6, 0, roofSlateMat);
      addBox(lg, lw * 0.65, 2.2, ld * 0.74, 0, 1.6, 0, windowWarmMat, false, false);
    }

    root.add(lg);
  });

  // 5. Instanced Trees & Streetlights (Ultra-fast draw calls)
  if (treePositions.length > 0) {
    const trunkGeo = new THREE.CylinderGeometry(0.18, 0.26, 1.6, 7);
    const canopyGeo = new THREE.SphereGeometry(1.1, 10, 8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: '#614127', roughness: 0.9 });
    const leafMat = new THREE.MeshStandardMaterial({ color: '#395C30', roughness: 0.86 });

    const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, treePositions.length);
    const canopies = new THREE.InstancedMesh(canopyGeo, leafMat, treePositions.length);
    trunks.castShadow = !isLowPower;
    canopies.castShadow = !isLowPower;

    const dummy = new THREE.Object3D();
    treePositions.forEach(([tx, tz, sc], idx) => {
      dummy.position.set(tx, 0.8 * sc, tz);
      dummy.scale.set(sc, sc, sc);
      dummy.updateMatrix();
      trunks.setMatrixAt(idx, dummy.matrix);

      dummy.position.set(tx, 2.05 * sc, tz);
      dummy.scale.set(sc * 1.15, sc, sc * 1.15);
      dummy.updateMatrix();
      canopies.setMatrixAt(idx, dummy.matrix);
    });
    root.add(trunks);
    root.add(canopies);
  }

  if (streetLampPositions.length > 0) {
    const poleGeo = new THREE.CylinderGeometry(0.08, 0.12, 3.6, 6);
    const bulbGeo = new THREE.SphereGeometry(0.24, 8, 8);
    const poles = new THREE.InstancedMesh(poleGeo, trimMat, streetLampPositions.length);
    const bulbs = new THREE.InstancedMesh(bulbGeo, lampBulbMat, streetLampPositions.length);

    const dummy = new THREE.Object3D();
    streetLampPositions.forEach(([lx, lz], idx) => {
      dummy.position.set(lx, 1.85, lz);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      poles.setMatrixAt(idx, dummy.matrix);

      dummy.position.set(lx, 3.7, lz);
      dummy.updateMatrix();
      bulbs.setMatrixAt(idx, dummy.matrix);
    });
    root.add(poles);
    root.add(bulbs);
  }

  // Strategic warm Night PointLights (keeps FPS fast while bathing roads, gate & park in warm glow)
  const keyLightCoords: Array<[number, number, number, number]> = isLowPower
    ? [
        [0, 6.5, 270 * S_FT, 42],
        [-94 * S_FT, 5, -50 * S_FT, 36],
        [0, 7, 40 * S_FT, 46],
        [0, 7, -120 * S_FT, 46],
      ]
    : [
        [0, 6.5, 274 * S_FT, 38],     // Entrance Gate
        [-94 * S_FT, 5, -50 * S_FT, 36], // Central Park
        [-94 * S_FT, 6, -136 * S_FT, 32], // Jamia Mosque
        [104 * S_FT, 6, 244 * S_FT, 34], // Commercial Square
        [0, 6.5, 140 * S_FT, 40],     // Boulevard South
        [0, 6.5, 40 * S_FT, 42],      // Main Intersection
        [0, 6.5, -80 * S_FT, 40],     // Boulevard North
        [-165 * S_FT, 5.5, 40 * S_FT, 34],
        [165 * S_FT, 5.5, 40 * S_FT, 34],
        [230 * S_FT, 5.5, -72 * S_FT, 30], // Cul-de-sac
      ];

  keyLightCoords.forEach(([lx, ly, lz, dist]) => {
    const pl = new THREE.PointLight('#FDBA74', 2.4, dist, 1.5);
    pl.position.set(lx, ly, lz);
    root.add(pl);
    nightPointLights.push(pl);
  });

  // 6. Interactive Plots + Generic Residential Buildings + Distance-Adaptive Plot Labels
  layout.plots.forEach((plot: SocietyPlot) => {
    const pg = new THREE.Group();
    const px = plot.position.x * S_FT;
    const pz = plot.position.z * S_FT;
    pg.position.set(px, 0, pz);
    pg.rotation.y = plot.rotation;

    const pw = plot.width * S_FT;
    const pd = plot.depth * S_FT;

    // Selectable Plot Pad (hit target)
    const padMaterial = new THREE.MeshStandardMaterial({
      color: '#6C8456',
      roughness: 0.9,
      metalness: 0.05,
    });
    const hitMesh = new THREE.Mesh(new THREE.BoxGeometry(pw, 0.14, pd), padMaterial);
    hitMesh.position.set(0, 0.07, 0);
    hitMesh.receiveShadow = true;
    hitMesh.userData = { plotId: plot.id };
    pg.add(hitMesh);
    hitMeshes.push(hitMesh);

    // Plot Boundary LineLoop
    const hw = pw / 2 + 0.06;
    const hd = pd / 2 + 0.06;
    const pts = [
      new THREE.Vector3(-hw, 0.18, -hd),
      new THREE.Vector3(hw, 0.18, -hd),
      new THREE.Vector3(hw, 0.18, hd),
      new THREE.Vector3(-hw, 0.18, hd),
    ];
    const borderGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const borderMaterial = new THREE.LineBasicMaterial({ color: '#E5DCC8', transparent: true, opacity: 0.65 });
    const borderLine = new THREE.LineLoop(borderGeo, borderMaterial);
    pg.add(borderLine);

    // Roman Builders Gold Highlight Ring (visible on hover / select / filter match)
    const ringGeo = new THREE.RingGeometry(Math.max(pw, pd) * 0.52, Math.max(pw, pd) * 0.6, 4);
    const highlightMaterial = new THREE.MeshBasicMaterial({
      color: '#D4AF37',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const highlightRing = new THREE.Mesh(ringGeo, highlightMaterial);
    highlightRing.rotation.x = -Math.PI / 2;
    highlightRing.rotation.z = Math.PI / 4;
    highlightRing.position.set(0, 0.21, 0);
    pg.add(highlightRing);

    // Generic House Sample Model placed within setback footprint
    const bw = plot.buildingFootprint.width * S_FT;
    const bd = plot.buildingFootprint.depth * S_FT;
    const houseGroup = buildGenericHouseVariation(plot.houseVariation, bw, bd, {
      wallPalettes,
      trimMat,
      roofSlateMat,
      timberMat,
      stoneMat,
      windowWarmMat,
      frameMat,
    });
    houseGroup.position.set(0, 0.14, -pd * 0.08);
    // Tag every mesh inside houseGroup so clicking a house ALSO selects its parent plot!
    houseGroup.traverse((c) => {
      if (c instanceof THREE.Mesh) {
        c.userData = { plotId: plot.id };
        hitMeshes.push(c);
      }
    });
    pg.add(houseGroup);

    // Plot Label Sprite
    const labelTex = createLabelTexture(plot.plotNumber, plot.plotSizeLabel, `${plot.width}×${plot.depth}`);
    const labelMaterial = new THREE.SpriteMaterial({
      map: labelTex,
      transparent: true,
      opacity: 0.2,
      depthTest: false,
    });
    const labelSprite = new THREE.Sprite(labelMaterial);
    labelSprite.position.set(0, 6.2, 0);
    labelSprite.scale.set(6.2, 2.7, 1);
    pg.add(labelSprite);

    root.add(pg);

    plotHandles.set(plot.id, {
      plotId: plot.id,
      plot,
      hitMesh,
      padMaterial,
      borderLine,
      borderMaterial,
      highlightRing,
      highlightMaterial,
      houseGroup,
      labelSprite,
      labelMaterial,
      worldPos: new THREE.Vector3(px, 0, pz),
    });
  });

  return {
    root,
    plotHandles,
    hitMeshes,
    lampBulbMat,
    windowWarmMat,
    landmarkGlowMat,
    waterMat,
    fountainWaterMat,
    nightPointLights,
    dispose: () => {
      disposeObject3D(root);
      wallPalettes.forEach((m) => m.dispose());
    },
  };
}

