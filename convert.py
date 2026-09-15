import re

def convert_to_jsx(html_content):
    # Remove HTML, HEAD, BODY wrapping
    # Extract only what is inside <body>
    body_match = re.search(r'<body[^>]*>(.*)</body>', html_content, re.DOTALL | re.IGNORECASE)
    if not body_match:
        return ""
    
    content = body_match.group(1)
    
    # Replace class= with className=
    content = content.replace('class=', 'className=')
    
    # Replace for= with htmlFor=
    content = content.replace('for=', 'htmlFor=')
    
    # Self-close input and img and br tags that aren't closed
    # Using simple regex for a quick script
    content = re.sub(r'<img([^>]*?)(?<!/)>', r'<img\1/>', content)
    content = re.sub(r'<input([^>]*?)(?<!/)>', r'<input\1/>', content)
    content = re.sub(r'<br([^>]*?)(?<!/)>', r'<br\1/>', content)
    
    # Convert inline styles
    def style_replacer(match):
        style_str = match.group(1)
        styles = style_str.split(';')
        style_obj = {}
        for s in styles:
            if not s.strip():
                continue
            k, v = s.split(':', 1)
            k = k.strip()
            v = v.strip()
            # camelCase key
            parts = k.split('-')
            k_camel = parts[0] + ''.join(x.capitalize() for x in parts[1:])
            style_obj[k_camel] = v
        # format back to string
        dict_str = ", ".join(f"'{k}': '{v}'" for k, v in style_obj.items())
        return f"style={{{{{dict_str}}}}}"
        
    content = re.sub(r'style="([^"]*)"', style_replacer, content)
    
    # Fix inline comments. HTML comments <!-- --> need to be JSX comments {/* */}
    content = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', content, flags=re.DOTALL)
    
    return content

with open("code.html", "r", encoding="utf-8") as f:
    html_content = f.read()

jsx = convert_to_jsx(html_content)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write('export default function Home() {\n  return (\n    <main>\n')
    f.write(jsx)
    f.write('\n    </main>\n  );\n}\n')
