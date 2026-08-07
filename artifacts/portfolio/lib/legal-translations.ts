import { Lang } from "./i18n";

export interface AccordionSection {
  title: string;
  paragraphs: string[];
}

export interface LegalTranslation {
  tos: {
    title: string;
    lastUpdated: string;
    tldrTitle: string;
    tldrDesc: string;
    sections: AccordionSection[];
  };
  privacy: {
    title: string;
    lastUpdated: string;
    tldrTitle: string;
    tldrDesc: string;
    sections: AccordionSection[];
  };
}

export const legalTranslations: Record<Lang, LegalTranslation> = {
  en: {
    tos: {
      title: "Terms of Service",
      lastUpdated: "Last updated: August 2026",
      tldrTitle: "TL;DR Summary",
      tldrDesc: "These terms govern your use of the KIQA DEV website. They do not override any formal Master Service Agreements (MSAs) or contracts signed for actual development work. In short: do not scrape or misuse our site, our designs belong to us, and any formal project work will be governed by a separate, signed contract.",
      sections: [
        {
          title: "1. Introduction & Acceptance of Terms",
          paragraphs: [
            'These Terms of Service ("Terms") act as a legally binding contract between you and KIQA DEV regarding your use of our website (kiqa-dev.it). By accessing or using this site, you agree to be bound by these Terms.',
            'If you do not agree with any part of these Terms, you are prohibited from using or accessing this site. These Terms apply exclusively to your interaction with our public website and marketing materials.'
          ]
        },
        {
          title: "2. User Accounts & Client Portals",
          paragraphs: [
            "Currently, KIQA DEV does not require you to create an account to browse our portfolio or request a quote. If we introduce client portals in the future, you will be responsible for maintaining the confidentiality of your account credentials.",
            "We reserve the right to suspend or terminate accounts that violate our security guidelines or engage in unauthorized access attempts."
          ]
        },
        {
          title: "3. Acceptable Use Policy",
          paragraphs: [
            "You agree to use this website only for lawful purposes. You are strictly prohibited from engaging in data scraping, automated data extraction, or attempting to breach our security infrastructure.",
            "Uploading malicious code, transmitting spam, or using our contact forms to harass or defraud KIQA DEV will result in an immediate ban and potential legal action."
          ]
        },
        {
          title: "4. Intellectual Property",
          paragraphs: [
            "All original content on this website—including but not limited to text, graphics, logos, 3D visual assets, code snippets, and UI designs—is the exclusive property of KIQA DEV and is protected by international copyright laws.",
            "You may not reproduce, distribute, or create derivative works from our content without our explicit written permission. Client project showcases remain the property of their respective owners."
          ]
        },
        {
          title: "5. Payment and Subscriptions",
          paragraphs: [
            "This website does not directly process payments or host subscription checkouts. All payments for development services are handled via customized invoices.",
            "Our billing cycles, cancellation rules, and refund policies for freelance development services will be explicitly detailed in the Master Service Agreement (MSA) signed before your project begins."
          ]
        },
        {
          title: "6. Termination Clause",
          paragraphs: [
            "We reserve the right to terminate or suspend your access to our website immediately, without prior notice or liability, for any reason whatsoever. This includes, without limitation, a breach of these Terms.",
            "Upon termination, your right to use the website will cease immediately. Provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions and limitations of liability."
          ]
        },
        {
          title: "7. Limitation of Liability",
          paragraphs: [
            "In no event shall KIQA DEV, nor its directors, employees, or partners, be liable for any indirect, incidental, special, or consequential damages resulting from your use of this website.",
            "We do not guarantee that our website will be secure, error-free, or continuously available. We are not responsible for the content or privacy practices of any third-party links provided on our site."
          ]
        },
        {
          title: "8. Governing Law",
          paragraphs: [
            "These Terms shall be governed and construed in accordance with the laws of Kosovo and Italy, without regard to its conflict of law provisions.",
            "Any legal disputes arising from the use of this website will be handled exclusively in the recognized jurisdictions of Kosovo or Italy."
          ]
        }
      ]
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: August 2026",
      tldrTitle: "TL;DR Summary",
      tldrDesc: "We respect your privacy. We only collect the information necessary to provide you with a quote or deliver our services (like your email and project details). We never sell your data to third parties. Our site uses basic, privacy-friendly analytics that do not track personally identifiable information.",
      sections: [
        {
          title: "1. Information Collection",
          paragraphs: [
            "We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services.",
            "The personal information that we collect depends on the context of your interactions with us and the website, but typically includes your name, email address, company name, and specific project requirements."
          ]
        },
        {
          title: "2. Collection Methods",
          paragraphs: [
            "Data is gathered directly from you via direct email inquiries or through third-party communication platforms you initiate contact on, such as WhatsApp or Discord.",
            "We do not currently use automated user registration forms or tracking cookies that collect personally identifiable information without your explicit consent."
          ]
        },
        {
          title: "3. Purpose of Usage",
          paragraphs: [
            "We process your personal information strictly for legitimate business purposes. This includes responding to your inquiries, providing custom project quotes, and delivering our contracted software development services.",
            "We may also use your information to send you administrative details, such as contract updates, invoice receipts, or changes to our terms and policies."
          ]
        },
        {
          title: "4. Third-Party Sharing",
          paragraphs: [
            "We do not sell, rent, or trade your personal information with third parties for their promotional purposes.",
            "We may share your data with trusted third-party vendors who perform services for us or on our behalf, such as web hosting (Vercel, Cloudflare) or communication platforms (WhatsApp, Gmail). These partners are legally bound to keep your data confidential."
          ]
        },
        {
          title: "5. Cookies and Tracking",
          paragraphs: [
            "Our website may use essential cookies and privacy-friendly analytics tools to measure website traffic and performance.",
            "These tools collect aggregated, anonymous data (such as page views or browser types) and do not track individual users across the web or collect personally identifiable information."
          ]
        },
        {
          title: "6. Data Retention",
          paragraphs: [
            "We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).",
            "When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information."
          ]
        },
        {
          title: "7. User Rights",
          paragraphs: [
            "Depending on your geographic location (such as under the GDPR or CCPA), you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances.",
            "To request to review, update, or delete your personal information, please submit a written request directly to our contact email address."
          ]
        },
        {
          title: "8. Security Measures",
          paragraphs: [
            "We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.",
            "However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure."
          ]
        },
        {
          title: "9. Children's Privacy",
          paragraphs: [
            "We do not knowingly solicit data from or market to children under 18 years of age. By using this website, you represent that you are at least 18 years old.",
            "If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records."
          ]
        },
        {
          title: "10. Contact Information",
          paragraphs: [
            "If you have questions or comments about this privacy policy, or if you would like to exercise your data rights, you may contact us via email.",
            "Please send all privacy-related inquiries to: contact@kiqa-dev.it."
          ]
        }
      ]
    }
  },
  it: {
    tos: {
      title: "Termini di Servizio",
      lastUpdated: "Ultimo aggiornamento: Agosto 2026",
      tldrTitle: "Sintesi TL;DR",
      tldrDesc: "Questi termini regolano l'uso del sito web KIQA DEV. Non sostituiscono i Master Service Agreement (MSA) formali o i contratti firmati per lo sviluppo effettivo. In breve: non estrarre dati o abusare del nostro sito, i nostri design ci appartengono e qualsiasi lavoro formale sarà regolato da un contratto separato e firmato.",
      sections: [
        {
          title: "1. Introduzione e Accettazione dei Termini",
          paragraphs: [
            'Questi Termini di Servizio ("Termini") costituiscono un contratto legalmente vincolante tra te e KIQA DEV riguardante l\'uso del nostro sito web (kiqa-dev.it). Accedendo o utilizzando questo sito, accetti di essere vincolato da questi Termini.',
            "Se non sei d'accordo con qualsiasi parte di questi Termini, ti è vietato l'uso o l'accesso a questo sito. Questi Termini si applicano esclusivamente all'interazione con il nostro sito web pubblico e con i materiali di marketing."
          ]
        },
        {
          title: "2. Account Utente e Portali Clienti",
          paragraphs: [
            "Attualmente, KIQA DEV non richiede la creazione di un account per navigare nel nostro portfolio o richiedere un preventivo. Se in futuro introdurremo portali per i clienti, sarai responsabile del mantenimento della riservatezza delle tue credenziali.",
            "Ci riserviamo il diritto di sospendere o chiudere gli account che violano le nostre linee guida sulla sicurezza o tentano accessi non autorizzati."
          ]
        },
        {
          title: "3. Politica di Uso Accettabile",
          paragraphs: [
            "Accetti di utilizzare questo sito web solo per scopi leciti. È severamente vietato effettuare scraping dei dati, estrazione automatizzata dei dati o tentare di violare la nostra infrastruttura di sicurezza.",
            "Il caricamento di codice malevolo, l'invio di spam o l'uso dei nostri moduli di contatto per molestare o truffare KIQA DEV comporterà il ban immediato e potenziali azioni legali."
          ]
        },
        {
          title: "4. Proprietà Intellettuale",
          paragraphs: [
            "Tutti i contenuti originali presenti su questo sito web—inclusi testo, grafica, loghi, risorse visive 3D, frammenti di codice e design UI—sono di proprietà esclusiva di KIQA DEV e sono protetti dalle leggi internazionali sul copyright.",
            "Non è consentito riprodurre, distribuire o creare opere derivate dai nostri contenuti senza la nostra esplicita autorizzazione scritta. Le vetrine dei progetti dei clienti rimangono di proprietà dei rispettivi titolari."
          ]
        },
        {
          title: "5. Pagamenti e Abbonamenti",
          paragraphs: [
            "Questo sito web non elabora direttamente pagamenti né ospita abbonamenti. Tutti i pagamenti per i servizi di sviluppo vengono gestiti tramite fatture personalizzate.",
            "I nostri cicli di fatturazione, le regole di cancellazione e le politiche di rimborso per i servizi freelance saranno dettagliati nel Master Service Agreement (MSA) firmato prima dell'inizio del progetto."
          ]
        },
        {
          title: "6. Clausola di Risoluzione",
          paragraphs: [
            "Ci riserviamo il diritto di sospendere o interrompere l'accesso al nostro sito web immediatamente, senza preavviso o responsabilità, per qualsiasi motivo, inclusa la violazione di questi Termini.",
            "In caso di risoluzione, il tuo diritto di utilizzare il sito web cesserà immediatamente. Le disposizioni che per loro natura dovrebbero sopravvivere alla risoluzione rimarranno in vigore."
          ]
        },
        {
          title: "7. Limitazione di Responsabilità",
          paragraphs: [
            "In nessun caso KIQA DEV, né i suoi direttori, dipendenti o partner, saranno responsabili per danni indiretti, incidentali, speciali o consequenziali derivanti dall'uso di questo sito web.",
            "Non garantiamo che il nostro sito web sia privo di errori o continuamente disponibile. Non siamo responsabili per i contenuti o le pratiche sulla privacy di link di terze parti."
          ]
        },
        {
          title: "8. Legge Applicabile",
          paragraphs: [
            "Questi Termini saranno regolati e interpretati in conformità con le leggi del Kosovo e dell'Italia, senza riguardo alle disposizioni sul conflitto di leggi.",
            "Qualsiasi controversia legale derivante dall'uso di questo sito web sarà gestita esclusivamente nelle giurisdizioni riconosciute del Kosovo o dell'Italia."
          ]
        }
      ]
    },
    privacy: {
      title: "Informativa sulla Privacy",
      lastUpdated: "Ultimo aggiornamento: Agosto 2026",
      tldrTitle: "Sintesi TL;DR",
      tldrDesc: "Rispettiamo la tua privacy. Raccogliamo solo le informazioni necessarie per fornirti un preventivo o erogare i nostri servizi (come la tua email e i dettagli del progetto). Non vendiamo mai i tuoi dati a terzi. Il nostro sito utilizza analytics di base incentrati sulla privacy che non tracciano dati personali identificabili.",
      sections: [
        {
          title: "1. Raccolta delle Informazioni",
          paragraphs: [
            "Raccogliamo le informazioni personali che ci fornisci volontariamente quando esprimi interesse a ricevere informazioni su di noi o sui nostri Servizi.",
            "Le informazioni personali che raccogliamo dipendono dal contesto delle tue interazioni con noi, ma includono in genere nome, indirizzo email, nome dell'azienda e requisiti del progetto."
          ]
        },
        {
          title: "2. Modalità di Raccolta",
          paragraphs: [
            "I dati vengono raccolti direttamente da te tramite richieste via email o tramite piattaforme di comunicazione di terze parti su cui avvii il contatto, come WhatsApp o Discord.",
            "Attualmente non utilizziamo moduli di registrazione automatizzati o cookie di tracciamento che raccolgono informazioni personali senza il tuo esplicito consenso."
          ]
        },
        {
          title: "3. Finalità del Trattamento",
          paragraphs: [
            "Trattiamo le tue informazioni personali esclusivamente per scopi commerciali legittimi. Ciò include rispondere alle tue richieste, fornire preventivi personalizzati ed erogare i nostri servizi di sviluppo software.",
            "Possiamo anche utilizzare le tue informazioni per inviarti dettagli amministrativi, come aggiornamenti contrattuali, ricevute di fatturazione o modifiche ai nostri termini."
          ]
        },
        {
          title: "4. Condivisione con Terze Parti",
          paragraphs: [
            "Non vendiamo, affittiamo o scambiamo le tue informazioni personali con terze parti per i loro scopi promozionali.",
            "Possiamo condividere i tuoi dati con fornitori terzi di fiducia che svolgono servizi per nostro conto, come hosting web (Vercel, Cloudflare) o piattaforme di comunicazione (WhatsApp, Gmail)."
          ]
        },
        {
          title: "5. Cookie e Monitoraggio",
          paragraphs: [
            "Il nostro sito web può utilizzare cookie essenziali e strumenti di analisi rispettosi della privacy per misurare il traffico e le prestazioni del sito.",
            "Questi strumenti raccolgono dati aggregati e anonimi (come visualizzazioni di pagina o tipo di browser) e non tracciano i singoli utenti sul web."
          ]
        },
        {
          title: "6. Conservazione dei Dati",
          paragraphs: [
            "Conserveremo le tue informazioni personali solo per il tempo necessario alle finalità indicate in questa informativa, a meno che non sia richiesto un periodo di conservazione più lungo dalla legge.",
            "Quando non avremo più una legittima esigenza aziendale di trattare le tue informazioni personali, le elimineremo o le renderemo anonime."
          ]
        },
        {
          title: "7. Diritti dell'Utente",
          paragraphs: [
            "In base alla tua posizione geografica (come ai sensi del GDPR), potresti avere il diritto di richiedere l'accesso ai dati personali che raccogliamo, modificarli o richiederne l'eliminazione.",
            "Per richiedere di rivedere, aggiornare o eliminare le tue informazioni personali, invia una richiesta scritta direttamente al nostro indirizzo email di contatto."
          ]
        },
        {
          title: "8. Misure di Sicurezza",
          paragraphs: [
            "Abbiamo implementato adeguate misure di sicurezza tecniche e organizzative progettate per proteggere la sicurezza di qualsiasi informazione personale trattata.",
            "Tuttavia, nonostante le nostre garanzie, nessuna trasmissione elettronica su Internet o tecnologia di archiviazione può essere garantita come sicura al 100%."
          ]
        },
        {
          title: "9. Privacy dei Minori",
          paragraphs: [
            "Non sollecitiamo sapientemente dati da minori di 18 anni né commercializziamo verso di essi. Utilizzando questo sito web, dichiari di avere almeno 18 anni.",
            "Se apprendiamo che sono stati raccolti dati personali da utenti di età inferiore a 18 anni, disattiveremo l'account e adotteremo misure ragionevoli per eliminare prontamente tali dati."
          ]
        },
        {
          title: "10. Informazioni di Contatto",
          paragraphs: [
            "Se hai domande o commenti su questa informativa sulla privacy, o se desideri esercitare i tuoi diritti sui dati, puoi contattarci via email.",
            "Invia tutte le richieste relative alla privacy a: contact@kiqa-dev.it."
          ]
        }
      ]
    }
  },
  sq: {
    tos: {
      title: "Kushtet e Shërbimit",
      lastUpdated: "Përditësimi i fundit: Gusht 2026",
      tldrTitle: "Përmbledhje TL;DR",
      tldrDesc: "Këto kushte rregullojnë përdorimin e faqes ueb KIQA DEV. Ajo nuk zëvendëson Marrëveshjet Formale të Shërbimit (MSA) ose kontratat e nënshkruara për punën reale të zhvillimit. Me pak fjalë: mos përdorni scraping apo keqpërdorim të faqes, dizajnet tona na përkasin neve, dhe çdo punë zyrtare projekti do të rregullohet nga një kontratë e veçantë e nënshkruar.",
      sections: [
        {
          title: "1. Hyrja dhe Pranimi i Kushteve",
          paragraphs: [
            'Këto Kushte të Shërbimit ("Kushtet") veprojnë si një kontratë ligjërisht e detyrueshme midis jush dhe KIQA DEV në lidhje me përdorimin e faqes sonë ueb (kiqa-dev.it). Duke hyrë ose përdorur këtë faqe, ju pranoni të jeni të detyruar nga këto Kushte.',
            "Nëse nuk pajtoheni me ndonjë pjesë të këtyre Kushteve, ju ndalohet përdorimi ose qasja në këtë faqe. Këto Kushte zbatohen ekskluzivisht për ndërveprimin tuaj me faqen tonë publike dhe materialet e marketingut."
          ]
        },
        {
          title: "2. Llogaritë e Përdoruesve & Portalet e Klientëve",
          paragraphs: [
            "Aktualisht, KIQA DEV nuk kërkon që ju të krijoni një llogari për të shfletuar portofolin tonë ose për të kërkuar një kuotim. Nëse në të ardhmen prezantojmë portale klientësh, ju do të jeni përgjegjës për ruajtjen e konfidencialitetit të kredencialeve tuaja.",
            "Ne rezervojmë të drejtën të pezullojmë ose të mbyllim llogaritë që shkelin udhëzimet tona të sigurisë ose që tentojnë qasje të paautorizuar."
          ]
        },
        {
          title: "3. Politika e Përdorimit të Pranueshëm",
          paragraphs: [
            "Ju pranooni ta përdorni këtë faqe ueb vetëm për qëllime të ligjshme. Ju ndalohet rreptësisht të angazhoheni në mbledhjen e të dhënave (scraping), nxjerrjen e automatizuar të të dhënave ose përpjekjet për të thyer infrastrukturën tonë të sigurisë.",
            "Ngarkimi i kodit dëmtues, transmetimi i spameve ose përdorimi i formularëve tanë të kontaktit për të ngacmuar ose mashtruar KIQA DEV do të rezultojë në ndalim të menjëhershëm dhe veprime potenciale ligjore."
          ]
        },
        {
          title: "4. Pronësia Intelektuale",
          paragraphs: [
            "Çdo përmbajtje origjinale në këtë faqe ueb—përfshirë tekstin, grafikën, logot, asetet vizuale 3D, pjesët e kodit dhe dizajnet UI—është pronë ekskluzive e KIQA DEV dhe mbrohet nga ligjet ndërkombëtare të së drejtës së autorit.",
            "Ju nuk mund të riprodhoni, shpërndani ose krijoni vepra derivative nga përmbajtja jonë pa lejen tonë eksplicite me shkrim. Prezantimet e projekteve të klientëve mbeten pronë e pronarëve të tyre përkatës."
          ]
        },
        {
          title: "5. Pagesat dhe Pajtimet",
          paragraphs: [
            "Kjo faqe ueb nuk përpunon drejtpërdrejt pagesa dhe nuk mikret abonime. Të gjitha pagesat për shërbimet e zhvillimit menaxhohen përmes faturave të personalizuara.",
            "Ciklet tona të faturimit, rregullat e anulimit dhe politikat e rimbursimit për shërbimet e zhvillimit do të detajohen eksplicisht në Marrëveshjen e Shërbimit (MSA) të nënshkruar përpara fillimit të projektit."
          ]
        },
        {
          title: "6. Klauzola e Përfundimit",
          paragraphs: [
            "Ne rezervojmë të drejtën të ndërpresim ose pezullojmë qasjen tuaj në faqen tonë ueb menjëherë, pa njoftim paraprak ose përgjegjësi, për çfarëdo arsye, përfshirë shkeljen e këtyre Kushteve.",
            "Pas ndërprerjes, e drejta juaj për të përdorur faqen ueb do të ndërpritet menjëherë. Dispozitat që nga natyra e tyre duhet të mbijetojnë ndërprerjen do të mbeten në fuqi."
          ]
        },
        {
          title: "7. Kufizimi i Përgjegjësisë",
          paragraphs: [
            "Në asnjë rrethanë KIQA DEV, e as drejtorët, punonjësit ose partnerët e saj, nuk do të jenë përgjegjës për dëme indirekte, rastësore ose pasuese që rezultojnë nga përdorimi i kësaj faqeje ueb.",
            "Ne nuk garantojmë se faqja jonë do të jetë pa gabime ose e disponueshme vazhdimisht. Ne nuk jemi përgjegjës për përmbajtjen ose praktikat e privatësisë të lidhjeve të palëve të treta."
          ]
        },
        {
          title: "8. Ligji Zbatues",
          paragraphs: [
            "Këto Kushte do të rregullohen dhe interpretohen në përputhje me ligjet e Kosovës dhe Italisë, pa marrë parasysh dispozitat e konfliktit të ligjeve.",
            "Çdo mosmarrëveshje ligjore që rrjedh nga përdorimi i kësaj faqeje ueb do të trajtohet ekskluzivisht në juridiksionet e njohura të Kosovës ose Italisë."
          ]
        }
      ]
    },
    privacy: {
      title: "Politika e Privatësisë",
      lastUpdated: "Përditësimi i fundit: Gusht 2026",
      tldrTitle: "Përmbledhje TL;DR",
      tldrDesc: "Ne respektojmë privatësinë tuaj. Ne mbledhim vetëm informacionin e nevojshëm për t'ju ofruar një kuotim ose për të ofruar shërbimet tona (si emailin tuaj dhe detajet e projektit). Ne kurrë nuk i shesim të dhënat tuaja te palët e treta. Faqja jonë përdor analitikë bazë të përshtatshme për privatësinë që nuk gjurmojnë të dhëna personale të identifikueshme.",
      sections: [
        {
          title: "1. Mbledhja e Informacionit",
          paragraphs: [
            "Ne mbledhim informacione personale që na i jepni vullnetarisht kur shprehni interes për të marrë informacione rreth nesh ose Shërbimeve tona.",
            "Informacioni personal që mbledhim varet nga konteksti i ndërveprimeve tuaja me ne, por zakonisht përfshin emrin tuaj, adresën e emailit, emrin e kompanisë dhe kërkesat e projektit."
          ]
        },
        {
          title: "2. Metodat e Mbledhjes",
          paragraphs: [
            "Të dhënat mblidhen drejtpërdrejt nga ju përmes pyetjeve direkte me email ose përmes platformave të komunikimit të palëve të treta ku ju inicionikontaktin, si WhatsApp ose Discord.",
            "Ne aktualisht nuk përdorim formularë të automatizuar të regjistrimit të përdoruesve apo cookies gjurmuese që mbledhin informacione personale pa pëlqimin tuaj eksplicit."
          ]
        },
        {
          title: "3. Qëllimi i Përdorimit",
          paragraphs: [
            "Ne i përpunojmë informacionet tuaja personale rreptësisht për qëllime legitime biznesi. Kjo përfshin përgjigjen ndaj kërkesave tuaja, ofrimin e kuotimeve të personalizuara dhe dorëzimin e shërbimeve tona të zhvillimit të softuerit.",
            "Ne gjithashtu mund të përdorim informacionin tuaj për t'ju dërguar detaje administrative, si përditësime kontratash, fatura ose ndryshime në kushtet tona."
          ]
        },
        {
          title: "4. Ndarja me Palët e Treta",
          paragraphs: [
            "Ne nuk shesim, nuk japim me qira dhe nuk tregtojmë informacionet tuaja personale me palë të treta për qëllime promovuese.",
            "Ne mund të ndajmë të dhënat tuaja me ofrues të besuar të palëve të treta që kryejnë shërbime për ne, si hosting ueb (Vercel, Cloudflare) ose platforma komunikimi (WhatsApp, Gmail)."
          ]
        },
        {
          title: "5. Cookies dhe Monitorimi",
          paragraphs: [
            "Faqja jonë ueb mund të përdorë cookies thelbësore dhe mjete analitike që respektojnë privatësinë për të matur trafikun dhe performancën e faqes.",
            "Këto mjete mbledhin të dhëna të agreguara dhe anonime (si shikimet e faqeve apo lloji i shfletuesit) dhe nuk gjurmojnë përdoruesit individualë në ueb."
          ]
        },
        {
          title: "6. Ruajtja e të Dhënave",
          paragraphs: [
            "Ne do t'i ruajmë informacionet tuaja personale vetëm për aq kohë sa është e nevojshme për qëllimet e përcaktuara në këtë politikë privatësie, përveç nëse kërkohet një periudhë më e gjatë ruajtjeje nga ligji.",
            "Kur të mos kemi më një nevojë të vazhdueshme biznesi për të përpunuar informacionin tuaj personal, ne do ta fshijmë ose do ta bëjmë atë anonim."
          ]
        },
        {
          title: "7. Të Drejtat e Përdoruesit",
          paragraphs: [
            "Mvarësisht nga vendndodhja juaj gjeografike (si sipas GDPR), ju mund të keni të drejtë të kërkoni qasje në të dhënat personale që mbledhim, t'i ndryshoni ato ose të kërkoni fshirjen e tyre.",
            "Për të kërkuar rishikimin, përditësimin ose fshirjen e informacioneve tuaja personale, ju lutemi dërgoni një kërkesë me shkrim drejtpërdrejt në adresën tonë të emailit."
          ]
        },
        {
          title: "8. Masat e Sigurisë",
          paragraphs: [
            "Ne kemi zbatuar masa të përshtatshme teknike dhe organizative të sigurisë të conçepctuara për të mbrojtur sigurinë e çdo informacioni personal që përpunojmë.",
            "Sidoqoftë, me gjithë përpjekjet tona për të siguruar informacionin tuaj, asnjë transmetim elektronik në Internet nuk mund të garantohet 100% i sigurt."
          ]
        },
        {
          title: "9. Privatësia e Fëmijëve",
          paragraphs: [
            "Ne nuk kërkojmë me vetëdije të dhëna nga fëmijët nën 18 vjeç dhe nuk bëjmë marketing për ta. Duke përdorur këtë faqe ueb, ju deklaroni se jeni së paku 18 vjeç.",
            "Nëse mësojmë se janë mbledhur të dhëna personale nga përdorues nën 18 vjeç, ne do ta çaktivizojmë llogarinë dhe do të marrim masa të arsyeshme për fshirjen e tyre."
          ]
        },
        {
          title: "10. Informacioni i Kontaktit",
          paragraphs: [
            "Nëse keni pyetje ose komente rreth kësaj politike të privatësisë, ose dëshironi të ushtroni të drejtat tuaja të të dhënave, mund të na kontaktoni përmes emailit.",
            "Ju lutemi dërgoni të gjitha pyetjet lidhur me privatësinë në: contact@kiqa-dev.it."
          ]
        }
      ]
    }
  },
  de: {
    tos: {
      title: "Nutzungsbedingungen",
      lastUpdated: "Zuletzt aktualisiert: August 2026",
      tldrTitle: "TL;DR Zusammenfassung",
      tldrDesc: "Diese Bedingungen regeln Ihre Nutzung der KIQA DEV-Website. Sie ersetzen keine formellen Rahmenverträge (MSA) oder Verträge, die für tatsächliche Entwicklungsarbeiten unterzeichnet wurden. Kurz gesagt: Betreiben Sie kein Data Scraping oder Missbrauch unserer Website, unsere Designs gehören uns und jede formelle Projektarbeit wird durch einen separaten, unterzeichneten Vertrag geregelt.",
      sections: [
        {
          title: "1. Einleitung & Annahme der Bedingungen",
          paragraphs: [
            'Diese Nutzungsbedingungen ("Bedingungen") stellen einen rechtsverbindlichen Vertrag zwischen Ihnen und KIQA DEV bezüglich Ihrer Nutzung unserer Website (kiqa-dev.it) dar. Durch den Zugriff auf diese Website erklären Sie sich mit diesen Bedingungen einverstanden.',
            "Wenn Sie mit einem Teil dieser Bedingungen nicht einverstanden sind, ist Ihnen die Nutzung dieser Website untersagt. Diese Bedingungen gelten ausschließlich für Ihre Interaktion mit unserer öffentlichen Website und Marketingmaterialien."
          ]
        },
        {
          title: "2. Benutzerkonten & Kundenportale",
          paragraphs: [
            "Derzeit erfordert KIQA DEV keine Erstellung eines Kontos, um unser Portfolio zu durchsuchen oder ein Angebot anzufordern. Wenn wir in Zukunft Kundenportale einführen, sind Sie für die Geheimhaltung Ihrer Zugangsdaten verantwortlich.",
            "Wir behalten uns das Recht vor, Konten zu sperren oder zu kündigen, die gegen unsere Sicherheitsrichtlinien verstoßen oder unbefugte Zugriffsversuche unnehmen."
          ]
        },
        {
          title: "3. Richtlinie für akzeptable Nutzung",
          paragraphs: [
            "Sie stimmen zu, diese Website nur für rechtmäßige Zwecke zu nutzen. Es ist Ihnen strikt untersagt, Data Scraping, automatisierte Datenerfassung oder Versuche zum Einbruch in unsere Sicherheitsinfrastruktur zu unternehmen.",
            "Das Hochladen von schädlichem Code, das Versenden von Spam oder die Nutzung unserer Kontaktformulare zur Belästigung oder zum Betrug von KIQA DEV führt zu einer sofortigen Sperre und möglichen rechtlichen Schritten."
          ]
        },
        {
          title: "4. Geistiges Eigentum",
          paragraphs: [
            "Alle ursprünglichen Inhalte auf dieser Website—einschließlich Texte, Grafiken, Logos, visuelle 3D-Assets, Code-Snippets und UI-Designs—sind das exklusive Eigentum von KIQA DEV und durch internationale Urheberrechtsgesetze geschützt.",
            "Sie dürfen unsere Inhalte nicht ohne unsere ausdrückliche schriftliche Genehmigung vervielfältigen, verbreiten oder abgeleitete Werke erstellen. Präsentionen von Kundenprojekten bleiben Eigentum der jeweiligen Inhaber."
          ]
        },
        {
          title: "5. Zahlung und Abonnements",
          paragraphs: [
            "Diese Website verarbeitet keine Zahlungen direkt und bietet keine Abonnements an. Alle Zahlungen für Entwicklungsdienstleistungen werden über individuelle Rechnungen abgewickelt.",
            "Unsere Abrechnungszyklen, Stornierungsregeln und Rückerstattungsrichtlinien für Freelance-Entwicklungsdienste werden im vor Projektbeginn unterzeichneten Rahmenvertrag (MSA) detailliert beschrieben."
          ]
        },
        {
          title: "6. Kündigungsklausel",
          paragraphs: [
            "Wir behalten uns das Recht vor, Ihren Zugriff auf unsere Website unverzüglich und ohne vorherige Ankündigung oder Haftung aus irgendeinem Grund zu beenden oder zu suspendieren, einschließlich des Verstoßes gegen diese Bedingungen.",
            "Mit der Kündigung erlischt Ihr Recht zur Nutzung der Website sofort. Bestimmungen dieser Bedingungen, die ihrer Natur nach die Kündigung überdauern sollten, bleiben in Kraft."
          ]
        },
        {
          title: "7. Haftungsbeschränkung",
          paragraphs: [
            "In keinem Fall haften KIQA DEV, seine Geschäftsführer, Mitarbeiter oder Partner für indirekte, zufällige oder Folgeschäden, die sich aus Ihrer Nutzung dieser Website ergeben.",
            "Wir garantieren nicht, dass unsere Website sicher, fehlerfrei oder kontinuierlich verfügbar ist. Wir sind nicht für Inhalte oder Datenschutzpraktiken von Links Dritter verantwortlich."
          ]
        },
        {
          title: "8. Anwendbares Recht",
          paragraphs: [
            "Diese Bedingungen unterliegen den Gesetzen des Kosovo und Italiens und werden in Übereinstimmung mit diesen ausgelegt, ohne Rücksicht auf die Bestimmungen des Kollisionsrechts.",
            "Alle rechtlichen Streitigkeiten, die sich aus der Nutzung dieser Website ergeben, werden ausschließlich in den anerkannten Gerichtsständen des Kosovo oder Italiens verhandelt."
          ]
        }
      ]
    },
    privacy: {
      title: "Datenschutzerklärung",
      lastUpdated: "Zuletzt aktualisiert: August 2026",
      tldrTitle: "TL;DR Zusammenfassung",
      tldrDesc: "Wir respektieren Ihre Privatsphäre. Wir erfassen nur die Informationen, die erforderlich sind, um Ihnen ein Angebot zu unterbreiten oder unsere Dienstleistungen zu erbringen (wie Ihre E-Mail-Adresse und Projektdetails). Wir verkaufen Ihre Daten niemals an Dritte. Unsere Website nutzt grundlegende, datenschutzfreundliche Analysen, die keine personenbezogenen Daten nachverfolgen.",
      sections: [
        {
          title: "1. Datenerfassung",
          paragraphs: [
            "Wir erfassen personenbezogene Daten, die Sie uns freiwillig zur Verfügung stellen, wenn Sie Ihr Interesse am Erhalt von Informationen über uns oder unsere Dienstleistungen bekunden.",
            "Die von uns erfassten personenbezogenen Daten hängen vom Kontext Ihrer Interaktionen mit uns ab, umfassen jedoch in der Regel Ihren Namen, Ihre E-Mail-Adresse, Ihren Firmennamen und spezifische Projektanforderungen."
          ]
        },
        {
          title: "2. Erfassungsmethoden",
          paragraphs: [
            "Daten werden direkt von Ihnen über direkte E-Mail-Anfragen oder über Kommunikationsplattformen Dritter erfasst, auf denen Sie den Kontakt initiieren, wie WhatsApp oder Discord.",
            "Wir verwenden derzeit keine automatisierten Benutzerregistrierungsformulare oder Tracking-Cookies, die personenbezogene Daten ohne Ihre ausdrückliche Zustimmung erfassen."
          ]
        },
        {
          title: "3. Verwendungszweck",
          paragraphs: [
            "Wir verarbeiten Ihre personenbezogenen Daten ausschließlich für legitime Geschäftszwecke. Dazu gehört die Beantwortung Ihrer Anfragen, die Erstellung individueller Angebote und die Erbringung unserer vereinbarten Softwareentwicklungsdienste.",
            "Wir können Ihre Daten auch verwenden, um Ihnen administrative Informationen zu senden, wie z.B. Vertragsaktualisierungen, Rechnungsbelege oder Änderungen unserer Bedingungen."
          ]
        },
        {
          title: "4. Weitergabe an Dritte",
          paragraphs: [
            "Wir verkaufen, vermieten oder handeln nicht mit Ihren personenbezogenen Daten an Dritte für deren Werbezwecke.",
            "Wir können Ihre Daten an vertrauenswürdige Drittanbieter weitergeben, die Dienstleistungen für uns erbringen, wie z.B. Webhosting (Vercel, Cloudflare) oder Kommunikationsplattformen (WhatsApp, Gmail)."
          ]
        },
        {
          title: "5. Cookies und Tracking",
          paragraphs: [
            "Unsere Website kann essenzielle Cookies und datenschutzfreundliche Analysetools verwenden, um den Website-Verkehr und die Leistung zu messen.",
            "Diese Tools erfassen aggregierte, anonyme Daten (wie Seitenaufrufe oder Browsertypen) und verfolgen keine einzelnen Benutzer im Web."
          ]
        },
        {
          title: "6. Aufbewahrung von Daten",
          paragraphs: [
            "Wir bewahren Ihre personenbezogenen Daten nur so lange auf, wie es für die in dieser Datenschutzerklärung festgelegten Zwecke erforderlich ist, es sei denn, eine längere Aufbewahrungsfrist ist gesetzlich vorgeschrieben.",
            "Wenn wir keinen laufenden berechtigten geschäftlichen Bedarf mehr haben, Ihre personenbezogenen Daten zu verarbeiten, werden wir diese Daten entweder löschen oder anonymisieren."
          ]
        },
        {
          title: "7. Nutzerrechte",
          paragraphs: [
            "Je nach Ihrem geografischen Standort (z.B. gemäß DSGVO) haben Sie möglicherweise das Recht, Auskunft über die von uns erfassten personenbezogenen Daten zu verlangen, diese zu ändern oder zu löschen.",
            "Um die Überprüfung, Aktualisierung oder Löschung Ihrer personenbezogenen Daten zu beantragen, senden Sie bitte eine schriftliche Anfrage direkt an unsere Kontakt-E-Mail-Adresse."
          ]
        },
        {
          title: "8. Sicherheitsmaßnahmen",
          paragraphs: [
            "Wir haben angemessene technische und organisatorische Sicherheitsmaßnahmen implementiert, um die Sicherheit der von uns verarbeiteten personenbezogenen Daten zu schützen.",
            "Trotz unserer Sicherheitsvorkehrungen kann jedoch keine elektronische Übertragung über das Internet oder Speichertechnologie zu 100% sicher garantiert werden."
          ]
        },
        {
          title: "9. Schutz der Privatsphäre von Kindern",
          paragraphs: [
            "Wir fordern nicht wissentlich Daten von Kindern unter 18 Jahren an und vermarkten auch nicht an diese. Durch die Nutzung dieser Website erklären Sie, dass Sie mindestens 18 Jahre alt sind.",
            "Wenn wir erfahren, dass personenbezogene Daten von Nutzern unter 18 Jahren erfasst wurden, werden wir das Konto deaktivieren und angemessene Maßnahmen zur unverzüglichen Löschung ergreifen."
          ]
        },
        {
          title: "10. Kontaktinformationen",
          paragraphs: [
            "Wenn Sie Fragen oder Anmerkungen zu dieser Datenschutzerklärung haben oder Ihre Datenrechte ausüben möchten, können Sie uns per E-Mail kontaktieren.",
            "Bitte senden Sie alle datenschutzbezogenen Anfragen an: contact@kiqa-dev.it."
          ]
        }
      ]
    }
  }
};
