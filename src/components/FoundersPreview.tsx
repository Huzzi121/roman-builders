"use client";
import Link from "next/link";
import {
  founders,
  advisoryMember,
  engineeringMember,
  softwareEngineers,
} from "@/data/team";
import TeamCard from "@/components/TeamCard";

export default function FoundersPreview() {
  return (
    <section className="w-full py-16 sm:py-20 relative overflow-hidden" data-purpose="founders">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">

        {/* Section 1: Founders */}
        <div>
          <div className="text-center mb-12 sm:mb-16 relative">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px bg-[#4a5240]/30 w-12"></div>
              <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">Our Founders</span>
              <div className="h-px bg-[#4a5240]/30 w-12"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1a1c19] mb-3 tracking-tight">
              The Visionaries Behind Roman Builders & Developers
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">Two Leaders. One Vision. A Better Tomorrow.</p>
          </div>

          <div className="space-y-10 sm:space-y-12">
            {founders.map((founder) => (
              <TeamCard key={founder.id} member={founder} />
            ))}
          </div>
        </div>

        {/* Section 2: Advisory & Compliance */}
        <div>
          <div className="text-center mb-10 sm:mb-12 relative">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px bg-[#4a5240]/30 w-12"></div>
              <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">
                ADVISORY & COMPLIANCE
              </span>
              <div className="h-px bg-[#4a5240]/30 w-12"></div>
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#1a1c19] mb-3 tracking-tight uppercase">
              Advisory, Compliance and Financial Management
            </h3>
          </div>

          <div>
            <TeamCard member={advisoryMember} />
          </div>
        </div>

        {/* Section 3: Engineers & Development */}
        <div>
          <div className="text-center mb-10 sm:mb-12 relative">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px bg-[#4a5240]/30 w-12"></div>
              <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">
                ENGINEERS & DEVELOPMENT
              </span>
              <div className="h-px bg-[#4a5240]/30 w-12"></div>
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#1a1c19] mb-3 tracking-tight uppercase">
              Engineers and Development
            </h3>
          </div>

          <div>
            <TeamCard member={engineeringMember} />
          </div>
        </div>

        {/* Section 4: Software Developers & Engineers */}
        <div>
          <div className="text-center mb-10 sm:mb-12 relative">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px bg-[#4a5240]/30 w-12"></div>
              <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">
                SOFTWARE DEVELOPERS & ENGINEERS
              </span>
              <div className="h-px bg-[#4a5240]/30 w-12"></div>
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#1a1c19] mb-3 tracking-tight uppercase">
              Software Developers and Engineers
            </h3>
            <p className="text-gray-700 text-sm sm:text-base max-w-xl mx-auto">
              Architecting modern digital infrastructure, scalable systems, and intelligent experiences.
            </p>
          </div>

          <div className="space-y-10 sm:space-y-12">
            {softwareEngineers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Join our team banner */}
        <div className="mt-16 sm:mt-20 max-w-5xl mx-auto bg-[#f8f5ee]/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#dfd2ba] shadow-sm">
          <div>
            <h4 className="text-xl font-serif text-[#1a1c19] mb-1">Join our team</h4>
            <p className="text-xs sm:text-sm text-gray-600">
              We&apos;re looking for talented professionals to help shape the future of luxury real estate.
            </p>
          </div>
          <Link
            href="/contact"
            className="text-xs font-bold uppercase tracking-widest text-[#9d783e] hover:text-[#7f5f2d] transition-colors shrink-0"
          >
            Apply Now
          </Link>
        </div>

      </div>
    </section>
  );
}
