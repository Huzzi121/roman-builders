'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { buildHouseAssembly, disposeObject3D, FT } from '@/lib/house-builder/geometry';
import { PLOT_SPECS } from '@/lib/house-builder/configurations';
import { CameraPreset, HouseConfig, LightingMode } from '@/lib/house-builder/types';
import type { SocietyPlot } from '@/lib/society/types';

interface HouseCanvasProps {
  config: HouseConfig;
  lightingMode: LightingMode;
  cameraPresetTrigger: { preset: CameraPreset; seq: number } | null;
  lowPowerMode: boolean;
  societyPlot?: SocietyPlot | null;
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

export default function HouseCanvas({
  config,
  lightingMode,
  cameraPresetTrigger,
  lowPowerMode,
  societyPlot,
}: HouseCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  // Persistent Three.js object refs so we don't rebuild the scene on config changes
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const houseGroupRef = useRef<THREE.Group | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const groundRef = useRef<THREE.Mesh | null>(null);

  // Smooth camera animation target
  const camTargetPosRef = useRef<THREE.Vector3 | null>(null);
  const controlsTargetPosRef = useRef<THREE.Vector3 | null>(null);

  // 1. Initialize Three.js Scene once
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#DCE7EE');
    scene.fog = new THREE.Fog('#DCE7EE', 28, 72);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 150);
    camera.position.set(14, 10, 18);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !lowPowerMode,
      powerPreference: lowPowerMode ? 'low-power' : 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPowerMode ? 1.25 : 2));
    renderer.shadowMap.enabled = !lowPowerMode;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minDistance = 6;
    controls.maxDistance = 42;
    controls.target.set(0, 1.4, 0);
    controlsRef.current = controls;

    // Cancel camera tween if user manually drags
    const onControlStart = () => {
      camTargetPosRef.current = null;
      controlsTargetPosRef.current = null;
    };
    controls.addEventListener('start', onControlStart);

    // Lights
    const ambient = new THREE.AmbientLight('#ffffff', 0.45);
    scene.add(ambient);
    ambientLightRef.current = ambient;

    const hemi = new THREE.HemisphereLight('#EBF5FF', '#7C8570', 0.65);
    hemi.position.set(0, 20, 0);
    scene.add(hemi);
    hemiLightRef.current = hemi;

    const sun = new THREE.DirectionalLight('#FFFBEB', 1.75);
    sun.position.set(16, 22, 14);
    sun.castShadow = !lowPowerMode;
    sun.shadow.mapSize.width = lowPowerMode ? 512 : 1024;
    sun.shadow.mapSize.height = lowPowerMode ? 512 : 1024;
    sun.shadow.camera.near = 2;
    sun.shadow.camera.far = 65;
    const d = 16;
    sun.shadow.camera.left = -d;
    sun.shadow.camera.right = d;
    sun.shadow.camera.top = d;
    sun.shadow.camera.bottom = -d;
    sun.shadow.bias = -0.0005;
    scene.add(sun);
    sunLightRef.current = sun;

    // Surrounding ground plane
    const groundGeo = new THREE.PlaneGeometry(140, 140);
    const groundMat = new THREE.MeshStandardMaterial({
      color: '#B8C2AA',
      roughness: 0.96,
      metalness: 0,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.16;
    ground.receiveShadow = true;
    scene.add(ground);
    groundRef.current = ground;

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = w / h;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation loop
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (camTargetPosRef.current && cameraRef.current && controlsRef.current) {
        cameraRef.current.position.lerp(camTargetPosRef.current, 0.08);
        if (controlsTargetPosRef.current) {
          controlsRef.current.target.lerp(controlsTargetPosRef.current, 0.08);
        }
        if (cameraRef.current.position.distanceTo(camTargetPosRef.current) < 0.05) {
          camTargetPosRef.current = null;
          controlsTargetPosRef.current = null;
        }
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', onControlStart);
      controls.dispose();
      if (houseGroupRef.current) {
        scene.remove(houseGroupRef.current);
        disposeObject3D(houseGroupRef.current);
        houseGroupRef.current = null;
      }
      groundGeo.dispose();
      groundMat.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [lowPowerMode]);

  // 2. Update Lighting Mode smoothly without rebuilding scene
  useEffect(() => {
    const scene = sceneRef.current;
    const sun = sunLightRef.current;
    const hemi = hemiLightRef.current;
    const ambient = ambientLightRef.current;
    const ground = groundRef.current;
    if (!scene || !sun || !hemi || !ambient || !ground) return;

    const isGolden = lightingMode === 'golden-hour';
    const skyColor = isGolden ? '#EED3B1' : '#DCE7EE';
    scene.background = new THREE.Color(skyColor);
    scene.fog = new THREE.Fog(skyColor, 28, 72);

    if (isGolden) {
      sun.color.set('#FDBA74');
      sun.intensity = 2.05;
      sun.position.set(-18, 8.5, 14);
      hemi.color.set('#FDE68A');
      hemi.groundColor.set('#57534E');
      hemi.intensity = 0.55;
      ambient.intensity = 0.35;
      (ground.material as THREE.MeshStandardMaterial).color.set('#A3A88E');
    } else {
      sun.color.set('#FFFBEB');
      sun.intensity = 1.75;
      sun.position.set(16, 22, 14);
      hemi.color.set('#EBF5FF');
      hemi.groundColor.set('#7C8570');
      hemi.intensity = 0.65;
      ambient.intensity = 0.45;
      (ground.material as THREE.MeshStandardMaterial).color.set('#B8C2AA');
    }
  }, [lightingMode]);

  // 3. Rebuild ONLY the House Mesh Group when config or lighting changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (houseGroupRef.current) {
      scene.remove(houseGroupRef.current);
      disposeObject3D(houseGroupRef.current);
      houseGroupRef.current = null;
    }

    const assembly = buildHouseAssembly(config, lightingMode === 'golden-hour', societyPlot);
    scene.add(assembly);
    houseGroupRef.current = assembly;
  }, [config, lightingMode, societyPlot]);

  // 4. Camera Presets
  useEffect(() => {
    if (!cameraPresetTrigger) return;
    const plot = PLOT_SPECS[config.plotSize];
    const scaleRadius = Math.max(12, plot.depthFt * FT * 1.15);

    const target = new THREE.Vector3(0, 1.4, 0);
    let pos = new THREE.Vector3(scaleRadius * 0.85, scaleRadius * 0.55, scaleRadius * 1.05);

    switch (cameraPresetTrigger.preset) {
      case 'front':
        pos = new THREE.Vector3(0, 4.2, scaleRadius * 1.15);
        break;
      case 'side':
        pos = new THREE.Vector3(scaleRadius * 1.25, 5.0, 2.5);
        break;
      case 'aerial':
        pos = new THREE.Vector3(0, scaleRadius * 1.35, 3.5);
        target.set(0, 0, 0);
        break;
      case 'reset':
      default:
        pos = new THREE.Vector3(scaleRadius * 0.85, scaleRadius * 0.55, scaleRadius * 1.05);
        break;
    }

    camTargetPosRef.current = pos;
    controlsTargetPosRef.current = target;
  }, [cameraPresetTrigger, config.plotSize]);

  if (!webglSupported) {
    return (
      <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center bg-[#f3efe4] text-[#161f18] p-8 text-center rounded-3xl border border-[#dfd2ba]">
        <i className="fa-solid fa-cube text-4xl text-[#9d783e] mb-4"></i>
        <h3 className="text-xl font-serif mb-2">3D Preview Unavailable</h3>
        <p className="text-sm text-gray-600 max-w-md leading-relaxed">
          Your device or browser currently does not support WebGL hardware acceleration. You can still configure your plot, materials, floor plans, and request an estimate using the Floor Plan view and configurator controls.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] cursor-grab active:cursor-grabbing select-none"
      aria-label="Interactive 3D House Model Viewport"
    />
  );
}

