import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add states for Carousels
state_additions = """export default function Home() {
  const [contactStatus, setContactStatus] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState('Ongoing');
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  const [projectOffset, setProjectOffset] = useState(0);
  const [teamOffset, setTeamOffset] = useState(0);
  const [testOffset, setTestOffset] = useState(0);

  const initialProjects = [
    { title: "Prime View Co-Operative Housing Society Ltd", image: "/images/project1.jpg", price: "$3200", bed: 3, bath: 2, sqft: 1400 },
    { title: "Green City Abbottabad", image: "/images/project2.jpg", price: "$3800", bed: 4, bath: 2, sqft: 1200 },
    { title: "Roman Valley Society", image: "/images/project3.jpg", price: "$3600", bed: 3, bath: 2, sqft: 1100 },
    { title: "Hazara Residencia", image: "/images/project4.jpg", price: "$3000", bed: 3, bath: 2, sqft: 950 }
  ];
  const displayProjects = [...initialProjects, ...initialProjects].slice(projectOffset, projectOffset + 4);

  const teamMembers = [
    { name: "Ali Khan", role: "Chief Architect", exp: "10 years", lang: "English, Arabic", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYkaW-o7U-ijQMSgQtIkgnYSNhJKpBtjfoyLhebbU0L2WGH9mitSExt7iTuuKjTSyc3EJe9fNRTLuVQ_yIqdRGT85ReZdORhXv_w4_zl1JNhXaYxccZjtJvjy-zMpedCBnmwiOtwUYY54Y86iMuCjQZWPYSOXArRIsftnvS-urNmmU8mpBmEIegriD3u6D0lEquH1pGKL102eUV4uCs582WWw1YAiDKxfASFfr0EUE5YIyTOBsIm8q4A" },
    { name: "Fatima Zafar", role: "Head of Construction", exp: "12 years", lang: "English, Spanish", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_EjeZTam9LiH6BiB57e0sCHCvW_KnFyh6Y1Pgl4HfhyOHiS4P_WPdoxzI_noZjLdOw4nQylTRYymJdvBbfN54_IbcS1T1zE_tK4yf_EO8JvH_UJ8bJrTckRXV8CGC44VpXMsYrIFtseSgfk2CSx0JmpJ58djs56xysioLkGI-YmeqOou6Fg9_gWi4VCKCT06hR7HfGC0-iVf7TiDjFFjc48D7OmCEf3EGrGKRrkpjraQNr1N8BN_rLw" },
    { name: "Usman Tariq", role: "Sales Director", exp: "14 years", lang: "English, French", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmTGX16Z9oLU_aUBTkOQ0BUgaYskaKsME27AKhQ2I01_R1WY2VTqqE7flXb9cwxTqOLwt5dCol7BbnivGxqq_k0mx6gixlGg8dIkYuCSk4S9vuN7NI3eCZEGaXBrAKPRJ31fameBBkp3WwweiUt-JmGRMDHIHIv4pilx7KnLGaR18IYKNrvC7fOuG-V84olL3tgQe4UKV3ef-mzeXMPeYG2raf0cq6mSGug0gfRNW2O8Qty4VicNlDxQ" }
  ];
  const displayTeam = [...teamMembers, ...teamMembers].slice(teamOffset, teamOffset + 3);

  const testimonials = [
    { name: "Ali Khan", role: "Investor", text: "Roman Builders Real Estate truly lives up to its name. They helped me find the perfect plot in a great society. The entire process was stress-free and smooth — from site visits to final paperwork." },
    { name: "Aisha Rehman", role: "Homeowner", text: "Exceptional service and dedication! They walked us through every step of building our dream home in Hazara." }
  ];

  const handleDummyClick = (e: any) => {
    e.preventDefault();
    alert("This feature will be available soon!");
  };
"""

content = content.replace('''export default function Home() {
  const [contactStatus, setContactStatus] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState('Ongoing');
  const [activeProcessStep, setActiveProcessStep] = useState(0);''', state_additions)


# 2. Update Popular Projects Cards
projects_old = r'''<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">.*?</div>\s*\{\/\*\s*Carousel arrows\s*\*\/\}\s*<div className="flex items-center justify-center space-x-3 mt-8">\s*<button className="w-8 h-8 rounded bg-\[#0F363E\]/80 hover:bg-\[#0F363E\] text-white flex items-center justify-center text-xs transition-colors">\s*<i className="fa-solid fa-arrow-left"></i>\s*</button>\s*<button className="w-8 h-8 rounded bg-\[#1D5966\] hover:bg-\[#0F363E\] text-white flex items-center justify-center text-xs transition-colors">\s*<i className="fa-solid fa-arrow-right"></i>\s*</button>\s*</div>'''

projects_new = '''<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{displayProjects.map((proj, idx) => (
  <div key={idx} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="h-44 bg-slate-200 overflow-hidden">
      <img alt={proj.title} className="w-full h-full object-cover" src={proj.image}/>
    </div>
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-slate-900">{proj.title}</h3>
        <a onClick={handleDummyClick} className="text-slate-400 hover:text-slate-700 text-xs" href="#"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
      </div>
    </div>
  </div>
))}
</div>
{/*  Carousel arrows  */}
<div className="flex items-center justify-center space-x-3 mt-8">
<button onClick={() => setProjectOffset((p) => (p - 1 + 4) % 4)} className="w-8 h-8 rounded bg-[#0F363E]/80 hover:bg-[#0F363E] text-white flex items-center justify-center text-xs transition-colors cursor-pointer focus:outline-none">
<i className="fa-solid fa-arrow-left pointer-events-none"></i>
</button>
<button onClick={() => setProjectOffset((p) => (p + 1) % 4)} className="w-8 h-8 rounded bg-[#1D5966] hover:bg-[#0F363E] text-white flex items-center justify-center text-xs transition-colors cursor-pointer focus:outline-none">
<i className="fa-solid fa-arrow-right pointer-events-none"></i>
</button>
</div>'''

