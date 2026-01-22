"use client";

import React, { Suspense, useEffect } from 'react';
import { CheckCircle2, Phone, Clock, Package, ShieldCheck } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function GrazieContent() {
  const searchParams = useSearchParams();
  const nome = searchParams.get('nome') || 'Cliente';

  useEffect(() => {
    // Facebook Pixel - Purchase Event
    if (typeof window !== 'undefined' && (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as typeof window & { fbq: (...args: unknown[]) => void }).fbq('track', 'Purchase', {
        value: 39.99,
        currency: 'EUR',
        content_name: 'ZEMPBIO Complex 400mg',
        content_type: 'product',
        content_ids: ['zempbio'],
        num_items: 1
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 shadow-sm py-4 px-4">
        <div className="container mx-auto max-w-4xl flex justify-center">
          <div className="flex items-center gap-1">
            <div className="bg-blue-700 text-white p-1 rounded-md font-bold text-lg">ZB</div>
            <span className="font-bold text-xl text-gray-900 uppercase">ZEMPBIO<span className="text-blue-600">™</span></span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto max-w-2xl px-4 py-12 md:py-20">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-emerald-500 text-white p-6 rounded-full shadow-xl">
              <CheckCircle2 size={64} />
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase mb-4">
            Grazie {nome}!
          </h1>
          <p className="text-lg text-gray-600">
            Il tuo ordine di <span className="font-bold text-emerald-600">ZEMPBIO™ Complex 400mg</span> è stato ricevuto con successo.
          </p>
        </div>

        {/* Important Call Notice */}
        <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 text-white p-3 rounded-xl">
              <Phone size={28} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-amber-800 uppercase">Prossimo Passo Importante</h2>
            </div>
          </div>
          <div className="space-y-4 text-amber-900">
            <p className="text-base md:text-lg font-medium">
              <strong>{nome}</strong>, un nostro <strong>consulente esperto</strong> ti chiamerà a breve per:
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Confermare i dati</strong> del tuo ordine</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Suggerirti la corretta somministrazione</strong> in base alle tue esigenze</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Rispondere a qualsiasi domanda</strong> tu possa avere sul prodotto</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Warning Box */}
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-red-500 text-white p-2 rounded-lg shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-red-700 font-bold text-base md:text-lg uppercase mb-2">
                Rispondi alla Chiamata!
              </p>
              <p className="text-red-600 text-sm md:text-base">
                Il pagamento avviene <strong>in contrassegno alla consegna</strong>.
                Se non rispondi al telefono, <strong>la spedizione non potrà partire</strong> e l'ordine verrà annullato.
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase mb-6 flex items-center gap-2">
            <Package size={20} className="text-blue-600" /> Riepilogo Ordine
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Prodotto</span>
              <span className="font-bold text-gray-900">ZEMPBIO™ Complex 400mg</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Quantità</span>
              <span className="font-bold text-gray-900">30 compresse</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Spedizione</span>
              <span className="font-bold text-emerald-600">GRATIS</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Pagamento</span>
              <span className="font-bold text-gray-900">Contrassegno</span>
            </div>
            <div className="flex justify-between items-center py-4 bg-emerald-50 rounded-xl px-4 -mx-4 mt-4">
              <span className="font-bold text-gray-900 uppercase">Totale da Pagare</span>
              <span className="font-bold text-2xl text-emerald-600">€39,99</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase mb-6 flex items-center gap-2">
            <Clock size={20} className="text-blue-600" /> Cosa Succede Ora?
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
              </div>
              <div className="pb-6">
                <p className="font-bold text-gray-900">Chiamata di Conferma</p>
                <p className="text-gray-600 text-sm">Riceverai una chiamata entro poche ore</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
              </div>
              <div className="pb-6">
                <p className="font-bold text-gray-900">Preparazione Spedizione</p>
                <p className="text-gray-600 text-sm">Dopo la conferma, il pacco viene preparato</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              </div>
              <div>
                <p className="font-bold text-gray-900">Consegna in 24/48h</p>
                <p className="text-gray-600 text-sm">Ricevi ZEMPBIO™ e paghi al corriere</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="mt-10 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 font-medium uppercase">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-500" /> Notificato Min. Salute</span>
            <span className="flex items-center gap-1.5"><Package size={14} className="text-blue-500" /> Pacco Anonimo</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-amber-500" /> Garanzia 60 Giorni</span>
          </div>
        </div>
      </main>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Caricamento...</p>
      </div>
    </div>
  );
}

export default function GraziePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <GrazieContent />
    </Suspense>
  );
}
