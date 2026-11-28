'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { PlotSizeId } from '@/lib/house-builder/types';
import { DEMO_SOCIETY_LAYOUT } from '@/lib/society/demo-society';
import { getHouseCraftUrlForPlot } from '@/lib/society/housecraft-integration';
import { S_FT } from '@/lib/society/society-scene-builder';
import { SocietyLandmark, SocietyPlot, SocietyPlotType } from '@/lib/society/types';
import type { SocietyCameraMode, SocietyLightingMode } from './SocietyScene';
import SocietyNavigationPanel from './SocietyNavigationPanel';
import PlotInformationPanel from './PlotInformationPanel';

const SocietyScene = dynamic(() => import('./SocietyScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[480px] sm:min-h-[580px] lg:min-h-[680px] flex flex-col items-center justify-center bg-[#111824] text-[#e8e4db]">
      <div className="w-10 h-10 border-4 border-[#9d783e] border-t-transparent rounded-full animate-spin mb-3"></div>
      <span className="text-xs font-medium tracking-widest uppercase text-[#dfd2ba]">
        Loading 3D Society Environment...
      </span>
    </div>
  ),
});

export default function SocietyExplorer() {
  const router = useRouter();
  const layout = DEMO_SOCIETY_LAYOUT;

  // Default: Evening/Night mode + Aerial View
  const [lightingMode, setLightingMode] = useState<SocietyLightingMode>('night');
  const [cameraMode, setCameraMode] = useState<SocietyCameraMode>('aerial');
  const [lowPowerMode, setLowPowerMode] = useState(false);

  const [selectedPlot, setSelectedPlot] = useState<SocietyPlot | null>(null);
  const [hoveredPlot, setHoveredPlot] = useState<SocietyPlot | null>(null);
  const [transitionPlot, setTransitionPlot] = useState<SocietyPlot | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [sizeFilter, setSizeFilter] = useState<PlotSizeId | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<SocietyPlotType | 'all'>('all');
  const [blockFilter, setBlockFilter] = useState('all');
  const [streetFilter, setStreetFilter] = useState('all');

  const [focusRequest, setFocusRequest] = useState<{
    x: number;
    z: number;
    distance: number;
    seq: number;
  } | null>(null);

  const [mobileMoveInput, setMobileMoveInput] = useState({ forward: 0, strafe: 0 });

  const hasActiveFilter =
    searchQuery.trim() !== '' ||
    sizeFilter !== 'all' ||
    typeFilter !== 'all' ||
    blockFilter !== 'all' ||
    streetFilter !== 'all';

  const matchingPlots = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return layout.plots.filter((p) => {
      if (q && !p.plotNumber.toLowerCase().includes(q) && !p.street.toLowerCase().includes(q)) {
        return false;
      }
      if (sizeFilter !== 'all' && p.plotSize !== sizeFilter) return false;
      if (typeFilter !== 'all' && p.plotType !== typeFilter) return false;
      if (blockFilter !== 'all' && p.block !== blockFilter) return false;
      if (streetFilter !== 'all' && p.street !== streetFilter) return false;
      return true;
    });
  }, [layout.plots, searchQuery, sizeFilter, typeFilter, blockFilter, streetFilter]);

  const matchingPlotIds = useMemo(
    () => new Set(matchingPlots.map((p) => p.id)),
    [matchingPlots]
  );

  const focusOnCoords = (xFeet: number, zFeet: number, distance = 38) => {
    setFocusRequest((prev) => ({
      x: xFeet * S_FT,
      z: zFeet * S_FT,
      distance,
      seq: (prev?.seq || 0) + 1,
    }));
  };

  const handleSelectAndFocusPlot = (plot: SocietyPlot) => {
    setSelectedPlot(plot);
    if (cameraMode === 'aerial') {
      setCameraMode('isometric');
    }
    focusOnCoords(plot.position.x, plot.position.z, 34);
  };

  const handleFocusLandmark = (lm: SocietyLandmark) => {
    setSelectedPlot(null);
    if (cameraMode === 'aerial') {
      setCameraMode('isometric');
    }
    focusOnCoords(lm.x, lm.z, 44);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSizeFilter('all');
    setTypeFilter('all');
    setBlockFilter('all');
    setStreetFilter('all');
  };

  const handleCustomizeHouse = (plot: SocietyPlot) => {
    setTransitionPlot(plot);
    const targetUrl = getHouseCraftUrlForPlot(plot);
    // Short smooth camera approach toward plot before transitioning into HouseCraft
    setTimeout(() => {
      router.push(targetUrl);
    }, 650);
  };

  return (
    <div className="space-y-6">
      {/* Main Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Center: 3D Society Viewport */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-3">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border-2 border-white shadow-[0_24px_60px_rgba(0,0,0,0.16)] overflow-hidden relative">
            {/* Top Viewport Control Bar */}
            <div className="p-3 sm:p-4 bg-[#3d4435] text-[#e8e4db] flex flex-wrap items-center justify-between gap-2">
              {/* Camera Mode Switcher */}
              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    { id: 'aerial', label: 'Aerial View', icon: 'fa-helicopter' },
                    { id: 'isometric', label: 'Isometric', icon: 'fa-cubes' },
                    { id: 'street', label: 'Street View', icon: 'fa-person-walking' },
                  ] as Array<{ id: SocietyCameraMode; label: string; icon: string }>
                ).map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setCameraMode(mode.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                      cameraMode === mode.id
                        ? 'bg-[#e8e4db] text-[#161f18] font-semibold shadow-sm'
                        : 'bg-white/10 text-[#e8e4db] hover:bg-white/20'
                    }`}
                  >
                    <i className={`fa-solid ${mode.icon} text-[11px]`}></i>
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>

              {/* Day / Evening-Night + Adaptive Quality Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setLightingMode((m) => (m === 'night' ? 'day' : 'night'))
                  }
                  className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  <i
                    className={`fa-solid ${
                      lightingMode === 'night'
                        ? 'fa-moon text-amber-300'
                        : 'fa-sun text-amber-300'
                    }`}
                  ></i>
                  <span>{lightingMode === 'night' ? 'Evening / Night' : 'Daylight'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLowPowerMode((p) => !p)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-medium transition-colors ${
                    lowPowerMode
                      ? 'bg-emerald-500/30 text-emerald-100'
                      : 'bg-white/10 text-[#e8e4db]/80 hover:bg-white/20'
                  }`}
                  title="Adaptive quality toggle for mobile or battery performance"
                >
                  {lowPowerMode ? 'Eco 3D' : 'HD 3D'}
                </button>
              </div>
            </div>

            {/* 3D Canvas */}
            <div className="relative">
              <SocietyScene
                layout={layout}
                lightingMode={lightingMode}
                cameraMode={cameraMode}
                selectedPlotId={selectedPlot?.id || null}
                matchingPlotIds={matchingPlotIds}
                hasActiveFilter={hasActiveFilter}
                focusRequest={focusRequest}
                transitionTargetPlot={transitionPlot}
                lowPowerMode={lowPowerMode}
                mobileMoveInput={mobileMoveInput}
                onSelectPlot={(p) => setSelectedPlot(p)}
                onHoverPlot={(p) => setHoveredPlot(p)}
              />

              {/* Hover Tooltip Badge */}
              {hoveredPlot && hoveredPlot.id !== selectedPlot?.id && (
                <div className="pointer-events-none absolute top-3 left-3 bg-[#161f18]/90 text-white px-3.5 py-2 rounded-2xl border border-[#9d783e]/60 shadow-lg text-xs">
                  <span className="font-bold text-[#dfd2ba]">Plot {hoveredPlot.plotNumber}</span>
                  <span className="mx-1.5 opacity-50">•</span>
                  <span>{hoveredPlot.plotSizeLabel}</span>
                  <span className="mx-1.5 opacity-50">•</span>
                  <span className="text-[11px] text-white/80">{hoveredPlot.street}</span>
                </div>
              )}

              {/* Bottom Controls Hint / Street View Mobile Movement Pad */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 pointer-events-none">
                {cameraMode === 'street' ? (
                  <div className="pointer-events-auto flex items-center gap-2 bg-[#161f18]/85 backdrop-blur-md p-2 rounded-2xl border border-white/15 shadow-xl text-white">
                    <div className="grid grid-cols-3 gap-1">
                      <div></div>
                      <button
                        type="button"
                        onPointerDown={() => setMobileMoveInput({ forward: 1, strafe: 0 })}
                        onPointerUp={() => setMobileMoveInput({ forward: 0, strafe: 0 })}
                        onPointerLeave={() => setMobileMoveInput({ forward: 0, strafe: 0 })}
                        className="w-9 h-9 rounded-lg bg-white/15 active:bg-[#9d783e] flex items-center justify-center text-xs"
                        aria-label="Move Forward"
                      >
                        <i className="fa-solid fa-arrow-up"></i>
                      </button>
                      <div></div>
                      <button
                        type="button"
                        onPointerDown={() => setMobileMoveInput({ forward: 0, strafe: -1 })}
                        onPointerUp={() => setMobileMoveInput({ forward: 0, strafe: 0 })}
                        onPointerLeave={() => setMobileMoveInput({ forward: 0, strafe: 0 })}
                        className="w-9 h-9 rounded-lg bg-white/15 active:bg-[#9d783e] flex items-center justify-center text-xs"
                        aria-label="Strafe Left"
                      >
                        <i className="fa-solid fa-arrow-left"></i>
                      </button>
                      <button
                        type="button"
                        onPointerDown={() => setMobileMoveInput({ forward: -1, strafe: 0 })}
                        onPointerUp={() => setMobileMoveInput({ forward: 0, strafe: 0 })}
                        onPointerLeave={() => setMobileMoveInput({ forward: 0, strafe: 0 })}
                        className="w-9 h-9 rounded-lg bg-white/15 active:bg-[#9d783e] flex items-center justify-center text-xs"
                        aria-label="Move Backward"
                      >
                        <i className="fa-solid fa-arrow-down"></i>
                      </button>
                      <button
                        type="button"
                        onPointerDown={() => setMobileMoveInput({ forward: 0, strafe: 1 })}
                        onPointerUp={() => setMobileMoveInput({ forward: 0, strafe: 0 })}
                        onPointerLeave={() => setMobileMoveInput({ forward: 0, strafe: 0 })}
                        className="w-9 h-9 rounded-lg bg-white/15 active:bg-[#9d783e] flex items-center justify-center text-xs"
                        aria-label="Strafe Right"
                      >
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                    <span className="hidden sm:inline text-[11px] text-[#dfd2ba] px-2">
                      WASD / Arrows to walk • Drag to look
                    </span>
                  </div>
                ) : (
                  <div className="bg-[#161f18]/80 backdrop-blur-md text-[#e8e4db] text-[11px] px-3.5 py-1.5 rounded-full border border-white/10">
                    Drag to rotate • Right-drag/Two-finger to pan • Click any plot to inspect
                  </div>
                )}

                <span className="hidden sm:inline-block bg-white/85 backdrop-blur-md text-[#161f18] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow">
                  Demonstration Layout
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Plot Details + Society Search/Navigation Panel */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-5">
          {selectedPlot && (
            <PlotInformationPanel
              plot={selectedPlot}
              transitioning={Boolean(transitionPlot)}
              onCustomizeHouse={handleCustomizeHouse}
              onDeselect={() => setSelectedPlot(null)}
            />
          )}

          <SocietyNavigationPanel
            layout={layout}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sizeFilter={sizeFilter}
            onSizeFilterChange={setSizeFilter}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            blockFilter={blockFilter}
            onBlockFilterChange={setBlockFilter}
            streetFilter={streetFilter}
            onStreetFilterChange={setStreetFilter}
            matchingPlots={matchingPlots}
            selectedPlotId={selectedPlot?.id || null}
            onFocusPlot={handleSelectAndFocusPlot}
            onFocusLandmark={handleFocusLandmark}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>
    </div>
  );
}

