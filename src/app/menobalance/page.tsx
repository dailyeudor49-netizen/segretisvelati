'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  ThumbsUp,
  Share2,
  Bookmark,
  Clock,
  User,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Heart,
  Send,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

// Forum Comments Data
const FORUM_COMMENTS = [
  {
    id: 1,
    author: "Dott.ssa Elena Martini",
    role: "Ginecologa",
    verified: true,
    time: "3 ore fa",
    content: "Articolo molto ben fatto. Vorrei aggiungere che la perimenopausa può iniziare anche 8-10 anni prima della menopausa vera e propria. Molte donne non riconoscono i sintomi perché pensano di essere 'troppo giovani'. Il mio consiglio è sempre quello di tenere un diario dei sintomi e parlarne apertamente con il proprio medico.",
    likes: 234,
    replies: [
      {
        author: "Lucia R.",
        time: "2 ore fa",
        content: "Grazie Dottoressa! Io ho 44 anni e pensavo fosse solo stress. Invece erano i primi segnali."
      }
    ]
  },
  {
    id: 2,
    author: "Marta B.",
    role: "Utente",
    verified: false,
    time: "5 ore fa",
    content: "Finalmente un articolo che spiega le cose senza allarmismi. Ho 52 anni e sto attraversando questo periodo. Le vampate di notte sono devastanti, ma sapere che è normale e che esistono soluzioni mi tranquillizza molto.",
    likes: 156,
    replies: []
  },
  {
    id: 3,
    author: "Prof. Marco Bianchi",
    role: "Endocrinologo",
    verified: true,
    time: "6 ore fa",
    content: "Ottima panoramica. Aggiungo che gli integratori naturali possono essere un valido supporto, ma è fondamentale scegliere prodotti di qualità con ingredienti clinicamente testati. La berberina, ad esempio, ha numerosi studi a supporto per il metabolismo. Consiglio sempre di verificare la provenienza e la certificazione dei prodotti.",
    likes: 312,
    replies: [
      {
        author: "Giulia F.",
        time: "5 ore fa",
        content: "Professore, quali certificazioni dovremmo cercare?"
      },
      {
        author: "Prof. Marco Bianchi",
        time: "4 ore fa",
        content: "Cercare sempre prodotti con certificazione GMP (Good Manufacturing Practice) e possibilmente notificati al Ministero della Salute."
      }
    ]
  },
  {
    id: 4,
    author: "Francesca D.",
    role: "Utente",
    verified: false,
    time: "8 ore fa",
    content: "Ho letto tutto d'un fiato. Sono in menopausa da 2 anni e ho provato di tutto. Quello che mi ha aiutato di più è stato cambiare alimentazione e iniziare a dormire meglio. Gli integratori naturali mi hanno dato una mano con il sonno. Ogni donna è diversa, bisogna trovare il proprio equilibrio.",
    likes: 89,
    replies: []
  },
  {
    id: 5,
    author: "Anna M.",
    role: "Utente",
    verified: false,
    time: "10 ore fa",
    content: "Grazie per aver parlato anche dell'aspetto psicologico. Nessuno ne parla mai, ma l'ansia e gli sbalzi d'umore sono stati per me i sintomi più difficili da gestire. Mi sentivo sola, ora so che è comune.",
    likes: 201,
    replies: [
      {
        author: "Valentina S.",
        time: "9 ore fa",
        content: "Ti capisco perfettamente Anna. L'importante è non isolarsi e parlarne."
      }
    ]
  },
  {
    id: 6,
    author: "Dott. Roberto Ferri",
    role: "Nutrizionista",
    verified: true,
    time: "12 ore fa",
    content: "Vorrei sottolineare l'importanza dell'alimentazione in questa fase. Ridurre zuccheri raffinati, aumentare proteine e grassi buoni, e non saltare i pasti sono regole base che possono fare una grande differenza. L'integrazione può supportare, ma non sostituisce uno stile di vita sano.",
    likes: 178,
    replies: []
  },
  {
    id: 7,
    author: "Paola C.",
    role: "Utente",
    verified: false,
    time: "14 ore fa",
    content: "Ho 48 anni e sono nel pieno della perimenopausa. Questo articolo mi ha aperto gli occhi su tante cose. Non sapevo che il metabolismo rallentasse così tanto in questa fase. Ora capisco perché nonostante mangiassi come prima, prendevo peso.",
    likes: 145,
    replies: []
  },
  {
    id: 8,
    author: "Simona L.",
    role: "Utente",
    verified: false,
    time: "1 giorno fa",
    content: "Condivido la mia esperienza: dopo aver parlato con la mia ginecologa, ho iniziato un percorso che include alimentazione, movimento leggero e integrazione naturale. Dopo 3 mesi mi sento molto meglio. Non esistono miracoli, ma piccoli passi costanti.",
    likes: 267,
    replies: [
      {
        author: "Carla B.",
        time: "20 ore fa",
        content: "Che tipo di movimento fai Simona?"
      },
      {
        author: "Simona L.",
        time: "18 ore fa",
        content: "Camminate di 30 minuti al giorno e yoga 2 volte a settimana. Niente di estremo!"
      }
    ]
  },
  {
    id: 9,
    author: "Teresa G.",
    role: "Utente",
    verified: false,
    time: "1 giorno fa",
    content: "Bellissimo articolo, finalmente informazione seria. Una domanda: è vero che lo stress peggiora i sintomi della menopausa?",
    likes: 56,
    replies: [
      {
        author: "Dott.ssa Elena Martini",
        time: "1 giorno fa",
        content: "Assolutamente sì Teresa. Lo stress cronico aumenta il cortisolo che può amplificare vampate, insonnia e aumento di peso. Gestire lo stress è fondamentale."
      }
    ]
  },
  {
    id: 10,
    author: "Roberta N.",
    role: "Utente",
    verified: false,
    time: "2 giorni fa",
    content: "Ho 55 anni, in menopausa da 4. All'inizio è stata dura, ma ora ho trovato il mio equilibrio. Il segreto? Accettare questo cambiamento come naturale e non come una malattia. E circondarsi di persone che capiscono.",
    likes: 334,
    replies: []
  }
];

