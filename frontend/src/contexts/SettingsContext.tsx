import { createSignal, createContext, useContext, JSX, createEffect } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import * as en from "../dictionaries/en";
import * as ar from "../dictionaries/ar";

// 1. Define Types
type Theme = 'green' | 'brown' | 'ocean' | 'dark';
export type Locale = "en" | "ar";

// 2. Flatten the dictionary type so TypeScript knows "game.start" is a valid key
type RawDictionary = typeof en.dict;
type Dictionary = i18n.Flatten<RawDictionary>; 

interface SettingsContextValue {
  locale: () => Locale;
  setLocale: (lang: Locale) => void;
  // The 't' function takes a string key and optional arguments
  t: i18n.Translator<Dictionary>; 
  theme: () => Theme;
  setTheme: (theme: Theme) => void;
  direction: () => "ltr" | "rtl";
}

const SettingsContext = createContext<SettingsContextValue>();

export function SettingsProvider(props: { children: JSX.Element }) {
  const [locale, setLocale] = createSignal<Locale>("en");

  // --- THE FIX ---
  // 1. Create a reactive accessor for the dictionary
  const dict = () => i18n.flatten(locale() === "ar" ? ar.dict : en.dict);

  // 2. Use 'translator' (not createTranslator)
  // We pass the accessor function 'dict', not the object itself.
  // We also pass 'resolveTemplate' to handle {{ variables }} if you need them later.
  const t = i18n.translator(dict, i18n.resolveTemplate);

  // Update HTML attributes automatically
  createEffect(() => {
    const dir = locale() === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale();
    document.documentElement.dir = dir;
  });

  const [theme, setTheme] = createSignal<Theme>("green");

  createEffect(() => {
    document.documentElement.setAttribute("data-theme", theme());
  });

  return (
    <SettingsContext.Provider value={{ 
      locale, 
      setLocale, 
      t, 
      theme, 
      setTheme,
      direction: () => locale() === "ar" ? "rtl" : "ltr"
    }}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
};