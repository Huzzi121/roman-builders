import { Suspense } from "react";
import Footer from "@/components/Footer";
import HouseConfigurator from "@/components/house-builder/HouseConfigurator";

export const metadata = {
  title: "House Craft | Roman Builders & Developers",
  description:
    "Interactive 3D House Configurator by Roman Builders & Developers. Select plot sizes, architectural styles, exterior materials, amenities, and request a formal construction quotation.",
};

export default function BuildYourHousePage() {
  return (
    <main className="relative min-h-screen">
      <div className="pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-[92rem] mx-auto">
        {/* Compact Hero Intro so 3D Builder starts immediately above the fold */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px bg-[#4a5240]/30 w-12"></div>
            <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">
              Interactive 3D Studio
            </span>
            <div className="h-px bg-[#4a5240]/30 w-12"></div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#161f18] mb-2 tracking-tight">
            House Craft
          </h1>
          <p className="text-gray-700 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Select your residential plot size, explore architectural styles in real-time 3D, customize materials and amenities, and send your specification directly to our engineering team.
          </p>
        </div>

        {/* Main 3D House Configurator */}
        <Suspense
          fallback={
            <div className="min-h-[540px] flex flex-col items-center justify-center bg-white/50 rounded-3xl border border-[#dfd2ba]">
              <div className="w-10 h-10 border-4 border-[#3d4435] border-t-transparent rounded-full animate-spin mb-3"></div>
              <span className="text-xs font-medium uppercase tracking-wider text-[#3d4435]">
                Preparing 3D Builder...
              </span>
            </div>
          }
        >
          <HouseConfigurator />
        </Suspense>
      </div>

      <Footer transparent={true} />
    </main>
  );
}

