"use client";

import { useSearchParams } from "next/navigation";
import {
  founders,
  advisoryMember,
  engineeringMember,
  softwareEngineers,
} from "@/data/team";
import TeamCard from "@/components/TeamCard";

export default function TeamContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  // Determine active category from query params
  const activeCategory = (categoryParam && ["founders", "advisory", "engineers", "software", "all"].includes(categoryParam))
    ? categoryParam
    : "all";

  // Filter flags
  const showFounders = activeCategory === "all" || activeCategory === "founders";
  const showAdvisory = activeCategory === "all" || activeCategory === "advisory";
  const showEngineers = activeCategory === "all" || activeCategory === "engineers";
  const showSoftware = activeCategory === "all" || activeCategory === "software";

  // Category heading info
  const getCategoryTitle = () => {
    switch (activeCategory) {
      case "founders":
        return {
          title: "The Founders",
          subtitle: "The Visionaries Behind Roman Builders & Developers",
          tag: "OUR FOUNDERS"
        };
      case "advisory":
        return {
          title: "Advisory, Compliance & Financial Management",
          subtitle: "Ensuring rigorous institutional governance, statutory compliance, and strategic fiscal discipline.",
          tag: "ADVISORY & COMPLIANCE"
        };
      case "engineers":
        return {
          title: "Engineers and Development",
          subtitle: "Translating architectural master plans into solid, enduring ground realities.",
          tag: "ENGINEERS & DEVELOPMENT"
        };
      case "software":
        return {
          title: "Software Developers and Engineers",
          subtitle: "Architecting modern digital infrastructure, scalable systems, and intelligent experiences.",
          tag: "SOFTWARE DEVELOPERS & ENGINEERS"
        };
      default:
        return {
          title: "Our Team",
          subtitle: "The visionary leaders, strategic advisors, engineers, and digital innovators shaping our communities.",
          tag: "OUR TEAM"
        };
    }
  };

  const catInfo = getCategoryTitle();

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Category Hero Header */}
      <div className="text-center mb-12 sm:mb-16 relative">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-px bg-[#4a5240]/30 w-12"></div>
          <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">
            {catInfo.tag}
          </span>
          <div className="h-px bg-[#4a5240]/30 w-12"></div>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif text-[#1a1c19] mb-3 tracking-tight">
          {catInfo.title}
        </h1>
        <p className="text-gray-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {catInfo.subtitle}
        </p>
      </div>

      {/* Cards Area - Pure Cards in Layout from Reference Image */}
      <div className="space-y-16 sm:space-y-20">
        
        {/* Founders Category */}
        {showFounders && (
          <div className="space-y-10 sm:space-y-12">
            {activeCategory === "all" && (
              <div className="text-center mb-6">
                <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">Founders</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1a1c19] mt-1">Our Founders</h2>
              </div>
            )}
            {founders.map((m) => (
              <TeamCard key={m.id} member={m} />
            ))}
          </div>
        )}

        {/* Advisory Category */}
        {showAdvisory && (
          <div className="space-y-10 sm:space-y-12">
            {activeCategory === "all" && (
              <div className="text-center mb-6">
                <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">Advisory & Compliance</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1a1c19] mt-1">Advisory, Compliance & Financial Management</h2>
              </div>
            )}
            <TeamCard member={advisoryMember} />
          </div>
        )}

        {/* Engineers Category */}
        {showEngineers && (
          <div className="space-y-10 sm:space-y-12">
            {activeCategory === "all" && (
              <div className="text-center mb-6">
                <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">Engineers & Development</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1a1c19] mt-1">Engineers and Development</h2>
              </div>
            )}
            <TeamCard member={engineeringMember} />
          </div>
        )}

        {/* Software Developers Category */}
        {showSoftware && (
          <div className="space-y-10 sm:space-y-12">
            {activeCategory === "all" && (
              <div className="text-center mb-6">
                <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">Software Developers & Engineers</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1a1c19] mt-1">Software Developers and Engineers</h2>
              </div>
            )}
            {softwareEngineers.map((m) => (
              <TeamCard key={m.id} member={m} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
