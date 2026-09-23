'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { merged, type Lang, type Translations } from "./translations";

export { translations, type Lang, type Translations } from "./translations";


interface I18nCtx {
  t: Translations;
  lang: Lang;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<I18nCtx>({
  t: merged.en,
  lang: "en",
  setLang: () => {},
});

function detectBrowserLang(): Lang | null {
  try {
    const candidates = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (const raw of candidates) {
      const code = raw.toLowerCase().split("-")[0];
      if (code === "it") return "it";
      if (code === "sq") return "sq";
      if (code === "de") return "de";
      if (code === "en") return "en";
    }
  } catch {}
  return null;
}


export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      let stored = localStorage.getItem("kiqa_lang") as Lang;
      if (!stored) {
        const match = document.cookie.match(/(^| )kiqa_lang=([^;]+)/);
        if (match) stored = match[2] as Lang;
      }
      if (stored && ["en","it","sq","de"].includes(stored)) {
        setLangState(stored);
        return;
      }
      const detected = detectBrowserLang();
      if (detected) setLangState(detected);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("kiqa_lang", l); } catch {}
  };

  const finalT = merged[lang];
  
  // Page titles and descriptions come from each route's metadata (server
  // rendered, English). Only the document language follows the switcher.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ t: finalT, lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLanguage() {
  return useContext(I18nContext);
}
