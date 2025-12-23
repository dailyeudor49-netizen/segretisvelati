"use client";

import React, { useState, useEffect } from 'react';
import {
  Check,
  Star,
  ShieldCheck,
  Activity,
  Lock,
  Timer,
  Truck,
  ChevronDown,
  ThumbsUp,
  Camera,
  Zap,
  Moon,
  FlaskConical,
  Flame,
} from 'lucide-react';

// --- DATA MOCKUP ---

const PRODUCT_NAME = "MenoBalance Protocollo";
const PRICE_OFFER = "49,99€";
const PRICE_ORIGINAL = "99,99€";

// Tutte le foto uniche per le recensioni
const ALL_WOMEN_PHOTOS = [
  "/images/menobalance-system/donna.jpg",
  "/images/menobalance-system/donna2378.jpg",
  "/images/menobalance-system/donna2387.jpg",
  "/images/menobalance-system/donna24378y.jpg",
  "/images/menobalance-system/donna25378.jpg",
  "/images/menobalance-system/donna3245.jpg",
  "/images/menobalance-system/donna35784.png",
  "/images/menobalance-system/donna42375.jpg",
  "/images/menobalance-system/donna4578.jpg",
  "/images/menobalance-system/donna45987.jpg",
  "/images/menobalance-system/donna534.png",
  "/images/menobalance-system/donna5432.jpg",
  "/images/menobalance-system/donna5438y9.jpg",
  "/images/menobalance-system/donna5479y.jpg",
  "/images/menobalance-system/donna54938.jpg",
  "/images/menobalance-system/donna5843.jpg",
  "/images/menobalance-system/donna59243.jpg",
  "/images/menobalance-system/donna9752.jpg",
  "/images/menobalance-system/donna984.jpg",
  "/images/menobalance-system/donnafoto4.png",
  "/images/menobalance-system/doonna75.jpg",
  "/images/menobalance-system/1.jpg",
];

const RECENT_SALES = [
  { name: "Luisa M.", city: "Roma", product: "3x Confezioni", img: "/images/menobalance-system/prodotto.png" },
  { name: "Anna K.", city: "Milano", product: "Kit Urto", img: "/images/menobalance-system/prodotto.png" },
  { name: "Giovanna B.", city: "Napoli", product: "Protocollo Completo", img: "/images/menobalance-system/prodotto.png" },
  { name: "Carla S.", city: "Torino", product: "MenoBalance Giorno+Notte", img: "/images/menobalance-system/prodotto.png" },
  { name: "Maria R.", city: "Palermo", product: "Offerta 3 Mesi", img: "/images/menobalance-system/prodotto.png" },
];

