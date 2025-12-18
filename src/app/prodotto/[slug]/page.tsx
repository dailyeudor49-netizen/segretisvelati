'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header, Footer } from '@/components'
import { products, getProductBySlug } from '@/data/products'
import { ShoppingBag, Star, Check, Truck, Shield, ArrowLeft } from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProductBySlug(slug)

  const [activeImage, setActiveImage] = useState(0)

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-brand-dark mb-4">Prodotto non trovato</h1>
          <p className="text-gray-600 mb-8">Il prodotto che stai cercando non esiste.</p>
          <Link href="/prodotti" className="text-brand-primary font-bold hover:underline">
            ← Torna ai prodotti
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  // Se è un prodotto con landing dedicata, redirect
  if (product.isSpecialLanding) {
    if (typeof window !== 'undefined') {
      window.location.href = `/${product.slug}`
    }
    return null
  }

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : null

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/prodotti" className="flex items-center gap-2 text-gray-600 hover:text-brand-primary">
            <ArrowLeft className="w-4 h-4" />
            Torna ai prodotti
          </Link>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
                {discount && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-red-600 text-white font-bold px-3 py-1.5 rounded-lg">
                      -{discount}%
                    </span>
                  </div>
                )}
                {product.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-brand-primary text-white font-bold px-3 py-1.5 rounded-lg text-sm">
                      {product.badge}
                    </span>
                  </div>
                )}
                <img
                  src={product.images[activeImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === idx ? 'border-brand-primary' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Category */}
              {product.category && (
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  {product.category}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-black text-brand-dark mt-2">
                {product.title}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating!) ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating}/5 ({product.reviewCount} recensioni)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mt-6 p-5 bg-gray-50 rounded-xl">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-brand-primary">
                    {product.price.toFixed(2)}€
                  </span>
                  {product.compareAtPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        {product.compareAtPrice.toFixed(2)}€
                      </span>
                      <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded">
                        Risparmi {(product.compareAtPrice - product.price).toFixed(2)}€
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">IVA inclusa · Spedizione gratuita</p>
              </div>

              {/* Description */}
              <p className="text-gray-600 mt-6 text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Highlights */}
              <div className="mt-6 space-y-3">
                {product.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className="w-full bg-brand-primary hover:bg-orange-600 text-white font-black text-xl py-5 rounded-xl mt-8 flex items-center justify-center gap-3 transition-colors">
                <ShoppingBag className="w-6 h-6" />
                ACQUISTA ORA
              </button>

              {/* Trust */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-brand-primary" />
                  Spedizione Gratuita
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-brand-primary" />
                  Pagamento Sicuro
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
