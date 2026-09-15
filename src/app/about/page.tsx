import Footer from "@/components/Footer";
import FoundersPreview from "@/components/FoundersPreview";
import CTASection from "@/components/CTASection";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      {/* Global Unified Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about-us-bg.png')" }}
        ></div>
      </div>

      {/* Page Hero */}
      <section className="pt-28 pb-28 md:pt-36 md:pb-36 px-6 sm:px-8 relative text-center">
        {/* Masked Background Layer */}
        <div 
          className="absolute inset-0 z-0 bg-[url('/images/about-us-hero.png')] bg-cover bg-center overflow-hidden"
          style={{ 
            maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-[url('/images/hero-bg-overlay.png')] opacity-20 mix-blend-overlay"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-white/30"></div>
            <span className="text-sm font-bold tracking-[0.25em] text-white/90 uppercase drop-shadow-md">Our Story</span>
            <div className="w-16 h-[1px] bg-white/30"></div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 drop-shadow-lg">About Us</h1>
          <p className="text-white max-w-4xl mx-auto text-base md:text-lg lg:text-xl font-light tracking-wide leading-relaxed drop-shadow-md">
            Building a brighter tomorrow for Abbottabad through trust, <br className="hidden md:block" />visionary architecture, and lasting communities.
          </p>
        </div>
      </section>

      {/* Our Story Content & Vision, Mission, Values */}
      <section className="pt-0 pb-10 lg:pb-16 px-6 sm:px-8 -mt-6 md:-mt-10 relative z-20">
        <div className="text-center mb-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-[#161f18] mb-6">More Than Buildings</h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Roman Builders & Developers was founded with a single mission: to revolutionize the real estate landscape of Hazara Division. We believe that true development isn&apos;t just about erecting structures; it&apos;s about creating communities where families can thrive and legacies can be built.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="group bg-white/20 backdrop-blur-md hover:bg-[#4a5240]/85 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40 hover:border-transparent hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer">
            <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm shrink-0">
              <img src="/images/our-vision.avif" alt="Our Vision" className="w-full h-full object-cover" />
            </div>
            <div className="w-12 h-12 bg-[#4a5240] group-hover:bg-[#3d4435] text-white rounded-full flex items-center justify-center -mt-6 ml-4 relative z-10 border-[3px] border-white/50 shadow-md mb-4 shrink-0 transition-colors duration-300">
              <i className="fa-solid fa-eye text-sm"></i>
            </div>
            <h3 className="text-xl font-serif text-[#161f18] group-hover:text-white mb-3 transition-colors duration-300">Our Vision</h3>
            <p className="text-gray-800 font-medium group-hover:font-normal group-hover:text-white/90 text-sm leading-relaxed transition-all duration-300">
              To be the most trusted and innovative real estate developer in Pakistan, setting benchmarks in quality, sustainability, and community living.
            </p>
          </div>
          <div className="group bg-white/20 backdrop-blur-md hover:bg-[#4a5240]/85 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40 hover:border-transparent hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer">
            <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm shrink-0">
              <img src="/images/our-mission.jpg" alt="Our Mission" className="w-full h-full object-cover" />
            </div>
            <div className="w-12 h-12 bg-[#4a5240] group-hover:bg-[#3d4435] text-white rounded-full flex items-center justify-center -mt-6 ml-4 relative z-10 border-[3px] border-white/50 shadow-md mb-4 shrink-0 transition-colors duration-300">
              <i className="fa-solid fa-bullseye text-sm"></i>
            </div>
            <h3 className="text-xl font-serif text-[#161f18] group-hover:text-white mb-3 transition-colors duration-300">Our Mission</h3>
            <p className="text-gray-800 font-medium group-hover:font-normal group-hover:text-white/90 text-sm leading-relaxed transition-all duration-300">
              To deliver world-class infrastructure and transparent, legal land development that secures the investments and futures of our clients.
            </p>
          </div>
          <div className="group bg-white/20 backdrop-blur-md hover:bg-[#4a5240]/85 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40 hover:border-transparent hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer">
            <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm shrink-0">
              <img src="/images/our-values.jpg" alt="Our Values" className="w-full h-full object-cover" />
            </div>
            <div className="w-12 h-12 bg-[#4a5240] group-hover:bg-[#3d4435] text-white rounded-full flex items-center justify-center -mt-6 ml-4 relative z-10 border-[3px] border-white/50 shadow-md mb-4 shrink-0 transition-colors duration-300">
              <i className="fa-solid fa-heart text-sm"></i>
            </div>
            <h3 className="text-xl font-serif text-[#161f18] group-hover:text-white mb-3 transition-colors duration-300">Our Values</h3>
            <p className="text-gray-800 font-medium group-hover:font-normal group-hover:text-white/90 text-sm leading-relaxed transition-all duration-300">
              Integrity, Quality, Transparency, and Community. We build every project as if we were building it for our own families.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <FoundersPreview />



      {/* CTA */}
      <CTASection />
      <Footer />
    </main>
  );
}

