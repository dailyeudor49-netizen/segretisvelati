'use client';

import React, { useEffect, useState } from 'react';
import { 
  ArrowDown, 
  CheckCircle, 
  AlertTriangle, 
  Activity, 
  Droplet, 
  Flame, 
  Ban, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  MoreHorizontal 
} from 'lucide-react';

// --- TYPES ---
interface Review {
  id: number;
  name: string;
  avatar: string;
  timeAgo: string;
  content: string;
  likes: number;
  hasImage: boolean;
  image?: string;
}

// --- DATA ---
// Immagini dalla cartella rece
const DONNA_IMAGES = [
  "/images/rece/donna.jpg",
  "/images/rece/donna2378.jpg",
  "/images/rece/donna2387.jpg",
  "/images/rece/donna24378y.jpg",
  "/images/rece/donna25378.jpg",
  "/images/rece/donna3245.jpg",
  "/images/rece/donna35784.png",
  "/images/rece/donna42375.jpg",
  "/images/rece/donna4578.jpg",
  "/images/rece/donna45987.jpg",
  "/images/rece/donna534.png",
  "/images/rece/donna5432.jpg",
  "/images/rece/donna5438y9.jpg",
  "/images/rece/donna5479y.jpg",
  "/images/rece/donna54938.jpg",
  "/images/rece/donna5498y.jpg",
  "/images/rece/donna5843.jpg",
  "/images/rece/donna59243.jpg",
  "/images/rece/donna9752.jpg",
  "/images/rece/donna984.jpg",
  "/images/rece/donnafoto4.png",
  "/images/rece/doonna75.jpg",
];

