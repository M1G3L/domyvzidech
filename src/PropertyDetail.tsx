import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Maximize, 
  Layers, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  ChevronRight,
  Home
} from 'lucide-react';
import { properties } from './data';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Nemovitost nebyla nalezena</h2>
          <Link to="/" className="text-gold hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={20} /> Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-dark hover:text-gold transition-colors font-bold">
            <ArrowLeft size={20} />
            <span>Zpět na výběr</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-sm font-medium text-gray-500">{property.title}</span>
            <span className="text-gold font-bold">{property.price}</span>
          </div>
          <a href="#contact" className="bg-dark text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-gold transition-colors">
            Mám zájem
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            {/* Main Image & Gallery */}
            <div className="space-y-6">
              <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-gray-200">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {property.details.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-gray-200 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <img 
                      src={img} 
                      alt={`${property.title} gallery ${idx}`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    property.status === 'K dispozici' ? 'bg-emerald-500 text-white' : 'bg-gold text-white'
                  }`}>
                    {property.status}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <MapPin size={14} /> Židovská čtvrť, Třebíč
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-dark mb-6 leading-tight">
                  {property.title}
                </h1>
                <p className="text-3xl font-bold text-gold mb-8">{property.price}</p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {property.details.longDesc}
                </p>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-6 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-gold">
                    <Maximize size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Plocha</p>
                    <p className="font-bold text-dark">{property.details.area}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-gold">
                    <Layers size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Podlaží</p>
                    <p className="font-bold text-dark">{property.details.floor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-gold">
                    <Home size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Dispozice</p>
                    <p className="font-bold text-dark">{property.details.disposition}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-gold">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Stav</p>
                    <p className="font-bold text-dark">Po rekonstrukci</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-bold text-dark mb-6">Vybavení a přednosti</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.details.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-600">
                      <CheckCircle2 className="text-emerald-500 h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div id="contact" className="p-8 bg-dark rounded-3xl text-white space-y-6">
                <h3 className="text-2xl font-bold">Máte zájem o prohlídku?</h3>
                <p className="text-gray-400 text-sm">Zanechte nám kontakt a my se vám ozveme s termínem prohlídky nebo dalšími informacemi.</p>
                <div className="space-y-4">
                  <a href="tel:+420777123456" className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Telefon</p>
                      <p className="font-bold">+420 777 123 456</p>
                    </div>
                  </a>
                  <a href="mailto:info@domyvzidech.cz" className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">E-mail</p>
                      <p className="font-bold">info@domyvzidech.cz</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="mt-20 py-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2026 Domy v Židech | Třebíč UNESCO</p>
        </div>
      </footer>
    </div>
  );
};

export default PropertyDetail;
