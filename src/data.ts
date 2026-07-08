const base = import.meta.env.BASE_URL;

export const properties = [
  { 
    id: 'apartman-u-synagogy',
    title: 'Apartmán U Synagogy', 
    price: '4.850.000 Kč', 
    status: 'K dispozici', 
    desc: 'Stylový byt 2+kk s výhledem na historické uličky a původními klenbami.', 
    image: `${base}imgs/byt1.jpg`,
    details: {
      area: '54 m²',
      floor: '2. NP',
      disposition: '2+kk',
      features: ['Původní klenby', 'Výhled na synagogu', 'Nová okna', 'Podlahové vytápění'],
      longDesc: 'Tento unikátní apartmán se nachází v samém srdci židovské čtvrti, jen pár kroků od Zadní synagogy. Rekonstrukce byla provedena s maximálním důrazem na zachování historických prvků, jako jsou klenuté stropy v obývacím pokoji. Byt nabízí moderní komfort v historickém obalu.',
      gallery: [
        `${base}imgs/byt1_2.jpg`,
        `${base}imgs/byt1_3.jpg`
      ],
      floorPlans: [
        'https://picsum.photos/seed/floorplan1/1200/800'
      ]
    }
  },
  { 
    id: 'atelier-pod-bastou',
    title: 'Ateliér Pod Baštou', 
    price: '3.200.000 Kč', 
    status: 'Rezervováno', 
    desc: 'Unikátní prostor v přízemí historického domu, ideální jako investice nebo kancelář.', 
    image: `${base}imgs/byt2.png`,
    details: {
      area: '38 m²',
      floor: '1. NP',
      disposition: '1+kk / Ateliér',
      features: ['Kamenné zdivo', 'Vlastní vchod z ulice', 'Vysoké stropy', 'Historický portál'],
      longDesc: 'Ateliér v přízemí domu s bohatou historií. Prostor je charakteristický přiznaným kamenným zdivem, které dodává interiéru nezaměnitelnou atmosféru. Ideální pro kreativní studio, galerii nebo stylové ubytování typu Airbnb.',
      gallery: [
        `${base}imgs/byt2_1.png`,
        `${base}imgs/byt2_2.png`,
        `${base}imgs/byt2_3.png`,
        `${base}imgs/byt2_4.png`,
        `${base}imgs/byt2_5.png`,
        `${base}imgs/byt2_6.png`
      ],
      floorPlans: [
        'https://picsum.photos/seed/floorplan2/1200/800'
      ]
    }
  },
  { 
    id: 'mezonet-unesco',
    title: 'Mezonet UNESCO', 
    price: '7.900.000 Kč', 
    status: 'Připravuje se', 
    desc: 'Prostorný mezonet 4+kk v podkroví s terasou a výhledem na celou Třebíč.', 
    image: `${base}imgs/byt3.jpg`,
    details: {
      area: '112 m²',
      floor: '3. a 4. NP',
      disposition: '4+kk',
      features: ['Terasa s výhledem', 'Klimatizace', 'Dvě koupelny', 'Původní trámoví'],
      longDesc: 'Vlajková loď našeho projektu. Mezonetový byt v podkroví historického domu nabízí velkorysý prostor a dechberoucí výhledy na baziliku sv. Prokopa a panorama města. Kombinace moderního designu a historických trámů vytváří luxusní bydlení bez kompromisů.',
      gallery: [
        `${base}imgs/byt3_1.jpg`,
        `${base}imgs/byt3_2.jpg`,
        `${base}imgs/byt3_3.jpg`,
        `${base}imgs/byt3_4.jpg`
      ],
      floorPlans: [
        'https://picsum.photos/seed/floorplan3/1200/800',
        'https://picsum.photos/seed/floorplan4/1200/800'
      ]
    }
  },
];
