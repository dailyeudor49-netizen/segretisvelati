import type { Product } from '../types'

export const products: Product[] = [
  // +Forma - Prodotto Speciale con Landing Dedicata
  {
    id: 'prod-piuforma',
    title: '+Forma Metabolismo Attivo',
    slug: 'piuforma',
    price: 49.99,
    compareAtPrice: 99.00,
    images: [
      'https://farmaita.eu/wp-content/uploads/2024/10/Progetto-senza-titolo-2.png',
      'https://farmaita.eu/wp-content/uploads/2024/10/x2.png',
      'https://farmaita.eu/wp-content/uploads/2025/11/Gemini_Generated_Image_e4lxa2e4lxa2e4lx.png',
    ],
    description: 'La formula che riattiva il consumo calorico a riposo dopo i 40 anni. Sentiti più leggero, sgonfio e pieno di energia. 2 confezioni per un trattamento completo di 2 mesi.',
    highlights: [
      'Brucia calorie anche a riposo',
      'Riduce il senso di fame nervosa',
      'Sgonfia la pancia in pochi giorni',
      'Più energia durante tutta la giornata',
      '100% ingredienti naturali',
    ],
    offerId: 'htf_piuforma',
    category: 'integratori',
    badge: 'Best Seller',
    rating: 4.8,
    reviewCount: 1247,
    isSpecialLanding: true, // Ha una landing page dedicata
  },
  // Altri prodotti ecommerce
  {
    id: 'prod-001',
    title: 'Crema Viso Idratante Premium',
    slug: 'crema-viso-idratante-premium',
    price: 49.90,
    compareAtPrice: 79.90,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
      'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=800&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80',
    ],
    description: 'La nostra crema viso premium è formulata con ingredienti naturali di alta qualità. Idrata in profondità, riduce le rughe e dona luminosità alla pelle. Perfetta per tutti i tipi di pelle.',
    highlights: [
      'Ingredienti 100% naturali',
      'Idratazione profonda 24h',
      'Riduce visibilmente le rughe',
      'Dermatologicamente testata',
      'Senza parabeni e siliconi',
    ],
    offerId: 'OFFER_CREMA_001',
    category: 'skincare',
    badge: 'Novità',
    rating: 4.8,
    reviewCount: 1247,
  },
  {
    id: 'prod-002',
    title: 'Siero Anti-Age Vitamina C',
    slug: 'siero-anti-age-vitamina-c',
    price: 39.90,
    compareAtPrice: 59.90,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80',
    ],
    description: 'Siero concentrato con Vitamina C pura al 20%. Potente azione antiossidante, illuminante e anti-macchia. Stimola la produzione di collagene per una pelle più giovane.',
    highlights: [
      'Vitamina C pura al 20%',
      'Azione antiossidante potente',
      'Illumina e uniforma il colorito',
      'Stimola il collagene',
    ],
    offerId: 'OFFER_SIERO_002',
    category: 'skincare',
    rating: 4.9,
    reviewCount: 892,
  },
  {
    id: 'prod-003',
    title: 'Olio Corpo Nutriente Bio',
    slug: 'olio-corpo-nutriente-bio',
    price: 29.90,
    images: [
      'https://images.unsplash.com/photo-1600428877878-1a0fd85beda8?w=800&q=80',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80',
    ],
    description: 'Olio corpo 100% biologico a base di argan, jojoba e mandorle dolci. Nutre intensamente la pelle secca e la rende morbida e vellutata.',
    highlights: [
      'Certificato biologico',
      'Mix di oli pregiati',
      'Assorbimento rapido',
      'Profumazione delicata',
    ],
    offerId: 'OFFER_OLIO_003',
    category: 'bodycare',
    rating: 4.7,
    reviewCount: 534,
  },
  {
    id: 'prod-004',
    title: 'Kit Completo Skincare',
    slug: 'kit-completo-skincare',
    price: 99.90,
    compareAtPrice: 149.90,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
      'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&q=80',
    ],
    description: 'Il kit completo per la tua routine di skincare quotidiana. Include detergente, tonico, siero e crema idratante. Tutto ciò che serve per una pelle perfetta.',
    highlights: [
      '4 prodotti completi',
      'Routine mattino e sera',
      'Risparmio del 33%',
      'Confezione regalo inclusa',
    ],
    offerId: 'OFFER_KIT_004',
    category: 'skincare',
    badge: 'Offerta Limitata',
    rating: 4.9,
    reviewCount: 328,
  },
  {
    id: 'prod-005',
    title: 'Maschera Viso Purificante',
    slug: 'maschera-viso-purificante',
    price: 24.90,
    images: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80',
    ],
    description: 'Maschera all\'argilla verde con estratti di tea tree. Purifica i pori, elimina le impurità e opacizza la pelle grassa. Uso settimanale consigliato.',
    highlights: [
      'Argilla verde naturale',
      'Estratto di tea tree',
      'Azione purificante profonda',
      'Per pelle mista/grassa',
    ],
    offerId: 'OFFER_MASCHERA_005',
    category: 'skincare',
    rating: 4.6,
    reviewCount: 421,
  },
  {
    id: 'prod-006',
    title: 'Contorno Occhi Anti-Borse',
    slug: 'contorno-occhi-anti-borse',
    price: 34.90,
    compareAtPrice: 44.90,
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80',
    ],
    description: 'Crema contorno occhi con caffeina e peptidi. Riduce borse, occhiaie e segni di stanchezza. Lo sguardo appare più fresco e riposato.',
    highlights: [
      'Con caffeina e peptidi',
      'Riduce borse e occhiaie',
      'Effetto fresco immediato',
      'Applicatore in metallo',
    ],
    offerId: 'OFFER_OCCHI_006',
    category: 'skincare',
    rating: 4.5,
    reviewCount: 267,
  },
]

// Helper per ottenere un prodotto by slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug)
}

// Helper per ottenere un prodotto by id
export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id)
}

// Helper per ottenere prodotti per categoria
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category)
}

// Categorie disponibili
export const categories = [
  { id: 'integratori', name: 'Integratori' },
  { id: 'skincare', name: 'Skincare' },
  { id: 'bodycare', name: 'Body Care' },
]
