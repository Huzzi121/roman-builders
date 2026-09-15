import Hero from "@/components/Hero";
import StoryPreview from "@/components/StoryPreview";
import ExpertiseSection from "@/components/ExpertiseSection";
import FeaturedProject from "@/components/FeaturedProject";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#ede9e0] min-h-screen overflow-hidden">
      {/* Global Background Layer for Homepage */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* New Global Background - Covers the entire page */}
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/home-background.png')" }}
        ></div>
      </div>

      {/* Hero Background Layer - scrolls with page */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-[120vh] bg-cover bg-[center_top] md:bg-[center_85%] bg-no-repeat"
          style={{ 
            backgroundImage: "url('/images/hero section.png')",
            maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)"
          }}
        ></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <Hero />
        <StoryPreview />
        <ExpertiseSection />
        <FeaturedProject />
        <Footer transparent={true} />
      </div>
    </main>
  );
}
