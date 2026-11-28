'use client';

import React, { useState } from 'react';
import { PLOT_SPECS } from '@/lib/house-builder/configurations';
import { PlotSizeId } from '@/lib/house-builder/types';
import {
  PLOT_TYPE_LABELS,
  SocietyLandmark,
  SocietyLayout,
  SocietyPlot,
  SocietyPlotType,
} from '@/lib/society/types';

interface SocietyNavigationPanelProps {
  layout: SocietyLayout;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sizeFilter: PlotSizeId | 'all';
  onSizeFilterChange: (v: PlotSizeId | 'all') => void;
  typeFilter: SocietyPlotType | 'all';
  onTypeFilterChange: (v: SocietyPlotType | 'all') => void;
  blockFilter: string;
  onBlockFilterChange: (v: string) => void;
  streetFilter: string;
  onStreetFilterChange: (v: string) => void;
  matchingPlots: SocietyPlot[];
  selectedPlotId: string | null;
  onFocusPlot: (plot: SocietyPlot) => void;
  onFocusLandmark: (lm: SocietyLandmark) => void;
  onClearFilters: () => void;
}

export default function SocietyNavigationPanel({
  layout,
  searchQuery,
  onSearchChange,
  sizeFilter,
  onSizeFilterChange,
  typeFilter,
  onTypeFilterChange,
  blockFilter,
  onBlockFilterChange,
  streetFilter,
  onStreetFilterChange,
  matchingPlots,
  selectedPlotId,
  onFocusPlot,
  onFocusLandmark,
  onClearFilters,
}: SocietyNavigationPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'plots' | 'landmarks'>('plots');

  const uniqueStreets = Array.from(new Set(layout.plots.map((p) => p.street)));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matchingPlots.length > 0) {
      onFocusPlot(matchingPlots[0]);
    }
  };

  return (
    <div className="bg-[#fcfaf5]/95 backdrop-blur-md rounded-3xl border border-[#dfd2ba]/80 shadow-xl overflow-hidden">
      {/* Header with Collapse Toggle */}
      <div className="p-4 sm:p-5 bg-[#3d4435] text-[#e8e4db] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#dfd2ba] block">
            {layout.isDemonstration ? 'Demonstration Society' : 'Master Plan'}
          </span>
          <h2 className="text-base sm:text-lg font-serif text-white leading-tight">
            {layout.name}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setIsCollapsed((c) => !c)}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs text-white transition-colors shrink-0"
          aria-label="Toggle Navigation Panel"
        >
          <i className={`fa-solid ${isCollapsed ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-4 sm:p-5 space-y-4">
          {/* Overview Stats */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white rounded-xl p-2 border border-[#dfd2ba]/50">
              <span className="text-sm font-serif font-bold text-[#161f18] block">
                {layout.plots.length}
              </span>
              <span className="text-[10px] text-gray-500">Plots</span>
            </div>
            <div className="bg-white rounded-xl p-2 border border-[#dfd2ba]/50">
              <span className="text-sm font-serif font-bold text-[#161f18] block">
                {layout.parks.length}
              </span>
              <span className="text-[10px] text-gray-500">Parks</span>
            </div>
            <div className="bg-white rounded-xl p-2 border border-[#dfd2ba]/50">
              <span className="text-sm font-serif font-bold text-[#161f18] block">
                {layout.landmarks.length}
              </span>
              <span className="text-[10px] text-gray-500">Landmarks</span>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search plot (e.g., A-101, B-201)..."
              className="w-full bg-white border border-[#dfd2ba]/80 rounded-xl pl-9 pr-16 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
            />
            {searchQuery && (
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#4a5240] text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg hover:bg-[#3d4435]"
              >
                Locate
              </button>
            )}
          </form>

          {/* Tabs: Plots vs Landmarks */}
          <div className="grid grid-cols-2 bg-[#efeae0] p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('plots')}
              className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'plots'
                  ? 'bg-white text-[#161f18] shadow-xs font-semibold'
                  : 'text-gray-600'
              }`}
            >
              Plots ({matchingPlots.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('landmarks')}
              className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'landmarks'
                  ? 'bg-white text-[#161f18] shadow-xs font-semibold'
                  : 'text-gray-600'
              }`}
            >
              Landmarks ({layout.landmarks.length})
            </button>
          </div>

          {activeTab === 'plots' ? (
            <>
              {/* Filters Grid */}
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={sizeFilter}
                  onChange={(e) => onSizeFilterChange(e.target.value as PlotSizeId | 'all')}
                  className="bg-white border border-[#dfd2ba]/70 rounded-xl px-2.5 py-2 text-[11px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#4a5240]"
                  aria-label="Filter by Plot Size"
                >
                  <option value="all">All Sizes</option>
                  {(Object.keys(PLOT_SPECS) as PlotSizeId[]).map((id) => (
                    <option key={id} value={id}>
                      {PLOT_SPECS[id].label}
                    </option>
                  ))}
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => onTypeFilterChange(e.target.value as SocietyPlotType | 'all')}
                  className="bg-white border border-[#dfd2ba]/70 rounded-xl px-2.5 py-2 text-[11px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#4a5240]"
                  aria-label="Filter by Plot Category"
                >
                  <option value="all">All Categories</option>
                  {(Object.keys(PLOT_TYPE_LABELS) as SocietyPlotType[]).map((pt) => (
                    <option key={pt} value={pt}>
                      {PLOT_TYPE_LABELS[pt]}
                    </option>
                  ))}
                </select>

                <select
                  value={blockFilter}
                  onChange={(e) => onBlockFilterChange(e.target.value)}
                  className="bg-white border border-[#dfd2ba]/70 rounded-xl px-2.5 py-2 text-[11px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#4a5240]"
                  aria-label="Filter by Block"
                >
                  <option value="all">All Blocks</option>
                  {layout.blocks.map((blk) => (
                    <option key={blk} value={blk}>
                      {blk}
                    </option>
                  ))}
                </select>

                <select
                  value={streetFilter}
                  onChange={(e) => onStreetFilterChange(e.target.value)}
                  className="bg-white border border-[#dfd2ba]/70 rounded-xl px-2.5 py-2 text-[11px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#4a5240]"
                  aria-label="Filter by Street"
                >
                  <option value="all">All Streets</option>
                  {uniqueStreets.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Matching Plots List */}
              <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
                {matchingPlots.length > 0 ? (
                  matchingPlots.map((plot) => {
                    const isSelected = plot.id === selectedPlotId;
                    return (
                      <button
                        key={plot.id}
                        type="button"
                        onClick={() => onFocusPlot(plot)}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-[#3d4435] text-white border-[#3d4435] shadow-sm'
                            : 'bg-white text-[#161f18] border-[#dfd2ba]/60 hover:border-[#9d783e]'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1.5">
                            <span>Plot {plot.plotNumber}</span>
                            <span
                              className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                                isSelected
                                  ? 'bg-white/20 text-[#dfd2ba]'
                                  : 'bg-[#f4efe4] text-[#9d783e]'
                              }`}
                            >
                              {plot.plotSizeLabel}
                            </span>
                          </div>
                          <div
                            className={`text-[10px] mt-0.5 ${
                              isSelected ? 'text-[#e8e4db]/80' : 'text-gray-500'
                            }`}
                          >
                            {plot.street} • {PLOT_TYPE_LABELS[plot.plotType]}
                          </div>
                        </div>
                        <i
                          className={`fa-solid fa-location-crosshairs text-xs ${
                            isSelected ? 'text-[#dfd2ba]' : 'text-gray-400'
                          }`}
                        ></i>
                      </button>
                    );
                  })
                ) : (
                  <div className="py-6 text-center bg-white/70 rounded-2xl border border-dashed border-gray-300 px-3">
                    <p className="text-xs text-gray-600 mb-2">
                      No plots match the selected search or filters.
                    </p>
                    <button
                      type="button"
                      onClick={onClearFilters}
                      className="text-[11px] font-semibold text-[#4a5240] hover:underline"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {layout.landmarks.map((lm) => (
                <button
                  key={lm.id}
                  type="button"
                  onClick={() => onFocusLandmark(lm)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#dfd2ba]/60 hover:border-[#9d783e] text-left flex items-center justify-between gap-2 transition-all"
                >
                  <div>
                    <div className="text-xs font-semibold text-[#161f18]">{lm.name}</div>
                    <div className="text-[10px] text-gray-500">{lm.subtitle}</div>
                  </div>
                  <i className="fa-solid fa-arrow-right text-[10px] text-[#9d783e]"></i>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

