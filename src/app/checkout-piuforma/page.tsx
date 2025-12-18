'use client'

import { memo, useState, useCallback, useRef, FormEvent } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Lock, Check, Truck, Info, Phone, ShoppingBag,
  CheckCircle, Banknote, Package, ShieldCheck, Loader2
} from 'lucide-react'

// Progress step component
const ProgressStep = memo(({ number, label, status }: {
  number: number;
  label: string;
  status: 'completed' | 'active' | 'pending'
}) => {
  const getStepStyles = () => {
    switch (status) {
      case 'completed':
        return { circle: 'bg-green-600 text-white', text: 'text-gray-500', line: 'bg-green-600' }
      case 'active':
        return { circle: 'bg-brand-primary text-white', text: 'text-brand-primary font-bold', line: 'bg-gray-200' }
      default:
        return { circle: 'bg-gray-200 text-gray-500', text: 'text-gray-400', line: 'bg-gray-200' }
    }
  }
  const styles = getStepStyles()

  return (
    <div className="flex items-center gap-2">
      <span className={`w-8 h-8 md:w-9 md:h-9 ${styles.circle} rounded-full flex items-center justify-center text-sm font-bold`}>
        {status === 'completed' ? <Check className="w-5 h-5" /> : number}
      </span>
      <span className={`${styles.text} text-sm md:text-base hidden sm:inline`}>{label}</span>
    </div>
  )
})

ProgressStep.displayName = 'ProgressStep'

