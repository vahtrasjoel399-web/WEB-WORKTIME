"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { localeNames, localePath, locales, type Dictionary, type Locale } from "@/app/i18n";

const anchors = ["#product", "#how", "#screenshots", "#contact"];
const APP_URL = "https://worktime-one.vercel.app";

function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  return <div className="lang-switch" role="group" aria-label={label}>
    {locales.map((l) => <a key={l} href={localePath(l)} hrefLang={l} lang={l} title={localeNames[l]} aria-current={l === lang ? "true" : undefined}>{l.toUpperCase()}</a>)}
  </div>;
}

export function Nav({ lang, t }: { lang: Locale; t: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = t.nav.links.map((label, i) => [label, anchors[i]]);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <a className="brand" href="#top" aria-label={t.nav.home}><span>W</span>Tööaeg</a>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
    <div className="nav-end">
      <LangSwitch lang={lang} label={t.nav.language}/>
      <a className="nav-cta" href={APP_URL}>{t.openApp} <ArrowUpRight size={15}/></a>
    </div>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={t.nav.toggle}>{open ? <X/> : <Menu/>}</button>
    <AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .22 }} aria-label="Mobile navigation">{links.map(([label, href], i) => <motion.a key={href} href={href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .04 }}>{label}<ArrowUpRight size={18}/></motion.a>)}<LangSwitch lang={lang} label={t.nav.language}/><a href={APP_URL}>{t.openApp} <ArrowUpRight size={18}/></a></motion.nav>}</AnimatePresence>
  </header>;
}
