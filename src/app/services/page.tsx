import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

export default function ServicesPage() {
  const services = [
    {
      id: "land-acquisition",
      title: "Land Acquisition & Development",
      description: "We identify and acquire prime real estate locations, focusing on long-term value, accessibility, and community potential. Our development planning ensures sustainable use of land.",
      icon: "fa-map-location-dot",
      image: "/images/land-acquisition.jpg"
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
      {/* Global Unified Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/projects-bg.png')" }}
        ></div>
      </div>

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
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-white/30"></div>
            <span className="text-sm font-bold tracking-[0.25em] text-white/90 uppercase drop-shadow-md">What We Do</span>
            <div className="w-16 h-[1px] bg-white/30"></div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 drop-shadow-lg">Our Services</h1>
          <p className="text-white max-w-4xl mx-auto text-base md:text-lg lg:text-xl font-light tracking-wide leading-relaxed drop-shadow-md">
            Comprehensive real estate and development solutions designed <br className="hidden md:block" />to turn empty land into thriving, sustainable communities.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pt-0 pb-16 px-6 sm:px-8 max-w-7xl mx-auto mb-20 -mt-6 md:-mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <div key={idx} className="group bg-white/20 backdrop-blur-md hover:bg-[#4a5240]/85 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40 hover:border-transparent hover:-translate-y-2 transition-all duration-300 flex flex-col h-full cursor-pointer">
              <div className="w-full h-48 sm:h-52 rounded-2xl overflow-hidden shadow-sm shrink-0">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <div className="w-14 h-14 bg-[#e8e5da] group-hover:bg-[#3d4435] text-[#4a5240] group-hover:text-white rounded-2xl flex items-center justify-center -mt-7 ml-4 relative z-10 border-[3px] border-white/50 shadow-md mb-4 shrink-0 transition-colors duration-300">
                <i className={`fa-solid ${service.icon} text-xl`}></i>
              </div>
              <h3 className="text-xl font-serif text-[#161f18] group-hover:text-white mb-3 transition-colors duration-300">{service.title}</h3>
              <p className="text-gray-800 font-medium group-hover:font-normal group-hover:text-white/90 text-sm leading-relaxed mb-6 transition-all duration-300">
                {service.description}
              </p>
              <div className="w-12 h-[2px] bg-[#4a5240]/20 group-hover:bg-white/20 mt-auto transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
