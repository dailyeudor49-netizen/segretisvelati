import { Header, Footer, ProductCard } from '@/components'
import { products, categories } from '@/data/products'

export const metadata = {
  title: 'Tutti i Prodotti | Segreti Svelati',
  description: 'Scopri la nostra selezione di prodotti premium per il tuo benessere. Spedizione gratuita su tutti gli ordini.',
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-black text-brand-dark text-center">
            Tutti i <span className="text-brand-primary">Prodotti</span>
          </h1>
          <p className="text-gray-600 text-center mt-4 text-lg max-w-2xl mx-auto">
            Prodotti selezionati di alta qualità. Spedizione gratuita su tutti gli ordini e pagamento alla consegna.
          </p>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="bg-brand-primary text-white font-bold px-5 py-2 rounded-full cursor-pointer">
              Tutti
            </span>
            {categories.map(cat => (
              <span
                key={cat.id}
                className="bg-white border-2 border-gray-200 text-gray-700 font-medium px-5 py-2 rounded-full cursor-pointer hover:border-brand-primary hover:text-brand-primary transition-colors"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-brand-primary mb-2">3000+</div>
              <p className="text-gray-300">Clienti Soddisfatti</p>
            </div>
            <div>
              <div className="text-4xl font-black text-brand-primary mb-2">4.8/5</div>
              <p className="text-gray-300">Valutazione Media</p>
            </div>
            <div>
              <div className="text-4xl font-black text-brand-primary mb-2">24h</div>
              <p className="text-gray-300">Spedizione Express</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
