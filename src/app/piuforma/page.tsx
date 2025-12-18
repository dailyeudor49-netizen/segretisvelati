'use client'

import { memo, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingBag, Star, Check, Package, Truck, Banknote, ShieldCheck,
  Phone, XCircle, Flame, ShieldOff, Zap, ChevronDown, ArrowRight,
  Menu, X, Home, ChevronRight, Clock, AlertCircle, Minus, Plus,
  CreditCard, Lock, Award, MessageCircle, Mail, MapPin
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

// Review card component - Enhanced version
const ReviewCard = memo(({ text, name, location, age, image, highlight }: {
  text: string; name: string; location: string; age: number; image: string; highlight?: string
}) => (
  <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border-2 border-gray-100 hover:shadow-xl transition-shadow">
    {/* Highlight badge */}
    {highlight && (
      <div className="mb-4">
        <span className="bg-gradient-to-r from-brand-primary to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full">
          ✨ {highlight}
        </span>
      </div>
    )}

    {/* Stars and verified */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-6 h-6 fill-current" />
        ))}
      </div>
      <span className="text-sm bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-bold flex items-center gap-1">
        <Check className="w-4 h-4" /> VERIFICATO
      </span>
    </div>

    {/* Review text */}
    <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">&quot;{text}&quot;</p>

    {/* Author */}
    <div className="flex items-center gap-4 pt-5 border-t-2 border-gray-100">
      <img src={image} alt={name} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-brand-primary/20" />
      <div>
        <p className="font-black text-brand-dark text-lg md:text-xl">{name}</p>
        <p className="text-base text-gray-500">{location} · {age} anni</p>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      text: "In menopausa il mio peso non scendeva mai. Ero disperata. Con +Forma ho finalmente visto dei cambiamenti: meno gonfiore e più energia. Lo consiglio a tutte le donne over 50!",
      name: "Elena M.",
      location: "Bologna",
      age: 52,
      image: "https://farmaita.eu/wp-content/uploads/2024/05/Progettosenzatitolo5.jpg",
      highlight: "Ho perso 2 taglie in 2 mesi"
    },
    {
      text: "Guido il camion tutto il giorno, zero movimento. La pancia era un problema serio. Queste compresse mi hanno aiutato a controllare la fame. I pantaloni ora mi stanno! Mia moglie non ci credeva.",
      name: "Luigi R.",
      location: "Milano",
      age: 48,
      image: "https://farmaita.eu/wp-content/uploads/2024/05/Progettosenzatitolo6.jpg",
      highlight: "La pancia è sparita"
    },
    {
      text: "Ero scettica, ma visto che si paga alla consegna ho voluto provare. Mi sento più leggera, sgonfia e piena di energia. Lo ricomprerò sicuramente! Ora lo consiglio a tutte le mie amiche.",
      name: "Valentina S.",
      location: "Roma",
      age: 45,
      image: "https://farmaita.eu/wp-content/uploads/2024/05/Progettosenzatitolo4.jpg",
      highlight: "Finalmente mi sento bene"
    }
  ]

  const resultsCarousel = [
    { image: 'https://farmaita.eu/wp-content/uploads/2024/05/Schermata-2022-12-14-alle-16.20.18.webp', kg: '-17 KG' },
    { image: 'https://farmaita.eu/wp-content/uploads/2024/05/Schermata-2022-12-14-alle-16.20.12.webp', kg: '-35 KG' },
    { image: 'https://farmaita.eu/wp-content/uploads/2024/05/Schermata-2022-12-14-alle-16.20.03.webp', kg: '-12 KG' },
    { image: 'https://farmaita.eu/wp-content/uploads/2024/02/cqMWe6GDu.jpg', kg: '-30 KG' },
    { image: 'https://farmaita.eu/wp-content/uploads/2024/02/rhzWId6cz.jpg', kg: '-18 KG' },
    { image: 'https://farmaita.eu/wp-content/uploads/2024/02/3LobcIGGO.jpg', kg: '-14 KG' },
    { image: 'https://farmaita.eu/wp-content/uploads/2024/02/Uzqv3iZXc.jpg', kg: '-7 KG' },
    { image: 'https://farmaita.eu/wp-content/uploads/2024/02/Xp9zJIWvX.jpg', kg: '-16 KG' }
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
      {/* TOP BAR - Spedizione gratuita */}
      <div className="bg-brand-dark text-white py-2 text-center text-sm md:text-base">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
          <Truck className="w-4 h-4 text-brand-primary" />
          <span><strong>Spedizione GRATUITA</strong> in tutta Italia · Consegna in 24-48h</span>
        </div>
      </div>

      {/* HEADER - Ecommerce style */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-black text-brand-primary">+Forma</span>
              <span className="hidden md:inline text-xs text-gray-400 border-l border-gray-300 pl-2">Shop Ufficiale</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-600 hover:text-brand-primary font-medium transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" /> Home
              </Link>
              <Link href="/prodotti" className="text-gray-600 hover:text-brand-primary font-medium transition-colors">
                Prodotti
              </Link>
              <Link href="#recensioni" className="text-gray-600 hover:text-brand-primary font-medium transition-colors">
                Recensioni
              </Link>
              <Link href="#faq" className="text-gray-600 hover:text-brand-primary font-medium transition-colors">
                FAQ
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Phone - desktop only */}
              <a href="tel:+390000000000" className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-brand-primary transition-colors">
                <Phone className="w-5 h-5" />
                <span className="text-sm font-medium">Assistenza</span>
              </a>

              {/* Cart/Order button */}
              <Link
                href="/checkout-piuforma"
                className="bg-brand-primary hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-2.5 px-4 md:py-3 md:px-6 rounded-xl transition-colors flex items-center gap-2 text-sm md:text-base touch-manipulation"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden sm:inline">Ordina Ora</span>
                <span className="sm:hidden">Ordina</span>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-brand-primary touch-manipulation"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4 space-y-2">
              <Link href="/" className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">Home</Link>
              <Link href="/prodotti" className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">Prodotti</Link>
              <Link href="#recensioni" className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">Recensioni</Link>
              <Link href="#faq" className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">FAQ</Link>
              <a href="tel:+390000000000" className="block py-3 px-4 text-brand-primary hover:bg-orange-50 rounded-lg font-medium flex items-center gap-2">
                <Phone className="w-5 h-5" /> Chiama Assistenza
              </a>
            </div>
          )}
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand-primary flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/prodotti" className="hover:text-brand-primary">Integratori</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-brand-dark font-medium">+Forma Metabolismo Attivo</span>
          </nav>
        </div>
      </div>

      {/* HERO / PRODUCT SECTION - Ecommerce Style */}
      <section className="py-6 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">

            {/* GALLERY - Ecommerce style with side thumbnails */}
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails - Vertical on desktop */}
              <div className="flex md:flex-col gap-2 md:gap-3 justify-center md:justify-start">
                {thumbnails.map((thumb, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbClick(index)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-white p-1.5 transition-all touch-manipulation border-2 ${
                      activeThumb === index
                        ? 'border-brand-primary shadow-md ring-2 ring-brand-primary/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    aria-label={`Vedi immagine ${index + 1}`}
                  >
                    <img src={thumb} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="flex-1 relative">
                <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 overflow-hidden group">
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    <span className="bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-md shadow-sm">
                      -50%
                    </span>
                    <span className="bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm">
                      OFFERTA 2x1
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                      <Check className="w-3 h-3" /> IN STOCK
                    </span>
                  </div>

                  {/* Image container with hover zoom effect */}
                  <div className="p-8 md:p-12 flex items-center justify-center h-full cursor-zoom-in">
                    <img
                      src={thumbnails[activeThumb]}
                      alt="+Forma - Integratore Metabolismo"
                      className="w-full max-w-xs md:max-w-sm h-auto object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Zoom hint */}
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    Zoom
                  </div>
                </div>

                {/* Image counter */}
                <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {activeThumb + 1} / {thumbnails.length}
                </div>
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="flex flex-col">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1.5 rounded-lg">100% NATURALE</span>
                <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1.5 rounded-lg">MADE IN EU</span>
                <span className="bg-purple-100 text-purple-700 text-sm font-bold px-3 py-1.5 rounded-lg">BEST SELLER 2024</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark leading-tight mb-4">
                +Forma <span className="text-brand-primary">Metabolismo Attivo</span>
              </h1>

              {/* Marketing subtitle */}
              <p className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed">
                La formula che <strong>riattiva il consumo calorico a riposo</strong> dopo i 40 anni.
                Sentiti più leggero, sgonfio e pieno di energia.
              </p>

              {/* Rating row */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100 flex-wrap">
                <StarRating rating={5} />
                <span className="text-gray-700 font-bold text-lg">4.8/5</span>
                <Link href="#recensioni" className="text-brand-primary hover:underline">(1.247 recensioni)</Link>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="text-sm text-green-600 font-medium">2.500+ venduti</span>
              </div>

              {/* Stock indicator */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Disponibile
                </span>
                <span className="flex items-center gap-1.5 text-orange-600 font-medium text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Solo 12 pezzi rimasti!
                </span>
                <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <Clock className="w-4 h-4" />
                  Ordina entro 2h per spedizione oggi
                </span>
              </div>

              {/* Price card - Ecommerce style */}
              <div className="bg-gray-50 rounded-xl p-5 mb-5 border border-gray-200">
                {/* Price row */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-400 line-through text-lg">99,00€</span>
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">-50%</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-black text-brand-primary">49,99€</span>
                      <span className="text-gray-500 font-medium">/ 2 confezioni</span>
                    </div>
                    <p className="text-sm text-green-600 font-medium mt-1">Risparmi 49,01€</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-xs text-gray-500">Prezzo per unità</span>
                    <p className="text-lg font-bold text-gray-700">24,99€</p>
                  </div>
                </div>

                {/* What's included */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">La tua offerta include:</p>
                  <div className="flex items-center gap-3">
                    <img src="https://farmaita.eu/wp-content/uploads/2024/10/Progetto-senza-titolo-2.png" alt="" className="w-14 h-14 object-contain" />
                    <div>
                      <p className="font-bold text-brand-dark text-lg">2x +Forma Metabolismo</p>
                      <p className="text-sm text-gray-500">Trattamento completo 2 mesi (120 compresse)</p>
                    </div>
                  </div>
                </div>

                {/* Shipping info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    <Truck className="w-5 h-5" />
                    <span className="font-bold">Spedizione GRATUITA</span>
                    <span className="text-gray-500">· Consegna in 24-48h</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Banknote className="w-5 h-5 text-green-600" />
                    <span>Pagamento alla consegna (contrassegno)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package className="w-5 h-5 text-blue-500" />
                    <span>Pacco anonimo e discreto</span>
                  </div>
                </div>
              </div>

              {/* Quantity selector - Locked at 2 */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200 mb-5">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-bold">Quantità:</span>
                  <div className="flex items-center border-2 border-gray-300 rounded-xl bg-gray-100">
                    <button
                      disabled
                      className="p-3 text-gray-300 cursor-not-allowed rounded-l-xl"
                      aria-label="Diminuisci quantità"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-6 py-3 font-bold text-xl text-brand-dark bg-white min-w-[60px] text-center">2</span>
                    <button
                      disabled
                      className="p-3 text-gray-300 cursor-not-allowed rounded-r-xl"
                      aria-label="Aumenta quantità"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-orange-700 text-sm font-bold">
                  <Lock className="w-4 h-4" />
                  Offerta valida solo per 2 conf.
                </div>
              </div>

              {/* Benefits - Original marketing text */}
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

              {/* Trust row under CTA */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-4 py-3 border-t border-b border-gray-100">
                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Lock className="w-4 h-4 text-green-600" /> Checkout sicuro
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> Garanzia qualità
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-brand-primary" /> Spedizione express
                </span>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <TrustBadge icon={Truck} text="Spedizione Gratuita 24h" />
                <TrustBadge icon={Banknote} text="Paghi alla Consegna" />
                <TrustBadge icon={ShieldCheck} text="Ingredienti Naturali" />
                <TrustBadge icon={Phone} text="Assistenza Dedicata" />
              </div>

              {/* Payment badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-400 text-center mb-3">Metodo di pagamento accettato</p>
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2">
                    <Banknote className="w-6 h-6 text-green-600" />
                    <span className="text-sm font-bold text-gray-700">Contrassegno</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" /> Pagamento sicuro alla consegna
                </p>
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

      {/* INGREDIENTI - Enhanced Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-green-50 via-white to-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 font-bold px-4 py-2 rounded-full text-sm uppercase tracking-wide mb-4">
              <ShieldCheck className="w-4 h-4" /> Formula Certificata
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark">
              Ingredienti <span className="text-green-600">100% Naturali</span>
            </h2>
            <p className="text-gray-600 mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              Ogni compressa contiene estratti vegetali premium ad alta concentrazione, senza additivi chimici
            </p>
          </div>

          {/* Trust badges row */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            <span className="bg-white border-2 border-green-200 text-green-700 font-bold px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-sm">
              <Check className="w-4 h-4" /> Senza OGM
            </span>
            <span className="bg-white border-2 border-green-200 text-green-700 font-bold px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-sm">
              <Check className="w-4 h-4" /> Vegano
            </span>
            <span className="bg-white border-2 border-green-200 text-green-700 font-bold px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-sm">
              <Check className="w-4 h-4" /> Senza Glutine
            </span>
            <span className="bg-white border-2 border-green-200 text-green-700 font-bold px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-sm">
              <Check className="w-4 h-4" /> Made in EU
            </span>
          </div>

          {/* Main ingredients grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Ingredient 1 */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-shadow group">
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <span className="text-5xl md:text-6xl">🍓</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-brand-dark text-xl md:text-2xl mb-2">Chetone di Lampone</h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-3">
                    Attiva la termogenesi naturale, aiutando il corpo a bruciare i grassi anche a riposo.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-red-600">
                    <Flame className="w-4 h-4" /> Brucia grassi naturale
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredient 2 */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-shadow group">
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <span className="text-5xl md:text-6xl">🍋</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-brand-dark text-xl md:text-2xl mb-2">Garcinia Cambogia</h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-3">
                    Riduce l'appetito e blocca la formazione di nuovi grassi grazie all'acido idrossicitrico (HCA).
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-orange-600">
                    <ShieldOff className="w-4 h-4" /> Blocca la fame nervosa
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredient 3 */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-shadow group">
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <span className="text-5xl md:text-6xl">🍵</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-brand-dark text-xl md:text-2xl mb-2">Tè Verde Matcha</h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-3">
                    Ricco di catechine e antiossidanti, accelera il metabolismo basale fino al 17%.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-green-600">
                    <Zap className="w-4 h-4" /> +17% metabolismo
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredient 4 */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-shadow group">
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <span className="text-5xl md:text-6xl">💎</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-brand-dark text-xl md:text-2xl mb-2">Cromo Picolinato</h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-3">
                    Stabilizza i livelli di zucchero nel sangue, eliminando le voglie di dolci e carboidrati.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-600">
                    <Check className="w-4 h-4" /> Stop voglie di dolci
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA box */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-6 md:p-10 text-white text-center shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="text-2xl md:text-3xl font-black mb-2">Formula Clinicamente Testata</h3>
                <p className="text-green-100 text-base md:text-lg">
                  Ogni ingrediente è selezionato per la massima efficacia e sicurezza
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="bg-white/20 backdrop-blur px-4 py-3 rounded-xl text-center">
                  <div className="text-2xl md:text-3xl font-black">4</div>
                  <div className="text-xs md:text-sm text-green-100">Ingredienti attivi</div>
                </div>
                <div className="bg-white/20 backdrop-blur px-4 py-3 rounded-xl text-center">
                  <div className="text-2xl md:text-3xl font-black">0</div>
                  <div className="text-xs md:text-sm text-green-100">Additivi chimici</div>
                </div>
                <div className="bg-white/20 backdrop-blur px-4 py-3 rounded-xl text-center">
                  <div className="text-2xl md:text-3xl font-black">100%</div>
                  <div className="text-xs md:text-sm text-green-100">Naturale</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENSIONI */}
      <section id="recensioni" className="py-16 md:py-24 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="bg-brand-primary/10 text-brand-primary font-bold px-4 py-2 rounded-full text-sm uppercase tracking-wide">
              Testimonianze Reali
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mt-4">
              Oltre <span className="text-brand-primary">1.247 Clienti</span> Soddisfatti
            </h2>
            <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 fill-current" />
                ))}
              </div>
              <span className="text-gray-700 text-xl font-bold">4.8/5</span>
              <span className="text-gray-500 text-lg">recensioni verificate</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-md">
              <div className="text-3xl md:text-4xl font-black text-brand-primary">97%</div>
              <div className="text-sm md:text-base text-gray-600 mt-1">Clienti soddisfatti</div>
            </div>
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-md">
              <div className="text-3xl md:text-4xl font-black text-brand-primary">-4kg</div>
              <div className="text-sm md:text-base text-gray-600 mt-1">Media in 30 giorni</div>
            </div>
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-md">
              <div className="text-3xl md:text-4xl font-black text-brand-primary">89%</div>
              <div className="text-sm md:text-base text-gray-600 mt-1">Riacquistano</div>
            </div>
          </div>

          {/* Reviews Grid - 3 columns on desktop */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {reviews.map((review, i) => (
              <ReviewCard key={i} {...review} />
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-8">
            *I risultati possono variare da persona a persona.
          </p>
        </div>
      </section>

      {/* RESULTS CAROUSEL */}
      <section className="py-16 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 mb-10 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-brand-dark uppercase">
            Risultati Reali, Persone Reali
          </h2>
          <p className="text-gray-500 mt-3 text-lg">Nessun fotoritocco. Solo costanza e +Forma.</p>
        </div>

        {/* Scrolling carousel */}
        <div className="relative w-full mb-10">
          {/* Fade gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Carousel track */}
          <div className="flex w-max animate-scroll-right hover:[animation-play-state:paused]">
            {/* Duplicate images for infinite scroll */}
            {[...resultsCarousel, ...resultsCarousel].map((item, i) => (
              <div key={i} className="w-[180px] md:w-[260px] px-3 flex-shrink-0">
                <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-gray-100 aspect-[3/4] group">
                  <img
                    src={item.image}
                    alt="Risultato Cliente"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur text-brand-dark text-xs font-bold px-3 py-2 rounded flex items-center justify-between shadow-sm">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-blue-500" /> Verificato
                    </span>
                    <span className="text-brand-primary font-black">{item.kg}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center px-4">
          <Link
            href="/checkout-piuforma"
            className="bg-brand-primary hover:bg-orange-600 text-white text-lg md:text-xl font-black py-4 px-10 md:px-12 rounded-full shadow-lg hover:shadow-xl transition-all uppercase inline-flex items-center gap-2 justify-center"
          >
            VOGLIO OTTENERE GLI STESSI RISULTATI
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* SPESSO COMPRATI INSIEME */}
      <section className="py-12 md:py-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-brand-dark">
              Spesso Comprati Insieme
            </h2>
            <p className="text-gray-500 mt-2">I nostri clienti hanno acquistato anche</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Product 1 - Main product */}
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-brand-primary relative">
              <span className="absolute -top-3 left-4 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                STAI ACQUISTANDO
              </span>
              <div className="w-32 h-32 mx-auto mb-4">
                <img
                  src="https://farmaita.eu/wp-content/uploads/2024/10/Progetto-senza-titolo-2.png"
                  alt="+Forma"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-brand-dark text-center">+Forma Metabolismo</h3>
              <p className="text-sm text-gray-500 text-center">2 Confezioni</p>
              <p className="text-2xl font-black text-brand-primary text-center mt-2">49,99€</p>
            </div>

            {/* Product 2 - Related */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand-primary hover:shadow-lg transition-all cursor-pointer group">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-5xl">🍵</span>
              </div>
              <h3 className="font-bold text-brand-dark text-center group-hover:text-brand-primary transition-colors">Tè Detox Premium</h3>
              <p className="text-sm text-gray-500 text-center">30 bustine</p>
              <p className="text-xl font-black text-gray-400 text-center mt-2">19,99€</p>
              <p className="text-xs text-center text-gray-400 mt-1">Prossimamente</p>
            </div>

            {/* Product 3 - Related */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand-primary hover:shadow-lg transition-all cursor-pointer group">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-5xl">💊</span>
              </div>
              <h3 className="font-bold text-brand-dark text-center group-hover:text-brand-primary transition-colors">Probiotici Plus</h3>
              <p className="text-sm text-gray-500 text-center">60 capsule</p>
              <p className="text-xl font-black text-gray-400 text-center mt-2">29,99€</p>
              <p className="text-xs text-center text-gray-400 mt-1">Prossimamente</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 md:py-20 bg-gray-50">
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

      {/* FOOTER - Ecommerce style */}
      <footer className="bg-brand-dark text-gray-400">
        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Column 1 - Brand */}
            <div className="col-span-2 md:col-span-1">
              <p className="text-white font-black text-2xl mb-4">+Forma</p>
              <p className="text-sm leading-relaxed mb-4">
                Il tuo alleato naturale per ritrovare energia e forma fisica dopo i 40 anni.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-5 h-5 text-brand-primary" />
                <span>Shop Ufficiale Italiano</span>
              </div>
            </div>

            {/* Column 2 - Shop */}
            <div>
              <h4 className="text-white font-bold mb-4">Shop</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/prodotti" className="hover:text-white transition-colors">Tutti i Prodotti</Link></li>
                <li><Link href="/piuforma" className="hover:text-white transition-colors">+Forma Metabolismo</Link></li>
                <li><Link href="#recensioni" className="hover:text-white transition-colors">Recensioni</Link></li>
              </ul>
            </div>

            {/* Column 3 - Assistenza */}
            <div>
              <h4 className="text-white font-bold mb-4">Assistenza</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Spedizioni</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resi e Rimborsi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Traccia Ordine</a></li>
              </ul>
            </div>

            {/* Column 4 - Contatti */}
            <div>
              <h4 className="text-white font-bold mb-4">Contatti</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-primary" />
                  <span>Lun-Ven 9-18</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-primary" />
                  <a href="mailto:info@piuforma.it" className="hover:text-white transition-colors">info@piuforma.it</a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-brand-primary" />
                  <span>WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-primary" />
                  <span>Italia</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Payment & Trust */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <span className="text-xs text-gray-500">Pagamento sicuro:</span>
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 rounded px-3 py-1.5 flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-green-400" />
                    <span className="text-xs font-medium text-white">Contrassegno</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Sito Sicuro</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Dati Protetti</span>
                <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Spedizione 24h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
              <p>© 2025 +Forma Italia. Tutti i diritti riservati.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Termini e Condizioni</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
            <p className="text-[10px] text-gray-600 text-center mt-4 max-w-3xl mx-auto">
              Integratore alimentare. I risultati possono variare da persona a persona.
              Non è un medicinale. Da utilizzare nell&apos;ambito di una dieta equilibrata e uno stile di vita sano.
              Non usare in gravidanza/allattamento. Per patologie, consultare il medico.
            </p>
          </div>
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
