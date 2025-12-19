'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-brand-primary hover:text-brand-primaryDark">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">Torna al sito</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-black text-brand-dark mb-8">Cookie Policy</h1>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 space-y-8 text-gray-700 leading-relaxed">
          <p className="text-sm text-gray-500">Ultimo aggiornamento: Gennaio 2025</p>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">1. Cosa Sono i Cookie</h2>
            <p>
              I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo
              quando visiti un sito web. Vengono utilizzati per migliorare l&apos;esperienza di navigazione,
              memorizzare le preferenze e raccogliere informazioni statistiche.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">2. Titolare del Trattamento</h2>
            <p>
              <strong>Segreti Svelati S.r.l.</strong><br />
              Via Roma 123, 20121 Milano (MI), Italia<br />
              P.IVA: IT12345678901<br />
              Email: <a href="mailto:privacy@segretisvelati.com" className="text-brand-primary hover:underline">privacy@segretisvelati.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">3. Tipologie di Cookie Utilizzati</h2>

            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-green-800 mb-2">Cookie Tecnici (Necessari)</h3>
                <p className="text-green-700 text-sm mb-2">
                  Questi cookie sono essenziali per il funzionamento del sito e non possono essere disabilitati.
                </p>
                <ul className="list-disc pl-6 text-sm text-green-700 space-y-1">
                  <li>Gestione della sessione di navigazione</li>
                  <li>Memorizzazione delle preferenze di consenso cookie</li>
                  <li>Sicurezza e prevenzione frodi</li>
                </ul>
                <p className="text-xs text-green-600 mt-2"><strong>Durata:</strong> Sessione / 12 mesi</p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-blue-800 mb-2">Cookie Analitici</h3>
                <p className="text-blue-700 text-sm mb-2">
                  Ci aiutano a capire come i visitatori interagiscono con il sito, raccogliendo informazioni in forma anonima.
                </p>
                <ul className="list-disc pl-6 text-sm text-blue-700 space-y-1">
                  <li><strong>Google Analytics:</strong> Analisi del traffico e comportamento utenti</li>
                </ul>
                <p className="text-xs text-blue-600 mt-2"><strong>Durata:</strong> Fino a 26 mesi</p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-purple-800 mb-2">Cookie di Marketing/Profilazione</h3>
                <p className="text-purple-700 text-sm mb-2">
                  Vengono utilizzati per mostrarti annunci pubblicitari pertinenti in base ai tuoi interessi.
                </p>
                <ul className="list-disc pl-6 text-sm text-purple-700 space-y-1">
                  <li><strong>Facebook Pixel:</strong> Tracciamento conversioni e remarketing</li>
                  <li><strong>Google Ads:</strong> Remarketing e conversioni pubblicitarie</li>
                </ul>
                <p className="text-xs text-purple-600 mt-2"><strong>Durata:</strong> Fino a 24 mesi</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">4. Cookie di Terze Parti</h2>
            <p className="mb-4">Il nostro sito utilizza servizi di terze parti che potrebbero installare cookie:</p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2 text-left font-bold">Servizio</th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-bold">Fornitore</th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-bold">Finalità</th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-bold">Privacy Policy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">Facebook Pixel</td>
                    <td className="border border-gray-200 px-4 py-2">Meta Platforms, Inc.</td>
                    <td className="border border-gray-200 px-4 py-2">Marketing, Remarketing</td>
                    <td className="border border-gray-200 px-4 py-2">
                      <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Link</a>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">Google Analytics</td>
                    <td className="border border-gray-200 px-4 py-2">Google LLC</td>
                    <td className="border border-gray-200 px-4 py-2">Analisi statistica</td>
                    <td className="border border-gray-200 px-4 py-2">
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Link</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">5. Come Gestire i Cookie</h2>
            <p className="mb-4">Puoi gestire le tue preferenze sui cookie in diversi modi:</p>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-brand-dark mb-2">Impostazioni del Browser</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Puoi configurare il tuo browser per bloccare o eliminare i cookie.
                  Ecco le guide per i principali browser:
                </p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Microsoft Edge</a></li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-brand-dark mb-2">Opt-out Specifici</h3>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>
                    <strong>Google Analytics:</strong>{' '}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
                      Componente aggiuntivo per la disattivazione
                    </a>
                  </li>
                  <li>
                    <strong>Facebook:</strong>{' '}
                    <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
                      Impostazioni inserzioni
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              <strong>Nota:</strong> La disabilitazione dei cookie potrebbe compromettere alcune funzionalità del sito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">6. Base Giuridica</h2>
            <p className="mb-4">Il trattamento dei dati tramite cookie si basa su:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookie tecnici:</strong> Legittimo interesse per il funzionamento del sito</li>
              <li><strong>Cookie analitici e di marketing:</strong> Consenso esplicito dell&apos;utente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">7. Trasferimento Dati</h2>
            <p>
              Alcuni fornitori di servizi (es. Google, Facebook) potrebbero trasferire dati
              negli Stati Uniti o in altri paesi extra-UE. Tali trasferimenti avvengono
              sulla base di clausole contrattuali standard o altre garanzie appropriate
              previste dal GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">8. Aggiornamenti</h2>
            <p>
              Questa Cookie Policy potrebbe essere aggiornata periodicamente.
              Ti invitiamo a consultare questa pagina regolarmente per eventuali modifiche.
              La data dell&apos;ultimo aggiornamento è indicata in cima a questa pagina.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">9. Contatti</h2>
            <p>
              Per qualsiasi domanda sulla nostra Cookie Policy, contattaci a:<br />
              Email: <a href="mailto:privacy@segretisvelati.com" className="text-brand-primary hover:underline">privacy@segretisvelati.com</a>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-gray-400 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm">
          <p>© 2025 Segreti Svelati S.r.l. - P.IVA IT12345678901 - Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  )
}