const FB_COMMENTS = [
  { name: "Sabrina F.", time: "2 min", text: "Ragazze non ci credevo ma funziona!! Ho perso 5kg solo nella prima settimana tra liquidi e gonfiore. Mi sento un'altra. Guardate qua 👇", likes: 142, avatar: ALL_WOMEN_PHOTOS[0], hasImage: true, image: ALL_WOMEN_PHOTOS[6] },
  { name: "Elena G.", time: "14 min", text: "È arrivato ieri. Ho preso la pillola 'Notte' e ho dormito 8 ore di fila. Non succedeva dal 2018. Miracoloso.", likes: 89, avatar: ALL_WOMEN_PHOTOS[1] },
  { name: "Marta V.", time: "32 min", text: "Ma si trova in farmacia? Il mio medico non me ne ha mai parlato...", likes: 45, avatar: ALL_WOMEN_PHOTOS[2], reply: "No Marta, le farmacie non lo vogliono vendere perché costa troppo poco rispetto alle loro medicine inutili! Prendilo qui finché c'è." },
  { name: "Francesca D.", time: "1 ora", text: "Io sono al giorno 15 e ho già perso 9kg! La pancia è piatta. PIATTA. Mio marito mi guarda in modo diverso... 😉 Ecco la prova:", likes: 210, avatar: ALL_WOMEN_PHOTOS[3], hasImage: true, image: ALL_WOMEN_PHOTOS[10] },
  { name: "Giulia R.", time: "2 ore", text: "Ordinato ora. Speriamo arrivi presto, non ne posso più delle vampate.", likes: 12, avatar: ALL_WOMEN_PHOTOS[4], reply: "Ciao Giulia, vedrai che la spedizione è velocissima, a me è arrivato in 24h esatte!" },
  { name: "Paola B.", time: "3 ore", text: "Qualcuno sa se posso pagare al corriere? Non mi fido a mettere la carta online.", likes: 56, avatar: ALL_WOMEN_PHOTOS[5], reply: "Sì Paola! Io ho pagato in contanti al corriere stamattina. Comodissimo." },
  { name: "Cristina L.", time: "4 ore", text: "Ho perso 11kg in 2 settimane senza fare NIENTE di diverso. Ho provato di tutto prima... tisane, beveroni, dieta chetogenica. Questo è l'unico che ha funzionato!", likes: 112, avatar: ALL_WOMEN_PHOTOS[7], hasImage: true, image: ALL_WOMEN_PHOTOS[11] },
  { name: "Valentina S.", time: "5 ore", text: "Arrivato!!! 😍 Il packaging è bellissimo, spero funzioni altrettanto bene. Inizio stasera.", likes: 34, avatar: ALL_WOMEN_PHOTOS[8] },
  { name: "Dott.ssa Marisa (Nutrizionista)", time: "6 ore", text: "Intervengo per confermare la validità della berberina e della melatonina in sinergia. È una formulazione molto intelligente per la perimenopausa.", likes: 455, avatar: ALL_WOMEN_PHOTOS[9] },
  { name: "Anna Maria T.", time: "7 ore", text: "Ma il prezzo è per una confezione o per il kit completo?", likes: 2, avatar: ALL_WOMEN_PHOTOS[12], reply: "Per tutto il kit Anna! È in offerta al 50%." },
  { name: "Roberta P.", time: "8 ore", text: "-14kg in 3 settimane! Mio marito dice che sono più calma e sorridente. Io dico solo che finalmente non mi sveglio in un bagno di sudore. Foto del mio risultato:", likes: 178, avatar: ALL_WOMEN_PHOTOS[13], hasImage: true, image: ALL_WOMEN_PHOTOS[14] },
  { name: "Lucia F.", time: "9 ore", text: "Spedizione velocissima, grazie!", likes: 11, avatar: ALL_WOMEN_PHOTOS[15] },
  { name: "Giorgia M.", time: "10 ore", text: "16kg in meno in un mese!! Le mie amiche in palestra mi hanno chiesto se ho fatto la liposuzione... non ho detto niente, è il mio segreto! 😂", likes: 231, avatar: ALL_WOMEN_PHOTOS[16], hasImage: true, image: ALL_WOMEN_PHOTOS[17] },
  { name: "Simona V.", time: "11 ore", text: "Scusate ma quante capsule ci sono?", likes: 5, avatar: ALL_WOMEN_PHOTOS[18], reply: "Sono 60 capsule totali, 30 giorno e 30 notte. Ti copre tutto il mese." },
  { name: "Carla D.", time: "12 ore", text: "Ho 58 anni, funziona anche per me?", likes: 19, avatar: ALL_WOMEN_PHOTOS[19], reply: "Assolutamente sì Carla, io ne ho 61 e mi ha cambiato la vita." },
  { name: "Tiziana R.", time: "13 ore", text: "Appena ordinato le ultime 3 confezioni per me e mia sorella.", likes: 44, avatar: ALL_WOMEN_PHOTOS[20] },
  { name: "Alessandra C.", time: "14 ore", text: "Finalmente qualcosa di naturale senza ormoni sintetici.", likes: 67, avatar: ALL_WOMEN_PHOTOS[21] },
  { name: "Manuela G.", time: "15 ore", text: "Sono passata da 78kg a 67kg in sole 3 settimane! Guardate il girovita:", likes: 123, avatar: ALL_WOMEN_PHOTOS[1], hasImage: true, image: ALL_WOMEN_PHOTOS[2] },
  { name: "Federica B.", time: "16 ore", text: "Consigliatissimo +++++", likes: 8, avatar: ALL_WOMEN_PHOTOS[3] },
  { name: "Elisa N.", time: "17 ore", text: "Grazie al cielo ho trovato questa pagina. Stavo impazzendo con le vampate.", likes: 92, avatar: ALL_WOMEN_PHOTOS[4] },
  { name: "Monica A.", time: "18 ore", text: "-18kg in un mese! I risultati parlano chiaro, guardate voi stesse:", likes: 198, avatar: ALL_WOMEN_PHOTOS[5], hasImage: true, image: ALL_WOMEN_PHOTOS[8] },
  { name: "Barbara B.", time: "19 ore", text: "Arrivato in 24h, perfetto. Già iniziato il trattamento.", likes: 27, avatar: ALL_WOMEN_PHOTOS[9] },
];

