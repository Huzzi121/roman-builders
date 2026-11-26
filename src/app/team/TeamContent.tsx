"use client";

import { useSearchParams } from "next/navigation";
import { TeamMember } from "@/data/team";
import {
  STATIC_TEAM_CATEGORIES,
  STATIC_TEAM_MEMBERS,
  TeamCategoryItem,
} from "@/lib/team-data";
import TeamCard from "@/components/TeamCard";

interface TeamContentProps {
  categories?: TeamCategoryItem[];
  members?: TeamMember[];
}

export default function TeamContent({
  categories = STATIC_TEAM_CATEGORIES,
  members = STATIC_TEAM_MEMBERS,
}: TeamContentProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const validSlugs = new Set(categories.map((c) => c.slug));
  const activeCategory =
    categoryParam && validSlugs.has(categoryParam) ? categoryParam : "all";

  const activeCatObj = categories.find((c) => c.slug === activeCategory);

  const catInfo = activeCatObj
    ? {
        title: activeCatObj.title || activeCatObj.label,
        subtitle: activeCatObj.subtitle || "",
        tag: activeCatObj.tag || activeCatObj.label.toUpperCase(),
      }
    : {
        title: "Our Team",
        subtitle:
          "The visionary leaders, strategic advisors, engineers, and digital innovators shaping our communities.",
        tag: "OUR TEAM",
      };

  const isFoundersView = activeCategory === "founders";

  const visibleCategories =
    activeCategory === "all"
      ? categories
      : categories.filter((c) => c.slug === activeCategory);

  return (
    <div
      className={`min-h-screen ${
        isFoundersView ? "pt-20 sm:pt-24 pb-12" : "pt-28 sm:pt-36 pb-24"
      } px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto`}
    >
      {/* Category Hero Header */}
      <div
        className={`text-center ${
          isFoundersView ? "mb-6 sm:mb-8" : "mb-12 sm:mb-16"
        } relative`}
      >
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="h-px bg-[#4a5240]/30 w-12"></div>
          <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">
            {catInfo.tag}
          </span>
          <div className="h-px bg-[#4a5240]/30 w-12"></div>
        </div>
        <h1
          className={`${
            isFoundersView ? "text-2xl sm:text-4xl" : "text-3xl sm:text-5xl"
          } font-serif text-[#1a1c19] mb-2 tracking-tight`}
        >
          {catInfo.title}
        </h1>
        {catInfo.subtitle && (
          <p className="text-gray-700 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {catInfo.subtitle}
          </p>
        )}
      </div>

      {/* Cards Area */}
      <div className="space-y-16 sm:space-y-20">
        {visibleCategories.map((cat) => {
          const catMembers = members.filter((m) => m.category === cat.slug);
          if (catMembers.length === 0 && activeCategory === "all") return null;

          return (
            <div key={cat.slug} className="space-y-10 sm:space-y-12">
              {activeCategory === "all" && (
                <div className="text-center mb-6">
                  <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">
                    {cat.tag || cat.label}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#1a1c19] mt-1">
                    {cat.title || cat.label}
                  </h2>
                </div>
              )}

              {catMembers.length > 0 ? (
                catMembers.map((m) => <TeamCard key={m.id} member={m} />)
              ) : (
                <div className="text-center py-12 bg-white/40 rounded-3xl border border-[#dfd2ba]/60">
                  <p className="text-gray-600 text-sm">
                    No members have been added to this category yet.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
