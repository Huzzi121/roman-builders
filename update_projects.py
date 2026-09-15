import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Change section title
content = content.replace('Popular Property', 'Popular Projects')

# 2. Change subtitle for the section
content = content.replace('homes and commercial spaces our clients love. These premium properties combine prime locations, modern design, and unmatched comfort', 'housing societies our clients love. These premium projects combine prime locations, modern urban planning, and unmatched lifestyle')

# 3. Change filter buttons
content = content.replace('>Residential<', '>Ongoing<')
content = content.replace('>Commercial<', '>Completed<')
content = content.replace('>Apartment<', '>Upcoming<')

# 4. Change project titles
content = content.replace('Villa vurundal', 'Prime View Co-Operative Housing Society Ltd')
content = content.replace('Villa sakura', 'Green City Abbottabad')
content = content.replace('Villa Zuiderpark', 'Roman Valley Society')
content = content.replace('Villa Archetype', 'Hazara Residencia')

# 5. Remove pricing and features
# The pricing div looks like: <div className="text-xs font-bold text-[#0F363E]">$...</div>
# The features div looks like: <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">...</div>
# We can remove them using regex

# Regex to remove pricing div
content = re.sub(r'<div className="text-xs font-bold text-\[#0F363E\]">\$[0-9]+<span className="text-\[10px\] text-slate-400 font-normal">/Night</span></div>\s*', '', content)

# Regex to remove features div
content = re.sub(r'<div className="pt-2 border-t border-slate-100 flex items-center justify-between text-\[11px\] text-slate-500">\s*<span>.*?</span>\s*<span>.*?</span>\s*<span>.*?</span>\s*</div>\s*', '', content, flags=re.DOTALL)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated Popular Projects section.")
