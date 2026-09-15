import Footer from "@/components/Footer";
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import CTASection from "@/components/CTASection";

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="relative min-h-screen">
      {/* Global Unified Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/projects-bg.png')" }}
        ></div>
      </div>
      <section className="pt-28 pb-28 md:pt-36 md:pb-36 px-6 sm:px-8 relative text-center">
        {/* Masked Background Layer */}
        <div 
          className="absolute inset-0 z-0 bg-[url('/images/about-us-hero.png')] bg-cover bg-center overflow-hidden"
          style={{ 
            maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-[url('/images/hero-bg-overlay.png')] opacity-20 mix-blend-overlay"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-white/30"></div>
            <span className="text-sm font-bold tracking-[0.25em] text-white/90 uppercase drop-shadow-md">News & Insights</span>
            <div className="w-16 h-[1px] bg-white/30"></div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 drop-shadow-lg">Latest Updates</h1>
          <p className="text-white max-w-4xl mx-auto text-base md:text-lg lg:text-xl font-light tracking-wide leading-relaxed drop-shadow-md">
            Stay informed about our latest projects, real estate trends, <br className="hidden md:block" />and news from Roman Builders & Developers.
          </p>
        </div>
      </section>

      <section className="pt-0 pb-16 px-6 sm:px-8 max-w-7xl mx-auto mb-20 -mt-6 md:-mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allPostsData.length > 0 ? allPostsData.map(({ id, date, title, excerpt, category, image }) => (
            <Link href={`/blog/${id}`} key={id} className="bg-white/20 backdrop-blur-md rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-transform duration-300 group border border-white/40 flex flex-col h-full hover:bg-white/30">
              {image && (
                <div className="w-full h-48 sm:h-56 overflow-hidden relative border-b border-white/20">
                  <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {category && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-[10px] font-bold tracking-wider text-[#161f18] uppercase">
                      {category}
                    </div>
                  )}
                </div>
              )}
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="text-xs font-semibold text-gray-800/70 mb-3">{new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                <h2 className="text-xl font-serif text-[#161f18] mb-3 leading-snug group-hover:text-white transition-colors">{title}</h2>
                <p className="text-gray-800 font-medium text-sm leading-relaxed mb-6 flex-1">{excerpt}</p>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#161f18] group-hover:text-white flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                  Read Article <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </Link>
          )) : (
            <div className="col-span-full text-center py-20 text-gray-800">
              No articles found. Check back later!
            </div>
          )}
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
