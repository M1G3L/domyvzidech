import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
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
  ChevronLeft,
  Home,
  Image as ImageIcon,
  FileText,
  X
} from 'lucide-react';
import { properties } from './data';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState<'photos' | 'plans'>('photos');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const allImages = activeTab === 'photos' 
    ? [property.image, ...property.details.gallery]
    : (property.details.floorPlans || []);

  const currentImageIndex = allImages.indexOf(selectedImage || '');

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setSelectedImage(allImages[nextIndex]);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setSelectedImage(allImages[prevIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, currentImageIndex, allImages]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (property) {
      setSelectedImage(property.image);
    }
  }, [property]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Nemovitost nebyla nalezena</h2>
          <Link to="/#offer" className="text-gold hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={20} /> Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (property) {
      if (activeTab === 'photos') {
        setSelectedImage(property.image);
      } else if (activeTab === 'plans' && property.details.floorPlans?.[0]) {
        setSelectedImage(property.details.floorPlans[0]);
      }
    }
  }, [activeTab, property]);

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/#offer" className="flex items-center gap-2 text-dark hover:text-gold transition-colors font-bold">
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
              <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm w-fit mb-4">
                <button 
                  onClick={() => setActiveTab('photos')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === 'photos' ? 'bg-dark text-white shadow-lg' : 'text-gray-400 hover:text-dark'
                  }`}
                >
                  <ImageIcon size={18} />
                  Fotografie
                </button>
                <button 
                  onClick={() => setActiveTab('plans')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === 'plans' ? 'bg-dark text-white shadow-lg' : 'text-gray-400 hover:text-dark'
                  }`}
                >
                  <FileText size={18} />
                  Půdorys
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div 
                    className="aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-gray-200 group relative cursor-zoom-in"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    <img 
                      src={selectedImage || property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {activeTab === 'plans' && (
                      <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
                        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-xl">
                          <span className="text-xs font-bold text-dark uppercase tracking-widest">Půdorys nemovitosti</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {activeTab === 'photos' && (
                    <div className="grid grid-cols-4 gap-4">
                      <div 
                        onClick={() => setSelectedImage(property.image)}
                        className={`aspect-square rounded-2xl overflow-hidden bg-gray-200 shadow-md cursor-pointer border-2 transition-all ${
                          selectedImage === property.image ? 'border-gold ring-4 ring-gold/10' : 'border-transparent'
                        }`}
                      >
                        <img 
                          src={property.image} 
                          alt={property.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      {property.details.gallery.map((img, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setSelectedImage(img)}
                          className={`aspect-square rounded-2xl overflow-hidden bg-gray-200 shadow-md cursor-pointer border-2 transition-all ${
                            selectedImage === img ? 'border-gold ring-4 ring-gold/10' : 'border-transparent'
                          }`}
                        >
                          <img 
                            src={img} 
                            alt={`${property.title} gallery ${idx}`} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'plans' && property.details.floorPlans && property.details.floorPlans.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                      {property.details.floorPlans.map((img, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setSelectedImage(img)}
                          className={`aspect-square rounded-2xl overflow-hidden bg-gray-200 shadow-md cursor-pointer border-2 transition-all ${
                            selectedImage === img ? 'border-gold ring-4 ring-gold/10' : 'border-transparent'
                          }`}
                        >
                          <img 
                            src={img} 
                            alt={`${property.title} plan ${idx}`} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
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

      {/* Lightbox Popup */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X size={32} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage || property.image} 
                alt={property.title} 
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />

              {allImages.length > 1 && (
                <>
                  <button 
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all border border-white/10"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all border border-white/10"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                <p className="text-white text-sm font-medium tracking-wide">
                  {activeTab === 'photos' ? 'Fotografie interiéru' : 'Půdorys nemovitosti'}
                  <span className="ml-3 opacity-50">{currentImageIndex + 1} / {allImages.length}</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyDetail;
