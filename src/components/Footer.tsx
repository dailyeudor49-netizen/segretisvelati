import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-white font-bold text-2xl mb-4">Segreti Svelati</h3>
            <p className="text-base leading-relaxed max-w-md">
              Il tuo shop online per prodotti di qualità. Spedizione gratuita su tutti gli ordini.
              Pagamento alla consegna disponibile.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Link Utili</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/prodotti" className="hover:text-white transition-colors">Prodotti</Link>
              </li>
              <li>
                <Link href="/piuforma" className="hover:text-white transition-colors">+Forma</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">Informazioni</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Termini e Condizioni</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Contatti</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm">
            © 2025 Segreti Svelati. Tutti i diritti riservati.
          </p>
          <p className="text-xs mt-2 opacity-60">
            I risultati possono variare. Gli integratori non sono medicinali.
          </p>
        </div>
      </div>
    </footer>
  )
}
