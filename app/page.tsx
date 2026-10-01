import { ArrowRight, FileSpreadsheet, MapPin, Mail, Users } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { AppScreenshot } from "@/components/app-screenshot";
import { HeroStage, Magnetic, Parallax, ScrollLine, ScrollProgress, SplitWords, Spotlight, Tilt } from "@/components/motion";

const APP_URL = "https://worktime-one.vercel.app";

const steps = [
  ["01", "Lisa töötajad", "Koonda töötajate kontaktid, staatus ja tunnipõhine hind ühte vaatesse."],
  ["02", "Määra objektid", "Lisa töökohad, aadressid ja tööpiirkonnad, kus aega arvestatakse."],
  ["03", "Jälgi hetkeolukorda", "Vaata kaardilt vahetuse alustanud töötaja asukohta."],
  ["04", "Koosta aruanne", "Filtreeri perioodi, töötaja või objekti järgi ning ekspordi tulemused."],
];

const capabilities = [
  [Users, "Töötajate haldus", "Kontaktid, staatus, nädala töötunnid ja arvestus ühes kohas."],
  [MapPin, "Objektid ja elav kaart", "Halda töökohti ning vaata vahetuse alustamise asukohta kaardil."],
  [FileSpreadsheet, "Aruanded ja eksport", "Filtreeri tööaega ning ekspordi aruanded CSV- või Exceli failina."],
] as const;

const marquee = ["Tööaja arvestus", "Töötajad", "Objektid", "Elav kaart", "Aruanded", "CSV & Excel", "Mobiilivaade", "Tunnihinnad"];

export default function Home() {
  return <main id="top">
    <ScrollProgress />
    <Nav />

    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-band" aria-hidden="true"/>
      <div className="hero-copy">
        <Reveal><p className="eyebrow">Tööaja arvestus ettevõttele</p></Reveal>
        <h1 id="hero-title"><SplitWords text={"Tööaeg.\nSelgelt arvel."} delay={0.1}/></h1>
        <Reveal delay={0.35}><p className="hero-lede">Halda töötajaid ja objekte, jälgi käimasolevat tööd ning koosta aruandeid ühest selgest rakendusest.</p></Reveal>
        <Reveal className="hero-actions" delay={0.45}>
          <Magnetic><a className="btn btn-primary" href={APP_URL}>Ava rakendus <ArrowRight size={16} className="btn-arrow"/></a></Magnetic>
          <Magnetic><a className="btn btn-ghost" href="#contact">Võta ühendust</a></Magnetic>
        </Reveal>
      </div>

      <HeroStage>
        <div className="hero-shot">
          <AppScreenshot screen="employees" priority/>
        </div>
      </HeroStage>
    </section>

    <div className="marquee" aria-hidden="true"><div className="marquee-track">{[...marquee, ...marquee].map((m, i) => <span key={i}>{m}<i>/</i></span>)}</div></div>

    <section className="intro section" id="product">
      <div className="container intro-grid">
        <h2><SplitWords text={"Töö ülevaade.\nIlma liigse mürata."}/></h2>
        <Reveal delay={0.15} className="intro-copy">
          <p>Tööaeg annab tööandjale ühe koha töötajate, objektide, töötundide ja kulude haldamiseks.</p>
          <p className="muted">Töötaja näeb, kus töö toimub. Juht näeb, kes töötab, kui kaua ja millisel objektil.</p>
        </Reveal>
      </div>
    </section>

    <Spotlight className="how section" id="how">
      <div className="container">
        <div className="how-head">
          <h2><SplitWords text={"Seadistusest\naruandeni."}/></h2>
          <Reveal delay={0.1}><p>Neli selget sammu töötajate ja objektide haldamisest kuni tööaja aruandluseni.</p></Reveal>
        </div>
        <ScrollLine>
          {steps.map(([num, title, copy], i) => <Reveal className="step" delay={i * 0.08} key={num}>
            <span className="step-num">{num}</span><h3>{title}</h3><p>{copy}</p>
          </Reveal>)}
        </ScrollLine>
      </div>
    </Spotlight>

    <section className="showcase section" id="screenshots">
      <div className="container">
        <div className="showcase-head">
          <h2><SplitWords text={"Kogu pilt ees.\nDetailid käeulatuses."}/></h2>
          <Reveal delay={0.1}><p>Päris rakenduse vaated näitavad tööaja arvestust sellisena, nagu seda iga päev kasutatakse.</p></Reveal>
        </div>
        <Reveal><Tilt className="shot shot-wide" max={4}><AppScreenshot screen="reports"/></Tilt></Reveal>
        <div className="showcase-split">
          <Reveal><Tilt className="shot"><AppScreenshot screen="sites"/></Tilt></Reveal>
          <Reveal delay={0.1} className="mobile-card">
            <div className="mobile-copy"><h3>Oma tunnid.<br/>Alati kaasas.</h3><p>Töötaja näeb kuu- ja nädalapõhist tööaega ning teenitud summat otse telefonist.</p></div>
            <Parallax className="phone" offset={50}><AppScreenshot screen="mobile-hours" className="mobile-screen"/></Parallax>
          </Reveal>
        </div>
        <Reveal><Tilt className="shot shot-wide shot-dark" max={4}><AppScreenshot screen="map"/></Tilt></Reveal>
      </div>
    </section>

    <section className="capabilities section">
      <div className="container">
        <h2><SplitWords text={"Loodud päris tööpäeva jaoks."}/></h2>
        <div className="cap-grid">
          {capabilities.map(([Icon, title, copy], i) => <Reveal key={title} delay={i * 0.1} className="cap-card">
            <Icon size={24} strokeWidth={1.5} className="cap-icon"/><h3>{title}</h3><p>{copy}</p>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section className="cta">
      <div className="cta-band" aria-hidden="true"/>
      <div className="container cta-inner">
        <h2><SplitWords text={"Tööaeg.\nÜhes kohas."}/></h2>
        <Reveal delay={0.2} className="hero-actions cta-actions">
          <Magnetic><a className="btn btn-white" href={APP_URL}>Ava rakendus <ArrowRight size={16} className="btn-arrow"/></a></Magnetic>
          <Magnetic><a className="btn btn-outline-light" href="#contact">Võta ühendust</a></Magnetic>
        </Reveal>
      </div>
    </section>

    <section className="contact section" id="contact">
      <div className="container contact-grid">
        <div className="contact-info">
          <h2><SplitWords text={"Räägime teie\ntöökorraldusest."}/></h2>
          <Reveal delay={0.1}><p className="muted">Kas soovite Tööaja kohta rohkem teada? Kirjutage otse või jätke sõnum.</p>
            <div className="contact-links">
              <a href="mailto:joel@worktime.ee"><Mail size={18}/><span><small>Tehnilised küsimused · Joel</small>joel@worktime.ee</span></a>
              <a href="mailto:stepan@worktime.ee"><Mail size={18}/><span><small>Müük ja muud küsimused · Stepan</small>stepan@worktime.ee</span></a>
            </div>
          </Reveal>
        </div>
        <Reveal className="form-card" delay={0.15}><ContactForm/></Reveal>
      </div>
    </section>

    <footer>
      <div className="container footer-inner">
        <a className="brand" href="#top"><span>W</span>Tööaeg</a>
        <div className="footer-links"><a href={APP_URL}>Ava rakendus</a><a href="mailto:joel@worktime.ee">joel@worktime.ee</a><a href="mailto:stepan@worktime.ee">stepan@worktime.ee</a><a href="#contact">Kontakt</a></div>
        <p>© {new Date().getFullYear()} Tööaeg</p>
      </div>
    </footer>
  </main>;
}
