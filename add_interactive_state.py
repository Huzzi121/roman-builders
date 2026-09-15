import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add new state variables at the top of the component
state_additions = """export default function Home() {
  const [contactStatus, setContactStatus] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState('Ongoing');
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  const processSteps = [
    {
      title: "Land Acquisition",
      icon: "fa-house",
      heading: "Developing Masterpiece Societies",
      description: "From acquiring prime land to securing complex legal NOCs and developing world-class infrastructure, we manage the entire lifecycle of housing scheme development in Hazara.",
      image: "/images/hero.jpg"
    },
    {
      title: "NOC Approvals",
      icon: "fa-calendar-check",
      heading: "Navigating Legal Complexities",
      description: "We handle all the paperwork, ensuring that every project clears TMA, EPA, and other regulatory approvals swiftly and securely.",
      image: "/images/project1.jpg"
    },
    {
      title: "Infrastructure Dev",
      icon: "fa-handshake-angle",
      heading: "Building World-Class Facilities",
      description: "Our engineering teams construct robust roads, reliable sewerage systems, and beautiful green spaces that stand the test of time.",
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
"""

content = content.replace('''export default function Home() {
  const [contactStatus, setContactStatus] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState(false);''', state_additions)


# 2. Update tabs in Popular Projects
tabs_old = r'''<div className="flex items-center space-x-2">
<button className="px-5 py-2 rounded-lg text-xs font-semibold bg-\[#0F363E\] text-white" type="button">Ongoing</button>
<button className="px-5 py-2 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors" type="button">Completed</button>
<button className="px-5 py-2 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors" type="button">Upcoming</button>
</div>'''

tabs_new = '''<div className="flex items-center space-x-2">
{['Ongoing', 'Completed', 'Upcoming'].map((tab) => (
  <button 
    key={tab}
    onClick={() => setActiveProjectTab(tab)}
    className={`px-5 py-2 rounded-lg text-xs transition-colors ${activeProjectTab === tab ? 'font-semibold bg-[#0F363E] text-white' : 'font-medium bg-slate-100 hover:bg-slate-200 text-slate-600'}`} 
    type="button">
    {tab}
  </button>
))}
</div>'''
content = re.sub(tabs_old, tabs_new, content, flags=re.DOTALL)


# 3. Update Work Process Section
process_old = r'''<div className="lg:col-span-3 flex lg:flex-col justify-around lg:justify-start gap-4" data-purpose="process-steps">
<div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/10 border border-white/10 w-full">
<div className="w-10 h-10 rounded-lg bg-\[#1D5966\] flex items-center justify-center text-sm mb-2">
<i className="fa-solid fa-house"></i>
</div>
<span className="text-\[11px\] font-medium text-white/90">Land Acquisition</span>
</div>
<div className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-white/5 border border-transparent transition-colors w-full">
<div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-sm mb-2">
<i className="fa-regular fa-calendar-check"></i>
</div>
<span className="text-\[11px\] font-medium text-white/70">NOC Approvals</span>
</div>
<div className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-white/5 border border-transparent transition-colors w-full">
<div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-sm mb-2">
<i className="fa-solid fa-handshake-angle"></i>
</div>
<span className="text-\[11px\] font-medium text-white/70">Infrastructure Dev</span>
</div>
<div className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-white/5 border border-transparent transition-colors w-full">
<div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-sm mb-2">
<i className="fa-solid fa-shield-halved"></i>
</div>
<span className="text-\[11px\] font-medium text-white/70">Plot Handover</span>
</div>
</div>
\{\/\*\s*Featured process preview card\s*\*\/\}\s*
<div className="lg:col-span-9 relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
<img alt="Modern luxury house by pool" className="w-full h-80 sm:h-96 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmDtrA6HYFGlcBPLPhyNmFjixeMUFHMlMZbBzk0RG-fjaZIkdPehgkZcr1RepjE4ns-U9E5PqNcKn7KFvcfTYmD7IC_RTE4qX7O9txBWnUnUMterjs8Cu_uGBUCRNN2ewLej3tnQjNo_aPw9nVaPs-vFw7N_dEiHCGg--HH-yYRZ7CB_qML8yKWjyB1SjQOqjVVpUK0DORxaWWPr1WFJv8w_65FUdu6nq7XZ8IxSjP0qSnf2mthtQRMw"/>
<div className="absolute inset-y-0 right-0 w-full sm:w-1/2 bg-\[#0F363E\]/85 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-center text-white">
<h3 className="text-xl font-bold mb-3">Developing Masterpiece Societies</h3>
<p className="text-xs text-white/80 leading-relaxed mb-6 font-light">
              From acquiring prime land to securing complex legal NOCs and developing world-class infrastructure, we manage the entire lifecycle of housing scheme development in Hazara.
            </p>
<div className="flex items-center justify-between text-xs pt-4 border-t border-white/20">
<span className="text-white/60 font-medium">01 <span className="text-white ml-2">Land Acquisition</span></span>
<a className="text-white hover:text-white/80 font-medium flex items-center gap-1" href="#">Next <i className="fa-solid fa-chevron-right text-\[10px\]"></i></a>
</div>
</div>
</div>'''

process_new = '''<div className="lg:col-span-3 flex lg:flex-col justify-around lg:justify-start gap-4" data-purpose="process-steps">
{processSteps.map((step, index) => (
  <button 
    key={index} 
    onClick={() => setActiveProcessStep(index)}
    className={`flex flex-col items-center text-center p-3 rounded-xl border transition-colors w-full cursor-pointer focus:outline-none ${activeProcessStep === index ? 'bg-white/10 border-white/10' : 'hover:bg-white/5 border-transparent'}`}>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm mb-2 transition-colors ${activeProcessStep === index ? 'bg-[#1D5966]' : 'bg-white/10'}`}>
      <i className={`fa-solid ${step.icon}`}></i>
    </div>
    <span className={`text-[11px] font-medium transition-colors ${activeProcessStep === index ? 'text-white' : 'text-white/70'}`}>{step.title}</span>
  </button>
))}
</div>
{/*  Featured process preview card  */}
<div className="lg:col-span-9 relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group transition-all duration-300">
<img alt={processSteps[activeProcessStep].heading} className="w-full h-80 sm:h-96 object-cover" src={processSteps[activeProcessStep].image}/>
<div className="absolute inset-y-0 right-0 w-full sm:w-1/2 bg-[#0F363E]/85 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-center text-white">
<h3 className="text-xl font-bold mb-3">{processSteps[activeProcessStep].heading}</h3>
<p className="text-xs text-white/80 leading-relaxed mb-6 font-light">
  {processSteps[activeProcessStep].description}
</p>
<div className="flex items-center justify-between text-xs pt-4 border-t border-white/20">
<span className="text-white/60 font-medium">0{activeProcessStep + 1} <span className="text-white ml-2">{processSteps[activeProcessStep].title}</span></span>
<button onClick={() => setActiveProcessStep((activeProcessStep + 1) % processSteps.length)} className="text-white hover:text-white/80 font-medium flex items-center gap-1 focus:outline-none">Next <i className="fa-solid fa-chevron-right text-[10px]"></i></button>
</div>
</div>
</div>'''

content = re.sub(process_old, process_new, content, flags=re.DOTALL)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated Work Process and Tabs with functional React state!")
