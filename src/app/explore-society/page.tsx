import { Suspense } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import SocietyExplorer from "@/components/society-explorer/SocietyExplorer";

export const metadata = {
  title: "Explore Society in 3D | Roman Builders & Developers",
  description:
    "Explore our interactive 3D residential society in Daylight or Evening/Night view, inspect residential plots, walk the streets, and customize your dream home with House Craft.",
};

export default function ExploreSocietyPage() {
  return (
    <main className="relative min-h-screen">
      <div className="pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-[96rem] mx-auto">
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-[#4a5240] text-[11px] font-bold tracking-[0.2em] uppercase">
                Interactive 3D Master Plan
              </span>
              <div className="h-px bg-[#4a5240]/30 w-10"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#161f18] tracking-tight">
              Explore Society
            </h1>
            <p className="text-gray-700 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Navigate streets, inspect community landmarks and parks, and select any residential plot to customize your house in House Craft.
            </p>
          </div>

          <Link
            href="/build-your-house"
            className="inline-flex items-center gap-2 bg-white/85 hover:bg-white text-[#161f18] border border-[#dfd2ba] px-4 py-2.5 rounded-full text-xs font-semibold shadow-sm transition-all self-start"
          >
            <i className="fa-solid fa-cube text-[#9d783e]"></i>
            <span>Or Build House Directly</span>
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="min-h-[600px] flex flex-col items-center justify-center bg-[#111824] text-[#dfd2ba] rounded-3xl">
              <div className="w-10 h-10 border-4 border-[#9d783e] border-t-transparent rounded-full animate-spin mb-3"></div>
              <span className="text-xs uppercase tracking-widest">
                Preparing 3D Society Explorer...
              </span>
            </div>
          }
        >
          <SocietyExplorer />
        </Suspense>
      </div>

      <Footer transparent={true} />
    </main>
  );
}

