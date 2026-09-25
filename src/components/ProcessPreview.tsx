"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProcessPreview() {
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  const processSteps = [
    {
      title: "Land Acquisition",
      icon: "fa-house",
      heading: "Developing Masterpiece Societies",
      description: "From acquiring prime land to securing complex legal NOCs and developing world-class infrastructure.",
      image: "/images/hero.jpg"
    },
    {
      title: "NOC Approvals",
      icon: "fa-calendar-check",
      heading: "Navigating Legal Complexities",
      description: "We handle all the paperwork, ensuring that every project clears regulatory approvals swiftly and securely.",
      image: "/images/project1.jpg"
    },
    {
      title: "Infrastructure Dev",
      icon: "fa-handshake-angle",
      heading: "Building World-Class Facilities",
      description: "Our engineering teams construct robust roads, reliable sewerage systems, and beautiful green spaces.",
      image: "/images/project2.jpg"
    },
    {
      title: "Plot Handover",
      icon: "fa-shield-halved",
      heading: "Delivering on our Promises",
      description: "We ensure transparent, timely handover of residential plots to our investors.",
      image: "/images/project3.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProcessStep((prev) => (prev + 1) % processSteps.length);
    }, 4000); // Automatically cycle every 4 seconds
    return () => clearInterval(timer);
  }, [processSteps.length]);

  return (
    <section className="pt-10 lg:pt-14 pb-4 relative overflow-hidden" data-purpose="work-process" id="process">
      {/* Subtle decorative leaf shapes */}
      <div className="absolute top-10 left-0 w-[200px] h-[400px] bg-[#4a5240]/[0.03] rounded-r-full pointer-events-none"></div>
      <div className="absolute bottom-20 left-4 w-[120px] h-[240px] bg-[#4a5240]/[0.02] rounded-r-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#161f18] tracking-tight leading-[1.1]">
            From Land to <span className="italic">Lasting Communities</span>
          </h2>
        </div>

        <div className="bg-white/20 backdrop-blur-md border border-white/40 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative">
          <div className="flex flex-col lg:flex-row min-h-[480px] sm:min-h-[520px] lg:min-h-[560px]">
            {/* Left Sidebar - Process Steps */}
            <div className="w-full lg:w-[260px] xl:w-[280px] shrink-0 p-6 sm:p-8 lg:py-10 lg:px-6 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
              {processSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProcessStep(index)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all w-full min-w-[200px] lg:min-w-0 cursor-pointer focus:outline-none group ${
                    activeProcessStep === index
                      ? 'bg-[#4a5240] text-white shadow-lg'
                      : 'bg-white/60 text-[#1a1c19] hover:bg-white/90 border border-white/50'
                  }`}
                >
                  <span className={`text-[10px] font-bold tracking-wider shrink-0 ${
                    activeProcessStep === index ? 'text-white/50' : 'text-gray-400'
                  }`}>0{index + 1}</span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    activeProcessStep === index ? 'bg-white/20' : 'bg-[#4a5240]/10'
                  }`}>
                    <i className={`fa-solid ${step.icon} text-sm ${
                      activeProcessStep === index ? 'text-white' : 'text-[#4a5240]'
                    }`}></i>
                  </div>
                  <span className={`text-[12px] font-semibold text-left leading-tight flex-1 ${
                    activeProcessStep === index ? 'text-white' : 'text-[#1a1c19]'
                  }`}>{step.title}</span>
                  <i className={`fa-solid fa-chevron-right text-[9px] shrink-0 ${
                    activeProcessStep === index ? 'text-white/60' : 'text-gray-400'
                  }`}></i>
                </button>
              ))}
            </div>

            {/* Right Content Area */}
            <div className="flex-1 relative rounded-2xl lg:rounded-l-3xl overflow-hidden m-2 sm:m-3 lg:m-3 lg:ml-0">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    activeProcessStep === index ? 'opacity-100 z-[1]' : 'opacity-0 z-0 scale-[1.02]'
                  }`}
                >
                  <img alt={step.heading} className="w-full h-full object-cover" src={step.image}/>
                </div>
              ))}
              
              <div className="absolute inset-0 z-[2] bg-gradient-to-l from-[#2b3628]/90 via-[#2b3628]/40 to-transparent pointer-events-none"></div>

              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`absolute inset-y-0 right-0 w-full sm:w-[55%] lg:w-[48%] z-[3] p-6 sm:p-8 lg:p-10 flex flex-col justify-center transition-all duration-700 ease-out ${
                    activeProcessStep === index
                      ? 'translate-x-0 opacity-100 delay-300'
                      : 'translate-x-6 opacity-0'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[9px] font-bold tracking-[0.2em] text-white/60 uppercase">Step 0{index + 1}</span>
                    <div className="w-8 h-[1px] bg-white/30"></div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white leading-[1.15] tracking-tight mb-4">
                    {step.heading}
                  </h3>
                  <p className="text-[13px] text-white/70 leading-relaxed mb-6 max-w-[320px]">
                    {step.description}
                  </p>
                  <div>
                    <Link href="/process" className="inline-flex items-center gap-2 border border-white/30 text-white px-5 py-2.5 rounded-lg text-[12px] font-medium hover:bg-white/10 transition-colors">
                      <span>Explore Our Process</span>
                      <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </Link>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-0 left-0 right-0 z-[4] flex items-center justify-between px-5 sm:px-8 py-4 bg-gradient-to-t from-black/40 to-transparent">
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold text-sm">0{activeProcessStep + 1}</span>
                  <span className="text-white/40 text-sm font-light">/ 0{processSteps.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
