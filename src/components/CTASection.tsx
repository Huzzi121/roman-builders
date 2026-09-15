"use client";
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 py-6 pb-12" data-purpose="cta-section" id="contact">
      <div className="rounded-[3rem] border-2 border-white/70 overflow-hidden shadow-xl relative flex flex-col lg:flex-row min-h-[280px] sm:min-h-[320px]">
        {/* Left Side */}
        <div className="relative z-10 bg-[#e8e5da] p-8 sm:p-10 lg:p-12 w-full lg:w-[38%] flex flex-col justify-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold tracking-[0.2em] text-[#4a5240] uppercase">Get in Touch</span>
            <div className="w-10 h-[1px] bg-[#4a5240]/30"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#161f18] leading-[1.1] tracking-tight">
            Start Your<br/>Journey Today
          </h2>
          <div>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-[#4a5240] text-white pl-7 pr-2 py-2.5 rounded-full text-[13px] font-medium hover:bg-[#3d4435] transition-all shadow-lg group/cta">
              <span>Talk to Roman Builders</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover/cta:bg-white/30 transition-colors">
                <i className="fa-solid fa-arrow-right text-[10px] group-hover/cta:translate-x-0.5 transition-transform"></i>
              </div>
            </Link>
          </div>
        </div>

        {/* Center/Right - Image */}
        <div className="w-full lg:w-[48%] relative min-h-[200px] lg:min-h-0">
          <img src="/images/prime-view-gate.jpg" alt="Housing Society Entrance" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#e8e5da]/30 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Far Right */}
        <div className="hidden lg:flex bg-[#3d4435] w-[14%] items-center justify-center p-6 relative">
          <div className="text-[8px] font-bold tracking-[0.25em] text-white/50 uppercase leading-loose text-center">
            People<br/>Places<br/>Progress<br/>Together
          </div>
        </div>
      </div>
    </section>
  );
}
