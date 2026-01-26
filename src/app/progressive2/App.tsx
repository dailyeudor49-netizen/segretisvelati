import React, { useState, FormEvent } from 'react';
import { 
  Check, 
  Truck, 
  ShieldCheck, 
  Phone, 
  Info, 
  ShoppingBag,
  Star,
  ChevronDown,
  ChevronUp,
  Glasses,
  Eye,
  CreditCard,
  Smartphone,
  BookOpen,
  Car,
  Feather,
  Zap,
  RefreshCw,
  X,
  CheckCircle // Importato direttamente da lucide-react
} from 'lucide-react';

// --- Tracking Mock ---
const trackEvent = (name: string, payload: Record<string, any>) => {
  console.log(`[TRACKING] ${name}`, payload);
};

export default function App() {
  // --- State ---
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  // --- Form Data ---
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    diopter: '',
    payment: 'contanti'
  });

  // --- Handlers ---
  const scrollToOrder = () => {
    const section = document.getElementById('acquista');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      trackEvent("cta_click", { position: "scroll_to_order" });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    setTimeout(() => {
      setFormStatus('success');
      trackEvent("order_submitted", { 
        value: 34.99, 
        currency: "EUR", 
        items: "2x Progressivi Ready" 
      });
    }, 1500);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="font-sans text-slate-600 antialiased bg-slate-50 pb-24 md:pb-0">
      
      {/* --- HEADER --- */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-optical-600 text-white p-1.5 rounded-lg shadow-sm">
              <Glasses size={22} />
            </div>
            <div>
              <div className="font-bold text-lg text-slate-900 leading-none tracking-tight">OtticaVisione</div>
              <div className="text-[10px] text-optical-600 font-semibold tracking-wider uppercase mt-0.5">Tecnologia Easy-Focus</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-500">
              <ShieldCheck size={16} className="text-green-600"/>
              <span>Garanzia 14gg</span>
            </div>
            <button 
              onClick={scrollToOrder}
              className="hidden md:block bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-2.5 rounded-full text-sm transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Ordina Online
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* --- 1) HERO SECTION --- */}
        <section className="relative overflow-hidden bg-white pt-12 pb-16 lg:pt-20 lg:pb-24">
           {/* Decor */}
           <div className="absolute top-0 right-0 w-1/3 h-full bg-optical-50 skew-x-12 translate-x-1/2"></div>
           
          <div className="relative max-w-7xl mx-auto px-4 z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Copy Side */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-optical-50 border border-optical-100 text-optical-700 text-xs font-bold uppercase tracking-wide mb-6 shadow-sm">
                  <Star size={12} fill="currentColor" className="text-yellow-400" />
                  Nuova Tecnologia Lenti 2024
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                  Smetti di cambiare <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-optical-600 to-optical-800">occhiali di continuo.</span>
                </h1>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  La soluzione definitiva per chi vuole vedere bene il <strong>telefono</strong>, il <strong>computer</strong> e l'<strong>ambiente circostante</strong> con un solo paio di occhiali eleganti.
                </p>

                {/* Price & CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8">
                  <button 
                    onClick={scrollToOrder}
                    className="w-full sm:w-auto bg-optical-600 hover:bg-optical-500 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    Offerta 2x1 a 34,99€ <ChevronDown size={18} />
                  </button>
                  <div className="text-left text-xs font-medium text-slate-500 px-4">
                     <p className="flex items-center gap-1.5 mb-1"><Check size={14} className="text-green-500"/> Pagamento alla consegna</p>
                     <p className="flex items-center gap-1.5"><Check size={14} className="text-green-500"/> Spedizione Gratuita</p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="pt-6 border-t border-slate-100 flex justify-center lg:justify-start gap-8 opacity-80">
                   <img src="https://placehold.co/100x40/ffffff/94a3b8?text=Certificato+CE" alt="CE" className="h-8 object-contain" />
                   <img src="https://placehold.co/100x40/ffffff/94a3b8?text=Design+Italy" alt="Design Italy" className="h-8 object-contain" />
                </div>
              </div>

              {/* Image Side */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                   <img 
                    src="https://placehold.co/800x800/e2e8f0/0f172a?text=Occhiali+Progressivi+Premium" 
                    alt="Uomo con occhiali progressivi" 
                    className="w-full h-auto object-cover"
                  />
                  {/* Floating Product Bubble */}
                  <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur p-4 rounded-2xl shadow-lg max-w-[240px] border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full text-green-600">
                        <Check size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">Visione Nitida</p>
                        <p className="text-[10px] text-slate-500 leading-tight">Messa a fuoco automatica da 30cm a 2 metri.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- HERO BULLET POINTS --- */}
        <section className="py-10 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { icon: <Eye size={24} />, title: "Visione Nitida", desc: "Da 30cm a 2 metri" },
                { icon: <Feather size={24} />, title: "Ultra Leggeri", desc: "Solo 18 grammi" },
                { icon: <ShieldCheck size={24} />, title: "Filtro Luce Blu", desc: "Protegge gli occhi" },
                { icon: <Truck size={24} />, title: "Spedizione Gratis", desc: "Consegna in 48h" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-optical-600 mb-2">{item.icon}</div>
                  <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 2) COMPARISON (Trust/Education) --- */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
               <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Perché passare ai nostri Progressivi?</h2>
               <p className="text-slate-500 mt-2">Confronta la differenza con i classici occhiali da lettura.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="grid grid-cols-3 bg-slate-100 p-4 border-b border-slate-200 text-sm font-bold text-slate-700">
                  <div className="col-span-1">Caratteristica</div>
                  <div className="col-span-1 text-center text-slate-400">Occhiali Lettura</div>
                  <div className="col-span-1 text-center text-optical-700">OtticaVisione Progressivi</div>
               </div>
               
               {[
                 { label: "Visione Smartphone (30cm)", old: true, new: true },
                 { label: "Visione Computer (60cm)", old: false, new: true },
                 { label: "Visione Interlocutore (1m+)", old: false, new: true },
                 { label: "Non serve toglierli", old: false, new: true },
                 { label: "Protezione Luce Blu", old: false, new: true },
               ].map((row, idx) => (
                 <div key={idx} className="grid grid-cols-3 p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition items-center">
                    <div className="font-medium text-slate-700 text-sm">{row.label}</div>
                    <div className="flex justify-center">
                       {row.old ? <Check className="text-green-500" size={20}/> : <X className="text-red-300" size={20}/>}
                    </div>
                    <div className="flex justify-center">
                       <div className="bg-optical-50 text-optical-700 p-1 rounded-full">
                         <Check size={20} strokeWidth={3} />
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* --- NUOVA SEZIONE: 6 BULLET POINTS --- */}
        <section className="py-16 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">
              Perché 15.000+ clienti ci hanno scelto?
            </h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                { title: "Visione nitida a tutte le distanze", desc: "Basta togliere e mettere gli occhiali per guardare TV e smartphone. Una sola lente per tutto." },
                { title: "Tecnologia Soft-Focus", desc: "Passaggio graduale tra vicino e lontano senza 'salti' fastidiosi o vertigini." },
                { title: "Massima leggerezza (18g)", desc: "Montatura talmente leggera che dimenticherai di averla addosso. Nessun segno sul naso." },
                { title: "Montatura Indistruttibile", desc: "Realizzati in policarbonato con aste flessibili, resistono a cadute e torsioni." },
                { title: "Filtro Luce Blu incluso", desc: "Proteggi i tuoi occhi dall'affaticamento causato da schermi, LED e luci artificiali." },
                { title: "Doppia Convenienza 2x1", desc: "Ricevi 2 paia completi (Nero Classico + Tartarugato Elegante) al prezzo di uno." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1 bg-green-100 text-green-600 rounded-full p-1 shrink-0">
                    <Check size={16} strokeWidth={3} />
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                    <strong className="text-slate-900 font-bold block mb-1">{item.title}</strong>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 3) BENEFITS GRID (Visual Upgrade) --- */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
             <div className="text-center max-w-2xl mx-auto mb-16">
               <span className="text-optical-600 font-bold uppercase tracking-wider text-sm">Dettagli di Qualità</span>
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">Molto più di un semplice occhiale</h2>
               <p className="text-slate-500">
                 Progettati in Italia per unire l'estetica di una montatura di design alla funzionalità di una lente tecnica avanzata.
               </p>
             </div>

             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl p-8 transition hover:-translate-y-1 hover:shadow-lg border border-slate-100">
                   <div className="w-14 h-14 bg-optical-50 rounded-xl shadow-sm text-optical-600 flex items-center justify-center mb-6">
                      <Smartphone size={28} />
                   </div>
                   <h3 className="font-bold text-xl text-slate-900 mb-3">Focus Digitale</h3>
                   <p className="text-slate-500 leading-relaxed">
                     Leggere messaggi o notifiche non è mai stato così facile. La parte bassa della lente è ottimizzata per schermi piccoli.
                   </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl p-8 transition hover:-translate-y-1 hover:shadow-lg border border-slate-100">
                   <div className="w-14 h-14 bg-optical-50 rounded-xl shadow-sm text-optical-600 flex items-center justify-center mb-6">
                      <BookOpen size={28} />
                   </div>
                   <h3 className="font-bold text-xl text-slate-900 mb-3">Lettura Rilassata</h3>
                   <p className="text-slate-500 leading-relaxed">
                     Ideali per libri e menù. Niente più braccia allungate per trovare la distanza giusta. Ritrova il piacere di leggere.
                   </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-2xl p-8 transition hover:-translate-y-1 hover:shadow-lg border border-slate-100">
                   <div className="w-14 h-14 bg-optical-50 rounded-xl shadow-sm text-optical-600 flex items-center justify-center mb-6">
                      <RefreshCw size={28} />
                   </div>
                   <h3 className="font-bold text-xl text-slate-900 mb-3">Stop al "Metti e Togli"</h3>
                   <p className="text-slate-500 leading-relaxed">
                     Puoi tenerli indossati anche mentre cammini, cucini o parli con qualcuno. La parte alta neutra non distorce la visione.
                   </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-2xl p-8 transition hover:-translate-y-1 hover:shadow-lg border border-slate-100">
                   <div className="w-14 h-14 bg-optical-50 rounded-xl shadow-sm text-optical-600 flex items-center justify-center mb-6">
                      <Feather size={28} />
                   </div>
                   <h3 className="font-bold text-xl text-slate-900 mb-3">Ultra Leggeri (18g)</h3>
                   <p className="text-slate-500 leading-relaxed">
                     Dimenticherai di averli addosso. Montatura in policarbonato flessibile che non lascia segni sul naso.
                   </p>
                </div>

                {/* Card 5 */}
                <div className="bg-white rounded-2xl p-8 transition hover:-translate-y-1 hover:shadow-lg border border-slate-100">
                   <div className="w-14 h-14 bg-optical-50 rounded-xl shadow-sm text-optical-600 flex items-center justify-center mb-6">
                      <Zap size={28} />
                   </div>
                   <h3 className="font-bold text-xl text-slate-900 mb-3">Adattamento Immediato</h3>
                   <p className="text-slate-500 leading-relaxed">
                     Grazie alla progressione "Soft-Focus", l'occhio si abitua in pochi minuti, senza vertigini o fastidi.
                   </p>
                </div>

                {/* Card 6 */}
                <div className="bg-white rounded-2xl p-8 transition hover:-translate-y-1 hover:shadow-lg border border-slate-100">
                   <div className="w-14 h-14 bg-optical-50 rounded-xl shadow-sm text-optical-600 flex items-center justify-center mb-6">
                      <Truck size={28} />
                   </div>
                   <h3 className="font-bold text-xl text-slate-900 mb-3">Scorta Inclusa</h3>
                   <p className="text-slate-500 leading-relaxed">
                     L'offerta 2x1 ti permette di avere un paio in casa e uno in auto o in ufficio. Mai più senza occhiali.
                   </p>
                </div>
             </div>
          </div>
        </section>

        {/* --- 4) ADAPTATION GUIDE (New Convincing Section) --- */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
           {/* Background Pattern */}
           <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
           
           <div className="max-w-6xl mx-auto px-4 relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div>
                    <h2 className="text-3xl font-bold mb-6">Paura di non abituarti? <br/><span className="text-optical-500">È un mito del passato.</span></h2>
                    <p className="text-slate-300 text-lg mb-8">
                       I vecchi progressivi avevano zone di distorsione laterale molto ampie che causavano vertigini. 
                       La nostra tecnologia <strong>Easy-Focus 2024</strong> ha ampliato il corridoio visivo del 40%.
                    </p>
                    <div className="space-y-6">
                       <div className="flex gap-4">
                          <div className="font-bold text-2xl text-optical-500">01</div>
                          <div>
                             <h4 className="font-bold text-lg">Indossali al mattino</h4>
                             <p className="text-slate-400 text-sm">L'occhio si adatta meglio a "mente fresca".</p>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <div className="font-bold text-2xl text-optical-500">02</div>
                          <div>
                             <h4 className="font-bold text-lg">Muovi leggermente la testa</h4>
                             <p className="text-slate-400 text-sm">Punta il naso verso ciò che vuoi guardare.</p>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <div className="font-bold text-2xl text-optical-500">03</div>
                          <div>
                             <h4 className="font-bold text-lg">Dimenticati di averli</h4>
                             <p className="text-slate-400 text-sm">In 20 minuti il cervello automatizza il processo.</p>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="relative">
                    <img 
                      src="https://placehold.co/600x600/1e293b/94a3b8?text=Tecnologia+Easy+Focus" 
                      alt="Schema Lente Progressiva" 
                      className="rounded-xl shadow-2xl border border-slate-700"
                    />
                    <div className="absolute -bottom-5 -left-5 bg-white text-slate-900 p-4 rounded-lg shadow-lg">
                       <p className="font-bold flex items-center gap-2"><CheckCircle size={18} className="text-green-600"/> 98% Successo</p>
                       <p className="text-xs text-slate-500">Tasso di adattamento clienti</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- 5) SOCIAL PROOF (Reviews) --- */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-slate-900 mb-12">Dicono di noi</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Marco V.", role: "Architetto", text: "Ero scettico sul prezzo, ma sono migliori di quelli pagati 200€ in negozio. Al PC sono fantastici." },
                { name: "Luisa M.", role: "Insegnante", text: "Finalmente non devo più tenere gli occhiali sulla punta del naso! Li indosso tutto il giorno." },
                { name: "Giuseppe R.", role: "Pensionato", text: "La comodità di averne due paia è impagabile. Uno in salotto e uno in macchina. Spedizione velocissima." }
              ].map((rev, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <div className="flex gap-1 mb-3 text-yellow-400">
                     {[1,2,3,4,5].map(n => <Star key={n} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-600 italic mb-4 text-sm">"{rev.text}"</p>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-optical-200 rounded-full flex items-center justify-center text-optical-700 font-bold text-xs">
                        {rev.name.charAt(0)}
                     </div>
                     <div>
                        <p className="font-bold text-sm text-slate-900">{rev.name}</p>
                        <p className="text-xs text-slate-500">{rev.role}</p>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 6) FAQ --- */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-slate-900 mb-10">Domande Frequenti</h2>
            <div className="space-y-3">
              {[
                { q: "Come scelgo la gradazione corretta?", a: "Seleziona la stessa diottria che utilizzi per i tuoi occhiali da lettura semplici (+1.00 a +4.00). La parte superiore della lente è calibrata automaticamente per la visione intermedia e ambientale." },
                { q: "Posso guidare con questi occhiali?", a: "Questi occhiali sono ottimizzati per l'ambiente domestico, l'ufficio e le attività dinamiche (spesa, passeggio). Per la guida notturna prolungata consigliamo occhiali specifici da prescrizione, anche se molti clienti li usano per brevi tratti grazie alla zona alta neutra." },
                { q: "Cosa succede se non mi trovo bene?", a: "Offriamo una garanzia 'Soddisfatti o Rimborsati' di 14 giorni. Puoi restituirli e ricevere il rimborso completo. Nessun rischio." },
                { q: "Il pacchetto include due montature diverse?", a: "Sì, riceverai una montatura Nera Classica e una Tartarugata Elegante, entrambe con la stessa gradazione da te scelta." }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center p-5 text-left font-medium text-slate-800 hover:bg-slate-50 transition"
                  >
                    {faq.q}
                    {openFaq === idx ? <ChevronUp size={20} className="text-optical-600" /> : <ChevronDown size={20} className="text-slate-400" />}
                  </button>
                  {openFaq === idx && (
                    <div className="p-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 mt-2 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 7) ORDER SECTION (Checkout Style) --- */}
        <section id="acquista" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col lg:flex-row">
              
              {/* Product Summary Sidebar */}
              <div className="lg:w-5/12 bg-slate-900 text-white p-8 lg:p-12 relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-optical-900 opacity-50"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><ShoppingBag size={24}/> Il tuo ordine</h3>
                    
                    {/* Product Item */}
                    <div className="flex gap-4 items-start bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                       <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0">
                          <img src="https://placehold.co/100x100/ffffff/000000?text=2x+Occhiali" className="w-full h-full object-cover"/>
                       </div>
                       <div>
                         <p className="font-bold text-lg">Kit OtticaVisione™ 2x1</p>
                         <p className="text-slate-300 text-sm mb-2">2 Montature (Nero + Tartarugato)</p>
                         <div className="inline-block bg-green-500/20 text-green-300 text-xs font-bold px-2 py-0.5 rounded">DISPONIBILITÀ IMMEDIATA</div>
                       </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                       <div className="flex justify-between text-slate-400">
                         <span>Prezzo Listino</span>
                         <span className="line-through">79,90€</span>
                       </div>
                       <div className="flex justify-between text-slate-400">
                         <span>Spedizione Express</span>
                         <span className="text-green-400 font-medium">Gratis</span>
                       </div>
                       <div className="flex justify-between text-slate-400">
                         <span>Pagamento alla consegna</span>
                         <span className="text-green-400 font-medium">Gratis</span>
                       </div>
                       <div className="flex justify-between items-center pt-4 border-t border-white/10">
                         <span className="text-white font-bold text-lg">Totale da pagare</span>
                         <span className="text-4xl font-bold text-white">34,99€</span>
                       </div>
                    </div>
                  </div>

                  <div className="mt-8 text-xs text-slate-500 flex items-center justify-center gap-4">
                     <span className="flex items-center gap-1"><ShieldCheck size={14}/> Garanzia 14gg</span>
                     <span className="flex items-center gap-1"><Truck size={14}/> Corriere Espresso</span>
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="lg:w-7/12 p-8 lg:p-12 bg-white">
                {formStatus === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                      <Check size={48} />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Ordine Confermato!</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mb-8 text-lg">
                      Grazie {formData.name}. Un ottico sta verificando il tuo ordine. Riceverai una chiamata di conferma a breve.
                    </p>
                    <button onClick={() => window.location.reload()} className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-8 rounded-full transition">Torna al negozio</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold text-slate-900">Dati di Spedizione</h3>
                      <div className="flex gap-2">
                        <div className="w-10 h-6 bg-slate-100 rounded border border-slate-200"></div>
                        <div className="w-10 h-6 bg-slate-100 rounded border border-slate-200"></div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      {/* Diopter Selection (Featured) */}
                      <div className="md:col-span-2 bg-optical-50 p-6 rounded-xl border border-optical-100">
                         <label className="block text-sm font-bold text-optical-900 mb-3 flex items-center gap-2">
                           <Eye size={18}/> Seleziona la tua Gradazione
                         </label>
                         <div className="relative">
                           <select 
                             name="diopter" 
                             required 
                             className="w-full p-4 pl-4 bg-white border border-optical-200 rounded-lg focus:ring-2 focus:ring-optical-500 outline-none transition text-lg font-medium appearance-none cursor-pointer hover:border-optical-400"
                             onChange={handleInputChange}
                             value={formData.diopter}
                           >
                             <option value="">Seleziona diottria lettura...</option>
                             <option value="+1.00">+1.00 (Leggera)</option>
                             <option value="+1.50">+1.50</option>
                             <option value="+2.00">+2.00 (Media)</option>
                             <option value="+2.50">+2.50</option>
                             <option value="+3.00">+3.00 (Alta)</option>
                             <option value="+3.50">+3.50</option>
                             <option value="+4.00">+4.00</option>
                           </select>
                           <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-optical-400 pointer-events-none" size={20} />
                         </div>
                         <p className="text-xs text-optical-600 mt-2 ml-1">*Scegli la gradazione che usi normalmente per leggere il giornale.</p>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Nome e Cognome *</label>
                        <input type="text" name="name" required placeholder="Mario Rossi" onChange={handleInputChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-optical-500 outline-none transition"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Telefono Cellulare *</label>
                        <input type="tel" name="phone" required placeholder="333 1234567" onChange={handleInputChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-optical-500 outline-none transition"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Città *</label>
                        <input type="text" name="city" required placeholder="Milano" onChange={handleInputChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-optical-500 outline-none transition"/>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Indirizzo e Civico *</label>
                        <input type="text" name="address" required placeholder="Via Roma 10" onChange={handleInputChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-optical-500 outline-none transition"/>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl flex items-center gap-4 mb-8 border border-green-100 cursor-pointer hover:bg-green-100 transition">
                       <div className="w-6 h-6 rounded-full border-[6px] border-green-600 bg-white shadow-sm"></div>
                       <div>
                          <p className="font-bold text-slate-900 text-sm">Pagamento in contanti alla consegna</p>
                          <p className="text-xs text-slate-500">Paghi solo quando ricevi il pacco al corriere.</p>
                       </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 rounded-xl shadow-xl transition transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-2"
                    >
                      {formStatus === 'submitting' ? (
                        'Elaborazione in corso...'
                      ) : (
                        <>Conferma Ordine - 34,99€ <CheckCircle size={20} /></>
                      )}
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
                       <ShieldCheck size={14}/> I tuoi dati sono protetti e criptati SSL 256-bit
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 py-12 text-sm text-slate-500">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
           <div className="col-span-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-4 text-lg">
                 <Glasses size={20} className="text-optical-600"/> OtticaVisione
              </div>
              <p className="max-w-xs leading-relaxed mb-4">
                 La nostra missione è democratizzare il benessere visivo. 
                 Eliminiamo gli intermediari per offrirti lenti di qualità superiore al prezzo di fabbrica.
              </p>
           </div>
           <div>
              <h5 className="font-bold text-slate-900 mb-4">Cliente</h5>
              <ul className="space-y-2">
                 <li>Assistenza</li>
                 <li>Traccia Spedizione</li>
                 <li>Resi & Rimborsi</li>
              </ul>
           </div>
           <div>
              <h5 className="font-bold text-slate-900 mb-4">Informazioni</h5>
              <ul className="space-y-2">
                 <li>Privacy Policy</li>
                 <li>Termini di Servizio</li>
                 <li>Cookie Policy</li>
              </ul>
           </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 text-center text-xs opacity-60 border-t border-slate-100 pt-8">
           &copy; {new Date().getFullYear()} OtticaVisione. Tutti i diritti riservati. Questo prodotto è un occhiale premontato per presbiopia semplice (Device CE).
        </div>
      </footer>

      {/* --- MOBILE STICKY BAR --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 pb-6 flex gap-3 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <a href="#tel" className="flex-1 flex flex-col items-center justify-center gap-1 border border-slate-200 bg-white text-slate-600 rounded-xl font-bold text-xs">
          <Phone size={18} className="text-optical-600" /> Supporto
        </a>
        <button 
          onClick={scrollToOrder} 
          className="flex-[2] bg-slate-900 text-white font-bold rounded-xl py-3 text-sm shadow-lg flex items-center justify-center gap-2"
        >
          Ordina - 34,99€
        </button>
      </div>

    </div>
  );
}