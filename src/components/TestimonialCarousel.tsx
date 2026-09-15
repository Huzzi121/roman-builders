"use client";
import { useState } from 'react';

export default function TestimonialCarousel() {
  const [testOffset, setTestOffset] = useState(0);

  const testimonials = [
    { name: "Ali Khan", role: "Investor", text: "Roman Builders Real Estate truly lives up to its name. They helped me find the perfect plot in a great society. The entire process was stress-free and smooth — from site visits to final paperwork." },
    { name: "Aisha Rehman", role: "Homeowner", text: "Exceptional service and dedication! They walked us through every step of building our dream home in Hazara." }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12" data-purpose="testimonials">
      <div className="rounded-3xl overflow-hidden shadow-xl relative flex flex-col lg:flex-row min-h-[340px] sm:min-h-[380px]">
        {/* Left Side */}
        <div className="relative z-10 bg-[#3d4435] text-white p-8 sm:p-10 lg:p-12 w-full lg:w-[42%] flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[9px] font-bold tracking-[0.2em] text-white/70 uppercase">Client Testimonials</span>
              <div className="w-10 h-[1px] bg-white/30"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white leading-[1.1] tracking-tight">
              Trusted by<br/>Happy Families
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-9 h-9 rounded-full bg-[#5a6350] border-2 border-[#3d4435] flex items-center justify-center text-white text-xs font-bold">A</div>
              <div className="w-9 h-9 rounded-full bg-[#6b7360] border-2 border-[#3d4435] flex items-center justify-center text-white text-xs font-bold">R</div>
              <div className="w-9 h-9 rounded-full bg-[#7d8570] border-2 border-[#3d4435] flex items-center justify-center text-white text-xs font-bold">K</div>
            </div>
            <div className="text-amber-400 text-sm flex space-x-0.5">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex space-x-2">
              <button onClick={() => setTestOffset((p) => (p - 1 + testimonials.length) % testimonials.length)} className="w-9 h-9 rounded-full border border-white/20 text-white hover:bg-white/10 flex items-center justify-center text-[10px] focus:outline-none transition-colors">
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button onClick={() => setTestOffset((p) => (p + 1) % testimonials.length)} className="w-9 h-9 rounded-full bg-white text-[#3d4435] flex items-center justify-center text-[10px] hover:bg-gray-100 focus:outline-none transition-colors">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Center Testimonial Card */}
        <div className="absolute z-20 top-1/2 left-[38%] -translate-y-1/2 hidden lg:block w-[260px]">
          <div className="bg-[#4a5240]/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm border-2 border-white/30 shadow-md">
                {testimonials[testOffset].name.charAt(0)}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-white">{testimonials[testOffset].name}</div>
                <div className="text-[10px] text-white/60">{testimonials[testOffset].role}</div>
              </div>
            </div>
            <div className="text-amber-400 text-[11px] flex space-x-0.5 mb-3">
              <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
            </div>
            <div className="text-white/40 text-2xl font-serif leading-none mb-2 select-none">&ldquo;</div>
            <p className="text-[11px] text-white/80 leading-relaxed italic">
              {testimonials[testOffset].text}
            </p>
          </div>
        </div>

        {/* Mobile/Tablet Testimonial Card */}
        <div className="block lg:hidden bg-[#4a5240] p-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm border-2 border-white/30 shadow-md">
              {testimonials[testOffset].name.charAt(0)}
            </div>
            <div>
              <div className="text-[13px] font-semibold text-white">{testimonials[testOffset].name}</div>
              <div className="text-[10px] text-white/60">{testimonials[testOffset].role}</div>
            </div>
          </div>
          <div className="text-amber-400 text-[11px] flex space-x-0.5 mb-3">
            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
          </div>
          <p className="text-[12px] text-white/80 leading-relaxed italic">
            &ldquo;{testimonials[testOffset].text}&rdquo;
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block w-[58%] relative">
          <img src="/images/testimonial-building.jpg" alt="Roman Builders luxury project" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3d4435]/20 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
