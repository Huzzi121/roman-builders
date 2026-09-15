with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    "Florence": "Mandian",
    "Vienna": "Jhangi",
    "Barcelona": "PMA Kakul",
    "Paris": "Nawan Shehr",
    "Rome": "Bilal Town",
    "Toronto Townhouse": "Abbottabad Townhouse",
    "Devon Lane": "Ali Khan",
    "Theresa Webb": "Fatima Zafar",
    "Eleanor Pena": "Usman Tariq",
    "Head of plan": "Chief Architect",
    "Head of secondary": "Head of Construction",
    "Senior sales manager": "Sales Director",
}

for k, v in replacements.items():
    content = content.replace(k, v)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated locations and names.")
