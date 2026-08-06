const fs = require('fs');
const file = 'C:/Users/r-oberti/Documents/GitHub/spindare-showcase-97/artifacts/portfolio/lib/i18n.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/h1Line3: "Fixed-price development without compromises.",\s*h1Line4: "Guaranteed delivery dates.",/g, 'h1Line3: "Fixed price,",\n      h1Line4: "agreed upfront.",');
content = content.replace(/h1Line3: "Sviluppo a prezzo fisso senza compromessi.",\s*h1Line4: "Date di consegna garantite.",/g, 'h1Line3: "Prezzo fisso,",\n      h1Line4: "concordato in anticipo.",');
content = content.replace(/h1Line3: "Zhvillim me çmim fiks pa kompromise.",\s*h1Line4: "Data dorëzimi të garantuara.",/g, 'h1Line3: "Çmim fiks,",\n      h1Line4: "dakordësuar paraprakisht.",');
content = content.replace(/h1Line3: "Festpreis-Entwicklung ohne Kompromisse.",\s*h1Line4: "Garantierte Liefertermine.",/g, 'h1Line3: "Festpreis,",\n      h1Line4: "vorab vereinbart.",');

fs.writeFileSync(file, content, 'utf8');
console.log('Reverted hero titles!');
