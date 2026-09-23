'use client';

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export function ContactResult({ failed }: { failed: boolean }) {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">{c.label}</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{failed ? c.chat.errorTitle : c.form.sent}</h1>
        <p className="mt-3 text-muted-foreground">{failed ? c.chat.errorDesc : c.form.sentSub}</p>
        <Link href={failed ? "/contact" : "/"} className="inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-lg border border-border/60 text-sm text-foreground hover:bg-card transition-colors">
          {failed ? c.form.another : t.notFound.backHome}
        </Link>
      </div>
    </main>
  );
}
