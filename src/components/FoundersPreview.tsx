"use client";
import Link from 'next/link';

export default function FoundersPreview() {
  return (
    <section className="w-full py-16 relative overflow-hidden" data-purpose="founders">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        <div className="text-center mb-12 relative">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px bg-[#4a5240]/30 w-12"></div>
            <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">Our Founders</span>
            <div className="h-px bg-[#4a5240]/30 w-12"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1a1c19] mb-3 tracking-tight">The Visionaries Behind Roman Builders & Developers</h2>
          <p className="text-gray-700 text-sm">Two Leaders. One Vision. A Better Tomorrow.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-10 lg:gap-6 xl:gap-12">
          {/* Founder 1 */}
          <div className="flex-1 flex flex-col items-center lg:items-end relative">
            <div className="relative max-w-[360px] w-full">
              <img src="/WhatsApp%20Image%202026-09-04%20at%2012.10.28.jpeg" alt="Dr. Roman Gul" className="w-full aspect-[4/5] object-cover rounded-t-[100px] sm:rounded-t-[120px] rounded-b-xl shadow-lg border-4 border-white" />
              <div className="absolute -bottom-5 -left-4 sm:-left-8 bg-[#4a5240] text-white p-5 sm:p-6 rounded-2xl shadow-xl max-w-[240px]">
                <h3 className="text-xl font-serif mb-1">Dr. Roman Gul</h3>
                <p className="text-[9.5px] font-semibold tracking-wider uppercase text-white/80 leading-relaxed">Chief Executive Officer</p>
                <p className="text-[10px] font-semibold tracking-wider text-white/80 leading-relaxed">Email: ceo@romanbuilders.pk</p>
              </div>
            </div>

            <div className="w-full max-w-[360px] mt-10 text-left">
              <p className="text-[13px] font-bold text-gray-700 leading-relaxed mb-6 text-justify">
                Dr. Roman Gul, CEO of Roman Builders & Developers (Private) Limited, is a seasoned business professional with extensive expertise in real estate development, town planning, construction, regulatory approvals, and legal consultancy for housing projects. As a lead partner, he also brings exceptional strength in real estate sales and marketing. In addition to his business achievements, he has served for several years as a consultant in cervical spondylitis rehabilitation and alternative medicine, reflecting his diverse professional expertise.
              </p>
              <div className="flex items-end justify-between">
                <div className="font-serif italic text-2xl text-gray-800/80 -rotate-10 pr-2">Dr. Roman Gul</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-center justify-center shrink-0 w-16 relative">
            <div className="h-[90%] w-px bg-[#4a5240]/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Founder 2 */}
          <div className="flex-1 flex flex-col items-center lg:items-start relative mt-16 lg:mt-0">
            <div className="relative max-w-[360px] w-full">
              <img src="/Gemini_Generated_Image_7wr6bb7wr6bb7wr6.jfif" alt="Liaqat Khan Jadoon" className="w-full aspect-[4/5] object-cover rounded-t-[100px] sm:rounded-t-[120px] rounded-b-xl shadow-lg border-4 border-white" />
              <div className="absolute -bottom-5 -left-4 sm:-left-8 bg-[#4a5240] text-white p-5 sm:p-6 rounded-2xl shadow-xl max-w-[240px]">
                <h3 className="text-lg font-serif mb-1">Liaqat Khan Jadoon</h3>
                <p className="text-[9.5px] font-semibold tracking-wider uppercase text-white/80 leading-relaxed">Executive Director</p>
                <p className="text-[10px] font-semibold tracking-wider text-white/80 leading-relaxed">Email: director@romanbuilders.pk</p>
              </div>
            </div>

            <div className="w-full max-w-[360px] mt-10 text-left">
              <p className="text-[13px] font-bold text-gray-700 leading-relaxed mb-6 text-justify">
                Liaqat Khan Jadoon is a dynamic business leader and Executive Director of Roman Builders & Developers (Private) Limited, bringing strategic leadership and extensive expertise in real estate development, town planning, construction, regulatory approvals, and project commercialization. With a strong command of sales and marketing, he plays a pivotal role in driving business growth and advancing real estate ventures. A retired Navy SEAL commando with distinguished national and international achievements in skydiving, sailing, and allied disciplines, he embodies strategic vision, operational excellence, discipline, and decisive leadership.
              </p>
              <div className="flex items-end justify-between">
                <div className="font-serif italic text-2xl text-gray-800/80 -rotate-10 pr-2">Liaqat Khan Jadoon</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
