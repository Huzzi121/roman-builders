import React from "react";
import { TeamMember } from "@/data/team";

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  const isFounders = member.category === "founders";

  return (
    <div
      className={`w-full ${
        isFounders ? "max-w-4xl" : "max-w-5xl"
      } mx-auto bg-[#fcfaf5]/92 backdrop-blur-md rounded-3xl border border-[#dfd2ba]/80 shadow-[0_15px_45px_rgba(157,120,62,0.09)] hover:shadow-[0_22px_55px_rgba(157,120,62,0.18)] transition-all duration-500 overflow-hidden flex flex-col md:flex-row group`}
    >
      {/* Left Column: Portrait Photo */}
      <div
        className={`w-full ${
          isFounders
            ? "md:w-[34%] lg:w-[32%] min-h-[280px] md:min-h-[350px] lg:min-h-[380px]"
            : "md:w-[38%] lg:w-[35%] min-h-[360px] md:min-h-[460px]"
        } shrink-0 relative bg-white overflow-hidden`}
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
        />
      </div>

      {/* Right Column: Information & Bio */}
      <div
        className={`w-full ${
          isFounders
            ? "md:w-[66%] lg:w-[68%] p-4 sm:p-5 lg:p-6"
            : "md:w-[62%] lg:w-[65%] p-6 sm:p-8 lg:p-10"
        } flex flex-col justify-between relative bg-gradient-to-br from-white/40 via-transparent to-[#dfd2ba]/10`}
      >
        {/* Subtle Decorative Architectural Rosette */}
        <div className={`text-[#9d783e]/30 ${isFounders ? "mb-1" : "mb-2"}`}>
          <svg
            className={isFounders ? "w-5 h-5" : "w-6 h-6"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" transform="rotate(45 12 12)" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>

        <div>
          {/* Role / Tag */}
          <span
            className={`${
              isFounders ? "text-[10px] sm:text-[11px] mb-0.5" : "text-[11px] sm:text-xs mb-1"
            } font-bold tracking-[0.2em] uppercase text-[#9d783e] block`}
          >
            {member.tag || member.role}
          </span>

          {/* Person Name */}
          <h3
            className={`${
              isFounders
                ? "text-xl sm:text-2xl lg:text-[1.8rem] mb-2"
                : "text-2xl sm:text-3xl lg:text-[2.2rem] mb-3"
            } font-serif text-[#161f18] font-semibold tracking-tight leading-tight`}
          >
            {member.name}
          </h3>

          {/* Detailed Bio Description */}
          <p
            className={`text-gray-700 ${
              isFounders
                ? "text-xs sm:text-[12.5px] leading-normal mb-3"
                : "text-xs sm:text-[13.5px] leading-relaxed mb-5"
            } text-justify font-normal`}
          >
            {member.description}
          </p>

          {/* Key Bullet Points Section */}
          <div className={isFounders ? "mb-3.5" : "mb-6"}>
            <div
              className={`flex items-center gap-2 ${
                isFounders ? "text-[11px] mb-2" : "text-xs mb-3"
              } font-bold uppercase tracking-wider text-[#9d783e]`}
            >
              <span className="text-[9px]">◆</span>
              <span>{member.bulletsHeader || "Leadership & Focus"}</span>
            </div>

            <div className={isFounders ? "space-y-1.5" : "space-y-2.5"}>
              {member.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                  <div
                    className={`${
                      isFounders ? "w-5 h-5 sm:w-6 sm:h-6 text-[10px]" : "w-7 h-7 text-xs"
                    } rounded-full bg-white border border-[#dfd2ba] flex items-center justify-center text-[#9d783e] shrink-0 shadow-2xs mt-0.5 sm:mt-0`}
                  >
                    <i className={`fa-solid ${bullet.icon}`}></i>
                  </div>
                  <span
                    className={`${
                      isFounders
                        ? "text-[11px] sm:text-xs leading-tight"
                        : "text-xs sm:text-[13px] leading-snug"
                    } text-gray-700 font-medium`}
                  >
                    {bullet.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Contact Email Badge */}
        <div className={isFounders ? "pt-1" : "pt-2"}>
          <a
            href={`mailto:${member.email}`}
            className={`inline-flex items-center gap-2 ${
              isFounders ? "px-3.5 py-1.5 text-xs" : "px-4 sm:px-5 py-2 text-xs sm:text-[13px]"
            } rounded-full border border-[#dfd2ba] bg-white/90 hover:bg-white text-gray-800 font-medium hover:border-[#9d783e] hover:text-[#9d783e] transition-all shadow-sm`}
          >
            <i className="fa-regular fa-envelope text-[#9d783e]"></i>
            <span>{member.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

