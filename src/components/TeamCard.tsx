import React from "react";
import { TeamMember } from "@/data/team";

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="w-full max-w-5xl mx-auto bg-[#fcfaf5]/92 backdrop-blur-md rounded-3xl border border-[#dfd2ba]/80 shadow-[0_15px_45px_rgba(157,120,62,0.09)] hover:shadow-[0_22px_55px_rgba(157,120,62,0.18)] transition-all duration-500 overflow-hidden flex flex-col md:flex-row group">
      
      {/* Left Column: Portrait Photo */}
      <div className="w-full md:w-[38%] lg:w-[35%] shrink-0 relative min-h-[360px] md:min-h-[460px] bg-white overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
        />
      </div>

      {/* Right Column: Information & Bio */}
      <div className="w-full md:w-[62%] lg:w-[65%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative bg-gradient-to-br from-white/40 via-transparent to-[#dfd2ba]/10">
        
        {/* Subtle Decorative Architectural Rosette */}
        <div className="text-[#9d783e]/30 mb-2">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <rect x="3" y="3" width="18" height="18" rx="2" transform="rotate(45 12 12)" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>

        <div>
          {/* Role / Tag */}
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#9d783e] block mb-1">
            {member.tag || member.role}
          </span>

          {/* Person Name */}
          <h3 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-serif text-[#161f18] font-semibold tracking-tight leading-tight mb-3">
            {member.name}
          </h3>

          {/* Detailed Bio Description */}
          <p className="text-gray-700 text-xs sm:text-[13.5px] leading-relaxed text-justify mb-5 font-normal">
            {member.description}
          </p>

          {/* Key Bullet Points Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9d783e] mb-3">
              <span className="text-[10px]">◆</span>
              <span>{member.bulletsHeader || "Leadership & Focus"}</span>
            </div>

            <div className="space-y-2.5">
              {member.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start sm:items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-white border border-[#dfd2ba] flex items-center justify-center text-[#9d783e] text-xs shrink-0 shadow-2xs mt-0.5 sm:mt-0">
                    <i className={`fa-solid ${bullet.icon}`}></i>
                  </div>
                  <span className="text-xs sm:text-[13px] text-gray-700 font-medium leading-snug">
                    {bullet.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Contact Email Badge */}
        <div className="pt-2">
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full border border-[#dfd2ba] bg-white/90 hover:bg-white text-xs sm:text-[13px] text-gray-800 font-medium hover:border-[#9d783e] hover:text-[#9d783e] transition-all shadow-sm"
          >
            <i className="fa-regular fa-envelope text-[#9d783e]"></i>
            <span>{member.email}</span>
          </a>
        </div>

      </div>
    </div>
  );
}

