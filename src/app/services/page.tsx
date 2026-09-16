import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

export default function ServicesPage() {
  const services = [
    {
      id: "land-acquisition",
      title: "Land Acquisition & Development",
      description: "We identify and acquire prime real estate locations, focusing on long-term value, accessibility, and community potential. Our development planning ensures sustainable use of land.",
      icon: "fa-map-location-dot",
      image: "/images/land-acquisition.png"
    },
    {
      id: "legal-approvals",
      title: "Legal & NOC Approvals",
      description: "Navigating the complex landscape of real estate regulations. We handle all paperwork to secure TMA, EPA, and other necessary NOCs, guaranteeing 100% legal compliance for our investors.",
      icon: "fa-file-contract",
      image: "/images/noc.jpg"
    },
    {
      id: "infrastructure",
      title: "Infrastructure Development",
      description: "Building the backbone of modern societies. This includes laying down wide carpeted roads, underground electrification, modern sewerage systems, and reliable water supply networks.",
      icon: "fa-road",
      image: "/images/infrastructure-development.jpg"
    },
    {
      id: "project-management",
      title: "Project Management",
      description: "End-to-end oversight of real estate projects. We ensure that timelines are met, budgets are respected, and quality is never compromised from groundbreaking to handover.",
      icon: "fa-list-check",
      image: "/images/project-management.jpg"
    },
    {
      id: "construction",
      title: "Construction Services",
      description: "Delivering high-quality residential and commercial construction. We use premium materials and modern engineering practices to build structures that last generations.",
      icon: "fa-helmet-safety",
      image: "/images/construction.jpg"
    }
  ];

  return (
    <main className="relative min-h-screen">


      {/* Page Hero */}
      <section className="pt-28 pb-28 md:pt-36 md:pb-36 px-6 sm:px-8 relative text-center">
        {/* Masked Background Layer */}
        <div 
          className="absolute inset-0 z-0 bg-[url('/images/our-services.png')] bg-cover bg-center overflow-hidden"
          style={{ 
            maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-[url('/images/hero-bg-overlay.png')] opacity-20 mix-blend-overlay"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 drop-shadow-lg">What We Do</h1>
          <p className="text-white max-w-4xl mx-auto text-base md:text-lg lg:text-xl font-light tracking-wide leading-relaxed drop-shadow-md">
            Comprehensive real estate and development solutions designed <br className="hidden md:block" />to turn empty land into thriving, sustainable communities.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pt-0 pb-16 px-6 sm:px-8 max-w-7xl mx-auto mb-20 -mt-6 md:-mt-10 relative z-20">
        <div className="flex flex-col gap-12">
          {services.map((service, idx) => (
            <div key={idx} className={`group bg-white/20 backdrop-blur-md hover:bg-[#4a5240]/85 p-5 md:p-6 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40 hover:border-transparent transition-all duration-300 flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-8 items-center cursor-pointer`}>
              
              {/* Image Side */}
              <div className="w-full md:w-1/2 h-56 sm:h-64 md:h-[18rem] rounded-2xl overflow-hidden shadow-md shrink-0 relative">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              
              {/* Content Side */}
              <div className="w-full md:w-1/2 flex flex-col justify-center px-2 md:px-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/40 group-hover:bg-white/20 flex items-center justify-center text-[#4a5240] group-hover:text-white shadow-sm transition-colors duration-300">
                    <i className={`fa-solid ${service.icon} text-base`}></i>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-serif text-[#161f18] group-hover:text-white transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-gray-800 font-medium group-hover:font-normal group-hover:text-white/90 text-sm lg:text-base leading-relaxed mb-6 transition-all duration-300">
                  {service.description}
                </p>
                
                <div className="w-12 h-[2px] bg-[#4a5240]/20 group-hover:bg-white/30 transition-colors duration-300"></div>
              </div>

            </div>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
