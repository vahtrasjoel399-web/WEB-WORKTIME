import { ArrowDown, ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { AppScreenshot } from "@/components/app-screenshot";

const steps = [
  ["01", "Lisa töötajad", "Koonda töötajate kontaktid, staatus ja tunnipõhine hind ühte vaatesse."],
  ["02", "Määra objektid", "Lisa töökohad, aadressid ja tööpiirkonnad, kus aega arvestatakse."],
  ["03", "Jälgi hetkeolukorda", "Vaata kaardilt vahetuse alustanud töötaja asukohta."],
  ["04", "Koosta aruanne", "Filtreeri perioodi, töötaja või objekti järgi ning ekspordi tulemused."],
];

export default function Home() {
  return <main id="top">
    <Nav />
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <Reveal><p className="eyebrow"><span/> TÖÖAJA ARVESTUS ETTEVÕTTELE</p></Reveal>
          <Reveal delay={.08}><h1 id="hero-title">Tööaeg.<br/><em>Selgelt arvel.</em></h1></Reveal>
          <Reveal delay={.16}><p className="hero-lede">Halda töötajaid ja objekte, jälgi käimasolevat tööd ning koosta aruandeid ühest selgest rakendusest.</p></Reveal>
          <Reveal className="hero-actions" delay={.24}><a className="button button-primary" href="https://worktime-one.vercel.app">Ava rakendus <ArrowUpRight size={18}/></a><a className="text-link" href="#contact">Võta ühendust <ArrowDown size={16}/></a></Reveal>
        </div>
        <Reveal className="hero-preview" delay={.18}><AppScreenshot screen="employees" priority/></Reveal>
      </div>
      <div className="hero-foot"><span>Keri edasi</span><i/><span>Tööaeg ühes vaates</span></div>
    </section>

    <section className="intro section" id="product">
      <div className="intro-grid">
        <Reveal><h2>Töö ülevaade.<br/>Ilma liigse mürata.</h2></Reveal>
        <Reveal delay={.1} className="intro-copy"><p>Tööaeg annab tööandjale ühe koha töötajate, objektide, töötundide ja kulude haldamiseks.</p><p className="muted">Töötaja näeb, kus töö toimub. Juht näeb, kes töötab, kui kaua ja millisel objektil.</p></Reveal>
      </div>
    </section>

    <section className="how section" id="how">
      <div className="how-head"><Reveal><h2>Seadistusest<br/>aruandeni.</h2></Reveal><Reveal><p>Neli selget sammu töötajate ja objektide haldamisest kuni tööaja aruandluseni.</p></Reveal></div>
      <div className="steps">{steps.map(([num,title,copy], i) => <Reveal className="step" delay={i*.05} key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p><ArrowUpRight size={19}/></Reveal>)}</div>
    </section>

    <section className="showcase section" id="screenshots">
      <div className="showcase-head"><Reveal><h2>Kogu pilt ees.<br/><em>Detailid käeulatuses.</em></h2></Reveal><Reveal><p>Päris rakenduse vaated näitavad tööaja arvestust sellisena, nagu seda iga päev kasutatakse.</p></Reveal></div>
      <Reveal className="showcase-main"><AppScreenshot screen="reports"/></Reveal>
      <div className="showcase-split">
        <Reveal className="detail-panel"><AppScreenshot screen="sites"/></Reveal>
        <Reveal className="mobile-composition" delay={.1}><div className="mobile-copy"><h3>Oma tunnid.<br/>Alati kaasas.</h3><p>Töötaja näeb kuu- ja nädalapõhist tööaega ning teenitud summat otse telefonist.</p></div><div className="phone"><AppScreenshot screen="mobile-hours" className="mobile-screen"/></div></Reveal>
      </div>
      <Reveal className="map-wide"><AppScreenshot screen="map"/></Reveal>
    </section>

    <section className="capabilities section">
      <div className="cap-title"><Reveal><h2>Loodud päris<br/>tööpäeva jaoks.</h2></Reveal></div>
      <div className="cap-list">
        {[["A", "Töötajate haldus", "Kontaktid, staatus, nädala töötunnid ja arvestus ühes kohas."], ["B", "Objektid ja elav kaart", "Halda töökohti ning vaata vahetuse alustamise asukohta kaardil."], ["C", "Aruanded ja eksport", "Filtreeri tööaega ning ekspordi aruanded CSV- või Exceli failina."]].map(([letter,title,copy], i)=><Reveal className="cap-row" delay={i*.05} key={letter}><span>{letter}</span><h3>{title}</h3><p>{copy}</p><ArrowUpRight/></Reveal>)}
      </div>
    </section>

    <section className="cta section">
      <Reveal><span className="cta-mark">W</span><h2>Tööaeg.<br/><em>Ühes kohas.</em></h2><div><a className="button button-lime" href="https://worktime-one.vercel.app">Ava rakendus <ArrowUpRight size={18}/></a><a className="button button-outline" href="#contact">Võta ühendust</a></div></Reveal>
    </section>

    <section className="contact section" id="contact">
      <div className="contact-info"><Reveal><h2>Räägime teie<br/>töökorraldusest.</h2><p>Kas soovite Tööaja kohta rohkem teada? Kirjutage otse või jätke sõnum.</p><div className="contact-links"><a href="mailto:joel@worktime.ee"><Mail size={18}/><span><small>JOEL</small>joel@worktime.ee</span></a><a href="mailto:stepan@worktime.ee"><Mail size={18}/><span><small>STEPAN</small>stepan@worktime.ee</span></a></div></Reveal></div>
      <Reveal className="form-wrap" delay={.1}><ContactForm/></Reveal>
    </section>

    <footer><a className="brand brand-light" href="#top"><span>W</span>Tööaeg</a><div className="footer-links"><a href="https://worktime-one.vercel.app">Ava rakendus</a><a href="mailto:joel@worktime.ee">joel@worktime.ee</a><a href="#contact">Kontakt</a></div><p>© {new Date().getFullYear()} Tööaeg</p></footer>
  </main>;
}
