'use client';

import React from 'react';
import { PLOT_TYPE_LABELS, SocietyPlot } from '@/lib/society/types';

interface PlotInformationPanelProps {
  plot: SocietyPlot;
  transitioning: boolean;
  onCustomizeHouse: (plot: SocietyPlot) => void;
  onDeselect: () => void;
}

export default function PlotInformationPanel({
  plot,
  transitioning,
  onCustomizeHouse,
  onDeselect,
}: PlotInformationPanelProps) {
  const roadSummary = plot.roadConnections
    .map((r) => `${r.roadWidth} ft (${r.side})`)
    .join(' + ');

  return (
    <div className="bg-[#fcfaf5]/95 backdrop-blur-md rounded-3xl border-2 border-[#9d783e]/50 shadow-[0_20px_50px_rgba(61,68,53,0.18)] p-5 sm:p-6 space-y-4">
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#dfd2ba]/70">
        <div>
          <span className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase bg-[#9d783e]/15 text-[#9d783e] px-2.5 py-0.5 rounded-full mb-1">
            {PLOT_TYPE_LABELS[plot.plotType]}
          </span>
          <h3 className="text-2xl font-serif text-[#161f18] font-semibold">
            Plot {plot.plotNumber}
          </h3>
          <p className="text-xs text-gray-500">
            {plot.block} • {plot.street}
          </p>
        </div>
        <button
          type="button"
          onClick={onDeselect}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-xs transition-colors shrink-0"
          aria-label="Close Plot Details"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      {/* Actual Configured Plot Metrics */}
      <div className="grid grid-cols-2 gap-2.5 text-xs">
        <div className="bg-white rounded-xl p-2.5 border border-[#dfd2ba]/60">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">
            Size
          </span>
          <span className="font-semibold text-[#161f18] text-sm">
            {plot.plotSizeLabel}
          </span>
          <span className="text-[11px] text-gray-500 block">
            {plot.width} × {plot.depth} ft
          </span>
        </div>

        <div className="bg-white rounded-xl p-2.5 border border-[#dfd2ba]/60">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">
            Facing
          </span>
          <span className="font-semibold text-[#161f18] text-sm">
            {plot.orientation}
          </span>
          <span className="text-[11px] text-gray-500 block">Primary Elevation</span>
        </div>
      </div>

      <div className="space-y-2 text-xs text-gray-700">
        <div className="flex justify-between items-center border-b border-gray-100 pb-1.5 gap-2">
          <span className="text-gray-500">Road Access:</span>
          <span className="font-medium text-[#161f18] text-right">{roadSummary}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 pb-1.5 gap-2">
          <span className="text-gray-500">Adjoining Streets:</span>
          <span className="font-medium text-[#161f18] text-right">
            {plot.roadConnections.map((r) => r.roadName).join(' & ')}
          </span>
        </div>
        <div className="flex justify-between items-center pb-1 gap-2">
          <span className="text-gray-500">Est. Building Footprint:</span>
          <span className="font-medium text-[#161f18]">
            {plot.buildingFootprint.width} × {plot.buildingFootprint.depth} ft
          </span>
        </div>
      </div>

      {plot.plotType === 'corner' && (
        <div className="bg-[#9d783e]/10 border border-[#9d783e]/30 rounded-xl p-2.5 text-[11px] text-[#6d5226] flex items-start gap-2">
          <i className="fa-solid fa-road mt-0.5 text-[#9d783e]"></i>
          <span>
            Corner plot with dual street frontage. HouseCraft will preserve both road-facing elevations and corner setbacks.
          </span>
        </div>
      )}

      {/* Primary Integration CTA */}
      <button
        type="button"
        disabled={transitioning}
        onClick={() => onCustomizeHouse(plot)}
        className="w-full bg-[#4a5240] hover:bg-[#3d4435] text-white font-semibold py-3.5 px-5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-75"
      >
        {transitioning ? (
          <>
            <i className="fa-solid fa-circle-notch fa-spin"></i>
            <span>Opening HouseCraft for Plot {plot.plotNumber}...</span>
          </>
        ) : (
          <>
            <i className="fa-solid fa-compass-drafting"></i>
            <span>Customize Your House</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </>
        )}
      </button>
    </div>
  );
}