const UOMO_IMAGES = [
  "/images/rece/uomo089235.jpg",
  "/images/rece/uomo235489.jpg",
  "/images/rece/uomo235897.jpg",
  "/images/rece/uomo25370.jpg",
  "/images/rece/uomo536429.jpg",
  "/images/rece/uomo58297.jpg",
];

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Maria Rossi",
    avatar: DONNA_IMAGES[0],
    timeAgo: "2 min fa",
    content: "Guardate qua... 👇 Ero disperata. Mangiavo insalata e prendevo peso. Il mio dottore mi ha detto 'il tuo fegato è pigro'. Con questo trattamento ho sbloccato tutto in 3 giorni. Non è una dieta, è una liberazione.",
    likes: 842,
    hasImage: true,
    image: DONNA_IMAGES[1]
  },
  {
    id: 2,
    name: "Luigi Verdi",
    avatar: UOMO_IMAGES[0],
    timeAgo: "5 min fa",
    content: "Arrivato ieri. Confermo che sgonfia tantissimo. Mi sentivo una mongolfiera dopo ogni pasto, ora pancia piatta. L'offerta 2x1 è vera.",
    likes: 156,
    hasImage: true,
    image: UOMO_IMAGES[1]
  },
  {
    id: 3,
    name: "Francesca Bianchi",
    avatar: DONNA_IMAGES[2],
    timeAgo: "12 min fa",
    content: "Ho fatto scorta. Ragazze non fatevi scappare l'offerta perché a prezzo pieno costano un botto. Questo è il mio risultato dopo il primo ciclo completo. 👇",
    likes: 2100,
    hasImage: true,
    image: DONNA_IMAGES[3]
  },
  {
    id: 4,
    name: "Anna Esposito",
    avatar: DONNA_IMAGES[4],
    timeAgo: "15 min fa",
    content: "Preso l'offerta 2x49€. Ne vale la pena. Il tarassaco concentrato è tutta un'altra storia rispetto alle tisane del supermercato che sono acqua sporca.",
    likes: 45,
    hasImage: false
  },
  {
    id: 5,
    name: "Giovanna Costa",
    avatar: DONNA_IMAGES[5],
    timeAgo: "32 min fa",
    content: "Finalmente qualcuno che dice la verità! Se il filtro (fegato) è sporco, come pretendi di dimagrire? Io ho perso 4kg solo 'ripulendo' il filtro. Ecco i miei jeans 'test' che ora mi vanno larghi!",
    likes: 890,
    hasImage: true,
    image: DONNA_IMAGES[6]
  },
  { id: 6, name: "Marco Romano", avatar: UOMO_IMAGES[2], timeAgo: "45 min fa", content: "Spedizione velocissima. Pacco anonimo e discreto.", likes: 12, hasImage: false },
  {
    id: 7,
    name: "Elena Ricci",
    avatar: DONNA_IMAGES[7],
    timeAgo: "1 ora fa",
    content: "Ho dovuto rifare il guardaroba... incredibile come sgonfia le gambe. È l'effetto drenante epatico. Guardate la differenza di ritenzione idrica sulle caviglie.",
    likes: 210,
    hasImage: true,
    image: DONNA_IMAGES[8]
  },
  { id: 8, name: "Sara Colombo", avatar: DONNA_IMAGES[9], timeAgo: "1 ora fa", content: "Lo sto consigliando a tutte le mie amiche. Non è la solita truffa, qui senti proprio il corpo che lavora diversamente.", likes: 115, hasImage: false },
  {
    id: 9,
    name: "Antonio Bruno",
    avatar: UOMO_IMAGES[3],
    timeAgo: "2 ore fa",
    content: "Ero scettico. Molto scettico. Mi sono ricreduto. Fegato pulito = metabolismo a mille. Ho ripreso a correre e non sento più pesantezza.",
    likes: 67,
    hasImage: true,
    image: UOMO_IMAGES[4]
  },
  { id: 10, name: "Paola Gallo", avatar: DONNA_IMAGES[10], timeAgo: "2 ore fa", content: "Ordinato ora! Speriamo arrivi presto!", likes: 8, hasImage: false },

  // Batch 2
  {
    id: 11,
    name: "Roberta Conti",
    avatar: DONNA_IMAGES[11],
    timeAgo: "3 ore fa",
    content: "La mia nutrizionista mi ha detto che il tarassaco è oro. Questo estratto è potentissimo. Risultato dopo 12 giorni esatti:",
    likes: 44,
    hasImage: true,
    image: DONNA_IMAGES[12]
  },
  { id: 12, name: "Michele De Luca", avatar: UOMO_IMAGES[5], timeAgo: "3 ore fa", content: "Ottimo prodotto. Pagamento alla consegna molto comodo.", likes: 23, hasImage: false },
  {
    id: 13,
    name: "Silvia Mancini",
    avatar: DONNA_IMAGES[13],
    timeAgo: "4 ore fa",
    content: "Ma si trova in farmacia? O solo qui?",
    likes: 15,
    hasImage: false
  },
  { id: 14, name: "Tarassac Slim Official", avatar: "/images/TARASSIC/Tarassic1.png", timeAgo: "4 ore fa", content: "Ciao Silvia! Il Tarassac Slim originale con formula 2x concentrata è disponibile SOLO su questa pagina in offerta lancio. Diffidate dalle imitazioni!", likes: 150, hasImage: false },
  {
    id: 15,
    name: "Giulia Rizzo",
    avatar: DONNA_IMAGES[14],
    timeAgo: "5 ore fa",
    content: "A me ha aiutato anche con la digestione lenta. Mi sento leggera come una piuma. Ecco il pacco appena arrivato!",
    likes: 78,
    hasImage: true,
    image: DONNA_IMAGES[15]
  },
  { id: 16, name: "Davide Lombardi", avatar: DONNA_IMAGES[16], timeAgo: "6 ore fa", content: "Top. 5 stelle.", likes: 9, hasImage: false },
  {
    id: 17,
    name: "Lucia Moretti",
    avatar: DONNA_IMAGES[17],
    timeAgo: "6 ore fa",
    content: "Ho provato i beveroni, le pillole, le diete fame... nulla. Ho pulito il fegato con questo e ho perso 3kg in 10 giorni mangiando UGUALE. Guardate il girovita.",
    likes: 330,
    hasImage: true,
    image: DONNA_IMAGES[18]
  },
  { id: 18, name: "Chiara Barbieri", avatar: DONNA_IMAGES[19], timeAgo: "7 ore fa", content: "Preso per mio marito, lo sto usando io haha!", likes: 56, hasImage: false },
  {
    id: 19,
    name: "Alessandra Fontana",
    avatar: DONNA_IMAGES[20],
    timeAgo: "8 ore fa",
    content: "Confermo tutto. Miracoloso è la parola giusta. I miei pantaloni preferiti si chiudono di nuovo senza stringere!",
    likes: 92,
    hasImage: true,
    image: DONNA_IMAGES[21]
  },
  { id: 20, name: "Federico Santoro", avatar: DONNA_IMAGES[0], timeAgo: "9 ore fa", content: "Funziona.", likes: 11, hasImage: false },

  // Batch 3
  {
    id: 21,
    name: "Valentina Mariani",
    avatar: DONNA_IMAGES[1],
    timeAgo: "10 ore fa",
    content: "La sensazione di 'pulito' interno è indescrivibile. Mi sento sgonfia già al mattino.",
    likes: 60,
    hasImage: true,
    image: DONNA_IMAGES[2]
  },
  { id: 22, name: "Simona Rinaldi", avatar: DONNA_IMAGES[3], timeAgo: "11 ore fa", content: "Arrivato in Sardegna in 2 giorni. Veloci.", likes: 18, hasImage: false },
  {
    id: 23,
    name: "Daniela Caruso",
    avatar: DONNA_IMAGES[4],
    timeAgo: "11 ore fa",
    content: "Io lo prendo la mattina a digiuno. Una bomba. Ho anche molta più energia al lavoro.",
    likes: 41,
    hasImage: true,
    image: DONNA_IMAGES[5]
  },
  { id: 24, name: "Monica Ferrara", avatar: DONNA_IMAGES[6], timeAgo: "12 ore fa", content: "Grazie Tarassac!!", likes: 25, hasImage: false },
  {
    id: 25,
    name: "Pietro Galli",
    avatar: UOMO_IMAGES[0],
    timeAgo: "13 ore fa",
    content: "Mia moglie è contentissima, quindi sono contento anch'io. Prodotto valido.",
    likes: 104,
    hasImage: true,
    image: UOMO_IMAGES[1]
  },
  { id: 26, name: "Elisa Martini", avatar: DONNA_IMAGES[7], timeAgo: "14 ore fa", content: "Non credevo che il fegato fosse così importante per il grasso addominale. Mi si è aperto un mondo.", likes: 77, hasImage: false },
  {
    id: 27,
    name: "Giorgia Leone",
    avatar: DONNA_IMAGES[8],
    timeAgo: "15 ore fa",
    content: "Super consigliato +++ Foto del prima e dopo (scusate la qualità ma si vede la pancia che è sparita)",
    likes: 144,
    hasImage: true,
    image: DONNA_IMAGES[9]
  },
  { id: 28, name: "Matteo Longo", avatar: UOMO_IMAGES[2], timeAgo: "16 ore fa", content: "Prodotto serio.", likes: 30, hasImage: false },
  {
    id: 29,
    name: "Cristina Gentile",
    avatar: DONNA_IMAGES[10],
    timeAgo: "1g fa",
    content: "Acquistato il pacchetto doppio per risparmiare. Scade nel 2026 quindi ottimo. Ecco la mia scorta!",
    likes: 22,
    hasImage: true,
    image: DONNA_IMAGES[11]
  },
  { id: 30, name: "Beatrice Martinelli", avatar: DONNA_IMAGES[12], timeAgo: "1g fa", content: "Provatelo. Costa meno di una cena fuori e ti cambia la vita.", likes: 210, hasImage: false },

  // Batch 4
  {
    id: 31,
    name: "Sonia Gatti",
    avatar: DONNA_IMAGES[13],
    timeAgo: "1g fa",
    content: "Pensavo fosse la solita pubblicità fake di Facebook, ma ho rischiato visto il pagamento alla consegna. Risultato? -4cm in vita in una settimana.",
    likes: 312,
    hasImage: true,
    image: DONNA_IMAGES[14]
  },
  { id: 32, name: "Luca Ferri", avatar: UOMO_IMAGES[3], timeAgo: "1g fa", content: "Confermo l'efficacia.", likes: 11, hasImage: false },
  {
    id: 33,
    name: "Martina De Santis",
    avatar: DONNA_IMAGES[15],
    timeAgo: "2g fa",
    content: "Dopo la gravidanza non riuscivo a perdere quei 5kg sulla pancia. Il mio metabolismo era fermo. Tarassac Slim mi ha sbloccata. Guardate che roba.",
    likes: 543,
    hasImage: true,
    image: DONNA_IMAGES[16]
  },
  { id: 34, name: "Fabio Marchetti", avatar: UOMO_IMAGES[4], timeAgo: "2g fa", content: "Buon sapore, facile da deglutire.", likes: 8, hasImage: false },
  {
    id: 35,
    name: "Vanessa Ruggiero",
    avatar: DONNA_IMAGES[17],
    timeAgo: "2g fa",
    content: "Ragazze sono al settimo cielo! Oggi mi sono guardata allo specchio e non mi riconoscevo. Pelle più luminosa e pancia piatta.",
    likes: 221,
    hasImage: true,
    image: DONNA_IMAGES[18]
  },
  { id: 36, name: "Claudio Monti", avatar: UOMO_IMAGES[5], timeAgo: "2g fa", content: "Servizio clienti gentilissimo, mi hanno aiutato con l'ordine.", likes: 19, hasImage: false },
  {
    id: 37,
    name: "Eleonora Piras",
    avatar: DONNA_IMAGES[19],
    timeAgo: "2g fa",
    content: "Ho convinto anche mia madre a prenderlo. Ora facciamo la sfida a chi si sgonfia prima! Ecco i nostri pacchi.",
    likes: 88,
    hasImage: true,
    image: DONNA_IMAGES[20]
  },
  { id: 38, name: "Gianluca Farina", avatar: DONNA_IMAGES[21], timeAgo: "3g fa", content: "Funziona davvero sul gonfiore post-prandiale.", likes: 32, hasImage: false },
  {
    id: 39,
    name: "Marina Sarti",
    avatar: DONNA_IMAGES[0],
    timeAgo: "3g fa",
    content: "Non ho mai postato una foto in costume in vita mia... ma quest'anno forse lo farò grazie a questo prodotto. Incredibile.",
    likes: 410,
    hasImage: true,
    image: DONNA_IMAGES[1]
  },
  { id: 40, name: "Vincenzo Neri", avatar: DONNA_IMAGES[2], timeAgo: "3g fa", content: "Tutto ok.", likes: 5, hasImage: false },

  // Batch 5
  {
    id: 41,
    name: "Camilla Fabbri",
    avatar: DONNA_IMAGES[3],
    timeAgo: "3g fa",
    content: "La cosa bella è che è naturale. Non mi da tachicardia come altri bruciagrassi. E i risultati si vedono eccome.",
    likes: 95,
    hasImage: true,
    image: DONNA_IMAGES[4]
  },
  { id: 42, name: "Riccardo Sala", avatar: DONNA_IMAGES[5], timeAgo: "3g fa", content: "Preso per curiosità, rimasto per i risultati.", likes: 27, hasImage: false },
  {
    id: 43,
    name: "Antonella D'Amico",
    avatar: DONNA_IMAGES[6],
    timeAgo: "4g fa",
    content: "Ero 78kg, ora 72kg in un mese. Senza patire la fame. Il fegato era davvero la chiave di tutto!",
    likes: 660,
    hasImage: true,
    image: DONNA_IMAGES[7]
  },
  {
    id: 44,
    name: "Sabrina Vitali",
    avatar: DONNA_IMAGES[8],
    timeAgo: "4g fa",
    content: "Arrivate oggi! Iniziamo subito 💪",
    likes: 14,
    hasImage: true,
    image: DONNA_IMAGES[9]
  },
  { id: 45, name: "Massimo Grasso", avatar: DONNA_IMAGES[10], timeAgo: "4g fa", content: "Consigliato.", likes: 9, hasImage: false },
  {
    id: 46,
    name: "Tiziana Pellegrini",
    avatar: DONNA_IMAGES[11],
    timeAgo: "4g fa",
    content: "Sono al secondo ordine. Non posso più farne a meno, mi sento depurata e leggera. Guardate quanto sono sgonfia.",
    likes: 180,
    hasImage: true,
    image: DONNA_IMAGES[12]
  },
  { id: 47, name: "Lorenzo Gatti", avatar: DONNA_IMAGES[13], timeAgo: "5g fa", content: "Corriere gentile, mi ha chiamato prima.", likes: 12, hasImage: false },
  {
    id: 48,
    name: "Noemi Bernardi",
    avatar: DONNA_IMAGES[14],
    timeAgo: "5g fa",
    content: "Ho convinto mio marito. Lui ha perso più di me sulla pancia! Uomini fortunati... comunque funziona!",
    likes: 76,
    hasImage: true,
    image: DONNA_IMAGES[15]
  },
  {
    id: 49,
    name: "Patrizia Serra",
    avatar: DONNA_IMAGES[16],
    timeAgo: "5g fa",
    content: "Prodotto validissimo.",
    likes: 21,
    hasImage: true,
    image: DONNA_IMAGES[17]
  },
  { id: 50, name: "Enrico Orlando", avatar: DONNA_IMAGES[18], timeAgo: "5g fa", content: "Soddisfatto dell'acquisto.", likes: 13, hasImage: false },

  // Batch 6
  {
    id: 51,
    name: "Marta Villa",
    avatar: DONNA_IMAGES[19],
    timeAgo: "6g fa",
    content: "Non ci credevo finché non ho provato. La mia pancia è sparita. Grazie Tarassac!",
    likes: 340,
    hasImage: true,
    image: DONNA_IMAGES[20]
  },
  { id: 52, name: "Raffaele Montanari", avatar: DONNA_IMAGES[21], timeAgo: "6g fa", content: "Buon rapporto qualità prezzo con l'offerta 2x1.", likes: 25, hasImage: false },
  {
    id: 53,
    name: "Debora Negri",
    avatar: DONNA_IMAGES[0],
    timeAgo: "6g fa",
    content: "Finalmente rientro nella taglia 42. Non mi sembra vero. Posto la foto per incoraggiare chi come me era scettica.",
    likes: 590,
    hasImage: true,
    image: DONNA_IMAGES[1]
  },
  {
    id: 54,
    name: "Giovanni Basile",
    avatar: UOMO_IMAGES[0],
    timeAgo: "1 sett fa",
    content: "Drenante numero 1.",
    likes: 18,
    hasImage: false
  },
  {
    id: 55,
    name: "Cinzia Palmieri",
    avatar: DONNA_IMAGES[2],
    timeAgo: "1 sett fa",
    content: "L'ho regalato a mia sorella e ora lo vuole anche mia cugina. Una catena! 😂 Però guardate i risultati.",
    likes: 112,
    hasImage: true,
    image: DONNA_IMAGES[3]
  },
  {
    id: 56,
    name: "Andrea Fiore",
    avatar: UOMO_IMAGES[1],
    timeAgo: "1 sett fa",
    content: "Spedizione veloce, prodotto integro.",
    likes: 7,
    hasImage: false
  },
  {
    id: 57,
    name: "Lara Battaglia",
    avatar: DONNA_IMAGES[4],
    timeAgo: "1 sett fa",
    content: "Ho finito la prima confezione oggi. Ordinerò sicuramente ancora. Mai sentita così in forma.",
    likes: 205,
    hasImage: true,
    image: DONNA_IMAGES[5]
  }
];

