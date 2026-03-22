/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X,
  Instagram,
  Phone,
  Mail,
  History,
  Gem,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'O projektu', href: '#about' },
    { name: 'Nabídka', href: '#offer' },
    { name: 'Rekonstrukce', href: '#gallery' },
    { name: 'Reference', href: '#references' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gold flex items-center justify-center rounded-lg shadow-lg">
              <Building2 className="text-white h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tighter leading-none ${scrolled ? 'text-dark' : 'text-white'}`}>DŮM V ŽIDECH</span>
              <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${scrolled ? 'text-gold' : 'text-gold-light'}`}>Třebíč UNESCO</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <a key={link.name} href={link.href} className={`text-sm font-semibold transition-colors hover:text-gold ${scrolled ? 'text-dark' : 'text-white'}`}>
                {link.name}
              </a>
            ))}
            <a href="#contact" className="bg-gold hover:bg-gold-dark text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-gold/20">
              Domluvit prohlídku
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X className={scrolled ? 'text-dark' : 'text-white'} /> : <Menu className={scrolled ? 'text-dark' : 'text-white'} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden bg-white absolute top-full left-0 w-full border-b border-gray-100 shadow-xl">
            <div className="px-4 py-6 space-y-4">
              {links.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block text-lg font-medium text-dark hover:text-gold">
                  {link.name}
                </a>
              ))}
              <a href="#contact" onClick={() => setIsOpen(false)} className="block w-full text-center bg-gold text-white py-4 rounded-xl font-bold">
                Domluvit prohlídku
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://www.abczech.cz/img/Bazilika-sv.-Prokopa-a-zidovska-ctvrt-v-Trebici-PFO1100-2015958.jpg" 
        alt="Panoramatický pohled na Třebíč a baziliku" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-transparent"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 backdrop-blur-md border border-gold/30 mb-8">
          <History className="h-4 w-4 text-gold" />
          <span className="text-xs font-bold text-white uppercase tracking-widest">UNESCO Světové dědictví</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-display font-bold text-white leading-[1.1] mb-8">
          Bydlení s příběhem v srdci <span className="text-gold italic">historické</span> Třebíče
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-2xl font-light">
          Spojení historické autenticity a moderního komfortu. Investujte do nemovitosti v unikátní židovské čtvrti s vysokým potenciálem zhodnocení.
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          <a href="#contact" className="inline-flex items-center justify-center px-10 py-5 bg-gold hover:bg-gold-dark text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-2xl shadow-gold/40">
            Získat aktuální nabídku
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
          <a href="#gallery" className="inline-flex items-center justify-center px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full backdrop-blur-md border border-white/30 transition-all">
            Prohlédnout rekonstrukce
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-32 bg-cream">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://picsum.photos/seed/trebic-house/1000/1250" alt="Detail rekonstrukce - zakladatel projektu" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 hidden md:block">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <p className="text-3xl font-bold text-dark">100%</p>
            </div>
            <p className="text-gray-500 font-medium uppercase tracking-wider text-xs">Kvalita provedení</p>
          </div>
        </motion.div>

        <div>
          <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-6 block">Příběh projektu</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark mb-8 leading-tight">
            Vracíme život historickým domům v židovské čtvrti
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Projekt "Dům v Židech" není jen o prodeji metrů čtverečních. Je o citlivé záchraně architektonického dědictví Třebíče. Každý dům v této UNESCO lokalitě má svou duši, kterou při rekonstrukci pečlivě odkrýváme.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4">
              <History className="h-8 w-8 text-gold flex-shrink-0" />
              <div>
                <h4 className="font-bold text-dark mb-2">Autenticita</h4>
                <p className="text-sm text-gray-500">Zachováváme původní prvky, trámy a klenby tam, kde je to možné.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <TrendingUp className="h-8 w-8 text-gold flex-shrink-0" />
              <div>
                <h4 className="font-bold text-dark mb-2">Investice</h4>
                <p className="text-sm text-gray-500">Lokalita UNESCO zaručuje stabilní růst hodnoty vaší nemovitosti.</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-dark font-medium italic">
              "Naším cílem je vytvořit bydlení, které v sobě snoubí genius loci historického místa s nároky moderního člověka na komfort a technologie."
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PropertyCard = ({ title, price, status, desc, image }: any) => (
  <motion.div whileHover={{ y: -10 }} className="bg-white rounded-3xl overflow-hidden card-shadow hover:card-shadow-hover transition-all border border-gray-50 group">
    <div className="relative h-72 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
      <div className="absolute top-6 left-6">
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
          status === 'K dispozici' ? 'bg-emerald-500 text-white' : 'bg-gold text-white'
        }`}>
          {status}
        </span>
      </div>
    </div>
    <div className="p-8">
      <h4 className="text-2xl font-bold text-dark mb-3">{title}</h4>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">{desc}</p>
      <div className="flex justify-between items-center pt-6 border-t border-gray-50">
        <div>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Cena</p>
          <p className="text-2xl font-bold text-gold">{price}</p>
        </div>
        <button className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-dark hover:bg-gold hover:text-white transition-all">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  </motion.div>
);

