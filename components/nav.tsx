"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [["Toode", "#product"], ["Kuidas töötab", "#how"], ["Vaated", "#screenshots"], ["Kontakt", "#contact"]];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <a className="brand" href="#top" aria-label="Tööaeg avaleht"><span>W</span>Tööaeg</a>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
    <a className="nav-cta" href="https://worktime-one.vercel.app">Ava rakendus <ArrowUpRight size={15}/></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
    <AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .22 }} aria-label="Mobile navigation">{links.map(([label, href], i) => <motion.a key={href} href={href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .04 }}>{label}<ArrowUpRight size={18}/></motion.a>)}<a href="https://worktime-one.vercel.app">Ava rakendus <ArrowUpRight size={18}/></a></motion.nav>}</AnimatePresence>
  </header>;
}
