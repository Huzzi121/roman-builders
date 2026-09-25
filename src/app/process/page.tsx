import Footer from "@/components/Footer";
import ProcessPreview from "@/components/ProcessPreview";
import CTASection from "@/components/CTASection";

export default function ProcessPage() {
  return (
    <main className="relative min-h-screen">
      {/* Page Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6 sm:px-8 relative text-center">
        {/* Masked Background Layer */}
        <div 
          className="absolute inset-0 z-0 bg-[url('/images/process-hero.png')] bg-cover bg-center overflow-hidden"
          style={{ 
            maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-[url('/images/hero-bg-overlay.png')] opacity-20 mix-blend-overlay"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 drop-shadow-lg">Our Work Process</h1>
          <p className="text-white max-w-4xl mx-auto text-base md:text-lg lg:text-xl font-light tracking-wide leading-relaxed drop-shadow-md">
            A transparent and structured process to turn vision into thriving communities.
          </p>
        </div>
      </section>

      {/* Interactive Process Component */}
      <div className="mb-4 -mt-6 md:-mt-10 relative z-20">
        <ProcessPreview />
      </div>

      {/* Expanded Explanations */}
      <section className="pt-0 pb-16 px-6 sm:px-8 max-w-5xl mx-auto space-y-10 mb-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-[#161f18]">A Closer Look</h2>
        </div>

        <div className="group flex flex-col md:flex-row gap-8 items-start p-6 md:p-10 lg:p-12 rounded-[3rem] border border-white/60 bg-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-md hover:bg-[#3d4435] hover:border-transparent hover:-translate-y-2 transition-all duration-300 cursor-pointer">
          <div className="text-5xl font-serif text-[#4a5240]/40 group-hover:text-white/20 font-bold w-20 shrink-0 transition-colors duration-300">01</div>
          <div>
            <h3 className="text-2xl font-serif text-[#161f18] group-hover:text-white mb-3 transition-colors duration-300">Land Acquisition</h3>
            <p className="text-gray-800 font-medium group-hover:font-normal group-hover:text-white/80 leading-relaxed text-sm transition-colors duration-300">
              The foundation of a great community is its location. We conduct thorough feasibility studies, topographical surveys, and market analysis before acquiring land. We ensure that the land is completely litigation-free and has clear ownership titles to protect our investors.
            </p>
          </div>
        </div>

        <div className="group flex flex-col md:flex-row gap-8 items-start p-6 md:p-10 lg:p-12 rounded-[3rem] border border-white/60 bg-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-md hover:bg-[#3d4435] hover:border-transparent hover:-translate-y-2 transition-all duration-300 cursor-pointer">
          <div className="text-5xl font-serif text-[#4a5240]/40 group-hover:text-white/20 font-bold w-20 shrink-0 transition-colors duration-300">02</div>
          <div>
            <h3 className="text-2xl font-serif text-[#161f18] group-hover:text-white mb-3 transition-colors duration-300">NOC Approvals</h3>
            <p className="text-gray-800 font-medium group-hover:font-normal group-hover:text-white/80 leading-relaxed text-sm transition-colors duration-300">
              We never bypass the law. Our dedicated legal and regulatory teams work closely with local authorities like the TMA (Tehsil Municipal Administration) and EPA (Environmental Protection Agency) to secure all necessary No Objection Certificates prior to development.
            </p>
          </div>
        </div>

        <div className="group flex flex-col md:flex-row gap-8 items-start p-6 md:p-10 lg:p-12 rounded-[3rem] border border-white/60 bg-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-md hover:bg-[#3d4435] hover:border-transparent hover:-translate-y-2 transition-all duration-300 cursor-pointer">
          <div className="text-5xl font-serif text-[#4a5240]/40 group-hover:text-white/20 font-bold w-20 shrink-0 transition-colors duration-300">03</div>
          <div>
            <h3 className="text-2xl font-serif text-[#161f18] group-hover:text-white mb-3 transition-colors duration-300">Infrastructure Development</h3>
            <p className="text-gray-800 font-medium group-hover:font-normal group-hover:text-white/80 leading-relaxed text-sm transition-colors duration-300">
              Once approvals are in place, our engineering teams mobilize. We focus on heavy civil works first: leveling land, carving out wide roads, laying underground utility lines, and constructing drainage systems. We build infrastructure meant to last decades, not just years.
            </p>
          </div>
        </div>

        <div className="group flex flex-col md:flex-row gap-8 items-start p-6 md:p-10 lg:p-12 rounded-[3rem] border border-white/60 bg-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-md hover:bg-[#3d4435] hover:border-transparent hover:-translate-y-2 transition-all duration-300 cursor-pointer">
          <div className="text-5xl font-serif text-[#4a5240]/40 group-hover:text-white/20 font-bold w-20 shrink-0 transition-colors duration-300">04</div>
          <div>
            <h3 className="text-2xl font-serif text-[#161f18] group-hover:text-white mb-3 transition-colors duration-300">Plot Handover</h3>
            <p className="text-gray-800 font-medium group-hover:font-normal group-hover:text-white/80 leading-relaxed text-sm transition-colors duration-300">
              The final and most rewarding step. We conduct a transparent balloting process and hand over physical possession of the plots to our clients. Our relationship doesn't end here; we continue to manage and maintain the society to ensure a high standard of living.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
