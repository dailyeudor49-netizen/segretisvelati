'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TerminiCondizioniPage() {
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
        <h1 className="text-3xl md:text-4xl font-black text-brand-dark mb-8">Termini e Condizioni</h1>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 space-y-8 text-gray-700 leading-relaxed">
          <p className="text-sm text-gray-500">Ultimo aggiornamento: Gennaio 2025</p>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">1. Informazioni Generali</h2>
            <p>
              Il presente sito web è gestito da:<br />
              <strong>Segreti Svelati S.r.l.</strong><br />
              Via Roma 123, 20121 Milano (MI), Italia<br />
              P.IVA: IT12345678901<br />
              Email: <a href="mailto:info@segretisvelati.com" className="text-brand-primary hover:underline">info@segretisvelati.com</a>
            </p>
            <p className="mt-4">
              L&apos;utilizzo di questo sito web e l&apos;acquisto dei prodotti comporta l&apos;accettazione
              integrale dei presenti Termini e Condizioni.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">2. Prodotti</h2>
            <p className="mb-4">
              I prodotti venduti su questo sito sono <strong>integratori alimentari</strong> e non medicinali.
              Non sono destinati a diagnosticare, trattare, curare o prevenire alcuna malattia.
            </p>
            <p className="mb-4">
              Le informazioni sui prodotti sono fornite a scopo informativo e non sostituiscono
              il parere del medico o di altri professionisti sanitari.
            </p>
            <p>
              I risultati possono variare da persona a persona. Le testimonianze e le immagini
              presenti sul sito rappresentano esperienze individuali.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">3. Procedura di Acquisto</h2>
            <p className="mb-4">Per effettuare un ordine:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Compila il modulo d&apos;ordine con i tuoi dati (nome, telefono, indirizzo)</li>
              <li>Riceverai una telefonata di conferma dal nostro servizio clienti</li>
              <li>L&apos;ordine viene spedito dopo la conferma telefonica</li>
              <li>Paghi in contanti al corriere alla consegna (contrassegno)</li>
            </ol>
            <p className="mt-4">
              Il contratto di vendita si considera concluso al momento della conferma telefonica dell&apos;ordine.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">4. Prezzi e Pagamento</h2>
            <p className="mb-4">
              Tutti i prezzi indicati sul sito sono in Euro (€) e includono l&apos;IVA.
              La spedizione è gratuita per tutti gli ordini.
            </p>
            <p className="mb-4">
              <strong>Metodo di pagamento accettato:</strong> Contrassegno (pagamento in contanti alla consegna).
            </p>
            <p>
              Ci riserviamo il diritto di modificare i prezzi in qualsiasi momento.
              Il prezzo applicato sarà quello indicato al momento dell&apos;ordine.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">5. Spedizione e Consegna</h2>
            <p className="mb-4">
              Gli ordini vengono spediti entro 24 ore lavorative dalla conferma telefonica.
              La consegna avviene in 24-48 ore tramite corriere espresso.
            </p>
            <p className="mb-4">
              Il pacco viene consegnato in forma anonima e discreta, senza indicazioni sul contenuto.
            </p>
            <p>
              In caso di mancata consegna per assenza del destinatario, il corriere lascerà un avviso
              e tenterà una seconda consegna. Dopo due tentativi falliti, il pacco verrà restituito al mittente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">6. Diritto di Recesso</h2>
            <p className="mb-4">
              Ai sensi del D.Lgs. 206/2005 (Codice del Consumo), hai diritto di recedere dal contratto
              entro <strong>14 giorni</strong> dalla ricezione del prodotto, senza dover fornire alcuna motivazione.
            </p>
            <p className="mb-4">
              Per esercitare il diritto di recesso, devi comunicarlo a:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Email: <a href="mailto:resi@segretisvelati.com" className="text-brand-primary hover:underline">resi@segretisvelati.com</a></li>
              <li>Telefono: Lun-Ven 9:00-18:00</li>
            </ul>
            <p className="mb-4">
              Il prodotto deve essere restituito integro, nella confezione originale, non aperto e non utilizzato.
              Le spese di restituzione sono a carico del cliente.
            </p>
            <p>
              Il rimborso verrà effettuato entro 14 giorni dal ricevimento del reso,
              utilizzando lo stesso metodo di pagamento dell&apos;acquisto.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">7. Garanzia</h2>
            <p>
              Tutti i prodotti sono coperti dalla garanzia legale di conformità prevista dal Codice del Consumo.
              In caso di prodotto difettoso o non conforme, contattaci entro 2 mesi dalla scoperta del difetto.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">8. Limitazione di Responsabilità</h2>
            <p className="mb-4">
              Segreti Svelati S.r.l. non è responsabile per:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Uso improprio dei prodotti</li>
              <li>Risultati diversi da quelli attesi</li>
              <li>Reazioni avverse in soggetti allergici a specifici ingredienti</li>
              <li>Danni derivanti da forza maggiore o cause non imputabili all&apos;azienda</li>
            </ul>
            <p className="mt-4">
              Si raccomanda di leggere attentamente le indicazioni e gli ingredienti prima dell&apos;uso.
              In caso di patologie o assunzione di farmaci, consultare il medico prima dell&apos;uso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">9. Proprietà Intellettuale</h2>
            <p>
              Tutti i contenuti del sito (testi, immagini, loghi, grafica) sono di proprietà di Segreti Svelati S.r.l.
              o dei rispettivi titolari e sono protetti dalle leggi sul diritto d&apos;autore.
              È vietata la riproduzione senza autorizzazione scritta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">10. Legge Applicabile e Foro Competente</h2>
            <p>
              I presenti Termini e Condizioni sono regolati dalla legge italiana.
              Per qualsiasi controversia è competente il Foro di Milano,
              fatti salvi i diritti del consumatore ai sensi del Codice del Consumo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">11. Modifiche ai Termini</h2>
            <p>
              Ci riserviamo il diritto di modificare questi Termini e Condizioni in qualsiasi momento.
              Le modifiche saranno efficaci dalla pubblicazione sul sito.
              L&apos;uso continuato del sito dopo le modifiche costituisce accettazione delle stesse.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4">12. Contatti</h2>
            <p>
              Per qualsiasi domanda sui presenti Termini e Condizioni, contattaci a:<br />
              Email: <a href="mailto:info@segretisvelati.com" className="text-brand-primary hover:underline">info@segretisvelati.com</a><br />
              Orario assistenza: Lun-Ven 9:00-18:00
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
