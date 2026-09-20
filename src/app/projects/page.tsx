import Footer from "@/components/Footer";
import Link from 'next/link';
import Image from 'next/image';
import CTASection from "@/components/CTASection";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0; // Opt out of static rendering

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projectsData, error } = await supabase
    .from('projects')
    .select('*')
    .or('publication_status.eq.Published,publication_status.is.null')
    .order('display_order', { ascending: true });

  const projects = projectsData || [];

  return (
    <main className="relative min-h-screen">


      {/* Page Hero */}
      <section className="pt-28 pb-28 md:pt-36 md:pb-36 px-6 sm:px-8 relative text-center">
        {/* Masked Background Layer */}
        <div 
          className="absolute inset-0 z-0 bg-[url('/images/construction-image.png')] bg-cover bg-center overflow-hidden"
          style={{ 
            maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)"
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-[url('/images/hero-bg-overlay.png')] opacity-20 mix-blend-overlay"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 drop-shadow-lg">Projects</h1>
          <p className="text-white max-w-4xl mx-auto text-base md:text-lg lg:text-xl font-light tracking-wide leading-relaxed drop-shadow-md">
            Discover our portfolio of premium real estate developments, designed to <br className="hidden md:block" />elevate lifestyles and build thriving communities across Hazara.
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section className="pt-0 pb-16 px-6 sm:px-8 max-w-7xl mx-auto space-y-20 -mt-6 md:-mt-10 relative z-20">
        {projects.map((project: any, index: number) => (
          <div key={project.id} className={`flex flex-col lg:flex-row gap-10 items-center p-6 md:p-10 lg:p-12 rounded-[3rem] border-2 border-white/70 bg-white/30 shadow-sm backdrop-blur-sm ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative h-[350px] lg:h-[450px] rounded-3xl overflow-hidden shadow-lg group bg-gray-100">
              <Image 
                src={project.image_url} 
                alt={project.title} 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={index === 0}
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${project.status === 'Now Selling' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
                <span className="text-[10px] font-bold tracking-wider text-[#161f18] uppercase">{project.status}</span>
              </div>
            </div>
            
            {/* Content Side */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <i className="fa-solid fa-location-dot text-sm text-[#4a5240]"></i>
                <span className="text-sm font-medium">{project.location}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#161f18] mb-4 leading-tight">{project.title}</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">{project.description}</p>
              
              <div className="grid grid-cols-2 gap-y-4 mb-10">
                {project.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <i className="fa-solid fa-circle-check text-[#4a5240] text-sm"></i>
                    <span className="text-sm text-[#1a1c19] font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {project.link !== '#' ? (
                <Link href={project.link} className="inline-flex items-center gap-3 bg-[#4a5240] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#3d4435] transition-all self-start shadow-md group">
                  <span>View Project Details</span>
                  <i className="fa-solid fa-arrow-right text-[11px] group-hover:translate-x-1 transition-transform"></i>
                </Link>
              ) : (
                <button disabled className="inline-flex items-center gap-3 bg-gray-300 text-gray-500 px-8 py-3 rounded-full text-sm font-medium self-start cursor-not-allowed">
                  <span>Coming Soon</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
