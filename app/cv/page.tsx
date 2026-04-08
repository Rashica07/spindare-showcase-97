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
            <p className="cv-title-line">Full-Stack & Mobile Developer</p>
          </div>
          <div className="cv-contact-block">
            <a href="mailto:newkiqaa@gmail.com">newkiqaa@gmail.com</a>
            <a href="https://github.com/rashica07" target="_blank" rel="noopener noreferrer">github.com/rashica07</a>
            <a href="https://kiq.dev" target="_blank" rel="noopener noreferrer">kiq.dev</a>
            <span>Kosovo / Lecco, Italy</span>
          </div>
        </header>

        <div className="cv-divider" />

        <section className="cv-section">
          <h2 className="cv-section-title">Summary</h2>
          <p className="cv-body-text">
            14-year-old full-stack and mobile developer based in Kosovo, currently living in Lecco, Italy.
            3+ years of self-taught development. Lead developer on Spindare — a React Native social app with
            150k+ lines of code — and sole developer on TravelMe, an AI travel planner. Open to freelance
            web and mobile projects.
          </p>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">Experience</h2>

          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <div>
                <p className="cv-exp-role">Co-Founder & Lead Developer</p>
                <p className="cv-exp-company">Spindare</p>
              </div>
              <span className="cv-exp-date">Jan 2025 – Present</span>
            </div>
            <ul className="cv-bullets">
              <li>Leading all frontend and mobile development on a 3-person cross-border team</li>
              <li>Architected a 300+ component library and full design system from scratch</li>
              <li>Integrated real-time social feed, streak tracking, and AI challenge generation (Gemini)</li>
              <li>Built in-app messaging via Stream Chat and auth via Clerk with custom Supabase ban system</li>
            </ul>
          </div>

          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <div>
                <p className="cv-exp-role">Freelance Developer</p>
                <p className="cv-exp-company">KIQA DEV — kiq.dev</p>
              </div>
              <span className="cv-exp-date">2024 – Present</span>
            </div>
            <ul className="cv-bullets">
              <li>Full-stack web and mobile projects for clients across Italy and Kosovo</li>
              <li>Focus on React Native apps and Next.js web platforms</li>
              <li>End-to-end delivery: design, development, deployment, and maintenance</li>
            </ul>
          </div>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">Projects</h2>

          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <p className="cv-exp-role">Spindare <span className="cv-project-tag">In Development</span></p>
              <a href="https://github.com/biba-work/spindare" className="cv-project-link" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </div>
            <p className="cv-body-text">
              Social gamification platform — users spin for daily challenges, complete them, and share with friends.
              iOS & Android. Stack: React Native, TypeScript, Expo, Supabase, Clerk, Stream Chat, Gemini AI, Backblaze B2.
            </p>
            <div className="cv-stats-row">
              <span>300+ components</span>
              <span>150k+ lines of code</span>
              <span>iOS launch Sep 2026</span>
            </div>
          </div>

          <div className="cv-exp-item">
            <div className="cv-exp-top">
              <p className="cv-exp-role">TravelMe <span className="cv-project-tag soon">Coming Soon</span></p>
              <a href="https://github.com/rashica07/booking-fallc" className="cv-project-link" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </div>
            <p className="cv-body-text">
              AI travel planner — describe your trip in plain language, get a full itinerary with flights, hotels, and day-by-day plan.
              Stack: React Native, TypeScript, OpenAI API, Node.js, MongoDB, Stripe.
            </p>
          </div>
        </section>

        <section className="cv-section cv-two-col">
          <div>
            <h2 className="cv-section-title">Skills</h2>
            <div className="cv-skill-group">
              <p className="cv-skill-label">Languages</p>
              <p className="cv-skill-list">TypeScript, JavaScript, Python, Bash</p>
            </div>
            <div className="cv-skill-group">
              <p className="cv-skill-label">Mobile / Frontend</p>
              <p className="cv-skill-list">React Native, Expo, React, Next.js, Tailwind CSS</p>
            </div>
            <div className="cv-skill-group">
              <p className="cv-skill-label">Backend & Cloud</p>
              <p className="cv-skill-list">Supabase, PostgreSQL, Node.js, Vercel, Cloudflare</p>
            </div>
            <div className="cv-skill-group">
              <p className="cv-skill-label">Tools</p>
              <p className="cv-skill-list">Git, Figma, EAS Build, Claude Code</p>
            </div>
          </div>
          <div>
            <h2 className="cv-section-title">Languages Spoken</h2>
            <div className="cv-skill-group">
              <p className="cv-skill-list">Albanian (Native) · Italian (Fluent) · English (Fluent) · German (Intermediate)</p>
            </div>
            <h2 className="cv-section-title" style={{ marginTop: 24 }}>Education</h2>
            <div className="cv-skill-group">
              <p className="cv-skill-label">Secondary School</p>
              <p className="cv-skill-list">Lecco, Italy · 2024 – Present</p>
            </div>
            <div className="cv-skill-group">
              <p className="cv-skill-label">Self-taught developer</p>
              <p className="cv-skill-list">Building production apps since age 11</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
