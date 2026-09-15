const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add import
content = content.replace(
  "import { useState, useEffect } from 'react';",
  "import { useState, useEffect } from 'react';\nimport Footer from '@/components/Footer';"
);

// Replace footer
content = content.replace(
  /\{\/\*\s*BEGIN: MainFooter\s*\*\/\}[\s\S]*?\{\/\*\s*END: MainFooter\s*\*\/\}/,
  "<Footer />"
);

fs.writeFileSync('src/app/page.tsx', content);
console.log("Replacement successful");
