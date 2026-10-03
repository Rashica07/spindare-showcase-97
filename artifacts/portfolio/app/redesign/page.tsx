import Link from "next/link";

// Picker for the redesign previews: 3 scopes (rows) x 3 palettes (columns).
const SCOPES = [
  {
    n: 1,
    name: "Restraint pass",
    blurb:
      "Real-weight numbers, two font families, accent colour only on buttons and the active nav. No repeated all-caps labels, no glows or gradient text. Every section stays.",
  },
  {
    n: 2,
    name: "Full less-is-more",
    blurb:
      "Restraint pass, plus Hero > Work > Services > Contact: a two-line hero, no stack ticker, process cards, blog list or loader.",
  },
  {
    n: 3,
    name: "Bugs only",
    blurb: "The original look. The only change is the faux-bold numbers, now real DM Sans weights.",
  },
] as const;

const ACCENTS = [
  { n: 1, name: "Ember", note: "your orange", swatch: "#fd9117" },
  { n: 2, name: "Copper", note: "calmer", swatch: "#d07d4e" },
  { n: 3, name: "Ink & Sage", note: "new", swatch: "#7eb499" },
] as const;

export default function RedesignIndex() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 pt-28 pb-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Redesign previews</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Three amounts of change, three colour options. Tap any combination to open the Home page that way. Nothing
          here is on the real pages, and these links aren&apos;t indexed by search engines.
        </p>

        <Link
          href="/redesign/mix"
          className="mt-10 block rounded-xl border border-primary/40 bg-card p-6 transition-colors hover:bg-secondary"
        >
          <div className="flex items-center gap-2.5">
            <span className="h-3.5 w-3.5 rounded-full" style={{ background: "#d07d4e" }} aria-hidden="true" />
            <span className="h-3.5 w-3.5 rounded-full" style={{ background: "#0c0f12", boxShadow: "0 0 0 1px #2a3038" }} aria-hidden="true" />
            <h2 className="text-xl font-semibold">Your mix: Copper &amp; Ink</h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Copper accent on the ink background. Lean like option 2, with a bit more to fill the page: a big, tilted
            CraftPanel window sliding in from the right with its caption beside it, three more projects, services, and
            a one-line process strip.
          </p>
        </Link>

        <div className="mt-6 flex flex-col gap-6">
          {SCOPES.map((s) => (
            <section key={s.n} className="rounded-xl border border-card-border bg-card p-6">
              <h2 className="text-xl font-semibold">
                {s.n}. {s.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {ACCENTS.map((a) => (
                  <Link
                    key={a.n}
                    href={`/redesign/${s.n}/${a.n}`}
                    className="inline-flex items-center gap-2.5 rounded-lg border border-border px-4 py-3 text-sm hover:bg-secondary transition-colors"
                  >
                    <span className="h-3.5 w-3.5 rounded-full" style={{ background: a.swatch }} aria-hidden="true" />
                    <span className="font-medium">{a.name}</span>
                    <span className="text-xs text-muted-foreground">{a.note}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          <Link href="/" className="underline underline-offset-4 hover:text-foreground">
            Back to the current site
          </Link>
        </p>
      </div>
    </main>
  );
}