content = re.sub(projects_old, projects_new, content, flags=re.DOTALL)


# 3. Update Team Cards
team_old = r'''\{\/\*\s*Team Cards Slider / Grid\s*\*\/\}\s*<div className="relative flex items-center justify-center">\s*\{\/\*\s*Left Arrow\s*\*\/\}\s*<button className="hidden md:flex absolute left-0 z-10 w-8 h-8 rounded border border-slate-300 text-slate-600 items-center justify-center hover:bg-slate-100 text-xs">\s*<i className="fa-solid fa-arrow-left"></i>\s*</button>\s*<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-0 md:px-12">.*?</div>\s*\{\/\*\s*Right Arrow\s*\*\/\}\s*<button className="hidden md:flex absolute right-0 z-10 w-8 h-8 rounded bg-\[#1D5966\] text-white items-center justify-center hover:bg-\[#0F363E\] text-xs">\s*<i className="fa-solid fa-arrow-right"></i>\s*</button>\s*</div>'''

team_new = '''{/*  Team Cards Slider / Grid  */}
<div className="relative flex items-center justify-center">
{/*  Left Arrow  */}
<button onClick={() => setTeamOffset((p) => (p - 1 + 3) % 3)} className="hidden md:flex absolute left-0 z-10 w-8 h-8 rounded border border-slate-300 text-slate-600 items-center justify-center hover:bg-slate-100 text-xs cursor-pointer focus:outline-none">
<i className="fa-solid fa-arrow-left pointer-events-none"></i>
</button>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-0 md:px-12">
{displayTeam.map((member, idx) => (
  <div key={idx} className="bg-[#0F363E] text-white rounded-xl overflow-hidden shadow-lg flex flex-col items-center pt-5 pb-4 px-4 text-center">
    <div className="w-36 h-44 rounded-lg overflow-hidden bg-slate-200 mb-4 shadow">
      <img alt={member.name} className="w-full h-full object-cover" src={member.img}/>
    </div>
    <h3 className="font-semibold text-sm">{member.name}</h3>
    <p className="text-[10px] text-white/70 mb-3">{member.role}</p>
    <div className="text-[10px] text-white/80 border-t border-white/15 pt-2 w-full space-y-0.5">
      <div>Experience: {member.exp}</div>
      <div>Language: {member.lang}</div>
    </div>
  </div>
))}
</div>
{/*  Right Arrow  */}
<button onClick={() => setTeamOffset((p) => (p + 1) % 3)} className="hidden md:flex absolute right-0 z-10 w-8 h-8 rounded bg-[#1D5966] text-white items-center justify-center hover:bg-[#0F363E] text-xs cursor-pointer focus:outline-none">
<i className="fa-solid fa-arrow-right pointer-events-none"></i>
</button>
</div>'''

content = re.sub(team_old, team_new, content, flags=re.DOTALL)


# 4. Update Testimonials Cards
# For testimonials, we only have one card displayed. The arrows are in a div at the bottom.
# Let's find that block.
test_old = r'''<blockquote className="text-xs text-white/90 leading-relaxed font-light">\s*"Roman Builders Real Estate truly lives up to its name. They helped me find the perfect plot in a great society. The entire process was stress-free and smooth — from site visits to final paperwork."\s*</blockquote>\s*\{\/\*\s*Rating Stars and Carousel Navigation\s*\*\/\}\s*<div className="flex items-center justify-between pt-2">\s*<div className="text-amber-400 text-xs flex space-x-1">\s*<i className="fa-solid fa-star"></i>\s*<i className="fa-solid fa-star"></i>\s*<i className="fa-solid fa-star"></i>\s*<i className="fa-solid fa-star"></i>\s*<i className="fa-solid fa-star"></i>\s*</div>\s*<div className="flex space-x-2">\s*<button className="w-7 h-7 rounded border border-white/20 text-white hover:bg-white/10 flex items-center justify-center text-\[10px\]">\s*<i className="fa-solid fa-arrow-left"></i>\s*</button>\s*<button className="w-7 h-7 rounded bg-\[#1D5966\] text-white flex items-center justify-center text-\[10px\]">\s*<i className="fa-solid fa-arrow-right"></i>\s*</button>\s*</div>\s*</div>'''

test_new = '''<blockquote className="text-xs text-white/90 leading-relaxed font-light">
  "{testimonials[testOffset].text}"
</blockquote>
{/*  Rating Stars and Carousel Navigation  */}
<div className="flex items-center justify-between pt-2">
  <div className="text-amber-400 text-xs flex space-x-1">
    <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
  </div>
  <div className="flex space-x-2">
    <button onClick={() => setTestOffset((p) => (p - 1 + 2) % 2)} className="w-7 h-7 rounded border border-white/20 text-white hover:bg-white/10 flex items-center justify-center text-[10px] cursor-pointer focus:outline-none">
      <i className="fa-solid fa-arrow-left pointer-events-none"></i>
    </button>
    <button onClick={() => setTestOffset((p) => (p + 1) % 2)} className="w-7 h-7 rounded bg-[#1D5966] text-white flex items-center justify-center text-[10px] cursor-pointer focus:outline-none">
      <i className="fa-solid fa-arrow-right pointer-events-none"></i>
    </button>
  </div>
</div>'''

content = re.sub(test_old, test_new, content, flags=re.DOTALL)


# 5. Make "View all", "Explore all" buttons dummy click
content = content.replace('href="#"', 'href="#" onClick={handleDummyClick}')


with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Applied interactive sliders and buttons!")
