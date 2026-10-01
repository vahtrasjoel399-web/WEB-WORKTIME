import { ArrowRight, FileSpreadsheet, MapPin, Mail, Users } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { AppScreenshot } from "@/components/app-screenshot";
import { HeroStage, Magnetic, Parallax, ScrollLine, ScrollProgress, SplitWords, Spotlight, Tilt } from "@/components/motion";
import { dictionaries, isLocale } from "../i18n";
import { notFound } from "next/navigation";

const APP_URL = "https://worktime-one.vercel.app";

const capabilityIcons = [Users, MapPin, FileSpreadsheet];

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dictionaries[lang];
  const shot = (screen: keyof typeof t.screenshots) => ({ screen, alt: t.screenshots[screen] });

  return <main id="top">
    <ScrollProgress />
    <Nav lang={lang} t={t}/>

    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-band" aria-hidden="true"/>
      <div className="hero-copy">
        <Reveal><p className="eyebrow">{t.hero.eyebrow}</p></Reveal>
        <h1 id="hero-title"><SplitWords text={t.hero.title} delay={0.1}/></h1>
        <Reveal delay={0.35}><p className="hero-lede">{t.hero.lede}</p></Reveal>
        <Reveal className="hero-actions" delay={0.45}>
          <Magnetic><a className="btn btn-primary" href={APP_URL}>{t.openApp} <ArrowRight size={16} className="btn-arrow"/></a></Magnetic>
          <Magnetic><a className="btn btn-ghost" href="#contact">{t.getInTouch}</a></Magnetic>
        </Reveal>
      </div>

      <HeroStage>
        <div className="hero-shot">
          <AppScreenshot {...shot("employees")} priority/>
        </div>
      </HeroStage>
    </section>

    <div className="marquee" aria-hidden="true"><div className="marquee-track">{[...t.marquee, ...t.marquee].map((m, i) => <span key={i}>{m}<i>/</i></span>)}</div></div>

    <section className="intro section" id="product">
      <div className="container intro-grid">
        <h2><SplitWords text={t.intro.title}/></h2>
        <Reveal delay={0.15} className="intro-copy">
          <p>{t.intro.lead}</p>
          <p className="muted">{t.intro.muted}</p>
        </Reveal>
      </div>
    </section>

    <Spotlight className="how section" id="how">
      <div className="container">
        <div className="how-head">
          <h2><SplitWords text={t.how.title}/></h2>
          <Reveal delay={0.1}><p>{t.how.lede}</p></Reveal>
        </div>
        <ScrollLine>
          {t.how.steps.map(([title, copy], i) => <Reveal className="step" delay={i * 0.08} key={i}>
            <span className="step-num">{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p>
          </Reveal>)}
        </ScrollLine>
      </div>
    </Spotlight>

    <section className="showcase section" id="screenshots">
      <div className="container">
        <div className="showcase-head">
          <h2><SplitWords text={t.showcase.title}/></h2>
          <Reveal delay={0.1}><p>{t.showcase.lede}</p></Reveal>
        </div>
        <Reveal><Tilt className="shot shot-wide" max={4}><AppScreenshot {...shot("reports")}/></Tilt></Reveal>
        <div className="showcase-split">
          <Reveal><Tilt className="shot"><AppScreenshot {...shot("sites")}/></Tilt></Reveal>
          <Reveal delay={0.1} className="mobile-card">
            <div className="mobile-copy"><h3>{t.showcase.mobileTitle[0]}<br/>{t.showcase.mobileTitle[1]}</h3><p>{t.showcase.mobileCopy}</p></div>
            <Parallax className="phone" offset={50}><AppScreenshot {...shot("mobile-hours")} className="mobile-screen"/></Parallax>
          </Reveal>
        </div>
        <Reveal><Tilt className="shot shot-wide shot-dark" max={4}><AppScreenshot {...shot("map")}/></Tilt></Reveal>
      </div>
    </section>

    <section className="capabilities section">
      <div className="container">
        <h2><SplitWords text={t.capabilities.title}/></h2>
        <div className="cap-grid">
          {t.capabilities.items.map(([title, copy], i) => { const Icon = capabilityIcons[i]; return <Reveal key={i} delay={i * 0.1} className="cap-card">
            <Icon size={24} strokeWidth={1.5} className="cap-icon"/><h3>{title}</h3><p>{copy}</p>
          </Reveal>; })}
        </div>
      </div>
    </section>

    <section className="cta">
      <div className="cta-band" aria-hidden="true"/>
      <div className="container cta-inner">
        <h2><SplitWords text={t.cta.title}/></h2>
        <Reveal delay={0.2} className="hero-actions cta-actions">
          <Magnetic><a className="btn btn-white" href={APP_URL}>{t.openApp} <ArrowRight size={16} className="btn-arrow"/></a></Magnetic>
          <Magnetic><a className="btn btn-outline-light" href="#contact">{t.getInTouch}</a></Magnetic>
        </Reveal>
      </div>
    </section>

    <section className="contact section" id="contact">
      <div className="container contact-grid">
        <div className="contact-info">
          <h2><SplitWords text={t.contact.title}/></h2>
          <Reveal delay={0.1}><p className="muted">{t.contact.lede}</p>
            <div className="contact-links">
              <a href="mailto:joel@worktime.ee"><Mail size={18}/><span><small>{t.contact.tech}</small>joel@worktime.ee</span></a>
              <a href="mailto:stepan@worktime.ee"><Mail size={18}/><span><small>{t.contact.sales}</small>stepan@worktime.ee</span></a>
            </div>
          </Reveal>
        </div>
        <Reveal className="form-card" delay={0.15}><ContactForm t={t.form}/></Reveal>
      </div>
    </section>

    <footer>
      <div className="container footer-inner">
        <a className="brand" href="#top"><span>W</span>Tööaeg</a>
        <div className="footer-links"><a href={APP_URL}>{t.openApp}</a><a href="mailto:joel@worktime.ee">joel@worktime.ee</a><a href="mailto:stepan@worktime.ee">stepan@worktime.ee</a><a href="#contact">{t.nav.links[3]}</a></div>
        <p>© {new Date().getFullYear()} Tööaeg</p>
      </div>
    </footer>
  </main>;
}
