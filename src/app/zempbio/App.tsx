"use client";

import React, { useState, useEffect } from 'react';

// Custom CSS for animations
const customStyles = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes glow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
`;
import {
  ShieldCheck,
  Zap,
  Timer,
  AlertTriangle,
  ChevronDown,
  Star,
  CheckCircle2,
  Microscope,
  TrendingDown,
  ArrowRight,
  Package as BoxIcon,
  RefreshCw,
  XCircle,
  Award,
  Truck,
  Phone,
  MessageSquare,
  Users,
  Lock,
  Heart
} from 'lucide-react';

// --- Metabolic Analysis (Internal) ---
const getMetabolicAnalysis = (age: string, weight: string, height: string, hungerLevel: string): { text: string; bmi: number; bmiCategory: string } => {
  const hungerNum = parseInt(hungerLevel);
  const ageNum = parseInt(age);
  const weightNum = parseFloat(weight);
  const heightM = parseFloat(height) / 100;

  const bmi = weightNum / (heightM * heightM);
  const bmiRounded = Math.round(bmi * 10) / 10;

  let bmiCategory = "";
  if (bmi < 18.5) {
    bmiCategory = "Sottopeso";
  } else if (bmi < 25) {
    bmiCategory = "Normopeso";
  } else if (bmi < 30) {
    bmiCategory = "Sovrappeso";
  } else {
    bmiCategory = "Obesità";
  }

  let text = "";

  if (bmi >= 18.5 && bmi < 25) {
    if (hungerNum >= 6) {
      text = `Analisi completata: Con un BMI di ${bmiRounded} (${bmiCategory}) sei già in una fascia di peso salutare. Tuttavia, il tuo livello di fame nervosa ${hungerLevel}/10 indica che i segnali di sazietà non sono ottimali. Senza intervento, il rischio di accumulo adiposo aumenta con l'età. ZEMPBIO™ Complex 400mg nel PROTOCOLLO MANTENIMENTO aiuta a stabilizzare i recettori della leptina e prevenire futuri squilibri metabolici. Sei un candidato ideale per il protocollo preventivo.`;
    } else {
      text = `Analisi completata: Ottimo! Con un BMI di ${bmiRounded} (${bmiCategory}) e un livello di fame controllato (${hungerLevel}/10), il tuo profilo metabolico è nella norma. Per MANTENERE questi risultati nel tempo e prevenire il naturale rallentamento metabolico legato all'età, ZEMPBIO™ Complex 400mg nel PROTOCOLLO MANTENIMENTO supporta l'equilibrio ormonale della sazietà. Ideale per chi vuole restare in forma senza sforzo.`;
    }
  } else if (bmi >= 25 && bmi < 30) {
    text = `Analisi completata: A ${age} anni con un BMI di ${bmiRounded} (${bmiCategory}), il tuo profilo indica accumulo di grasso viscerale che sta bloccando i segnali della leptina. Con ${weight}kg e fame nervosa a ${hungerLevel}/10, i recettori ipotalamici risultano desensibilizzati. ZEMPBIO™ Complex 400mg agisce sul reset dei peptidi della sazietà, permettendo al corpo di riconoscere quando è davvero sazio. Sei un candidato ideale per il protocollo standard.`;
  } else if (bmi >= 30) {
    text = `Analisi completata: ATTENZIONE - Con un BMI di ${bmiRounded} (${bmiCategory}) a ${age} anni, il tuo metabolismo è in stato di emergenza. Il grasso viscerale ha completamente disattivato l'interruttore della sazietà. A ${weight}kg, la resistenza alla leptina è severa e la forza di volontà NON può vincere contro questa biochimica alterata. Si raccomanda l'intervento IMMEDIATO con ZEMPBIO™ Complex 400mg nel PROTOCOLLO INTENSIVO per resettare i segnali neuro-chimici. Sei un candidato prioritario.`;
  } else {
    text = `Analisi completata: Con un BMI di ${bmiRounded} (${bmiCategory}), il tuo peso è sotto la norma. ZEMPBIO™ è formulato per chi desidera controllare la fame e perdere peso. Ti consigliamo di consultare un nutrizionista per un piano personalizzato di aumento massa.`;
  }

  if (hungerNum >= 8 && bmi >= 18.5) {
    text = `Analisi completata: ALLARME FAME NERVOSA - Con un livello ${hungerLevel}/10, i tuoi recettori della grelina sono in stato di iperattivazione cronica. A ${age} anni e ${weight}kg (BMI: ${bmiRounded} - ${bmiCategory}), questo squilibrio ormonale rende impossibile qualsiasi dieta tradizionale. Il cervello è convinto che stai morendo di fame anche dopo i pasti. ZEMPBIO™ Complex 400mg spegne chimicamente questo falso allarme entro 20 minuti dalla prima assunzione. Sei un candidato URGENTE per il protocollo intensivo.`;
  }

  return { text, bmi: bmiRounded, bmiCategory };
};

// --- Sub-Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm py-3 px-4 flex justify-between items-center">
    <div className="flex items-center gap-1">
      <div className="bg-blue-700 text-white p-1 rounded-md font-bold text-lg">ZB</div>
      <span className="font-bold text-xl text-gray-900 uppercase">ZEMPBIO<span className="text-blue-600">™</span></span>
    </div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase">
        <CheckCircle2 size={14}/> Disponibilità: Alta Richiesta
      </div>
      <a href="#order" className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-md hover:bg-emerald-700 transition-all uppercase flex items-center gap-2">
        Ordina Ora
      </a>
    </div>
  </nav>
);

