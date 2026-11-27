'use client';

import React from 'react';
import { getIllustrativeFloorPlan, FloorPlanRoom } from '@/lib/house-builder/floor-plans';
import { HouseConfig } from '@/lib/house-builder/types';

interface FloorPlanViewerProps {
  config: HouseConfig;
  level: 'ground-floor' | 'first-floor' | 'rooftop';
}

const TONE_CLASSES: Record<FloorPlanRoom['tone'], string> = {
  living: 'bg-[#ebe6d9] border-[#9d783e]/40 text-[#161f18]',
  bedroom: 'bg-[#f8f6f0] border-[#4a5240]/35 text-[#161f18]',
  bath: 'bg-[#e3eceb] border-[#3d4435]/30 text-[#161f18]',
  kitchen: 'bg-[#f3e8d8] border-[#9d783e]/45 text-[#161f18]',
  circulation: 'bg-[#e5e7eb] border-gray-400/50 text-gray-800',
  outdoor: 'bg-[#dde8d5] border-[#4a5240]/40 text-[#283321]',
  garage: 'bg-[#e4e1d8] border-[#3d4435]/40 text-[#161f18]',
};

export default function FloorPlanViewer({ config, level }: FloorPlanViewerProps) {
  const plan = getIllustrativeFloorPlan(config, level);

  return (
    <div className="w-full h-full min-h-[420px] sm:min-h-[500px] lg:min-h-[580px] bg-[#fcfaf5] p-5 sm:p-8 flex flex-col justify-between">
      {/* Plan Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#dfd2ba]/60">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9d783e]">
            Illustrative Schematic Layout
          </span>
          <h3 className="text-xl sm:text-2xl font-serif text-[#161f18]">{plan.levelTitle}</h3>
          <p className="text-xs text-gray-500">{plan.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-medium text-[#4a5240] bg-[#4a5240]/10 px-3 py-1.5 rounded-full self-start">
          <i className="fa-solid fa-compass"></i>
          <span>Front Faces Bottom</span>
        </div>
      </div>

      {/* Architectural Grid Canvas */}
      <div
        className="relative w-full flex-grow min-h-[320px] sm:min-h-[360px] rounded-2xl border-2 border-[#3d4435]/30 bg-white overflow-hidden shadow-inner"
        style={{
          backgroundImage:
            'radial-gradient(rgba(74,82,64,0.12) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      >
        {plan.rooms.map((room) => (
          <div
            key={room.id}
            style={{
              left: `${room.x}%`,
              top: `${room.y}%`,
              width: `${room.w}%`,
              height: `${room.h}%`,
            }}
            className={`absolute border rounded-lg p-1.5 sm:p-2 flex flex-col items-center justify-center text-center transition-all ${TONE_CLASSES[room.tone]}`}
          >
            <span className="text-[10px] sm:text-xs font-semibold leading-tight">
              {room.label}
            </span>
            <span className="text-[9px] sm:text-[10px] opacity-75 mt-0.5">
              {room.sizeText}
            </span>
          </div>
        ))}
      </div>

      {/* Illustrative Disclaimer */}
      <p className="text-[11px] text-gray-500 mt-4 flex items-center gap-2">
        <i className="fa-solid fa-circle-info text-[#9d783e]"></i>
        <span>
          Illustrative spatial concept only — not an approved architectural or structural drawing. Final room sizes are tailored during detailed CAD design.
        </span>
      </p>
    </div>
  );
}

