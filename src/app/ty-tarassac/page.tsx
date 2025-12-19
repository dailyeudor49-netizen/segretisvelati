'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Check, Package, Phone, Truck, Clock, Mail, MapPin,
  ShieldCheck, Banknote, Home, ChevronRight, Leaf, Zap,
  Heart, Star, MessageCircle, HelpCircle
} from 'lucide-react'

export default function ThankYouPage() {
  const [customerName, setCustomerName] = useState('')
  const [orderPrice, setOrderPrice] = useState('59,99')

  useEffect(() => {
    // Get customer data from sessionStorage (set during checkout)
    const storedName = sessionStorage.getItem('customer_name')
    const storedPrice = sessionStorage.getItem('order_price')

    if (storedName) setCustomerName(storedName)
    if (storedPrice) setOrderPrice(storedPrice)

    // Also check URL parameters as fallback
    const params = new URLSearchParams(window.location.search)
    const urlName = params.get('name')
    const urlPrice = params.get('price')

    if (urlName) setCustomerName(urlName)
    if (urlPrice) setOrderPrice(urlPrice)

    // Facebook Pixel - Purchase Event
    if (typeof window !== 'undefined' && (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as typeof window & { fbq: (...args: unknown[]) => void }).fbq('track', 'Purchase', {
        value: 59.99,
        currency: 'EUR',
        content_name: 'Tarassac Slim',
        content_type: 'product',
        content_ids: ['tarassac-slim'],
        num_items: 2
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black text-red-600">Tarassac Slim</span>
              <span className="text-xs text-gray-400 border-l border-gray-300 pl-2 hidden sm:inline">Shop Ufficiale</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span className="hidden sm:inline">Ordine Confermato</span>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-red-600 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/tarassac-feg" className="hover:text-red-600">Tarassac Slim</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-green-600 font-medium">Ordine Confermato</span>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">

        {/* SUCCESS BANNER */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-8 md:p-10 text-center shadow-xl mb-8 animate-fade-in">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Check className="w-12 h-12 text-green-500" strokeWidth={3} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3">
            Ordine Confermato!
          </h1>
          <p className="text-lg md:text-xl opacity-95">
            {customerName ? (
              <>Grazie <strong>{customerName}</strong>! Il tuo ordine di <strong>Tarassac Slim</strong> e stato ricevuto con successo</>
            ) : (
              <>Il tuo ordine di <strong>Tarassac Slim</strong> e stato ricevuto con successo</>
            )}
          </p>
        </div>

        {/* PHONE ALERT */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-300 rounded-2xl p-6 md:p-8 mb-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 animate-pulse" />
          <Phone className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            Tieni il telefono a portata di mano!
          </h2>
          <p className="text-lg text-gray-700 font-medium mb-3">
            Un nostro operatore ti chiamera nei prossimi minuti
          </p>
          <p className="text-gray-600">
            Assicurati che il telefono sia acceso e con la suoneria attiva.<br />
            La conferma del tuo ordine sara rapida e semplice.
          </p>
        </div>

        {/* ORDER DETAILS */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <Package className="w-7 h-7 text-red-600" />
            Riepilogo del tuo Ordine
          </h2>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-24 h-24 bg-white rounded-xl p-2 border border-gray-200 flex-shrink-0">
              <img
                src="/images/TARASSIC/Tarassic1.png"
                alt="Tarassac Slim"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-gray-900 text-lg md:text-xl">Tarassac Slim - Formula Avanzata</h3>
              <p className="text-gray-500">2 Confezioni - Trattamento 2 mesi</p>
              <div className="flex items-center gap-3 mt-2 justify-center sm:justify-start">
                <span className="text-gray-400 line-through">119,98</span>
                <span className="text-3xl font-black text-green-600">{orderPrice}</span>
              </div>
              <p className="text-green-600 font-medium text-sm mt-1 flex items-center gap-1 justify-center sm:justify-start">
                <Check className="w-4 h-4" /> Offerta 2x1 applicata
              </p>
            </div>
          </div>

          {/* Order info */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <Truck className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-bold text-gray-900">Spedizione Gratuita</p>
                <p className="text-sm text-gray-500">Consegna in 24-48h</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <Banknote className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-bold text-gray-900">Pagamento alla Consegna</p>
                <p className="text-sm text-gray-500">In contanti al corriere</p>
              </div>
            </div>
          </div>
        </div>

        {/* WHAT HAPPENS NEXT - Timeline */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <Clock className="w-7 h-7 text-red-600" />
            Cosa Succede Adesso?
          </h2>

          <div className="relative pl-8 space-y-8">
            {/* Timeline line */}
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-green-500 via-red-600 to-gray-200" />

            {/* Step 1 - Active */}
            <div className="relative">
              <div className="absolute -left-8 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ring-4 ring-green-100">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h3 className="font-bold text-green-700 text-lg">Chiamata di Conferma (prossimi minuti)</h3>
                <p className="text-gray-600 mt-1">
                  Un operatore ti contattera per confermare l&apos;ordine e i dati di spedizione.
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded ml-1 font-medium text-sm">Tieni il telefono vicino!</span>
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-8 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center ring-4 ring-red-100">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Preparazione Spedizione (24h)</h3>
                <p className="text-gray-600 mt-1">
                  Dopo la conferma, prepariamo il tuo Tarassac Slim con cura per la spedizione.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-8 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center ring-4 ring-gray-100">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Consegna a Casa Tua (24-48h)</h3>
                <p className="text-gray-600 mt-1">
                  Ricevi il pacco direttamente a casa. Paghi {orderPrice} in contanti al corriere.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="absolute -left-8 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center ring-4 ring-gray-100">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Inizia il tuo Percorso!</h3>
                <p className="text-gray-600 mt-1">
                  Prendi Tarassac Slim quotidianamente e inizia a sentire la differenza sul tuo metabolismo e fegato.
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-8">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-1/4 bg-gradient-to-r from-green-500 to-red-600 rounded-full animate-pulse" />
            </div>
            <p className="text-center text-green-600 font-medium mt-3">
              Il tuo ordine e in elaborazione...
            </p>
          </div>
        </div>

        {/* WHY TARASSAC SLIM */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <Star className="w-7 h-7 text-yellow-500" />
            Perche Hai Scelto Tarassac Slim
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
              <Leaf className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Depura il Fegato</h3>
              <p className="text-sm text-gray-600">Libera il fegato dalle tossine accumulate</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
              <Zap className="w-10 h-10 text-red-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Attiva il Metabolismo</h3>
              <p className="text-sm text-gray-600">Riattiva lo switch metabolico naturale</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
              <ShieldCheck className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">100% Naturale</h3>
              <p className="text-sm text-gray-600">Inulina da Tarassaco Concentrato</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
              <Heart className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Sgonfia in 48h</h3>
              <p className="text-sm text-gray-600">Risultati visibili in pochi giorni</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-red-600" />
            Domande Frequenti
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-green-500">
              <h3 className="font-bold text-gray-900 mb-2">Quando ricevero la chiamata?</h3>
              <p className="text-gray-600">
                Il nostro team ti contattera entro <strong>30 minuti</strong> durante l&apos;orario lavorativo (9:00 - 20:00).
                Se non sei raggiungibile, riproveremo piu volte.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-green-500">
              <h3 className="font-bold text-gray-900 mb-2">E se non riesco a rispondere?</h3>
              <p className="text-gray-600">
                Nessun problema! Riproveremo a chiamarti. Puoi anche contattarci direttamente al numero indicato sotto.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-green-500">
              <h3 className="font-bold text-gray-900 mb-2">Quando ricevero Tarassac Slim?</h3>
              <p className="text-gray-600">
                Dopo la conferma telefonica, la consegna avviene in <strong>24-48 ore</strong> con corriere espresso tracciato.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-green-500">
              <h3 className="font-bold text-gray-900 mb-2">Quanto paghero esattamente?</h3>
              <p className="text-gray-600">
                Il prezzo finale e <strong>{orderPrice}</strong> (spedizione inclusa). Paghi in contanti al corriere alla consegna.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-green-500">
              <h3 className="font-bold text-gray-900 mb-2">Posso modificare o annullare l&apos;ordine?</h3>
              <p className="text-gray-600">
                Si, puoi farlo durante la chiamata di conferma oppure contattando il nostro servizio clienti.
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 mb-8 text-center border border-blue-200">
          <h2 className="text-xl font-black text-blue-800 mb-4 flex items-center justify-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Hai bisogno di assistenza?
          </h2>
          <div className="space-y-3 text-gray-700">
            <p className="flex items-center justify-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <strong>Telefono:</strong> Lun-Ven 9:00-20:00
            </p>
            <p className="flex items-center justify-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <strong>Email:</strong> <a href="mailto:assistenza@segretisvelati.com" className="text-blue-600 hover:underline">assistenza@segretisvelati.com</a>
            </p>
          </div>
        </div>

        {/* THANK YOU MESSAGE */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 text-center border border-green-200">
          <h2 className="text-2xl font-black text-green-700 mb-3">
            Grazie per la tua fiducia!
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Stai per iniziare il tuo percorso verso un metabolismo attivo e un fegato depurato.<br />
            Il nostro team e pronto ad assisterti in ogni momento.
          </p>
          <p className="text-green-600 font-bold text-lg">
            A presto al telefono!
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white font-bold text-xl mb-2">Tarassac Slim</p>
          <p className="text-sm mb-3">Il tuo alleato naturale per depurare il fegato e riattivare il metabolismo</p>
          <p className="text-xs text-gray-500 mb-3">
            <strong className="text-gray-400">Segreti Svelati S.r.l.</strong> - P.IVA IT12345678901 - Via Roma 123, 20121 Milano (MI)
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 mb-4">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/termini-condizioni" className="hover:text-white">Termini e Condizioni</Link>
            <Link href="/cookie-policy" className="hover:text-white">Cookie Policy</Link>
          </div>
          <p className="text-[10px] text-gray-600 max-w-2xl mx-auto">
            Integratore alimentare. I risultati possono variare. Non e un medicinale.
            Questo sito non e parte di Facebook o Facebook Inc. FACEBOOK e un marchio registrato di FACEBOOK, Inc.
          </p>
          <p className="text-xs text-gray-600 mt-3">
            2025 Segreti Svelati S.r.l. - Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  )
}
