"use client";

import React, { useState, useEffect } from 'react';
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
      text = `Analisi completata: Con un BMI di ${bmiRounded} (${bmiCategory}) sei già in una fascia di peso salutare. Tuttavia, il tuo livello di fame nervosa ${hungerLevel}/10 indica che i segnali di sazietà non sono ottimali. Senza intervento, il rischio di accumulo adiposo aumenta con l'età. ZEMPBIO™ Complex 1000mg nel PROTOCOLLO MANTENIMENTO aiuta a stabilizzare i recettori della leptina e prevenire futuri squilibri metabolici. Sei un candidato ideale per il protocollo preventivo.`;
    } else {
      text = `Analisi completata: Ottimo! Con un BMI di ${bmiRounded} (${bmiCategory}) e un livello di fame controllato (${hungerLevel}/10), il tuo profilo metabolico è nella norma. Per MANTENERE questi risultati nel tempo e prevenire il naturale rallentamento metabolico legato all'età, ZEMPBIO™ Complex 1000mg nel PROTOCOLLO MANTENIMENTO supporta l'equilibrio ormonale della sazietà. Ideale per chi vuole restare in forma senza sforzo.`;
    }
  } else if (bmi >= 25 && bmi < 30) {
    text = `Analisi completata: A ${age} anni con un BMI di ${bmiRounded} (${bmiCategory}), il tuo profilo indica accumulo di grasso viscerale che sta bloccando i segnali della leptina. Con ${weight}kg e fame nervosa a ${hungerLevel}/10, i recettori ipotalamici risultano desensibilizzati. ZEMPBIO™ Complex 1000mg agisce sul reset dei peptidi della sazietà, permettendo al corpo di riconoscere quando è davvero sazio. Sei un candidato ideale per il protocollo standard.`;
  } else if (bmi >= 30) {
    text = `Analisi completata: ATTENZIONE - Con un BMI di ${bmiRounded} (${bmiCategory}) a ${age} anni, il tuo metabolismo è in stato di emergenza. Il grasso viscerale ha completamente disattivato l'interruttore della sazietà. A ${weight}kg, la resistenza alla leptina è severa e la forza di volontà NON può vincere contro questa biochimica alterata. Si raccomanda l'intervento IMMEDIATO con ZEMPBIO™ Complex 1000mg nel PROTOCOLLO INTENSIVO per resettare i segnali neuro-chimici. Sei un candidato prioritario.`;
  } else {
    text = `Analisi completata: Con un BMI di ${bmiRounded} (${bmiCategory}), il tuo peso è sotto la norma. ZEMPBIO™ è formulato per chi desidera controllare la fame e perdere peso. Ti consigliamo di consultare un nutrizionista per un piano personalizzato di aumento massa.`;
  }

  if (hungerNum >= 8 && bmi >= 18.5) {
    text = `Analisi completata: ALLARME FAME NERVOSA - Con un livello ${hungerLevel}/10, i tuoi recettori della grelina sono in stato di iperattivazione cronica. A ${age} anni e ${weight}kg (BMI: ${bmiRounded} - ${bmiCategory}), questo squilibrio ormonale rende impossibile qualsiasi dieta tradizionale. Il cervello è convinto che stai morendo di fame anche dopo i pasti. ZEMPBIO™ Complex 1000mg spegne chimicamente questo falso allarme entro 20 minuti dalla prima assunzione. Sei un candidato URGENTE per il protocollo intensivo.`;
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
    { name: "Lucia B.", age: "38 anni", text: "Ero scettica, pensavo fosse la solita pubblicità. Dopo 3 giorni la voglia di pane e pasta è sparita. -8kg in un mese senza stress.", photo: "/images/zempbio/donna/donna2378.jpg" },
    { name: "Giancarlo M.", age: "35 anni", text: "Finalmente un prodotto serio. Niente tachicardia, solo una sensazione di sazietà costante. La pancia è sparita.", photo: "/images/zempbio/UOMO/uomo089235.jpg" },
    { name: "Franca T.", age: "65 anni", text: "La menopausa mi aveva distrutto il metabolismo. ZEMPBIO™ lo ha riacceso. Mi sento di nuovo energica.", photo: "/images/zempbio/donna/donna2387.jpg" },
    { name: "Paolo D.", age: "41 anni", text: "Ottimo prodotto. Consegna veloce e pagamento al corriere. Ho perso 9kg finora e continuo.", photo: "/images/zempbio/UOMO/uomo25370.jpg" },
    { name: "Ester S.", age: "44 anni", text: "Mio figlio mi ha regalato questo trattamento. Ora usciamo a camminare e non mi stanco più. Un miracolo.", photo: "/images/zempbio/donna/donna24378y.jpg" },
    { name: "Claudio F.", age: "39 anni", text: "Spegnere la fame nervosa serale era il mio problema. ZEMPBIO™ ha risolto tutto. -11kg in 3 mesi.", photo: "/images/zempbio/UOMO/uomo536429.jpg" },
    { name: "Rosanna G.", age: "30 anni", text: "Le mie amiche mi chiedono cosa ho fatto al viso. Sembro ringiovanita perché ho perso peso in modo sano.", photo: "/images/zempbio/donna/donna3245.jpg" },
    { name: "Vincenzo L.", age: "55 anni", text: "Mangio porzioni normali e sono soddisfatto. La mia pressione è migliorata. Consigliatissimo per chi ha superato i 50.", photo: "/images/zempbio/UOMO/uomo58297.jpg" },
    { name: "Adele P.", age: "35 anni", text: "Non ci credevo, ma i 1000mg fanno la differenza. Ho provato pillole da 200mg e non facevano nulla. Questo funziona.", photo: "/images/zempbio/donna/donna4578.jpg" },
    { name: "Marco V.", age: "38 anni", text: "Soddisfatto al 100%. Il pacco è arrivato anonimo e ho pagato in contanti. -6kg nelle prime due settimane.", photo: "/images/zempbio/UOMO/uomo235489.jpg" },
    { name: "Silvana M.", age: "33 anni", text: "Avevo sempre fame di dolci. Ora il mio cervello non li chiede più. Incredibile come agisce sulla mente.", photo: "/images/zempbio/donna/donna5479y.jpg" },
    { name: "Giorgio B.", age: "34 anni", text: "La scienza dietro ZEMPBIO™ è solida. Si sente che non è robetta da supermercato. Autorità e Risultati.", photo: "/images/zempbio/UOMO/uomo235897.jpg" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden">
      <Navbar />
      <SalesPopup />

      {/* Scarcity / Urgency Top Bar */}
      <div className="bg-red-700 text-white text-[10px] md:text-xs font-bold py-2.5 text-center uppercase tracking-wide mt-14 sticky top-14 z-40 border-b border-red-800 flex items-center justify-center gap-2">
        <Timer size={14} className="animate-pulse" />
        ATTENZIONE: Offerta Esclusiva valida per i prossimi {formatTime(timeLeft)}. Solo 14 confezioni residue.
      </div>

      {/* Hero Section */}
      <header className="px-4 pt-12 pb-24 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 text-white relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="bg-blue-600/40 text-blue-200 border border-blue-500/50 inline-block px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase mb-8 tracking-wide">
                Protocollo ZEMPBIO™ Complex 1000mg
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight uppercase">
                Smetti di essere <br/> <span className="text-blue-400 underline decoration-blue-400/50">Schiavo</span> della Fame
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Non è colpa tua se le diete hanno fallito. È colpa del tuo "interruttore biologico" rotto. ZEMPBIO™ resetta i tuoi segnali di sazietà in 18 minuti.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 opacity-70">
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide">
                   <ShieldCheck size={18} className="text-emerald-400" /> Made in Europe
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide">
                   <Award size={18} className="text-blue-400" /> Certificato GMP
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide">
                   <TrendingDown size={18} className="text-red-400" /> -12kg Media Clienti
                 </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full max-w-xl">
              <MetabolicAnalyzer onResult={() => {}} />
            </div>
          </div>
        </div>
      </header>

      {/* The Mechanism Section */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative flex items-center justify-center">
              {/* Due barattoli sovrapposti */}
              <div className="relative">
                <img src="/images/zempbio/Mockup.png" alt="ZEMPBIO Bottle 1" className="rounded-xl shadow-lg border border-gray-200 relative z-10 max-w-[180px] md:max-w-[220px] -rotate-6" />
                <img src="/images/zempbio/Mockup.png" alt="ZEMPBIO Bottle 2" className="rounded-xl shadow-xl border border-gray-200 absolute top-4 left-16 md:left-20 z-20 max-w-[180px] md:max-w-[220px] rotate-6" />
                {/* Badge x2 */}
                <div className="absolute -top-4 -right-4 md:-right-8 bg-red-600 text-white w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center z-30 shadow-lg border-2 border-red-700">
                  <span className="text-2xl md:text-3xl font-bold">x2</span>
                </div>
              </div>
              {/* Prezzo e info */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-xl z-30 border-2 border-emerald-700 text-center whitespace-nowrap">
                 <p className="text-[10px] font-bold uppercase tracking-wide mb-1 text-emerald-100">1+1 GRATIS</p>
                 <p className="text-3xl md:text-4xl font-bold leading-none">€49,99</p>
                 <p className="text-[10px] font-bold uppercase tracking-wide opacity-80 mt-1">TOTALE | 120 Compresse</p>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase leading-tight">
                Perché la Forza di Volontà <span className="text-red-600">non basta più?</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Dopo i 40 anni, il segnale della <strong>Leptina</strong> (l'ormone della sazietà) viene bloccato dal grasso viscerale. Il tuo cervello pensa che tu stia morendo di fame anche se hai appena mangiato.
              </p>
              <div className="space-y-4">
                 {[
                   { title: "Spegnimento Grelina", desc: "Blocca chimicamente lo stimolo della fame nervosa entro 20 minuti.", icon: <Zap className="text-blue-600" /> },
                   { title: "Reset Leptina", desc: "Rende le cellule ricettive ai segnali di stop-cibo naturali.", icon: <RefreshCw className="text-emerald-600" /> },
                   { title: "Autofagia Lipidica", desc: "Forza il corpo a bruciare grasso vecchio come fonte di energia.", icon: <TrendingDown className="text-red-600" /> }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                      <div className="shrink-0">{item.icon}</div>
                      <div>
                        <p className="font-bold text-gray-900 uppercase text-sm">{item.title}</p>
                        <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section - Modern */}
      <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-10 text-[200px] font-bold text-white">VS</div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="text-blue-400 font-bold uppercase text-xs tracking-widest mb-3">Confronto Onesto</p>
            <h2 className="text-3xl md:text-5xl font-bold uppercase leading-tight">
              Perché ZEMPBIO™ <span className="text-emerald-400">vince</span> sempre?
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Ecco cosa ci distingue dalle pillole che trovi in farmacia o nei supermercati</p>
          </div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">

            {/* ZEMPBIO Card - Winner */}
            <div className="relative">
              <div className="absolute -top-3 left-4 bg-emerald-500 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 shadow-lg z-10">
                <Award size={12} /> Scelta Vincente
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 md:p-8 border-2 border-blue-400 shadow-2xl shadow-blue-500/20 h-full">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-400/30">
                  <div className="bg-white text-blue-600 p-2 rounded-lg font-bold text-sm">ZB</div>
                  <h3 className="text-2xl md:text-3xl font-bold">ZEMPBIO™</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Concentrazione", value: "1000mg", highlight: "4x più potente", icon: <Zap size={18} /> },
                    { label: "Tempo effetto", value: "18 minuti", highlight: "Ultra rapido", icon: <Timer size={18} /> },
                    { label: "Costo giornaliero", value: "€0,84", highlight: "Più economico", icon: <TrendingDown size={18} /> },
                    { label: "Effetti collaterali", value: "Zero", highlight: "100% naturale", icon: <ShieldCheck size={18} /> },
                    { label: "Garanzia", value: "60 giorni", highlight: "Soddisfatti o rimborsati", icon: <Award size={18} /> },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="text-blue-200">{item.icon}</div>
                        <div>
                          <p className="text-blue-100 text-xs uppercase tracking-wide">{item.label}</p>
                          <p className="text-white font-bold text-lg">{item.value}</p>
                        </div>
                      </div>
                      <div className="bg-emerald-500 text-white text-[9px] font-bold uppercase px-2 py-1 rounded-lg">
                        {item.highlight}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-blue-400/30 flex items-center justify-center gap-2 text-emerald-300">
                  <CheckCircle2 size={20} />
                  <p className="font-bold uppercase text-sm">La Scelta Intelligente</p>
                </div>
              </div>
            </div>

            {/* Competitors Card - Loser */}
            <div className="relative">
              <div className="absolute -top-3 left-4 bg-red-500/80 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 shadow-lg z-10">
                <AlertTriangle size={12} /> Da Evitare
              </div>
              <div className="bg-slate-700/50 rounded-2xl p-6 md:p-8 border border-slate-600 h-full opacity-80">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-600">
                  <div className="bg-slate-600 text-slate-400 p-2 rounded-lg font-bold text-sm">?</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-400">Pillole Comuni</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Concentrazione", value: "150-250mg", problem: "Insufficiente", icon: <Zap size={18} /> },
                    { label: "Tempo effetto", value: "2-3 ore", problem: "Troppo lento", icon: <Timer size={18} /> },
                    { label: "Costo giornaliero", value: "€2.50+", problem: "Costoso", icon: <TrendingDown size={18} /> },
                    { label: "Effetti collaterali", value: "Possibili", problem: "Rischio", icon: <ShieldCheck size={18} /> },
                    { label: "Garanzia", value: "Nessuna", problem: "Zero tutela", icon: <Award size={18} /> },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-800/50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="text-slate-500">{item.icon}</div>
                        <div>
                          <p className="text-slate-500 text-xs uppercase tracking-wide">{item.label}</p>
                          <p className="text-slate-400 font-bold text-lg">{item.value}</p>
                        </div>
                      </div>
                      <div className="bg-red-500/20 text-red-400 text-[9px] font-bold uppercase px-2 py-1 rounded-lg border border-red-500/30">
                        {item.problem}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-600 flex items-center justify-center gap-2 text-red-400">
                  <XCircle size={20} />
                  <p className="font-bold uppercase text-sm">Soldi Sprecati</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { number: "4x", label: "Più Concentrato" },
              { number: "3x", label: "Più Economico" },
              { number: "98%", label: "Clienti Soddisfatti" },
              { number: "0", label: "Effetti Collaterali" },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 md:p-6 text-center hover:border-blue-500 transition-all">
                <p className="text-3xl md:text-4xl font-bold text-blue-400">{stat.number}</p>
                <p className="text-[10px] md:text-xs text-gray-400 uppercase font-bold mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Narrative Reviews (Before/After) */}
      <section id="reviews" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 uppercase">Storie di Trasformazione Reale</h2>
          <div className="space-y-16">
             {[
               {
                 name: "Maria Concetta R.",
                 age: "64 anni",
                 text: "Ho provato di tutto, ma la fame nervosa la sera era più forte di me. Dopo 3 giorni di ZEMPBIO™ ho sentito come se qualcuno avesse spento un interruttore. Ho perso 12kg in due mesi e i miei dolori alle ginocchia sono spariti. Lo consiglio a tutte le mie amiche!",
                 photoBefore: "/images/zempbio/DONNA PRIMA.jpeg",
                 photoAfter: "/images/zempbio/DONNA DOPO.jpeg",
               },
               {
                 name: "Roberto T.",
                 age: "58 anni",
                 text: "Il mio medico mi aveva avvertito: o dimagrisco o iniziano i problemi seri. Avevo paura delle punture di cui parlano tutti, costano troppo. ZEMPBIO™ costa un decimo e funziona alla grande. La pancia è sparita e ho ripreso a fare le passeggiate in montagna.",
                 photoBefore: "/images/zempbio/UOMO PRIMA.jpeg",
                 photoAfter: "/images/zempbio/UOMO DOPO.jpeg",
               }
             ].map((review, idx) => (
               <div key={idx} className="bg-gray-50 p-8 md:p-12 rounded-2xl border border-gray-200 shadow-lg flex flex-col md:flex-row gap-12 items-center text-left">
                 <div className="w-full md:w-1/3 shrink-0">
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden border border-gray-300 shadow-sm relative">
                         <img src={review.photoBefore} alt={`${review.name} Prima`} className="w-full h-full object-cover" />
                         <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-bold uppercase px-2 py-1 rounded">Prima</div>
                      </div>
                      <div className="aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-sm relative">
                         <img src={review.photoAfter} alt={`${review.name} Dopo`} className="w-full h-full object-cover" />
                         <div className="absolute bottom-2 left-2 bg-emerald-500 text-white text-[9px] font-bold uppercase px-2 py-1 rounded">Dopo</div>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-2xl text-gray-900 leading-none">{review.name}</p>
                      <p className="text-xs text-blue-600 font-bold uppercase tracking-wide mt-1">{review.age} - Cliente Verificato</p>
                    </div>
                 </div>
                 <div className="flex-grow">
                   <div className="flex gap-1 mb-6">
                     {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />)}
                   </div>
                   <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">"{review.text}"</p>
                   <div className="mt-8 flex items-center gap-3 text-emerald-600 font-bold text-xs uppercase">
                     <CheckCircle2 size={18}/> Acquisto Confermato il 12/10/2023
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Wall of Love - Massive Grid */}
      <section className="py-24 px-4 bg-gray-100 border-y border-gray-200">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
             <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg"><Heart size={32} /></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase">Oltre 14.200 Clienti Soddisfatti</h2>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-wide mb-16">Siamo i leader nel settore Bio-Hacking Over 40</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wallOfLove.map((rev, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all text-left">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-600 text-xs border border-blue-200">{rev.name[0]}</div>
                   <div>
                      <p className="text-xs font-bold text-gray-900 leading-none">{rev.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{rev.age}</p>
                   </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
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
      <section id="order" className="py-16 md:py-24 px-4 bg-slate-800 text-white relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-8 md:mb-12">
             <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">Scegli il Tuo Pacchetto</h2>
             <p className="text-gray-400 text-sm md:text-lg font-bold uppercase tracking-wide">Attiva il tuo protocollo 1000mg oggi stesso</p>
          </div>

          {/* Mobile-first 2x Product Display */}
          <div className="flex items-center justify-center gap-4 mb-10 md:mb-16 bg-slate-700 py-6 px-4 rounded-xl border border-slate-600">
            <div className="flex items-center">
              <img src="/images/zempbio/Mockup.png" alt="ZEMPBIO" className="w-16 h-auto md:w-24 -rotate-6 rounded-lg shadow-lg" />
              <img src="/images/zempbio/Mockup.png" alt="ZEMPBIO" className="w-16 h-auto md:w-24 -ml-4 rotate-6 rounded-lg shadow-lg" />
            </div>
            <div className="text-center">
              <div className="bg-emerald-600 text-white px-3 py-1 rounded-lg font-bold text-sm md:text-base mb-2 inline-block border border-emerald-700">1+1 GRATIS</div>
              <p className="text-3xl md:text-4xl font-bold text-white leading-none">€49,99</p>
              <p className="text-[9px] md:text-xs text-emerald-300 font-bold uppercase mt-1">TOTALE per 2 confezioni</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* The Specific Offer: 2x49.99 */}
            <div className="space-y-4 md:space-y-6">
               <div className="bg-blue-600 p-5 md:p-12 rounded-2xl border-2 border-blue-500 shadow-xl relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 md:mb-8">
                     <div>
                        <h3 className="text-2xl md:text-3xl font-bold uppercase leading-none">Protocollo Bipacco 2x</h3>
                        <p className="text-[10px] md:text-xs font-bold text-blue-100 uppercase mt-2 tracking-wide">Trattamento di 60 Giorni (120 Compresse)</p>
                     </div>
                     <div className="bg-white text-blue-600 px-4 py-1.5 md:px-5 md:py-2 rounded-lg font-bold text-[9px] md:text-[10px] uppercase animate-pulse shadow-md whitespace-nowrap">
                        Best Seller
                     </div>
                  </div>

                  <div className="flex flex-wrap items-end gap-2 md:gap-3 mb-6 md:mb-10">
                     <div className="text-5xl md:text-6xl font-bold leading-none">€49,99</div>
                     <div className="text-lg md:text-xl font-bold text-blue-200 line-through mb-1">€99,98</div>
                     <div className="text-xs md:text-sm font-bold text-emerald-300 uppercase mb-2">TOTALE | 1+1 GRATIS</div>
                  </div>

                  <div className="space-y-3 md:space-y-4 mb-6 md:mb-10 text-xs md:text-base font-bold uppercase">
                     <div className="flex items-center gap-2 md:gap-3"><CheckCircle2 className="text-emerald-300 shrink-0" size={18}/> 120 Compresse Complex 1000mg</div>
                     <div className="flex items-center gap-2 md:gap-3"><CheckCircle2 className="text-emerald-300 shrink-0" size={18}/> Spedizione Express 24h Gratuita</div>
                     <div className="flex items-center gap-2 md:gap-3"><CheckCircle2 className="text-emerald-300 shrink-0" size={18}/> Pagamento sicuro al corriere</div>
                  </div>

                  <div className="bg-black/20 p-4 md:p-5 rounded-xl border border-white/10 text-center">
                     <p className="text-[10px] md:text-xs font-bold uppercase tracking-wide text-blue-200">Totale Ordine: €49,99 (Nessun costo nascosto)</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-3 md:gap-6">
                  <div className="bg-slate-700 p-5 md:p-8 rounded-xl border border-slate-600 text-center hover:border-blue-500 transition-all">
                     <Truck size={28} className="mx-auto text-blue-400 mb-2 md:mb-3" />
                     <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-wide">Consegna 0€</p>
                  </div>
                  <div className="bg-slate-700 p-5 md:p-8 rounded-xl border border-slate-600 text-center hover:border-emerald-500 transition-all">
                     <Award size={28} className="mx-auto text-emerald-400 mb-2 md:mb-3" />
                     <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-wide">Garanzia 60gg</p>
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
              { q: "ZEMPBIO™ è uguale alle iniezioni chimiche?", a: "No, ZEMPBIO™ è l'alternativa naturale 'bio-hackerata'. Mentre i farmaci usano molecole sintetiche con gravi effetti collaterali, noi usiamo il Complex 1000mg che imita la stessa bio-chimica in modo sicuro." },
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
            <p className="text-[10px] font-bold text-emerald-600 uppercase leading-none mb-1">1+1 GRATIS</p>
            <p className="text-2xl font-bold text-blue-600 leading-none">€49,99<span className="text-[10px] text-gray-500 uppercase ml-1">TOTALE</span></p>
         </div>
         <a href="#order" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase shadow-lg flex-grow text-center">
           Ordina Ora
         </a>
      </div>
    </div>
  );
};

export default App;
