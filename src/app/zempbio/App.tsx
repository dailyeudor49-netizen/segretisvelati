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
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes slideInLeft {
    0% { opacity: 0; transform: translateX(-30px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  @keyframes bounceX {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(5px); }
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
  <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] py-3 px-4 flex justify-between items-center">
    <div className="flex items-center gap-1">
      <div className="bg-blue-700 text-white p-1 rounded-md font-bold text-lg">ZB</div>
      <span className="font-bold text-xl text-gray-900 uppercase">ZEMPBIO<span className="text-blue-600">™</span></span>
    </div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-red-600 uppercase animate-pulse">
        <AlertTriangle size={14}/> Ultimi pezzi disponibili
      </div>
      <a href="#order" className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-md hover:from-emerald-500 hover:to-emerald-400 transition-all uppercase flex items-center gap-2">
        Ordina Ora <ArrowRight size={14} />
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
  const [orderForm, setOrderForm] = useState({
    nome: '',
    telefono: '',
    indirizzo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Italian phone number validation
  const isValidItalianPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    // Italian mobile: starts with 3, 10 digits total
    // Italian landline: starts with 0, 9-11 digits
    if (cleaned.startsWith('3') && cleaned.length === 10) return true;
    if (cleaned.startsWith('0') && cleaned.length >= 9 && cleaned.length <= 11) return true;
    // With country code +39
    if (cleaned.startsWith('39') && cleaned.length >= 11 && cleaned.length <= 13) return true;
    return false;
  };

  const isFormValid = orderForm.nome.trim().length >= 3 &&
                      isValidItalianPhone(orderForm.telefono) &&
                      orderForm.indirizzo.trim().length >= 5;

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);

    try {
      // Build form data for API
      const formData = new URLSearchParams();
      formData.append('source_id', '9b16759a6289');
      formData.append('aff_sub1', '');
      formData.append('aff_sub2', '');
      formData.append('name', orderForm.nome);
      formData.append('phone', orderForm.telefono);
      formData.append('address', orderForm.indirizzo);

      // Send to Worldfilia API
      await fetch('https://network.worldfilia.net/manager/inventory/buy/ntm_zempbio_1x39.json?api_key=xgM6LBE0CA4EwJ4NTNhPBQ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        mode: 'no-cors' // API might not have CORS enabled
      });

      // Redirect to thank you page with name
      window.location.href = `/zempbio/grazie?nome=${encodeURIComponent(orderForm.nome)}`;
    } catch (error) {
      console.error('Error submitting order:', error);
      // Still redirect even if there's an error (no-cors doesn't return response)
      window.location.href = `/zempbio/grazie?nome=${encodeURIComponent(orderForm.nome)}`;
    }
  };

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

      {/* ==================== DESKTOP VERSION - Clean & Facebook Compliant ==================== */}
      <div className="hidden md:block">
        {/* Clean Header */}
        <header className="bg-white border-b border-gray-100 py-4 px-6">
          <div className="container mx-auto max-w-6xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 text-white p-1.5 rounded-lg font-bold text-sm">ZB</div>
              <span className="font-bold text-xl text-gray-900">ZEMPBIO<span className="text-emerald-600">™</span></span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-600" /> Notificato al Ministero della Salute</span>
              <span className="flex items-center gap-2"><Truck size={16} className="text-blue-600" /> Spedizione Gratuita</span>
            </div>
          </div>
        </header>

        {/* Hero Section - Clean & Professional */}
        <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <ShieldCheck size={16} /> Integratore Alimentare Naturale
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  Supporta il Tuo<br/>
                  <span className="text-emerald-600">Benessere Metabolico</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  ZEMPBIO™ Complex 400mg è un integratore alimentare formulato con ingredienti naturali
                  per supportare il normale metabolismo e contribuire al senso di sazietà.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-emerald-600 mt-1 shrink-0" size={20} />
                    <span className="text-gray-700">Formulazione a base di estratti vegetali</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-emerald-600 mt-1 shrink-0" size={20} />
                    <span className="text-gray-700">Contribuisce al normale metabolismo energetico</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-emerald-600 mt-1 shrink-0" size={20} />
                    <span className="text-gray-700">Prodotto in stabilimenti certificati EU GMP</span>
                  </li>
                </ul>
                <a href="#ordina" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
                  Scopri di Più <ArrowRight size={20} />
                </a>
              </div>
              {/* Product Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-3xl blur-2xl opacity-50"></div>
                  <img
                    src="/images/zempbio/Mockup.png"
                    alt="ZEMPBIO Complex 400mg - Integratore Alimentare"
                    className="relative w-80 lg:w-96 drop-shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Info Section */}
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Informazioni sul Prodotto</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                ZEMPBIO™ Complex 400mg è stato sviluppato per supportare chi desidera un aiuto naturale
                nel proprio percorso di benessere.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BoxIcon className="text-emerald-600" size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Contenuto</h3>
                <p className="text-gray-600 text-sm">30 compresse per confezione. Dose giornaliera consigliata: 2 compresse.</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="text-blue-600" size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Qualità Certificata</h3>
                <p className="text-gray-600 text-sm">Prodotto in stabilimenti con certificazione GMP nell'Unione Europea.</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-amber-600" size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Ingredienti Naturali</h3>
                <p className="text-gray-600 text-sm">Formula a base di estratti vegetali accuratamente selezionati.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Composizione e Ingredienti</h2>
                <p className="text-gray-600 mb-6">
                  La nostra formula Complex 400mg combina ingredienti di origine naturale,
                  selezionati per la loro qualità e purezza.
                </p>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-1">Estratto di Griffonia</h4>
                    <p className="text-sm text-gray-600">Contribuisce al normale tono dell'umore</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-1">Cromo</h4>
                    <p className="text-sm text-gray-600">Contribuisce al mantenimento di livelli normali di glucosio nel sangue</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-1">Vitamina B6</h4>
                    <p className="text-sm text-gray-600">Contribuisce al normale metabolismo energetico</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/images/zempbio/Mockup.png"
                  alt="ZEMPBIO Ingredienti"
                  className="w-64 drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Order Section - Desktop */}
        <section id="ordina" className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ordina ZEMPBIO™</h2>
              <p className="text-gray-600">Compila il modulo per richiedere il prodotto. Pagamento alla consegna.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Product Summary */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex gap-4 mb-6">
                  <img src="/images/zempbio/Mockup.png" alt="ZEMPBIO" className="w-24 h-24 object-contain" />
                  <div>
                    <h3 className="font-bold text-gray-900">ZEMPBIO™ Complex 400mg</h3>
                    <p className="text-sm text-gray-500">30 compresse - Integratore Alimentare</p>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-emerald-600">€39,99</span>
                      <span className="text-sm text-gray-400 line-through ml-2">€79,99</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Truck size={16} className="text-blue-600" />
                    <span>Spedizione gratuita in 24-48h</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ShieldCheck size={16} className="text-emerald-600" />
                    <span>Pagamento alla consegna</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award size={16} className="text-amber-600" />
                    <span>Garanzia soddisfatti o rimborsati 60 giorni</span>
                  </div>
                </div>
              </div>

              {/* Order Form */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Dati per la Spedizione</h3>
                <form className="space-y-4" onSubmit={handleOrderSubmit}>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Nome e Cognome</label>
                    <input
                      type="text"
                      placeholder="Es. Mario Rossi"
                      className="w-full border border-gray-300 p-3 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                      required
                      value={orderForm.nome}
                      onChange={(e) => setOrderForm({...orderForm, nome: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Telefono</label>
                    <input
                      type="tel"
                      placeholder="Es. 333 1234567"
                      className="w-full border border-gray-300 p-3 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                      required
                      value={orderForm.telefono}
                      onChange={(e) => setOrderForm({...orderForm, telefono: e.target.value.replace(/\D/g, '')})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Indirizzo di Spedizione</label>
                    <input
                      type="text"
                      placeholder="Via, Civico, CAP, Città"
                      className="w-full border border-gray-300 p-3 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                      required
                      value={orderForm.indirizzo}
                      onChange={(e) => setOrderForm({...orderForm, indirizzo: e.target.value})}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors ${
                      isFormValid
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Invio in corso...' : 'Conferma Ordine'}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    Riceverai una chiamata per confermare l'ordine
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="py-8 px-6 bg-gray-100">
          <div className="container mx-auto max-w-4xl">
            <div className="text-xs text-gray-500 space-y-2">
              <p><strong>Avvertenze:</strong> Gli integratori alimentari non vanno intesi come sostituti di una dieta variata ed equilibrata e di uno stile di vita sano. Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini al di sotto dei 3 anni.</p>
              <p><strong>Controindicazioni:</strong> Consultare il medico in caso di gravidanza, allattamento, assunzione di farmaci o patologie pregresse. Non utilizzare in caso di ipersensibilità a uno o più componenti.</p>
              <p><strong>Nota:</strong> I risultati possono variare da persona a persona e dipendono da molteplici fattori individuali.</p>
            </div>
          </div>
        </section>

        {/* Footer - Desktop */}
        <footer className="bg-gray-900 text-gray-400 py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-600 text-white p-1.5 rounded-lg font-bold text-sm">ZB</div>
                <span className="font-bold text-xl text-white">ZEMPBIO<span className="text-emerald-500">™</span></span>
              </div>
              <div className="text-sm text-center md:text-right">
                <p>BioHacker Labs Ltd - P.IVA 08927361221</p>
                <p className="mt-1">© 2024 Tutti i diritti riservati</p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* ==================== MOBILE VERSION - Current Aggressive Marketing ==================== */}
      <div className="md:hidden">
        <SalesPopup />

        {/* Urgency Bar - Fixed on Top - SUPER ALERT */}
        <div className="fixed top-0 left-0 right-0 z-50 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-500 to-orange-500 animate-[gradient_2s_ease_infinite] bg-[length:200%_100%]"></div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>

        {/* Content */}
        <div className="relative py-3 md:py-4">
          <div className="flex items-center justify-center gap-2 md:gap-4 px-4">
            {/* Flashing icon */}
            <div className="relative">
              <AlertTriangle size={20} className="text-yellow-300 animate-[ping_1s_ease-in-out_infinite]" />
              <AlertTriangle size={20} className="text-yellow-300 absolute inset-0" />
            </div>

            {/* Main text */}
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
              <span className="bg-yellow-400 text-red-700 px-3 py-1 rounded-md text-xs md:text-sm font-black animate-pulse shadow-lg">
                OFFERTA FLASH
              </span>
              <span className="text-white text-sm md:text-base font-black tracking-wide flex items-center gap-2">
                <span className="bg-white/20 px-2 py-0.5 rounded font-mono text-yellow-300">{formatTime(timeLeft)}</span>
                <span className="hidden md:inline">•</span>
                <span className="text-[11px] md:text-sm">Solo <span className="text-yellow-300 font-black">14 PEZZI</span> al 50% DI SCONTO!</span>
              </span>
            </div>

            {/* Flashing icon */}
            <div className="relative hidden md:block">
              <AlertTriangle size={20} className="text-yellow-300 animate-[ping_1s_ease-in-out_infinite]" />
              <AlertTriangle size={20} className="text-yellow-300 absolute inset-0" />
            </div>
          </div>
        </div>

        {/* Bottom border glow */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 shadow-[0_0_20px_rgba(251,191,36,0.8)]"></div>
      </div>

      {/* Hero Section - Light & Visible */}
      <header className="px-4 pt-24 pb-12 md:pt-28 md:pb-16 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Top badge */}
            <div className="mb-4 md:mb-6">
              <span className="bg-blue-100 border border-blue-300 text-blue-700 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest">
                🔬 Integratore Clinicamente Testato
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight uppercase tracking-tight text-gray-900">
              Spegni la Fame.<br/>
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">Brucia il Grasso.</span>
            </h1>

            <p className="text-gray-600 text-sm md:text-lg max-w-2xl mb-6 md:mb-8 font-medium">
              L'integratore italiano a base di Complex 400mg che resetta i tuoi segnali di sazietà in soli 18 minuti.
            </p>

            {/* Product + Price HERO Section */}
            <div className="relative w-full max-w-md mx-auto mb-8 md:mb-10">
              {/* Animated background glow */}
              <div className="absolute inset-0 -m-8">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-500/30 via-emerald-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-2xl animate-[spin_8s_linear_infinite]"></div>
              </div>

              {/* Product Card with Glass Effect */}
              <div className="relative bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/50 shadow-2xl shadow-blue-500/10">
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/40 to-transparent rotate-12 transform-gpu"></div>
                </div>

                {/* Badge ribbon */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider shadow-lg shadow-red-500/30 animate-bounce">
                    🔥 -50% Solo Oggi
                  </div>
                </div>

                {/* Product Image with glow */}
                <div className="relative pt-4 pb-6 flex justify-center">
                  <div className="relative">
                    {/* Inner glow behind product */}
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-400/30 to-blue-400/30 blur-2xl scale-110 rounded-full"></div>
                    <img
                      src="/images/zempbio/Mockup.png"
                      alt="ZEMPBIO Complex 400mg"
                      className="relative w-44 md:w-56 lg:w-64 mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500 animate-[float_3s_ease-in-out_infinite]"
                    />
                  </div>
                </div>

                {/* Divider with gradient */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-5"></div>

                {/* Price Section */}
                <div className="text-center relative z-10">
                  <p className="text-[10px] md:text-xs text-emerald-600 font-bold uppercase tracking-[0.2em] mb-3">Offerta Lancio Esclusiva</p>

                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="relative">
                      <span className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">€39<span className="text-3xl md:text-4xl">,99</span></span>
                      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-lg text-gray-400 line-through decoration-red-500 decoration-2">€79,99</span>
                      <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">RISPARMI €40</span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-xs md:text-sm font-medium">30 compresse • Trattamento 15 giorni</p>

                  {/* Stock indicator */}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <div className="flex -space-x-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <span className="text-[10px] md:text-xs text-red-600 font-bold uppercase">Solo 14 pezzi disponibili</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a href="#order" className="w-full max-w-sm bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white py-4 md:py-5 rounded-xl font-bold text-base md:text-lg uppercase shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2 mb-4">
              Ordina Ora - Spedizione Gratis <ArrowRight size={20} />
            </a>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-wide">
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-500" /> Notificato Min. Salute</span>
              <span className="flex items-center gap-1.5"><Truck size={14} className="text-blue-500" /> Consegna 24/48h</span>
              <span className="flex items-center gap-1.5"><Award size={14} className="text-amber-500" /> Made in EU</span>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Sticky Navbar */}
      <Navbar />

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

      {/* Main Narrative Reviews (Before/After) - MOVED HERE */}
      <section id="reviews" className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-100 via-white to-gray-50 relative overflow-hidden">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide mb-4">
            <Star size={14} className="fill-emerald-600" /> Risultati Verificati
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-12 uppercase bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Storie di Trasformazione Reale</h2>
          <div className="space-y-12">
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
               <div key={idx} className="bg-white p-6 md:p-10 rounded-2xl border border-gray-200 shadow-lg flex flex-col md:flex-row gap-8 items-center text-left">
                 <div className="w-full md:w-1/3 shrink-0">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="relative">
                        <div className="aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden border-2 border-gray-300 shadow-lg relative">
                           <img src={review.photoBefore} alt={`${review.name} Prima`} className="w-full h-full object-cover" />
                           <div className="absolute bottom-2 left-2 bg-red-500 text-white text-[9px] font-bold uppercase px-3 py-1.5 rounded-lg shadow-lg">Prima</div>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-lg">
                           <img src={review.photoAfter} alt={`${review.name} Dopo`} className="w-full h-full object-cover" />
                           <div className="absolute bottom-2 left-2 bg-emerald-500 text-white text-[9px] font-bold uppercase px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
                             <CheckCircle2 size={10} /> Dopo
                           </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-xl text-gray-900 leading-none">{review.name}</p>
                      <p className="text-xs text-blue-600 font-bold uppercase tracking-wide mt-1 flex items-center gap-2">
                        <span className="bg-blue-100 px-2 py-0.5 rounded">{review.age}</span>
                        <span className="text-emerald-600">Cliente Verificato</span>
                      </p>
                    </div>
                 </div>
                 <div className="flex-grow">
                   <div className="flex items-center justify-between mb-4">
                     <div className="flex gap-1">
                       {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />)}
                     </div>
                     <span className="text-sm text-gray-400 font-medium">{review.date}</span>
                   </div>
                   <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium italic">"{review.text}"</p>
                   <div className="mt-6 flex items-center gap-3 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs uppercase px-4 py-3 rounded-xl inline-flex">
                     <CheckCircle2 size={16}/> Acquisto Confermato
                   </div>
                 </div>
               </div>
             ))}
          </div>
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
                  <img src="/images/zempbio/Mockup.png" alt="ZEMPBIO Complex 400mg" className="w-48 md:w-56 mx-auto drop-shadow-lg" />
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
                    <span className="font-semibold text-slate-800">15 giorni <span className="text-emerald-600 text-xs">(primi risultati)</span></span>
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
            <div className="relative overflow-hidden">
              {/* Scroll container */}
              <div className="overflow-x-auto pb-4 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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
      <section id="order" className="py-12 md:py-24 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Animated Background effects */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-full blur-3xl animate-[spin_20s_linear_infinite]"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-4">
               <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Completa il tuo ordine</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-black uppercase mb-3 text-white">Ordina Ora</h2>
             <p className="text-gray-400 text-sm md:text-lg font-medium">Attiva il tuo protocollo Complex oggi stesso</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
            {/* Order Summary - Premium Style */}
            <div className="relative">
               {/* Glow effect */}
               <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>

               <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                  {/* Header with gradient */}
                  <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4">
                     <div className="flex items-center justify-between">
                        <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">Riepilogo Ordine</h3>
                        <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">-50%</span>
                     </div>
                  </div>

                  {/* Product Info with image glow */}
                  <div className="p-5 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
                     <div className="flex gap-4">
                        <div className="relative">
                           <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-blue-400/30 rounded-xl blur-md"></div>
                           <img
                              src="/images/zempbio/Mockup.png"
                              alt="ZEMPBIO Complex"
                              className="relative w-20 h-20 md:w-24 md:h-24 object-contain rounded-xl border border-gray-200 bg-white p-2"
                           />
                        </div>
                        <div className="flex-1">
                           <p className="font-bold text-gray-900 text-base md:text-lg">ZEMPBIO™ Complex 400mg</p>
                           <p className="text-gray-500 text-xs mt-1">30 Compresse • Trattamento 15 Giorni</p>
                           <div className="flex items-center gap-2 mt-2">
                              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">✓ Disponibile</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="p-5 space-y-3 border-b border-gray-100 text-sm">
                     <div className="flex justify-between items-center">
                        <span className="text-gray-600">Prezzo di listino:</span>
                        <span className="text-gray-400 line-through">€79,99</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-gray-600">Sconto (50%):</span>
                        <span className="text-red-600 font-bold">-€40,00</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-gray-600">Spedizione:</span>
                        <span className="text-emerald-600 font-bold">GRATIS</span>
                     </div>
                  </div>

                  {/* Total - Highlighted */}
                  <div className="p-5 bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-emerald-100">
                     <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Totale:</span>
                        <div className="text-right">
                           <span className="text-3xl md:text-4xl font-black text-emerald-600">€39,99</span>
                        </div>
                     </div>
                     <div className="mt-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-center py-2 rounded-lg text-xs font-bold uppercase">
                        🔥 Risparmi €40,00 Oggi! 🔥
                     </div>
                  </div>

                  {/* Delivery Info - Compact Icons */}
                  <div className="p-5 grid grid-cols-3 gap-3">
                     <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <Truck size={20} className="text-blue-600 mx-auto mb-1" />
                        <p className="text-gray-900 text-[10px] font-bold">24/48h</p>
                        <p className="text-gray-500 text-[9px]">Gratis</p>
                     </div>
                     <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <ShieldCheck size={20} className="text-emerald-600 mx-auto mb-1" />
                        <p className="text-gray-900 text-[10px] font-bold">Contrassegno</p>
                        <p className="text-gray-500 text-[9px]">Alla consegna</p>
                     </div>
                     <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <Award size={20} className="text-amber-600 mx-auto mb-1" />
                        <p className="text-gray-900 text-[10px] font-bold">60 Giorni</p>
                        <p className="text-gray-500 text-[9px]">Garanzia</p>
                     </div>
                  </div>

                  {/* Stock Alert - More dramatic */}
                  <div className="px-5 pb-5">
                     <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-3 flex items-center justify-center gap-2 animate-pulse">
                        <AlertTriangle size={16} className="text-yellow-300" />
                        <p className="text-white text-xs font-bold uppercase">Solo 14 pezzi rimasti!</p>
                        <AlertTriangle size={16} className="text-yellow-300" />
                     </div>
                  </div>
               </div>
            </div>

            {/* Direct Order Form */}
            <div className="bg-white text-gray-900 p-5 md:p-12 rounded-2xl shadow-xl relative">
<div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6 border-b border-gray-200 pb-5 md:pb-6">
                 <div className="bg-blue-600 text-white p-3 md:p-4 rounded-xl shadow-md"><Phone size={24} className="md:w-7 md:h-7"/></div>
                 <div>
                    <h3 className="text-xl md:text-3xl font-bold uppercase leading-none">Modulo Ordine Rapido</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-wide">Compila per ricevere il prodotto</p>
                 </div>
              </div>

              {/* Phone warning banner */}
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-red-500 text-white p-2 rounded-lg shrink-0"><Phone size={18} /></div>
                  <div>
                    <p className="font-bold text-red-700 text-sm uppercase mb-1">Importante: Rispondi al Telefono!</p>
                    <p className="text-red-600 text-xs">Un nostro consulente ti chiamerà per confermare l'ordine e la corretta somministrazione. <strong>Se non rispondi, la spedizione NON partirà</strong> (pagamento in contrassegno).</p>
                  </div>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleOrderSubmit}>
                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Nome e Cognome</label>
                   <input
                     type="text"
                     placeholder="Es. Maria Rossi"
                     className="w-full border border-gray-300 p-4 rounded-lg bg-gray-50 font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                     required
                     value={orderForm.nome}
                     onChange={(e) => setOrderForm({...orderForm, nome: e.target.value})}
                   />
                </div>

                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Telefono Cellulare</label>
                   <div className="relative">
                     <input
                       type="tel"
                       inputMode="numeric"
                       placeholder="3331234567"
                       maxLength={13}
                       className={`w-full border p-4 rounded-lg bg-gray-50 font-bold outline-none transition-all ${
                         orderForm.telefono.length > 0
                           ? isValidItalianPhone(orderForm.telefono)
                             ? 'border-emerald-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                             : 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                           : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                       }`}
                       required
                       value={orderForm.telefono}
                       onChange={(e) => {
                         const numericOnly = e.target.value.replace(/\D/g, '');
                         setOrderForm({...orderForm, telefono: numericOnly});
                       }}
                     />
                     {orderForm.telefono.length > 0 && !isValidItalianPhone(orderForm.telefono) && (
                       <p className="text-[10px] text-red-500 mt-1 ml-1">Inserisci un numero italiano valido (10 cifre, es. 3331234567)</p>
                     )}
                     {orderForm.telefono.length > 0 && isValidItalianPhone(orderForm.telefono) && (
                       <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">
                         <CheckCircle2 size={20} />
                       </div>
                     )}
                   </div>
                </div>

                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Indirizzo Completo (Via, Civico, CAP, Città)</label>
                   <input
                     type="text"
                     placeholder="Es. Via Roma 10, 20100 Milano"
                     className="w-full border border-gray-300 p-4 rounded-lg bg-gray-50 font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                     required
                     value={orderForm.indirizzo}
                     onChange={(e) => setOrderForm({...orderForm, indirizzo: e.target.value})}
                   />
                </div>

                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 flex items-center gap-4">
                   <div className="bg-emerald-600 text-white p-2 rounded-lg"><CheckCircle2 size={18} /></div>
                   <p className="text-xs font-bold text-emerald-800 uppercase">Pagamento sicuro alla consegna (Contanti)</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className={`w-full py-6 rounded-xl font-bold text-xl md:text-2xl uppercase shadow-lg transition-all flex items-center justify-center gap-4 ${
                    isFormValid
                      ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } ${isSubmitting ? 'bg-blue-400' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={24} className="animate-spin" /> INVIO IN CORSO...
                    </>
                  ) : !isFormValid ? (
                    <>
                      <Lock size={20} /> COMPLETA I CAMPI RICHIESTI
                    </>
                  ) : (
                    <>
                      CONFERMA ORDINE <ArrowRight size={24}/>
                    </>
                  )}
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

      {/* Sticky Mobile CTA - Premium */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
         {/* Glow effect */}
         <div className="absolute inset-x-0 -top-4 h-8 bg-gradient-to-t from-white to-transparent"></div>

         <div className="relative bg-white border-t-2 border-emerald-500 shadow-[0_-10px_40px_rgba(0,0,0,0.15)]">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500"></div>

            <div className="p-4 flex items-center gap-4">
               {/* Price section */}
               <div className="flex-shrink-0">
                  <div className="flex items-baseline gap-1">
                     <span className="text-3xl font-black text-gray-900">€39</span>
                     <span className="text-lg font-bold text-gray-900">,99</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-xs text-gray-400 line-through">€79,99</span>
                     <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">-50%</span>
                  </div>
               </div>

               {/* CTA Button - Animated */}
               <a href="#order" className="flex-grow relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <div className="relative px-6 py-4 text-center">
                     <span className="text-white font-black text-base uppercase tracking-wide flex items-center justify-center gap-2">
                        Ordina Ora <ArrowRight size={18} className="animate-[bounceX_1s_ease-in-out_infinite]" />
                     </span>
                  </div>
               </a>
            </div>
         </div>
      </div>
      </div>{/* End Mobile Version */}
    </div>
  );
};

export default App;
