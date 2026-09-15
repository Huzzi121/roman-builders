import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Hero Search Bar
content = content.replace('<label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-1">Looking for</label>', '<label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-1">Project Phase</label>')
content = content.replace('placeholder="What to looking for?"', 'placeholder="e.g. Booking Open"')

content = content.replace('<option>Property type</option>\n<option>Villa</option>\n<option>Apartment</option>\n<option>Penthouse</option>', '<option>Plot Size</option>\n<option>5 Marla</option>\n<option>10 Marla</option>\n<option>1 Kanal</option>')
content = content.replace('placeholder="Price"', 'placeholder="Installment Plan"')

# 2. Update Work Process Section
content = content.replace('Discover house', 'Land Acquisition')
content = content.replace('Schedule to visit', 'NOC Approvals')
content = content.replace('Hassle-free purchase', 'Infrastructure Dev')
content = content.replace('Moneyback guarantee', 'Plot Handover')

content = content.replace('Find the Perfect House', 'Developing Masterpiece Societies')
content = content.replace('Discover homes that match your lifestyle, budget, and dreams — effortlessly. Whether you\'re buying, renting, or just exploring, we help you find the right place to call home.', 'From acquiring prime land to securing complex legal NOCs and developing world-class infrastructure, we manage the entire lifecycle of housing scheme development in Hazara.')

# 3. Neighborhood -> Expertise Areas
content = content.replace('Find Your Neighborhood', 'Our Core Expertise')
content = content.replace('Explore neighborhoods that fit your vibe — from quiet suburbs to vibrant city streets. Discover schools, parks, safety, and community, all in one place.', 'We specialize in transforming raw land into legally approved, fully developed co-operative housing societies with modern amenities.')
# Change Neighborhood Names
content = content.replace('Mandian, Florence', 'Master Planning')
content = content.replace('Nawan Shehr, Paris', 'Legal & NOCs')
content = content.replace('PMA Kakul, Vienna', 'Road Infrastructure')
content = content.replace('Jhangi, Barcelona', 'Sewerage & Utilities')
content = content.replace('Bilal Town, Rome', 'Parks & Landscaping')

# 4. News Section
content = content.replace('Read Our News', 'Development Insights')
content = content.replace('Rental Market Update: Best Investment Zones of the Year', 'Navigating TMA Approvals: A Guide for Developers')

# 5. Interactive Forms (Contact Form)
contact_form_old = r'''<form className="space-y-3" onSubmit=\{\(e\) => e\.preventDefault\(\)\}>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
<input className="w-full bg-white text-slate-800 text-xs px-3\.5 py-2\.5 rounded border-0 placeholder-slate-400 focus:ring-2 focus:ring-\[#0F363E\]" placeholder="First name" type="text"/>
<input className="w-full bg-white text-slate-800 text-xs px-3\.5 py-2\.5 rounded border-0 placeholder-slate-400 focus:ring-2 focus:ring-\[#0F363E\]" placeholder="Last name" type="text"/>
</div>
<input className="w-full bg-white text-slate-800 text-xs px-3\.5 py-2\.5 rounded border-0 placeholder-slate-400 focus:ring-2 focus:ring-\[#0F363E\]" placeholder="Buy property" type="text"/>
<textarea className="w-full bg-white text-slate-800 text-xs px-3\.5 py-2\.5 rounded border-0 placeholder-slate-400 focus:ring-2 focus:ring-\[#0F363E\]" placeholder="Notes" rows=\{3\}></textarea>
<button className="w-full bg-\[#0F363E\] text-white text-xs font-semibold py-2\.5 rounded hover:bg-black/40 transition-colors mt-2" type="submit">
            Submit
          </button>
</form>'''

