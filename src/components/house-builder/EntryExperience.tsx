'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function EntryExperience() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Option A — Build Your House */}
        <Link
          href="/build-your-house"
          className="group bg-[#fcfaf5]/95 backdrop-blur-md rounded-3xl border border-[#dfd2ba]/80 overflow-hidden shadow-[0_18px_45px_rgba(61,68,53,0.1)] hover:shadow-[0_24px_60px_rgba(61,68,53,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
        >
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-[#3d4435]">
            <Image
              src="/images/expertise-house.jpg"
              alt="Custom 3D House Design Preview"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161f18]/80 via-[#161f18]/20 to-transparent"></div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#161f18] text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-sm">
              Standalone Configurator
            </div>
            <div className="absolute bottom-4 left-5 right-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#dfd2ba]">
                Option A
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white mt-0.5">
                Build Your House
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow gap-5">
            <p className="text-gray-700 text-sm leading-relaxed">
              Design your dream home from the ground up. Customize architecture, materials, floors and exterior features.
            </p>
            <div className="flex flex-wrap gap-2">
              {['4 Plot Sizes', '3 Architectural Styles', '3D & Floor Plans'].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium bg-[#f4efe4] text-[#3d4435] border border-[#dfd2ba]/60 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="inline-flex items-center justify-center gap-2.5 bg-[#4a5240] group-hover:bg-[#3d4435] text-white font-semibold py-3.5 px-6 rounded-xl text-sm shadow-md transition-colors">
              <span>Start Building in 3D</span>
              <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>
        </Link>

        {/* Option B — Explore Society */}
        <Link
          href="/explore-society"
          className="group bg-[#fcfaf5]/95 backdrop-blur-md rounded-3xl border border-[#dfd2ba]/80 overflow-hidden shadow-[0_18px_45px_rgba(61,68,53,0.1)] hover:shadow-[0_24px_60px_rgba(61,68,53,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
        >
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-[#161f18]">
            <Image
              src="/images/prime-view-showcase.jpg"
              alt="3D Residential Society Master Plan Preview"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161f18]/85 via-[#161f18]/25 to-transparent"></div>
            <div className="absolute top-4 left-4 bg-[#9d783e] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-sm">
              Interactive 3D Master Plan
            </div>
            <div className="absolute bottom-4 left-5 right-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#dfd2ba]">
                Option B
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white mt-0.5">
                Explore Society
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow gap-5">
            <p className="text-gray-700 text-sm leading-relaxed">
              Discover the community, explore streets and select the perfect location for your dream home.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Day & Night Modes', 'Street View Walk', 'Plot Selection → HouseCraft'].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium bg-[#f4efe4] text-[#3d4435] border border-[#dfd2ba]/60 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="inline-flex items-center justify-center gap-2.5 bg-[#3d4435] group-hover:bg-[#161f18] text-white font-semibold py-3.5 px-6 rounded-xl text-sm shadow-md transition-colors">
              <i className="fa-solid fa-city text-xs text-[#dfd2ba]"></i>
              <span>Explore 3D Society</span>
              <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

