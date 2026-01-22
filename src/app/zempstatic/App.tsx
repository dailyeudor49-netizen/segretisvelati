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

// Componente Helper per le recensioni
const ReviewCard = ({ name, age, text, stars, image }: { name: string, age: string, text: string, stars: number, image: string }) => (
  <div className="bg-white p-4 md:p-5 rounded-lg flex flex-col h-full">
    <div className="flex items-center gap-3 mb-3">
      <img
        src={image}
        alt={name}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
      />
      <div className="flex-1">
        <h5 className="font-bold text-gray-900 text-sm md:text-base">{name}, {age} anni</h5>
        <div className="flex text-yellow-400 mt-0.5">
          {[...Array(stars)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
        </div>
      </div>
    </div>
    <p className="text-gray-600 text-xs md:text-sm italic leading-relaxed">&quot;{text}&quot;</p>
  </div>
);

// Componente Principale
const ZempbioLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 23);
  const [orderForm, setOrderForm] = useState({ nome: '', telefono: '', indirizzo: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

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

  const isValidPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('3') && cleaned.length === 10) return true;
    if (cleaned.startsWith('0') && cleaned.length >= 9 && cleaned.length <= 11) return true;
    return false;
  };

  const isFormValid = orderForm.nome.trim().length >= 3 &&
                      isValidPhone(orderForm.telefono) &&
                      orderForm.indirizzo.trim().length >= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
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
      window.location.href = `/zempstatic/grazie?nome=${encodeURIComponent(orderForm.nome)}`;
    } catch {
      window.location.href = `/zempstatic/grazie?nome=${encodeURIComponent(orderForm.nome)}`;
    }
  };

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

          <button onClick={scrollToOrder} className="hidden md:block bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-red-700 transition">
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
            <button onClick={() => {scrollToOrder(); setIsMenuOpen(false);}} className="text-red-600 font-bold">Ordina Ora</button>
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
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 font-serif">
              ZEMPBIO: Il Segreto degli Attori per Perdere <span className="text-red-500">15-20kg</span> in 10-14 Giorni
            </h1>
            <p className="text-sm md:text-lg font-light text-gray-300 mb-6 leading-relaxed">
              La formula naturale usata dalle star di Hollywood per bruciare grasso rapidamente, mantenendo energia e forma perfetta.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button onClick={scrollToOrder} className="bg-red-600 hover:bg-red-700 text-white text-base md:text-lg font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2">
                Inizia la Trasformazione <ArrowRight size={18}/>
              </button>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="text-green-500" size={16}/> Garanzia 100% Soddisfatti
              </div>
            </div>
          </div>

          {/* Product Image Mockup */}
          <div className="hidden md:block w-1/4">
             <img src="https://picsum.photos/seed/zempbiopill/400/600" alt="Zempbio Bottle" className="rounded-lg" />
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
                  src="https://picsum.photos/seed/zempbiopill/400/500"
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
                <p className="text-gray-500 text-base line-through">€99,99</p>
                <p className="text-4xl md:text-5xl font-black text-red-600">€39,99</p>
                <p className="text-xs md:text-sm text-gray-600 mt-1 font-medium">Spedizione GRATUITA</p>
                <button
                  onClick={scrollToOrder}
                  className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition"
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
              <div className="space-y-2 md:space-y-3">
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
                    <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-white" />
                    </div>
                    <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: benefit }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO NARRATIVE */}
      <section className="py-10 md:py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-sm md:text-base leading-relaxed text-gray-700 space-y-4">
          <p>
            <span className="font-bold text-gray-900 text-base md:text-lg">Come fanno gli attori a passare da ruoli impegnativi a fisici scolpiti in poche settimane?</span> Non è solo dieta estrema. È <strong>Zempbio</strong>, la formula naturale che <strong>accelera il metabolismo</strong>, <strong>drena i liquidi</strong> e <strong>controlla la fame</strong>.
          </p>
          <blockquote className="border-l-4 border-red-500 pl-4 italic text-gray-600 bg-gray-50 py-3 rounded-r-lg text-sm">
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

      {/* SEZIONE IMMAGINE */}
      <section className="py-8 md:py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Risultati Zempbio"
            className="w-full h-[250px] md:h-[350px] object-cover rounded-lg"
          />
          <p className="text-center text-gray-500 text-xs mt-2">I risultati possono variare da persona a persona</p>
        </div>
      </section>

      {/* DETAILED INGREDIENTS - CARDS */}
      <section id="ingredienti" className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10 font-serif">Gli Ingredienti: <span className="text-red-600">Cosa Ottieni con Ogni Componente</span></h3>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white p-5 md:p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-100 rounded-lg"><Zap className="text-orange-500" size={20} /></div>
                <h4 className="text-base md:text-lg font-bold text-gray-900">Curcuma (Curcumina)</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Agisce sul <strong>metabolismo dei grassi</strong>, accelerando la termogenesi e la <strong>conversione dei depositi adiposi in energia</strong>.
              </p>
            </div>

            <div className="bg-white p-5 md:p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg"><Activity className="text-blue-500" size={20} /></div>
                <h4 className="text-base md:text-lg font-bold text-gray-900">Alga Wakame (Fucoxantina)</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mira al <strong>drenaggio dei liquidi</strong> e alla riduzione del gonfiore. Efficace contro la <strong>ritenzione idrica</strong> su addome e gambe.
              </p>
            </div>

            <div className="bg-white p-5 md:p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg"><Leaf className="text-green-500" size={20} /></div>
                <h4 className="text-base md:text-lg font-bold text-gray-900">Ortosiphon (Flavonoidi)</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Controlla la <strong>fame nervosa</strong> e l&apos;assorbimento dei nutrienti, <strong>prevenendo picchi glicemici</strong>.
              </p>
            </div>

            <div className="bg-white p-5 md:p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg"><ShieldCheck className="text-purple-500" size={20} /></div>
                <h4 className="text-base md:text-lg font-bold text-gray-900">Garcinia Cambogia (HCA)</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
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
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 md:gap-y-3">
             {[
               "Perdita significativa di peso: fino a 15-20kg in 10-14 giorni",
               "Corpo snello e tonico: addio a gonfiori su pancia e gambe",
               "Mangia liberamente: brucia calorie anche con pasti normali",
               "Energia sostenuta: vitalità alta tutto il giorno",
               "Attrazione e fiducia: sentiti attraente e sicuro",
               "Risultati duraturi: mantieni il peso nel tempo",
               "100% naturale e sicuro: senza effetti collaterali",
               "Confidenza quotidiana: indossa ciò che vuoi",
               "Azione antiossidante: pelle sana e vitalità",
               "Accessibile: usato dalle star, ora per tutti"
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                 <div className="bg-green-500 text-white rounded-full p-0.5 shrink-0"><Check size={16} /></div>
                 <span className="font-medium text-gray-800 text-sm">{item}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="recensioni" className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
           <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 font-serif text-gray-900">Le Recensioni di Chi Ha Trasformato il Proprio Corpo</h2>
           <p className="text-center text-gray-500 text-sm mb-8">Testimonianze reali di persone che hanno ottenuto risultati concreti.</p>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              <ReviewCard
                name="Maria"
                age="35"
                text="Ho perso 16kg in 10 giorni. Ora mi sento energica e sicura. Zempbio mi ha cambiato la vita!"
                stars={5}
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
              />
              <ReviewCard
                name="Luca"
                age="42"
                text="Come attore, dovevo dimagrire velocemente. Zempbio ha eliminato 18kg senza sforzi eccessivi."
                stars={5}
                image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              />
              <ReviewCard
                name="Anna"
                age="28"
                text="Addio cellulite e gonfiori. In 12 giorni risultati visibili su gambe e pancia."
                stars={5}
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
              />
              <ReviewCard
                name="Giovanni"
                age="50"
                text="Perso 14kg con energia costante. Il migliore investimento per la mia salute."
                stars={5}
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              />
              <ReviewCard
                name="Sofia"
                age="39"
                text="Durante la menopausa ha funzionato perfettamente: 17kg in meno e zero ritenzione."
                stars={5}
                image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
              />
              <ReviewCard
                name="Marco"
                age="45"
                text="Scettico all'inizio, ma i risultati parlano chiaro: 12kg in meno e mi sento 10 anni più giovane!"
                stars={5}
                image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
              />
           </div>

           <p className="text-center font-bold text-green-600 mt-8 flex items-center justify-center gap-2 text-base md:text-lg">
             <ShieldCheck size={24} /> Oltre 100.000 recensioni positive
           </p>
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

          <p className="text-base md:text-lg text-gray-600 mb-4">
            Offerta scade tra: <span className="font-mono font-bold text-red-600 text-xl md:text-2xl">{formatTime(timeLeft)}</span>
          </p>

          <div className="border-t border-b border-gray-200 py-4 mb-5">
            <div className="flex justify-center items-center gap-3">
              <span className="text-xl text-gray-400 line-through">€99,99</span>
              <span className="text-4xl font-black text-red-600">€39,99</span>
            </div>
            <p className="text-xs text-gray-500 uppercase font-bold mt-1">Prezzo per 1 Confezione</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-5 text-xs">
            <div className="flex flex-col items-center gap-1 text-green-700 font-bold bg-green-50 p-2 rounded">
              <Check size={16} /> <span>Spedizione Gratis</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-green-700 font-bold bg-green-50 p-2 rounded">
              <Truck size={16} /> <span>Contrassegno</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-green-700 font-bold bg-green-50 p-2 rounded">
              <ShieldCheck size={16} /> <span>Garanzia 60gg</span>
            </div>
          </div>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-lg md:text-xl font-bold py-4 rounded-lg transition flex items-center justify-center gap-2"
            >
               Ordina Ora <ArrowRight size={20}/>
            </button>
          ) : (
            <>
              {/* Phone warning banner */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-5 text-left">
                <div className="flex items-start gap-2">
                  <div className="bg-red-500 text-white p-1.5 rounded shrink-0"><Phone size={14} /></div>
                  <div>
                    <p className="font-bold text-red-700 text-xs uppercase mb-0.5">Importante: Rispondi al Telefono!</p>
                    <p className="text-red-600 text-xs">Un consulente ti chiamerà per confermare. <strong>Se non rispondi, la spedizione NON partirà</strong>.</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Nome e Cognome</label>
                  <input
                    type="text"
                    placeholder="Es. Maria Rossi"
                    value={orderForm.nome}
                    onChange={(e) => setOrderForm({...orderForm, nome: e.target.value})}
                    className="w-full border border-gray-300 p-3 md:p-4 rounded-lg bg-gray-50 font-bold outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Telefono Cellulare</label>
                  <div className="relative">
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="3331234567"
                      maxLength={13}
                      value={orderForm.telefono}
                      onChange={(e) => {
                        const numericOnly = e.target.value.replace(/\D/g, '');
                        setOrderForm({...orderForm, telefono: numericOnly});
                      }}
                      className={`w-full border p-3 md:p-4 rounded-lg bg-gray-50 font-bold outline-none transition-all ${
                        orderForm.telefono.length > 0
                          ? isValidPhone(orderForm.telefono)
                            ? 'border-emerald-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                            : 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      }`}
                      required
                    />
                    {orderForm.telefono.length > 0 && !isValidPhone(orderForm.telefono) && (
                      <p className="text-[10px] text-red-500 mt-1 ml-1">Inserisci un numero italiano valido (10 cifre)</p>
                    )}
                    {orderForm.telefono.length > 0 && isValidPhone(orderForm.telefono) && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">
                        <CheckCircle2 size={20} />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Indirizzo Completo (Via, Civico, CAP, Città)</label>
                  <input
                    type="text"
                    placeholder="Es. Via Roma 10, 20100 Milano"
                    value={orderForm.indirizzo}
                    onChange={(e) => setOrderForm({...orderForm, indirizzo: e.target.value})}
                    className="w-full border border-gray-300 p-3 md:p-4 rounded-lg bg-gray-50 font-bold outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                    required
                  />
                </div>

                <div className="bg-emerald-50 p-3 rounded-lg flex items-center gap-3">
                   <div className="bg-emerald-600 text-white p-1.5 rounded"><CheckCircle2 size={14} /></div>
                   <p className="text-xs font-bold text-emerald-800 uppercase">Pagamento sicuro alla consegna</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className={`w-full py-4 rounded-lg font-bold text-base md:text-lg uppercase transition-all flex items-center justify-center gap-2 ${
                    isFormValid
                      ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } ${isSubmitting ? 'bg-red-400' : ''}`}
                >
                  {isSubmitting ? (
                    <><RefreshCw size={18} className="animate-spin" /> INVIO IN CORSO...</>
                  ) : !isFormValid ? (
                    <><Lock size={16} /> COMPLETA I CAMPI</>
                  ) : (
                    <>CONFERMA ORDINE <ArrowRight size={18}/></>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Lock size={10}/>
                  <p className="text-[9px] font-bold uppercase tracking-wide">Dati protetti | Consegna 24-48h</p>
                </div>
              </form>
            </>
          )}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <HelpCircle className="text-red-600" size={24}/>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 uppercase">Domande Frequenti</h2>
            </div>
            <p className="text-gray-500 text-xs">Tutto quello che devi sapere prima di ordinare</p>
          </div>

          <div className="space-y-3">
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
              <details key={idx} className="group bg-gray-50 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="font-bold text-gray-900 text-sm pr-4">{faq.q}</span>
                  <ChevronDown size={18} className="text-gray-500 shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-8 text-center">
            <button
              onClick={scrollToOrder}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition inline-flex items-center gap-2"
            >
              Ordina Ora con Garanzia 60 Giorni <ArrowRight size={18}/>
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-500 text-center py-6 text-xs px-4">
        <p>&copy; {new Date().getFullYear()} Zempbio Italia. Tutti i diritti riservati.</p>
        <p className="mt-1 text-[10px]">Questo prodotto non sostituisce il parere del medico. I risultati possono variare.</p>
      </footer>
    </div>
  );
};

export default ZempbioLanding;
