"use client";
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative overflow-hidden flex flex-col justify-between">
      {/* Large Havnex Watermark behind hero elements */}
      <div className="absolute top-[6%] left-1/2 -translate-x-1/2 w-full text-center text-[10rem] md:text-[18rem] font-black tracking-tight z-0 select-none bg-gradient-to-b from-black/[0.20] to-transparent bg-clip-text text-transparent leading-none pointer-events-none">
        Roman
      </div>
      
      {/* HeroSection */}
      <section className="relative z-10 w-full pt-20 md:pt-24 pb-16 md:pb-20 min-h-screen flex items-center" data-purpose="hero-content">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          {/* Hero Text & CTA */}
          <div className="max-w-2xl space-y-6 pt-36 md:pt-56">
            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-[#1a1c19] tracking-tight leading-[1.05]">
              Building Your Future<br/>in Abbottabad
            </h1>
            <p className="text-[#1a1c19]/90 text-base md:text-lg max-w-md leading-relaxed font-normal pt-2">
              Your trusted partners in land development, architecture, and cooperative housing society management in Hazara Division.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <Link href="/projects" className="inline-flex items-center gap-2 bg-[#4a5240] text-white px-5 py-3 rounded-lg text-[13px] font-medium hover:bg-[#3d4435] transition-all shadow-md">
                <span>Explore properties</span>
                <i className="fa-solid fa-arrow-right text-[12px]"></i>
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 bg-transparent text-[#4a5240] px-5 py-3 rounded-lg text-[13px] font-medium hover:bg-white/20 transition-all border border-[#4a5240]/20">
                <span>Our Story</span>
                <i className="fa-solid fa-arrow-right text-[12px]"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
