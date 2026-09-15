const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/about/page.tsx',
  'src/app/projects/page.tsx',
  'src/app/projects/prime-view/page.tsx',
  'src/app/services/page.tsx',
  'src/app/process/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/blog/page.tsx',
  'src/app/blog/[slug]/page.tsx'
];

filesToUpdate.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Add import if not exists
    if (!content.includes('import Footer')) {
      content = 'import Footer from "@/components/Footer";\n' + content;
    }
    
    // Add <Footer /> before </main>
    if (!content.includes('<Footer />')) {
      content = content.replace('</main>', '  <Footer />\n    </main>');
      fs.writeFileSync(fullPath, content);
      console.log(`Updated ${file}`);
    }
  } else {
    console.log(`Not found: ${file}`);
  }
});