contact_form_new = '''{contactStatus ? (
  <div className="bg-green-500/20 border border-green-500/50 text-white p-4 rounded-lg text-sm font-medium text-center">
    Thank you for your inquiry. Our team will contact you shortly!
  </div>
) : (
  <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setContactStatus(true); }}>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
  <input required className="w-full bg-white text-slate-800 text-xs px-3.5 py-2.5 rounded border-0 placeholder-slate-400 focus:ring-2 focus:ring-[#0F363E]" placeholder="First name" type="text"/>
  <input required className="w-full bg-white text-slate-800 text-xs px-3.5 py-2.5 rounded border-0 placeholder-slate-400 focus:ring-2 focus:ring-[#0F363E]" placeholder="Last name" type="text"/>
  </div>
  <input required className="w-full bg-white text-slate-800 text-xs px-3.5 py-2.5 rounded border-0 placeholder-slate-400 focus:ring-2 focus:ring-[#0F363E]" placeholder="Inquiry Type (e.g., NOC Consultation)" type="text"/>
  <textarea className="w-full bg-white text-slate-800 text-xs px-3.5 py-2.5 rounded border-0 placeholder-slate-400 focus:ring-2 focus:ring-[#0F363E]" placeholder="Project Details / Notes" rows={3}></textarea>
  <button className="w-full bg-[#0F363E] text-white text-xs font-semibold py-2.5 rounded hover:bg-black/40 transition-colors mt-2" type="submit">
              Submit Request
            </button>
  </form>
)}'''

content = re.sub(contact_form_old, contact_form_new, content, flags=re.DOTALL)

# 6. Interactive Newsletter
newsletter_old = r'''<form className="flex w-full sm:w-auto max-w-md gap-2" onSubmit=\{\(e\) => e\.preventDefault\(\)\}>
<input className="w-full sm:w-64 bg-white text-slate-800 text-xs px-4 py-2 rounded border-0 placeholder-slate-400 focus:ring-1 focus:ring-\[#1D5966\]" placeholder="Enter your email" type="email"/>
<button className="bg-\[#1D5966\] text-white text-xs font-medium px-4 py-2 rounded hover:bg-\[#256e7e\] transition-colors whitespace-nowrap" type="submit">
          Subscribe Now
        </button>
</form>'''

newsletter_new = '''{newsletterStatus ? (
  <div className="text-white text-sm font-medium bg-green-500/20 px-4 py-2 rounded border border-green-500/50">
    Subscribed successfully!
  </div>
) : (
<form className="flex w-full sm:w-auto max-w-md gap-2" onSubmit={(e) => { e.preventDefault(); setNewsletterStatus(true); }}>
<input required className="w-full sm:w-64 bg-white text-slate-800 text-xs px-4 py-2 rounded border-0 placeholder-slate-400 focus:ring-1 focus:ring-[#1D5966]" placeholder="Enter your email" type="email"/>
<button className="bg-[#1D5966] text-white text-xs font-medium px-4 py-2 rounded hover:bg-[#256e7e] transition-colors whitespace-nowrap" type="submit">
          Subscribe Now
        </button>
</form>
)}'''

content = re.sub(newsletter_old, newsletter_new, content, flags=re.DOTALL)

# 7. Add useState hook
if "import { useState } from 'react';" not in content:
    content = content.replace('"use client";', '"use client";\nimport { useState } from \'react\';')

if "const [contactStatus, setContactStatus] = useState(false);" not in content:
    content = content.replace('export default function Home() {\n  return (', 'export default function Home() {\n  const [contactStatus, setContactStatus] = useState(false);\n  const [newsletterStatus, setNewsletterStatus] = useState(false);\n\n  return (')

# 8. Interactive Hero Search Button
search_btn_old = r'''<button className="w-full bg-\[#0F363E\] hover:bg-\[#1D5966\] text-white rounded-lg text-xs font-semibold py-2\.5 px-4 flex items-center justify-center gap-2 transition-colors" type="submit">
<i className="fa-solid fa-magnifying-glass text-xs"></i>
<span>Search</span>
</button>'''

search_btn_new = '''<button onClick={(e) => { e.preventDefault(); alert('Search functionality will connect to the project database!'); }} className="w-full bg-[#0F363E] hover:bg-[#1D5966] text-white rounded-lg text-xs font-semibold py-2.5 px-4 flex items-center justify-center gap-2 transition-colors" type="button">
<i className="fa-solid fa-magnifying-glass text-xs"></i>
<span>Search</span>
</button>'''
content = re.sub(search_btn_old, search_btn_new, content, flags=re.DOTALL)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Site overhaul applied!")
