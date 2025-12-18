import Link from 'next/link'
import { ShoppingBag, Truck, Shield, CreditCard, Star, ArrowRight } from 'lucide-react'
import { Header, Footer, ProductCard } from '@/components'
import { products } from '@/data/products'

export default function Home() {
  // Prodotto in evidenza (PiuForma)
  const featuredProduct = products.find(p => p.slug === 'piuforma')
  // Altri prodotti
  const otherProducts = products.filter(p => p.slug !== 'piuforma').slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="bg-brand-primary/10 text-brand-primary font-bold px-4 py-2 rounded-full text-sm">
                🔥 Offerta Limitata
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark mt-6 leading-tight">
                Scopri i Prodotti che Cambieranno la Tua Vita
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mt-6 leading-relaxed">
                Prodotti selezionati di alta qualità per il tuo benessere.
                Spedizione gratuita e pagamento alla consegna.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/piuforma"
                  className="bg-brand-primary hover:bg-orange-600 text-white font-black text-lg py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-6 h-6" />
                  Scopri +Forma
                </Link>
                <Link
                  href="/prodotti"
                  className="bg-white border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white font-bold text-lg py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  Vedi Tutti i Prodotti
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Featured Product */}
            {featuredProduct && (
              <div className="relative">
                <div className="absolute -top-4 -right-4 bg-red-600 text-white font-black px-4 py-2 rounded-xl text-lg z-10">
                  -50%
                </div>
                <Link href="/piuforma" className="block bg-white rounded-3xl shadow-2xl p-6 hover:shadow-3xl transition-shadow">
                  <img
                    src={featuredProduct.images[0]}
                    alt={featuredProduct.title}
                    className="w-full max-w-sm mx-auto"
                  />
                  <div className="text-center mt-4">
                    <h3 className="font-black text-2xl text-brand-dark">{featuredProduct.title}</h3>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-3xl font-black text-brand-primary">49,99€</span>
                      <span className="text-lg text-gray-400 line-through">99,00€</span>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 justify-center">
              <Truck className="w-8 h-8 text-brand-primary" />
              <div>
                <p className="font-bold text-brand-dark">Spedizione Gratis</p>
                <p className="text-sm text-gray-500">Su tutti gli ordini</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <CreditCard className="w-8 h-8 text-brand-primary" />
              <div>
                <p className="font-bold text-brand-dark">Paga alla Consegna</p>
                <p className="text-sm text-gray-500">In contanti</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Shield className="w-8 h-8 text-brand-primary" />
              <div>
                <p className="font-bold text-brand-dark">100% Sicuro</p>
                <p className="text-sm text-gray-500">Dati protetti</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Star className="w-8 h-8 text-brand-primary" />
              <div>
                <p className="font-bold text-brand-dark">4.8/5 Stelle</p>
                <p className="text-sm text-gray-500">+3000 recensioni</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCT SECTION */}
      <section className="py-16 md:py-24 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-brand-primary font-bold text-sm uppercase tracking-widest">
                Prodotto in Evidenza
              </span>
              <h2 className="text-3xl md:text-5xl font-black mt-4">
                +Forma <span className="text-brand-primary">Metabolismo Attivo</span>
              </h2>
              <p className="text-lg text-gray-300 mt-6 leading-relaxed">
                La formula che riattiva il consumo calorico a riposo dopo i 40 anni.
                Oltre 1.200 clienti soddisfatti. Offerta speciale: 2 confezioni al prezzo di 1.
              </p>
              <ul className="mt-6 space-y-3">
                {['Brucia calorie anche a riposo', 'Riduce la fame nervosa', 'Sgonfia la pancia', '100% naturale'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/piuforma"
                className="inline-flex items-center gap-3 bg-brand-primary hover:bg-orange-600 text-white font-black text-xl py-4 px-8 rounded-xl mt-8 transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                ORDINA ORA - 49,99€
              </Link>
            </div>
            <div className="flex justify-center">
              <img
                src="https://farmaita.eu/wp-content/uploads/2024/10/Progetto-senza-titolo-2.png"
                alt="+Forma"
                className="w-full max-w-md drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OTHER PRODUCTS */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-brand-dark">
              Altri Prodotti <span className="text-brand-primary">Selezionati</span>
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              Scopri la nostra selezione di prodotti premium per il tuo benessere
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/prodotti"
              className="inline-flex items-center gap-2 bg-white border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              Vedi Tutti i Prodotti
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
