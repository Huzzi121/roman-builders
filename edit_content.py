import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace Havnex instances
content = content.replace("Havnex", "Roman Builders")

# Replace Hero title
content = content.replace("Discover Where<br/>Life Begins", "Building Your Future<br/>in Abbottabad")

# Replace Hero subtitle
content = content.replace("Browse thousands of trusted listings and unlock the door to your perfect home — whether buying, renting, or investing.", "Your trusted partners in land development, architecture, and cooperative housing society management in Hazara Division.")

# Replace Video Section description
content = content.replace("Roman Builders is a modern, trusted real estate company offering stylish, secure, and well-located homes and commercial spaces. We turn your dream lifestyle into reality with smart, elegant solutions.", "Roman Builders & Developers is a premier real estate and construction firm in Abbottabad offering transparent society administration, architecture, interior design, and robust construction services.")
content = content.replace("What is Roman Builders?", "Who are Roman Builders?")

# Write back
with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated page.tsx content.")
