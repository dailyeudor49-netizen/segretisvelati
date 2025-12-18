'use client'

import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl md:text-3xl font-black text-brand-primary">
            Segreti Svelati
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-brand-primary font-medium transition-colors">
              Home
            </Link>
            <Link href="/prodotti" className="text-gray-700 hover:text-brand-primary font-medium transition-colors">
              Prodotti
            </Link>
            <Link href="/piuforma" className="text-gray-700 hover:text-brand-primary font-medium transition-colors">
              +Forma
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/piuforma"
              className="hidden sm:flex bg-brand-primary hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-xl transition-colors items-center gap-2 text-base"
            >
              <ShoppingBag className="w-5 h-5" />
              Ordina Ora
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-brand-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/prodotti"
                className="text-gray-700 hover:text-brand-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Prodotti
              </Link>
              <Link
                href="/piuforma"
                className="text-gray-700 hover:text-brand-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                +Forma
              </Link>
              <Link
                href="/piuforma"
                className="bg-brand-primary hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="w-5 h-5" />
                Ordina Ora
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