// Input field component - Large and accessible
const FormInput = memo(({
  id,
  label,
  type = 'text',
  placeholder,
  required = false,
  autoComplete,
  prefix,
  hint,
  error,
  value,
  onChange,
  inputMode,
  maxLength
}: {
  id: string
  label: string
  type?: string
  placeholder: string
  required?: boolean
  autoComplete?: string
  prefix?: string
  hint?: string
  error?: string
  value: string
  onChange: (value: string) => void
  inputMode?: 'text' | 'numeric' | 'tel'
  maxLength?: number
}) => (
  <div>
    <label htmlFor={id} className="block text-base md:text-lg font-bold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex">
      {prefix && (
        <span className="inline-flex items-center px-4 md:px-5 bg-gray-100 border-2 border-r-0 border-gray-200 rounded-l-xl text-gray-600 font-bold text-lg md:text-xl">
          {prefix}
        </span>
      )}
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        className={`w-full p-4 md:p-5 bg-gray-50 border-2 ${error ? 'border-red-500' : 'border-gray-200'} ${prefix ? 'rounded-r-xl' : 'rounded-xl'} focus:border-brand-primary focus:bg-white text-lg md:text-xl transition-all touch-manipulation`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
      />
    </div>
    {hint && !error && (
      <p id={`${id}-hint`} className="text-sm md:text-base text-gray-500 mt-2 flex items-center gap-1">
        <Phone className="w-4 h-4 inline" />
        {hint}
      </p>
    )}
    {error && (
      <p id={`${id}-error`} role="alert" className="text-base text-red-600 mt-2 font-medium">
        ⚠️ {error}
      </p>
    )}
  </div>
))

FormInput.displayName = 'FormInput'

// Order summary component
const OrderSummary = memo(() => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    <div className="bg-gray-50 p-4 md:p-5 border-b border-gray-100">
      <h2 className="font-bold text-brand-dark text-lg md:text-xl flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-brand-primary" />
        Riepilogo Ordine
      </h2>
    </div>

    <div className="p-5 md:p-6">
      {/* Product */}
      <div className="flex gap-4 pb-5 border-b border-gray-100">
        <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-50 rounded-xl p-2 flex-shrink-0">
          <img
            src="https://farmaita.eu/wp-content/uploads/2024/10/Progetto-senza-titolo-2.png"
            alt="+Forma"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-brand-dark text-lg">+Forma Metabolismo</h3>
          <p className="text-base text-gray-500">2 Confezioni (2 mesi)</p>
          <p className="text-base text-green-600 font-bold mt-1">Offerta 2x1</p>
        </div>
      </div>

      {/* Prices */}
      <div className="py-5 space-y-3 border-b border-gray-100 text-base md:text-lg">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotale (2 conf.)</span>
          <span className="text-gray-400 line-through">99,00€</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Sconto 50%</span>
          <span className="text-green-600 font-medium">-49,01€</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Spedizione Express</span>
          <span className="text-green-600 font-medium">GRATIS</span>
        </div>
      </div>

      {/* Total */}
      <div className="pt-5">
        <div className="flex justify-between items-center">
          <span className="font-bold text-brand-dark text-xl">Totale</span>
          <span className="text-4xl md:text-5xl font-black text-brand-primary">49,99€</span>
        </div>
        <p className="text-base text-gray-500 mt-3 flex items-center gap-2">
          <Banknote className="w-5 h-5" />
          Pagamento in contanti alla consegna
        </p>
      </div>

      {/* Guarantees */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-base text-gray-700 bg-green-50 p-4 rounded-xl">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <span>Spedizione Gratuita in 24h</span>
        </div>
        <div className="flex items-center gap-3 text-base text-gray-700 bg-blue-50 p-4 rounded-xl">
          <Phone className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <span>Conferma telefonica inclusa</span>
        </div>
        <div className="flex items-center gap-3 text-base text-gray-700 bg-orange-50 p-4 rounded-xl">
          <Package className="w-6 h-6 text-brand-primary flex-shrink-0" />
          <span>Pacco anonimo discreto</span>
        </div>
      </div>
    </div>
  </div>
))

OrderSummary.displayName = 'OrderSummary'

// Success modal component
const SuccessModal = memo(({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-fade-in">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-brand-dark mb-3">Ordine Confermato!</h2>
        <p className="text-lg text-gray-600 mb-6">
          Grazie per il tuo ordine. Un nostro operatore ti chiamerà a breve per confermare la spedizione.
        </p>
        <div className="bg-gray-50 p-5 rounded-2xl mb-6">
          <p className="text-base text-gray-500 mb-1">Totale da pagare al corriere:</p>
          <p className="text-4xl font-black text-brand-primary">49,99€</p>
        </div>
        <Link
          href="/piuforma"
          className="inline-block bg-brand-primary text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-orange-600 transition-colors touch-manipulation min-h-[56px]"
        >
          Torna alla Home
        </Link>
      </div>
    </div>
  )
})

SuccessModal.displayName = 'SuccessModal'

// Main checkout component
export default function PiuFormaCheckout() {
  const formRef = useRef<HTMLFormElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Anti-spam: button only enabled when all fields are properly filled
  const isFormComplete =
    formData.name.trim().length >= 3 &&
    formData.phone.length === 10 &&
    formData.phone.startsWith('3') &&
    formData.address.trim().length >= 10

  const updateField = useCallback((field: keyof typeof formData) => (value: string) => {
    // For phone, only allow numbers
    if (field === 'phone') {
      value = value.replace(/[^0-9]/g, '').slice(0, 10)
    }
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }, [])

  const validateForm = useCallback(() => {
    const newErrors = { name: '', phone: '', address: '' }
    let isValid = true

    // Name validation
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = 'Inserisci nome e cognome completi'
      isValid = false
    }

    // Phone validation
    const phone = formData.phone.trim()
    if (phone.length !== 10) {
      newErrors.phone = 'Inserisci esattamente 10 cifre del cellulare'
      isValid = false
    } else if (!phone.startsWith('3')) {
      newErrors.phone = 'Il numero deve iniziare con 3 (cellulare italiano)'
      isValid = false
    }

    // Address validation
    if (!formData.address.trim() || formData.address.trim().length < 10) {
      newErrors.address = 'Inserisci un indirizzo completo con via, civico, CAP e città'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }, [formData])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors).find(key => errors[key as keyof typeof errors])
      if (firstErrorField) {
        document.getElementById(firstErrorField === 'phone' ? 'phone' : firstErrorField)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setIsSubmitting(true)

    // Save customer data BEFORE API call (for thank you page)
    const firstName = formData.name.split(' ')[0]
    sessionStorage.setItem('customer_name', firstName)
    sessionStorage.setItem('order_price', '49,99€')

    try {
      // Get tracking params from URL if present
      const urlParams = new URLSearchParams(window.location.search)
      const affSub1 = urlParams.get('aff_sub1') || urlParams.get('sub1') || ''
      const affSub2 = urlParams.get('aff_sub2') || urlParams.get('sub2') || ''

      const submitData = new FormData()
      submitData.append('source_id', '9b16759a6289')
      submitData.append('aff_sub1', affSub1)
      submitData.append('aff_sub2', affSub2)
      submitData.append('name', formData.name)
      submitData.append('phone', '+39' + formData.phone)
      submitData.append('address', formData.address)

      const response = await fetch('https://network.worldfilia.net/manager/inventory/buy/htf_piuforma.json?api_key=xgM6LBE0CA4EwJ4NTNhPBQ', {
        method: 'POST',
        body: submitData
      })

      const data = await response.json()

      if (data.success || data.status === 'ok') {
        // Redirect to thank you page with name as URL param backup
        window.location.href = `/ty-piuforma?name=${encodeURIComponent(firstName)}`
      } else {
        alert('Si è verificato un problema: ' + (data.message || 'Riprova.'))
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Error:', error)
      // Even on error, redirect to thank you (order might have gone through)
      window.location.href = `/ty-piuforma?name=${encodeURIComponent(firstName)}`
    }
  }, [formData, validateForm, errors])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b-2 border-gray-200 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link
            href="/piuforma"
            className="flex items-center gap-2 text-gray-600 hover:text-brand-primary transition-colors py-2 touch-manipulation"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="hidden sm:inline text-base font-medium">Torna al prodotto</span>
          </Link>
          <span className="text-2xl font-black text-brand-primary">+Forma</span>
          <div className="flex items-center gap-2 text-base text-gray-500">
            <Lock className="w-5 h-5 text-green-600" />
            <span className="hidden sm:inline">Checkout Sicuro</span>
          </div>
        </div>
      </header>

      {/* PROGRESS BAR */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <ProgressStep number={1} label="Prodotto" status="completed" />
            <div className="w-6 md:w-10 h-1 bg-green-600 rounded" />
            <ProgressStep number={2} label="Dati Spedizione" status="active" />
            <div className="w-6 md:w-10 h-1 bg-gray-200 rounded" />
            <ProgressStep number={3} label="Conferma" status="pending" />
          </div>
        </div>
      </div>

      {/* MAIN */}
      <main className="py-6 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* FORM SECTION */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="bg-brand-dark text-white p-5 md:p-6">
                  <h1 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                    <Truck className="w-7 h-7 text-brand-primary" />
                    Dove spediamo il tuo ordine?
                  </h1>
                  <p className="text-base text-gray-300 mt-2">
                    Compila i campi qui sotto. Pagherai al corriere alla consegna.
                  </p>
                </div>

                {/* Form */}
                <form ref={formRef} onSubmit={handleSubmit} className="p-5 md:p-6 space-y-6" noValidate>

                  {/* How it works - Very clear for older users */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 mb-2">
                    <h3 className="font-bold text-brand-dark text-base md:text-lg mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      Come funziona l&apos;ordine:
                    </h3>
                    <ol className="text-base md:text-lg text-gray-700 space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                        <span>Compili questo modulo con i tuoi dati</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                        <span>Ti chiamiamo per confermare la spedizione</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                        <span>Ricevi il pacco e paghi <strong>49,99€ in contanti</strong> al corriere</span>
                      </li>
                    </ol>
                  </div>

                  {/* Campo 1: Nome */}
                  <FormInput
                    id="name"
                    label="Nome e Cognome"
                    placeholder="Es: Maria Rossi"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={updateField('name')}
                    error={errors.name}
                  />

                  {/* Campo 2: Telefono */}
                  <FormInput
                    id="phone"
                    label="Telefono Cellulare"
                    type="tel"
                    placeholder="333 123 4567"
                    required
                    autoComplete="tel-national"
                    prefix="+39"
                    hint="Ti chiameremo per confermare l'ordine prima della spedizione"
                    value={formData.phone}
                    onChange={updateField('phone')}
                    error={errors.phone}
                    inputMode="numeric"
                    maxLength={10}
                  />

                  {/* Campo 3: Indirizzo */}
                  <FormInput
                    id="address"
                    label="Indirizzo di Spedizione"
                    placeholder="Es: Via Roma 10, 20100 Milano (MI)"
                    required
                    autoComplete="street-address"
                    hint="Inserisci via, numero civico, CAP, città e provincia"
                    value={formData.address}
                    onChange={updateField('address')}
                    error={errors.address}
                  />

                  {/* Submit Button - Extra large for older users */}
                  {/* Anti-spam: disabled until all 3 fields are properly filled */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormComplete}
                    className="w-full bg-brand-primary hover:bg-orange-600 active:bg-orange-700 disabled:bg-gray-400 text-white font-black text-xl md:text-2xl py-5 md:py-6 rounded-2xl shadow-lg transition-all disabled:cursor-not-allowed flex items-center justify-center gap-3 touch-manipulation min-h-[72px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-7 h-7 animate-spin" />
                        Invio in corso...
                      </>
                    ) : !isFormComplete ? (
                      <>
                        <Lock className="w-7 h-7" />
                        Compila tutti i campi
                      </>
                    ) : (
                      <span className="flex flex-col items-center">
                        <span className="flex items-center gap-2">
                          <CheckCircle className="w-6 h-6 md:w-7 md:h-7" />
                          CONFERMA ORDINE
                        </span>
                        <span className="text-sm md:text-base font-normal opacity-90">→ pagando alla consegna</span>
                      </span>
                    )}
                  </button>

                  {/* Microcopy */}
                  <p className="text-sm md:text-base text-gray-500 text-center leading-relaxed">
                    Cliccando &quot;Conferma Ordine&quot; accetti di essere ricontattato telefonicamente e dichiari di aver letto{' '}
                    <a href="https://segretisvelati.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">Privacy Policy</a> e{' '}
                    <a href="https://segretisvelati.com/termini-condizioni" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">Termini</a>.
                  </p>
                </form>
              </div>

              {/* Trust badges */}
              <div className="mt-6 flex flex-wrap justify-center gap-4 md:gap-6 text-base text-gray-600">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                  Dati Protetti
                </span>
                <span className="flex items-center gap-2">
                  <Truck className="w-6 h-6 text-blue-600" />
                  Spedizione 24h
                </span>
                <span className="flex items-center gap-2">
                  <Banknote className="w-6 h-6 text-brand-primary" />
                  Pagamento Sicuro
                </span>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="lg:sticky lg:top-4">
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 mb-3">
            <strong>Segreti Svelati S.r.l.</strong> · P.IVA IT12345678901 · Via Roma 123, 20121 Milano (MI)
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-4">
            <a href="https://segretisvelati.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 underline">Privacy Policy</a>
            <a href="https://segretisvelati.com/termini-condizioni" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 underline">Termini e Condizioni</a>
            <a href="https://segretisvelati.com/cookie-policy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 underline">Cookie Policy</a>
          </div>
          <p className="text-xs text-gray-400 max-w-2xl mx-auto">
            Integratore alimentare. I risultati possono variare. Non è un medicinale. Da usare con dieta equilibrata e stile di vita sano.
            Questo sito non è parte di Facebook o Facebook Inc. FACEBOOK è un marchio registrato di FACEBOOK, Inc.
          </p>
          <p className="text-xs text-gray-400 mt-2">© 2025 Segreti Svelati S.r.l. - Tutti i diritti riservati.</p>
        </div>
      </footer>

      {/* Success Modal */}
      <SuccessModal isOpen={showSuccess} />
    </div>
  )
}
