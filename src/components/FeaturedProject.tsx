"use client";
import Link from 'next/link';

export default function FeaturedProject() {
  return (
    <section className="bg-transparent py-20 lg:py-28 relative overflow-hidden" data-purpose="flagship-project" id="properties">
      {/* Subtle decorative background elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4a5240]/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#4a5240]/[0.02] rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-20">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="hidden sm:block w-16 h-[1px] bg-[#4a5240]/30"></div>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-[#4a5240] uppercase">Our Flagship Project</span>
            <div className="hidden sm:block w-16 h-[1px] bg-[#4a5240]/30"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#161f18] tracking-tight leading-[1.1]">
            Discover Prime View
          </h2>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-20 items-stretch">
          {/* Left Side - Visual */}
          <div className="w-full lg:w-[58%] xl:w-[60%] shrink-0">
            <div className="relative rounded-2xl overflow-hidden shadow-lg group h-[320px] sm:h-[400px] lg:h-[520px] xl:h-[560px]">
              <img
                src="/images/prime-view-showcase.jpg"
                alt="Aerial view of Prime View Co-Operative Housing Society"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute top-5 left-5 sm:top-6 sm:left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-white/50 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-[#161f18] uppercase">Now Selling</span>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-[42%] xl:w-[40%] flex flex-col justify-center gap-6 lg:gap-7">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-[2.2rem] xl:text-4xl font-serif text-[#161f18] leading-[1.15] tracking-tight mb-4">
                Prime View<br className="hidden sm:block" /> Co‑Operative Housing Society
              </h3>
              <p className="text-gray-500 text-[13px] sm:text-sm leading-relaxed max-w-md">
                Experience unparalleled living in Abbottabad&apos;s premier cooperative housing society.
                Prime View combines breathtaking natural landscapes with modern urban planning.
              </p>
            </div>
            
            <div className="space-y-3.5">
              {[
                { icon: "fa-circle-check", text: "TMA & EPA Approved" },
                { icon: "fa-circle-check", text: "Underground Electrification" },
                { icon: "fa-circle-check", text: "Modern Sewerage & Infrastructure" },
                { icon: "fa-circle-check", text: "Prime Location with Mountain Views" },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 group/feat">
                  <div className="w-7 h-7 rounded-full bg-[#4a5240]/10 flex items-center justify-center shrink-0 group-hover/feat:bg-[#4a5240]/20 transition-colors">
                    <i className={`fa-solid ${feature.icon} text-[#4a5240] text-xs`}></i>
                  </div>
                  <span className="text-[13px] sm:text-sm text-[#1a1c19] font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="w-full h-[1px] bg-gray-200"></div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/projects/prime-view"
                className="inline-flex items-center gap-3 bg-[#2c3325] text-white pl-7 pr-2 py-2 rounded-full text-[13px] font-medium hover:bg-[#1a1f15] transition-all shadow-lg group/cta"
              >
                <span>Explore Prime View</span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover/cta:bg-white/30 transition-colors">
                  <i className="fa-solid fa-arrow-right text-[10px] group-hover/cta:translate-x-0.5 transition-transform"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
