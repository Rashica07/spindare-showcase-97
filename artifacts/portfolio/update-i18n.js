const fs = require('fs');
const file = 'C:/Users/r-oberti/Documents/GitHub/spindare-showcase-97/artifacts/portfolio/lib/i18n.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/h1Line3: "Fixed price,",\s*h1Line4: "agreed upfront.",/g, 'h1Line3: "Fixed-price development without compromises.",\n      h1Line4: "Guaranteed delivery dates.",');

content = content.replace(/h1Line3: "Prezzo fisso,",\s*h1Line4: "concordato in anticipo.",/g, 'h1Line3: "Sviluppo a prezzo fisso senza compromessi.",\n      h1Line4: "Date di consegna garantite.",');

content = content.replace(/h1Line3: "Çmim fiks,",\s*h1Line4: "dakordësuar paraprakisht.",/g, 'h1Line3: "Zhvillim me çmim fiks pa kompromise.",\n      h1Line4: "Data dorëzimi të garantuara.",');

content = content.replace(/h1Line3: "Festpreis,",\s*h1Line4: "vorab vereinbart.",/g, 'h1Line3: "Festpreis-Entwicklung ohne Kompromisse.",\n      h1Line4: "Garantierte Liefertermine.",');

const appendSeoEn = `    footer: {
      tagline: "Freelance developer based in Kosovo. I design, build, and ship complete digital products.",
      tos: "Terms of Service",
      privacy: "Privacy Policy"
    },
    seo: {
      title: "Kristian Gjergji & KIQA DEV",
      desc: "Freelance developer building mobile apps, landing pages, and web platforms. Fixed-price development without compromises. Guaranteed delivery dates."
    }
  },`;

content = content.replace(/    footer: \{\s*tagline: "Freelance developer based in Kosovo. I design, build, and ship complete digital products."\s*\}\s*\},/g, appendSeoEn);

const appendSeoIt = `    footer: {
      tagline: "Sviluppatore freelance in Kosovo. Progetto, sviluppo e rilascio prodotti digitali completi.",
      tos: "Termini di Servizio",
      privacy: "Informativa sulla Privacy"
    },
    seo: {
      title: "Kristian Gjergji & KIQA DEV",
      desc: "Sviluppatore freelance che crea app mobili, landing page e piattaforme web. Sviluppo a prezzo fisso senza compromessi. Date di consegna garantite."
    }
  },`;
  
content = content.replace(/    footer: \{\s*tagline: "Sviluppatore freelance in Kosovo. Progetto, sviluppo e rilascio prodotti digitali completi."\s*\}\s*\},/g, appendSeoIt);

const appendSeoSq = `    footer: {
      tagline: "Zhvillues i pavarur në Kosovë. Projektoj, ndërtoj dhe lançoj produkte digjitale të plota.",
      tos: "Kushtet e Shërbimit",
      privacy: "Politika e Privatësisë"
    },
    seo: {
      title: "Kristian Gjergji & KIQA DEV",
      desc: "Zhvillues i pavarur për aplikacione mobile, faqe prezantuese dhe platforma web. Zhvillim me çmim fiks pa kompromise. Data dorëzimi të garantuara."
    }
  },`;
content = content.replace(/    footer: \{\s*tagline: "Zhvillues i pavarur në Kosovë. Projektoj, ndërtoj dhe lançoj produkte digjitale të plota."\s*\}\s*\},/g, appendSeoSq);

const appendSeoDe = `    footer: {
      tagline: "Freelance-Entwickler im Kosovo. Ich entwerfe, baue und veröffentliche komplette digitale Produkte.",
      tos: "Nutzungsbedingungen",
      privacy: "Datenschutzerklärung"
    },
    seo: {
      title: "Kristian Gjergji & KIQA DEV",
      desc: "Freelance-Entwickler für mobile Apps, Landing Pages und Web-Plattformen. Festpreis-Entwicklung ohne Kompromisse. Garantierte Liefertermine."
    }
  }`;
content = content.replace(/    footer: \{\s*tagline: "Freelance-Entwickler im Kosovo. Ich entwerfe, baue und veröffentliche komplette digitale Produkte."\s*\}\s*\}/g, appendSeoDe);

content = content.replace(
  'const finalT = merged[lang];',
  `const finalT = merged[lang];
  
  useEffect(() => {
    document.documentElement.lang = lang;
    if ((finalT as any).seo) {
      document.title = (finalT as any).seo.title;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', (finalT as any).seo.desc);
      } else {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        metaDesc.setAttribute('content', (finalT as any).seo.desc);
        document.head.appendChild(metaDesc);
      }
    }
  }, [lang, finalT]);`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Updated i18n successfully!');