const MetabolicAnalyzer = ({ onResult }: { onResult: (res: string) => void }) => {
  const [formData, setFormData] = useState({ age: '', weight: '', height: '', hunger: '5' });
  const [loading, setLoading] = useState(false);
  const [localResult, setLocalResult] = useState<{ text: string; bmi: number; bmiCategory: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const result = getMetabolicAnalysis(formData.age, formData.weight, formData.height, formData.hunger);
      setLocalResult(result);
      setLoading(false);
    }, 1500);
  };

  const getBmiColor = (category: string) => {
    switch(category) {
      case "Sottopeso": return "text-yellow-700 bg-yellow-50 border-yellow-300";
      case "Normopeso": return "text-emerald-700 bg-emerald-50 border-emerald-300";
      case "Sovrappeso": return "text-orange-700 bg-orange-50 border-orange-300";
      case "Obesità": return "text-red-700 bg-red-50 border-red-300";
      default: return "text-gray-700 bg-gray-50 border-gray-300";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 border-2 border-blue-300 text-gray-900 relative ring-4 ring-blue-100 ring-opacity-50">
      {/* Badge GRATUITO */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase shadow-md flex items-center gap-1 animate-pulse">
        <Zap size={12} /> Test Gratuito
      </div>

      {/* Icona microscope */}
      <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg hidden md:block">
        <Microscope size={24} />
      </div>

      {/* Hook emotivo */}
      <div className="text-center mb-4 mt-2">
        <p className="text-red-600 font-bold text-sm md:text-base">⚠️ Scopri in 30 secondi perché le diete non funzionano su di te</p>
      </div>

      <h3 className="text-xl md:text-2xl font-bold mb-2 uppercase text-center">Analizzatore Bio-Metabolico AI</h3>
      <p className="text-[10px] text-gray-500 text-center mb-2 font-bold uppercase tracking-wide">Scansione BMI + Resistenza Leptina v5.0</p>

      {/* Counter sociale */}
      <div className="flex items-center justify-center gap-2 mb-6 text-gray-600">
        <Users size={14} />
        <p className="text-[11px] font-medium"><span className="font-bold text-blue-600">2.847</span> persone hanno fatto il test oggi</p>
      </div>

      {!localResult ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Età</label>
              <input type="number" placeholder="Anni" required className="w-full border border-gray-300 p-3 md:p-4 rounded-lg bg-gray-50 text-lg font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Altezza</label>
              <input type="number" placeholder="cm" required className="w-full border border-gray-300 p-3 md:p-4 rounded-lg bg-gray-50 text-lg font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Peso</label>
              <input type="number" placeholder="Kg" required className="w-full border border-gray-300 p-3 md:p-4 rounded-lg bg-gray-50 text-lg font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Livello di Fame Nervosa (1-10)</label>
            <input type="range" min="1" max="10" className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" value={formData.hunger} onChange={(e) => setFormData({...formData, hunger: e.target.value})} />
            <div className="flex justify-between text-[10px] font-bold text-gray-500"><span>CONTROLLATA</span><span>INFERNALE</span></div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 rounded-lg font-bold text-lg uppercase shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transition-all flex items-center justify-center gap-3 relative overflow-hidden group">
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
            {loading ? <RefreshCw className="animate-spin" /> : <>🔬 Scopri il Tuo Blocco Metabolico <ArrowRight size={20}/></>}
          </button>
          <p className="text-center text-[10px] text-gray-400 mt-3 flex items-center justify-center gap-1">
            <Lock size={10} /> Analisi riservata • Nessun dato salvato
          </p>
        </form>
      ) : (
        <div>
          <div className={`flex items-center justify-between p-4 rounded-lg border-2 mb-4 ${getBmiColor(localResult.bmiCategory)}`}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide opacity-70">Il tuo BMI</p>
              <p className="text-3xl font-bold">{localResult.bmi}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wide opacity-70">Categoria</p>
              <p className="text-lg font-bold uppercase">{localResult.bmiCategory}</p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
            <p className="text-gray-800 text-sm md:text-base leading-relaxed font-medium">
              {localResult.text}
            </p>
          </div>
          <a href="#order" className="w-full bg-emerald-600 text-white py-5 rounded-lg font-bold block text-center uppercase text-lg shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all">
            Vedi Protocollo ZEMPBIO™
          </a>
        </div>
      )}
    </div>
  );
};

// --- Sales Popup Component ---
const salesData = [
  { name: "Maria G.", city: "Frosinone" },
  { name: "Giuseppe T.", city: "Avellino" },
  { name: "Anna R.", city: "Viterbo" },
  { name: "Franco M.", city: "Terni" },
  { name: "Lucia P.", city: "Isernia" },
  { name: "Roberto C.", city: "Rieti" },
  { name: "Teresa B.", city: "Matera" },
  { name: "Giovanni L.", city: "Caltanissetta" },
  { name: "Carmela S.", city: "Enna" },
  { name: "Antonio D.", city: "Campobasso" },
  { name: "Rosa F.", city: "Benevento" },
  { name: "Salvatore N.", city: "Agrigento" },
  { name: "Concetta V.", city: "Nuoro" },
  { name: "Michele A.", city: "Oristano" },
  { name: "Giuseppina E.", city: "Crotone" },
  { name: "Pasquale I.", city: "Vibo Valentia" },
  { name: "Filomena O.", city: "Lodi" },
  { name: "Domenico U.", city: "Rovigo" },
  { name: "Assunta Z.", city: "Biella" },
  { name: "Vincenzo H.", city: "Verbania" },
  { name: "Antonietta K.", city: "Sondrio" },
  { name: "Raffaele J.", city: "Gorizia" },
  { name: "Addolorata W.", city: "Belluno" },
  { name: "Carmine Q.", city: "Ascoli Piceno" },
  { name: "Immacolata Y.", city: "Fermo" },
  { name: "Nicola X.", city: "Macerata" },
];