const Offer = () => {
  const items = [
    { title: 'Apartmán U Synagogy', price: '4.850.000 Kč', status: 'K dispozici', desc: 'Stylový byt 2+kk s výhledem na historické uličky a původními klenbami.', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800' },
    { title: 'Ateliér Pod Baštou', price: '3.200.000 Kč', status: 'Rezervováno', desc: 'Unikátní prostor v přízemí historického domu, ideální jako investice nebo kancelář.', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800' },
    { title: 'Mezonet UNESCO', price: '7.900.000 Kč', status: 'Připravuje se', desc: 'Prostorný mezonet 4+kk v podkroví s terasou a výhledem na celou Třebíč.', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <section id="offer" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Aktuální nabídka</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark">Najděte svůj prostor v historii</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item, i) => <PropertyCard key={i} {...item} />)}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800', label: 'Rekonstrukce bytu 2+kk, původní trámy' },
    { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800', label: 'Detail kamenného zdiva v interiéru' },
    { url: 'https://images.unsplash.com/photo-1617806118233-18e1db207fa6?auto=format&fit=crop&q=80&w=800', label: 'Moderní kuchyně v historickém kontextu' },
    { url: 'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?auto=format&fit=crop&q=80&w=800', label: 'Ložnice s výhledem na židovskou čtvrť' },
  ];

  return (
    <section id="gallery" className="py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-4">Ukázky reálných rekonstrukcí z historického jádra Třebíče</h2>
          <p className="text-gray-500">Sledujte naši práci a proměny domů krok za krokem.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {images.map((img, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
              <img src={img.url} alt={img.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                <p className="text-white text-xs font-medium">{img.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a href="https://www.instagram.com/dum_v_zidech/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gold text-gold font-bold rounded-full hover:bg-gold hover:text-white transition-all">
            <Instagram className="h-5 w-5" />
            Zobrazit více na Instagramu
          </a>
        </div>
      </div>
    </section>
  );
};

const References = () => (
  <section id="references" className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Reference</span>
          <h2 className="text-4xl font-display font-bold text-dark mb-8">Co říkají naši klienti a investoři</h2>
          <div className="space-y-10">
            {[
              { name: 'Ing. Petr Marek', role: 'Investor', text: 'Spolupráce na rekonstrukci bytu v židovské čtvrti byla profesionální. Oceňuji cit pro detail a dodržení termínů i v náročných podmínkách památkové zóny.' },
              { name: 'Lucie Svobodová', role: 'Majitelka bytu', text: 'Bydlení v Domě v Židech je splněný sen. Podařilo se zachovat atmosféru starého domu, ale přitom se cítím jako v moderní novostavbě.' }
            ].map((ref, i) => (
              <div key={i} className="relative pl-10 border-l-2 border-gold/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gold rounded-full"></div>
                <p className="text-gray-600 mb-4 italic">"{ref.text}"</p>
                <p className="font-bold text-dark">{ref.name}</p>
                <p className="text-xs text-gold font-bold uppercase tracking-widest">{ref.role}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=600" alt="Reference 1" className="rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
          <img src="https://images.unsplash.com/photo-1600607687940-47a04b629753?auto=format&fit=crop&q=80&w=600" alt="Reference 2" className="rounded-2xl shadow-lg mt-8" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-32 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Začněte svůj příběh v Třebíči</h2>
            <p className="text-gray-400 text-lg mb-12">Máte dotaz k nabízeným bytům nebo se chcete přijet podívat na naše realizace? Zanechte nám kontakt a my se vám ozveme zpět.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold border border-gold/20"><Phone className="h-5 w-5" /></div>
                <div><p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Telefon</p><p className="text-white font-bold">+420 777 123 456</p></div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold border border-gold/20"><Mail className="h-5 w-5" /></div>
                <div><p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">E-mail</p><p className="text-white font-bold">info@dumvzidech.cz</p></div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold border border-gold/20"><MapPin className="h-5 w-5" /></div>
                <div><p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Lokalita</p><p className="text-white font-bold">Židovská čtvrť, Třebíč (UNESCO)</p></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-2xl">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="h-10 w-10" /></div>
                <h4 className="text-2xl font-bold text-dark mb-2">Poptávka odeslána</h4>
                <p className="text-gray-500">Děkujeme za váš zájem. Ozveme se vám co nejdříve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <input type="text" placeholder="Jméno" required className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all" />
                  <input type="text" placeholder="Příjmení" required className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all" />
                </div>
                <input type="email" placeholder="E-mail" required className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all" />
                <input type="tel" placeholder="Telefon" required className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all" />
                <textarea rows={4} placeholder="Vaše zpráva" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all resize-none"></textarea>
                <button type="submit" className="w-full py-5 bg-gold hover:bg-gold-dark text-white font-bold rounded-xl shadow-xl shadow-gold/20 transition-all transform hover:scale-[1.02]">
                  Domluvit prohlídku
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-white py-20 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-2">
          <Building2 className="text-gold h-8 w-8" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-dark leading-none">DŮM V ŽIDECH</span>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold">Třebíč UNESCO</span>
          </div>
        </div>
        <div className="flex gap-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
          <a href="#" className="hover:text-gold">Ochrana údajů</a>
          <a href="#" className="hover:text-gold">Cookies</a>
          <a href="#" className="hover:text-gold">Právní informace</a>
        </div>
        <div className="flex gap-4">
          <a href="https://www.instagram.com/dum_v_zidech/" className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gold hover:bg-gold/10 transition-all"><Instagram className="h-6 w-6" /></a>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-50 text-center">
        <p className="text-gray-400 text-sm">© 2026 Dům v Židech. Všechna práva vyhrazena. Realizace v UNESCO lokalitě Třebíč.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Offer />
        <Gallery />
        <References />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
