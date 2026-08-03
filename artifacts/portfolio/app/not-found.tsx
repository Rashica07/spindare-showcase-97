'use client';

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">404</p>
        <h1 className="text-4xl font-bold text-foreground">{t.notFound.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{t.notFound.description}</p>
        <Link href="/" className="inline-flex items-center gap-2 mt-8 text-sm text-primary hover:underline">
          {t.notFound.backHome}
        </Link>
      </div>
    </div>
  );
}
