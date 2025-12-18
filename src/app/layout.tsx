import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '+Forma - Riattiva il Tuo Metabolismo Dopo i 40 Anni',
  description: 'La formula che riattiva il consumo calorico a riposo dopo i 40 anni. Sentiti più leggero, sgonfio e pieno di energia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={`${montserrat.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
