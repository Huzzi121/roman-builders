'use client';

import React, { useState } from 'react';
import {
  AMENITIES_META,
  ARCH_STYLES,
  CLADDING_OPTIONS,
  FLOOR_OPTIONS,
  isAmenityAllowed,
  PLOT_SPECS,
  sanitizeConfigForPlot,
  WALL_FINISHES,
  WINDOW_STYLES,
} from '@/lib/house-builder/configurations';
import { CONFIGURATION_PRESETS } from '@/lib/house-builder/presets';
import {
  AmenitiesState,
  ArchStyleId,
  CladdingId,
  FloorConfigId,
  HouseConfig,
  PlotSizeId,
  WallFinishId,
  WindowStyleId,
} from '@/lib/house-builder/types';

interface ConfigurationControlsProps {
  config: HouseConfig;
  onChange: (next: HouseConfig) => void;
}

type PanelTab = 'structure' | 'exterior' | 'amenities';

export default function ConfigurationControls({
  config,
  onChange,
}: ConfigurationControlsProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>('structure');

  const handlePlotChange = (plotSize: PlotSizeId) => {
    onChange(sanitizeConfigForPlot(config, plotSize));
  };

  const handleFloorChange = (floors: FloorConfigId) => {
    onChange({ ...config, floors });
  };

  const handleStyleChange = (style: ArchStyleId) => {
    onChange({ ...config, style });
  };

  const handleWallChange = (wallFinish: WallFinishId) => {
    onChange({ ...config, wallFinish });
  };

  const handleCladdingChange = (cladding: CladdingId) => {
    onChange({ ...config, cladding });
  };

  const handleWindowChange = (windowStyle: WindowStyleId) => {
    onChange({ ...config, windowStyle });
  };

  const handleAmenityToggle = (key: keyof AmenitiesState) => {
    if (!isAmenityAllowed(key, config.plotSize)) return;
    onChange({
      ...config,
      amenities: {
        ...config.amenities,
        [key]: !config.amenities[key],
      },
    });
  };

  const hasFirstFloor = config.floors === 'double' || config.floors === 'double-rooftop';

  return (
    <div className="bg-[#fcfaf5]/95 backdrop-blur-md rounded-3xl border border-[#dfd2ba]/80 shadow-[0_15px_45px_rgba(61,68,53,0.08)] overflow-hidden flex flex-col">
      {/* Quick Presets Bar */}
      <div className="p-4 sm:p-5 bg-[#f4efe4]/80 border-b border-[#dfd2ba]/60">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9d783e] block mb-2.5">
          Quick Starting Presets
        </span>
        <div className="grid grid-cols-2 gap-2">
          {CONFIGURATION_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange(preset.config)}
              className="text-left p-2.5 rounded-xl bg-white hover:bg-[#3d4435] hover:text-white border border-[#dfd2ba]/70 transition-all group"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-semibold leading-tight line-clamp-1">
                  {preset.title}
                </span>
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#4a5240]/10 text-[#4a5240] group-hover:bg-white/20 group-hover:text-white shrink-0">
                  {preset.badge}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Section Tabs */}
      <div className="grid grid-cols-3 border-b border-[#dfd2ba]/60 bg-white/60">
        {(
          [
            { id: 'structure', label: 'Plot & Style', icon: 'fa-compass-drafting' },
            { id: 'exterior', label: 'Materials', icon: 'fa-palette' },
            { id: 'amenities', label: 'Amenities', icon: 'fa-tree' },
          ] as Array<{ id: PanelTab; label: string; icon: string }>
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`py-3.5 px-2 text-xs sm:text-[13px] font-medium flex items-center justify-center gap-2 transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-[#4a5240] text-[#161f18] bg-white font-semibold'
                : 'border-transparent text-gray-500 hover:text-[#161f18]'
            }`}
          >
            <i className={`fa-solid ${tab.icon} text-xs text-[#9d783e]`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Body */}
      <div className="p-5 sm:p-6 space-y-6">
        {activeTab === 'structure' && (
          <>
            {/* Plot Size */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2.5">
                1. Residential Plot Size
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {(Object.keys(PLOT_SPECS) as PlotSizeId[]).map((plotId) => {
                  const spec = PLOT_SPECS[plotId];
                  const active = config.plotSize === plotId;
                  return (
                    <button
                      key={plotId}
                      type="button"
                      onClick={() => handlePlotChange(plotId)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        active
                          ? 'bg-[#3d4435] text-white border-[#3d4435] shadow-md'
                          : 'bg-white text-[#161f18] border-[#dfd2ba]/70 hover:border-[#4a5240]'
                      }`}
                    >
                      <div className="text-sm font-serif font-semibold">{spec.label}</div>
                      <div className={`text-[11px] ${active ? 'text-[#dfd2ba]' : 'text-gray-500'}`}>
                        {spec.dimensionsLabel}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Floors */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2.5">
                2. Floor Configuration
              </label>
              <div className="space-y-2">
                {FLOOR_OPTIONS.map((opt) => {
                  const active = config.floors === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleFloorChange(opt.id)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                        active
                          ? 'bg-[#3d4435] text-white border-[#3d4435] shadow-md'
                          : 'bg-white text-[#161f18] border-[#dfd2ba]/70 hover:border-[#4a5240]'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold">{opt.label}</div>
                        <div className={`text-[11px] ${active ? 'text-[#dfd2ba]' : 'text-gray-500'}`}>
                          {opt.shortLabel}
                        </div>
                      </div>
                      <i
                        className={`fa-solid ${
                          active ? 'fa-circle-check text-[#dfd2ba]' : 'fa-circle text-gray-200'
                        }`}
                      ></i>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Architectural Style */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2.5">
                3. Architectural Style
              </label>
              <div className="space-y-2.5">
                {ARCH_STYLES.map((style) => {
                  const active = config.style === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => handleStyleChange(style.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                        active
                          ? 'bg-[#3d4435] text-white border-[#3d4435] shadow-md'
                          : 'bg-white text-[#161f18] border-[#dfd2ba]/70 hover:border-[#4a5240]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-serif font-semibold">{style.label}</span>
                        {active && (
                          <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] mt-1 ${active ? 'text-[#e8e4db]/85' : 'text-gray-500'}`}>
                        {style.tagline}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {activeTab === 'exterior' && (
          <>
            {/* Wall Finish */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2.5">
                Exterior Wall Paint / Finish
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {WALL_FINISHES.map((w) => {
                  const active = config.wallFinish === w.id;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => handleWallChange(w.id)}
                      className={`p-2.5 rounded-xl border flex items-center gap-3 transition-all text-left ${
                        active
                          ? 'border-[#3d4435] bg-[#3d4435]/10 ring-1 ring-[#3d4435]'
                          : 'border-[#dfd2ba]/70 bg-white hover:border-[#4a5240]'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-full border border-gray-300 shrink-0 shadow-xs"
                        style={{ backgroundColor: w.hex }}
                      ></span>
                      <span className="text-xs font-medium text-[#161f18]">{w.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accent Cladding */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2.5">
                Accent Facade Cladding
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {CLADDING_OPTIONS.map((c) => {
                  const active = config.cladding === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleCladdingChange(c.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        active
                          ? 'bg-[#3d4435] text-white border-[#3d4435] shadow-md'
                          : 'bg-white text-[#161f18] border-[#dfd2ba]/70 hover:border-[#4a5240]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-4 h-4 rounded-full border border-white/40 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        ></span>
                        <span className="text-xs font-semibold">{c.label}</span>
                      </div>
                      <p className={`text-[10px] ${active ? 'text-[#dfd2ba]' : 'text-gray-500'}`}>
                        {c.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Window Style */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2.5">
                Window & Glazing Style
              </label>
              <div className="space-y-2">
                {WINDOW_STYLES.map((win) => {
                  const active = config.windowStyle === win.id;
                  return (
                    <button
                      key={win.id}
                      type="button"
                      onClick={() => handleWindowChange(win.id)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                        active
                          ? 'bg-[#3d4435] text-white border-[#3d4435] shadow-sm'
                          : 'bg-white text-[#161f18] border-[#dfd2ba]/70 hover:border-[#4a5240]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-6 h-6 rounded border-2 shrink-0"
                          style={{
                            backgroundColor: win.glassHex,
                            borderColor: win.frameHex,
                          }}
                        ></span>
                        <span className="text-xs font-medium">{win.label}</span>
                      </div>
                      {active && <i className="fa-solid fa-check text-xs text-[#dfd2ba]"></i>}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {activeTab === 'amenities' && (
          <div className="space-y-2.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
              Toggle Architectural Features & Amenities
            </label>
            {AMENITIES_META.map((item) => {
              const allowed = isAmenityAllowed(item.key, config.plotSize);
              const enabled = config.amenities[item.key];
              const isBalconyNote = item.key === 'balconyRailing' && !hasFirstFloor;

              return (
                <button
                  key={item.key}
                  type="button"
                  disabled={!allowed}
                  onClick={() => handleAmenityToggle(item.key)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all ${
                    !allowed
                      ? 'bg-gray-100/80 border-gray-200 opacity-55 cursor-not-allowed'
                      : enabled
                      ? 'bg-[#3d4435]/10 border-[#3d4435] text-[#161f18]'
                      : 'bg-white border-[#dfd2ba]/70 text-[#161f18] hover:border-[#4a5240]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                        enabled && allowed
                          ? 'bg-[#3d4435] text-white'
                          : 'bg-[#f4efe4] text-[#9d783e]'
                      }`}
                    >
                      <i className={`fa-solid ${item.icon}`}></i>
                    </div>
                    <div>
                      <div className="text-xs font-semibold leading-tight">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5">
                        {!allowed
                          ? item.key === 'swimmingPool'
                            ? 'Available on 10 Marla & 1 Kanal plots'
                            : 'Available on 7 Marla, 10 Marla & 1 Kanal'
                          : isBalconyNote
                          ? 'Applies to Double Story or Rooftop configurations'
                          : item.description}
                      </div>
                    </div>
                  </div>

                  {/* Toggle Pill */}
                  <div
                    className={`w-10 h-5.5 rounded-full transition-colors p-0.5 shrink-0 ${
                      enabled && allowed ? 'bg-[#4a5240]' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4.5 h-4.5 rounded-full bg-white shadow transition-transform ${
                        enabled && allowed ? 'translate-x-4.5' : 'translate-x-0'
                      }`}
                    ></div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

