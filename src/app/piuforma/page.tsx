'use client'

import { memo, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingBag, Star, Check, Package, Truck, Banknote, ShieldCheck,
  Phone, XCircle, Flame, ShieldOff, Zap, ChevronDown, ArrowRight
} from 'lucide-react'

// Lazy loaded image component with placeholder
const LazyImage = memo(({ src, alt, className, fill, sizes }: { src: string; alt: string; className?: string; fill?: boolean; sizes?: string }) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (fill) {
    return (
      <div className={`relative ${className}`}>
        {!loaded && !error && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
        )}
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes || "100vw"}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`object-contain transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
})

LazyImage.displayName = 'LazyImage'

// Star rating component
const StarRating = memo(({ rating = 5, size = 'md' }: { rating?: number; size?: 'sm' | 'md' }) => {
  const sizeClass = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'
  return (
    <div className="flex text-yellow-400">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className={`${sizeClass} fill-current`} />
      ))}
    </div>
  )
})

StarRating.displayName = 'StarRating'

// FAQ Item component
const FAQItem = memo(({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left font-bold text-brand-dark text-lg md:text-xl touch-manipulation"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 text-lg leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  )
})

FAQItem.displayName = 'FAQItem'

// Trust Badge component
const TrustBadge = memo(({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <div className="flex items-center gap-3 text-base md:text-lg text-gray-700 bg-gray-50 rounded-xl p-4">
    <Icon className="w-6 h-6 text-brand-primary flex-shrink-0" />
    <span>{text}</span>
  </div>
))

TrustBadge.displayName = 'TrustBadge'

// Problem card component
const ProblemCard = memo(({ title, description }: { title: string; description: string }) => (
  <div className="flex items-start gap-4 p-5 bg-red-50 rounded-2xl border-l-4 border-red-500">
    <XCircle className="w-7 h-7 text-red-500 flex-shrink-0 mt-0.5" />
    <div>
      <h3 className="font-bold text-brand-dark text-lg">{title}</h3>
      <p className="text-gray-600 text-base mt-1">{description}</p>
    </div>
  </div>
))

ProblemCard.displayName = 'ProblemCard'

// Solution card component
const SolutionCard = memo(({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur rounded-2xl p-6 md:p-8 border border-white/10 text-center">
    <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
      <Icon className="w-8 h-8 md:w-10 md:h-10 text-brand-primary" />
    </div>
    <h3 className="text-xl md:text-2xl font-bold mb-3">{title}</h3>
    <p className="text-gray-300 text-base md:text-lg">{description}</p>
  </div>
))

SolutionCard.displayName = 'SolutionCard'

// Ingredient card component
const IngredientCard = memo(({ emoji, title, description }: { emoji: string; title: string; description: string }) => (
  <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
      <span className="text-3xl">{emoji}</span>
    </div>
    <div>
      <h3 className="font-bold text-brand-dark text-lg md:text-xl">{title}</h3>
      <p className="text-gray-600 text-base mt-1">{description}</p>
    </div>
  </div>
))

IngredientCard.displayName = 'IngredientCard'

// Review card component
const ReviewCard = memo(({ text, name, location, age, image }: {
  text: string; name: string; location: string; age: number; image: string
}) => (
  <div className="bg-gray-50 p-5 md:p-6 rounded-2xl border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <StarRating rating={5} size="sm" />
      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">VERIFICATO</span>
    </div>
    <p className="text-gray-700 mb-5 italic text-base md:text-lg leading-relaxed">&quot;{text}&quot;</p>
    <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
      <img src={image} alt={name} className="w-14 h-14 rounded-full object-cover" />
      <div>
        <p className="font-bold text-brand-dark text-lg">{name}</p>
        <p className="text-sm text-gray-500">{location} · {age} anni</p>
      </div>
    </div>
  </div>
))

ReviewCard.displayName = 'ReviewCard'

// CTA Button component - larger for older users
const CTAButton = memo(({ className = '' }: { className?: string }) => (
  <Link
    href="/checkout-piuforma"
    className={`w-full bg-brand-primary hover:bg-orange-600 active:bg-orange-700 text-white text-xl md:text-2xl font-black py-5 md:py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center flex items-center justify-center gap-3 touch-manipulation min-h-[64px] ${className}`}
  >
    <ShoppingBag className="w-7 h-7" />
    ORDINA ORA – 49,99€
  </Link>
))

CTAButton.displayName = 'CTAButton'

// Main component
export default function PiuFormaLanding() {
  const [activeThumb, setActiveThumb] = useState(0)

  const thumbnails = [
    'https://farmaita.eu/wp-content/uploads/2024/10/Progetto-senza-titolo-2.png',
    'https://farmaita.eu/wp-content/uploads/2024/10/x2.png',
    'https://farmaita.eu/wp-content/uploads/2025/11/Gemini_Generated_Image_e4lxa2e4lxa2e4lx.png'
  ]

  const problems = [
    { title: 'Gonfiore addominale costante', description: 'Ti senti gonfio anche quando mangi poco' },
    { title: 'Fame nervosa incontrollabile', description: 'Soprattutto la sera, senza riuscire a fermarti' },
    { title: 'Bilancia bloccata', description: 'Diete su diete ma il peso non scende' },
    { title: 'Stanchezza cronica', description: 'Zero energia, soprattutto dopo pranzo' }
  ]

  const reviews = [
    {
      text: "In menopausa il mio peso non scendeva mai. Ero disperata. Con +Forma ho finalmente visto dei cambiamenti: meno gonfiore e più energia. Lo consiglio!",
      name: "Elena M.",
      location: "Bologna",
      age: 52,
      image: "https://farmaita.eu/wp-content/uploads/2024/05/Progettosenzatitolo5.jpg"
    },
    {
      text: "Guido il camion tutto il giorno, zero movimento. La pancia era un problema serio. Queste compresse mi hanno aiutato a controllare la fame. I pantaloni ora mi stanno!",
      name: "Luigi R.",
      location: "Milano",
      age: 48,
      image: "https://farmaita.eu/wp-content/uploads/2024/05/Progettosenzatitolo6.jpg"
    },
    {
      text: "Ero scettica, ma visto che si paga alla consegna ho voluto provare. Mi sento più leggera, sgonfia e piena di energia. Lo ricomprerò sicuramente!",
      name: "Valentina S.",
      location: "Roma",
      age: 45,
      image: "https://farmaita.eu/wp-content/uploads/2024/05/Progettosenzatitolo4.jpg"
    }
  ]

  const faqs = [
    { question: "Come si assume +Forma?", answer: "2 compresse al giorno con un bicchiere d'acqua, prima del pasto principale. Semplice e veloce." },
    { question: "Quando arriva il pacco?", answer: "Spediamo in 24 ore. La consegna avviene in 24-48 ore con corriere espresso tracciato." },
    { question: "Devo pagare online?", answer: "No! Paghi in contanti direttamente al corriere quando ricevi il pacco. Non chiediamo carte di credito." },
    { question: "Ha controindicazioni?", answer: "La formula è 100% naturale. Sconsigliato in gravidanza/allattamento. Per patologie specifiche, consulta il medico." }
  ]

  const handleThumbClick = useCallback((index: number) => {
    setActiveThumb(index)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER - Simplified for older users */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <span className="text-2xl md:text-3xl font-black text-brand-primary">+Forma</span>
            <Link
              href="/checkout-piuforma"
              className="bg-brand-primary hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3 px-5 md:py-3 md:px-8 rounded-xl transition-colors flex items-center gap-2 text-base md:text-lg touch-manipulation min-h-[48px]"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Ordina Ora</span>
              <span className="sm:hidden">Ordina</span>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO / PRODUCT SECTION */}
      <section className="py-6 md:py-12 bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

            {/* GALLERY */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-600 text-white text-sm md:text-base font-black px-4 py-2 rounded-xl">-50% OGGI</span>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-green-600 text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-lg">BEST SELLER</span>
                </div>
                <div className="p-6 md:p-8 flex items-center justify-center h-full bg-gradient-to-br from-slate-50 to-white">
                  <img
                    src={thumbnails[activeThumb]}
                    alt="+Forma - Integratore Metabolismo"
                    className="w-full max-w-sm h-auto object-contain drop-shadow-2xl animate-float"
                  />
                </div>
              </div>

              {/* Thumbnails - Larger touch targets */}
              <div className="flex gap-3 justify-center">
                {thumbnails.map((thumb, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbClick(index)}
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-white p-2 transition-all touch-manipulation ${
                      activeThumb === index ? 'border-3 border-brand-primary shadow-lg' : 'border-2 border-gray-200 hover:border-brand-primary'
                    }`}
                    aria-label={`Vedi immagine ${index + 1}`}
                  >
                    <img src={thumb} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="flex flex-col">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1.5 rounded-lg">100% NATURALE</span>
                <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1.5 rounded-lg">MADE IN EU</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark leading-tight mb-4">
                +Forma <span className="text-brand-primary">Metabolismo Attivo</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed">
                La formula che <strong>riattiva il consumo calorico a riposo</strong> dopo i 40 anni.
                Sentiti più leggero, sgonfio e pieno di energia.
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <StarRating rating={5} />
                <span className="text-gray-700 font-bold text-lg">4.8/5</span>
                <span className="text-gray-500">(1.247 recensioni)</span>
              </div>

              {/* Price Box */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-brand-primary/30 rounded-2xl p-5 md:p-6 mb-6">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-gray-400 line-through text-xl md:text-2xl">99,00€</span>
                  <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-lg">RISPARMI 49€</span>
                </div>
                <div className="flex items-baseline gap-2 mb-3 flex-wrap">
                  <span className="text-5xl md:text-6xl font-black text-brand-primary">49,99€</span>
                  <span className="text-gray-500 font-medium text-lg">/ 2 confezioni</span>
                </div>
                <p className="text-brand-dark font-bold flex items-center gap-2 text-base md:text-lg">
                  <Package className="w-6 h-6 text-brand-primary" />
                  Trattamento completo 2 mesi · Spedizione GRATIS
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-6">
                {['Brucia calorie anche a riposo', 'Riduce il senso di fame nervosa', 'Sgonfia la pancia in pochi giorni', 'Più energia durante tutta la giornata'].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium text-base md:text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <CTAButton />

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <TrustBadge icon={Truck} text="Spedizione Gratuita 24h" />
                <TrustBadge icon={Banknote} text="Paghi alla Consegna" />
                <TrustBadge icon={ShieldCheck} text="Ingredienti Naturali" />
                <TrustBadge icon={Phone} text="Assistenza Dedicata" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA / SOLUZIONE */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-brand-dark mb-4">
              Perché dopo i 40 anni <span className="text-red-600">è così difficile dimagrire?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Non è colpa tua. È il tuo metabolismo che rallenta naturalmente con l&apos;età.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://farmaita.eu/wp-content/uploads/2025/11/GetPaidStock.com-691ed90b60ae3.jpg"
                alt="Difficoltà a perdere peso"
                className="rounded-2xl shadow-lg w-full"
                loading="lazy"
              />
            </div>
            <div className="space-y-4">
              {problems.map((problem, i) => (
                <ProblemCard key={i} {...problem} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="py-12 md:py-20 bg-brand-dark text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-brand-primary font-bold text-sm md:text-base uppercase tracking-widest">La Soluzione</span>
            <h2 className="text-2xl md:text-4xl font-black mt-2">
              Come agisce <span className="text-brand-primary">+Forma</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <SolutionCard icon={Flame} title="Riattiva il Metabolismo" description="Stimola il consumo calorico a riposo, anche mentre dormi." />
            <SolutionCard icon={ShieldOff} title="Blocca la Fame" description="Riduce il senso di fame nervosa e gli attacchi serali." />
            <SolutionCard icon={Zap} title="Energia Naturale" description="Più vitalità durante il giorno senza nervosismo." />
          </div>
        </div>
      </section>

      {/* INGREDIENTI */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-brand-dark">
              Ingredienti <span className="text-brand-primary">100% Naturali</span>
            </h2>
            <p className="text-gray-600 mt-3 text-lg">Formula premium con estratti vegetali ad alta concentrazione</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <IngredientCard emoji="🍓" title="Chetone di Lampone" description="Stimola la termogenesi e il consumo dei grassi" />
            <IngredientCard emoji="🍋" title="Garcinia Cambogia" description="Controlla il senso di fame e blocca i grassi" />
            <IngredientCard emoji="🍵" title="Tè Verde Matcha" description="Accelera il metabolismo basale naturalmente" />
            <IngredientCard emoji="💎" title="Cromo Picolinato" description="Stabilizza la glicemia e riduce la voglia di dolci" />
          </div>
        </div>
      </section>

      {/* RECENSIONI */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-brand-dark">
              Cosa dicono i nostri <span className="text-brand-primary">clienti</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
              <StarRating rating={5} />
              <span className="text-gray-600 text-lg">4.8/5 su 1.247 recensioni verificate</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <ReviewCard key={i} {...review} />
            ))}
          </div>

          {/* Result images */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {[
              'https://farmaita.eu/wp-content/uploads/2024/05/Schermata-2022-12-14-alle-16.20.18.webp',
              'https://farmaita.eu/wp-content/uploads/2024/05/Schermata-2022-12-14-alle-16.20.12.webp',
              'https://farmaita.eu/wp-content/uploads/2024/05/Schermata-2022-12-14-alle-16.20.03.webp',
              'https://farmaita.eu/wp-content/uploads/2024/02/cqMWe6GDu.jpg',
              'https://farmaita.eu/wp-content/uploads/2024/02/rhzWId6cz.jpg'
            ].map((img, i) => (
              <img key={i} src={img} alt="Risultato" className="w-24 h-32 md:w-28 md:h-36 object-cover rounded-xl border border-gray-200" loading="lazy" />
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            *I risultati possono variare da persona a persona. Le immagini rappresentano esperienze individuali.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center text-brand-dark mb-10">
            Domande Frequenti
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-brand-primary to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-4">
            Pronto a sentirti finalmente in forma?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Approfitta dell&apos;offerta 2x1 a soli 49,99€ · Spedizione GRATIS · Paghi alla consegna
          </p>
          <Link
            href="/checkout-piuforma"
            className="inline-flex items-center gap-3 bg-white text-brand-primary text-xl md:text-2xl font-black py-5 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 touch-manipulation min-h-[64px]"
          >
            <ShoppingBag className="w-7 h-7" />
            ORDINA ORA
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-dark text-gray-400 py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-white font-bold text-2xl mb-4">+Forma</p>
          <p className="text-base max-w-2xl mx-auto mb-6 leading-relaxed">
            Integratore alimentare. I risultati possono variare da persona a persona.
            Non è un medicinale. Da utilizzare nell&apos;ambito di una dieta equilibrata e uno stile di vita sano.
            Non usare in gravidanza/allattamento. Per patologie, consultare il medico.
          </p>
          <div className="flex justify-center gap-6 text-base mb-6 flex-wrap">
            <a href="#" className="hover:text-white py-2 px-3 touch-manipulation">Privacy Policy</a>
            <a href="#" className="hover:text-white py-2 px-3 touch-manipulation">Termini e Condizioni</a>
            <a href="#" className="hover:text-white py-2 px-3 touch-manipulation">Contatti</a>
          </div>
          <p className="text-sm opacity-50">© 2025 +Forma Italia. Tutti i diritti riservati.</p>
        </div>
      </footer>

      {/* MOBILE STICKY CTA - Extra large for older users */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl p-3 z-50 md:hidden safe-area-inset-bottom">
        <Link
          href="/checkout-piuforma"
          className="flex items-center justify-between bg-brand-primary text-white rounded-xl p-4 touch-manipulation min-h-[64px]"
        >
          <div>
            <p className="text-sm opacity-90">Offerta 2x1</p>
            <p className="text-2xl font-black">49,99€</p>
          </div>
          <div className="flex items-center gap-2 font-bold text-lg">
            ORDINA <ArrowRight className="w-6 h-6" />
          </div>
        </Link>
      </div>

      {/* Bottom padding for sticky CTA on mobile */}
      <div className="h-24 md:hidden" />
    </div>
  )
}
