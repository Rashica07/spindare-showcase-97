"use client";
import { useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";

export default function CVClient() {
  const { t } = useLanguage();
  const cv = t.cv;
  const docRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  const handleSavePDF = async () => {
    if (!docRef.current || generating) return;
    setGenerating(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).jsPDF;
      const canvas = await html2canvas(docRef.current, { scale: 2, useCORS: true, backgroundColor: "#080808" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;
      let y = 0;
      let remaining = imgH;
      while (remaining > 0) {
        pdf.addImage(imgData, "PNG", 0, -y, imgW, imgH);
        remaining -= pageH;
        y += pageH;
        if (remaining > 0) pdf.addPage();
      }
      pdf.save("Kristian-Gjergji-CV.pdf");
    } catch (e) {
      window.print();
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="cv-page">
      <div className="cv-print-bar">
        <span className="cv-print-hint">{cv.note}</span>
        <button className="cv-print-btn cv-print-btn--accent" onClick={handleSavePDF} disabled={generating}>
          {generating ? cv.generating : cv.savePdf}
        </button>
        <button className="cv-print-btn" onClick={() => window.print()}>{cv.printCv}</button>
      </div>

      <div className="cv-doc" ref={docRef}>
        <div className="cv-header">
          <div>
            <h1 className="cv-name">Kristian Gjergji</h1>
            <p className="cv-title-line">{cv.titleLine}</p>
          </div>
          <div className="cv-contact-block">
            <a href="mailto:contact@kiqa-dev.it">contact@kiqa-dev.it</a>
            <a href="https://github.com/rashica07" target="_blank" rel="noopener noreferrer">github.com/rashica07</a>
            <a href="https://kiqa-dev.it" target="_blank" rel="noopener noreferrer">kiqa-dev.it</a>
            <span>{cv.location}</span>
          </div>
        </div>

        <div className="cv-divider" />

        <section className="cv-section">
          <h2 className="cv-section-title">{cv.summary}</h2>
          <p className="cv-body-text">{cv.summaryText}</p>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">{cv.experience}</h2>
          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <div>
                <p className="cv-exp-role">{cv.exp.spindare.role}</p>
                <p className="cv-exp-company">Spindare</p>
              </div>
              <span className="cv-exp-date">{cv.exp.spindare.date}</span>
            </div>
            <ul className="cv-bullets">{cv.exp.spindare.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
            <div className="cv-stats-row">{cv.exp.spindare.stats.map((s, i) => <span key={i}>{s}</span>)}</div>
          </div>
          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <div>
                <p className="cv-exp-role">{cv.exp.kiqa.role}</p>
                <p className="cv-exp-company">KIQA DEV — kiqa-dev.it</p>
              </div>
              <span className="cv-exp-date">{cv.exp.kiqa.date}</span>
            </div>
            <ul className="cv-bullets">{cv.exp.kiqa.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">{cv.projects}</h2>
          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <p className="cv-exp-role">Spindare<span className="cv-project-tag">{cv.proj.inDev}</span></p>
              <a href="https://spindare.it" className="cv-project-link" target="_blank" rel="noopener noreferrer">spindare.it ↗</a>
            </div>
            <p className="cv-body-text">{cv.proj.spindare.desc}</p>
            <p className="cv-body-text" style={{ marginTop: 8 }}><strong style={{ color: "var(--text)", fontWeight: 500 }}>{cv.proj.stack}:</strong>{" "}React Native, Expo, TypeScript, Supabase, PostgreSQL, Clerk, Stream Chat, Backblaze B2, Vercel, Cloudflare</p>
          </div>
          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <p className="cv-exp-role">Custom Gaming Console<span className="cv-project-tag">{cv.proj.hardware}</span></p>
              <span className="cv-exp-date">2024</span>
            </div>
            <p className="cv-body-text">{cv.proj.console.desc}</p>
          </div>
          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <p className="cv-exp-role">Developer Portfolio<span className="cv-project-tag">{cv.proj.web}</span></p>
              <a href="https://kiqa-dev.it" className="cv-project-link" target="_blank" rel="noopener noreferrer">kiqa-dev.it ↗</a>
            </div>
            <p className="cv-body-text">{cv.proj.portfolio.desc}</p>
            <p className="cv-body-text" style={{ marginTop: 8 }}><strong style={{ color: "var(--text)", fontWeight: 500 }}>{cv.proj.stack}:</strong>{" "}React, Next.js, TypeScript, Tailwind CSS, Vercel</p>
          </div>
          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <p className="cv-exp-role">TravelMe<span className="cv-project-tag soon">{cv.proj.soon}</span></p>
            </div>
            <p className="cv-body-text">{cv.proj.travel.desc}</p>
            <p className="cv-body-text" style={{ marginTop: 8 }}><strong style={{ color: "var(--text)", fontWeight: 500 }}>{cv.proj.stack}:</strong>{" "}React Native, TypeScript, OpenAI API, Node.js, MongoDB, Stripe</p>
          </div>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">{cv.skills}</h2>
          <div className="cv-two-col">
            <div>
              <div className="cv-skill-group"><p className="cv-skill-label">{cv.skillLabels.expert}</p><p className="cv-skill-list">TypeScript, JavaScript, React, React Native</p></div>
              <div className="cv-skill-group"><p className="cv-skill-label">{cv.skillLabels.proficient}</p><p className="cv-skill-list">Python, Bash, HTML5, CSS3, SQL</p></div>
              <div className="cv-skill-group"><p className="cv-skill-label">{cv.skillLabels.mobileFront}</p><p className="cv-skill-list">React Native, Expo, Next.js, Tailwind CSS, Responsive design, Component architecture</p></div>
              <div className="cv-skill-group"><p className="cv-skill-label">{cv.skillLabels.backendDb}</p><p className="cv-skill-list">Supabase, PostgreSQL, Node.js, REST APIs, Real-time sync, Serverless functions</p></div>
            </div>
            <div>
              <div className="cv-skill-group"><p className="cv-skill-label">{cv.skillLabels.infra}</p><p className="cv-skill-list">Git, Vercel, Cloudflare, Figma, EAS Build, Claude Code</p></div>
              <div className="cv-skill-group"><p className="cv-skill-label">{cv.skillLabels.services}</p><p className="cv-skill-list">Clerk, Stream Chat, Backblaze B2, Stripe, OpenAI API, Supabase Auth</p></div>
              <div className="cv-skill-group"><p className="cv-skill-label">{cv.skillLabels.spoken}</p><p className="cv-skill-list">{cv.skillLabels.spokenValue}</p></div>
              <div className="cv-skill-group" style={{ marginTop: 16 }}><p className="cv-skill-label">{cv.skillLabels.practices}</p><p className="cv-skill-list">{cv.skillLabels.practicesValue}</p></div>
            </div>
          </div>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">{cv.education}</h2>
          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <div><p className="cv-exp-role">{cv.edu.role}</p></div>
              <span className="cv-exp-date">2022 – Present</span>
            </div>
            <p className="cv-body-text">{cv.edu.desc}</p>
            <ul className="cv-bullets" style={{ marginTop: 8 }}>{cv.edu.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        </section>

        <div className="cv-divider" />

        <section className="cv-section cv-onepage">
          <h2 className="cv-section-title">{cv.onePage}</h2>
          <p className="cv-body-text cv-onepage-tagline">{cv.oneP.tagline}</p>
          <div className="cv-two-col" style={{ marginTop: 20 }}>
            <div>
              <div className="cv-skill-group"><p className="cv-skill-label">{cv.oneP.langs}</p><p className="cv-skill-list">TypeScript, JavaScript, Python</p></div>
              <div className="cv-skill-group"><p className="cv-skill-label">{cv.oneP.frontend}</p><p className="cv-skill-list">React Native, React, Next.js, Tailwind CSS</p></div>
              <div className="cv-skill-group"><p className="cv-skill-label">{cv.oneP.backend}</p><p className="cv-skill-list">Supabase, PostgreSQL, Serverless</p></div>
              <div className="cv-skill-group"><p className="cv-skill-label">{cv.oneP.tools}</p><p className="cv-skill-list">Git, Vercel, Cloudflare, Figma, Claude Code</p></div>
            </div>
            <div>
              <div className="cv-skill-group">
                <p className="cv-skill-label">{cv.oneP.expLabel}</p>
                <ul className="cv-bullets" style={{ paddingLeft: 14 }}>
                  <li><strong style={{ color: "var(--text)", fontWeight: 500 }}>Spindare</strong> (2025–Present) — {cv.oneP.spindareExp}</li>
                  <li><strong style={{ color: "var(--text)", fontWeight: 500 }}>{cv.oneP.freelance}</strong> (2024–Present) — {cv.oneP.freelanceExp}</li>
                  <li><strong style={{ color: "var(--text)", fontWeight: 500 }}>{cv.oneP.selfTaught}</strong> (2022–Present) — {cv.oneP.selfTaughtExp}</li>
                </ul>
              </div>
              <div className="cv-skill-group" style={{ marginTop: 16 }}><p className="cv-skill-label">{cv.oneP.approach}</p><p className="cv-skill-list" style={{ fontStyle: "italic" }}>{cv.oneP.approachValue}</p></div>
              <div className="cv-skill-group" style={{ marginTop: 16 }}>
                <p className="cv-skill-label">{cv.oneP.contact}</p>
                <p className="cv-skill-list">
                  <a href="mailto:contact@kiqa-dev.it" style={{ color: "var(--accent)", textDecoration: "none" }}>contact@kiqa-dev.it</a>
                  {" · "}
                  <a href="https://kiqa-dev.it" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>kiqa-dev.it</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