// --- COMPONENTS ---

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ m: 14, s: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s === 0) {
          if (prev.m === 0) return prev;
          return { m: prev.m - 1, s: 59 };
        }
        return { ...prev, s: prev.s - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToOffer = () => {
    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Alert Banner - More urgency about the 'Discovery' */}
      <div className="bg-red-600 text-white text-center py-2 px-4 text-xs md:text-sm font-bold uppercase tracking-wider animate-pulse flex items-center justify-center gap-2">
        <AlertTriangle size={16} className="text-yellow-300" />
        Report Medico 2024: La verità sul blocco metabolico
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Copy - Problem focused */}
          <div className="space-y-6">
            <div className="inline-block bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-bold border border-gray-200 shadow-sm">
              PERCHÉ LE DIETE FALLISCONO?
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              Mangi poco ma la pancia <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">non scende?</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Ascolta attentamente: <strong>Non è colpa tua.</strong> E non è colpa della tua forza di volontà.<br/><br/>
              Una recente scoperta biologica ha confermato che il 93% delle donne non riesce a dimagrire a causa di un <em>"blocco silenzioso"</em> nel fegato. Finché non rimuovi questo blocco, il tuo corpo rifiuterà di bruciare grassi, anche se bevi solo acqua.
            </p>

            <div className="space-y-3 bg-red-50 p-4 rounded-xl border border-red-100">
              <p className="text-sm font-bold text-red-800 uppercase mb-2">I Sintomi del blocco epatico:</p>
              <div className="flex items-center gap-3 text-gray-700 font-medium">
                <CheckCircle className="text-red-500 flex-shrink-0" size={20} />
                <span>Gonfiore addominale immediato dopo i pasti</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-medium">
                <CheckCircle className="text-red-500 flex-shrink-0" size={20} />
                <span>Stanchezza cronica appena svegli</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-medium">
                <CheckCircle className="text-red-500 flex-shrink-0" size={20} />
                <span>Ago della bilancia bloccato da mesi</span>
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={scrollToOffer}
                className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                SCOPRI LA SOLUZIONE "SBLOCCA-GRASSO" &rarr;
              </button>
              <p className="mt-3 text-sm text-gray-500 italic text-center md:text-left">
                Disponibilità limitata per il batch di produzione attuale.
              </p>
            </div>
          </div>

          {/* Right Column: Visuals */}
          <div className="relative">
             {/* Background Blob */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 left-20 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            
            <div className="relative bg-white rounded-3xl shadow-2xl border-4 border-white p-6 md:p-10 text-center transform rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="absolute -top-6 -right-6 bg-red-600 text-white font-black text-sm w-24 h-24 rounded-full flex items-center justify-center shadow-lg transform rotate-12 z-10 border-4 border-white text-center leading-tight">
                 FORMULA<br/>ORIGINALE
               </div>
               
               <img 
                 src="https://picsum.photos/600/600?random=product" 
                 alt="Tarassac Slim Bottiglia" 
                 className="w-full h-auto rounded-xl shadow-inner mb-6 filter contrast-125"
               />
               
               <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                 <p className="text-gray-900 font-bold text-lg mb-1">L'unica soluzione 100% Naturale</p>
                 <p className="text-sm text-gray-500">Che agisce alla radice biologica del problema.</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const Science: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Il tuo corpo è intossicato: <br/>
          <span className="text-red-600">L'analogia della palude</span>
        </h2>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          Immagina il tuo metabolismo come un fiume. Quando scorre veloce, l'acqua è pulita e niente si accumula. 
          Ma se il fegato è sovraccarico, quel fiume diventa una <strong>palude stagnante</strong>. <br/><br/>
          Puoi smettere di mangiare quanto vuoi, ma una palude non si prosciuga da sola. <br/>
          Ecco perché hai bisogno di un <em>drenante meccanico</em>.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 opacity-70 grayscale transition-all hover:grayscale-0">
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-600 mb-4">
              <Ban /> Senza Tarassac Slim
            </h3>
            <p className="text-gray-600">
              Il fegato intrappola le tossine nelle cellule adipose per proteggere gli organi. Il grasso diventa "viscerale", duro e impossibile da bruciare con la sola dieta. Il corpo è in modalità "emergenza".
            </p>
            <div className="mt-4 flex items-center justify-between text-xs font-bold text-gray-400">
               <span>Metabolismo Basale</span>
               <span>Lento</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
               <div className="h-full w-1/4 bg-gray-400"></div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-emerald-500 relative overflow-hidden transform md:scale-105">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              RISULTATO GARANTITO
            </div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-emerald-700 mb-4">
              <Flame /> Con Tarassac Slim
            </h3>
            <p className="text-gray-800">
              Utilizziamo una varietà rara di <strong>Tarassaco Officinale</strong> raccolta all'alba, quando i principi attivi sono al picco. Questa molecola entra nel fegato e <em>forza</em> l'espulsione delle tossine accumulate in anni.
            </p>
             <div className="mt-4 flex items-center justify-between text-xs font-bold text-emerald-600">
               <span>Metabolismo Basale</span>
               <span>Turbo</span>
            </div>
             <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
               <div className="h-full w-full bg-emerald-500"></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Ti stiamo servendo la soluzione su un piatto d'argento</h3>
            <p className="text-lg opacity-90 mb-6">
              Non ti stiamo chiedendo di correre maratone o di mangiare solo sedano. Ti stiamo chiedendo di prendere <strong>due capsule al giorno</strong> per permettere alla scienza di fare il lavoro sporco al posto tuo.
            </p>
            <p className="font-bold text-xl text-yellow-400">
              Tu vivi la tua vita. Tarassac Slim pulisce il tuo corpo.
            </p>
          </div>
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
             <Droplet size={300} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Offer: React.FC = () => {
  return (
    <section id="offer" className="py-20 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-red-600 font-bold tracking-wider uppercase text-sm">Ultima chiamata</span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 mt-2">
            Il Tuo Nuovo Corpo Inizia Qui
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Abbiamo rimosso ogni rischio. O funziona e ti cambia la vita, o ti rimborsiamo. Non hai più scuse per rimandare.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-emerald-500 grid md:grid-cols-2">
          
          {/* Product Info Side */}
          <div className="p-8 md:p-12 bg-gray-50 flex flex-col justify-center relative">
            <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              BEST SELLER
            </div>
            <div className="text-center mb-8">
              <img src="https://picsum.photos/400/400?random=pack" alt="Pacchetto Doppio" className="w-64 mx-auto mb-6 rounded-lg mix-blend-multiply hover:scale-105 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-gray-900">Protocollo "Reset Epatico"</h3>
              <p className="text-emerald-600 font-semibold mt-2">Trattamento Intensivo 60 Giorni</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <ShieldCheck className="text-emerald-500" />
                <span className="font-medium">Soddisfatti o Rimborsati (30gg)</span>
              </li>
              <li className="flex items-center gap-3">
                <Truck className="text-emerald-500" />
                <span className="font-medium">Spedizione Gratis & Anonima</span>
              </li>
              <li className="flex items-center gap-3">
                <ShoppingBag className="text-emerald-500" />
                <span className="font-medium">Paghi SOLO alla consegna</span>
              </li>
            </ul>

            <div className="text-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-gray-400 line-through text-lg">Prezzo listino: €98,00</span>
              <div className="text-5xl font-black text-red-600 my-2 tracking-tight">2x49€</div>
              <span className="text-emerald-700 text-sm font-bold">Meno di 0,80€ al giorno per la tua salute</span>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 md:p-12 bg-white">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Modulo d'Ordine Rapido</h3>
            <p className="text-gray-500 text-sm mb-6">Compila ora per bloccare il prezzo promozionale.</p>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nome e Cognome</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-0 outline-none transition font-medium" placeholder="Es. Mario Rossi" required />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Numero di Telefono (per il corriere)</label>
                <input type="tel" className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-0 outline-none transition font-medium" placeholder="Es. 333 1234567" required />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Indirizzo Completo</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-0 outline-none transition font-medium" placeholder="Via, Civico, Città, CAP" required />
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 mt-4 cursor-pointer hover:bg-emerald-100 transition-colors">
                <div className="flex items-center gap-3 mb-1">
                   <div className="w-5 h-5 rounded-full border-2 border-emerald-600 flex items-center justify-center bg-white">
                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
                   </div>
                   <label className="font-bold text-gray-900 cursor-pointer">Pagamento alla Consegna</label>
                </div>
                <p className="text-xs text-gray-600 ml-8">Nessuna carta di credito richiesta. Paghi in contanti al corriere.</p>
              </div>

              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white text-xl font-black py-4 rounded-xl shadow-lg transform active:scale-95 transition-all mt-6 uppercase tracking-wide">
                Spedite il mio ordine
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-4 opacity-60">
                <ShieldCheck size={14} />
                <p className="text-[10px] text-gray-500">
                  Dati protetti con crittografia SSL 256-bit. Privacy garantita al 100%.
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

const FacebookReviews: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(10);
  
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 10, REVIEWS.length));
  };

  const visibleReviews = REVIEWS.slice(0, visibleCount);

  return (
    <section className="bg-white py-12 px-4 md:px-0">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
          Recensioni dei Clienti ({REVIEWS.length})
        </h3>
        
        <div className="space-y-6">
          {visibleReviews.map((review) => (
            <div key={review.id} className="flex gap-3 animate-fade-in">
              <img 
                src={review.avatar} 
                alt={review.name} 
                className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-gray-200"
              />
              <div className="flex-1">
                <div className="bg-[#f0f2f5] rounded-2xl px-4 py-3 inline-block">
                  <div className="font-bold text-sm text-gray-900 mb-0.5">
                    {review.name}
                  </div>
                  <p className="text-gray-800 text-[15px] leading-snug">
                    {review.content}
                  </p>
                </div>
                
                {review.hasImage && review.image && (
                  <div className="mt-2">
                    <img src={review.image} alt="Review attachment" className="rounded-xl w-48 h-auto object-cover border border-gray-200" />
                  </div>
                )}

                <div className="flex items-center gap-4 mt-1 ml-1 text-xs md:text-sm text-gray-500 font-medium">
                  <span className="cursor-pointer hover:underline">Mi piace</span>
                  <span className="cursor-pointer hover:underline">Rispondi</span>
                  <span>{review.timeAgo}</span>
                </div>

                {review.likes > 0 && (
                  <div className="flex items-center gap-1 mt-1 ml-1">
                    <div className="bg-[#1877f2] rounded-full p-0.5">
                      <ThumbsUp size={10} className="text-white fill-current" />
                    </div>
                    <span className="text-xs text-gray-500">{review.likes}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {visibleCount < REVIEWS.length && (
          <div className="mt-8 text-center">
            <button 
              onClick={handleLoadMore}
              className="text-[#1877f2] font-semibold hover:underline text-sm flex items-center justify-center w-full py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Visualizza altri commenti
            </button>
            <p className="text-xs text-gray-400 mt-2">
              Visualizzati {visibleCount} di {REVIEWS.length} commenti
            </p>
          </div>
        )}
        
        <div className="mt-8 border-t pt-4 flex items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <span className="bg-green-500 w-2 h-2 rounded-full animate-pulse"></span>
            <span>97 persone stanno visualizzando questa pagina</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#1877f2] font-bold">Facebook</span>
            <span>Social Plugin</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const StickyCTA: React.FC = () => {
  const scrollToOffer = () => {
    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 md:hidden pb-safe">
      <div className="flex items-center gap-3">
        {/* Small thumbnail for mobile too */}
        <div className="w-12 h-12 flex-shrink-0 relative">
             <div className="absolute -top-2 -left-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">
               -50%
             </div>
            <img 
              src="https://picsum.photos/100/100?random=mobile_thumb" 
              alt="Tarassac" 
              className="w-full h-full object-cover rounded-md border border-gray-200"
            />
        </div>

        <div className="flex flex-col flex-1">
           <span className="text-xs text-gray-500 line-through leading-none">€98,00</span>
           <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-gray-900">2x49€</span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 rounded">OFFERTA</span>
           </div>
        </div>
        
        <button 
          onClick={scrollToOffer}
          className="flex-1 bg-red-600 text-white font-bold py-3 px-2 rounded-xl shadow-lg animate-pulse text-sm whitespace-nowrap"
        >
          ORDINA ORA
        </button>
      </div>
    </div>
  );
};

const StickyProduct: React.FC = () => {
  const scrollToOffer = () => {
    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      onClick={scrollToOffer}
      className="hidden md:flex fixed bottom-6 left-6 bg-white/95 backdrop-blur rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-4 z-40 items-center gap-4 max-w-[280px] cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
    >
      {/* Product Mockup Container */}
      <div className="relative w-16 h-20 flex-shrink-0">
        <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm z-10 animate-pulse">
          2x1
        </div>
        <img 
          src="https://picsum.photos/150/200?random=bottle_mockup" 
          alt="Tarassac Slim Bottle" 
          className="w-full h-full object-cover rounded-lg shadow-md border border-gray-100 group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Info & CTA */}
      <div className="flex-1">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mb-0.5">Integratore Detox</p>
        <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1">Tarassac Slim</h4>
        
        <div className="flex items-baseline gap-2 mb-2">
           <span className="text-red-600 font-black text-lg leading-none">49€</span>
           <span className="text-gray-400 text-xs line-through">98€</span>
        </div>
        
        <button className="bg-emerald-600 group-hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-sm w-full transition-colors flex items-center justify-center gap-1">
          ORDINA ORA
        </button>
      </div>
    </div>
  );
};

// --- PURCHASE NOTIFICATIONS ---
const RECENT_PURCHASES = [
  { name: "Giulia", city: "Milano", time: "2 min fa" },
  { name: "Marco", city: "Roma", time: "4 min fa" },
  { name: "Francesca", city: "Napoli", time: "5 min fa" },
  { name: "Alessandro", city: "Torino", time: "7 min fa" },
  { name: "Chiara", city: "Bologna", time: "9 min fa" },
  { name: "Luca", city: "Firenze", time: "11 min fa" },
  { name: "Valentina", city: "Palermo", time: "13 min fa" },
  { name: "Andrea", city: "Genova", time: "15 min fa" },
  { name: "Sara", city: "Verona", time: "18 min fa" },
  { name: "Matteo", city: "Bari", time: "20 min fa" },
  { name: "Elena", city: "Catania", time: "23 min fa" },
  { name: "Davide", city: "Venezia", time: "25 min fa" },
  { name: "Roberta", city: "Padova", time: "28 min fa" },
  { name: "Simone", city: "Trieste", time: "32 min fa" },
  { name: "Paola", city: "Brescia", time: "35 min fa" },
  { name: "Federico", city: "Parma", time: "38 min fa" },
  { name: "Laura", city: "Modena", time: "42 min fa" },
  { name: "Roberto", city: "Reggio Emilia", time: "45 min fa" },
  { name: "Silvia", city: "Perugia", time: "48 min fa" },
  { name: "Giovanni", city: "Cagliari", time: "52 min fa" },
];

const PurchaseNotifications: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostra la prima notifica dopo 3 secondi
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Nasconde dopo 4 secondi
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    // Mostra la prossima dopo 6 secondi
    const nextTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
      setIsVisible(true);
    }, 6000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [currentIndex, isVisible]);

  const purchase = RECENT_PURCHASES[currentIndex];

  return (
    <div
      className={`fixed bottom-20 md:bottom-6 left-4 md:left-auto md:right-6 z-50 transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-3 md:p-4 flex items-center gap-3 max-w-[280px] md:max-w-xs">
        {/* Icona animata */}
        <div className="relative">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            <ShoppingBag className="text-white" size={20} />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-ping" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <CheckCircle className="text-white" size={10} />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm font-bold text-gray-900 truncate">
            {purchase.name} da {purchase.city}
          </p>
          <p className="text-[10px] md:text-xs text-gray-500">
            ha appena ordinato <span className="text-emerald-600 font-semibold">Tarassac Slim</span>
          </p>
          <p className="text-[9px] md:text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            {purchase.time}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Decorazione sottile */}
      <div className="absolute -bottom-1 left-4 right-4 h-2 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 rounded-full blur-sm opacity-50" />
    </div>
  );
};

// --- MAIN APP ---

export default function TarassacFegPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20 md:pb-0 relative">
      <nav className="bg-white py-4 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="font-black text-2xl tracking-tighter text-emerald-800 flex items-center gap-2">
            <span className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-lg">T</span>
            Tarassac Slim
          </div>
          <button
            onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden md:block bg-emerald-600 text-white px-6 py-2 rounded-full font-bold hover:bg-emerald-700 transition shadow-lg transform hover:scale-105"
          >
            Ordina Subito
          </button>
        </div>
      </nav>

      <Hero />
      <Science />
      <Offer />
      <FacebookReviews />

      <footer className="bg-gray-900 text-gray-400 py-12 text-center text-sm">
        <div className="max-w-4xl mx-auto px-4">
          <p className="mb-4">
            *I risultati possono variare da persona a persona. Questo prodotto non è un farmaco e non intende diagnosticare, trattare, curare o prevenire alcuna malattia.
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Termini e Condizioni</a>
            <a href="#" className="hover:text-white">Contatti</a>
          </div>
          <p className="mt-8 opacity-50">&copy; 2024 Tarassac Slim Official. Tutti i diritti riservati.</p>
        </div>
      </footer>

      {/* Floating Elements */}
      <StickyCTA />
      <StickyProduct />
      <PurchaseNotifications />
    </div>
  );
}
