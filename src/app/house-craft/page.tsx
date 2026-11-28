import Footer from "@/components/Footer";
import EntryExperience from "@/components/house-builder/EntryExperience";

export const metadata = {
  title: "House Craft & Society Explorer | Roman Builders & Developers",
  description:
    "Choose to design your custom home in 3D or explore our interactive 3D residential society to select a plot first.",
};

export default function HouseCraftHubPage() {
  return (
    <main className="relative min-h-screen">
      <div className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px bg-[#4a5240]/30 w-12"></div>
            <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">
              Roman Builders Digital Studio
            </span>
            <div className="h-px bg-[#4a5240]/30 w-12"></div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#161f18] mb-3 tracking-tight">
            House Craft Experience
          </h1>
          <p className="text-gray-700 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Begin by customizing a house directly on your own plot, or explore our interactive 3D society to walk the streets and select the ideal plot location first.
          </p>
        </div>

        <EntryExperience />
      </div>
      <Footer transparent={true} />
    </main>
  );
}

