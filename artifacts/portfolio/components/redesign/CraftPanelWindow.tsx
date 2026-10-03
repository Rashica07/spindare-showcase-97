// The CraftPanel console, rebuilt from the hero mock on the CraftPanel site
// (rashica07.github.io/craftpanel-site): title bar, server list, live log.
// Same lines as the site, so nothing here claims a feature the app doesn't have.
// To use a real screenshot instead, render <Image> in place of this component.
export function CraftPanelWindow() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_70px_-30px_hsl(var(--primary)/0.35)]"
      role="img"
      aria-label="CraftPanel console showing a running Minecraft server and its live log"
    >
      <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
        <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
        <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">craftpanel — Skyblock Sunday</span>
      </div>
      <div className="grid grid-cols-[27%_1fr] min-h-[300px] sm:grid-cols-[34%_1fr] sm:min-h-[380px]">
        <div className="space-y-3.5 border-r border-border bg-background/40 p-3 sm:p-5">
          {[70, 55, 62, 40].map((w, i) => (
            <div
              key={i}
              className={`flex items-center gap-2.5 rounded-md px-2.5 py-2.5 ${i === 0 ? "bg-primary/10" : ""}`}
            >
              <span className={`h-2 w-2 shrink-0 rounded-full ${i === 0 ? "bg-primary" : "bg-muted-foreground/40"}`} />
              <span className="h-2.5 rounded bg-muted-foreground/25" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
        <div className="space-y-3.5 p-5 font-mono text-[13px] leading-relaxed text-foreground/85 sm:p-7 sm:text-[17px]">
          <div>Starting Paper 1.21.4…</div>
          <div>
            Preparing spawn area: <span className="text-primary">100%</span>
          </div>
          <div>
            <span className="text-emerald-400">Done</span> (9.4s)! For help, type &quot;help&quot;
          </div>
          <div>mossyPixel joined the game</div>
          <div>
            <span className="text-amber-300">[!]</span> world backed up — scheduled
          </div>
          <div>
            &gt; <span className="rd-caret inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
