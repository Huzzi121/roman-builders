'use client';

import React from 'react';
import Link from 'next/link';
import {
  AMENITIES_META,
  ARCH_STYLES,
  CLADDING_OPTIONS,
  FINISHING_LABELS,
  FLOOR_OPTIONS,
  PLOT_SPECS,
  WALL_FINISHES,
  WINDOW_STYLES,
} from '@/lib/house-builder/configurations';
import {
  buildHouseQuoteWhatsAppUrl,
  formatConfigurationSummary,
} from '@/lib/house-builder/estimates';
import { FinishingCategoryId, HouseConfig, HouseEstimate } from '@/lib/house-builder/types';
import { PLOT_TYPE_LABELS, SocietyPlot } from '@/lib/society/types';

interface EstimateSummaryProps {
  config: HouseConfig;
  estimate: HouseEstimate;
  onChangeFinishing: (finishing: FinishingCategoryId) => void;
  onReset: () => void;
  onSaveConfig: () => void;
  onShareConfig: () => void;
  saving: boolean;
  savedRef: string | null;
  statusBanner: string | null;
  societyPlot?: SocietyPlot | null;
}

export default function EstimateSummary({
  config,
  estimate,
  onChangeFinishing,
  onReset,
  onSaveConfig,
  onShareConfig,
  saving,
  savedRef,
  statusBanner,
  societyPlot,
}: EstimateSummaryProps) {
  const plot = PLOT_SPECS[config.plotSize];
  const floor = FLOOR_OPTIONS.find((f) => f.id === config.floors);
  const style = ARCH_STYLES.find((s) => s.id === config.style);
  const wall = WALL_FINISHES.find((w) => w.id === config.wallFinish);
  const cladding = CLADDING_OPTIONS.find((c) => c.id === config.cladding);
  const win = WINDOW_STYLES.find((w) => w.id === config.windowStyle);

  const selectedAmenities = AMENITIES_META.filter((a) => config.amenities[a.key]);
  const whatsappUrl = buildHouseQuoteWhatsAppUrl(config, estimate, savedRef || undefined, societyPlot);
  const contactSummary = formatConfigurationSummary(config, estimate, savedRef || undefined, societyPlot);
  const contactHref = `/contact?interest=${encodeURIComponent(
    'Custom 3D House Design'
  )}&message=${encodeURIComponent(
    `Assalamualaikum, I designed a house on your 3D House Builder and would like to book a consultation:\n\n${contactSummary}`
  )}`;

  return (
    <div className="space-y-6">
      {/* House Specifications Card */}
      <div className="bg-[#fcfaf5]/95 backdrop-blur-md rounded-3xl border border-[#dfd2ba]/80 p-6 sm:p-7 shadow-[0_15px_40px_rgba(61,68,53,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-3 border-b border-[#dfd2ba]/60">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9d783e]">
              Live Specifications
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-[#161f18]">
              Your House Blueprint Summary
            </h3>
          </div>
          {savedRef && (
            <span className="text-[11px] font-mono bg-[#4a5240]/10 text-[#3d4435] px-3 py-1 rounded-full font-semibold">
              Ref: {savedRef}
            </span>
          )}
        </div>

        {/* Key Area & Room Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-3.5 border border-[#dfd2ba]/50">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block">
              Plot Area
            </span>
            <span className="text-base sm:text-lg font-serif text-[#161f18] font-semibold">
              {plot.label}
            </span>
            <span className="text-[11px] text-gray-500 block">{plot.dimensionsLabel}</span>
          </div>
          <div className="bg-white rounded-2xl p-3.5 border border-[#dfd2ba]/50">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block">
              Est. Covered Area
            </span>
            <span className="text-base sm:text-lg font-serif text-[#161f18] font-semibold">
              {estimate.totalCoveredAreaSqFt.toLocaleString()}
            </span>
            <span className="text-[11px] text-gray-500 block">sq. ft.</span>
          </div>
          <div className="bg-white rounded-2xl p-3.5 border border-[#dfd2ba]/50">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block">
              Suggested Beds
            </span>
            <span className="text-base sm:text-lg font-serif text-[#161f18] font-semibold">
              {estimate.suggestedBedrooms} Bedrooms
            </span>
            <span className="text-[11px] text-gray-500 block">Indicative</span>
          </div>
          <div className="bg-white rounded-2xl p-3.5 border border-[#dfd2ba]/50">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block">
              Suggested Baths
            </span>
            <span className="text-base sm:text-lg font-serif text-[#161f18] font-semibold">
              {estimate.suggestedBathrooms} Bathrooms
            </span>
            <span className="text-[11px] text-gray-500 block">Indicative</span>
          </div>
        </div>

        {/* Spec Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-xs sm:text-sm text-gray-700 mb-5">
          {societyPlot && (
            <>
              <div className="flex justify-between border-b border-gray-100 pb-1.5">
                <span className="text-gray-500">Society Plot:</span>
                <span className="font-semibold text-[#9d783e]">
                  Plot {societyPlot.plotNumber} ({societyPlot.block})
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-1.5">
                <span className="text-gray-500">Street & Facing:</span>
                <span className="font-medium text-[#161f18]">
                  {societyPlot.street} • {societyPlot.orientation}
                </span>
              </div>
            </>
          )}
          <div className="flex justify-between border-b border-gray-100 pb-1.5">
            <span className="text-gray-500">Plot Type:</span>
            <span className="font-medium text-[#161f18]">
              {societyPlot
                ? PLOT_TYPE_LABELS[societyPlot.plotType]
                : config.isCornerPlot
                ? 'Corner Plot (2-Side Open)'
                : 'Standard Plot'}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-1.5">
            <span className="text-gray-500">Floors:</span>
            <span className="font-medium text-[#161f18]">{floor?.label}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-1.5">
            <span className="text-gray-500">Style:</span>
            <span className="font-medium text-[#161f18]">{style?.label}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-1.5">
            <span className="text-gray-500">Exterior Finish:</span>
            <span className="font-medium text-[#161f18]">{wall?.label}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-1.5">
            <span className="text-gray-500">Accent Cladding:</span>
            <span className="font-medium text-[#161f18]">{cladding?.label}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-1.5 sm:col-span-2">
            <span className="text-gray-500">Window Style:</span>
            <span className="font-medium text-[#161f18]">{win?.label}</span>
          </div>
        </div>

        {/* Selected Amenities Pills */}
        <div>
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-500 block mb-2">
            Selected Amenities ({selectedAmenities.length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {selectedAmenities.length > 0 ? (
              selectedAmenities.map((a) => (
                <span
                  key={a.key}
                  className="inline-flex items-center gap-1.5 bg-white border border-[#dfd2ba] text-[#161f18] text-[11px] font-medium px-2.5 py-1 rounded-full"
                >
                  <i className={`fa-solid ${a.icon} text-[#9d783e] text-[10px]`}></i>
                  <span>{a.label}</span>
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400">No optional amenities selected</span>
            )}
          </div>
        </div>
      </div>

      {/* Quotation & Design Actions Card */}
      <div className="bg-[#3d4435] text-[#e8e4db] rounded-3xl p-6 sm:p-7 shadow-xl border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#dfd2ba]">
              Ready to Build
            </span>
            <h4 className="text-xl sm:text-2xl font-serif text-white mt-1">
              Request Your Formal Quotation
            </h4>
          </div>

          {/* Finishing Category Selector */}
          <div className="flex bg-black/25 p-1 rounded-xl border border-white/10 self-start">
            {(['basic', 'premium', 'luxury'] as FinishingCategoryId[]).map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => onChangeFinishing(tier)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  config.finishing === tier
                    ? 'bg-[#e8e4db] text-[#161f18] shadow-sm font-semibold'
                    : 'text-[#e8e4db]/80 hover:text-white'
                }`}
              >
                {FINISHING_LABELS[tier].label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-[#dfd2ba]/90 mb-5">
          <strong className="text-white">{FINISHING_LABELS[config.finishing].label} Finishing:</strong>{' '}
          {FINISHING_LABELS[config.finishing].tagline}
        </p>

        {/* Primary Lead Capture Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#25D366] hover:bg-[#20bd5b] text-white font-semibold py-3.5 px-5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <i className="fa-brands fa-whatsapp text-lg"></i>
            <span>Request Quote on WhatsApp</span>
          </a>

          <Link
            href={contactHref}
            className="flex-1 bg-[#e8e4db] hover:bg-white text-[#161f18] font-semibold py-3.5 px-5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <i className="fa-regular fa-calendar-check"></i>
            <span>Book a Consultation</span>
          </Link>
        </div>

        {/* Utility Row: Save, Share, Print, Reset */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-4 border-t border-white/10 text-xs">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onSaveConfig}
              disabled={saving}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 disabled:opacity-60"
            >
              <i className={`fa-solid ${saving ? 'fa-spinner fa-spin' : 'fa-bookmark'}`}></i>
              <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
            </button>
            <button
              type="button"
              onClick={onShareConfig}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5"
            >
              <i className="fa-solid fa-share-nodes"></i>
              <span>Share Link</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5"
            >
              <i className="fa-solid fa-print"></i>
              <span>Print Summary</span>
            </button>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="px-3 py-1.5 rounded-lg text-[#dfd2ba] hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
          >
            <i className="fa-solid fa-rotate-left"></i>
            <span>Reset</span>
          </button>
        </div>

        {statusBanner && (
          <div className="mt-3 text-xs bg-white/15 text-white px-3.5 py-2 rounded-xl border border-white/20">
            {statusBanner}
          </div>
        )}
      </div>
    </div>
  );
}

