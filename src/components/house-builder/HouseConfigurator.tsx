'use client';

import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  buildHouseQuoteWhatsAppUrl,
  calculateHouseEstimate,
  DEFAULT_CONSTRUCTION_RATES,
} from '@/lib/house-builder/estimates';
import { PLOT_SPECS } from '@/lib/house-builder/configurations';
import { DEFAULT_HOUSE_CONFIG } from '@/lib/house-builder/presets';
import {
  CameraPreset,
  FinishingCategoryId,
  HouseConfig,
  LightingMode,
  ViewMode,
} from '@/lib/house-builder/types';
import {
  buildConfigFromSocietyPlot,
  resolveSocietyPlot,
} from '@/lib/society/housecraft-integration';
import { PLOT_TYPE_LABELS, SocietyPlot } from '@/lib/society/types';
import ConfigurationControls from './ConfigurationControls';
import FloorPlanViewer from './FloorPlanViewer';
import EstimateSummary from './EstimateSummary';

// Lazy-load Three.js Canvas strictly on client to keep SSR safe and main bundle fast
const HouseCanvas = dynamic(() => import('./HouseCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] flex flex-col items-center justify-center bg-[#DCE7EE]/60 text-[#3d4435]">
      <div className="w-10 h-10 border-4 border-[#3d4435] border-t-transparent rounded-full animate-spin mb-3"></div>
      <span className="text-xs font-medium tracking-wider uppercase">
        Loading 3D Architectural Studio...
      </span>
    </div>
  ),
});

function encodeConfigParam(cfg: HouseConfig): string {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(cfg))));
  } catch {
    return '';
  }
}

function decodeConfigParam(raw: string): HouseConfig | null {
  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(raw))));
    if (parsed && parsed.plotSize && parsed.floors && parsed.style && parsed.amenities) {
      return parsed as HouseConfig;
    }
    return null;
  } catch {
    return null;
  }
}