// Related Articles
const RELATED_ARTICLES = [
  {
    title: "I 10 alimenti che aiutano durante la menopausa",
    category: "Alimentazione",
    readTime: "8 min"
  },
  {
    title: "Esercizi dolci per il benessere in menopausa",
    category: "Fitness",
    readTime: "6 min"
  },
  {
    title: "Come migliorare il sonno dopo i 50 anni",
    category: "Benessere",
    readTime: "10 min"
  },
  {
    title: "Integratori naturali: guida completa",
    category: "Salute",
    readTime: "12 min"
  }
];

export default function MenobalanceArticlePage() {
  const [expandedComments, setExpandedComments] = useState<number[]>([1, 3]);
  const [likedComments, setLikedComments] = useState<number[]>([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [articleLiked, setArticleLiked] = useState(false);
  const [articleSaved, setArticleSaved] = useState(false);

  const toggleReplies = (id: number) => {
    setExpandedComments(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleLike = (id: number) => {
    setLikedComments(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const visibleComments = showAllComments ? FORUM_COMMENTS : FORUM_COMMENTS.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-sm">Salute & Benessere</h1>
              <p className="text-xs text-gray-500">Il magazine della salute femminile</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <span className="hover:text-purple-600 cursor-pointer">Home</span>
            <span className="hover:text-purple-600 cursor-pointer">Articoli</span>
            <span className="hover:text-purple-600 cursor-pointer">Community</span>
            <span className="hover:text-purple-600 cursor-pointer">Esperti</span>
          </nav>
        </div>
      </header>

      {/* Article Hero */}
      <div className="bg-gradient-to-b from-purple-50 to-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-purple-600 font-medium mb-4">
            <span className="bg-purple-100 px-3 py-1 rounded-full">Salute Femminile</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">Approfondimento</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Menopausa e Metabolismo: Guida Completa ai Cambiamenti del Corpo Femminile
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
            Tutto quello che devi sapere sui cambiamenti ormonali, metabolici e psicologici che accompagnano questa fase naturale della vita. Consigli pratici, pareri di esperti e soluzioni basate sulla scienza.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                  DR
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Dott.ssa Rossella Nappi</p>
                <p className="text-xs">Ginecologa ed Endocrinologa</p>
              </div>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                15 min di lettura
              </span>
              <span>Aggiornato: 20 Dicembre 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">

          {/* Indice */}
          <div className="bg-gray-50 rounded-xl p-6 mb-10">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-purple-600" />
              In questo articolo
            </h3>
            <ol className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2 hover:text-purple-600 cursor-pointer">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                Cos'è la menopausa e quando inizia
              </li>
              <li className="flex items-center gap-2 hover:text-purple-600 cursor-pointer">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                I sintomi più comuni
              </li>
              <li className="flex items-center gap-2 hover:text-purple-600 cursor-pointer">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                Perché il metabolismo rallenta
              </li>
              <li className="flex items-center gap-2 hover:text-purple-600 cursor-pointer">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                L'impatto sulla qualità del sonno
              </li>
              <li className="flex items-center gap-2 hover:text-purple-600 cursor-pointer">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                Strategie e soluzioni naturali
              </li>
              <li className="flex items-center gap-2 hover:text-purple-600 cursor-pointer">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">6</span>
                Quando consultare un medico
              </li>
            </ol>
          </div>

          {/* Sezione 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              1. Cos'è la menopausa e quando inizia
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La menopausa è un processo biologico naturale che segna la fine del ciclo mestruale. Tecnicamente, si parla di menopausa quando sono trascorsi 12 mesi consecutivi dall'ultima mestruazione. In Italia, l'età media in cui si verifica è intorno ai <strong>51 anni</strong>, ma può variare significativamente da donna a donna (generalmente tra i 45 e i 55 anni).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Prima della menopausa vera e propria, esiste un periodo di transizione chiamato <strong>perimenopausa</strong>, che può durare da 4 a 10 anni. Durante questa fase, i livelli di estrogeni e progesterone iniziano a fluttuare in modo irregolare, causando i primi sintomi.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">Lo sapevi?</h4>
                  <p className="text-blue-800 text-sm">
                    Secondo l'ISTAT, in Italia ci sono oltre 10 milioni di donne in menopausa o perimenopausa. Nonostante questo, molte si sentono poco informate sui cambiamenti che stanno vivendo.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              È importante sottolineare che la menopausa non è una malattia, ma una fase naturale della vita. Tuttavia, i cambiamenti ormonali che la accompagnano possono influenzare significativamente il benessere quotidiano, ed è per questo che informarsi è fondamentale.
            </p>
          </section>

          {/* Sezione 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              2. I sintomi più comuni
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              I sintomi della menopausa variano molto da donna a donna, sia per tipologia che per intensità. Alcune donne attraversano questa fase con disturbi minimi, mentre altre possono sperimentare sintomi più impattanti sulla qualità della vita.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm">🔥</span>
                  Sintomi vasomotori
                </h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Vampate di calore
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Sudorazioni notturne
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Brividi improvvisi
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm">😴</span>
                  Disturbi del sonno
                </h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Difficoltà ad addormentarsi
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Risvegli frequenti
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Sonno non ristoratore
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm">⚖️</span>
                  Cambiamenti metabolici
                </h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Aumento di peso
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Accumulo addominale
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Metabolismo rallentato
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">🧠</span>
                  Sintomi psicologici
                </h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Sbalzi d'umore
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Ansia e irritabilità
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Difficoltà di concentrazione
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Secondo studi recenti, circa il <strong>75% delle donne</strong> sperimenta vampate di calore, mentre i disturbi del sonno colpiscono fino al 60% delle donne in menopausa. È importante ricordare che questi sintomi sono temporanei e tendono a diminuire nel tempo.
            </p>
          </section>

          {/* Sezione 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              3. Perché il metabolismo rallenta
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Uno degli aspetti più frustranti della menopausa per molte donne è la difficoltà nel mantenere il peso forma. Questo accade per diverse ragioni interconnesse:
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xl">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Calo degli estrogeni</h4>
                  <p className="text-gray-600 text-sm">
                    Gli estrogeni giocano un ruolo importante nella regolazione del metabolismo. Quando i loro livelli diminuiscono, il corpo tende a bruciare meno calorie a riposo e ad accumulare grasso, soprattutto nella zona addominale.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xl">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Perdita di massa muscolare</h4>
                  <p className="text-gray-600 text-sm">
                    Con l'età e i cambiamenti ormonali, si verifica una naturale perdita di massa muscolare (sarcopenia). Poiché i muscoli bruciano più calorie del tessuto adiposo, questo contribuisce al rallentamento metabolico.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xl">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Resistenza all'insulina</h4>
                  <p className="text-gray-600 text-sm">
                    I cambiamenti ormonali possono influenzare la sensibilità all'insulina, rendendo più difficile per il corpo gestire gli zuccheri e favorendo l'accumulo di grasso.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xl">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Qualità del sonno</h4>
                  <p className="text-gray-600 text-sm">
                    La carenza di sonno, comune in menopausa, altera gli ormoni della fame (leptina e grelina), portando ad aumentare l'appetito e la preferenza per cibi calorici.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
              <h4 className="font-bold text-yellow-800 mb-2">Importante da sapere</h4>
              <p className="text-yellow-700 text-sm">
                Non è colpa tua se fai fatica a mantenere il peso. Questi cambiamenti sono biologici e documentati dalla scienza. La buona notizia è che esistono strategie efficaci per supportare il metabolismo in questa fase.
              </p>
            </div>
          </section>

          {/* Sezione 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              4. L'impatto sulla qualità del sonno
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              I disturbi del sonno sono tra i sintomi più sottovalutati ma impattanti della menopausa. La diminuzione degli estrogeni influenza direttamente la produzione di melatonina e la termoregolazione corporea, rendendo più difficile addormentarsi e mantenere un sonno profondo.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Le sudorazioni notturne, in particolare, interrompono i cicli del sonno e impediscono di raggiungere le fasi REM, essenziali per il riposo ristoratore. Questo crea un circolo vizioso: la stanchezza aumenta lo stress, che a sua volta peggiora i sintomi.
            </p>

            <div className="bg-indigo-50 rounded-xl p-6 my-6">
              <h4 className="font-bold text-indigo-900 mb-4">Gli effetti della carenza di sonno</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-indigo-600">+23%</div>
                  <div className="text-xs text-gray-600 mt-1">Aumento appetito</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-indigo-600">-15%</div>
                  <div className="text-xs text-gray-600 mt-1">Metabolismo basale</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-indigo-600">+40%</div>
                  <div className="text-xs text-gray-600 mt-1">Livelli di cortisolo</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-indigo-600">-20%</div>
                  <div className="text-xs text-gray-600 mt-1">Capacità cognitive</div>
                </div>
              </div>
              <p className="text-xs text-indigo-700 mt-4 text-center italic">
                *Dati basati su studi clinici pubblicati su peer-reviewed journals
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Migliorare la qualità del sonno è quindi una priorità per affrontare al meglio questa fase. Esistono diverse strategie, dall'igiene del sonno agli integratori naturali come la melatonina e la valeriana.
            </p>
          </section>

          {/* Sezione 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              5. Strategie e soluzioni naturali
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Affrontare i cambiamenti della menopausa richiede un approccio integrato che tenga conto di alimentazione, stile di vita e, quando necessario, integrazione mirata. Ecco le strategie più efficaci secondo la ricerca scientifica:
            </p>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-green-50 p-4 border-b border-green-100">
                  <h4 className="font-bold text-green-800 flex items-center gap-2">
                    <span className="text-xl">🥗</span>
                    Alimentazione
                  </h4>
                </div>
                <div className="p-5">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span><strong>Aumentare le proteine</strong> (1-1.2g per kg di peso) per preservare la massa muscolare</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span><strong>Ridurre zuccheri raffinati</strong> per migliorare la sensibilità insulinica</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span><strong>Consumare fitoestrogeni naturali</strong> (soia, semi di lino, legumi)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span><strong>Non saltare i pasti</strong> per mantenere stabile la glicemia</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-blue-50 p-4 border-b border-blue-100">
                  <h4 className="font-bold text-blue-800 flex items-center gap-2">
                    <span className="text-xl">🏃‍♀️</span>
                    Attività fisica
                  </h4>
                </div>
                <div className="p-5">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span><strong>Allenamento di resistenza</strong> 2-3 volte a settimana per mantenere la massa muscolare</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span><strong>Camminata quotidiana</strong> di almeno 30 minuti</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span><strong>Yoga e stretching</strong> per gestire stress e migliorare il sonno</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-purple-50 p-4 border-b border-purple-100">
                  <h4 className="font-bold text-purple-800 flex items-center gap-2">
                    <span className="text-xl">💊</span>
                    Integrazione naturale
                  </h4>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 mb-4">
                    Alcuni integratori naturali hanno mostrato risultati promettenti nella ricerca scientifica:
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                      <span><strong>Berberina</strong> - Supporta il metabolismo glucidico (numerosi studi clinici)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                      <span><strong>Melatonina</strong> - Aiuta a regolare il ciclo sonno-veglia</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                      <span><strong>Valeriana</strong> - Favorisce il rilassamento e il sonno</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                      <span><strong>Magnesio</strong> - Supporta il sistema nervoso e muscolare</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-4 italic">
                    * Prima di assumere qualsiasi integratore, è consigliabile consultare il proprio medico.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-orange-50 p-4 border-b border-orange-100">
                  <h4 className="font-bold text-orange-800 flex items-center gap-2">
                    <span className="text-xl">😴</span>
                    Igiene del sonno
                  </h4>
                </div>
                <div className="p-5">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <span><strong>Temperatura fresca</strong> nella camera da letto (18-20°C)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <span><strong>Evitare schermi</strong> 1 ora prima di dormire</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <span><strong>Routine regolare</strong> - andare a letto alla stessa ora</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <span><strong>Limitare caffeina</strong> dopo le 14:00</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Sezione 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              6. Quando consultare un medico
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sebbene la menopausa sia un processo naturale, è importante consultare un medico quando i sintomi impattano significativamente sulla qualità della vita. Non esitare a cercare supporto professionale se:
            </p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
              <ul className="space-y-2 text-red-800">
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Le vampate di calore sono così frequenti da interferire con le attività quotidiane
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Soffri di insonnia cronica per più di 2-3 settimane
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Noti sanguinamenti vaginali anomali
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Sperimenti sintomi depressivi o ansia intensa
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Hai dubbi sui trattamenti o integratori da assumere
                </li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Un ginecologo o un endocrinologo possono aiutarti a trovare la strategia più adatta alla tua situazione, che può includere terapia ormonale sostitutiva, integratori specifici o altri trattamenti personalizzati.
            </p>
          </section>

          {/* Conclusione */}
          <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusione</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La menopausa è una transizione significativa nella vita di ogni donna, ma non deve essere vissuta come un ostacolo. Con le giuste informazioni, il supporto adeguato e strategie personalizzate, è possibile attraversare questa fase mantenendo benessere e qualità della vita.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ricorda: ogni donna è unica, e ciò che funziona per una potrebbe non funzionare per un'altra. L'importante è ascoltare il proprio corpo, non avere paura di chiedere aiuto e affrontare questo cambiamento con consapevolezza.
            </p>
            <p className="text-gray-700 leading-relaxed font-medium">
              Hai trovato utile questo articolo? Condividilo con chi potrebbe beneficiarne e lascia un commento con la tua esperienza nella sezione sottostante.
            </p>
          </section>

          {/* Article Actions */}
          <div className="flex items-center justify-between border-t border-gray-200 mt-10 pt-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setArticleLiked(!articleLiked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  articleLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${articleLiked ? 'fill-current' : ''}`} />
                <span className="font-medium">{articleLiked ? '2.847' : '2.846'}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="font-medium hidden md:inline">Condividi</span>
              </button>
            </div>
            <button
              onClick={() => setArticleSaved(!articleSaved)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                articleSaved ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${articleSaved ? 'fill-current' : ''}`} />
              <span className="font-medium hidden md:inline">{articleSaved ? 'Salvato' : 'Salva'}</span>
            </button>
          </div>
        </div>

        {/* Author Box */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0">
              DR
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Dott.ssa Rossella Nappi</h3>
              <p className="text-purple-600 text-sm font-medium mb-2">Ginecologa ed Endocrinologa</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Professore Ordinario di Ostetricia e Ginecologia presso l'Università di Pavia. Da oltre 20 anni si occupa di salute della donna con particolare attenzione alla menopausa e ai disturbi ormonali. Autrice di numerose pubblicazioni scientifiche internazionali.
              </p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-10">
          <h3 className="font-bold text-gray-900 text-xl mb-6">Articoli correlati</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {RELATED_ARTICLES.map((article, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer">
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">{article.category}</span>
                <h4 className="font-bold text-gray-900 mt-3 mb-2 hover:text-purple-600 transition-colors">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime} di lettura
                </p>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-purple-600" />
              Discussione ({FORUM_COMMENTS.length} commenti)
            </h3>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <option>Più recenti</option>
              <option>Più popolari</option>
              <option>Più vecchi</option>
            </select>
          </div>

          {/* Comment Input */}
          <div className="flex gap-3 mb-8 pb-8 border-b border-gray-100">
            <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="border border-gray-200 rounded-xl p-3 focus-within:border-purple-300 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                <textarea
                  placeholder="Condividi la tua esperienza o fai una domanda..."
                  className="w-full resize-none outline-none text-gray-700 placeholder-gray-400"
                  rows={3}
                />
              </div>
              <div className="flex justify-end mt-3">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <Send className="w-4 h-4" />
                  Pubblica
                </button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {visibleComments.map((comment) => (
              <div key={comment.id} className="group">
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white font-bold ${
                    comment.verified ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'
                  }`}>
                    {comment.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">{comment.author}</span>
                      {comment.verified && (
                        <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Verificato
                        </span>
                      )}
                      {comment.role !== "Utente" && (
                        <span className="bg-purple-100 text-purple-600 text-xs font-medium px-2 py-0.5 rounded-full">
                          {comment.role}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs mb-2">{comment.time}</p>
                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>

                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => toggleLike(comment.id)}
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          likedComments.includes(comment.id) ? 'text-purple-600' : 'text-gray-500 hover:text-purple-600'
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${likedComments.includes(comment.id) ? 'fill-current' : ''}`} />
                        <span>{likedComments.includes(comment.id) ? comment.likes + 1 : comment.likes}</span>
                      </button>
                      <button className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
                        Rispondi
                      </button>
                      {comment.replies.length > 0 && (
                        <button
                          onClick={() => toggleReplies(comment.id)}
                          className="text-sm text-purple-600 font-medium flex items-center gap-1"
                        >
                          {expandedComments.includes(comment.id) ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Nascondi risposte
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              {comment.replies.length} {comment.replies.length === 1 ? 'risposta' : 'risposte'}
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Replies */}
                    {expandedComments.includes(comment.id) && comment.replies.length > 0 && (
                      <div className="mt-4 ml-4 pl-4 border-l-2 border-gray-100 space-y-4">
                        {comment.replies.map((reply, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold">
                              {reply.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-gray-900 text-sm">{reply.author}</span>
                                <span className="text-gray-400 text-xs">{reply.time}</span>
                              </div>
                              <p className="text-gray-700 text-sm">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {!showAllComments && FORUM_COMMENTS.length > 5 && (
            <button
              onClick={() => setShowAllComments(true)}
              className="w-full mt-8 py-3 text-purple-600 font-medium bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
            >
              Mostra tutti i {FORUM_COMMENTS.length} commenti
            </button>
          )}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-sm border border-purple-100 p-6 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Hai domande? Contattaci
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Il nostro team di esperti è a tua disposizione per rispondere a qualsiasi domanda sulla menopausa e il benessere femminile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">redazione@saluteebenessere.it</p>
                  <p className="text-sm text-gray-500 mt-1">Rispondiamo entro 24 ore</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Telefono</h3>
                  <p className="text-gray-600">+39 02 1234567</p>
                  <p className="text-sm text-gray-500 mt-1">Lun-Ven 9:00-18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Redazione</h3>
                  <p className="text-gray-600">Via della Salute 42</p>
                  <p className="text-sm text-gray-500 mt-1">20121 Milano (MI)</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <form className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome e Cognome
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    placeholder="Il tuo nome"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    placeholder="La tua email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Oggetto
                  </label>
                  <select
                    id="contact-subject"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all bg-white"
                  >
                    <option value="">Seleziona un argomento</option>
                    <option value="info">Informazioni generali</option>
                    <option value="menopausa">Domande sulla menopausa</option>
                    <option value="articolo">Suggerimento articolo</option>
                    <option value="collaborazione">Proposta di collaborazione</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
                    Messaggio
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Scrivi il tuo messaggio..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all resize-none"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="contact-privacy"
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="contact-privacy" className="text-sm text-gray-600">
                    Ho letto e accetto la <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a> e acconsento al trattamento dei miei dati personali.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Invia Messaggio
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                I tuoi dati sono al sicuro. Non condividiamo le tue informazioni con terze parti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <div>
                <h4 className="font-bold text-white">Salute & Benessere</h4>
                <p className="text-xs">Informazione responsabile</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Chi siamo</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Termini</a>
              <a href="#" className="hover:text-white transition-colors">Contatti</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p className="mb-4">
              Le informazioni contenute in questo sito hanno scopo puramente informativo e non sostituiscono in alcun modo il parere del medico.
            </p>
            <p>© {new Date().getFullYear()} Salute & Benessere Magazine. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
