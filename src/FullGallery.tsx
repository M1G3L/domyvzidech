import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Instagram, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const FullGallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const base = import.meta.env.BASE_URL;
  const realizations = [
    { url: `${base}imgs/byt1.jpg`, title: 'Apartmán U Synagogy - Obývací pokoj', location: 'Třebíč', year: '2023', propertyId: 'apartman-u-synagogy', status: 'V nabídce' },
    { url: `${base}imgs/byt2.png`, title: 'Ateliér Pod Baštou - Exteriér', location: 'Třebíč', year: '2022', propertyId: 'atelier-pod-bastou', status: 'Rezervováno' },
    { url: `${base}imgs/byt3.jpg`, title: 'Mezonet UNESCO - Terasa', location: 'Třebíč', year: '2024', propertyId: 'mezonet-unesco', status: 'Připravujeme' },
    { url: `${base}imgs/about_01.jpg`, title: 'Detail rekonstrukce fasády', location: 'Židovská čtvrť', year: '2023', status: 'Prodáno' },
  ];

  return (
    <div className="pt-32 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/#offer" className="inline-flex items-center text-gold font-bold mb-12 hover:gap-2 transition-all group">
          <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          Zpět na hlavní stránku
        </Link>

        <div className="mb-16">
          <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Kompletní portfolio</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-dark mb-6">Naše realizace</h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Prohlédněte si detaily našich rekonstrukcí v historickém jádru Třebíče. Každý projekt je pro nás unikátní výzvou k zachování historie pro budoucí generace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {realizations.map((item, i) => {
            const CardContent = (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl h-full"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-white shadow-lg ${
                      item.status === 'V nabídce' ? 'bg-emerald-500' : 
                      item.status === 'Připravujeme' ? 'bg-gold' : 
                      item.status === 'Rezervováno' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  {item.propertyId && (
                    <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                      <span className="bg-gold text-white px-6 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        Zobrazit detail bytu
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-dark">{item.title}</h3>
                    <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-1 rounded">{item.year}</span>
                  </div>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <Camera className="h-3 w-3" />
                    {item.location}
                  </p>
                </div>
              </motion.div>
            );

            return item.propertyId ? (
              <Link key={i} to={`/property/${item.propertyId}`}>
                {CardContent}
              </Link>
            ) : (
              <div key={i}>
                {CardContent}
              </div>
            );
          })}
        </div>

        <div className="mt-20 p-12 bg-dark rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Chcete vidět více?</h2>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              Sledujte náš Instagram, kde pravidelně sdílíme fotky a videa přímo z průběhu rekonstrukcí. Uvidíte tam detaily, které se na web nevejdou.
            </p>
            <a 
              href="https://www.instagram.com/dum_v_zidech/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-gold hover:bg-gold-dark text-white font-bold rounded-full transition-all shadow-xl shadow-gold/20"
            >
              <Instagram className="h-6 w-6" />
              Sledovat na Instagramu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullGallery;
