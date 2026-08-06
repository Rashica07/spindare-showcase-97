const fs = require('fs');
const file = 'C:/Users/r-oberti/Documents/GitHub/spindare-showcase-97/artifacts/portfolio/lib/i18n.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update SEO Titles
content = content.replace(/title: "Kristian Gjergji & KIQA DEV"/g, 'title: "Kristian Gjergji | Kiqa DEV | Software Engineer"');

// Update I18nProvider to read from document.cookie as well
content = content.replace(
  'const stored = localStorage.getItem("kiqa_lang") as Lang;',
  `let stored = localStorage.getItem("kiqa_lang") as Lang;
      if (!stored) {
        const match = document.cookie.match(/(^| )kiqa_lang=([^;]+)/);
        if (match) stored = match[2] as Lang;
      }`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Updated i18n successfully!');
