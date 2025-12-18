import Link from 'next/link'
import { Star, ShoppingBag } from 'lucide-react'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : null

  // Se ha una landing dedicata, usa quella route
  const productLink = product.isSpecialLanding
    ? `/${product.slug}`
    : `/prodotto/${product.slug}`

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image */}
      <Link href={productLink} className="block relative aspect-square bg-gray-50 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {discount && (
            <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
              -{discount}%
            </span>
          )}
          {product.badge && (
            <span className="bg-brand-primary text-white text-xs font-bold px-2.5 py-1 rounded-lg">
              {product.badge}
            </span>
          )}
        </div>

        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
        )}

        {/* Title */}
        <Link href={productLink}>
          <h3 className="font-bold text-brand-dark text-lg mt-1 hover:text-brand-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'fill-current' : 'stroke-current fill-none'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-2xl font-black text-brand-primary">
            {product.price.toFixed(2)}€
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.compareAtPrice.toFixed(2)}€
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={productLink}
          className="mt-4 w-full bg-brand-primary hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          {product.isSpecialLanding ? 'Scopri Offerta' : 'Acquista Ora'}
        </Link>
      </div>
    </div>
  )
}
