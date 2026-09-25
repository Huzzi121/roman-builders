"use client";
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative overflow-hidden flex flex-col justify-between">
      {/* Large Havnex Watermark behind hero elements */}
      <div className="absolute top-[14%] md:top-[10%] lg:top-[11%] left-1/2 -translate-x-1/2 w-full text-center text-[30vw] sm:text-[14rem] md:text-[25rem] font-black tracking-tight z-0 select-none bg-gradient-to-b from-black/[0.35] via-black/[0.12] md:from-black/[0.25] md:via-black/[0.08] to-transparent bg-clip-text text-transparent leading-none pointer-events-none">
        Roman
      </div>

      {/* HeroSection */}
      <section className="relative z-10 w-full pt-20 md:pt-24 pb-12 md:pb-10 min-h-[100vh] sm:min-h-[90vh] flex items-center" data-purpose="hero-content">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          {/* Hero Text & CTA */}
          <div className="max-w-4xl space-y-5 pt-24 sm:pt-36 md:pt-64 lg:pt-72 -ml-2 md:-ml-4">
            <h1 className="text-[2.75rem] leading-[1.1] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem] font-sans font-[750] text-[#1a1c19] tracking-tight sm:leading-[1.05]">
              Building Your Future<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>in Abbottabad
            </h1>
            <p className="text-gray-700 text-base md:text-lg max-w-md leading-relaxed font-normal pt-2">
              Your trusted partners in land development, architecture, and cooperative housing society management in Hazara Division.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <Link href="/projects" className="w-full justify-center sm:w-auto inline-flex items-center gap-2 bg-[#4a5240] text-white px-5 py-3.5 sm:py-3 rounded-lg text-[14px] sm:text-[13px] font-medium hover:bg-[#3d4435] transition-all shadow-md">
                <span>Explore properties</span>
                <i className="fa-solid fa-arrow-right text-[12px]"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
