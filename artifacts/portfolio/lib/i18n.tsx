'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "it" | "sq" | "de";

export const translations = {
  en: {
    nav: { home: "Home", services: "Services", portfolio: "Work", blog: "Writing", about: "About", contact: "Contact", quote: "Start a Project" },
    hero: {
      badge: "Available for new projects · Kosovo / Italy",
      h1Line1: "I build digital products",
      h1Line2: "your customers",
      h1Line3: "actually use —",
      h1Line4: "and come back to.",
      sub: "I take ideas from a conversation to a live product. Apps, websites, and online platforms — built to perform, delivered on time, no surprises.",
      cta1: "Tell me about your project",
      cta2: "See my work",
      available: "Taking on new projects from August 2026"
    },
    services: {
      label: "Services",
      title: "Clear price. Clear scope. Done.",
      sub: "No hidden costs, no delays, no middlemen. Every project comes with a fixed price and a delivery date I stand behind.",
      items: [
        {
          name: "Mobile App",
          tagline: "Your idea, live on the App Store and Google Play in 6 weeks.",
          price: "From €799",
          timeline: "6 weeks",
          desc: "I build your app from start to finish — design, development, and submission to both stores. One fixed price, one point of contact, six weeks.",
          features: ["React Native", "iOS & Android", "Supabase", "App Store & Play Store submission", "Push notifications", "30-day support after launch"]
        },
        {
          name: "Landing Page",
          tagline: "A website that makes people stop and pay attention — in 7 days.",
          price: "From €299",
          timeline: "7 days",
          desc: "A fast, good-looking page built to turn visitors into customers. Delivered in 7 days, ready to generate leads from day one.",
          features: ["Next.js", "3D visuals & animations", "Optimised for search engines", "Fast load on all devices", "Vercel + Cloudflare", "Ready for a content system"]
        },
        {
          name: "Web Platform",
          tagline: "A full product on the web — accounts, payments, dashboards — in 3 weeks.",
          price: "From €1,299",
          timeline: "3 weeks",
          desc: "Everything your business needs in one product: user accounts, payments, dashboards, and more. Built to handle real usage from day one.",
          features: ["Next.js", "Supabase / PostgreSQL", "User accounts & login", "Admin dashboard", "Live data updates", "Deployment included"]
        },
        {
          name: "Custom Backend",
          tagline: "The foundation your product needs — built in 2 weeks.",
          price: "From €499",
          timeline: "2 weeks",
          desc: "A solid, reliable backbone for your app or website. Built to scale as your business grows, with full documentation handed over at the end.",
          features: ["Node.js", "PostgreSQL", "Login & user management", "File storage", "Live data sync", "Full documentation"]
        }
      ]
    },
    work: {
      label: "Selected Work",
      title: "Real projects. Real results.",
      projects: [
        {
          name: "Spindare",
          type: "Mobile",
          status: "In Development",
          year: "2025–2026",
          desc: "A social app where users earn rewards for their daily habits. I led the entire product — from the first screen to launch preparation. Shipping on iOS this September.",
          stack: ["React Native", "TypeScript", "Supabase", "Clerk", "Expo"]
        },
        {
          name: "TravelMe",
          type: "Mobile",
          status: "Coming Soon",
          year: "2026",
          desc: "An app that plans your entire trip from a single message. Tell it where you want to go and what you're into, and it handles everything else.",
          stack: ["React Native", "OpenAI API", "Node.js", "MongoDB"]
        },
        {
          name: "KIQA DEV",
          type: "Web",
          status: "Live",
          year: "2026",
          desc: "This site — built in four languages, with smooth animations and a 3D background. Designed to get clients to reach out.",
          stack: ["Next.js", "TypeScript", "Three.js", "Framer Motion"]
        }
      ]
    },
    stats: [
      { value: "150k+", label: "Lines written for live products" },
      { value: "3+", label: "Years building professionally" },
      { value: "4", label: "Languages spoken" },
      { value: "6wk", label: "From idea to App Store" }
    ],
    process: {
      label: "How it works",
      title: "Simple from start to finish",
      steps: [
        { n: "01", title: "We talk", desc: "A 30-minute call to understand what you need, when you need it, and what a good result looks like. No commitment." },
        { n: "02", title: "You get a proposal", desc: "A written breakdown — what I'll build, what it costs, and when it'll be done. In your inbox within 24 hours." },
        { n: "03", title: "I build it", desc: "Regular updates, early previews, and a direct line to me throughout. You're never left wondering." },
        { n: "04", title: "You go live", desc: "Your product launches. I hand over everything — code, accounts, documentation — plus 30 days of support." }
      ]
    },
    testimonials: [
      { quote: "Kristian delivered our landing page in under a week. Clean work, zero revisions, and clear communication throughout. Rare for any developer, let alone one this young.", name: "Marco V.", role: "Startup founder", location: "Milan, Italy" },
      { quote: "Working with Kiqa on Spindare has been impressive. He approaches every problem with discipline and care that usually takes years to develop.", name: "Biba W.", role: "Co-founder, Spindare", location: "Kosovo" },
      { quote: "He built a full booking and payments flow for my business in two weeks. Payments, email notifications, everything. Agencies I've worked with couldn't get close.", name: "Luca R.", role: "Business owner", location: "Lecco, Italy" }
    ],
    funnel: {
      label: "Start a Project",
      title: "Tell me about your project",
      sub: "Fill in the form below and I'll come back to you with a clear plan within 24 hours.",
      fields: {
        name: "Your name", namePh: "Your full name",
        email: "Business email", emailPh: "you@company.com",
        company: "Company or project name", companyPh: "Acme Ltd or your project name",
        service: "What do you need?",
        serviceOptions: ["Mobile App", "Landing Page", "Web Platform", "Custom Backend", "Not sure yet — let's talk"],
        budget: "Budget",
        budgetOptions: ["Under €500", "€500 – €1,500", "€1,500 – €3,000", "€3,000+", "Not sure yet"],
        timeline: "When do you need it?",
        timelineOptions: ["As soon as possible", "Within a month", "2–3 months", "No rush"],
        description: "Tell me about the project",
        descriptionPh: "What are you building, who is it for, and what does success look like for you?",
        submit: "Send my project brief",
        submitting: "Sending..."
      },
      success: { title: "Got it — I'll be in touch.", sub: "I'll review your brief and send you a clear proposal within 24 hours." }
    },
    about: {
      label: "About",
      title: "Kristian Gjergji",
      sub: "Developer · Builder · Founder",
      bio: [
        "I'm a self-employed developer based between Kosovo and Italy. I build mobile apps, websites, and web platforms for startups and business owners who need things done properly — and on time.",
        "Right now I'm co-leading product development on Spindare, a social app with hundreds of screens and a launch on iOS planned for September 2026.",
        "Through KIQA DEV, I work directly with founders and business owners — handling everything from the first design to going live — so they don't have to manage multiple agencies or freelancers."
      ],
      skills: [
        { name: "Mobile", items: ["React Native", "Expo", "iOS / Android", "EAS Build", "App Store Deployment"] },
        { name: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
        { name: "Backend & Data", items: ["Supabase", "PostgreSQL", "Node.js", "REST APIs", "Real-time sync"] },
        { name: "Tools", items: ["Git", "Vercel", "Cloudflare", "Figma", "Stream Chat"] }
      ],
      experience: [
        { year: "2025–Now", role: "Co-Founder & Lead Developer — Spindare", desc: "Leading the full product build for a social rewards app — hundreds of screens, a full design system, and a launch date in September 2026." },
        { year: "2024–Now", role: "Founder — KIQA DEV", desc: "Running my own development practice. Working directly with startups and business owners across Italy and beyond." },
        { year: "2022–Now", role: "Self-Taught Developer", desc: "Started from zero in 2022. Spent three years building real products — not tutorials." }
      ],
      values: [
        { title: "I build, not just plan", desc: "I'd rather put something real in front of you in two weeks than spend months planning the perfect version." },
        { title: "I deliver on time", desc: "A deadline is a deadline. I've never shipped late and I don't plan to start." },
        { title: "I keep it simple", desc: "Clean solutions beat clever ones. I build things that are easy to understand, maintain, and grow." },
        { title: "I see it through", desc: "Once I take on a project, I see it to the end. You'll never wonder where I am." }
      ]
    },
    blog: {
      label: "Writing",
      title: "Notes from the work",
      sub: "Real stories from projects I've worked on — what went wrong, what worked, and what I'd do differently.",
      readMore: "Read post",
      minRead: "min read",
      categories: ["All", "React Native", "Architecture", "Backend", "Design"],
      posts: [
        { slug: "flatlist-memory-leak", category: "React Native", title: "How I fixed a memory leak that was crashing Spindare's social feed", excerpt: "The feed was slowing to a halt after a few minutes of use. Here's how I tracked down the problem and fixed it.", date: "Mar 28, 2026", read: 7 },
        { slug: "auth-flow-48-hours", category: "Architecture", title: "Why I rebuilt Spindare's login system in 48 hours — and don't regret it", excerpt: "The old setup worked fine until it didn't. An honest account of the decision, the rebuild, and what I'd do differently.", date: "Mar 14, 2026", read: 9 },
        { slug: "supabase-vs-firebase", category: "Backend", title: "Supabase vs Firebase for a social feed: what I found after testing both properly", excerpt: "I needed live updates for a large number of users at the same time. Both tools promised it. Only one delivered.", date: "Feb 22, 2026", read: 11 },
        { slug: "react-native-design-system", category: "Design", title: "How we built a design system for a mobile app with hundreds of screens", excerpt: "When your app has hundreds of components and a small team, having a shared set of rules isn't optional. This is how we did it.", date: "Feb 8, 2026", read: 8 }
      ]
    },
    contact: {
      label: "Contact",
      title: "Get in touch",
      sub: "Tell me about your project and I'll get back to you within 24 hours.",
      form: {
        name: "Your name", namePh: "Your full name",
        email: "Email address", emailPh: "you@example.com",
        subject: "Subject", subjectPh: "Project inquiry",
        message: "Message", messagePh: "Tell me about your project, when you need it, and your budget...",
        send: "Send Message", sending: "Sending...",
        sent: "Message sent.", sentSub: "I'll get back to you within 24 hours.",
        another: "Send another message"
      },
      info: { email: "contact@kiqa-dev.it", discord: "@kodibkfg", github: "github.com/rashica07", location: "Kosovo / Italy", response: "Within 24 hours" }
    },
    footer: { tagline: "Quality work. Fixed price. On time.", legal: "© 2026 KIQA DEV. All rights reserved." }
  },
  it: {
    nav: { home: "Home", services: "Servizi", portfolio: "Lavori", blog: "Articoli", about: "Chi sono", contact: "Contatti", quote: "Inizia un progetto" },
    hero: { badge: "Disponibile per nuovi progetti · Kosovo / Italia", h1Line1: "Creo prodotti digitali", h1Line2: "che i tuoi clienti", h1Line3: "usano davvero —", h1Line4: "e a cui tornano.", sub: "Trasformo le idee in prodotti reali. App, siti web e piattaforme — costruiti per funzionare, consegnati in tempo, senza sorprese.", cta1: "Parlami del tuo progetto", cta2: "Guarda i miei lavori", available: "Disponibile per nuovi progetti da agosto 2026" },
    services: {
      label: "Servizi",
      title: "Prezzo chiaro. Scopo chiaro. Fatto.",
      sub: "Nessun costo nascosto, nessun ritardo. Ogni progetto ha un prezzo fisso e una data di consegna.",
      items: [
        { name: "App Mobile", tagline: "La tua idea, live su App Store e Google Play in 6 settimane.", price: "Da €799", timeline: "6 settimane", desc: "Creo la tua app dall'inizio alla fine — design, sviluppo e pubblicazione sugli store.", features: ["React Native", "iOS & Android", "Supabase", "Pubblicazione App Store & Play Store", "Notifiche push", "30 giorni di supporto post-lancio"] },
        { name: "Landing Page", tagline: "Un sito che cattura l'attenzione — in 7 giorni.", price: "Da €299", timeline: "7 giorni", desc: "Una pagina veloce e curata, costruita per trasformare i visitatori in clienti.", features: ["Next.js", "Grafica 3D & animazioni", "Ottimizzata per i motori di ricerca", "Veloce su ogni dispositivo", "Vercel + Cloudflare", "Pronta per un CMS"] },
        { name: "Piattaforma Web", tagline: "Un prodotto web completo — account, pagamenti, dashboard — in 3 settimane.", price: "Da €1.299", timeline: "3 settimane", desc: "Tutto ciò di cui la tua attività ha bisogno in un unico prodotto.", features: ["Next.js", "Supabase / PostgreSQL", "Account utenti & login", "Dashboard admin", "Aggiornamenti in tempo reale", "Deploy incluso"] },
        { name: "Backend Personalizzato", tagline: "Le fondamenta di cui il tuo prodotto ha bisogno — in 2 settimane.", price: "Da €499", timeline: "2 settimane", desc: "Una base solida e affidabile per la tua app o sito web.", features: ["Node.js", "PostgreSQL", "Gestione accessi", "Archiviazione file", "Sincronizzazione dati live", "Documentazione completa"] }
      ]
    },
    funnel: { label: "Inizia un Progetto", title: "Parlami del tuo progetto", sub: "Compila il modulo e ti rispondo con un piano chiaro entro 24 ore.", fields: { name: "Il tuo nome", namePh: "Nome completo", email: "Email aziendale", emailPh: "tu@azienda.com", company: "Azienda o nome del progetto", companyPh: "Acme Srl o nome del progetto", service: "Cosa ti serve?", serviceOptions: ["App Mobile", "Landing Page", "Piattaforma Web", "Backend Personalizzato", "Non sono sicuro — parliamone"], budget: "Budget", budgetOptions: ["Meno di €500", "€500 – €1.500", "€1.500 – €3.000", "€3.000+", "Non sono sicuro"], timeline: "Quando ne hai bisogno?", timelineOptions: ["Il prima possibile", "Entro un mese", "2–3 mesi", "Nessuna fretta"], description: "Descrivimi il progetto", descriptionPh: "Cosa stai costruendo, per chi è, e come si presenta un buon risultato per te?", submit: "Invia il mio brief", submitting: "Invio in corso..." }, success: { title: "Ricevuto — ti rispondo presto.", sub: "Esaminerò il tuo brief e ti invierò una proposta chiara entro 24 ore." } },
    work: {
      label: "Lavori Selezionati", title: "Progetti reali. Risultati reali.",
      projects: [
        { name: "Spindare", type: "Mobile", status: "In sviluppo", year: "2025–2026", desc: "Un'app social dove gli utenti guadagnano premi per le loro abitudini quotidiane. Ho guidato l'intero prodotto — dal primo schermo alla preparazione al lancio. In uscita su iOS a settembre.", stack: ["React Native", "TypeScript", "Supabase", "Clerk", "Expo"] },
        { name: "TravelMe", type: "Mobile", status: "Prossimamente", year: "2026", desc: "Un'app che pianifica il tuo intero viaggio da un singolo messaggio. Dille dove vuoi andare e cosa ti piace, e pensa a tutto il resto.", stack: ["React Native", "OpenAI API", "Node.js", "MongoDB"] },
        { name: "KIQA DEV", type: "Web", status: "Live", year: "2026", desc: "Questo sito — realizzato in quattro lingue, con animazioni fluide e uno sfondo 3D. Progettato per convincere i clienti a contattarmi.", stack: ["Next.js", "TypeScript", "Three.js", "Framer Motion"] }
      ]
    },
    stats: [
      { value: "150k+", label: "Righe scritte per prodotti reali" },
      { value: "3+", label: "Anni di sviluppo professionale" },
      { value: "4", label: "Lingue parlate" },
      { value: "6sett", label: "Dall'idea all'App Store" }
    ],
    process: {
      label: "Come funziona", title: "Semplice dall'inizio alla fine",
      steps: [
        { n: "01", title: "Parliamo", desc: "Una chiamata di 30 minuti per capire cosa ti serve, quando e come appare un buon risultato. Nessun impegno." },
        { n: "02", title: "Ricevi una proposta", desc: "Un documento scritto — cosa costruirò, quanto costa e quando sarà pronto. Nella tua casella entro 24 ore." },
        { n: "03", title: "Costruisco", desc: "Aggiornamenti regolari, anteprime anticipate e un contatto diretto con me per tutta la durata. Non ti lascerai mai in sospeso." },
        { n: "04", title: "Vai live", desc: "Il tuo prodotto viene lanciato. Ti consegno tutto — codice, account, documentazione — più 30 giorni di supporto." }
      ]
    },
    testimonials: [
      { quote: "Kristian ha consegnato la nostra landing page in meno di una settimana. Lavoro pulito, zero revisioni, comunicazione chiara.", name: "Marco V.", role: "Founder", location: "Milano, Italia" },
      { quote: "Lavorare con Kiqa su Spindare è stato impressionante. Affronta ogni problema con disciplina e cura.", name: "Biba W.", role: "Co-founder, Spindare", location: "Kosovo" },
      { quote: "Ha costruito un sistema di prenotazioni e pagamenti per la mia attività in due settimane.", name: "Luca R.", role: "Imprenditore", location: "Lecco, Italia" }
    ],
    about: {
      label: "Chi sono", title: "Kristian Gjergji", sub: "Sviluppatore · Builder · Fondatore",
      bio: [
        "Sono uno sviluppatore autonomo con base tra Kosovo e Italia. Creo app mobile, siti web e piattaforme per startup e imprenditori che hanno bisogno di qualcosa fatto bene — e in tempo.",
        "Attualmente co-guido lo sviluppo del prodotto su Spindare, un'app social con centinaia di schermate e un lancio su iOS previsto per settembre 2026.",
        "Tramite KIQA DEV, lavoro direttamente con fondatori e imprenditori — gestendo tutto dal primo design al lancio — così non devono gestire più agenzie o freelancer."
      ],
      skills: [
        { name: "Mobile", items: ["React Native", "Expo", "iOS / Android", "EAS Build", "Pubblicazione App Store"] },
        { name: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
        { name: "Backend & Dati", items: ["Supabase", "PostgreSQL", "Node.js", "REST API", "Sincronizzazione in tempo reale"] },
        { name: "Strumenti", items: ["Git", "Vercel", "Cloudflare", "Figma", "Stream Chat"] }
      ],
      experience: [
        { year: "2025–Oggi", role: "Co-Fondatore & Lead Developer — Spindare", desc: "Guido la costruzione completa del prodotto per un'app social — centinaia di schermate, un design system completo e una data di lancio a settembre 2026." },
        { year: "2024–Oggi", role: "Fondatore — KIQA DEV", desc: "Gestisco la mia attività di sviluppo. Lavoro direttamente con startup e imprenditori in Italia e oltre." },
        { year: "2022–Oggi", role: "Sviluppatore Autodidatta", desc: "Partito da zero nel 2022. Tre anni passati a costruire prodotti reali — non tutorial." }
      ],
      values: [
        { title: "Costruisco, non solo planifico", desc: "Preferisco mostrarti qualcosa di reale in due settimane piuttosto che trascorrere mesi a pianificare la versione perfetta." },
        { title: "Consegno in tempo", desc: "Una scadenza è una scadenza. Non ho mai consegnato in ritardo e non ho intenzione di iniziare." },
        { title: "Mantengo la semplicità", desc: "Le soluzioni pulite battono quelle ingegnose. Costruisco cose facili da capire, mantenere e far crescere." },
        { title: "Porto a termine", desc: "Una volta che prendo un progetto, lo porto alla fine. Non ti chiederai mai dove sono." }
      ]
    },
    blog: { label: "Articoli", title: "Note dal lavoro", sub: "Storie reali dai progetti su cui ho lavorato — cosa è andato storto, cosa ha funzionato e cosa farei diversamente.", readMore: "Leggi l'articolo", minRead: "min di lettura", categories: ["Tutti", "React Native", "Architettura", "Backend", "Design"], posts: [] },
    contact: { label: "Contatti", title: "Scrivimi", sub: "Parlami del tuo progetto e ti rispondo entro 24 ore.", form: { name: "Il tuo nome", namePh: "Nome completo", email: "Email", emailPh: "tu@esempio.com", subject: "Oggetto", subjectPh: "Richiesta progetto", message: "Messaggio", messagePh: "Raccontami del tuo progetto, delle tempistiche e del budget...", send: "Invia messaggio", sending: "Invio in corso...", sent: "Messaggio inviato.", sentSub: "Ti rispondo entro 24 ore.", another: "Invia un altro messaggio" }, info: { email: "contact@kiqa-dev.it", discord: "@kodibkfg", github: "github.com/rashica07", location: "Kosovo / Italia", response: "Entro 24 ore" } },
    footer: { tagline: "Lavoro di qualità. Prezzo fisso. Puntuale.", legal: "© 2026 KIQA DEV. Tutti i diritti riservati." }
  },
  sq: {
    nav: { home: "Kryefaqja", services: "Sherbime", portfolio: "Punimet", blog: "Shkrimet", about: "Rreth meje", contact: "Kontakt", quote: "Fillo nje projekt" },
    hero: { badge: "I disponueshem per projekte te reja · Kosove / Itali", h1Line1: "Ndertoj produkte dixhitale", h1Line2: "qe klientet tuaj", h1Line3: "i perdorin me te vertete —", h1Line4: "dhe kthehen perseri.", sub: "Kthej idetë ne produkte reale. Aplikacione, faqe interneti dhe platforma — te nderthura per te performuar, te dorezuara ne kohe.", cta1: "Tregomë për projektin tënd", cta2: "Shiko punimet e mia", available: "Duke pranuar projekte te reja nga gushti 2026" },
    funnel: { label: "Fillo nje Projekt", title: "Tregomë për projektin tënd", sub: "Plotëso formularin dhe do të të kthehem me një plan të qartë brenda 24 orëve.", fields: { name: "Emri yt", namePh: "Emri i plotë", email: "Email biznesi", emailPh: "ti@kompania.com", company: "Kompania ose emri i projektit", companyPh: "Emri i kompanise ose projektit", service: "Cfare ke nevoje?", serviceOptions: ["Aplikacion Mobil", "Landing Page", "Platforme Web", "Backend i Personalizuar", "Nuk jam i sigurt — le te flasim"], budget: "Buxheti", budgetOptions: ["Nen €500", "€500 – €1,500", "€1,500 – €3,000", "€3,000+", "Nuk jam i sigurt"], timeline: "Kur ke nevoje?", timelineOptions: ["Sa me shpejt te jete e mundur", "Brenda nje muaji", "2–3 muaj", "Pa ngutje"], description: "Tregomë per projektin", descriptionPh: "Cfare po nderton, per kend eshte dhe si duket nje rezultat i mire per ty?", submit: "Dergo brifin tim", submitting: "Duke derguar..." }, success: { title: "Morra — do te kontaktoj shpejt.", sub: "Do ta shqyrtoj brifin tuaj dhe do ju dergoj nje propozim te qarte brenda 24 oreve." } },
    services: {
      label: "Sherbime", title: "Cmim i qarte. Qellim i qarte. Bere.", sub: "Pa kosto te fshehura, pa vonesa. Cdo projekt ka nje cmim fiks dhe nje date dorezimi.",
      items: [
        { name: "Aplikacion Mobil", tagline: "Ideja jote, live në App Store dhe Google Play në 6 javë.", price: "Nga €799", timeline: "6 javë", desc: "Ndërtoj aplikacionin tënd nga fillimi deri në fund — dizajn, zhvillim dhe dorëzim në dyqane.", features: ["React Native", "iOS & Android", "Supabase", "Dorëzim App Store & Play Store", "Njoftime push", "30 ditë mbështetje pas lansimit"] },
        { name: "Landing Page", tagline: "Një faqe interneti që tërheq vëmendjen — në 7 ditë.", price: "Nga €299", timeline: "7 ditë", desc: "Një faqe e shpejtë dhe e bukur, e ndërtuar për të kthyer vizitorët në klientë.", features: ["Next.js", "Grafika 3D & animacione", "E optimizuar për motorët e kërkimit", "E shpejtë në të gjitha pajisjet", "Vercel + Cloudflare", "Gati për sistem përmbajtjeje"] },
        { name: "Platformë Web", tagline: "Një produkt i plotë në web — llogari, pagesa, panele — në 3 javë.", price: "Nga €1,299", timeline: "3 javë", desc: "Gjithçka që biznesi yt nevojitet në një produkt të vetëm.", features: ["Next.js", "Supabase / PostgreSQL", "Llogari & hyrje", "Panel admin", "Azhurnime në kohë reale", "Vendosja e përfshirë"] },
        { name: "Backend i Personalizuar", tagline: "Themeli që produkti yt nevojitet — në 2 javë.", price: "Nga €499", timeline: "2 javë", desc: "Një bazë solide dhe e besueshme për aplikacionin ose faqen tënde.", features: ["Node.js", "PostgreSQL", "Hyrje & menaxhim përdoruesish", "Ruajtje skedarësh", "Sinkronizim live", "Dokumentacion i plotë"] }
      ]
    },
    work: {
      label: "Punime te Zgjedhura", title: "Projekte reale. Rezultate reale.",
      projects: [
        { name: "Spindare", type: "Mobil", status: "Në Zhvillim", year: "2025–2026", desc: "Një aplikacion social ku përdoruesit fitojnë shpërblime për zakonet e tyre ditore. Udhëhoqa të gjithë produktin — nga ekrani i parë deri te përgatitja e lansimit. Nis në iOS këtë shtator.", stack: ["React Native", "TypeScript", "Supabase", "Clerk", "Expo"] },
        { name: "TravelMe", type: "Mobil", status: "Se shpejti", year: "2026", desc: "Një aplikacion që planifikon të gjithë udhëtimin tënd nga një mesazh i vetëm. Thuaji ku dëshiron të shkosh dhe çfarë të pëlqen, dhe ai menaxhon gjithçka tjetër.", stack: ["React Native", "OpenAI API", "Node.js", "MongoDB"] },
        { name: "KIQA DEV", type: "Web", status: "Live", year: "2026", desc: "Kjo faqe — ndërtuar në katër gjuhë, me animacione të buta dhe sfond 3D. Projektuar për të bërë klientët të kontaktojnë.", stack: ["Next.js", "TypeScript", "Three.js", "Framer Motion"] }
      ]
    },
    stats: [
      { value: "150k+", label: "Rreshta të shkruar për produkte reale" },
      { value: "3+", label: "Vjet duke ndërtuar profesionalisht" },
      { value: "4", label: "Gjuhë të folura" },
      { value: "6 javë", label: "Nga ideja në App Store" }
    ],
    process: {
      label: "Si funksionon", title: "I thjeshtë nga fillimi në fund",
      steps: [
        { n: "01", title: "Flasim", desc: "Një telefonatë 30-minutëshe për të kuptuar çfarë nevojitet, kur dhe si duket një rezultat i mirë. Pa angazhim." },
        { n: "02", title: "Merr një propozim", desc: "Një dokument i shkruar — çfarë do të ndërtoj, sa kushton dhe kur do të jetë gati. Brenda 24 orëve." },
        { n: "03", title: "Ndërtoj", desc: "Azhurnime të rregullta, pamje paraprake të hershme dhe kontakt i drejtpërdrejtë me mua gjatë gjithë kohës. Nuk do të mbetesh pa përgjigje." },
        { n: "04", title: "Shkon live", desc: "Produkti yt lansohet. Dorëzoj gjithçka — kod, llogari, dokumentacion — plus 30 ditë mbështetje." }
      ]
    },
    testimonials: [
      { quote: "Kristiani dorëzoi faqen tonë të uljes në më pak se një javë. Punë e pastër, zero rishikime dhe komunikim i qartë gjatë gjithë kohës.", name: "Marco V.", role: "Themelues i startup-it", location: "Milano, Itali" },
      { quote: "Puna me Kiqan në Spindare ka qenë mbresëlënëse. Ai i qëndron çdo problemi me disiplinë dhe kujdes që zakonisht kërkon vite të zhvillohet.", name: "Biba W.", role: "Bashkëthemeluese, Spindare", location: "Kosovë" },
      { quote: "Ai ndërtoi një sistem të plotë rezervimesh dhe pagesash për biznesin tim në dy javë. Agjencitë me të cilat kam punuar nuk arrinin as afër.", name: "Luca R.", role: "Pronar biznesi", location: "Lecco, Itali" }
    ],
    about: {
      label: "Rreth meje", title: "Kristian Gjergji", sub: "Zhvillues · Ndërtues · Themelues",
      bio: [
        "Jam një zhvillues i pavarur me bazë midis Kosovës dhe Italisë. Ndërtoj aplikacione mobile, faqe interneti dhe platforma web për startup-e dhe pronarë biznesi që kanë nevojë për gjëra të bëra siç duhet — dhe në kohë.",
        "Aktualisht bashkë-drejtoj zhvillimin e produktit në Spindare, një aplikacion social me qindra ekrane dhe lansim në iOS të planifikuar për shtator 2026.",
        "Nëpërmjet KIQA DEV, punoj drejtpërdrejt me themelues dhe pronarë biznesi — duke menaxhuar gjithçka nga dizajni i parë deri te lansimi — kështu që ata nuk duhet të menaxhojnë shumë agenci ose freelancer."
      ],
      skills: [
        { name: "Mobil", items: ["React Native", "Expo", "iOS / Android", "EAS Build", "Dorëzim App Store"] },
        { name: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
        { name: "Backend & Të dhëna", items: ["Supabase", "PostgreSQL", "Node.js", "REST API", "Sinkronizim në kohë reale"] },
        { name: "Mjete", items: ["Git", "Vercel", "Cloudflare", "Figma", "Stream Chat"] }
      ],
      experience: [
        { year: "2025–Tani", role: "Bashkëthemelues & Zhvillues Kryesor — Spindare", desc: "Drejtoj ndërtimin e plotë të produktit për një aplikacion social — qindra ekrane, sistem i plotë dizajni dhe datë lansimi në shtator 2026." },
        { year: "2024–Tani", role: "Themelues — KIQA DEV", desc: "Drejtoj praktikën time të zhvillimit. Punoj drejtpërdrejt me startup-e dhe pronarë biznesi nëpër Itali dhe gjetiu." },
        { year: "2022–Tani", role: "Zhvillues Autodidakt", desc: "Fillova nga zero në 2022. Tri vjet të kaluara duke ndërtuar produkte reale — jo tutoriale." }
      ],
      values: [
        { title: "Ndërtoj, jo vetëm planifikoj", desc: "Preferoj të vë diçka reale para teje në dy javë sesa të shpenzoj muaj duke planifikuar versionin perfekt." },
        { title: "Dorëzoj në kohë", desc: "Një afat është një afat. Nuk kam dorëzuar kurrë me vonesë dhe nuk kam ndërmend të filloj." },
        { title: "E mbaj të thjeshtë", desc: "Zgjidhjet e pastra fitojnë ndaj atyre të zgjuara. Ndërtoj gjëra të lehta për t'u kuptuar, mirëmbajtur dhe rritur." },
        { title: "E çoj deri në fund", desc: "Pasi marr një projekt, e çoj deri në fund. Nuk do të pyesësh kurrë ku jam." }
      ]
    },
    blog: { label: "Shkrimet", title: "Shënime nga puna", sub: "Histori reale nga projektet ku kam punuar — çfarë shkoi gabim, çfarë funksionoi dhe çfarë do të bëja ndryshe.", readMore: "Lexo postimin", minRead: "min lexim", categories: ["Të gjitha", "React Native", "Arkitekturë", "Backend", "Dizajn"], posts: [] },
    contact: { label: "Kontakt", title: "Kontaktomë", sub: "Tregomë për projektin tënd dhe do të kthehem brenda 24 orëve.", form: { name: "Emri yt", namePh: "Emri i plote", email: "Adresa email", emailPh: "ti@shembull.com", subject: "Subjekti", subjectPh: "Kerkese projekti", message: "Mesazhi", messagePh: "Tregomë për projektin, afatin kohor dhe buxhetin tënd...", send: "Dërgo mesazhin", sending: "Duke dërguar...", sent: "Mesazhi u dërgua.", sentSub: "Do të kthehem brenda 24 orëve.", another: "Dergoni nje mesazh tjeter" }, info: { email: "contact@kiqa-dev.it", discord: "@kodibkfg", github: "github.com/rashica07", location: "Kosove / Itali", response: "Brenda 24 oreve" } },
    footer: { tagline: "Pune cilësore. Çmim fiks. Në kohë.", legal: "© 2026 KIQA DEV. Te gjitha te drejtat te rezervuara." }
  },
  de: {
    nav: { home: "Start", services: "Leistungen", portfolio: "Projekte", blog: "Blog", about: "Über mich", contact: "Kontakt", quote: "Projekt starten" },
    hero: { badge: "Verfügbar für neue Projekte · Kosovo / Italien", h1Line1: "Ich entwickle digitale Produkte,", h1Line2: "die deine Kunden", h1Line3: "wirklich nutzen —", h1Line4: "und immer wieder öffnen.", sub: "Ich bringe Ideen von einem Gespräch zu einem fertigen Produkt. Apps, Websites und Plattformen — gebaut für Leistung, pünktlich geliefert.", cta1: "Erzähl mir von deinem Projekt", cta2: "Meine Projekte ansehen", available: "Neue Projekte ab August 2026" },
    services: {
      label: "Leistungen",
      title: "Klarer Preis. Klarer Umfang. Fertig.",
      sub: "Keine versteckten Kosten, keine Verzögerungen. Jedes Projekt hat einen Festpreis und ein Lieferdatum.",
      items: [
        { name: "Mobile App", tagline: "Deine Idee, live im App Store und Google Play in 6 Wochen.", price: "Ab €799", timeline: "6 Wochen", desc: "Ich entwickle deine App von Anfang bis Ende.", features: ["React Native", "iOS & Android", "Supabase", "App Store & Play Store Einreichung", "Push-Benachrichtigungen", "30 Tage Support nach Launch"] },
        { name: "Landing Page", tagline: "Eine Website, die Menschen aufhorchen lässt — in 7 Tagen.", price: "Ab €299", timeline: "7 Tage", desc: "Eine schnelle, ansprechende Seite, die Besucher in Kunden verwandelt.", features: ["Next.js", "3D-Grafik & Animationen", "Suchmaschinenoptimiert", "Schnell auf allen Geräten", "Vercel + Cloudflare", "CMS-bereit"] },
        { name: "Web-Plattform", tagline: "Ein vollständiges Webprodukt in 3 Wochen.", price: "Ab €1.299", timeline: "3 Wochen", desc: "Alles, was dein Unternehmen braucht, in einem Produkt.", features: ["Next.js", "Supabase / PostgreSQL", "Benutzerkonten & Login", "Admin-Dashboard", "Echtzeit-Updates", "Deployment inklusive"] },
        { name: "Individuelles Backend", tagline: "Das Fundament, das dein Produkt braucht — in 2 Wochen.", price: "Ab €499", timeline: "2 Wochen", desc: "Eine solide, zuverlässige Grundlage für deine App oder Website.", features: ["Node.js", "PostgreSQL", "Login & Nutzerverwaltung", "Dateispeicherung", "Live-Datensynchronisation", "Vollständige Dokumentation"] }
      ]
    },
    funnel: { label: "Projekt starten", title: "Erzähl mir von deinem Projekt", sub: "Füll das Formular aus und ich melde mich innerhalb von 24 Stunden.", fields: { name: "Dein Name", namePh: "Vollständiger Name", email: "Geschäftliche E-Mail", emailPh: "du@unternehmen.de", company: "Unternehmen oder Projektname", companyPh: "Muster GmbH oder Projektname", service: "Was brauchst du?", serviceOptions: ["Mobile App", "Landing Page", "Web-Plattform", "Individuelles Backend", "Noch unsicher — lass uns reden"], budget: "Budget", budgetOptions: ["Unter €500", "€500 – €1.500", "€1.500 – €3.000", "€3.000+", "Noch unsicher"], timeline: "Wann brauchst du es?", timelineOptions: ["So schnell wie möglich", "Innerhalb eines Monats", "2–3 Monate", "Kein Zeitdruck"], description: "Beschreib mir das Projekt", descriptionPh: "Was baust du, für wen ist es, und wie sieht ein gutes Ergebnis für dich aus?", submit: "Brief absenden", submitting: "Wird gesendet..." }, success: { title: "Erhalten — ich melde mich bald.", sub: "Ich werde dein Brief prüfen und dir innerhalb von 24 Stunden einen klaren Vorschlag schicken." } },
    work: {
      label: "Ausgewählte Projekte", title: "Echte Projekte. Echte Ergebnisse.",
      projects: [
        { name: "Spindare", type: "Mobile", status: "In Entwicklung", year: "2025–2026", desc: "Eine Social App, bei der Nutzer Belohnungen für ihre täglichen Gewohnheiten verdienen. Ich leitete das gesamte Produkt — vom ersten Bildschirm bis zur Launch-Vorbereitung. Erscheint im September auf iOS.", stack: ["React Native", "TypeScript", "Supabase", "Clerk", "Expo"] },
        { name: "TravelMe", type: "Mobile", status: "Demnächst", year: "2026", desc: "Eine App, die deine gesamte Reise aus einer einzigen Nachricht plant. Sag ihr, wohin du willst und was dich interessiert, und sie erledigt den Rest.", stack: ["React Native", "OpenAI API", "Node.js", "MongoDB"] },
        { name: "KIQA DEV", type: "Web", status: "Live", year: "2026", desc: "Diese Seite — in vier Sprachen gebaut, mit flüssigen Animationen und einem 3D-Hintergrund. Designed, um Kunden dazu zu bringen, sich zu melden.", stack: ["Next.js", "TypeScript", "Three.js", "Framer Motion"] }
      ]
    },
    stats: [
      { value: "150k+", label: "Zeilen für echte Produkte geschrieben" },
      { value: "3+", label: "Jahre professionelle Entwicklung" },
      { value: "4", label: "Gesprochene Sprachen" },
      { value: "6 Wo.", label: "Von der Idee zum App Store" }
    ],
    process: {
      label: "So läuft es ab", title: "Einfach von Anfang bis Ende",
      steps: [
        { n: "01", title: "Wir reden", desc: "Ein 30-minütiges Gespräch, um zu verstehen, was du brauchst, wann du es brauchst und wie ein gutes Ergebnis aussieht. Keine Verpflichtung." },
        { n: "02", title: "Du bekommst ein Angebot", desc: "Ein schriftliches Dokument — was ich baue, was es kostet und wann es fertig ist. Innerhalb von 24 Stunden in deinem Postfach." },
        { n: "03", title: "Ich baue es", desc: "Regelmäßige Updates, frühe Vorschauen und direkter Kontakt zu mir. Du wirst nie im Unklaren gelassen." },
        { n: "04", title: "Du gehst live", desc: "Dein Produkt wird gelauncht. Ich übergebe alles — Code, Zugangsdaten, Dokumentation — plus 30 Tage Support." }
      ]
    },
    testimonials: [
      { quote: "Kristian lieferte unsere Landing Page in unter einer Woche. Saubere Arbeit, keine Nachbesserungen und klare Kommunikation. Selten für jeden Entwickler.", name: "Marco V.", role: "Startup-Gründer", location: "Mailand, Italien" },
      { quote: "Die Zusammenarbeit mit Kiqa an Spindare war beeindruckend. Er geht jedes Problem mit Disziplin und Sorgfalt an, die normalerweise Jahre braucht.", name: "Biba W.", role: "Mitgründerin, Spindare", location: "Kosovo" },
      { quote: "Er hat ein vollständiges Buchungs- und Zahlungssystem für mein Unternehmen in zwei Wochen gebaut. Agenturen konnten nicht annähernd mithalten.", name: "Luca R.", role: "Geschäftsinhaber", location: "Lecco, Italien" }
    ],
    about: {
      label: "Über mich", title: "Kristian Gjergji", sub: "Entwickler · Builder · Gründer",
      bio: [
        "Ich bin ein selbstständiger Entwickler mit Sitz zwischen Kosovo und Italien. Ich entwickle mobile Apps, Websites und Web-Plattformen für Startups und Unternehmer, die Dinge richtig gemacht haben wollen — und pünktlich.",
        "Derzeit leite ich gemeinsam die Produktentwicklung bei Spindare, einer Social App mit Hunderten von Screens und einem geplanten iOS-Launch im September 2026.",
        "Über KIQA DEV arbeite ich direkt mit Gründern und Unternehmern zusammen — von der ersten Idee bis zum Launch — damit sie keine verschiedenen Agenturen oder Freelancer koordinieren müssen."
      ],
      skills: [
        { name: "Mobile", items: ["React Native", "Expo", "iOS / Android", "EAS Build", "App Store Deployment"] },
        { name: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
        { name: "Backend & Daten", items: ["Supabase", "PostgreSQL", "Node.js", "REST APIs", "Echtzeit-Synchronisation"] },
        { name: "Tools", items: ["Git", "Vercel", "Cloudflare", "Figma", "Stream Chat"] }
      ],
      experience: [
        { year: "2025–Heute", role: "Mitgründer & Lead Developer — Spindare", desc: "Ich leite den gesamten Produktaufbau für eine Social App — Hunderte von Screens, ein vollständiges Design-System und ein Launch-Termin im September 2026." },
        { year: "2024–Heute", role: "Gründer — KIQA DEV", desc: "Ich führe meine eigene Entwicklungspraxis. Ich arbeite direkt mit Startups und Unternehmern in Italien und darüber hinaus." },
        { year: "2022–Heute", role: "Autodidaktischer Entwickler", desc: "2022 von Null angefangen. Drei Jahre damit verbracht, echte Produkte zu bauen — keine Tutorials." }
      ],
      values: [
        { title: "Ich baue, plane nicht nur", desc: "Ich zeige dir lieber in zwei Wochen etwas Echtes, als monatelang die perfekte Version zu planen." },
        { title: "Ich liefere pünktlich", desc: "Eine Deadline ist eine Deadline. Ich habe noch nie zu spät geliefert und plane nicht, damit anzufangen." },
        { title: "Ich halte es einfach", desc: "Saubere Lösungen schlagen clevere. Ich baue Dinge, die leicht zu verstehen, zu warten und zu erweitern sind." },
        { title: "Ich ziehe es durch", desc: "Wenn ich ein Projekt übernehme, führe ich es zu Ende. Du wirst dich nie fragen, wo ich bin." }
      ]
    },
    blog: { label: "Blog", title: "Notizen aus der Arbeit", sub: "Echte Geschichten aus meinen Projekten — was schiefgelaufen ist, was funktioniert hat und was ich anders machen würde.", readMore: "Artikel lesen", minRead: "Min. Lesezeit", categories: ["Alle", "React Native", "Architektur", "Backend", "Design"], posts: [] },
    contact: { label: "Kontakt", title: "Schreib mir", sub: "Erzähl mir von deinem Projekt und ich melde mich innerhalb von 24 Stunden.", form: { name: "Dein Name", namePh: "Vollständiger Name", email: "E-Mail-Adresse", emailPh: "du@beispiel.de", subject: "Betreff", subjectPh: "Projektanfrage", message: "Nachricht", messagePh: "Erzähl mir von deinem Projekt, dem Zeitplan und dem Budget...", send: "Nachricht senden", sending: "Wird gesendet...", sent: "Nachricht gesendet.", sentSub: "Ich melde mich innerhalb von 24 Stunden.", another: "Weitere Nachricht senden" }, info: { email: "contact@kiqa-dev.it", discord: "@kodibkfg", github: "github.com/rashica07", location: "Kosovo / Italien", response: "Innerhalb von 24 Stunden" } },
    footer: { tagline: "Qualitätsarbeit. Festpreis. Pünktlich.", legal: "© 2026 KIQA DEV. Alle Rechte vorbehalten." }
  }
};

(Object.keys(translations) as Lang[]).forEach((lang) => {
  if (lang !== "en") {
    const fallback = translations.en as any;
    const target = translations[lang] as any;
    const merge = (trg: any, src: any) => {
      for (const key in src) {
        if (!trg[key]) {
          trg[key] = src[key];
        } else if (typeof src[key] === "object" && !Array.isArray(src[key])) {
          merge(trg[key], src[key]);
        } else if (Array.isArray(src[key])) {
          if (trg[key].length === 0) trg[key] = src[key];
        }
      }
    };
    merge(target, fallback);
  }
});

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof translations.en;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("kiqa-lang");
    if (saved === "en" || saved === "it" || saved === "sq" || saved === "de") return saved;
    return "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("kiqa-lang", l);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] as typeof translations.en }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useLanguage must be used within an I18nProvider");
  return ctx;
}
