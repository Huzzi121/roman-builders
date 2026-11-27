import { getImageProps } from "next/image";
import Hero from "@/components/Hero";
import StoryPreview from "@/components/StoryPreview";
import ExpertiseSection from "@/components/ExpertiseSection";
import ProcessPreview from "@/components/ProcessPreview";
import FeaturedProject from "@/components/FeaturedProject";
import Footer from "@/components/Footer";

export default function Home() {
  const commonHero = { alt: "Roman Builders Hero", fill: true, sizes: "100vw", quality: 75 };
  const {
    props: { srcSet: desktopHeroSrcSet },
  } = getImageProps({ ...commonHero, src: "/images/hero section.png" });
  const {
    props: { srcSet: mobileHeroSrcSet, style: heroImgStyle, ...mobileHeroRest },
  } = getImageProps({ ...commonHero, src: "/images/hero for home for mobile.png", priority: true });

  return (
    <main className="relative min-h-screen overflow-hidden">


      {/* Hero Background Layer - scrolls with page (Art Direction: single active viewport download) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-[100vh]"
          style={{
            maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)"
          }}
        >
          <picture className="block w-full h-full relative">
            <source media="(min-width: 768px)" srcSet={desktopHeroSrcSet} sizes="100vw" />
            <source media="(max-width: 767px)" srcSet={mobileHeroSrcSet} sizes="100vw" />
            <img
              {...mobileHeroRest}
              alt="Roman Builders Hero"
              fetchPriority="high"
              decoding="sync"
              style={heroImgStyle}
              className="object-cover object-top md:object-bottom w-full h-full"
            />
          </picture>
          {/* Mobile light gradient overlay to improve text visibility */}
          <div
            className="md:hidden absolute inset-0 backdrop-blur-[2px]"
            style={{ background: "linear-gradient(to bottom, transparent 15%, rgba(255,255,255,0.4) 35%, rgba(255,255,255,0.15) 100%)" }}
          ></div>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <Hero />
        <StoryPreview />
        <ExpertiseSection />
        <ProcessPreview />
        <FeaturedProject />
        <Footer transparent={true} />
      </div>
    </main>
  );
}