const SalesPopup = () => {
  const [visible, setVisible] = useState(false);
  const [currentSale, setCurrentSale] = useState(salesData[0]);

  useEffect(() => {
    const showPopup = () => {
      const randomIndex = Math.floor(Math.random() * salesData.length);
      setCurrentSale(salesData[randomIndex]);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    const intervals = [10000, 14000, 20000];
    let currentInterval = 0;

    const scheduleNext = () => {
      setTimeout(() => {
        showPopup();
        currentInterval = (currentInterval + 1) % intervals.length;
        scheduleNext();
      }, intervals[currentInterval]);
    };

    setTimeout(showPopup, 5000);
    scheduleNext();
  }, []);

  return (
    <div className={`fixed bottom-24 md:bottom-8 left-4 z-50 transition-all duration-500 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex items-center gap-3 max-w-[300px]">
        <div className="bg-emerald-100 p-2 rounded-lg border border-emerald-200">
          <CheckCircle2 className="text-emerald-600" size={20} />
        </div>
        <div>
          <p className="text-xs font-bold text-gray-900">{currentSale.name} da {currentSale.city}</p>
          <p className="text-[10px] text-gray-500">ha appena ordinato ZEMPBIO™</p>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(895);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const wallOfLove = [
    { name: "Lucia B.", age: "38 anni", date: "17 Gen 2026", text: "Ero scettica, pensavo fosse la solita pubblicità. Dopo 3 giorni la voglia di pane e pasta è sparita. -8kg in un mese senza stress.", photo: "/images/zempbio/donna/donna2378.jpg" },
    { name: "Giancarlo M.", age: "35 anni", date: "14 Gen 2026", text: "Finalmente un prodotto serio. Niente tachicardia, solo una sensazione di sazietà costante. La pancia è sparita.", photo: "/images/zempbio/UOMO/uomo089235.jpg" },
    { name: "Franca T.", age: "65 anni", date: "09 Gen 2026", text: "La menopausa mi aveva distrutto il metabolismo. ZEMPBIO™ lo ha riacceso. Mi sento di nuovo energica.", photo: "/images/zempbio/donna/donna2387.jpg" },
    { name: "Paolo D.", age: "41 anni", date: "02 Gen 2026", text: "Ottimo prodotto. Consegna veloce e pagamento al corriere. Ho perso 9kg finora e continuo.", photo: "/images/zempbio/UOMO/uomo25370.jpg" },
    { name: "Ester S.", age: "44 anni", date: "27 Dic 2025", text: "Mio figlio mi ha regalato questo trattamento. Ora usciamo a camminare e non mi stanco più. Un miracolo.", photo: "/images/zempbio/donna/donna24378y.jpg" },
    { name: "Claudio F.", age: "39 anni", date: "19 Dic 2025", text: "Spegnere la fame nervosa serale era il mio problema. ZEMPBIO™ ha risolto tutto. -11kg in 3 mesi.", photo: "/images/zempbio/UOMO/uomo536429.jpg" },
    { name: "Rosanna G.", age: "30 anni", date: "12 Dic 2025", text: "Le mie amiche mi chiedono cosa ho fatto al viso. Sembro ringiovanita perché ho perso peso in modo sano.", photo: "/images/zempbio/donna/donna3245.jpg" },
    { name: "Vincenzo L.", age: "55 anni", date: "04 Dic 2025", text: "Mangio porzioni normali e sono soddisfatto. La mia pressione è migliorata. Consigliatissimo per chi ha superato i 50.", photo: "/images/zempbio/UOMO/uomo58297.jpg" },
    { name: "Adele P.", age: "35 anni", date: "25 Nov 2025", text: "Non ci credevo, ma i 400mg fanno la differenza. Ho provato pillole da 100mg e non facevano nulla. Questo funziona.", photo: "/images/zempbio/donna/donna4578.jpg" },
    { name: "Marco V.", age: "38 anni", date: "16 Nov 2025", text: "Soddisfatto al 100%. Il pacco è arrivato anonimo e ho pagato in contanti. -6kg nelle prime due settimane.", photo: "/images/zempbio/UOMO/uomo235489.jpg" },
    { name: "Silvana M.", age: "33 anni", date: "07 Nov 2025", text: "Avevo sempre fame di dolci. Ora il mio cervello non li chiede più. Incredibile come agisce sulla mente.", photo: "/images/zempbio/donna/donna5479y.jpg" },
    { name: "Giorgio B.", age: "34 anni", date: "28 Ott 2025", text: "La scienza dietro ZEMPBIO™ è solida. Si sente che non è robetta da supermercato. Autorità e Risultati.", photo: "/images/zempbio/UOMO/uomo235897.jpg" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <Navbar />
      <SalesPopup />

      {/* Scarcity / Urgency Top Bar */}
      <div className="bg-red-700 text-white text-[10px] md:text-xs font-bold py-2.5 text-center uppercase tracking-wide mt-14 sticky top-14 z-40 border-b border-red-800 flex items-center justify-center gap-2">
        <Timer size={14} className="animate-pulse" />
        ATTENZIONE: Offerta Esclusiva valida per i prossimi {formatTime(timeLeft)}. Solo 14 confezioni residue.
      </div>

      {/* Hero Section - Product Focused */}
      <header className="px-4 pt-8 pb-16 md:pt-12 md:pb-24 bg-slate-900 text-white relative overflow-hidden min-h-[85vh] md:min-h-[70vh] flex items-center">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Top badge */}
            <div className="mb-4 md:mb-6">
              <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest">
                🔬 Integratore Clinicamente Testato
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight uppercase tracking-tight">
              Spegni la Fame.<br/>
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Brucia il Grasso.</span>
            </h1>

            <p className="text-gray-400 text-sm md:text-lg max-w-2xl mb-6 md:mb-8 font-medium">
              L'integratore italiano a base di Complex 400mg che resetta i tuoi segnali di sazietà in soli 18 minuti.
            </p>

            {/* Product image - clean, no effects */}
            <div className="mb-6 md:mb-10">
              <img
                src="/images/zempbio/400mg.png"
                alt="ZEMPBIO Complex 400mg"
                className="w-44 md:w-64 lg:w-72 mx-auto"
              />
            </div>

            {/* Price section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 mb-6 md:mb-8 w-full max-w-sm">
              <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Offerta Lancio Limitata</p>
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-4xl md:text-5xl font-bold text-white">€39,99</span>
                <span className="text-lg text-gray-500 line-through">€79,99</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">-50%</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm">30 compresse • Trattamento completo 30 giorni</p>
            </div>

            {/* CTA Button */}
            <a href="#order" className="w-full max-w-sm bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white py-4 md:py-5 rounded-xl font-bold text-base md:text-lg uppercase shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2 mb-4">
              Ordina Ora - Spedizione Gratis <ArrowRight size={20} />
            </a>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-wide">
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-400" /> Notificato Min. Salute</span>
              <span className="flex items-center gap-1.5"><Truck size={14} className="text-blue-400" /> Consegna 24/48h</span>
              <span className="flex items-center gap-1.5"><Award size={14} className="text-amber-400" /> Made in EU</span>
            </div>
          </div>
        </div>

      </header>

      {/* Metabolic Analyzer Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-gray-100 relative">
        <div className="container mx-auto max-w-2xl relative z-10">
          <div className="text-center mb-8 text-white">
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">🎯 Test Gratuito in 30 Secondi</p>
            <h2 className="text-2xl md:text-3xl font-bold uppercase mb-2">Scopri il Tuo Blocco Metabolico</h2>
            <p className="text-gray-400 text-sm">Perché le diete non funzionano su di te? Fai il test e scoprilo subito.</p>
          </div>
          <MetabolicAnalyzer onResult={() => {}} />
        </div>
      </section>

      {/* The Mechanism Section - Text Only */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 uppercase leading-tight mb-4">
              Perché la Forza di Volontà <span className="text-red-600">non basta più?</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
              Dopo i 40 anni, il segnale della <strong>Leptina</strong> (l'ormone della sazietà) viene bloccato dal grasso viscerale. Il tuo cervello pensa che tu stia morendo di fame anche se hai appena mangiato.
            </p>
          </div>

          {/* ZEMPBIO Benefits */}
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 md:p-10 border border-emerald-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 uppercase mb-6 text-center">
              Grazie a ZEMPBIO™ potrai:
            </h3>
            <div className="space-y-4">
              {[
                { title: "Spegnere la Fame Nervosa", desc: "Il Complex 400mg blocca chimicamente lo stimolo della grelina entro 20 minuti. Addio voglie incontrollate.", icon: <Zap size={24} />, color: "blue" },
                { title: "Resettare il Segnale di Sazietà", desc: "Le tue cellule torneranno ricettive ai segnali naturali di stop-cibo. Mangerai meno senza sforzo.", icon: <RefreshCw size={24} />, color: "emerald" },
                { title: "Bruciare il Grasso Accumulato", desc: "Attiva l'autofagia lipidica: il corpo usa il grasso vecchio come energia invece di immagazzinarne di nuovo.", icon: <TrendingDown size={24} />, color: "red" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all">
                  <div className={`shrink-0 p-3 rounded-xl ${item.color === 'blue' ? 'bg-blue-100 text-blue-600' : item.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 uppercase text-base mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table - 2 Columns */}
      <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-3xl relative z-10">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-400 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest mb-4">
              <Microscope size={14} /> Confronto Onesto
            </div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase leading-tight">
              ZEMPBIO™ <span className="text-gray-500">vs</span> Prodotti Comuni
            </h2>
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-visible shadow-2xl border border-slate-600 mt-8">
            {/* Header Row */}
            <div className="grid grid-cols-[1fr,1fr,1fr] md:grid-cols-[1.5fr,1fr,1fr]">
              <div className="bg-slate-900 p-4 md:p-5 rounded-tl-2xl"></div>
              {/* ZEMPBIO Header - Emphasized */}
              <div className="bg-gradient-to-b from-emerald-500 to-blue-600 p-4 md:p-6 text-center relative">
                {/* CONSIGLIATO Badge - Now above the table */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-5 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase shadow-xl whitespace-nowrap flex items-center gap-1.5 border-2 border-yellow-300">
                  <Star size={14} className="fill-yellow-900" /> CONSIGLIATO
                </div>
                <div className="flex flex-col items-center gap-1 mt-2">
                  <div className="bg-white text-blue-600 px-3 py-1.5 rounded-lg font-bold text-xs md:text-sm shadow">ZEMPBIO™</div>
                </div>
              </div>
              {/* Competitors Header */}
              <div className="bg-slate-700 p-4 md:p-5 text-center rounded-tr-2xl">
                <span className="text-sm md:text-lg font-bold text-gray-400">Altri Prodotti</span>
              </div>
            </div>

            {/* Comparison Rows */}
            {[
              { label: "Concentrazione", zempbio: "400mg", competitor: "100-150mg" },
              { label: "Tempo Effetto", zempbio: "18 min", competitor: "2-3 ore" },
              { label: "Costo al Giorno", zempbio: "€1,33", competitor: "€2.50+" },
              { label: "Blocca Fame Nervosa", zempbio: "check", competitor: "x" },
              { label: "Effetti Collaterali", zempbio: "Zero", competitor: "Possibili" },
              { label: "Garanzia", zempbio: "60 giorni", competitor: "Nessuna" },
              { label: "Pago alla Consegna", zempbio: "check", competitor: "x" },
              { label: "Spedizione Gratis", zempbio: "check", competitor: "x" },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-[1fr,1fr,1fr] md:grid-cols-[1.5fr,1fr,1fr] border-t border-slate-700 ${i % 2 === 0 ? 'bg-slate-800/30' : 'bg-slate-800/50'}`}>
                {/* Label */}
                <div className="p-3 md:p-4 flex items-center">
                  <span className="text-xs md:text-sm text-gray-300 font-medium">{row.label}</span>
                </div>
                {/* ZEMPBIO Value - Emphasized */}
                <div className="p-3 md:p-4 bg-blue-600/20 border-x border-blue-500/30 flex items-center justify-center">
                  {row.zempbio === "check" ? (
                    <CheckCircle2 className="text-emerald-400" size={24} />
                  ) : (
                    <span className="text-white font-bold text-sm md:text-lg">{row.zempbio}</span>
                  )}
                </div>
                {/* Competitor Value */}
                <div className="p-3 md:p-4 flex items-center justify-center">
                  {row.competitor === "x" ? (
                    <XCircle className="text-red-400/60" size={24} />
                  ) : (
                    <span className="text-gray-500 text-sm">{row.competitor}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 text-center">
            <p className="text-gray-400 text-sm mb-4">La scelta è ovvia. Unisciti ai <span className="text-white font-bold">14.200+</span> clienti soddisfatti.</p>
            <a href="#order" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold uppercase shadow-lg transition-all">
              Ordina ZEMPBIO™ Ora <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Main Narrative Reviews (Before/After) */}
      <section id="reviews" className="py-24 px-4 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide mb-4">
            <Star size={14} className="fill-emerald-600" /> Risultati Verificati
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-16 uppercase bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Storie di Trasformazione Reale</h2>
          <div className="space-y-16">
             {[
               {
                 name: "Maria Concetta R.",
                 age: "64 anni",
                 date: "05 Gen 2026",
                 text: "Ho provato di tutto, ma la fame nervosa la sera era più forte di me. Dopo 3 giorni di ZEMPBIO™ ho sentito come se qualcuno avesse spento un interruttore. Ho perso 12kg in due mesi e i miei dolori alle ginocchia sono spariti. Lo consiglio a tutte le mie amiche!",
                 photoBefore: "/images/zempbio/DONNA PRIMA.jpeg",
                 photoAfter: "/images/zempbio/DONNA DOPO.jpeg",
               },
               {
                 name: "Roberto T.",
                 age: "58 anni",
                 date: "21 Dic 2025",
                 text: "Il mio medico mi aveva avvertito: o dimagrisco o iniziano i problemi seri. Avevo paura delle punture di cui parlano tutti, costano troppo. ZEMPBIO™ costa un decimo e funziona alla grande. La pancia è sparita e ho ripreso a fare le passeggiate in montagna.",
                 photoBefore: "/images/zempbio/UOMO PRIMA.jpeg",
                 photoAfter: "/images/zempbio/UOMO DOPO.jpeg",
               }
             ].map((review, idx) => (
               <div key={idx} className="group relative">
                 {/* Card glow on hover */}
                 <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                 <div className="relative bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-xl flex flex-col md:flex-row gap-12 items-center text-left hover:shadow-2xl transition-all">
                   <div className="w-full md:w-1/3 shrink-0">
                      {/* Before/After with enhanced styling */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="relative group/before">
                          <div className="aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden border-2 border-gray-300 shadow-lg relative">
                             <img src={review.photoBefore} alt={`${review.name} Prima`} className="w-full h-full object-cover group-hover/before:scale-105 transition-transform duration-500" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                             <div className="absolute bottom-2 left-2 bg-red-500 text-white text-[9px] font-bold uppercase px-3 py-1.5 rounded-lg shadow-lg">Prima</div>
                          </div>
                        </div>
                        <div className="relative group/after">
                          <div className="absolute -inset-1 bg-emerald-500 rounded-xl blur-md opacity-50"></div>
                          <div className="relative aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-lg">
                             <img src={review.photoAfter} alt={`${review.name} Dopo`} className="w-full h-full object-cover group-hover/after:scale-105 transition-transform duration-500" />
                             <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent"></div>
                             <div className="absolute bottom-2 left-2 bg-emerald-500 text-white text-[9px] font-bold uppercase px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
                               <CheckCircle2 size={10} /> Dopo
                             </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-2xl text-gray-900 leading-none">{review.name}</p>
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-wide mt-1 flex items-center gap-2">
                          <span className="bg-blue-100 px-2 py-0.5 rounded">{review.age}</span>
                          <span className="text-emerald-600">Cliente Verificato</span>
                        </p>
                      </div>
                   </div>
                   <div className="flex-grow">
                     <div className="flex items-center justify-between mb-6">
                       <div className="flex gap-1">
                         {[...Array(5)].map((_, i) => <Star key={i} size={22} className="fill-yellow-400 text-yellow-400 drop-shadow-sm" />)}
                       </div>
                       <span className="text-sm text-gray-400 font-medium">{review.date}</span>
                     </div>
                     <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium italic">"{review.text}"</p>
                     <div className="mt-8 flex items-center gap-3 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs uppercase px-4 py-3 rounded-xl inline-flex">
                       <CheckCircle2 size={16}/> Acquisto Confermato
                     </div>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Science Behind ZEMPBIO Section - Clean Professional Design */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-3">Scheda Tecnica Prodotto</p>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4">
              Formulazione ZEMPBIO™ Complex 400mg
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Integratore alimentare a base di estratti vegetali standardizzati per il controllo del senso di fame e il supporto metabolico.
            </p>
          </div>

          {/* Product + Info Grid */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
            {/* Product Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-slate-100 rounded-2xl"></div>
                <div className="relative bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
                  <img src="/images/zempbio/400mg.png" alt="ZEMPBIO Complex 400mg" className="w-48 md:w-56 mx-auto drop-shadow-lg" />
                </div>
              </div>
            </div>

            {/* Info Panel */}
            <div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <BoxIcon size={18} className="text-slate-600" /> Informazioni Prodotto
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="text-slate-600">Formato</span>
                    <span className="font-semibold text-slate-800">30 compresse</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="text-slate-600">Dosaggio per compressa</span>
                    <span className="font-semibold text-slate-800">400mg Complex</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="text-slate-600">Durata trattamento</span>
                    <span className="font-semibold text-slate-800">30 giorni</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Prodotto in</span>
                    <span className="font-semibold text-slate-800">Unione Europea 🇪🇺</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Timer size={18} className="text-blue-600" /> Posologia
                </h3>
                <p className="text-slate-700 font-medium mb-3">1 compressa a pranzo + 1 compressa a cena</p>
                <p className="text-slate-500 text-sm">Assumere 20 minuti prima dei pasti principali con un bicchiere d'acqua. Non superare la dose giornaliera consigliata.</p>
              </div>
            </div>
          </div>

          {/* COMPOSITION SECTION - HORIZONTAL CAROUSEL */}
          <div className="mb-14">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-red-100 border border-red-200 text-red-700 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide mb-4">
                <Zap size={14} /> Formula Brevettata
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800">Composizione per Dose Giornaliera</h3>
              <p className="text-slate-500 text-sm mt-2">Scorri per vedere tutti i principi attivi →</p>
            </div>

            {/* Horizontal scrolling carousel */}
            <div className="relative">
              {/* Gradient fade edges to indicate more content */}
              <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

              {/* Scroll container */}
              <div className="overflow-x-auto pb-4 -mx-4 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="flex gap-4" style={{ width: 'max-content' }}>
                  {[
                    {
                      name: "LeptinX-7™",
                      fullName: "Griffonia simplicifolia",
                      amount: "240mg",
                      color: "from-purple-600 to-purple-800",
                      bgColor: "bg-gradient-to-br from-purple-100 to-purple-50",
                      effect: "SPEGNE L'INTERRUTTORE DELLA FAME",
                      description: "Agisce sui recettori ipotalamici. In 18 minuti il cervello smette di inviare segnali di fame."
                    },
                    {
                      name: "GrelinBlock®",
                      fullName: "Glucomannano da Konjac",
                      amount: "190mg",
                      color: "from-emerald-600 to-emerald-800",
                      bgColor: "bg-gradient-to-br from-emerald-100 to-emerald-50",
                      effect: "BLOCCA L'ORMONE DELLA FAME",
                      description: "Neutralizza la grelina creando un senso di pienezza IMPOSSIBILE da ignorare."
                    },
                    {
                      name: "ThermoBurn-X3",
                      fullName: "Tè Verde titolato EGCG",
                      amount: "170mg",
                      color: "from-orange-500 to-red-600",
                      bgColor: "bg-gradient-to-br from-orange-100 to-orange-50",
                      effect: "BRUCIA GRASSO A RIPOSO",
                      description: "Attiva la termogenesi: il corpo brucia calorie anche mentre dormi."
                    },
                    {
                      name: "AdipoCyte Disruptor™",
                      fullName: "Acido Linoleico CLA",
                      amount: "120mg",
                      color: "from-blue-600 to-indigo-700",
                      bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
                      effect: "DISTRUGGE CELLULE GRASSO",
                      description: "Penetra nelle cellule adipose e le converte in energia utilizzabile."
                    },
                    {
                      name: "NeuroCalm-B6",
                      fullName: "Vitamina B6 P-5-P",
                      amount: "80mg",
                      color: "from-cyan-500 to-teal-600",
                      bgColor: "bg-gradient-to-br from-cyan-100 to-cyan-50",
                      effect: "ELIMINA FAME NERVOSA",
                      description: "Stabilizza i neurotrasmettitori. Niente più abbuffate da stress o ansia."
                    },
                  ].map((ingredient, idx) => (
                    <div key={idx} className={`${ingredient.bgColor} rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all w-[280px] md:w-[320px] shrink-0 border border-white/50`}>
                      {/* Amount badge */}
                      <div className={`bg-gradient-to-br ${ingredient.color} text-white px-4 py-3 rounded-xl text-center mb-4`}>
                        <p className="text-3xl md:text-4xl font-bold leading-none">{ingredient.amount}</p>
                        <p className="text-[9px] font-bold uppercase tracking-wide opacity-80 mt-1">per dose</p>
                      </div>

                      {/* Content */}
                      <h4 className="text-lg font-bold text-slate-800 mb-1">{ingredient.name}</h4>
                      <p className="text-xs text-slate-500 font-medium mb-3">({ingredient.fullName})</p>
                      <p className={`text-xs font-bold uppercase tracking-wide mb-3 bg-gradient-to-r ${ingredient.color} bg-clip-text text-transparent`}>
                        ⚡ {ingredient.effect}
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed">{ingredient.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation hint */}
              <div className="flex justify-center mt-4 gap-2">
                <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                  <span>←</span>
                  <span>Scorri per vedere tutti</span>
                  <span>→</span>
                </div>
              </div>
            </div>

            {/* Total box */}
            <div className="mt-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">Totale Principi Attivi</p>
                  <p className="text-4xl md:text-5xl font-bold">800mg</p>
                </div>
                <div className="hidden md:block w-px h-16 bg-slate-600"></div>
                <div className="text-left">
                  <p className="text-emerald-400 font-bold text-sm uppercase">✓ 5x più concentrato della concorrenza</p>
                  <p className="text-emerald-400 font-bold text-sm uppercase">✓ Biodisponibilità certificata al 94%</p>
                  <p className="text-emerald-400 font-bold text-sm uppercase">✓ Zero filler, zero additivi inutili</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 text-center">*Il glucomannano contribuisce alla perdita di peso nel contesto di una dieta ipocalorica - claim autorizzato EFSA.</p>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { icon: <ShieldCheck size={20} />, text: "Notificato al Ministero della Salute" },
              { icon: <Award size={20} />, text: "Produzione GMP" },
              { icon: <CheckCircle2 size={20} />, text: "100% Ingredienti Naturali" },
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-600 text-sm">
                <div className="text-slate-500">{badge.icon}</div>
                <span className="font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall of Love - Massive Grid */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 border-y border-gray-200 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="flex justify-center mb-6">
             <div className="relative">
               <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
               <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white p-5 rounded-2xl shadow-xl"><Heart size={36} className="animate-pulse" /></div>
             </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Oltre 14.200 Clienti Soddisfatti</h2>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-wide mb-16">Siamo i leader nel settore Bio-Hacking Over 40</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wallOfLove.map((rev, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all text-left">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-md">{rev.name[0]}</div>
                     <div>
                        <p className="text-xs font-bold text-gray-900 leading-none">{rev.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{rev.age}</p>
                     </div>
                   </div>
                   <span className="text-[9px] text-gray-400 font-medium">{rev.date}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <span className="text-[9px] text-emerald-600 font-bold uppercase flex items-center gap-1"><CheckCircle2 size={10}/> Verificato</span>
                </div>
                <p className="text-sm text-gray-700 font-medium mb-4 leading-relaxed">"{rev.text}"</p>
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <img src={rev.photo} alt={`Trasformazione ${rev.name}`} className="w-full h-auto object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Offer & Order Form */}
      <section id="order" className="py-16 md:py-24 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-emerald-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-8 md:mb-12">
             <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">Ordina Ora</h2>
             <p className="text-gray-400 text-sm md:text-lg font-bold uppercase tracking-wide">Attiva il tuo protocollo Complex oggi stesso</p>
          </div>

          {/* Enhanced Product Display */}
          <div className="relative mb-10 md:mb-16">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-slate-700/50 to-emerald-600/20 rounded-2xl blur-xl"></div>

            <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 py-8 md:py-10 px-6 bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-600/50 shadow-2xl">
              {/* Product image with effects */}
              <div className="relative">
                {/* Glow behind product */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur-2xl opacity-30 scale-110"></div>

                {/* Rotating ring */}
                <div className="absolute -inset-4 border-2 border-dashed border-blue-400/30 rounded-full animate-[spin_15s_linear_infinite]"></div>

                {/* Product container */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <img
                    src="/images/zempbio/400mg.png"
                    alt="ZEMPBIO"
                    className="w-24 h-auto md:w-36 rounded-xl drop-shadow-2xl hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Floating mini badges */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-lg text-[8px] font-bold shadow-lg animate-bounce">
                  <Star size={10} className="inline" /> TOP
                </div>
              </div>

              {/* Info section */}
              <div className="text-center md:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-sm mb-4 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                  <Zap size={14} /> Offerta Lancio -50%
                </div>

                {/* Price */}
                <div className="flex items-end gap-3 justify-center md:justify-start mb-2">
                  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">€39,99</span>
                  <span className="text-lg text-gray-500 line-through mb-1">€79,99</span>
                </div>

                {/* Details */}
                <p className="text-emerald-400 font-bold text-sm uppercase tracking-wide">30 Compresse Complex 400mg</p>

                {/* Trust badges */}
                <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase">
                    <Truck size={12} className="text-blue-400" /> Gratis
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase">
                    <ShieldCheck size={12} className="text-emerald-400" /> Garantito
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase">
                    <Award size={12} className="text-amber-400" /> Certificato
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* The Specific Offer - Enhanced */}
            <div className="space-y-4 md:space-y-6">
               {/* Main offer card with glow */}
               <div className="relative">
                  {/* Outer glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 rounded-3xl blur-lg opacity-50 animate-glow"></div>

                  <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-5 md:p-12 rounded-2xl border border-blue-400/30 shadow-2xl overflow-hidden">
                     {/* Animated background pattern */}
                     <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_50%)]"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:60px_60px]"></div>
                     </div>

                     {/* Shine effect */}
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_4s_infinite]"></div>

                     <div className="relative z-10">
                        {/* URGENCY BANNER */}
                        <div className="bg-red-500/20 border border-red-400/50 rounded-xl p-3 mb-6 text-center animate-pulse">
                           <p className="text-red-300 text-xs md:text-sm font-bold uppercase flex items-center justify-center gap-2">
                              <AlertTriangle size={16} /> ATTENZIONE: Solo 14 confezioni rimaste a questo prezzo!
                           </p>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 md:mb-6">
                           <div>
                              <h3 className="text-2xl md:text-3xl font-bold uppercase leading-none bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Protocollo ZEMPBIO</h3>
                              <p className="text-[10px] md:text-xs font-bold text-blue-200 uppercase mt-2 tracking-wide">Trattamento Completo 30 Giorni</p>
                           </div>
                           <div className="relative">
                              <div className="absolute inset-0 bg-red-500 rounded-xl blur-md opacity-50 animate-pulse"></div>
                              <div className="relative bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-xl font-bold text-[9px] md:text-[10px] uppercase shadow-lg whitespace-nowrap flex items-center gap-1">
                                 <Timer size={12} /> Scade Tra Poco
                              </div>
                           </div>
                        </div>

                        <div className="flex flex-wrap items-end gap-2 md:gap-3 mb-6 md:mb-8">
                           <div className="text-5xl md:text-7xl font-bold leading-none bg-gradient-to-b from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg">€39,99</div>
                           <div className="text-lg md:text-xl font-bold text-blue-300/60 line-through mb-1">€79,99</div>
                           <div className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs md:text-sm font-bold uppercase mb-2 animate-pulse">-50% OGGI</div>
                        </div>

                        <div className="space-y-3 mb-6 md:mb-8">
                           <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 p-4 rounded-xl border border-emerald-400/30">
                              <div className="bg-emerald-500 p-2 rounded-lg shadow-lg"><CheckCircle2 className="text-white" size={20}/></div>
                              <div>
                                 <p className="font-bold text-white text-sm md:text-base uppercase">30 Compresse Complex 400mg</p>
                                 <p className="text-emerald-300 text-[10px] md:text-xs">Formula brevettata ad alta concentrazione</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-blue-600/10 p-4 rounded-xl border border-blue-400/30">
                              <div className="bg-blue-500 p-2 rounded-lg shadow-lg"><Truck className="text-white" size={20}/></div>
                              <div>
                                 <p className="font-bold text-white text-sm md:text-base uppercase">Spedizione Express GRATIS</p>
                                 <p className="text-blue-300 text-[10px] md:text-xs">Consegna in 24/48h direttamente a casa tua</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-amber-600/10 p-4 rounded-xl border border-amber-400/30">
                              <div className="bg-amber-500 p-2 rounded-lg shadow-lg"><ShieldCheck className="text-white" size={20}/></div>
                              <div>
                                 <p className="font-bold text-white text-sm md:text-base uppercase">Pagamento alla Consegna</p>
                                 <p className="text-amber-300 text-[10px] md:text-xs">Paghi SOLO quando hai il prodotto in mano</p>
                              </div>
                           </div>
                        </div>

                        <div className="bg-gradient-to-r from-emerald-600/30 to-blue-600/30 p-4 md:p-5 rounded-xl border border-emerald-400/50 text-center">
                           <p className="text-lg md:text-xl font-bold uppercase tracking-wide text-white">Totale Oggi: <span className="text-emerald-300 text-2xl md:text-3xl">€39,99</span></p>
                           <p className="text-emerald-200 text-xs mt-1">Risparmia €40 - Nessun costo nascosto</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Trust badges with hover effects */}
               <div className="grid grid-cols-2 gap-3 md:gap-6">
                  <div className="group relative">
                     <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity"></div>
                     <div className="relative bg-slate-700/80 backdrop-blur-sm p-5 md:p-8 rounded-xl border border-slate-600 text-center hover:border-blue-400 transition-all hover:scale-105">
                        <div className="bg-blue-500/20 p-3 rounded-xl inline-block mb-2 md:mb-3">
                           <Truck size={28} className="text-blue-400" />
                        </div>
                        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-wide">Consegna 0€</p>
                     </div>
                  </div>
                  <div className="group relative">
                     <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity"></div>
                     <div className="relative bg-slate-700/80 backdrop-blur-sm p-5 md:p-8 rounded-xl border border-slate-600 text-center hover:border-emerald-400 transition-all hover:scale-105">
                        <div className="bg-emerald-500/20 p-3 rounded-xl inline-block mb-2 md:mb-3">
                           <Award size={28} className="text-emerald-400" />
                        </div>
                        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-wide">Garanzia 60gg</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Direct Order Form */}
            <div className="bg-white text-gray-900 p-8 md:p-12 rounded-2xl shadow-xl relative">
              <div className="flex items-center gap-4 mb-10 border-b border-gray-200 pb-8">
                 <div className="bg-blue-600 text-white p-4 rounded-xl shadow-md"><Phone size={28}/></div>
                 <div>
                    <h3 className="text-2xl md:text-3xl font-bold uppercase leading-none">Modulo Ordine Rapido</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-wide">Inserisci i dati per la spedizione</p>
                 </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                     <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Nome</label>
                     <input type="text" placeholder="Maria" className="w-full border border-gray-300 p-4 rounded-lg bg-gray-50 font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" required />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Cognome</label>
                     <input type="text" placeholder="Rossi" className="w-full border border-gray-300 p-4 rounded-lg bg-gray-50 font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" required />
                  </div>
                </div>

                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Telefono Cellulare</label>
                   <input type="tel" placeholder="333 1234567" className="w-full border border-gray-300 p-4 rounded-lg bg-gray-50 font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" required />
                </div>

                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Indirizzo Completo e Civico</label>
                   <input type="text" placeholder="Es. Via Roma 10" className="w-full border border-gray-300 p-4 rounded-lg bg-gray-50 font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" required />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                     <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Città</label>
                     <input type="text" placeholder="Milano" className="w-full border border-gray-300 p-4 rounded-lg bg-gray-50 font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" required />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">CAP</label>
                     <input type="text" placeholder="20100" className="w-full border border-gray-300 p-4 rounded-lg bg-gray-50 font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" required />
                  </div>
                </div>

                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 flex items-center gap-4">
                   <div className="bg-emerald-600 text-white p-2 rounded-lg"><CheckCircle2 size={18} /></div>
                   <p className="text-xs font-bold text-emerald-800 uppercase">Pagamento sicuro alla consegna (Contanti)</p>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl font-bold text-xl md:text-2xl uppercase shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-4">
                  CONFERMA ORDINE <ArrowRight size={24}/>
                </button>

                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Lock size={12}/>
                  <p className="text-[9px] font-bold uppercase tracking-wide">Dati protetti da crittografia 256-bit AES</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Final Objection Handling */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <MessageSquare size={48} className="text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-bold uppercase text-gray-900 leading-none">Domande Frequenti</h2>
            <p className="text-gray-500 font-bold mt-4 uppercase text-[10px] tracking-wide">Nessun dubbio deve restare insoluto</p>
          </div>

          <div className="space-y-6">
            {[
              { q: "ZEMPBIO™ è uguale alle iniezioni chimiche?", a: "No, ZEMPBIO™ è l'alternativa naturale 'bio-hackerata'. Mentre i farmaci usano molecole sintetiche con gravi effetti collaterali, noi usiamo il Complex 400mg che imita la stessa bio-chimica in modo sicuro." },
              { q: "Funziona davvero se ho superato i 50 anni?", a: "SÌ. Anzi, ZEMPBIO™ è progettato specificamente per corpi con metabolismo basale rallentato. È l'unico che agisce sulla resistenza alla Leptina tipica dell'età adulta." },
              { q: "Quando vedrò i primi risultati?", a: "La riduzione della fame è immediata (primi 20 minuti). I primi cambiamenti visivi allo specchio e sulla bilancia avvengono solitamente tra il 5° e il 7° giorno di trattamento costante." },
              { q: "Cosa succede se non funziona su di me?", a: "Ti offriamo una Garanzia 'Soddisfatti o Rimborsati' di 60 giorni. Se non perdi peso o non senti sparire la fame, ti restituiamo ogni centesimo. Non vogliamo i tuoi soldi se non otteniamo risultati." },
              { q: "Come posso pagare?", a: "Per la tua massima sicurezza, accettiamo solo Pagamento alla Consegna. Non serve carta di credito. Paghi direttamente al corriere quando hai il pacco in mano." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:bg-gray-100 hover:shadow-md transition-all group">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center justify-between uppercase leading-tight">
                  {faq.q}
                  <ChevronDown className="group-hover:translate-y-1 transition-all text-blue-600" />
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trustpilot-style Reviews Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          {/* Header with Trustpilot-style branding */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-2xl mb-6">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-emerald-500 flex items-center justify-center">
                    <Star size={14} className="fill-white text-white" />
                  </div>
                ))}
              </div>
              <span className="text-white font-bold text-sm">TrustScore 4.8</span>
              <span className="text-gray-400 text-xs">| 2.847 recensioni</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase mb-2">Cosa Dicono i Nostri Clienti</h2>
            <p className="text-gray-400 text-sm font-medium">Recensioni verificate degli ultimi mesi</p>
          </div>

          {/* Horizontal Scrolling Reviews */}
          <div className="relative">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling container */}
            <div className="overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="flex gap-4 md:gap-6 px-4" style={{ width: 'max-content' }}>
                {[
                  { name: "Antonella M.", city: "Roma", rating: 5, date: "15 Gen 2026", text: "Incredibile! In 3 settimane ho perso 6kg senza sentire fame. Il prodotto è arrivato in 24h, pacco discreto. Super consigliato!", verified: true },
                  { name: "Giuseppe R.", city: "Napoli", rating: 5, date: "12 Gen 2026", text: "Ero scettico ma mia moglie mi ha convinto. Risultato? -8kg in un mese e mezzo. La fame nervosa serale è sparita completamente.", verified: true },
                  { name: "Francesca L.", city: "Milano", rating: 5, date: "08 Gen 2026", text: "Finalmente un prodotto che funziona davvero. Ho provato di tutto prima, questo è l'unico che mi ha fatto perdere peso senza effetti collaterali.", verified: true },
                  { name: "Marco B.", city: "Torino", rating: 4, date: "03 Gen 2026", text: "Buon prodotto, spedizione velocissima. Ho perso 4kg nel primo mese. Continuo il trattamento, sono fiducioso.", verified: true },
                  { name: "Rosa P.", city: "Palermo", rating: 5, date: "28 Dic 2025", text: "A 58 anni pensavo fosse impossibile dimagrire. ZEMPBIO mi ha fatto ricredere. -10kg e mi sento rinata!", verified: true },
                  { name: "Luca D.", city: "Bologna", rating: 5, date: "22 Dic 2025", text: "Il pagamento alla consegna mi ha convinto a provare. Nessun rischio e risultati visibili già dalla seconda settimana.", verified: true },
                  { name: "Carla S.", city: "Firenze", rating: 5, date: "18 Dic 2025", text: "La mia nutrizionista era scettica, ora me lo chiede per le sue pazienti! -7kg in 5 settimane senza dieta drastica.", verified: true },
                  { name: "Antonio V.", city: "Bari", rating: 5, date: "10 Dic 2025", text: "Prodotto eccezionale. La fame sparisce dopo 20 minuti dall'assunzione. Ho ripreso a fare sport senza sentirmi stanco.", verified: true },
                  { name: "Giulia N.", city: "Verona", rating: 4, date: "05 Dic 2025", text: "Funziona! Unica nota: ci vuole costanza. Dopo il primo mese i risultati sono evidenti. -5kg finora.", verified: true },
                  { name: "Stefano C.", city: "Genova", rating: 5, date: "28 Nov 2025", text: "Mia sorella me l'ha consigliato dopo aver perso 12kg. Ora capisco perché! Prodotto serio, non la solita truffa.", verified: true },
                  { name: "Maria T.", city: "Catania", rating: 5, date: "20 Nov 2025", text: "Ho 62 anni e il metabolismo era fermo. Con ZEMPBIO ho perso 9kg in 2 mesi. I miei figli non ci credevano!", verified: true },
                  { name: "Paolo F.", city: "Venezia", rating: 5, date: "15 Nov 2025", text: "Ottimo rapporto qualità prezzo. Costa meno di un mese di palestra e funziona molto meglio. Lo ricomprerò sicuramente.", verified: true },
                  { name: "Elena G.", city: "Trieste", rating: 5, date: "08 Nov 2025", text: "Spedizione in 24h come promesso. Il prodotto è di qualità, si vede dalla confezione. Dopo 3 settimane -4kg!", verified: true },
                  { name: "Vincenzo A.", city: "Reggio Calabria", rating: 5, date: "01 Nov 2025", text: "La fame nervosa era il mio problema da sempre. Ora mangio porzioni normali e sono sazio. Miracoloso!", verified: true },
                  { name: "Teresa M.", city: "Perugia", rating: 4, date: "25 Ott 2025", text: "Buon prodotto, risultati graduali ma costanti. -6kg in 6 settimane. Consiglio di abbinare una camminata quotidiana.", verified: true },
                  { name: "Roberto L.", city: "Parma", rating: 5, date: "18 Ott 2025", text: "Dopo le iniezioni costose che non potevo permettermi, ho trovato ZEMPBIO. Stessi risultati a un decimo del prezzo!", verified: true },
                  { name: "Silvana R.", city: "Modena", rating: 5, date: "10 Ott 2025", text: "Le mie amiche pensavano avessi fatto un intervento! -11kg in 2 mesi e mezzo. Grazie ZEMPBIO!", verified: true },
                  { name: "Giovanni P.", city: "Brescia", rating: 5, date: "02 Ott 2025", text: "Finalmente riesco a controllare cosa mangio. La fame compulsiva è sparita. Prodotto che mantiene le promesse.", verified: true },
                  { name: "Angela D.", city: "Taranto", rating: 5, date: "25 Set 2025", text: "Ordinato per curiosità, ora non posso più farne a meno. -8kg e tanta energia in più. Lo consiglio a tutti!", verified: true },
                  { name: "Massimo B.", city: "Salerno", rating: 5, date: "18 Set 2025", text: "Il medico mi aveva detto di dimagrire urgentemente. Con ZEMPBIO ho perso 14kg in 3 mesi. Valori del sangue perfetti ora!", verified: true },
                ].map((review, idx) => (
                  <div key={idx} className="flex-shrink-0 w-[300px] md:w-[350px] bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{review.name}</p>
                          <p className="text-xs text-gray-500">{review.city}</p>
                        </div>
                      </div>
                      {review.verified && (
                        <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-[9px] font-bold uppercase flex items-center gap-1">
                          <CheckCircle2 size={10} /> Verificato
                        </div>
                      )}
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-5 h-5 ${i < review.rating ? 'bg-emerald-500' : 'bg-gray-200'} flex items-center justify-center`}>
                          <Star size={12} className={i < review.rating ? 'fill-white text-white' : 'fill-gray-400 text-gray-400'} />
                        </div>
                      ))}
                      <span className="text-xs text-gray-400 ml-2">{review.date}</span>
                    </div>

                    {/* Review text */}
                    <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-1">98%</p>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wide">Clienti Soddisfatti</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-1">4.8<span className="text-2xl text-emerald-400">/5</span></p>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wide">Valutazione Media</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-1">2.847</p>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wide">Recensioni Totali</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-20 px-4 border-t border-gray-200 text-center">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-center gap-1 mb-8">
            <div className="bg-blue-700 text-white p-1 rounded-md font-bold text-lg text-xs uppercase">ZB</div>
            <span className="font-bold text-2xl text-gray-900 uppercase">ZEMPBIO<span className="text-blue-600">™</span></span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-12 opacity-40 grayscale pointer-events-none">
             <img src="https://via.placeholder.com/120x60?text=GMP+CERT" alt="Trust" />
             <img src="https://via.placeholder.com/120x60?text=ISO+9001" alt="Trust" />
             <img src="https://via.placeholder.com/120x60?text=MADE+IN+EU" alt="Trust" />
          </div>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wide leading-loose max-w-3xl mx-auto">
            Disclaimer: I risultati sono soggettivi e possono variare. ZEMPBIO™ è un integratore alimentare e non va inteso come sostituto di una dieta variata ed equilibrata. Consultare il medico prima dell'uso in caso di patologie pregresse. <br/>
            BioHacker Labs Ltd - Sede Legale: Milano, Italia. P.IVA 08927361221. <br/>
            Sito non affiliato a Facebook, Google o Meta Inc. <br/>
            © 2024 Tutti i diritti riservati.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50 flex items-center justify-between gap-4 shadow-lg">
         <div>
            <p className="text-[10px] font-bold text-emerald-600 uppercase leading-none mb-1">Offerta Lancio</p>
            <p className="text-2xl font-bold text-blue-600 leading-none">€39,99<span className="text-[10px] text-gray-500 uppercase ml-1">60 CPR</span></p>
         </div>
         <a href="#order" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase shadow-lg flex-grow text-center">
           Ordina Ora
         </a>
      </div>
    </div>
  );
};

export default App;
