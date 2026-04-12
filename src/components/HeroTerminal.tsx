"use client";

export function HeroTerminal() {
  return (
    <div className="hero-terminal" aria-hidden="true">
      <div className="ht-bar">
        <span className="ht-dot ht-dot--red" />
        <span className="ht-dot ht-dot--yellow" />
        <span className="ht-dot ht-dot--green" />
        <span className="ht-bar-title">kiqa-dev — zsh</span>
      </div>
      <div className="ht-body">
        <div className="ht-line">
          <span className="ht-prompt">~/kiqa-dev</span>
          <span className="ht-cmd"> $ status</span>
        </div>
        <div className="ht-output">
          <span className="ht-arrow">▸</span>
          <span className="ht-key">building</span>
          <span className="ht-val"> spindare</span>
        </div>
        <div className="ht-output ht-output--dim">
          <span className="ht-indent">  ios · sep 2026 · 3-person team</span>
        </div>

        <div className="ht-spacer" />

        <div className="ht-line">
          <span className="ht-prompt">~/kiqa-dev</span>
          <span className="ht-cmd"> $ available</span>
        </div>
        <div className="ht-output">
          <span className="ht-arrow">▸</span>
          <span className="ht-key">freelance</span>
          <span className="ht-accent"> → jun 2026</span>
        </div>
        <div className="ht-output ht-output--dim">
          <span className="ht-indent">  booking jul–aug 2026 now</span>
        </div>

        <div className="ht-spacer" />

        <div className="ht-line">
          <span className="ht-prompt">~/kiqa-dev</span>
          <span className="ht-cmd"> $ stack</span>
        </div>
        <div className="ht-output ht-output--dim">
          <span className="ht-indent">  react native · expo · typescript</span>
        </div>
        <div className="ht-output ht-output--dim">
          <span className="ht-indent">  next.js · supabase · postgresql</span>
        </div>

        <div className="ht-spacer" />

        <div className="ht-line">
          <span className="ht-prompt">~/kiqa-dev</span>
          <span className="ht-cmd"> $ </span>
          <span className="ht-cursor" />
        </div>
      </div>
    </div>
  );
}
