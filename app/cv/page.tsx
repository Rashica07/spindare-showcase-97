"use client";

export default function CVPage() {
  return (
    <div className="cv-page">
      <div className="cv-print-bar">
        <a href="/cv.pdf" download className="cv-print-btn">
          Download PDF
        </a>
        <button className="cv-print-btn" onClick={() => window.print()}>
          Print CV
        </button>
      </div>

      <div className="cv-doc">
        <header className="cv-header">
          <div>
            <h1 className="cv-name">Kristian Gjergji</h1>
            <p className="cv-title-line">Full-Stack Developer · Product Designer · Mobile Engineer</p>
          </div>
          <div className="cv-contact-block">
            <a href="mailto:contact@kiqa-dev.it">contact@kiqa-dev.it</a>
            <a href="https://github.com/rashica07" target="_blank" rel="noopener noreferrer">github.com/rashica07</a>
            <a href="https://kiqa-dev.it" target="_blank" rel="noopener noreferrer">kiqa-dev.it</a>
            <span>Lecco, Italy · Remote-friendly</span>
          </div>
        </header>

        <div className="cv-divider" />

        <section className="cv-section">
          <h2 className="cv-section-title">Professional Summary</h2>
          <p className="cv-body-text">
            Self-employed developer specializing in mobile-first applications and full-stack
            development. Currently leading UI/UX development for Spindare, a social gamification
            platform with 300+ components and production-grade architecture. Passionate about
            shipping clean, performant products that solve real problems. Open to select freelance
            projects starting June 2026.
          </p>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">Experience</h2>

          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <div>
                <p className="cv-exp-role">Co-Founder &amp; Lead UI/UX Developer</p>
                <p className="cv-exp-company">Spindare</p>
              </div>
              <span className="cv-exp-date">Jan 2025 – Present · Remote</span>
            </div>
            <ul className="cv-bullets">
              <li>Architected a 300+ component library and full design system for a React Native application from scratch</li>
              <li>Built 300+ TypeScript components with comprehensive type safety across iOS and Android platforms</li>
              <li>Implemented real-time social feed with Supabase Realtime subscriptions and offline-first architecture</li>
              <li>Integrated Stream Chat for production messaging with JWT authentication</li>
              <li>Built custom authentication flow with Clerk integration and Supabase ban system</li>
              <li>Reduced app bundle size by 40% through code-splitting optimization</li>
              <li>Collaborated with cross-functional distributed team across Italy and Albania</li>
            </ul>
            <div className="cv-stats-row">
              <span>300+ components</span>
              <span>40,000+ lines of code</span>
              <span>iOS launch Sep 2026</span>
            </div>
          </div>

          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <div>
                <p className="cv-exp-role">Self-Employed Developer</p>
                <p className="cv-exp-company">KIQA DEV — kiqa-dev.it</p>
              </div>
              <span className="cv-exp-date">2024 – Present · Italy</span>
            </div>
            <ul className="cv-bullets">
              <li>Full-stack development services focusing on React Native mobile apps and Next.js web platforms</li>
              <li>End-to-end delivery: architecture, UI/UX design, development, deployment, and maintenance</li>
              <li>Mobile app development for iOS and Android; web application development</li>
              <li>Database architecture, cloud infrastructure setup, and performance optimization</li>
            </ul>
          </div>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">Projects</h2>

          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <p className="cv-exp-role">
                Spindare
                <span className="cv-project-tag">In Development</span>
              </p>
              <a href="https://spindare.it" className="cv-project-link" target="_blank" rel="noopener noreferrer">spindare.it ↗</a>
            </div>
            <p className="cv-body-text">
              Social gamification platform — users spin a wheel for daily challenges, complete them, and share with
              friends. Built for iOS and Android with real-time social feed, 200+ curated challenges, offline-first
              architecture, and production-grade messaging.
            </p>
            <p className="cv-body-text" style={{ marginTop: 8 }}>
              <strong style={{ color: "var(--text)", fontWeight: 500 }}>Stack:</strong>{" "}
              React Native, Expo, TypeScript, Supabase, PostgreSQL, Clerk, Stream Chat, Backblaze B2, Vercel, Cloudflare
            </p>
          </div>

          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <p className="cv-exp-role">
                Custom Gaming Console
                <span className="cv-project-tag">Hardware</span>
              </p>
              <span className="cv-exp-date">2024</span>
            </div>
            <p className="cv-body-text">
              Engineered a high-performance custom gaming console combining hardware expertise with system-level
              optimization. Custom APU architecture, 32GB unified RAM, 10TB storage, titanium/aluminum composite
              chassis with liquid metal cooling. Multi-platform compatibility across PS1/2/3/5 and PC.
            </p>
          </div>

          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <p className="cv-exp-role">
                Developer Portfolio
                <span className="cv-project-tag">Web</span>
              </p>
              <a href="https://kiqa-dev.it" className="cv-project-link" target="_blank" rel="noopener noreferrer">kiqa-dev.it ↗</a>
            </div>
            <p className="cv-body-text">
              Professional portfolio showcasing development work and services. Multi-page Next.js site with 4-language
              support, SEO optimization, and Cloudflare CDN delivery.
            </p>
            <p className="cv-body-text" style={{ marginTop: 8 }}>
              <strong style={{ color: "var(--text)", fontWeight: 500 }}>Stack:</strong>{" "}
              React, Next.js, TypeScript, Tailwind CSS, Vercel
            </p>
          </div>

          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <p className="cv-exp-role">
                TravelMe
                <span className="cv-project-tag soon">Coming Soon</span>
              </p>
            </div>
            <p className="cv-body-text">
              AI travel planner — describe your trip in plain language, get a full itinerary with flights, hotels, and
              day-by-day plan.
            </p>
            <p className="cv-body-text" style={{ marginTop: 8 }}>
              <strong style={{ color: "var(--text)", fontWeight: 500 }}>Stack:</strong>{" "}
              React Native, TypeScript, OpenAI API, Node.js, MongoDB, Stripe
            </p>
          </div>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">Technical Skills</h2>
          <div className="cv-two-col">
            <div>
              <div className="cv-skill-group">
                <p className="cv-skill-label">Expert</p>
                <p className="cv-skill-list">TypeScript, JavaScript, React, React Native</p>
              </div>
              <div className="cv-skill-group">
                <p className="cv-skill-label">Proficient</p>
                <p className="cv-skill-list">Python, Bash, HTML5, CSS3, SQL</p>
              </div>
              <div className="cv-skill-group">
                <p className="cv-skill-label">Mobile / Frontend</p>
                <p className="cv-skill-list">React Native, Expo, Next.js, Tailwind CSS, Responsive design, Component architecture</p>
              </div>
              <div className="cv-skill-group">
                <p className="cv-skill-label">Backend &amp; Database</p>
                <p className="cv-skill-list">Supabase, PostgreSQL, Node.js, REST APIs, Real-time sync, Serverless functions</p>
              </div>
            </div>
            <div>
              <div className="cv-skill-group">
                <p className="cv-skill-label">Infrastructure &amp; Tools</p>
                <p className="cv-skill-list">Git, Vercel, Cloudflare, Figma, EAS Build, Claude Code</p>
              </div>
              <div className="cv-skill-group">
                <p className="cv-skill-label">Services &amp; APIs</p>
                <p className="cv-skill-list">Clerk, Stream Chat, Backblaze B2, Stripe, OpenAI API, Supabase Auth</p>
              </div>
              <div className="cv-skill-group">
                <p className="cv-skill-label">Languages Spoken</p>
                <p className="cv-skill-list">Albanian (Native) · English (Fluent) · Italian (Intermediate) · German (Basic)</p>
              </div>
              <div className="cv-skill-group" style={{ marginTop: 16 }}>
                <p className="cv-skill-label">Development Practices</p>
                <p className="cv-skill-list">Agile, component-driven development, type-safe programming, mobile-first design, performance optimization</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">Education</h2>
          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <div>
                <p className="cv-exp-role">Self-Taught Developer</p>
              </div>
              <span className="cv-exp-date">2022 – Present</span>
            </div>
            <p className="cv-body-text">
              Intensive self-directed learning focused on modern web and mobile development.
              Progressed from frontend fundamentals to production-grade full-stack applications.
            </p>
            <ul className="cv-bullets" style={{ marginTop: 8 }}>
              <li>Frontend: HTML/CSS → JavaScript → React → React Native → TypeScript</li>
              <li>Backend: REST APIs → PostgreSQL → Supabase → Serverless edge computing</li>
              <li>Infrastructure: Git → CI/CD → Cloud deployment → Production monitoring</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
