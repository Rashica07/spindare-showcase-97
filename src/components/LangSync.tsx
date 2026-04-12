"use client";
import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n";

export function LangSync() {
  const { lang } = useLanguage();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
