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
  const heightM = parseFloat(height) / 100; // converti cm in metri

  // Calcolo BMI
  const bmi = weightNum / (heightM * heightM);
  const bmiRounded = Math.round(bmi * 10) / 10;

  // Categoria BMI
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

  // Normopeso - protocollo mantenimento
  if (bmi >= 18.5 && bmi < 25) {
    if (hungerNum >= 6) {
      text = `Analisi completata: Con un BMI di ${bmiRounded} (${bmiCategory}) sei già in una fascia di peso salutare. Tuttavia, il tuo livello di fame nervosa ${hungerLevel}/10 indica che i segnali di sazietà non sono ottimali. Senza intervento, il rischio di accumulo adiposo aumenta con l'età. ZEMPBIO™ Complex 1000mg nel PROTOCOLLO MANTENIMENTO aiuta a stabilizzare i recettori della leptina e prevenire futuri squilibri metabolici. Sei un candidato ideale per il protocollo preventivo.`;
    } else {
      text = `Analisi completata: Ottimo! Con un BMI di ${bmiRounded} (${bmiCategory}) e un livello di fame controllato (${hungerLevel}/10), il tuo profilo metabolico è nella norma. Per MANTENERE questi risultati nel tempo e prevenire il naturale rallentamento metabolico legato all'età, ZEMPBIO™ Complex 1000mg nel PROTOCOLLO MANTENIMENTO supporta l'equilibrio ormonale della sazietà. Ideale per chi vuole restare in forma senza sforzo.`;
    }
  }
  // Sovrappeso
  else if (bmi >= 25 && bmi < 30) {
    text = `Analisi completata: A ${age} anni con un BMI di ${bmiRounded} (${bmiCategory}), il tuo profilo indica accumulo di grasso viscerale che sta bloccando i segnali della leptina. Con ${weight}kg e fame nervosa a ${hungerLevel}/10, i recettori ipotalamici risultano desensibilizzati. ZEMPBIO™ Complex 1000mg agisce sul reset dei peptidi della sazietà, permettendo al corpo di riconoscere quando è davvero sazio. Sei un candidato ideale per il protocollo standard.`;
  }
  // Obesità
  else if (bmi >= 30) {
    text = `Analisi completata: ATTENZIONE - Con un BMI di ${bmiRounded} (${bmiCategory}) a ${age} anni, il tuo metabolismo è in stato di emergenza. Il grasso viscerale ha completamente disattivato l'interruttore della sazietà. A ${weight}kg, la resistenza alla leptina è severa e la forza di volontà NON può vincere contro questa biochimica alterata. Si raccomanda l'intervento IMMEDIATO con ZEMPBIO™ Complex 1000mg nel PROTOCOLLO INTENSIVO per resettare i segnali neuro-chimici. Sei un candidato prioritario.`;
  }
  // Sottopeso (caso raro)
  else {
    text = `Analisi completata: Con un BMI di ${bmiRounded} (${bmiCategory}), il tuo peso è sotto la norma. ZEMPBIO™ è formulato per chi desidera controllare la fame e perdere peso. Ti consigliamo di consultare un nutrizionista per un piano personalizzato di aumento massa.`;
  }

  // Override per fame alta indipendentemente dal BMI (tranne sottopeso)
  if (hungerNum >= 8 && bmi >= 18.5) {
    text = `Analisi completata: ALLARME FAME NERVOSA - Con un livello ${hungerLevel}/10, i tuoi recettori della grelina sono in stato di iperattivazione cronica. A ${age} anni e ${weight}kg (BMI: ${bmiRounded} - ${bmiCategory}), questo squilibrio ormonale rende impossibile qualsiasi dieta tradizionale. Il cervello è convinto che stai morendo di fame anche dopo i pasti. ZEMPBIO™ Complex 1000mg spegne chimicamente questo falso allarme entro 20 minuti dalla prima assunzione. Sei un candidato URGENTE per il protocollo intensivo.`;
  }

  return { text, bmi: bmiRounded, bmiCategory };
};

