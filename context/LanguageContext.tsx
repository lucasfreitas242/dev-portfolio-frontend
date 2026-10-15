"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Language, Dictionary, dictionaries } from "@/lib/i18n/dictionaries";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_STORAGE_KEY = "portfolio_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to en-US as requested
  const [language, setLanguageState] = useState<Language>("en-US");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY) as Language | null;
      if (stored === "en-US" || stored === "pt-BR") {
        setLanguageState(stored);
      } else {
        // Default to en-US
        setLanguageState("en-US");
        document.cookie = `${LANG_STORAGE_KEY}=en-US; path=/; max-age=31536000; SameSite=Lax`;
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
      document.cookie = `${LANG_STORAGE_KEY}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // ignore
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en-US" ? "pt-BR" : "en-US");
  }, [language, setLanguage]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: dictionaries[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
