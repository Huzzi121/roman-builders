"use client";
import Link from 'next/link';

export default function ExpertiseSection() {
  return (
    <section className="pt-16 lg:pt-20 pb-12 relative overflow-hidden" data-purpose="expertise" id="about">


      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch lg:gap-12 xl:gap-20">
          
          {/* Left Content Area */}
          <div className="w-full lg:w-[45%] xl:w-[45%] pb-8 lg:pb-8 pt-2 relative z-20 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#1a1c19]/30"></div>
              <span className="text-[11px] font-extrabold tracking-[0.25em] text-[#1a1c19]/80 uppercase">Our Expertise</span>
              <div className="w-12 h-[1px] bg-[#1a1c19]/30"></div>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-serif text-[#161f18] leading-[1.05] tracking-tight mb-6">
              From Land to<br/>
              Communities,<br/>
              We Make It Happen
            </h2>
            
            {/* Subheading */}
            <p className="text-gray-700 text-[14px] sm:text-[16px] max-w-md leading-relaxed mb-10 font-medium">
              At Roman Builders & Developers, we turn potential into thriving communities by combining strategic planning, legal expertise, and quality construction.
            </p>
            
            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="group bg-white/20 backdrop-blur-md hover:bg-[#4a5240]/85 rounded-3xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40 hover:border-transparent hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/40 group-hover:bg-white/20 text-[#161f18] group-hover:text-white flex items-center justify-center mb-4 transition-colors duration-300">
                  <i className="fa-solid fa-map-location-dot text-[13px]"></i>
                </div>
                <div className="text-[11px] text-[#161f18] group-hover:text-white/80 font-bold mb-2 transition-colors duration-300">01</div>
                <h3 className="font-serif text-[16px] text-[#161f18] group-hover:text-white mb-2 leading-tight transition-colors duration-300">Land Planning &<br/>Development</h3>
              </div>
              
              <div className="group bg-white/20 backdrop-blur-md hover:bg-[#4a5240]/85 rounded-3xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40 hover:border-transparent hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/40 group-hover:bg-white/20 text-[#161f18] group-hover:text-white flex items-center justify-center mb-4 transition-colors duration-300">
                  <i className="fa-solid fa-file-contract text-[13px]"></i>
                </div>
                <div className="text-[11px] text-[#161f18] group-hover:text-white/80 font-bold mb-2 transition-colors duration-300">02</div>
                <h3 className="font-serif text-[16px] text-[#161f18] group-hover:text-white mb-2 leading-tight transition-colors duration-300">Legal Approvals<br/>& Compliance</h3>
              </div>
              
              <div className="group bg-white/20 backdrop-blur-md hover:bg-[#4a5240]/85 rounded-3xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40 hover:border-transparent hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/40 group-hover:bg-white/20 text-[#161f18] group-hover:text-white flex items-center justify-center mb-4 transition-colors duration-300">
                  <i className="fa-solid fa-helmet-safety text-[13px]"></i>
                </div>
                <div className="text-[11px] text-[#161f18] group-hover:text-white/80 font-bold mb-2 transition-colors duration-300">03</div>
                <h3 className="font-serif text-[16px] text-[#161f18] group-hover:text-white mb-2 leading-tight transition-colors duration-300">Quality<br/>Construction</h3>
              </div>
            </div>
            
            {/* CTA & Small Text */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link href="/services" className="inline-flex items-center gap-2 bg-[#3d4435] text-white px-6 py-3 rounded-full text-[12px] font-medium hover:bg-[#2c3325] transition-colors shadow-lg group">
                Explore Our Services
                <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </div>
          </div>
          
          {/* Right Image Area */}
          <div className="w-full lg:w-[55%] xl:w-[55%] relative mt-10 lg:mt-0 lg:pl-10">
            <div className="w-full h-[400px] sm:h-[500px] lg:h-[560px] xl:h-[600px] rounded-tl-[6rem] lg:rounded-tl-[10rem] overflow-hidden relative shadow-2xl">
              <img src="/images/expertise-house.jpg" alt="Luxury Villa" className="w-full h-full object-cover object-center absolute inset-0 z-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
