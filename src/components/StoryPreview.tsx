"use client";
import Link from 'next/link';

export default function StoryPreview() {
  return (
    <section className="w-full bg-transparent relative overflow-hidden pt-20 pb-16 z-20" data-purpose="video-presentation" id="story">
      {/* Abstract Background SVG */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30">
        <svg viewBox="0 0 1440 600" className="w-full h-full object-cover" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 450 Q 300 250 720 350 T 1440 250 L 1440 600 L 0 600 Z" fill="url(#paint0_linear)"/>
          <path d="M0 350 Q 250 150 600 250 T 1440 150 L 1440 600 L 0 600 Z" stroke="#e0ddd0" strokeWidth="1" fill="transparent"/>
          <path d="M0 450 C 300 350, 400 450, 720 350 C 1000 250, 1200 400, 1440 300 L 1440 600 L 0 600 Z" stroke="#e0ddd0" strokeWidth="2" fill="transparent"/>
          <path d="M1000 300 L 1100 150 L 1200 300" stroke="#e0ddd0" strokeWidth="1.5" fill="transparent" strokeLinejoin="round"/>
          <path d="M1100 250 L 1180 150 L 1280 300" stroke="#e0ddd0" strokeWidth="1.5" fill="transparent" strokeLinejoin="round"/>
          <path d="M1250 250 L 1320 150 L 1420 250" stroke="#e0ddd0" strokeWidth="1.5" fill="transparent" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="paint0_linear" x1="720" y1="250" x2="720" y2="600" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f3f1e8" stopOpacity="0.8"/>
              <stop offset="1" stopColor="#fdfcf8" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 sm:px-8 relative z-10 flex flex-col items-center">
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* Eyebrow Pill */}
          <div className="flex items-center gap-4 mb-6">
            <div className="hidden sm:block w-16 h-[1px] bg-gray-300"></div>
            <div className="bg-[#3d4435]/80 backdrop-blur-md px-5 py-2 sm:px-6 sm:py-2.5 rounded-full flex items-center gap-2.5 border border-white/10 shadow-lg">
              <i className="fa-solid fa-video text-xs sm:text-sm text-[#e8e4db]"></i>
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#e8e4db] uppercase">Our Story</span>
            </div>
            <div className="hidden sm:block w-16 h-[1px] bg-gray-300"></div>
          </div>
          
          {/* Headings */}
          <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-serif text-[#161f18] leading-[1.1] tracking-tight mb-5">
            More Than Buildings,<br/>A Brighter Abbottabad
          </h2>
          <p className="text-gray-700 text-sm md:text-base max-w-2xl leading-relaxed">
            Watch how Roman Builders is shaping communities in Abbottabad through<br className="hidden md:block" /> trust, quality construction, and a vision for a better tomorrow.
          </p>
        </div>

        {/* 3-Column Layout */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-20 mb-12">
          {/* Left Column - Icons */}
          <div className="hidden lg:flex flex-col justify-center gap-10 w-56 shrink-0 relative">
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-full bg-[#f3f1e8] flex items-center justify-center border border-[#e0ddd0] group-hover:bg-[#4a5240] group-hover:text-white transition-colors duration-300">
                   <i className="fa-solid fa-house text-lg text-[#4a5240] group-hover:text-white transition-colors"></i>
                </div>
                <div>
                   <div className="font-bold text-[#161f18] text-xl">Better</div>
                   <div className="text-base text-gray-700">Living Spaces</div>
                </div>
             </div>
             <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-full bg-[#f3f1e8] flex items-center justify-center border border-[#e0ddd0] group-hover:bg-[#4a5240] group-hover:text-white transition-colors duration-300">
                   <i className="fa-solid fa-users text-lg text-[#4a5240] group-hover:text-white transition-colors"></i>
                </div>
                <div>
                   <div className="font-bold text-[#161f18] text-xl">Stronger</div>
                   <div className="text-base text-gray-700">Communities</div>
                </div>
             </div>
             <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-full bg-[#f3f1e8] flex items-center justify-center border border-[#e0ddd0] group-hover:bg-[#4a5240] group-hover:text-white transition-colors duration-300">
                   <i className="fa-solid fa-seedling text-lg text-[#4a5240] group-hover:text-white transition-colors"></i>
                </div>
                <div>
                   <div className="font-bold text-[#161f18] text-xl">Brighter</div>
                   <div className="text-base text-gray-700">Tomorrow</div>
                </div>
             </div>
          </div>

          {/* Center Column - Video Container */}
          <div className="w-full max-w-4xl relative rounded-3xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] group shrink border-[4px] border-white/50">
             <div className="aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/8] w-full relative bg-slate-900">
               <video 
                 className="w-full h-full object-cover" 
                 src="/search_about_Prime_View_City_–.mp4" 
                 autoPlay 
                 loop 
                 muted 
                 playsInline
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>
               <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-10">
                  <div className="flex gap-3 sm:gap-4">
                     <div className="w-[2px] bg-white/70"></div>
                     <div className="text-white text-base sm:text-xl lg:text-2xl font-serif leading-tight">
                       Real Communities<br/>Real Progress
                     </div>
                  </div>
               </div>
               <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-10 flex items-end">
                 <span className="text-[7px] sm:text-[9px] font-bold tracking-[0.25em] text-white/90 uppercase drop-shadow-md">Roman Builders</span>
               </div>
             </div>
          </div>

          {/* Right Column - Quote */}
          <div className="hidden lg:flex flex-col justify-center w-48 shrink-0 relative">
             <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-[8rem] font-serif text-[#e0ddd0] opacity-50 select-none z-0 leading-none">
               “
             </div>
             <div className="relative z-10 pl-6">
                <p className="font-serif text-[#3d4435] text-[19px] leading-relaxed italic mb-4">
                  Building communities<br/>today for a<br/>brighter tomorrow.
                </p>
                <div className="w-12 h-[1px] bg-[#d5d2c5]"></div>
             </div>
          </div>
        </div>

        {/* Footer Area */}
        <div className="flex flex-col items-center mt-4">
           {/* Button */}
           <div className="flex items-center gap-4 sm:gap-6 mb-8">
             <div className="w-12 sm:w-20 h-[1px] bg-gray-300"></div>
             <Link href="/about" className="flex items-center gap-4 sm:gap-5 bg-[#4a5240] text-white pl-8 sm:pl-10 pr-2 py-2 rounded-full hover:bg-[#3d4435] transition-colors shadow-lg group">
               <span className="text-sm sm:text-base font-medium tracking-wide">Learn More</span>
               <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#4a5240] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-arrow-right text-xs sm:text-sm"></i>
               </div>
             </Link>
             <div className="w-12 sm:w-20 h-[1px] bg-gray-300"></div>
           </div>

           {/* Bottom Text */}
           <div className="text-[8px] sm:text-[9px] font-bold tracking-[0.3em] text-gray-400 uppercase">
             People • Places • Progress
           </div>
        </div>
      </div>
    </section>
  );
}
