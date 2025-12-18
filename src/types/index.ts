// Product types
export interface ProductVariant {
  id: string
  name: string
  type: 'size' | 'color' | 'other'
  inStock: boolean
}

export interface Product {
  id: string
  title: string
  slug: string
  price: number
  compareAtPrice?: number
  images: string[]
  description: string
  highlights: string[]
  variants?: ProductVariant[]
  offerId: string
  category?: string
  badge?: string
  rating?: number
  reviewCount?: number
  isSpecialLanding?: boolean // For products with dedicated landing pages
}

// Customer/Lead types
export interface CustomerData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  zip: string
  country: string
  notes?: string
}

export interface Consents {
  privacy: boolean
  marketing: boolean
}