export default function HouseConfigurator() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [config, setConfig] = useState<HouseConfig>(DEFAULT_HOUSE_CONFIG);
  const [societyPlot, setSocietyPlot] = useState<SocietyPlot | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('3d');
  const [lightingMode, setLightingMode] = useState<LightingMode>('daylight');
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const [cameraPresetTrigger, setCameraPresetTrigger] = useState<{
    preset: CameraPreset;
    seq: number;
  } | null>(null);

  const [saving, setSaving] = useState(false);
  const [savedRef, setSavedRef] = useState<string | null>(null);
  const [statusBanner, setStatusBanner] = useState<string | null>(null);

  // Restore configuration from URL query (?societyPlot=..., ?config=..., or ?ref=...)
  useEffect(() => {
    const plotParam = searchParams.get('societyPlot');
    const layoutParam = searchParams.get('layout');
    const cfgParam = searchParams.get('config');
    const refParam = searchParams.get('ref');

    let resolvedPlot: SocietyPlot | null = null;
    if (plotParam) {
      resolvedPlot = resolveSocietyPlot(plotParam, layoutParam);
      setSocietyPlot(resolvedPlot);
    } else {
      setSocietyPlot(null);
    }

    if (cfgParam) {
      const decoded = decodeConfigParam(cfgParam);
      if (decoded) {
        setConfig(resolvedPlot ? buildConfigFromSocietyPlot(resolvedPlot, decoded) : decoded);
      } else if (resolvedPlot) {
        setConfig((prev) => buildConfigFromSocietyPlot(resolvedPlot!, prev));
      }
    } else if (refParam) {
      const supabase = createClient();
      supabase
        .from('house_configurations')
        .select('config, ref_code')
        .eq('ref_code', refParam)
        .maybeSingle()
        .then(({ data }) => {
          if (data?.config) {
            const loaded = data.config as HouseConfig;
            setConfig(resolvedPlot ? buildConfigFromSocietyPlot(resolvedPlot, loaded) : loaded);
            setSavedRef(data.ref_code);
          }
        });
    } else if (resolvedPlot) {
      setConfig((prev) => buildConfigFromSocietyPlot(resolvedPlot!, prev));
    }
  }, [searchParams]);

  // Automatically fallback if user switches to Single Story while viewing First Floor or Rooftop
  useEffect(() => {
    if (config.floors === 'single' && (viewMode === 'first-floor' || viewMode === 'rooftop')) {
      setViewMode('3d');
    } else if (config.floors === 'double' && viewMode === 'rooftop') {
      setViewMode('3d');
    }
  }, [config.floors, viewMode]);

  const estimate = useMemo(() => calculateHouseEstimate(config, DEFAULT_CONSTRUCTION_RATES), [config]);

  const triggerCamera = (preset: CameraPreset) => {
    setCameraPresetTrigger((prev) => ({ preset, seq: (prev?.seq || 0) + 1 }));
  };

  const handleSaveConfig = async () => {
    setSaving(true);
    setStatusBanner(null);
    const refCode = `RB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    try {
      const supabase = createClient();
      const { error } = await supabase.from('house_configurations').insert([
        {
          ref_code: refCode,
          plot_size: config.plotSize,
          floors: config.floors,
          style: config.style,
          config,
          estimated_area_sqft: estimate.totalCoveredAreaSqFt,
        },
      ]);

      if (error) {
        // Fallback: generate local shareable encoded state even if table isn't initialized yet
        setSavedRef(refCode);
        const url = `${window.location.origin}/build-your-house?config=${encodeConfigParam(config)}`;
        window.history.replaceState(null, '', url);
        setStatusBanner(`Configuration reference ${refCode} prepared and saved to URL.`);
      } else {
        setSavedRef(refCode);
        const url = `${window.location.origin}/build-your-house?ref=${refCode}`;
        window.history.replaceState(null, '', url);
        setStatusBanner(`Configuration saved! Shareable Reference: ${refCode}`);
      }
    } catch {
      setSavedRef(refCode);
      setStatusBanner(`Configuration reference ${refCode} ready.`);
    } finally {
      setSaving(false);
    }
  };

  const handleShareConfig = async () => {
    const shareUrl = savedRef
      ? `${window.location.origin}/build-your-house?ref=${savedRef}&config=${encodeConfigParam(config)}`
      : `${window.location.origin}/build-your-house?config=${encodeConfigParam(config)}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatusBanner('Shareable design link copied to clipboard!');
    } catch {
      setStatusBanner(`Copy your link: ${shareUrl}`);
    }
  };

  const handleReset = () => {
    setConfig(societyPlot ? buildConfigFromSocietyPlot(societyPlot, DEFAULT_HOUSE_CONFIG) : DEFAULT_HOUSE_CONFIG);
    setSavedRef(null);
    setStatusBanner('Reset to default house configuration.');
    triggerCamera('reset');
  };

  const handleExitSocietyMode = () => {
    setSocietyPlot(null);
    router.replace('/build-your-house');
  };

  const whatsappUrl = buildHouseQuoteWhatsAppUrl(config, estimate, savedRef || undefined, societyPlot);
  const hasFirstFloor = config.floors === 'double' || config.floors === 'double-rooftop';
  const hasRooftop = config.floors === 'double-rooftop';

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Top Society Context or Quick Mode Switcher */}
      {societyPlot ? (
        <div className="bg-[#3d4435] text-[#e8e4db] rounded-2xl px-4 sm:px-6 py-3.5 shadow-lg border border-[#9d783e]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#9d783e] text-white flex items-center justify-center shrink-0">
              <i className="fa-solid fa-location-dot text-sm"></i>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-serif text-white font-semibold">
                Designing on Society Plot {societyPlot.plotNumber} ({societyPlot.plotSizeLabel} • {societyPlot.width}×{societyPlot.depth} ft)
              </div>
              <div className="text-[11px] text-[#dfd2ba]">
                {societyPlot.block} • {societyPlot.street} • {PLOT_TYPE_LABELS[societyPlot.plotType]} • Facing {societyPlot.orientation}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/explore-society"
              className="bg-white/15 hover:bg-white/25 text-white text-xs font-medium px-3.5 py-1.5 rounded-xl transition-colors"
            >
              Switch Plot
            </Link>
            <button
              type="button"
              onClick={handleExitSocietyMode}
              className="text-xs text-[#dfd2ba] hover:text-white px-2.5 py-1.5"
            >
              Exit Plot Mode
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white/75 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-3 border border-[#dfd2ba]/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-xs text-gray-700 flex items-center gap-2">
            <i className="fa-solid fa-city text-[#9d783e]"></i>
            <span>Want to choose a specific plot location inside a residential community first?</span>
          </div>
          <Link
            href="/explore-society"
            className="inline-flex items-center gap-2 bg-[#3d4435] hover:bg-[#161f18] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors self-start sm:self-auto shrink-0"
          >
            <span>Explore 3D Society</span>
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </Link>
        </div>
      )}

      {/* Main Split Builder Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left: 3D Viewport / Floor Plan Canvas */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border-2 border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden relative">
            {/* Top Viewport Toolbar: View Mode + Lighting */}
            <div className="p-3 sm:p-4 bg-[#3d4435] text-[#e8e4db] flex flex-wrap items-center justify-between gap-2">
              {/* View Selector: 3D vs Floor Plans */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === '3d'
                      ? 'bg-[#e8e4db] text-[#161f18] font-semibold shadow-sm'
                      : 'bg-white/10 text-[#e8e4db] hover:bg-white/20'
                  }`}
                >
                  <i className="fa-solid fa-cube text-[11px]"></i>
                  <span>3D Exterior</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('ground-floor')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === 'ground-floor'
                      ? 'bg-[#e8e4db] text-[#161f18] font-semibold shadow-sm'
                      : 'bg-white/10 text-[#e8e4db] hover:bg-white/20'
                  }`}
                >
                  <i className="fa-solid fa-layer-group text-[11px]"></i>
                  <span>Ground Floor</span>
                </button>
                {hasFirstFloor && (
                  <button
                    type="button"
                    onClick={() => setViewMode('first-floor')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                      viewMode === 'first-floor'
                        ? 'bg-[#e8e4db] text-[#161f18] font-semibold shadow-sm'
                        : 'bg-white/10 text-[#e8e4db] hover:bg-white/20'
                    }`}
                  >
                    <i className="fa-solid fa-stairs text-[11px]"></i>
                    <span>First Floor</span>
                  </button>
                )}
                {hasRooftop && (
                  <button
                    type="button"
                    onClick={() => setViewMode('rooftop')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                      viewMode === 'rooftop'
                        ? 'bg-[#e8e4db] text-[#161f18] font-semibold shadow-sm'
                        : 'bg-white/10 text-[#e8e4db] hover:bg-white/20'
                    }`}
                  >
                    <i className="fa-solid fa-sun text-[11px]"></i>
                    <span>Rooftop</span>
                  </button>
                )}
              </div>

              {/* Lighting & Eco Mode Controls */}
              {viewMode === '3d' && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setLightingMode((m) => (m === 'daylight' ? 'golden-hour' : 'daylight'))
                    }
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium flex items-center gap-1.5 transition-colors"
                    title="Switch Lighting Mode"
                  >
                    <i
                      className={`fa-solid ${
                        lightingMode === 'daylight'
                          ? 'fa-sun text-amber-300'
                          : 'fa-cloud-sun text-orange-300'
                      }`}
                    ></i>
                    <span>{lightingMode === 'daylight' ? 'Daylight' : 'Golden Hour'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLowPowerMode((p) => !p)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-medium transition-colors ${
                      lowPowerMode
                        ? 'bg-emerald-500/30 text-emerald-100'
                        : 'bg-white/10 text-[#e8e4db]/80 hover:bg-white/20'
                    }`}
                    title="Toggle lighter rendering for mobile/battery performance"
                  >
                    {lowPowerMode ? 'Eco 3D' : 'HD 3D'}
                  </button>
                </div>
              )}
            </div>

            {/* Viewport Area */}
            <div className="relative">
              {viewMode === '3d' ? (
                <>
                  <HouseCanvas
                    config={config}
                    lightingMode={lightingMode}
                    cameraPresetTrigger={cameraPresetTrigger}
                    lowPowerMode={lowPowerMode}
                    societyPlot={societyPlot}
                  />

                  {/* Camera Preset Overlay Bar */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                    <div className="pointer-events-auto flex flex-wrap gap-1.5 bg-[#3d4435]/85 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 shadow-lg">
                      {(
                        [
                          { id: 'front', label: 'Front', icon: 'fa-house' },
                          { id: 'side', label: 'Side', icon: 'fa-arrows-left-right' },
                          { id: 'aerial', label: 'Aerial', icon: 'fa-helicopter' },
                          { id: 'reset', label: 'Reset', icon: 'fa-rotate' },
                        ] as Array<{ id: CameraPreset; label: string; icon: string }>
                      ).map((cam) => (
                        <button
                          key={cam.id}
                          type="button"
                          onClick={() => triggerCamera(cam.id)}
                          className="px-2.5 py-1 rounded-xl text-[11px] font-medium text-[#e8e4db] hover:bg-white/20 hover:text-white transition-colors flex items-center gap-1"
                        >
                          <i className={`fa-solid ${cam.icon} text-[10px] text-[#dfd2ba]`}></i>
                          <span>{cam.label}</span>
                        </button>
                      ))}
                    </div>

                    <span className="hidden sm:inline-flex items-center gap-1.5 bg-white/85 backdrop-blur-md text-[#161f18] text-[11px] font-medium px-3 py-1.5 rounded-full shadow-sm">
                      <i className="fa-solid fa-hand-pointer text-[#9d783e]"></i>
                      Drag to rotate • Scroll/Pinch to zoom
                    </span>
                  </div>
                </>
              ) : (
                <FloorPlanViewer config={config} level={viewMode} />
              )}
            </div>
          </div>

          {/* Desktop Estimate & Summary under viewport */}
          <div className="hidden lg:block">
            <EstimateSummary
              config={config}
              estimate={estimate}
              onChangeFinishing={(finishing: FinishingCategoryId) =>
                setConfig((prev) => ({ ...prev, finishing }))
              }
              onReset={handleReset}
              onSaveConfig={handleSaveConfig}
              onShareConfig={handleShareConfig}
              saving={saving}
              savedRef={savedRef}
              statusBanner={statusBanner}
              societyPlot={societyPlot}
            />
          </div>
        </div>

        {/* Right: Configuration Panel */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <ConfigurationControls
            config={config}
            onChange={setConfig}
            societyPlot={societyPlot}
            onExitSocietyPlot={handleExitSocietyMode}
          />

          {/* Mobile/Tablet Estimate & Summary */}
          <div className="lg:hidden">
            <EstimateSummary
              config={config}
              estimate={estimate}
              onChangeFinishing={(finishing: FinishingCategoryId) =>
                setConfig((prev) => ({ ...prev, finishing }))
              }
              onReset={handleReset}
              onSaveConfig={handleSaveConfig}
              onShareConfig={handleShareConfig}
              saving={saving}
              savedRef={savedRef}
              statusBanner={statusBanner}
              societyPlot={societyPlot}
            />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Quotation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#3d4435]/95 backdrop-blur-lg border-t border-white/15 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#dfd2ba] block">
            {PLOT_SPECS[config.plotSize].label} • Est. Area
          </span>
          <span className="text-sm font-serif font-semibold text-white">
            {estimate.totalCoveredAreaSqFt.toLocaleString()} sq. ft.
          </span>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shrink-0"
        >
          <i className="fa-brands fa-whatsapp text-sm"></i>
          <span>Request Quote</span>
        </a>
      </div>
    </div>
  );
}

