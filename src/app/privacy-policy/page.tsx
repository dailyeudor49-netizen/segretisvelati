'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicyPage() {
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
        <h1 className="text-3xl md:text-4xl font-black text-brand-dark mb-8">Privacy Policy</h1>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 space-y-8 text-gray-700 leading-relaxed">
          <p className="text-sm text-gray-500">Ultimo aggiornamento: Gennaio 2025</p>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">1. Titolare del Trattamento</h2>
            <p>
              Il Titolare del trattamento dei dati personali è:<br />
              <strong>Segreti Svelati S.r.l.</strong><br />
              Via Roma 123, 20121 Milano (MI), Italia<br />
              P.IVA: IT12345678901<br />
              Email: <a href="mailto:privacy@segretisvelati.com" className="text-brand-primary hover:underline">privacy@segretisvelati.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">2. Tipologie di Dati Raccolti</h2>
            <p className="mb-4">I dati personali raccolti da questo sito, in modo autonomo o tramite terze parti, includono:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dati di contatto:</strong> nome, cognome, indirizzo, numero di telefono, indirizzo email</li>
              <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, sistema operativo, pagine visitate, tempo di permanenza</li>
              <li><strong>Dati relativi agli ordini:</strong> prodotti acquistati, metodo di pagamento, indirizzo di spedizione</li>
              <li><strong>Cookie e tecnologie simili:</strong> come descritto nella nostra Cookie Policy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">3. Finalità del Trattamento</h2>
            <p className="mb-4">I tuoi dati personali sono trattati per le seguenti finalità:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gestione degli ordini e consegna dei prodotti</li>
              <li>Assistenza clienti e risposta alle richieste</li>
              <li>Adempimento degli obblighi legali e fiscali</li>
              <li>Invio di comunicazioni commerciali (previo consenso)</li>
              <li>Analisi statistiche e miglioramento del servizio</li>
              <li>Prevenzione di frodi e attività illecite</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">4. Base Giuridica del Trattamento</h2>
            <p className="mb-4">Il trattamento dei tuoi dati personali si basa su:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Esecuzione contrattuale:</strong> per la gestione degli ordini e la fornitura dei servizi richiesti</li>
              <li><strong>Obbligo legale:</strong> per adempiere a obblighi di legge (es. fatturazione, conservazione documenti)</li>
              <li><strong>Consenso:</strong> per l&apos;invio di comunicazioni commerciali e marketing</li>
              <li><strong>Legittimo interesse:</strong> per la prevenzione frodi e il miglioramento dei servizi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">5. Destinatari dei Dati</h2>
            <p className="mb-4">I tuoi dati possono essere comunicati a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Corrieri e società di logistica per la consegna degli ordini</li>
              <li>Fornitori di servizi IT e hosting</li>
              <li>Consulenti legali e commercialisti</li>
              <li>Autorità pubbliche quando richiesto dalla legge</li>
              <li>Piattaforme pubblicitarie (es. Facebook, Google) per finalità di marketing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">6. Trasferimento Dati Extra-UE</h2>
            <p>
              Alcuni dei nostri fornitori di servizi potrebbero trasferire dati al di fuori dell&apos;Unione Europea.
              In tali casi, garantiamo che il trasferimento avvenga nel rispetto delle normative vigenti,
              tramite clausole contrattuali standard approvate dalla Commissione Europea o altre garanzie appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">7. Periodo di Conservazione</h2>
            <p className="mb-4">I dati personali sono conservati per il tempo strettamente necessario:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dati contrattuali:</strong> 10 anni dalla conclusione del contratto</li>
              <li><strong>Dati fiscali:</strong> 10 anni come previsto dalla normativa fiscale</li>
              <li><strong>Dati di marketing:</strong> fino alla revoca del consenso</li>
              <li><strong>Dati di navigazione:</strong> 26 mesi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">8. Diritti dell&apos;Interessato</h2>
            <p className="mb-4">Ai sensi del GDPR (Regolamento UE 2016/679), hai il diritto di:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Accesso:</strong> ottenere conferma del trattamento e copia dei dati</li>
              <li><strong>Rettifica:</strong> correggere dati inesatti o incompleti</li>
              <li><strong>Cancellazione:</strong> richiedere la cancellazione dei dati (&quot;diritto all&apos;oblio&quot;)</li>
              <li><strong>Limitazione:</strong> limitare il trattamento in determinate circostanze</li>
              <li><strong>Portabilità:</strong> ricevere i dati in formato strutturato e trasferirli</li>
              <li><strong>Opposizione:</strong> opporti al trattamento per motivi legittimi</li>
              <li><strong>Revoca del consenso:</strong> revocare il consenso in qualsiasi momento</li>
            </ul>
            <p className="mt-4">
              Per esercitare i tuoi diritti, contattaci a: <a href="mailto:privacy@segretisvelati.com" className="text-brand-primary hover:underline">privacy@segretisvelati.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">9. Reclamo all&apos;Autorità di Controllo</h2>
            <p>
              Hai il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali
              (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">www.garanteprivacy.it</a>)
              se ritieni che il trattamento dei tuoi dati violi la normativa vigente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">10. Modifiche alla Privacy Policy</h2>
            <p>
              Ci riserviamo il diritto di modificare questa Privacy Policy in qualsiasi momento.
              Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento.
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
