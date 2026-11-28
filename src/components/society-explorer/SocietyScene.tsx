'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  buildSocietyScene,
  S_FT,
  SocietySceneHandles,
} from '@/lib/society/society-scene-builder';
import { SocietyLayout, SocietyPlot } from '@/lib/society/types';

export type SocietyCameraMode = 'aerial' | 'isometric' | 'street';
export type SocietyLightingMode = 'night' | 'day';

interface SocietySceneProps {
  layout: SocietyLayout;
  lightingMode: SocietyLightingMode;
  cameraMode: SocietyCameraMode;
  selectedPlotId: string | null;
  matchingPlotIds: Set<string>;
  hasActiveFilter: boolean;
  focusRequest: { x: number; z: number; distance: number; seq: number } | null;
  transitionTargetPlot: SocietyPlot | null;
  lowPowerMode: boolean;
  mobileMoveInput: { forward: number; strafe: number };
  onSelectPlot: (plot: SocietyPlot | null) => void;
  onHoverPlot: (plot: SocietyPlot | null) => void;
}

function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function SocietyScene({
  layout,
  lightingMode,
  cameraMode,
  selectedPlotId,
  matchingPlotIds,
  hasActiveFilter,
  focusRequest,
  transitionTargetPlot,
  lowPowerMode,
  mobileMoveInput,
  onSelectPlot,
  onHoverPlot,
}: SocietySceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglError, setWebglError] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const handlesRef = useRef<SocietySceneHandles | null>(null);

  const sunRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiRef = useRef<THREE.HemisphereLight | null>(null);
  const ambientRef = useRef<THREE.AmbientLight | null>(null);

  // Dynamic refs read inside animation loop
  const lightingRef = useRef<SocietyLightingMode>(lightingMode);
  const cameraModeRef = useRef<SocietyCameraMode>(cameraMode);
  const selectedIdRef = useRef<string | null>(selectedPlotId);
  const hoveredIdRef = useRef<string | null>(null);
  const matchingIdsRef = useRef<Set<string>>(matchingPlotIds);
  const hasFilterRef = useRef<boolean>(hasActiveFilter);
  const mobileMoveRef = useRef(mobileMoveInput);

  // Camera transition targets
  const camTweenPosRef = useRef<THREE.Vector3 | null>(null);
  const camTweenTargetRef = useRef<THREE.Vector3 | null>(null);

  // Keyboard movement state for Street View
  const keysPressedRef = useRef<Record<string, boolean>>({});
  const streetYawRef = useRef(0);
  const streetPitchRef = useRef(-0.04);
  const streetLookDragRef = useRef<{ active: boolean; x: number; y: number }>({
    active: false,
    x: 0,
    y: 0,
  });

  // Latest callbacks in refs to avoid rebinding scene
  const onSelectRef = useRef(onSelectPlot);
  const onHoverRef = useRef(onHoverPlot);
  useEffect(() => {
    onSelectRef.current = onSelectPlot;
  }, [onSelectPlot]);
  useEffect(() => {
    onHoverRef.current = onHoverPlot;
  }, [onHoverPlot]);

  useEffect(() => {
    lightingRef.current = lightingMode;
  }, [lightingMode]);
  useEffect(() => {
    cameraModeRef.current = cameraMode;
  }, [cameraMode]);
  useEffect(() => {
    selectedIdRef.current = selectedPlotId;
  }, [selectedPlotId]);
  useEffect(() => {
    matchingIdsRef.current = matchingPlotIds;
  }, [matchingPlotIds]);
  useEffect(() => {
    hasFilterRef.current = hasActiveFilter;
  }, [hasActiveFilter]);
  useEffect(() => {
    mobileMoveRef.current = mobileMoveInput;
  }, [mobileMoveInput]);

  // 1. Initialize WebGL & Build Society Scene once
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglError(true);
      return;
    }
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth || 960;
    const h = container.clientHeight || 620;

    const scene = new THREE.Scene();
    const isNightInit = lightingRef.current === 'night';
    scene.background = new THREE.Color(isNightInit ? '#111824' : '#DCE7EE');
    scene.fog = new THREE.Fog(isNightInit ? '#111824' : '#DCE7EE', 110, 320);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.5, 450);
    camera.position.set(0, 125, 130);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !lowPowerMode,
      powerPreference: lowPowerMode ? 'low-power' : 'high-performance',
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPowerMode ? 1.25 : 2));
    renderer.shadowMap.enabled = !lowPowerMode;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.maxPolarAngle = Math.PI / 2 - 0.06;
    controls.minDistance = 12;
    controls.maxDistance = 240;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // Stop camera tween if user interacts
    const onControlStart = () => {
      camTweenPosRef.current = null;
      camTweenTargetRef.current = null;
    };
    controls.addEventListener('start', onControlStart);

    // Base Lights
    const ambient = new THREE.AmbientLight('#ffffff', isNightInit ? 0.28 : 0.5);
    scene.add(ambient);
    ambientRef.current = ambient;

    const hemi = new THREE.HemisphereLight(
      isNightInit ? '#334155' : '#EBF5FF',
      isNightInit ? '#1E251F' : '#738264',
      isNightInit ? 0.42 : 0.72
    );
    scene.add(hemi);
    hemiRef.current = hemi;

    const sun = new THREE.DirectionalLight(
      isNightInit ? '#93C5FD' : '#FFFBEB',
      isNightInit ? 0.45 : 1.75
    );
    sun.position.set(60, 95, 55);
    sun.castShadow = !lowPowerMode;
    sun.shadow.mapSize.width = lowPowerMode ? 512 : 1024;
    sun.shadow.mapSize.height = lowPowerMode ? 512 : 1024;
    const sd = 95;
    sun.shadow.camera.left = -sd;
    sun.shadow.camera.right = sd;
    sun.shadow.camera.top = sd;
    sun.shadow.camera.bottom = -sd;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 250;
    scene.add(sun);
    sunRef.current = sun;

    // Build Society Assembly
    const handles = buildSocietyScene(layout, lowPowerMode);
    scene.add(handles.root);
    handlesRef.current = handles;

    // Raycasting for Plot Hover & Selection
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let downPos = { x: 0, y: 0 };

    const updatePointerFromEvent = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const pickPlot = (): SocietyPlot | null => {
      if (!handlesRef.current || !cameraRef.current) return null;
      raycaster.setFromCamera(pointer, cameraRef.current);
      const hits = raycaster.intersectObjects(handlesRef.current.hitMeshes, false);
      if (hits.length > 0) {
        const plotId = hits[0].object.userData?.plotId as string | undefined;
        if (plotId) {
          return handlesRef.current.plotHandles.get(plotId)?.plot || null;
        }
      }
      return null;
    };

    const onPointerDown = (e: PointerEvent) => {
      downPos = { x: e.clientX, y: e.clientY };
      if (cameraModeRef.current === 'street') {
        streetLookDragRef.current = { active: true, x: e.clientX, y: e.clientY };
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (cameraModeRef.current === 'street' && streetLookDragRef.current.active) {
        const dx = e.clientX - streetLookDragRef.current.x;
        const dy = e.clientY - streetLookDragRef.current.y;
        streetLookDragRef.current = { active: true, x: e.clientX, y: e.clientY };
        streetYawRef.current -= dx * 0.004;
        streetPitchRef.current = Math.max(-0.35, Math.min(0.45, streetPitchRef.current - dy * 0.003));
        return;
      }

      if (e.pointerType === 'mouse') {
        updatePointerFromEvent(e);
        const hovered = pickPlot();
        const nextId = hovered?.id || null;
        if (nextId !== hoveredIdRef.current) {
          hoveredIdRef.current = nextId;
          renderer.domElement.style.cursor = hovered ? 'pointer' : 'grab';
          onHoverRef.current(hovered);
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      streetLookDragRef.current.active = false;
      const dist = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
      if (dist < 6) {
        updatePointerFromEvent(e);
        const picked = pickPlot();
        if (picked) {
          onSelectRef.current(picked);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // Keyboard WASD / Arrow listeners (only active when Street View mode is selected)
    const onKeyDown = (e: KeyboardEvent) => {
      if (cameraModeRef.current !== 'street') return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
        e.preventDefault();
        keysPressedRef.current[e.key.toLowerCase()] = true;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysPressedRef.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Resize Observer
    const resizeObs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cw = entry.contentRect.width;
        const ch = entry.contentRect.height;
        if (cw > 0 && ch > 0) {
          camera.aspect = cw / ch;
          camera.updateProjectionMatrix();
          renderer.setSize(cw, ch);
        }
      }
    });
    resizeObs.observe(container);

    // Smooth Lighting Interpolation Targets
    const daySky = new THREE.Color('#DCE7EE');
    const nightSky = new THREE.Color('#0E1520');
    const dayHemiSky = new THREE.Color('#EBF5FF');
    const nightHemiSky = new THREE.Color('#334155');
    const dayHemiGround = new THREE.Color('#738264');
    const nightHemiGround = new THREE.Color('#19221A');
    const daySun = new THREE.Color('#FFFBEB');
    const nightSun = new THREE.Color('#93C5FD');

    const boundX = (layout.dimensions.width * S_FT) * 0.56;
    const boundZ = (layout.dimensions.depth * S_FT) * 0.56;
    let lightBlend = isNightInit ? 1 : 0; // 0 = Day, 1 = Night
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth Day <-> Night transition
      const targetBlend = lightingRef.current === 'night' ? 1 : 0;
      lightBlend += (targetBlend - lightBlend) * 0.08;

      const skyNow = daySky.clone().lerp(nightSky, lightBlend);
      scene.background = skyNow;
      if (scene.fog instanceof THREE.Fog) {
        scene.fog.color.copy(skyNow);
      }

      sun.color.copy(daySun).lerp(nightSun, lightBlend);
      sun.intensity = THREE.MathUtils.lerp(1.75, 0.45, lightBlend);
      hemi.color.copy(dayHemiSky).lerp(nightHemiSky, lightBlend);
      hemi.groundColor.copy(dayHemiGround).lerp(nightHemiGround, lightBlend);
      hemi.intensity = THREE.MathUtils.lerp(0.72, 0.38, lightBlend);
      ambient.intensity = THREE.MathUtils.lerp(0.5, 0.26, lightBlend);

      handles.lampBulbMat.emissiveIntensity = THREE.MathUtils.lerp(0.05, 2.4, lightBlend);
      handles.windowWarmMat.emissiveIntensity = THREE.MathUtils.lerp(0.08, 1.35, lightBlend);
      handles.landmarkGlowMat.emissiveIntensity = THREE.MathUtils.lerp(0.1, 1.0, lightBlend);
      handles.waterMat.emissiveIntensity = THREE.MathUtils.lerp(0.05, 0.45, lightBlend);
      handles.nightPointLights.forEach((pl) => {
        pl.intensity = THREE.MathUtils.lerp(0, 2.4, lightBlend);
      });

      // Camera Mode Logic
      if (cameraModeRef.current === 'street') {
        controls.enabled = false;

        if (camTweenPosRef.current) {
          camera.position.lerp(camTweenPosRef.current, 0.1);
          if (camera.position.distanceTo(camTweenPosRef.current) < 0.2) {
            camTweenPosRef.current = null;
          }
        }

        const keys = keysPressedRef.current;
        const mob = mobileMoveRef.current;
        const fwd =
          (keys['w'] || keys['arrowup'] ? 1 : 0) -
          (keys['s'] || keys['arrowdown'] ? 1 : 0) +
          mob.forward;
        const str =
          (keys['d'] || keys['arrowright'] ? 1 : 0) -
          (keys['a'] || keys['arrowleft'] ? 1 : 0) +
          mob.strafe;

        if (fwd !== 0 || str !== 0) {
          const speed = 0.65;
          const sinY = Math.sin(streetYawRef.current);
          const cosY = Math.cos(streetYawRef.current);
          camera.position.x += (-sinY * fwd + cosY * str) * speed;
          camera.position.z += (-cosY * fwd - sinY * str) * speed;
        }

        // Keep street camera within society grounds at pedestrian eye height
        camera.position.x = Math.max(-boundX, Math.min(boundX, camera.position.x));
        camera.position.z = Math.max(-boundZ, Math.min(boundZ, camera.position.z));
        camera.position.y = 2.6;

        const lookDist = 12;
        const lx = camera.position.x - Math.sin(streetYawRef.current) * lookDist;
        const lz = camera.position.z - Math.cos(streetYawRef.current) * lookDist;
        const ly = camera.position.y + Math.sin(streetPitchRef.current) * lookDist;
        camera.lookAt(lx, ly, lz);
      } else {
        controls.enabled = true;
        if (camTweenPosRef.current && camTweenTargetRef.current) {
          camera.position.lerp(camTweenPosRef.current, 0.08);
          controls.target.lerp(camTweenTargetRef.current, 0.08);
          if (camera.position.distanceTo(camTweenPosRef.current) < 0.15) {
            camTweenPosRef.current = null;
            camTweenTargetRef.current = null;
          }
        }
        // Clamp OrbitControls target within society bounds
        controls.target.x = Math.max(-boundX * 0.85, Math.min(boundX * 0.85, controls.target.x));
        controls.target.z = Math.max(-boundZ * 0.85, Math.min(boundZ * 0.85, controls.target.z));
        controls.target.y = Math.max(0, Math.min(20, controls.target.y));
        controls.update();
      }

      // Distance-adaptive plot labels + highlight materials (zero scene rebuilds!)
      const camPos = camera.position;
      handles.plotHandles.forEach((ph) => {
        const isSelected = ph.plotId === selectedIdRef.current;
        const isHovered = ph.plotId === hoveredIdRef.current;
        const isMatched = !hasFilterRef.current || matchingIdsRef.current.has(ph.plotId);

        // Plot ground tint & border
        if (isSelected) {
          ph.padMaterial.color.set('#B8924A');
          ph.borderMaterial.color.set('#FDE68A');
          ph.borderMaterial.opacity = 1;
          ph.highlightMaterial.color.set('#D4AF37');
          ph.highlightMaterial.opacity = 0.85;
        } else if (isHovered) {
          ph.padMaterial.color.set('#8DA070');
          ph.borderMaterial.color.set('#F3E5AB');
          ph.borderMaterial.opacity = 0.95;
          ph.highlightMaterial.color.set('#E5C158');
          ph.highlightMaterial.opacity = 0.45;
        } else if (hasFilterRef.current && isMatched) {
          ph.padMaterial.color.set('#6A9955');
          ph.borderMaterial.color.set('#A7F3D0');
          ph.borderMaterial.opacity = 0.95;
          ph.highlightMaterial.color.set('#10B981');
          ph.highlightMaterial.opacity = 0.4;
        } else if (hasFilterRef.current && !isMatched) {
          ph.padMaterial.color.set('#444B41');
          ph.borderMaterial.color.set('#6B7280');
          ph.borderMaterial.opacity = 0.25;
          ph.highlightMaterial.opacity = 0;
        } else {
          ph.padMaterial.color.set('#6C8456');
          ph.borderMaterial.color.set('#E5DCC8');
          ph.borderMaterial.opacity = 0.65;
          ph.highlightMaterial.opacity = 0;
        }

        // Reveal plot numbers smoothly as camera zooms closer
        const dist = camPos.distanceTo(ph.worldPos);
        if (isSelected || isHovered) {
          ph.labelMaterial.opacity = 1;
        } else if (hasFilterRef.current && !isMatched) {
          ph.labelMaterial.opacity = 0.08;
        } else if (dist < 115) {
          ph.labelMaterial.opacity = THREE.MathUtils.clamp((115 - dist) / 45, 0.15, 0.95);
        } else {
          ph.labelMaterial.opacity = 0;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObs.disconnect();
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      controls.removeEventListener('start', onControlStart);
      controls.dispose();
      handles.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [layout, lowPowerMode]);

  // 2. React to Camera Mode Changes
  useEffect(() => {
    if (cameraMode === 'aerial') {
      camTweenPosRef.current = new THREE.Vector3(0, 125, 130);
      camTweenTargetRef.current = new THREE.Vector3(0, 0, 0);
    } else if (cameraMode === 'isometric') {
      camTweenPosRef.current = new THREE.Vector3(75, 48, 82);
      camTweenTargetRef.current = new THREE.Vector3(0, 0, 10);
    } else if (cameraMode === 'street') {
      // Position at eye level on Roman Grand Boulevard facing North, or facing selected plot
      const selected = selectedIdRef.current
        ? handlesRef.current?.plotHandles.get(selectedIdRef.current)
        : null;
      if (selected) {
        const px = selected.worldPos.x;
        const pz = selected.worldPos.z;
        camTweenPosRef.current = new THREE.Vector3(px > 0 ? px - 14 : px + 14, 2.6, pz + 14);
        streetYawRef.current = Math.atan2(
          camTweenPosRef.current.x - px,
          camTweenPosRef.current.z - pz
        );
      } else {
        camTweenPosRef.current = new THREE.Vector3(0, 2.6, 52);
        streetYawRef.current = 0;
      }
      streetPitchRef.current = -0.02;
      camTweenTargetRef.current = null;
    }
  }, [cameraMode]);

  // 3. Fly Camera to Focused Plot / Landmark
  useEffect(() => {
    if (!focusRequest) return;
    if (cameraModeRef.current === 'street') {
      camTweenPosRef.current = new THREE.Vector3(focusRequest.x, 2.6, focusRequest.z + 18);
      streetYawRef.current = 0;
    } else {
      const dist = focusRequest.distance || 38;
      camTweenPosRef.current = new THREE.Vector3(
        focusRequest.x + dist * 0.45,
        dist * 0.65,
        focusRequest.z + dist * 0.85
      );
      camTweenTargetRef.current = new THREE.Vector3(focusRequest.x, 0.5, focusRequest.z);
    }
  }, [focusRequest]);

  // 4. Smooth Camera Approach Into Selected Plot Before Entering HouseCraft
  useEffect(() => {
    if (!transitionTargetPlot) return;
    const tx = transitionTargetPlot.position.x * S_FT;
    const tz = transitionTargetPlot.position.z * S_FT;
    camTweenPosRef.current = new THREE.Vector3(tx + 5, 7, tz + 14);
    camTweenTargetRef.current = new THREE.Vector3(tx, 1.5, tz);
  }, [transitionTargetPlot]);

  if (webglError) {
    return (
      <div className="w-full h-full min-h-[460px] flex flex-col items-center justify-center bg-[#f3efe4] text-[#161f18] p-8 text-center rounded-3xl border border-[#dfd2ba]">
        <i className="fa-solid fa-city text-4xl text-[#9d783e] mb-4"></i>
        <h3 className="text-2xl font-serif mb-2">3D Society View Unavailable</h3>
        <p className="text-sm text-gray-600 max-w-md leading-relaxed">
          WebGL rendering is currently disabled or unsupported on this device. You can still browse plots, search by plot number, inspect dimensions, and click <strong>Customize Your House</strong> using the Society Navigation Panel.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[480px] sm:min-h-[580px] lg:min-h-[680px] select-none"
      aria-label="Interactive 3D Society Explorer"
    />
  );
}

