"use client";

import React, { useState } from 'react';
import { ShieldCheck, Truck, Award, CheckCircle2, Phone, Leaf, FlaskConical, Clock, Heart, Users, Star, Package, Lock } from 'lucide-react';

export default function ZempbioInfoPage() {
  const [orderForm, setOrderForm] = useState({
    nome: '',
    telefono: '',
    indirizzo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Italian phone number validation
  const isValidItalianPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('3') && cleaned.length === 10) return true;
    if (cleaned.startsWith('0') && cleaned.length >= 9 && cleaned.length <= 11) return true;
    if (cleaned.startsWith('39') && cleaned.length >= 11 && cleaned.length <= 13) return true;
    return false;
  };

  const isFormValid = orderForm.nome.trim().length >= 3 &&
                      isValidItalianPhone(orderForm.telefono) &&
                      orderForm.indirizzo.trim().length >= 5;

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);

    try {
      const formData = new URLSearchParams();
      formData.append('source_id', '9b16759a6289');
      formData.append('aff_sub1', '');
      formData.append('aff_sub2', '');
      formData.append('name', orderForm.nome);
      formData.append('phone', orderForm.telefono);
      formData.append('address', orderForm.indirizzo);

      await fetch('https://network.worldfilia.net/manager/inventory/buy/ntm_zempbio_1x39.json?api_key=xgM6LBE0CA4EwJ4NTNhPBQ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        mode: 'no-cors'
      });

      window.location.href = `/zempbio/grazie?nome=${encodeURIComponent(orderForm.nome)}`;
    } catch (error) {
      console.error('Error submitting order:', error);
      window.location.href = `/zempbio/grazie?nome=${encodeURIComponent(orderForm.nome)}`;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 text-white p-1.5 rounded-lg font-bold text-sm">ZB</div>
            <span className="font-bold text-xl text-gray-900">ZEMPBIO<span className="text-emerald-600">™</span></span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-600" /> Notificato Min. Salute</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-emerald-50 via-white to-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                <ShieldCheck size={14} /> Integratore Alimentare Naturale
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                ZEMPBIO™ Complex 400mg
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Integratore alimentare a base di estratti vegetali, formulato per supportare
                il normale metabolismo energetico e contribuire al naturale senso di sazietà.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
                  <span className="text-base">Estratti vegetali 100% naturali</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
                  <span className="text-base">Prodotto in stabilimenti certificati EU</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
                  <span className="text-base">30 compresse per confezione</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
                  <span className="text-base">Pagamento alla consegna</span>
                </li>
              </ul>
              <a href="#ordina" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-emerald-600/20">
                Ordina Ora <Package size={20} />
              </a>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/zempbio/Mockup.png"
                alt="ZEMPBIO Complex 400mg - Integratore Alimentare"
                className="w-72 md:w-96 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 px-6 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="text-emerald-600" size={28} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Qualità Certificata</h3>
              <p className="text-xs text-gray-500 mt-1">Standard GMP europei</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Truck className="text-blue-600" size={28} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Spedizione Rapida</h3>
              <p className="text-xs text-gray-500 mt-1">Consegna in 24-48h</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award className="text-amber-600" size={28} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Garanzia 60 Giorni</h3>
              <p className="text-xs text-gray-500 mt-1">Soddisfatti o rimborsati</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Leaf className="text-purple-600" size={28} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">100% Naturale</h3>
              <p className="text-xs text-gray-500 mt-1">Estratti vegetali</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Come Funziona</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ZEMPBIO™ Complex 400mg agisce in modo naturale per supportare il tuo benessere quotidiano.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Assumi</h3>
              <p className="text-gray-600 text-sm">Prendi una compressa al giorno con un bicchiere d'acqua, preferibilmente prima dei pasti principali.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Supporta</h3>
              <p className="text-gray-600 text-sm">Gli ingredienti naturali supportano il normale metabolismo e contribuiscono al senso di sazietà.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Risultati</h3>
              <p className="text-gray-600 text-sm">Con un uso costante e uno stile di vita sano, noterai i benefici nel tempo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-16 md:py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Composizione</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Formula esclusiva Complex 400mg con ingredienti selezionati per la massima efficacia.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Leaf className="text-green-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Griffonia Simplicifolia</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pianta africana ricca di 5-HTP. Contribuisce al normale tono dell'umore e al controllo dell'appetito.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <FlaskConical className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Cromo Picolinato</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Minerale essenziale che contribuisce al mantenimento di livelli normali di glucosio nel sangue.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Heart className="text-orange-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Vitamina B6</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Contribuisce al normale metabolismo energetico e alla riduzione della stanchezza e dell'affaticamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Benefici</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Scopri come ZEMPBIO™ può supportare il tuo percorso verso il benessere.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-6 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="text-emerald-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Supporto al Metabolismo</h3>
                <p className="text-sm text-gray-600">Contribuisce al normale metabolismo energetico grazie alla Vitamina B6.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <Heart className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Controllo Glicemico</h3>
                <p className="text-sm text-gray-600">Il Cromo contribuisce al mantenimento di livelli normali di glucosio nel sangue.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                <Users className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Tono dell'Umore</h3>
                <p className="text-sm text-gray-600">La Griffonia contribuisce al normale tono dell'umore e al benessere mentale.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                <Star className="text-amber-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Energia e Vitalità</h3>
                <p className="text-sm text-gray-600">Contribuisce alla riduzione della stanchezza e dell'affaticamento.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section id="ordina" className="py-16 md:py-20 px-6 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ordina Ora</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ricevi ZEMPBIO™ direttamente a casa tua. Pagamento sicuro alla consegna.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Product Summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex gap-4 mb-6">
                <img src="/images/zempbio/Mockup.png" alt="ZEMPBIO" className="w-28 h-28 object-contain" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">ZEMPBIO™ Complex 400mg</h3>
                  <p className="text-sm text-gray-500 mb-3">30 compresse - Integratore Alimentare</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-emerald-600">€39,99</span>
                    <span className="text-sm text-gray-400 line-through">€79,99</span>
                  </div>
                  <span className="inline-block mt-2 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">-50% SCONTO</span>
                </div>
              </div>
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Truck size={16} className="text-blue-600" />
                  <span>Spedizione gratuita in 24-48h</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Pagamento alla consegna</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Award size={16} className="text-amber-600" />
                  <span>Garanzia 60 giorni</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Package size={16} className="text-purple-600" />
                  <span>Pacco anonimo e discreto</span>
                </div>
              </div>

              {/* Riepilogo Totale */}
              <div className="mt-6 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Prodotto</span>
                  <span className="text-gray-900">€39,99</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Spedizione</span>
                  <span className="text-emerald-600 font-medium">GRATIS</span>
                </div>
                <div className="border-t border-emerald-200 my-3"></div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Totale da Pagare</span>
                  <span className="text-2xl font-bold text-emerald-600">€39,99</span>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Dati per la Spedizione</h3>
              <form className="space-y-4" onSubmit={handleOrderSubmit}>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Nome e Cognome *</label>
                  <input
                    type="text"
                    placeholder="Es. Mario Rossi"
                    className="w-full border border-gray-300 p-3 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
                    required
                    value={orderForm.nome}
                    onChange={(e) => setOrderForm({...orderForm, nome: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Telefono *</label>
                  <input
                    type="tel"
                    placeholder="Es. 333 1234567"
                    className="w-full border border-gray-300 p-3 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
                    required
                    value={orderForm.telefono}
                    onChange={(e) => setOrderForm({...orderForm, telefono: e.target.value.replace(/\D/g, '')})}
                  />
                  <p className="text-xs text-gray-500 mt-1">Per confermare la spedizione</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Indirizzo Completo *</label>
                  <input
                    type="text"
                    placeholder="Via, Civico, CAP, Città"
                    className="w-full border border-gray-300 p-3 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
                    required
                    value={orderForm.indirizzo}
                    onChange={(e) => setOrderForm({...orderForm, indirizzo: e.target.value})}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                    isFormValid
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Invio in corso...' : 'Conferma Ordine - €39,99'}
                </button>
                <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                  <Lock size={12} /> Riceverai una chiamata per confermare l'ordine
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Domande Frequenti</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Come si assume ZEMPBIO™?</h3>
              <p className="text-gray-600 text-sm">Si consiglia di assumere 1 compressa al giorno con un bicchiere d'acqua, preferibilmente prima dei pasti principali.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Quando riceverò il mio ordine?</h3>
              <p className="text-gray-600 text-sm">La spedizione avviene in 24-48 ore lavorative su tutto il territorio italiano. Il corriere ti contatterà prima della consegna.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Come funziona il pagamento?</h3>
              <p className="text-gray-600 text-sm">Il pagamento avviene comodamente in contrassegno alla consegna. Paghi direttamente al corriere quando ricevi il pacco.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">C'è una garanzia?</h3>
              <p className="text-gray-600 text-sm">Sì, offriamo una garanzia di 60 giorni soddisfatti o rimborsati. Se non sei soddisfatto, puoi richiedere il rimborso completo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="container mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hai Bisogno di Aiuto?</h2>
          <p className="text-gray-600 mb-6">Per informazioni sul prodotto o assistenza con il tuo ordine:</p>
          <div className="flex items-center justify-center gap-2 text-emerald-600 font-semibold">
            <Phone size={20} />
            <span>Assistenza disponibile dal Lunedì al Venerdì</span>
          </div>
        </div>
      </section>

      {/* Disclaimers */}
      <section className="py-8 px-6 bg-gray-100">
        <div className="container mx-auto max-w-3xl">
          <div className="text-xs text-gray-500 space-y-3">
            <p><strong>Avvertenze:</strong> Gli integratori alimentari non vanno intesi come sostituti di una dieta variata ed equilibrata e di uno stile di vita sano. Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini al di sotto dei 3 anni.</p>
            <p><strong>Controindicazioni:</strong> Consultare il medico in caso di gravidanza, allattamento, assunzione di farmaci o patologie pregresse. Non utilizzare in caso di ipersensibilità a uno o più componenti.</p>
            <p><strong>Nota:</strong> I risultati possono variare da persona a persona e dipendono da molteplici fattori individuali come alimentazione, attività fisica e stile di vita.</p>
            <p><strong>Conservazione:</strong> Conservare in luogo fresco e asciutto, al riparo dalla luce e da fonti di calore.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 text-white p-1.5 rounded-lg font-bold text-sm">ZB</div>
              <span className="font-bold text-xl text-white">ZEMPBIO<span className="text-emerald-500">™</span></span>
            </div>
            <div className="text-center md:text-right text-sm">
              <p>BioHacker Labs Ltd - P.IVA 08927361221</p>
              <p className="mt-1">© 2024 Tutti i diritti riservati</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
