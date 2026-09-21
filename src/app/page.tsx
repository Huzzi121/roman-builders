import Hero from "@/components/Hero";
import StoryPreview from "@/components/StoryPreview";
import ExpertiseSection from "@/components/ExpertiseSection";
import FeaturedProject from "@/components/FeaturedProject";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">


      {/* Hero Background Layer - scrolls with page */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Desktop Hero Image */}
        <div 
          className="hidden md:block absolute top-0 left-0 w-full h-[100vh] bg-cover bg-bottom bg-no-repeat"
          style={{ 
            backgroundImage: "url('/images/hero section.png')",
            maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)"
          }}
        ></div>
        {/* Mobile Hero Image */}
        <div 
          className="md:hidden absolute top-0 left-0 w-full h-[100vh] bg-cover bg-[center_top] bg-no-repeat"
          style={{ 
            backgroundImage: "url('/images/hero for home for mobile.png')",
            maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)"
          }}
        >
          {/* Light gradient overlay to improve text visibility, starts seamlessly below the top watermark */}
          <div 
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{ background: "linear-gradient(to bottom, transparent 15%, rgba(255,255,255,0.4) 35%, rgba(255,255,255,0.15) 100%)" }}
          ></div>
        </div>
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
