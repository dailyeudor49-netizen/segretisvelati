"use client";

import React, { useState, useEffect } from 'react';
import {
  Star,
  Check,
  ShieldCheck,
  ArrowRight,
  Menu,
  X,
  Leaf,
  Zap,
  Activity,
  Award,
  Truck,
  Phone,
  Lock,
  RefreshCw,
  CheckCircle2,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

// Componente Principale
const ZempbioLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 23);
  const [orderForm, setOrderForm] = useState({ nome: '', telefono: '', indirizzo: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const scrollToOrder = () => {
    document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new URLSearchParams();
      formData.append('source_id', '9b16759a6289');
      formData.append('name', orderForm.nome);
      formData.append('phone', orderForm.telefono);
      formData.append('address', orderForm.indirizzo);
      await fetch('https://network.worldfilia.net/manager/inventory/buy/ntm_zempbio_1x39.json?api_key=xgM6LBE0CA4EwJ4NTNhPBQ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
        mode: 'no-cors'
      });
      window.location.href = `/zempbio/grazie?nome=${encodeURIComponent(orderForm.nome)}`;
    } catch {
      window.location.href = `/zempbio/grazie?nome=${encodeURIComponent(orderForm.nome)}`;
    }
  };

  // Reviews data for Trustpilot section
  const trustpilotReviews = [
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
  ];

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen flex flex-col">

      {/* HEADER */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm py-3 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-black text-red-600 tracking-tighter">ZEMPBIO</span>
          </div>

          <div className="hidden md:flex gap-6 font-medium text-xs uppercase tracking-wide text-gray-600">
            <a href="#benefici" className="hover:text-red-600 transition">Benefici</a>
            <a href="#ingredienti" className="hover:text-red-600 transition">Ingredienti</a>
            <a href="#recensioni" className="hover:text-red-600 transition">Recensioni</a>
          </div>

          <button onClick={scrollToOrder} className="hidden md:block bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-emerald-700 transition">
            Ordina Ora
          </button>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-3 flex flex-col items-center gap-3 border-t border-gray-100 text-sm">
            <a href="#benefici" onClick={() => setIsMenuOpen(false)}>Benefici</a>
            <a href="#ingredienti" onClick={() => setIsMenuOpen(false)}>Ingredienti</a>
            <a href="#recensioni" onClick={() => setIsMenuOpen(false)}>Recensioni</a>
            <button onClick={() => {scrollToOrder(); setIsMenuOpen(false);}} className="text-emerald-600 font-bold">Ordina Ora</button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <header className="relative bg-gray-900 text-white py-12 md:py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Background fitness"
            className="w-full h-full object-cover"
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

        <div className="relative max-w-4xl mx-auto text-center md:text-left md:flex items-center gap-8">
          <div className="flex-1">
            <div className="inline-block bg-red-600 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full mb-3 uppercase tracking-wider">
              Novità in Italia
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 font-serif">
              ZEMPBIO: Il Segreto degli Attori per Perdere <span className="text-red-500">15-20kg</span> in 10-14 Giorni
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-300 mb-6 leading-relaxed">
              La formula naturale usata dalle star di Hollywood per bruciare grasso rapidamente, mantenendo energia e forma perfetta.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button onClick={scrollToOrder} className="bg-emerald-600 hover:bg-emerald-700 text-white text-base md:text-lg font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2">
                Inizia la Trasformazione <ArrowRight size={18}/>
              </button>
              <div className="flex items-center justify-center gap-2 text-base text-gray-300">
                <ShieldCheck className="text-green-500" size={20}/> Garanzia 100% Soddisfatti
              </div>
            </div>
          </div>

          {/* Product Image Mockup - Desktop */}
          <div className="hidden md:block w-1/4">
             <img src="/images/zempbio/Mockup.png" alt="Zempbio Bottle" className="rounded-lg" />
          </div>
        </div>

      </header>

      {/* PRODUCT SHOWCASE + BENEFITS */}
      <section className="py-10 md:py-16 px-4 bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Product Mockup con Prezzo */}
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src="/images/zempbio/Mockup.png"
                  alt="Zempbio Confezione"
                  className="relative z-10 rounded-lg max-w-[220px] md:max-w-[280px] mx-auto"
                />
                {/* Badge Sconto */}
                <div className="absolute -top-2 -right-2 bg-red-600 text-white font-black text-sm md:text-lg px-3 py-1.5 rounded-full z-20">
                  -60%
                </div>
              </div>

              {/* Prezzo */}
              <div className="mt-6 bg-white rounded-xl p-4 md:p-5 max-w-[280px] mx-auto">
                <p className="text-red-500 text-base line-through">€99,99</p>
                <p className="text-4xl md:text-5xl font-black text-emerald-600">€39,99</p>
                <p className="text-xs md:text-sm text-gray-600 mt-1 font-medium">Spedizione GRATUITA</p>
                <button
                  onClick={scrollToOrder}
                  className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Ordina Ora
                </button>
              </div>
            </div>

            {/* 7 Benefici Chiave */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 font-serif">
                I <span className="text-red-600">7 Benefici Chiave</span> che Otterrai
              </h2>
              <div className="space-y-3 md:space-y-4">
                {[
                  "<strong>Brucia grassi 24/7</strong> – accelera il metabolismo anche mentre dormi",
                  "<strong>Drena liquidi in eccesso</strong> – elimina gonfiori su pancia, fianchi e gambe",
                  "<strong>Mangia senza rinunce</strong> – blocca la fame nervosa e l'assorbimento dei grassi",
                  "<strong>Energia esplosiva</strong> – vitalità costante durante tutta la giornata",
                  "<strong>Risultati visibili in 7 giorni</strong> – primi cambiamenti già dalla prima settimana",
                  "<strong>100% naturale e sicuro</strong> – senza effetti collaterali, adatto a tutti",
                  "<strong>Effetto anti-age bonus</strong> – pelle più luminosa e vitalità giovanile"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={16} className="text-white" />
                    </div>
                    <p className="text-gray-700 text-base md:text-lg" dangerouslySetInnerHTML={{ __html: benefit }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Reviews Carousel */}
      <section className="py-10 md:py-14 px-2 md:px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full mb-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span className="font-bold text-sm uppercase">Feedback WhatsApp</span>
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-gray-900">Messaggi Reali dai Nostri Clienti</h4>
            <p className="text-gray-500 text-base mt-2">Screenshot delle conversazioni WhatsApp con clienti soddisfatti</p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="flex gap-3 px-2" style={{ width: 'max-content' }}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="flex-shrink-0 w-[85vw] max-w-[360px] md:w-[350px]">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                      <div className="bg-green-600 text-white px-4 py-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        <span className="text-sm font-bold">Conversazione WhatsApp</span>
                      </div>
                      <img
                        src={`/images/zempbio/Testo del paragrafo/${num}.jpg`}
                        alt={`Recensione WhatsApp ${num}`}
                        className="w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-4">← Scorri per vedere altre recensioni →</p>
        </div>
      </section>

      {/* INTRO NARRATIVE */}
      <section className="py-10 md:py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed text-gray-700 space-y-5">
          <p>
            <span className="font-bold text-gray-900 text-lg md:text-xl">Come fanno gli attori a passare da ruoli impegnativi a fisici scolpiti in poche settimane?</span> Non è solo dieta estrema. È <strong>Zempbio</strong>, la formula naturale che <strong>accelera il metabolismo</strong>, <strong>drena i liquidi</strong> e <strong>controlla la fame</strong>.
          </p>
          <blockquote className="border-l-4 border-red-500 pl-4 italic text-gray-600 bg-gray-50 py-3 rounded-r-lg text-base md:text-lg">
            &quot;Ho perso 18kg in 12 giorni tra due produzioni, mantenendo energia per le riprese.&quot; – Attore Hollywoodiano
          </blockquote>
          <p>
            <strong>Il peso in eccesso</strong> ti appesantisce, le <strong>diete fallite</strong>, l&apos;imbarazzo allo specchio. <strong>Zempbio</strong> è la soluzione usata dalle élite per <strong>risultati rapidi e duraturi</strong>.
          </p>
        </div>
      </section>

      {/* DETAILED DESCRIPTION - LIGHT GRAY BG */}
      <section className="py-10 md:py-14 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 font-serif">Zempbio: Il Prodotto Rivoluzionario</h2>
            <div className="w-16 h-1 bg-red-600 mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start mb-8">
            <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
              <p>
                <strong>Zempbio</strong> è un integratore naturale progettato per <strong>risultati concreti</strong>. Agisce su più fronti: <strong>stimola il metabolismo</strong>, <strong>drena i liquidi</strong>, <strong>riduce la fame nervosa</strong>. I primi risultati arrivano <strong>già dopo pochi giorni</strong>.
              </p>
              <p>
                A differenza dei prodotti generici, Zempbio usa una <strong>formula sinergica ad alta concentrazione</strong> con quattro principi attivi per un <strong>effetto potenziato</strong>.
              </p>
            </div>
            <div className="bg-white p-4 md:p-5 rounded-lg">
               <h4 className="font-bold text-base md:text-lg mb-2 text-gray-900">Il Segreto della Formula</h4>
               <p className="text-xs md:text-sm text-gray-600 mb-3">Formulato in laboratori specializzati con estratti per massima biodisponibilità. Quattro principi attivi per un&apos;azione a 360 gradi.</p>
               <div className="flex gap-2 items-center text-red-700 font-bold text-sm">
                 <Award size={18}/> Formula Certificata
               </div>
            </div>
          </div>

          <div className="bg-red-50 p-5 md:p-6 rounded-lg">
            <h3 className="text-lg md:text-xl font-bold text-red-700 mb-3">&quot;Il Metodo Hollywood&quot;</h3>
            <p className="text-gray-800 text-sm leading-relaxed">
              Zempbio è ispirato alle formule usate dagli <strong>attori professionisti</strong> per perdere peso velocemente. <strong>Brucia grasso</strong>, <strong>drena gonfiori</strong> e <strong>preserva energia</strong>: <strong>risultati impressionanti senza palestra obbligatoria o diete rigide</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* SEZIONE TRASFORMAZIONI PRIMA/DOPO */}
      <section className="py-10 md:py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 font-serif text-gray-900">
            Trasformazioni <span className="text-red-600">Reali</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Donna Prima/Dopo */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <img src="/images/zempbio/DONNA PRIMA.jpeg" alt="Prima" className="w-full h-48 md:h-64 object-cover rounded-lg" />
                  <p className="text-center text-xs font-bold text-gray-500 mt-2 uppercase">Prima</p>
                </div>
                <div>
                  <img src="/images/zempbio/DONNA DOPO.jpeg" alt="Dopo" className="w-full h-48 md:h-64 object-cover rounded-lg" />
                  <p className="text-center text-xs font-bold text-green-600 mt-2 uppercase">Dopo</p>
                </div>
              </div>
              <p className="text-center text-gray-700 text-sm font-medium">Maria, 42 anni - <span className="text-red-600 font-bold">-14kg in 3 settimane</span></p>
            </div>

            {/* Uomo Prima/Dopo */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <img src="/images/zempbio/UOMO PRIMA.jpeg" alt="Prima" className="w-full h-48 md:h-64 object-cover rounded-lg" />
                  <p className="text-center text-xs font-bold text-gray-500 mt-2 uppercase">Prima</p>
                </div>
                <div>
                  <img src="/images/zempbio/UOMO DOPO.jpeg" alt="Dopo" className="w-full h-48 md:h-64 object-cover rounded-lg" />
                  <p className="text-center text-xs font-bold text-green-600 mt-2 uppercase">Dopo</p>
                </div>
              </div>
              <p className="text-center text-gray-700 text-sm font-medium">Marco, 38 anni - <span className="text-red-600 font-bold">-18kg in 1 mese</span></p>
            </div>
          </div>

          <p className="text-center text-gray-500 text-base mt-6">I risultati possono variare da persona a persona</p>
        </div>
      </section>

      {/* DETAILED INGREDIENTS - CARDS */}
      <section id="ingredienti" className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10 font-serif">Gli Ingredienti: <span className="text-red-600">Cosa Ottieni con Ogni Componente</span></h3>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white p-5 md:p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-orange-100 rounded-lg"><Zap className="text-orange-500" size={24} /></div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900">Curcuma (Curcumina)</h4>
              </div>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Agisce sul <strong>metabolismo dei grassi</strong>, accelerando la termogenesi e la <strong>conversione dei depositi adiposi in energia</strong>.
              </p>
            </div>

            <div className="bg-white p-5 md:p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-blue-100 rounded-lg"><Activity className="text-blue-500" size={24} /></div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900">Alga Wakame (Fucoxantina)</h4>
              </div>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Mira al <strong>drenaggio dei liquidi</strong> e alla riduzione del gonfiore. Efficace contro la <strong>ritenzione idrica</strong> su addome e gambe.
              </p>
            </div>

            <div className="bg-white p-5 md:p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-green-100 rounded-lg"><Leaf className="text-green-500" size={24} /></div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900">Ortosiphon (Flavonoidi)</h4>
              </div>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Controlla la <strong>fame nervosa</strong> e l&apos;assorbimento dei nutrienti, <strong>prevenendo picchi glicemici</strong>.
              </p>
            </div>

            <div className="bg-white p-5 md:p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-purple-100 rounded-lg"><ShieldCheck className="text-purple-500" size={24} /></div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900">Garcinia Cambogia (HCA)</h4>
              </div>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                <strong>Blocca la sintesi di nuovi grassi</strong> e mantiene i risultati a lungo termine, riducendo l&apos;effetto yo-yo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 BENEFITS - CHECKLIST */}
      <section id="benefici" className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 font-serif text-gray-900">10 Benefici Potenti che <span className="text-red-600">Cambieranno il Tuo Corpo</span></h3>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 md:gap-y-4">
             {[
               "<strong>Perdita significativa di peso</strong>: fino a <strong>15-20kg</strong> in 10-14 giorni",
               "<strong>Corpo snello e tonico</strong>: addio a <strong>gonfiori</strong> su pancia e gambe",
               "<strong>Mangia liberamente</strong>: brucia calorie anche con pasti normali",
               "<strong>Energia sostenuta</strong>: vitalità alta <strong>tutto il giorno</strong>",
               "<strong>Attrazione e fiducia</strong>: sentiti <strong>attraente e sicuro</strong>",
               "<strong>Risultati duraturi</strong>: mantieni il peso <strong>nel tempo</strong>",
               "<strong>100% naturale e sicuro</strong>: senza effetti collaterali",
               "<strong>Confidenza quotidiana</strong>: indossa ciò che vuoi",
               "<strong>Azione antiossidante</strong>: pelle sana e vitalità",
               "<strong>Accessibile</strong>: usato dalle star, ora <strong>per tutti</strong>"
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                 <div className="bg-green-500 text-white rounded-full p-1 shrink-0"><Check size={18} /></div>
                 <span className="font-medium text-gray-800 text-base md:text-lg" dangerouslySetInnerHTML={{ __html: item }} />
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* RECENSIONI CON FOTO - FULL WIDTH */}
      <section className="py-12 md:py-16 px-0 md:px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-3 font-serif text-gray-900 px-4">
            Storie di <span className="text-red-600">Successo</span>
          </h3>
          <p className="text-center text-gray-500 text-base md:text-lg mb-8 px-4">Persone reali, risultati reali</p>

          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 md:px-0">
            {[
              { name: "Lucia B.", age: "38 anni", text: "Ero scettica, pensavo fosse la solita pubblicità. Dopo 3 giorni la voglia di pane e pasta è sparita. -8kg in un mese senza stress.", photo: "/images/zempbio/donna/donna2378.jpg" },
              { name: "Giancarlo M.", age: "35 anni", text: "Finalmente un prodotto serio. Niente tachicardia, solo una sensazione di sazietà costante. La pancia è sparita.", photo: "/images/zempbio/UOMO/uomo089235.jpg" },
              { name: "Franca T.", age: "65 anni", text: "La menopausa mi aveva distrutto il metabolismo. ZEMPBIO™ lo ha riacceso. Mi sento di nuovo energica.", photo: "/images/zempbio/donna/donna2387.jpg" },
              { name: "Paolo D.", age: "41 anni", text: "Ottimo prodotto. Consegna veloce e pagamento al corriere. Ho perso 9kg finora e continuo.", photo: "/images/zempbio/UOMO/uomo25370.jpg" },
              { name: "Ester S.", age: "44 anni", text: "Mio figlio mi ha regalato questo trattamento. Ora usciamo a camminare e non mi stanco più. Un miracolo.", photo: "/images/zempbio/donna/donna24378y.jpg" },
              { name: "Claudio F.", age: "39 anni", text: "Spegnere la fame nervosa serale era il mio problema. ZEMPBIO™ ha risolto tutto. -11kg in 3 mesi.", photo: "/images/zempbio/UOMO/uomo536429.jpg" },
              { name: "Rosanna G.", age: "30 anni", text: "Le mie amiche mi chiedono cosa ho fatto al viso. Sembro ringiovanita perché ho perso peso in modo sano.", photo: "/images/zempbio/donna/donna3245.jpg" },
              { name: "Vincenzo L.", age: "55 anni", text: "Mangio porzioni normali e sono soddisfatto. La mia pressione è migliorata. Consigliatissimo per chi ha superato i 50.", photo: "/images/zempbio/UOMO/uomo58297.jpg" },
              { name: "Adele P.", age: "35 anni", text: "Non ci credevo, ma i 400mg fanno la differenza. Ho provato pillole da 100mg e non facevano nulla. Questo funziona.", photo: "/images/zempbio/donna/donna4578.jpg" },
              { name: "Marco V.", age: "38 anni", text: "Soddisfatto al 100%. Il pacco è arrivato anonimo e ho pagato in contanti. -6kg nelle prime due settimane.", photo: "/images/zempbio/UOMO/uomo235489.jpg" },
              { name: "Silvana M.", age: "33 anni", text: "Avevo sempre fame di dolci. Ora il mio cervello non li chiede più. Incredibile come agisce sulla mente.", photo: "/images/zempbio/donna/donna5479y.jpg" },
              { name: "Giorgio B.", age: "34 anni", text: "La scienza dietro ZEMPBIO™ è solida. Si sente che non è robetta da supermercato. Autorità e Risultati.", photo: "/images/zempbio/UOMO/uomo235897.jpg" }
            ].map((review, idx) => (
              <div key={idx} className="bg-white md:rounded-xl overflow-hidden">
                {/* Full-width image on mobile */}
                <img
                  src={review.photo}
                  alt={review.name}
                  className="w-full h-64 md:h-72 object-cover object-top"
                />
                {/* Content below image */}
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="font-bold text-gray-900 text-xl md:text-2xl mb-2">{review.name}, {review.age}</p>
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed">&quot;{review.text}&quot;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCIENCE & DOCTOR */}
      <section id="scienza" className="py-10 md:py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">

          <div className="bg-blue-50 p-5 md:p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-3 font-serif text-blue-900 flex items-center gap-2">
              <Activity className="text-blue-600" size={22}/> La Scienza Dietro Zempbio
            </h2>
            <p className="text-blue-800 text-sm md:text-base leading-relaxed">
              Zempbio attiva il metabolismo a livelli elevati, brucia grassi 24/7 e drena i liquidi in eccesso. Prendi 2 capsule al giorno con acqua per risultati rapidi e mantenibili.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-center bg-gray-50 rounded-lg p-5 md:p-6">
            <div className="w-24 h-24 md:w-32 md:h-32 shrink-0">
               <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face" alt="Dottoressa Elena Rossi" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1 font-serif">Il Parere della Dottoressa</h2>
              <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-3">Dott.ssa Elena Rossi, Nutrizionista VIP</p>
              <p className="text-gray-700 italic text-sm md:text-base leading-relaxed">
                &quot;Zempbio è una <strong>formula eccellente</strong> per trasformazioni rapide. La combinazione di <strong>curcuma, wakame, ortosiphon e garcinia</strong> crea un&apos;azione sinergica che <strong>accelera il metabolismo</strong> e <strong>drena efficacemente</strong>.&quot;
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* OFFER / CTA SECTION */}
      <section id="order-section" className="py-12 md:py-16 px-4 bg-gradient-to-br from-red-600 to-red-800 text-white text-center">
        <div className="max-w-xl mx-auto relative z-10 bg-white text-gray-900 p-5 md:p-8 rounded-xl">
          <div className="bg-yellow-400 text-black font-black px-4 py-1.5 rounded-full uppercase text-xs md:text-sm tracking-wide inline-block mb-4">
            Offerta a Tempo Limitato
          </div>

          <h2 className="text-2xl md:text-3xl font-black mb-4 font-serif text-gray-900">Ordina Zempbio Ora</h2>

          {/* Product Mockup */}
          <div className="flex justify-center mb-4">
            <img src="/images/zempbio/Mockup.png" alt="ZEMPBIO" className="w-24 md:w-28" />
          </div>

          <p className="text-base md:text-lg text-gray-600 mb-4">
            Offerta scade tra: <span className="font-mono font-bold text-red-600 text-xl md:text-2xl">{formatTime(timeLeft)}</span>
          </p>

          <div className="border-t border-b border-gray-200 py-4 mb-5">
            <div className="flex justify-center items-center gap-3">
              <span className="text-xl text-red-500 line-through">€99,99</span>
              <span className="text-4xl font-black text-emerald-600">€39,99</span>
            </div>
            <p className="text-xs text-gray-500 uppercase font-bold mt-1">Prezzo per 1 Confezione</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-5">
            <div className="flex flex-col items-center gap-1 text-green-700 font-bold bg-green-50 p-3 rounded-lg">
              <Check size={20} /> <span className="text-xs md:text-sm text-center">Spedizione Gratis</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-green-700 font-bold bg-green-50 p-3 rounded-lg">
              <Truck size={20} /> <span className="text-xs md:text-sm text-center">Contrassegno</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-green-700 font-bold bg-green-50 p-3 rounded-lg">
              <ShieldCheck size={20} /> <span className="text-xs md:text-sm text-center">Garanzia 60gg</span>
            </div>
          </div>

          {/* Phone warning banner */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-5 text-left">
            <div className="flex items-start gap-3">
              <div className="bg-red-500 text-white p-2 rounded-lg shrink-0"><Phone size={20} /></div>
              <div>
                <p className="font-bold text-red-700 text-sm md:text-base uppercase mb-1">Importante: Rispondi al Telefono!</p>
                <p className="text-red-600 text-sm md:text-base">Un consulente ti chiamerà per confermare. <strong>Se non rispondi, la spedizione NON partirà</strong>.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <label className="text-xs md:text-sm font-bold text-gray-600 uppercase ml-1 mb-1 block">Nome e Cognome</label>
              <input
                type="text"
                placeholder="Es. Maria Rossi"
                value={orderForm.nome}
                onChange={(e) => setOrderForm({...orderForm, nome: e.target.value})}
                className="w-full border-2 border-gray-300 p-4 rounded-xl bg-gray-50 font-bold text-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
            </div>

            <div>
              <label className="text-xs md:text-sm font-bold text-gray-600 uppercase ml-1 mb-1 block">Telefono Cellulare</label>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="3331234567"
                value={orderForm.telefono}
                onChange={(e) => {
                  const numericOnly = e.target.value.replace(/\D/g, '');
                  setOrderForm({...orderForm, telefono: numericOnly});
                }}
                className="w-full border-2 border-gray-300 p-4 rounded-xl bg-gray-50 font-bold text-lg outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="text-xs md:text-sm font-bold text-gray-600 uppercase ml-1 mb-1 block">Indirizzo Completo (Via, Civico, CAP, Città)</label>
              <input
                type="text"
                placeholder="Es. Via Roma 10, 20100 Milano"
                value={orderForm.indirizzo}
                onChange={(e) => setOrderForm({...orderForm, indirizzo: e.target.value})}
                className="w-full border-2 border-gray-300 p-4 rounded-xl bg-gray-50 font-bold text-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl flex items-center gap-3">
              <div className="bg-emerald-600 text-white p-2 rounded-lg"><CheckCircle2 size={20} /></div>
              <p className="text-sm md:text-base font-bold text-emerald-800 uppercase">Pagamento sicuro alla consegna</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 rounded-xl font-black text-lg md:text-xl uppercase transition-all flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer ${isSubmitting ? 'bg-emerald-400' : ''}`}
            >
              {isSubmitting ? (
                <><RefreshCw size={22} className="animate-spin" /> INVIO IN CORSO...</>
              ) : (
                <>CONFERMA ORDINE <ArrowRight size={22}/></>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-gray-400">
              <Lock size={14}/>
              <p className="text-xs font-bold uppercase tracking-wide">Dati protetti | Consegna 24-48h</p>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <HelpCircle className="text-red-600" size={28}/>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase">Domande Frequenti</h2>
            </div>
            <p className="text-gray-500 text-base md:text-lg">Tutto quello che devi sapere prima di ordinare</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Zempbio funziona davvero?",
                a: "Sì, Zempbio è stato sviluppato con una formula scientifica che combina 4 principi attivi naturali (Curcuma, Alga Wakame, Ortosiphon e Garcinia Cambogia) che agiscono in sinergia per accelerare il metabolismo, drenare i liquidi e controllare la fame. Migliaia di clienti hanno già ottenuto risultati concreti."
              },
              {
                q: "Quanto tempo ci vuole per vedere i risultati?",
                a: "I primi effetti si notano già nei primi 5-7 giorni: riduzione del gonfiore, meno fame nervosa e più energia. I risultati più significativi sulla bilancia si vedono generalmente tra la seconda e la terza settimana di utilizzo costante."
              },
              {
                q: "Ci sono effetti collaterali?",
                a: "No, Zempbio è 100% naturale e non ha effetti collaterali noti. È formulato con ingredienti di origine vegetale, sicuri e ben tollerati. Tuttavia, se sei in gravidanza, allattamento o assumi farmaci, consulta il medico prima dell'uso."
              },
              {
                q: "Come si assume Zempbio?",
                a: "Semplicissimo: 2 capsule al giorno con un bicchiere d'acqua, preferibilmente prima dei pasti principali. Non richiede diete restrittive o esercizio fisico intenso per funzionare."
              },
              {
                q: "Perché devo rispondere alla chiamata?",
                a: "La chiamata serve a confermare i tuoi dati di spedizione e a darti consigli personalizzati sull'utilizzo. Inoltre, poiché il pagamento è in contrassegno, dobbiamo verificare che l'ordine sia reale. Senza conferma telefonica, la spedizione non può partire."
              },
              {
                q: "Posso pagare con carta di credito?",
                a: "Per la tua massima sicurezza, accettiamo solo pagamento alla consegna (contrassegno). Paghi direttamente al corriere quando ricevi il pacco. Non devi inserire dati della carta online."
              },
              {
                q: "Quanto costa la spedizione?",
                a: "La spedizione è completamente GRATUITA in tutta Italia. Non ci sono costi nascosti: paghi solo €39,99 alla consegna."
              },
              {
                q: "In quanto tempo ricevo il pacco?",
                a: "La consegna avviene in 24-48 ore lavorative dalla conferma telefonica. Il pacco è anonimo, senza indicazioni sul contenuto."
              },
              {
                q: "C'è una garanzia?",
                a: "Assolutamente sì! Offriamo una garanzia Soddisfatti o Rimborsati di 60 giorni. Se non sei soddisfatto dei risultati, ti restituiamo l'intero importo senza domande."
              },
              {
                q: "Posso usarlo se ho più di 50 anni?",
                a: "Certamente! Zempbio è particolarmente efficace per chi ha un metabolismo rallentato dall'età. Molti dei nostri clienti più soddisfatti hanno superato i 50 anni e hanno finalmente trovato una soluzione che funziona."
              }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-gray-50 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="font-bold text-gray-900 text-base md:text-lg pr-4">{faq.q}</span>
                  <ChevronDown size={22} className="text-gray-500 shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-base md:text-lg leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-8 text-center">
            <button
              onClick={scrollToOrder}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition inline-flex items-center gap-2"
            >
              Ordina Ora con Garanzia 60 Giorni <ArrowRight size={18}/>
            </button>
          </div>
        </div>
      </section>

      {/* TRUSTPILOT-STYLE REVIEWS SECTION */}
      <section id="recensioni" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
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
                {trustpilotReviews.map((review, idx) => (
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

      {/* FOOTER - Kept from original zempbio */}
      <footer className="bg-gray-100 py-20 pb-28 md:pb-20 px-4 border-t border-gray-200 text-center">
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
            Disclaimer: I risultati sono soggettivi e possono variare. ZEMPBIO™ è un integratore alimentare e non va inteso come sostituto di una dieta variata ed equilibrata. Consultare il medico prima dell&apos;uso in caso di patologie pregresse. <br/>
            BioHacker Labs Ltd - Sede Legale: Milano, Italia. P.IVA 08927361221. <br/>
            Sito non affiliato a Facebook, Google o Meta Inc. <br/>
            © 2024 Tutti i diritti riservati.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 p-4 shadow-2xl z-50">
        <button
          onClick={scrollToOrder}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-6 rounded-xl flex items-center justify-center gap-2 text-lg uppercase"
        >
          <span>Acquista Ora</span>
          <span className="text-yellow-300 font-bold">- Paga alla Consegna</span>
        </button>
      </div>
    </div>
  );
};

export default ZempbioLanding;