// Percorso 4 Settimane - Totale 17 KG
const WEEKLY_JOURNEY = [
  {
    week: "Settimana 1",
    title: "L'Inizio del Cambiamento",
    description: "Il metabolismo inizia a risvegliarsi. Meno gonfiore, più energia.",
    result: "-4 KG",
    img: "/images/menobalance-system/weej1.png"
  },
  {
    week: "Settimana 2",
    title: "Il Corpo Si Adatta",
    description: "Il sonno migliora drasticamente. La pancia inizia a sgonfiarsi.",
    result: "-8.5 KG",
    img: "/images/menobalance-system/week2.png"
  },
  {
    week: "Settimana 3",
    title: "Risultati Visibili",
    description: "I vestiti iniziano a stare larghi. Le amiche notano la differenza.",
    result: "-13 KG",
    img: "/images/menobalance-system/week3.png"
  },
  {
    week: "Settimana 4",
    title: "Trasformazione Completa",
    description: "Metabolismo riattivato. Ti senti 10 anni più giovane.",
    result: "-17 KG",
    img: "/images/menobalance-system/week4.png"
  },
];

const App = () => {
  const [stockLeft, setStockLeft] = useState(9);
  const [timeLeft, setTimeLeft] = useState(542); // 9:02 in seconds
  const [saleNotification, setSaleNotification] = useState<{name: string, city: string, product: string, img: string, minAgo: number} | null>(null);
  const [visibleComments, setVisibleComments] = useState(5);

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 542)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Scarcity Logic
  useEffect(() => {
     const interval = setInterval(() => setStockLeft(prev => prev > 2 ? prev - 1 : 2), 20000);
     return () => clearInterval(interval);
  }, []);

  // Sales Notification
  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      triggerNotification();
      const interval = setInterval(() => triggerNotification(), 12000);
      return () => clearInterval(interval);
    }, 4000);
    return () => clearTimeout(initialTimeout);
  }, []);

  const triggerNotification = () => {
    const randomSale = RECENT_SALES[Math.floor(Math.random() * RECENT_SALES.length)];
    setSaleNotification({ ...randomSale, minAgo: Math.floor(Math.random() * 5) + 1 });
    setTimeout(() => setSaleNotification(null), 5000);
  };

  const scrollToOffer = () => {
    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMoreComments = () => {
    setVisibleComments(prev => Math.min(prev + 10, FB_COMMENTS.length));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased pb-24 md:pb-0">

      {/* ===== TOP BAR (URGENCY) ===== */}
      <div className="bg-[#d40000] py-3 px-4 text-center">
        <p className="text-white font-bold text-xs md:text-sm uppercase tracking-wide">
          ⚠️ ATTENZIONE: ALTA RICHIESTA TV. RIMANGONO SOLO 11 CONFEZIONI.
        </p>
      </div>

      {/* ===== LIVE ROW ===== */}
      <div className="text-center py-4 px-4">
        <p className="text-xs md:text-sm uppercase text-gray-500 tracking-wide">
          <span className="text-[#d40000] font-bold">• LIVE:</span> 866 DONNE STANNO LEGGENDO QUESTA PAGINA
        </p>
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="text-center px-4 pb-8 max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl lg:text-[58px] font-bold text-[#0b1320] leading-tight mb-5">
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-[#f3d34a] -skew-x-1" style={{left: '-4px', right: '-4px'}}></span>
            <span className="relative">SVELATO:</span>
          </span>{' '}
          Il &quot;Rituale di 10 Secondi&quot; che Scioglie il Grasso Addominale in Menopausa{' '}
          <span className="relative inline-block text-[#d40000]">
            Durante la Notte
            <span className="absolute left-0 right-0 bottom-1 h-[5px] bg-[#f3d34a]"></span>
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-2">
          Senza Diete Da Fame. Senza Palestra. Senza Stress.
        </p>
        <p className="text-sm text-gray-400">
          (Funziona anche se pensi di averle provate tutte)
        </p>
      </section>

      {/* ===== BEFORE/AFTER SECTION ===== */}
      <section className="px-4 pb-8">
        <div className="max-w-[940px] mx-auto border-[3px] border-[#d40000] rounded-xl overflow-hidden shadow-lg relative flex">
          {/* BEFORE */}
          <div className="flex-1 relative min-h-[280px] md:min-h-[420px] bg-gray-200">
            <span className="absolute top-3 left-3 bg-[#d40000] text-white text-xs font-bold uppercase px-3 py-1.5 rounded z-10">
              GIORNO 1
            </span>
            <img
              src="/images/menobalance-system/prima.png"
              alt="Prima"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center py-2.5 font-bold text-sm uppercase tracking-wider">
              PRIMA
            </div>
          </div>

          {/* VS Circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white border-[3px] border-gray-400 rounded-full flex items-center justify-center font-bold text-sm text-gray-600 z-20 shadow-lg">
            VS
          </div>

          {/* AFTER */}
          <div className="flex-1 relative min-h-[280px] md:min-h-[420px] bg-gray-200">
            <span className="absolute top-3 right-3 bg-[#16a34a] text-white text-xs font-bold uppercase px-3 py-1.5 rounded z-10">
              GIORNO 28
            </span>
            <img
              src="/images/menobalance-system/dopo.png"
              alt="Dopo"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-[#16a34a] text-white text-center py-2.5 font-bold text-sm uppercase tracking-wider">
              DOPO 4 SETTIMANE
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="text-center px-4 pb-10">
        <button
          onClick={scrollToOffer}
          className="bg-gradient-to-b from-[#e53e3e] to-[#c53030] text-white text-xl md:text-2xl font-bold uppercase py-5 px-10 md:px-16 rounded-xl shadow-[0_6px_20px_rgba(212,0,0,0.4)] hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(212,0,0,0.5)] transition-all cursor-pointer"
        >
          VOGLIO SGONFIARMI ORA »
        </button>

        {/* Countdown */}
        <div className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-red-50 border border-red-200 rounded-full text-sm text-[#d40000]">
          <span>⏰</span>
          <span>L&apos;offerta scade tra: <strong>{formatTime(timeLeft)}</strong></span>
        </div>

        {/* Trust Row */}
        <div className="flex justify-center items-center gap-6 md:gap-8 mt-6 flex-wrap">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Garantito al 100%</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Truck className="w-5 h-5" />
            <span>Spedizione 24h</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Lock className="w-5 h-5" />
            <span>Pagamento Sicuro</span>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <hr className="border-t border-gray-200 max-w-5xl mx-auto my-10" />

      {/* ===== DOCTOR SECTION ===== */}
      <section className="px-4 pb-12 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-10 items-start">
          {/* Doctor Image */}
          <div className="relative">
            <img
              src="/images/menobalance-system/dottore.png"
              alt="Dr. Marco R."
              className="w-full h-[350px] md:h-[480px] object-cover object-top rounded-xl"
            />
            <div className="absolute bottom-5 left-5 bg-white py-3 px-5 rounded-lg shadow-lg">
              <h4 className="font-bold text-[#0b1320] text-base">Dr. Marco R.</h4>
              <p className="text-gray-500 text-sm">Esperto Metabolismo</p>
            </div>
          </div>

          {/* Doctor Content */}
          <div>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-[32px] text-[#0b1320] leading-snug mb-6">
              &quot;I Dietologi non vogliono che tu lo sappia...&quot;
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-5">
              &quot;Ho visto migliaia di donne spendere una fortuna in visite e integratori inutili. <strong className="text-[#0b1320]">La verità?</strong> <strong className="text-[#0b1320]">Non è colpa tua se non dimagrisci.</strong>&quot;
            </p>

            {/* Highlight Box */}
            <div className="bg-[#fff3c4] border-l-4 border-[#f59e0b] py-5 px-6 rounded-r-lg mb-5">
              <p className="text-[#0b1320] italic leading-relaxed">
                &quot;La menopausa spegne un interruttore specifico nel tuo corpo. MenoBalance è l&apos;unica cosa che ho visto in 20 anni di carriera capace di riaccenderlo in meno di 24 ore.&quot;
              </p>
            </div>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              &quot;<strong className="text-[#0b1320]">Attenzione però:</strong> è talmente potente che consiglio di non superare mai la dose indicata. <strong className="text-[#0b1320]">I risultati sono estremamente rapidi.</strong>&quot;
            </p>
          </div>
        </div>
      </section>

      {/* ===== PERCORSO 4 SETTIMANE (LA GALLERIA DELLA VERITA) ===== */}
      <section className="bg-slate-900 text-white py-12 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-yellow-400 mb-2 uppercase italic">La Galleria della Verità</h2>
          <p className="text-slate-300 text-lg">Il Percorso Completo di 4 Settimane</p>
          <p className="text-slate-400 text-sm mt-2">Risultati verificati da terze parti indipendenti</p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Timeline - Ottimizzato per Mobile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {WEEKLY_JOURNEY.map((item, idx) => (
              <div key={idx} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-2xl transform hover:-translate-y-2 transition-transform duration-300">
                {/* Week Header */}
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 py-2 px-3 text-center">
                  <span className="text-slate-900 font-black text-xs md:text-sm uppercase tracking-wider">{item.week}</span>
                </div>

                {/* Image - Formato 1:1 per mobile */}
                <div className="relative aspect-square">
                  <img
                    src={item.img}
                    alt={item.week}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Result Badge */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] md:text-xs font-black px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg uppercase whitespace-nowrap border-2 border-white">
                    {item.result}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 md:p-4">
                  <h4 className="font-bold text-white text-sm md:text-base mb-1 md:mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed hidden md:block">{item.description}</p>
                </div>

                {/* Verified Badge */}
                <div className="px-3 pb-3 md:px-4 md:pb-4">
                  <div className="flex items-center justify-center gap-1 text-yellow-400 text-[10px] md:text-xs font-bold">
                    <Star className="w-3 h-3 fill-current" /> Certificato
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Arrow (Desktop) */}
          <div className="hidden md:flex justify-center items-center gap-4 mt-8">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-sm">INIZIO</span>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded"></div>
              <span className="text-sm font-bold text-green-400">-17 KG</span>
            </div>
          </div>

          {/* Total Results Box */}
          <div className="mt-8 md:mt-10 bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-4 md:p-6 max-w-2xl mx-auto text-center shadow-2xl">
            <p className="text-white/80 text-xs md:text-sm uppercase tracking-wider mb-1 md:mb-2">Risultato medio in 4 settimane</p>
            <p className="text-3xl md:text-5xl font-black text-white mb-1 md:mb-2">-17 KG</p>
            <p className="text-white/90 text-xs md:text-sm">di grasso addominale e liquidi in eccesso</p>
          </div>
        </div>

        <div className="text-center mt-8 md:mt-10">
          <p className="text-lg md:text-xl font-bold text-white mb-4">
            Vuoi essere la prossima?
          </p>
          <button onClick={scrollToOffer} className="bg-yellow-500 text-slate-900 px-6 md:px-8 py-3 rounded-full font-black uppercase hover:bg-yellow-400 transition-colors animate-bounce text-sm md:text-base">
            Sì! Voglio questi risultati »
          </button>
        </div>
      </section>

      {/* ===== THE SOLUTION (AMPLIFIED) ===== */}
      <div className="p-4 md:p-8 bg-gradient-to-b from-white to-blue-50">
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 font-serif">
            Ecco perché hai fallito finora: <br/><span className="text-red-600">Stavi combattendo la guerra sbagliata.</span>
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Le diete tradizionali falliscono perché il tuo corpo in menopausa è in <span className="font-bold bg-yellow-200">&quot;Modalità Sopravvivenza&quot;</span>. MenoBalance™ non è un integratore. È un sistema di <span className="italic font-bold">Bio-Hacking Ormonale</span> diviso in due fasi militari.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">

          {/* CARD GIORNO */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-yellow-400 relative transform hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-yellow-400 p-4 text-center">
              <div className="flex justify-center items-center gap-2 mb-1">
                <Zap className="w-6 h-6 text-slate-900 fill-current" />
                <h4 className="font-black text-lg md:text-xl text-slate-900 uppercase">FASE 1: INCENERITORE</h4>
              </div>
              <p className="text-xs font-bold text-slate-800">08:00 - 20:00 | Sblocco Metabolico</p>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-sm font-medium text-slate-600 italic border-l-4 border-yellow-200 pl-3">
                &quot;Costringe le tue cellule a sputare fuori il grasso viscerale accumulato da anni.&quot;
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 p-2 rounded-full shrink-0">
                    <FlaskConical className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Berberina HCL &quot;Bio-Attiva&quot;</h5>
                    <p className="text-xs text-slate-500">La &quot;Metformina Naturale&quot; che stabilizza gli zuccheri.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 p-2 rounded-full shrink-0">
                    <Flame className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Arancia Amara (Sinefrina)</h5>
                    <p className="text-xs text-slate-500">Aumenta la termogenesi del 240%.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD NOTTE */}
          <div className="bg-slate-900 rounded-xl shadow-xl overflow-hidden border-2 border-indigo-500 relative transform hover:-translate-y-1 transition-transform duration-300 text-white">
            <div className="bg-indigo-600 p-4 text-center">
              <div className="flex justify-center items-center gap-2 mb-1">
                <Moon className="w-6 h-6 text-white fill-current" />
                <h4 className="font-black text-lg md:text-xl text-white uppercase">FASE 2: SCUDO NOTTURNO</h4>
              </div>
              <p className="text-xs font-bold text-indigo-100">20:00 - 08:00 | Drenaggio & Riposo</p>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-sm font-medium text-slate-300 italic border-l-4 border-indigo-400 pl-3">
                &quot;Il 90% del dimagrimento avviene nel sonno profondo.&quot;
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-900 p-2 rounded-full shrink-0 border border-indigo-700">
                    <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">Valeriana + Melatonina Pura</h5>
                    <p className="text-xs text-slate-400">Induce il sonno REM dove il GH scioglie i grassi.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-900 p-2 rounded-full shrink-0 border border-indigo-700">
                    <Activity className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">Magnesio Supremo Drenante</h5>
                    <p className="text-xs text-slate-400">Ti fa svegliare con la pancia piatta.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded p-4 flex items-center gap-4 max-w-2xl mx-auto">
          <ShieldCheck className="w-8 h-8 text-green-600 shrink-0" />
          <p className="text-xs md:text-sm text-green-800 font-medium">
            <strong>GARANZIA CLINICA:</strong> Ingredienti Grado Farmaceutico A+. Non troverai questa potenza in erboristeria.
          </p>
        </div>

        {/* ===== OFFER AREA ===== */}
        <div id="offer" className="border-4 border-dashed border-red-500 bg-red-50 p-6 rounded-xl text-center relative mt-12 max-w-3xl mx-auto">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-2 font-black uppercase tracking-widest text-sm shadow-lg rotate-1">
            Offerta Limitata
          </div>

          <h2 className="text-3xl font-black text-slate-900 mt-4 mb-2">{PRODUCT_NAME}</h2>
          <p className="text-slate-600 mb-6 font-medium">Il kit originale Giorno & Notte</p>

          <div className="flex justify-center items-center gap-6 mb-6">
              <div className="relative">
                 <img src="/images/menobalance-system/prodotto.png" className="w-48 md:w-64" alt="MenoBalance Prodotto" />
                 <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 font-bold rounded-full w-16 h-16 flex flex-col items-center justify-center border-2 border-slate-900 transform rotate-12 shadow-lg">
                    <span className="text-xs">SCONTO</span>
                    <span className="text-xl leading-none">50%</span>
                 </div>
              </div>
          </div>

          <div className="flex flex-col items-center gap-2 mb-6">
             <span className="text-gray-400 line-through text-lg">Prezzo Normale: {PRICE_ORIGINAL}</span>
             <span className="text-5xl font-black text-red-600 tracking-tighter">{PRICE_OFFER}</span>
             <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-xs font-bold uppercase tracking-wide">
                + Spedizione Gratis Oggi
             </span>
          </div>

          {/* Stock Warning */}
          <div className="bg-white border border-red-200 p-3 rounded mb-6 max-w-sm mx-auto">
             <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-red-600">Disponibilità Scarsa</span>
                <span>{stockLeft}% Rimasti</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-600 h-2.5 rounded-full animate-pulse" style={{ width: `${stockLeft * 10}%` }}></div>
             </div>
          </div>

          <button className="w-full bg-[#00C853] hover:bg-green-600 text-white text-2xl md:text-3xl font-black py-6 px-4 rounded shadow-[0_5px_0_rgb(21,128,61)] active:shadow-none active:translate-y-1 transition-all uppercase animate-pulse mb-4">
             VOGLIO DIMAGRIRE ORA »
          </button>

          <p className="text-xs text-slate-500">
             <Lock className="w-3 h-3 inline mr-1" />
             Pagamento alla consegna disponibile. Nessun rischio.
          </p>
        </div>
      </div>

      {/* ===== FAKE FACEBOOK COMMENTS SECTION ===== */}
      <div id="recensioni" className="bg-white border-t border-slate-200 p-4 md:p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800">Commenti ({FB_COMMENTS.length + 1200})</h3>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span>Ordina per:</span>
            <span className="font-bold text-slate-800">Più pertinenti</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>

        <div className="space-y-6">
          {FB_COMMENTS.slice(0, visibleComments).map((comment, i) => (
            <div key={i} className="flex gap-3 animate-fadeIn">
              {/* Avatar foto profilo */}
              <img
                src={comment.avatar}
                alt={comment.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-gray-200"
              />
              <div className="flex-1">
                <div className="bg-[#F0F2F5] p-3 rounded-2xl rounded-tl-none inline-block">
                  <h4 className="font-bold text-sm text-[#050505] cursor-pointer hover:underline">{comment.name}</h4>
                  <p className="text-sm text-[#050505] leading-snug">{comment.text}</p>
                </div>
                {/* Foto allegata al commento - solo per chi ha perso kg */}
                {comment.hasImage && comment.image && (
                  <div className="mt-2">
                    <img
                      src={comment.image}
                      alt="Risultato"
                      className="rounded-xl w-48 h-auto object-cover border border-gray-200"
                    />
                  </div>
                )}
                <div className="flex items-center gap-4 mt-1 ml-2 text-xs font-bold text-slate-500">
                  <span className="cursor-pointer hover:underline text-slate-600">Mi piace</span>
                  <span className="cursor-pointer hover:underline text-slate-600">Rispondi</span>
                  <span className="font-normal text-slate-400">{comment.time}</span>
                  {comment.likes > 0 && (
                    <div className="flex items-center gap-1 bg-white shadow-sm border border-slate-100 px-1.5 py-0.5 rounded-full ml-auto">
                      <div className="bg-blue-500 rounded-full p-0.5">
                        <ThumbsUp className="w-2 h-2 text-white fill-current" />
                      </div>
                      <span className="font-normal text-slate-500">{comment.likes}</span>
                    </div>
                  )}
                </div>

                {/* Nested Reply */}
                {comment.reply && (
                  <div className="flex gap-3 mt-3">
                    <img src="/images/menobalance-system/prodotto.png" alt="Support" className="w-8 h-8 rounded-full border border-slate-200 shrink-0 object-cover bg-white p-1" />
                    <div className="flex-1">
                      <div className="bg-[#F0F2F5] p-3 rounded-2xl rounded-tl-none inline-block border-l-4 border-blue-100">
                        <h4 className="font-bold text-sm text-[#050505] flex items-center gap-1">
                          MenoBalance Supporto
                          <Check className="w-3 h-3 bg-blue-500 text-white rounded-full p-0.5" />
                        </h4>
                        <p className="text-sm text-[#050505] leading-snug">{comment.reply}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-1 ml-2 text-xs font-bold text-slate-500">
                        <span className="cursor-pointer hover:underline text-slate-600">Mi piace</span>
                        <span className="font-normal text-slate-400">Appena ora</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {visibleComments < FB_COMMENTS.length && (
          <button
            onClick={loadMoreComments}
            className="w-full text-center py-4 text-blue-600 font-bold text-sm border-t border-slate-100 mt-6 hover:bg-slate-50 transition-colors"
          >
            Carica altri 10 commenti
          </button>
        )}

        <div className="mt-8 flex gap-3 items-center border-t border-slate-200 pt-6 opacity-50 pointer-events-none">
          <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
          <div className="flex-1 bg-slate-100 h-10 rounded-full px-4 flex items-center text-slate-400 text-sm">
            Scrivi un commento...
          </div>
          <Camera className="w-6 h-6 text-slate-400" />
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="bg-slate-100 p-8 text-center text-xs text-slate-400 border-t border-slate-200">
        <p className="mb-4">
          *I risultati non sono garantiti e possono variare. Questo sito non è affiliato con Facebook o Instagram.
        </p>
        <div className="flex justify-center gap-4 underline">
          <span>Privacy</span>
          <span>Termini</span>
          <span>Contatti</span>
        </div>
        <p className="mt-4">© {new Date().getFullYear()} Health News Network.</p>
      </div>

      {/* ===== STICKY MOBILE CTA ===== */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-2 md:hidden z-50 shadow-[0_-5px_30px_rgba(0,0,0,0.15)]">
        <div className="flex items-center gap-2">
          {/* Immagine prodotto */}
          <div className="relative shrink-0">
            <img
              src="/images/menobalance-system/prodotto.png"
              alt="MenoBalance"
              className="w-14 h-14 object-contain"
            />
            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] font-bold px-1 py-0.5 rounded">
              -50%
            </div>
          </div>

          {/* Info centrale */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="font-black text-slate-900 text-xl">{PRICE_OFFER}</span>
              <span className="text-xs text-slate-400 line-through">{PRICE_ORIGINAL}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-red-600 font-bold">
              <Timer className="w-3 h-3" />
              <span>Scade: {formatTime(timeLeft)}</span>
            </div>
            {/* Stelle e recensioni */}
            <button
              onClick={() => document.getElementById('recensioni')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-1 mt-0.5"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-[10px] text-slate-600 underline">3.094 recensioni</span>
            </button>
          </div>

          {/* Bottone CTA */}
          <button
            onClick={scrollToOffer}
            className="bg-[#00C853] text-white font-black py-3 px-4 rounded shadow-lg active:scale-95 text-sm uppercase tracking-wide animate-pulse shrink-0"
          >
            ORDINA
          </button>
        </div>
      </div>

      {/* ===== SALES POPUP (SOCIAL PROOF) - Con immagine prodotto ===== */}
      {saleNotification && (
        <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 bg-white/95 backdrop-blur p-3 rounded-lg shadow-2xl border-l-4 border-[#00C853] flex items-center gap-3 animate-slideInLeft z-50 max-w-[320px]">
          <img src={saleNotification.img} alt="Product" className="w-14 h-14 object-contain rounded bg-white p-1 border border-slate-100" />
          <div>
            <p className="text-xs text-slate-900 leading-snug">
              <span className="font-bold">{saleNotification.name}</span> di {saleNotification.city} ha appena acquistato <span className="font-bold text-green-600">{saleNotification.product}</span>
            </p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
              {saleNotification.minAgo} minuti fa • Verificato ✓
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