// --- Sub-Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3 px-4 flex justify-between items-center">
    <div className="flex items-center gap-1">
      <div className="bg-blue-700 text-white p-1 rounded font-bold text-lg italic">ZB</div>
      <span className="font-black text-xl tracking-tighter text-slate-900 uppercase italic">ZEMPBIO<span className="text-blue-600">™</span></span>
    </div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase italic">
        <CheckCircle2 size={14}/> Disponibilità: Alta Richiesta
      </div>
      <a href="#order" className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg hover:bg-emerald-700 transition-all uppercase flex items-center gap-2">
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
      case "Sottopeso": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Normopeso": return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "Sovrappeso": return "text-orange-600 bg-orange-50 border-orange-200";
      case "Obesità": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-10 border-4 border-blue-100 text-slate-900 relative">
      <div className="absolute -top-5 -right-5 bg-blue-600 text-white p-4 rounded-2xl shadow-xl rotate-6 hidden md:block">
        <Microscope size={24} />
      </div>
      <h3 className="text-2xl font-black mb-2 uppercase italic text-center leading-none">Analizzatore Bio-Metabolico AI</h3>
      <p className="text-[10px] text-slate-400 text-center mb-8 font-black uppercase tracking-widest leading-none">Scansione BMI + Resistenza Leptina v5.0</p>

      {!localResult ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">Età</label>
              <input type="number" placeholder="Anni" required className="w-full border-2 border-slate-100 p-3 md:p-4 rounded-2xl bg-slate-50 text-lg font-bold outline-none focus:border-blue-500 transition-all" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">Altezza</label>
              <input type="number" placeholder="cm" required className="w-full border-2 border-slate-100 p-3 md:p-4 rounded-2xl bg-slate-50 text-lg font-bold outline-none focus:border-blue-500 transition-all" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">Peso</label>
              <input type="number" placeholder="Kg" required className="w-full border-2 border-slate-100 p-3 md:p-4 rounded-2xl bg-slate-50 text-lg font-bold outline-none focus:border-blue-500 transition-all" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">Livello di Fame Nervosa (1-10)</label>
            <input type="range" min="1" max="10" className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" value={formData.hunger} onChange={(e) => setFormData({...formData, hunger: e.target.value})} />
            <div className="flex justify-between text-[10px] font-black text-slate-400 italic"><span>CONTROLLATA</span><span>INFERNALE</span></div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg uppercase shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95">
            {loading ? <RefreshCw className="animate-spin" /> : <>Avvia Diagnosi AI <ArrowRight size={20}/></>}
          </button>
        </form>
      ) : (
        <div className="animate-in fade-in zoom-in duration-500">
          {/* BMI Display */}
          <div className={`flex items-center justify-between p-4 rounded-2xl border-2 mb-4 ${getBmiColor(localResult.bmiCategory)}`}>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Il tuo BMI</p>
              <p className="text-3xl font-black leading-none">{localResult.bmi}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Categoria</p>
              <p className="text-lg font-black uppercase italic">{localResult.bmiCategory}</p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-[6px] border-blue-600 p-6 rounded-r-2xl mb-6">
            <p className="text-slate-800 text-sm md:text-base italic leading-relaxed font-medium">
              {localResult.text}
            </p>
          </div>
          <a href="#order" className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black block text-center uppercase shadow-xl shadow-emerald-200 text-lg cta-pulse active:scale-95">
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
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 flex items-center gap-3 max-w-[300px]">
        <div className="bg-emerald-100 p-2 rounded-full">
          <CheckCircle2 className="text-emerald-600" size={20} />
        </div>
        <div>
          <p className="text-xs font-black text-slate-900">{currentSale.name} da {currentSale.city}</p>
          <p className="text-[10px] text-slate-500">ha appena ordinato ZEMPBIO™</p>
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
    { name: "Lucia B.", age: "49 anni", text: "Ero scettica, pensavo fosse la solita pubblicità. Dopo 3 giorni la voglia di pane e pasta è sparita. -8kg in un mese senza stress.", photo: "/images/zempbio/donna/donna2378.jpg" },
    { name: "Giancarlo M.", age: "52 anni", text: "Finalmente un prodotto serio. Niente tachicardia, solo una sensazione di sazietà costante. La pancia è sparita.", photo: "/images/zempbio/UOMO/uomo089235.jpg" },
    { name: "Franca T.", age: "44 anni", text: "La menopausa mi aveva distrutto il metabolismo. ZEMPBIO™ lo ha riacceso. Mi sento di nuovo energica.", photo: "/images/zempbio/donna/donna2387.jpg" },
    { name: "Paolo D.", age: "41 anni", text: "Ottimo prodotto. Consegna veloce e pagamento al corriere. Ho perso 9kg finora e continuo.", photo: "/images/zempbio/UOMO/uomo25370.jpg" },
    { name: "Ester S.", age: "57 anni", text: "Mio figlio mi ha regalato questo trattamento. Ora usciamo a camminare e non mi stanco più. Un miracolo.", photo: "/images/zempbio/donna/donna24378y.jpg" },
    { name: "Claudio F.", age: "39 anni", text: "Spegnere la fame nervosa serale era il mio problema. ZEMPBIO™ ha risolto tutto. -11kg in 3 mesi.", photo: "/images/zempbio/UOMO/uomo536429.jpg" },
    { name: "Rosanna G.", age: "51 anni", text: "Le mie amiche mi chiedono cosa ho fatto al viso. Sembro ringiovanita perché ho perso peso in modo sano.", photo: "/images/zempbio/donna/donna3245.jpg" },
    { name: "Vincenzo L.", age: "46 anni", text: "Mangio porzioni normali e sono soddisfatto. La mia pressione è migliorata. Consigliatissimo per chi ha superato i 50.", photo: "/images/zempbio/UOMO/uomo58297.jpg" },
    { name: "Adele P.", age: "50 anni", text: "Non ci credevo, ma i 1000mg fanno la differenza. Ho provato pillole da 200mg e non facevano nulla. Questo funziona.", photo: "/images/zempbio/donna/donna4578.jpg" },
    { name: "Marco V.", age: "45 anni", text: "Soddisfatto al 100%. Il pacco è arrivato anonimo e ho pagato in contanti. -6kg nelle prime due settimane.", photo: "/images/zempbio/UOMO/uomo235489.jpg" },
    { name: "Silvana M.", age: "53 anni", text: "Avevo sempre fame di dolci. Ora il mio cervello non li chiede più. Incredibile come agisce sulla mente.", photo: "/images/zempbio/donna/donna5479y.jpg" },
    { name: "Giorgio B.", age: "48 anni", text: "La scienza dietro ZEMPBIO™ è solida. Si sente che non è robetta da supermercato. Autorità e Risultati.", photo: "/images/zempbio/UOMO/uomo235897.jpg" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <Navbar />
      <SalesPopup />

      {/* Scarcity / Urgency Top Bar */}
      <div className="bg-red-700 text-white text-[10px] md:text-xs font-black py-2.5 text-center uppercase tracking-tighter mt-14 sticky top-14 z-40 shadow-xl flex items-center justify-center gap-2">
        <Timer size={14} className="animate-pulse" />
        ATTENZIONE: Offerta Esclusiva valida per i prossimi {formatTime(timeLeft)}. Solo 14 confezioni residue.
      </div>

      {/* Hero Section */}
      <header className="px-4 pt-12 pb-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-emerald-500 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="bg-blue-600/30 text-blue-300 border border-blue-500/40 inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase italic mb-8 tracking-widest">
                Protocollo ZEMPBIO™ Complex 1000mg
              </div>
              <h1 className="text-4xl md:text-7xl font-black mb-6 leading-[1.02] italic uppercase tracking-tighter">
                Smetti di essere <br/> <span className="text-blue-500 underline decoration-blue-500/50">Schiavo</span> della Fame
              </h1>
              <p className="text-lg md:text-2xl text-slate-300 mb-10 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Non è colpa tua se le diete hanno fallito. È colpa del tuo "interruttore biologico" rotto. ZEMPBIO™ resetta i tuoi segnali di sazietà in 18 minuti.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 opacity-60">
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter italic">
                   <ShieldCheck size={18} className="text-emerald-500" /> Made in Europe
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter italic">
                   <Award size={18} className="text-blue-500" /> Certificato GMP
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter italic">
                   <TrendingDown size={18} className="text-red-500" /> -12kg Media Clienti
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
            <div className="relative group">
              <img src="/images/zempbio/Mockup.png" alt="ZEMPBIO Bottle" className="rounded-[3rem] shadow-2xl relative z-10 max-w-[280px] md:max-w-[350px] mx-auto" />
              <div className="absolute -bottom-10 -right-10 bg-blue-600 text-white p-8 rounded-[2rem] shadow-2xl z-20 hidden md:block border-4 border-white max-w-[220px]">
                 <p className="text-4xl font-black italic leading-none mb-2">1000<span className="text-xs uppercase ml-1">mg</span></p>
                 <p className="text-[10px] font-black uppercase leading-none tracking-tighter opacity-80">Dosaggio Medico per Compressa</p>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 italic uppercase leading-tight tracking-tighter">
                Perché la Forza di Volontà <span className="text-red-600">non basta più?</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                Dopo i 40 anni, il segnale della <strong>Leptina</strong> (l'ormone della sazietà) viene bloccato dal grasso viscerale. Il tuo cervello pensa che tu stia morendo di fame anche se hai appena mangiato.
              </p>
              <div className="space-y-4">
                 {[
                   { title: "Spegnimento Grelina", desc: "Blocca chimicamente lo stimolo della fame nervosa entro 20 minuti.", icon: <Zap className="text-blue-600" /> },
                   { title: "Reset Leptina", desc: "Rende le cellule ricettive ai segnali di stop-cibo naturali.", icon: <RefreshCw className="text-emerald-600" /> },
                   { title: "Autofagia Lipidica", desc: "Forza il corpo a bruciare grasso vecchio come fonte di energia.", icon: <TrendingDown className="text-red-600" /> }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
                      <div className="shrink-0">{item.icon}</div>
                      <div>
                        <p className="font-black text-slate-900 uppercase italic text-sm">{item.title}</p>
                        <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 px-4 bg-slate-900 text-white border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
           <h2 className="text-3xl md:text-5xl font-black text-center mb-16 italic uppercase leading-none tracking-tighter">
             ZEMPBIO™ <span className="text-blue-500 underline decoration-blue-500/30">VS</span> PRODOTTI COMUNI
           </h2>
           <div className="bg-slate-800 rounded-[2.5rem] shadow-3xl overflow-hidden border border-slate-700">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-slate-950">
                   <th className="p-6 text-[10px] uppercase tracking-widest opacity-50">Caratteristica Tecniche</th>
                   <th className="p-6 text-sm uppercase bg-blue-600 text-center italic font-black">ZEMPBIO™</th>
                   <th className="p-6 text-[10px] uppercase text-center opacity-30">Pillole Farmacia</th>
                 </tr>
               </thead>
               <tbody className="text-sm md:text-base">
                 <tr className="border-b border-slate-700/50">
                   <td className="p-6 font-bold italic">Concentrazione Complex</td>
                   <td className="p-6 text-blue-400 font-black text-center italic">1000mg Reali</td>
                   <td className="p-6 text-slate-500 text-center">150mg-250mg</td>
                 </tr>
                 <tr className="border-b border-slate-700/50">
                   <td className="p-6 font-bold italic">Effetto 'Sazi senza fame'</td>
                   <td className="p-6 text-center"><CheckCircle2 className="text-emerald-500 mx-auto" size={24} /></td>
                   <td className="p-6 text-center"><XCircle className="text-red-400 mx-auto" size={24} /></td>
                 </tr>
                 <tr className="border-b border-slate-700/50">
                   <td className="p-6 font-bold italic">Costo giornaliero medio</td>
                   <td className="p-6 text-blue-400 font-black text-center italic">€0,84</td>
                   <td className="p-4 text-slate-500 text-center">€2.50+</td>
                 </tr>
                 <tr>
                   <td className="p-6 font-bold italic">Sicurezza per over 50</td>
                   <td className="p-6 text-emerald-400 font-black text-center italic uppercase text-xs">Testata e Garantita</td>
                   <td className="p-4 text-slate-500 text-center">Dubbia</td>
                 </tr>
               </tbody>
             </table>
           </div>
        </div>
      </section>

      {/* Main Narrative Reviews (Before/After) */}
      <section id="reviews" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-6xl font-black mb-16 uppercase italic tracking-tighter">Storie di Trasformazione Reale</h2>
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
               <div key={idx} className="bg-slate-50 p-8 md:p-12 rounded-[3rem] border-2 border-slate-100 shadow-xl flex flex-col md:flex-row gap-12 items-center text-left">
                 <div className="w-full md:w-1/3 shrink-0">
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="aspect-[3/4] bg-slate-200 rounded-3xl overflow-hidden border-2 border-white shadow-md relative">
                         <img src={review.photoBefore} alt={`${review.name} Prima`} className="w-full h-full object-cover" />
                         <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-bold uppercase px-2 py-1 rounded">Prima</div>
                      </div>
                      <div className="aspect-[3/4] bg-slate-200 rounded-3xl overflow-hidden border-4 border-emerald-400 shadow-md relative">
                         <img src={review.photoAfter} alt={`${review.name} Dopo`} className="w-full h-full object-cover" />
                         <div className="absolute bottom-2 left-2 bg-emerald-500 text-white text-[9px] font-bold uppercase px-2 py-1 rounded">Dopo</div>
                      </div>
                    </div>
                    <div>
                      <p className="font-black text-2xl text-slate-900 leading-none">{review.name}</p>
                      <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1 italic">{review.age} - Cliente Verificato</p>
                    </div>
                 </div>
                 <div className="flex-grow">
                   <div className="flex gap-1 mb-6">
                     {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />)}
                   </div>
                   <p className="text-xl md:text-2xl text-slate-700 italic leading-relaxed font-medium">"{review.text}"</p>
                   <div className="mt-8 flex items-center gap-3 text-emerald-600 font-black text-xs uppercase italic">
                     <CheckCircle2 size={18}/> Acquisto Confermato il 12/10/2023
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Wall of Love - Massive Grid */}
      <section className="py-24 px-4 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
             <div className="bg-blue-600 text-white p-4 rounded-full shadow-xl"><Heart size={32} /></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 italic uppercase tracking-tighter">Oltre 14.200 Clienti Soddisfatti</h2>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.2em] mb-16">Siamo i leader nel settore Bio-Hacking Over 40</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wallOfLove.map((rev, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all text-left">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center font-black text-blue-600 text-xs">{rev.name[0]}</div>
                   <div>
                      <p className="text-xs font-black text-slate-900 leading-none">{rev.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{rev.age}</p>
                   </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-slate-700 italic font-medium mb-4 leading-relaxed">"{rev.text}"</p>
                <div className="rounded-2xl overflow-hidden border border-slate-100">
                  <img src={rev.photo} alt={`Trasformazione ${rev.name}`} className="w-full h-auto object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Offer & Order Form */}
      <section id="order" className="py-16 md:py-24 px-4 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12 md:mb-20">
             <h2 className="text-3xl md:text-7xl font-black italic uppercase mb-4 tracking-tighter">Scegli il Tuo Pacchetto</h2>
             <p className="text-slate-400 text-sm md:text-xl font-bold uppercase tracking-widest italic">Attiva il tuo protocollo 1000mg oggi stesso</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* The Specific Offer: 2x49.99 */}
            <div className="space-y-4 md:space-y-6">
               <div className="bg-blue-600 p-5 md:p-12 rounded-[2rem] md:rounded-[3rem] border-4 border-blue-400 shadow-3xl relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-[80px]"></div>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 md:mb-8">
                     <div>
                        <h3 className="text-2xl md:text-4xl font-black italic uppercase leading-none">Protocollo Bipacco 2x</h3>
                        <p className="text-[10px] md:text-xs font-black text-blue-100 uppercase mt-2 italic tracking-widest">Trattamento di 60 Giorni (120 Compresse)</p>
                     </div>
                     <div className="bg-white text-blue-600 px-4 py-1.5 md:px-5 md:py-2 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase italic animate-pulse shadow-lg whitespace-nowrap">
                        Best Seller
                     </div>
                  </div>

                  <div className="flex flex-wrap items-end gap-2 md:gap-3 mb-6 md:mb-10">
                     <div className="text-5xl md:text-7xl font-black leading-none italic tracking-tighter">€49,99</div>
                     <div className="text-lg md:text-2xl font-bold text-blue-200 line-through mb-1">€99,98</div>
                     <div className="text-xs md:text-sm font-black text-emerald-300 uppercase mb-2 italic">/ cad.</div>
                  </div>

                  <div className="space-y-3 md:space-y-4 mb-6 md:mb-10 text-xs md:text-base font-black italic uppercase">
                     <div className="flex items-center gap-2 md:gap-3"><CheckCircle2 className="text-emerald-300 shrink-0" size={18}/> 120 Compresse Complex 1000mg</div>
                     <div className="flex items-center gap-2 md:gap-3"><CheckCircle2 className="text-emerald-300 shrink-0" size={18}/> Spedizione Express 24h Gratuita</div>
                     <div className="flex items-center gap-2 md:gap-3"><CheckCircle2 className="text-emerald-300 shrink-0" size={18}/> Pagamento sicuro al corriere</div>
                  </div>

                  <div className="bg-black/20 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-white/10 text-center">
                     <p className="text-[10px] md:text-xs font-black uppercase tracking-wider md:tracking-[0.2em] text-blue-200">Totale Ordine: €99,98 (Nessun costo nascosto)</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-3 md:gap-6">
                  <div className="bg-slate-800 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-700 text-center group hover:border-blue-500 transition-all">
                     <Truck size={28} className="mx-auto text-blue-400 mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
                     <p className="text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest">Consegna 0€</p>
                  </div>
                  <div className="bg-slate-800 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-700 text-center group hover:border-emerald-500 transition-all">
                     <Award size={28} className="mx-auto text-emerald-400 mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
                     <p className="text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest">Garanzia 60gg</p>
                  </div>
               </div>
            </div>

            {/* Direct Order Form */}
            <div className="bg-white text-slate-900 p-8 md:p-12 rounded-[3rem] shadow-3xl relative">
              <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-8">
                 <div className="bg-blue-600 text-white p-4 rounded-3xl shadow-lg shadow-blue-200"><Phone size={28}/></div>
                 <div>
                    <h3 className="text-3xl font-black uppercase italic leading-none tracking-tighter">Modulo Ordine Rapido</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase mt-1 tracking-widest">Inserisci i dati per la spedizione</p>
                 </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-500 uppercase ml-3 italic">Nome</label>
                     <input type="text" placeholder="Maria" className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-slate-50 font-black outline-none focus:border-blue-500 transition-all" required />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-500 uppercase ml-3 italic">Cognome</label>
                     <input type="text" placeholder="Rossi" className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-slate-50 font-black outline-none focus:border-blue-500 transition-all" required />
                  </div>
                </div>
                
                <div className="space-y-1">
                   <label className="text-[10px] font-black text-slate-500 uppercase ml-3 italic">Telefono Cellulare</label>
                   <input type="tel" placeholder="333 1234567" className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-slate-50 font-black outline-none focus:border-blue-500 transition-all" required />
                </div>

                <div className="space-y-1">
                   <label className="text-[10px] font-black text-slate-500 uppercase ml-3 italic">Indirizzo Completo e Civico</label>
                   <input type="text" placeholder="Es. Via Roma 10" className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-slate-50 font-black outline-none focus:border-blue-500 transition-all" required />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-500 uppercase ml-3 italic">Città</label>
                     <input type="text" placeholder="Milano" className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-slate-50 font-black outline-none focus:border-blue-500 transition-all" required />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-500 uppercase ml-3 italic">CAP</label>
                     <input type="text" placeholder="20100" className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-slate-50 font-black outline-none focus:border-blue-500 transition-all" required />
                  </div>
                </div>

                <div className="bg-emerald-50 p-5 rounded-[2rem] border-2 border-emerald-100 flex items-center gap-4">
                   <div className="bg-emerald-600 text-white p-2 rounded-full"><CheckCircle2 size={18} /></div>
                   <p className="text-xs font-black text-emerald-800 uppercase italic">Pagamento sicuro alla consegna (Contanti)</p>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black text-2xl uppercase italic shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center gap-4 active:scale-95">
                  CONFERMA ORDINE <ArrowRight size={24}/>
                </button>
                
                <div className="flex items-center justify-center gap-2 text-slate-400">
                  <Lock size={12}/>
                  <p className="text-[9px] font-black uppercase tracking-widest">Dati protetti da crittografia 256-bit AES</p>
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
            <h2 className="text-3xl md:text-6xl font-black italic uppercase text-slate-900 tracking-tighter leading-none">Domande Frequenti</h2>
            <p className="text-slate-500 font-bold mt-4 uppercase text-[10px] tracking-[0.3em]">Nessun dubbio deve restare insoluto</p>
          </div>
          
          <div className="space-y-6">
            {[
              { q: "ZEMPBIO™ è uguale alle iniezioni chimiche?", a: "No, ZEMPBIO™ è l'alternativa naturale 'bio-hackerata'. Mentre i farmaci usano molecole sintetiche con gravi effetti collaterali, noi usiamo il Complex 1000mg che imita la stessa bio-chimica in modo sicuro." },
              { q: "Funziona davvero se ho superato i 50 anni?", a: "SÌ. Anzi, ZEMPBIO™ è progettato specificamente per corpi con metabolismo basale rallentato. È l'unico che agisce sulla resistenza alla Leptina tipica dell'età adulta." },
              { q: "Quando vedrò i primi risultati?", a: "La riduzione della fame è immediata (primi 20 minuti). I primi cambiamenti visivi allo specchio e sulla bilancia avvengono solitamente tra il 5° e il 7° giorno di trattamento costante." },
              { q: "Cosa succede se non funziona su di me?", a: "Ti offriamo una Garanzia 'Soddisfatti o Rimborsati' di 60 giorni. Se non perdi peso o non senti sparire la fame, ti restituiamo ogni centesimo. Non vogliamo i tuoi soldi se non otteniamo risultati." },
              { q: "Come posso pagare?", a: "Per la tua massima sicurezza, accettiamo solo Pagamento alla Consegna. Non serve carta di credito. Paghi direttamente al corriere quando hai il pacco in mano." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 hover:bg-slate-100 transition-all group">
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-4 flex items-center justify-between uppercase italic leading-tight">
                  {faq.q}
                  <ChevronDown className="group-hover:translate-y-1 transition-all text-blue-600" />
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Boomer Style */}
      <footer className="bg-slate-100 py-20 px-4 border-t border-slate-200 text-center">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-center gap-1 mb-8">
            <div className="bg-blue-700 text-white p-1 rounded font-bold text-lg italic text-xs uppercase">ZB</div>
            <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase italic">ZEMPBIO<span className="text-blue-600">™</span></span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-12 opacity-40 grayscale pointer-events-none">
             <img src="https://via.placeholder.com/120x60?text=GMP+CERT" alt="Trust" />
             <img src="https://via.placeholder.com/120x60?text=ISO+9001" alt="Trust" />
             <img src="https://via.placeholder.com/120x60?text=MADE+IN+EU" alt="Trust" />
          </div>
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-loose max-w-3xl mx-auto">
            Disclaimer: I risultati sono soggettivi e possono variare. ZEMPBIO™ è un integratore alimentare e non va inteso come sostituto di una dieta variata ed equilibrata. Consultare il medico prima dell'uso in caso di patologie pregresse. <br/>
            BioHacker Labs Ltd - Sede Legale: Milano, Italia. P.IVA 08927361221. <br/>
            Sito non affiliato a Facebook, Google o Meta Inc. <br/>
            © 2024 Tutti i diritti riservati.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 flex items-center justify-between gap-4 shadow-[0_-5px_25px_rgba(0,0,0,0.1)]">
         <div>
            <p className="text-[10px] font-black text-slate-400 uppercase leading-none italic mb-1">Promo 2 Boccette</p>
            <p className="text-2xl font-black text-blue-600 leading-none italic">€49,99<span className="text-[10px] text-slate-500 uppercase ml-1">/cad</span></p>
         </div>
         <a href="#order" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase italic shadow-xl shadow-blue-200 cta-pulse flex-grow text-center active:scale-95">
           Ordina Ora
         </a>
      </div>
    </div>
  );
};

export default App;
