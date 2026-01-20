"use client";

import React from 'react';
import { ShieldCheck, Truck, Award, CheckCircle2, Phone } from 'lucide-react';

export default function ZempbioInfoPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-6">
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

      {/* Hero */}
      <section className="py-12 md:py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                <ShieldCheck size={14} /> Integratore Alimentare
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                ZEMPBIO™ Complex 400mg
              </h1>
              <p className="text-gray-600 leading-relaxed mb-6">
                Integratore alimentare a base di estratti vegetali formulato per supportare
                il normale metabolismo energetico e contribuire al senso di sazietà.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                  <span>Estratti vegetali naturali</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                  <span>Prodotto in stabilimenti certificati EU</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                  <span>30 compresse per confezione</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/zempbio/Mockup.png"
                alt="ZEMPBIO Complex 400mg - Integratore Alimentare"
                className="w-64 md:w-80 drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Info */}
      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Informazioni Prodotto</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Qualità Certificata</h3>
              <p className="text-sm text-gray-600">Prodotto in stabilimenti GMP nell'Unione Europea</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Truck className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Spedizione</h3>
              <p className="text-sm text-gray-600">Consegna in 24-48h in tutta Italia</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award className="text-amber-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Garanzia</h3>
              <p className="text-sm text-gray-600">Soddisfatti o rimborsati 60 giorni</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Composizione</h2>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600 mb-4">
              La formula Complex 400mg contiene una combinazione di ingredienti selezionati:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={16} />
                <span><strong>Griffonia simplicifolia</strong> - Contribuisce al normale tono dell'umore</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={16} />
                <span><strong>Cromo</strong> - Contribuisce al mantenimento di livelli normali di glucosio nel sangue</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={16} />
                <span><strong>Vitamina B6</strong> - Contribuisce al normale metabolismo energetico</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contattaci</h2>
          <p className="text-gray-600 mb-6">Per informazioni sul prodotto o per effettuare un ordine:</p>
          <div className="flex items-center justify-center gap-2 text-emerald-600 font-semibold">
            <Phone size={20} />
            <span>Disponibili dal Lunedì al Venerdì</span>
          </div>
        </div>
      </section>

      {/* Disclaimers */}
      <section className="py-8 px-6 bg-gray-100">
        <div className="container mx-auto max-w-3xl">
          <div className="text-xs text-gray-500 space-y-2">
            <p><strong>Avvertenze:</strong> Gli integratori alimentari non vanno intesi come sostituti di una dieta variata ed equilibrata e di uno stile di vita sano. Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini al di sotto dei 3 anni.</p>
            <p><strong>Controindicazioni:</strong> Consultare il medico in caso di gravidanza, allattamento, assunzione di farmaci o patologie pregresse.</p>
            <p><strong>Nota:</strong> I risultati possono variare da persona a persona.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-emerald-600 text-white p-1 rounded font-bold text-xs">ZB</div>
            <span className="font-bold text-white">ZEMPBIO™</span>
          </div>
          <p className="text-sm">BioHacker Labs Ltd - P.IVA 08927361221</p>
          <p className="text-xs mt-2">© 2024 Tutti i diritti riservati</p>
        </div>
      </footer>
    </div>
  );
}
