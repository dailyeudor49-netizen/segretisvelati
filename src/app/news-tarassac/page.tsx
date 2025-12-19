'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu, Search, Clock, Eye,
  CheckCircle, ArrowRight, AlertTriangle, Lock,
  TrendingUp, Star, ShieldCheck, Zap
} from 'lucide-react';

// --- SUB-COMPONENTS ---

const Header: React.FC = () => {
  const today = new Date().toLocaleDateString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      {/* Top Warning Bar */}
      <div className="bg-gray-900 text-white py-1 text-[10px] md:text-xs text-center font-bold tracking-wider uppercase px-2">
        <span className="text-red-500 mr-1">●</span>
        <span className="hidden sm:inline">IN DIRETTA: </span>Report Investigativo
        <span className="hidden sm:inline"> Speciale - Lettura consigliata prima della rimozione</span>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-3 py-2 md:py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-3 md:hidden">
          <Menu className="w-5 h-5 text-gray-700" />
        </div>

        <div className="flex-grow md:flex-grow-0 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1.5">
            <div className="bg-red-600 text-white p-0.5 md:p-1 rounded-sm">
                <Lock size={16} className="md:w-5 md:h-5" />
            </div>
            <h1 className="font-bold text-xl md:text-3xl text-gray-900 tracking-tighter uppercase">
              Segreti<span className="text-red-600">Svelati</span>
            </h1>
          </div>
          <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 hidden md:block mt-1">
            Giornalismo d'inchiesta indipendente
          </p>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6 font-bold text-xs uppercase text-gray-700">
            <a href="#" className="hover:text-red-600 transition-colors">Inchieste</a>
            <a href="#" className="hover:text-red-600 text-red-600 transition-colors">Salute Proibita</a>
            <a href="#" className="hover:text-red-600 transition-colors">Economia</a>
          </nav>
          <div className="flex items-center space-x-3 border-l pl-6 border-gray-300">
            <Search className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-600" />
            <span className="text-xs font-bold text-gray-400">{today}</span>
          </div>
        </div>

        <div className="md:hidden">
            <Search className="w-5 h-5 text-gray-700" />
        </div>
      </div>

      {/* Breaking Ticker */}
      <div className="bg-red-50 py-1.5 px-3 flex items-center justify-center border-b border-red-100">
        <div className="animate-pulse flex items-center gap-1.5 text-red-600 font-bold text-[10px] md:text-sm uppercase">
            <AlertTriangle size={14} />
            <span>Alto volume di traffico su questa pagina</span>
        </div>
      </div>
    </header>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="space-y-6">
      {/* Author Widget */}
      <div className="bg-white p-4 md:p-6 border-t-4 border-red-600 shadow-sm">
        <h3 className="font-bold text-base md:text-lg mb-3 uppercase text-gray-800">Chi ha scritto questo report?</h3>
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-xl md:text-2xl font-bold shrink-0">MV</div>
          <div>
            <p className="font-bold text-sm text-gray-900">Dr. Marco Valli</p>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Ex consulente per le multinazionali del farmaco, ora "whistleblower". Rivela le verità che l'industria nasconde.
            </p>
          </div>
        </div>
      </div>

      {/* Trending "Secrets" - Hidden on mobile */}
      <div className="hidden md:block bg-white p-4 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4 border-b border-gray-200 pb-2">
          <TrendingUp className="w-5 h-5 text-red-600 mr-2" />
          <h3 className="font-bold text-lg uppercase">Inchieste Popolari</h3>
        </div>
        <div className="space-y-4">
          {[
            "Big Pharma trema: la pianta che sostituisce la statina",
            "La verità sull'acqua in bottiglia che nessuno dice",
            "Elettrosmog: Siamo davvero al sicuro nelle nostre case?"
          ].map((title, idx) => (
            <div key={idx} className="flex group cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
              <span className="text-3xl font-bold text-gray-200 mr-3 -mt-1 font-serif">{idx + 1}</span>
              <div>
                <p className="text-[10px] text-red-600 font-bold uppercase mb-1">Esclusivo</p>
                <h4 className="font-serif font-bold text-sm text-gray-800 leading-tight group-hover:text-red-600 transition-colors">
                  {title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Native Ad */}
      <div className="bg-gray-900 text-white p-4 md:p-6 text-center shadow-lg relative overflow-hidden group cursor-pointer">
        <Link href="/tarassac-feg">
          <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[9px] font-bold px-1.5 py-0.5 uppercase">Sponsorizzato</div>
          <p className="text-xl md:text-2xl font-bold mb-2 uppercase text-yellow-400">Pancia Gonfia?</p>
          <p className="text-xs md:text-sm text-gray-300 mb-3">Non è aria. È una "colla tossica" nel tuo intestino.</p>
          <span className="block w-full bg-red-600 text-white font-bold py-2 uppercase text-sm hover:bg-red-700 transition-colors rounded">
              Vedi il rimedio &gt;
          </span>
        </Link>
      </div>
    </aside>
  );
};

const CommentSection: React.FC = () => {
    const [likes, setLikes] = useState(1241);
    useEffect(() => {
        const interval = setInterval(() => {
            setLikes(l => l + Math.floor(Math.random() * 3));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const comments = [
        {
            name: "Giulia M.",
            loc: "Verona",
            text: "Ho ordinato subito. 5° giorno e ho perso 2kg, ma la cosa pazzesca è l'energia che ho!",
            time: "12 min fa"
        },
        {
            name: "Luca B.",
            loc: "Torino",
            text: "Il mio medico era scettico, ma quando ha visto le analisi dopo un mese mi ha chiesto lui dove comprarlo.",
            time: "45 min fa"
        },
        {
            name: "Alessandra F.",
            loc: "Roma",
            text: "Fate presto perché il sito ogni tanto va giù. Io ne ho prese 6 confezioni per fare scorta!",
            time: "1 ora fa"
        }
    ];

    return (
        <div className="bg-white border border-gray-200 p-4 md:p-6 rounded shadow-sm mt-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                <h3 className="text-base md:text-xl font-bold uppercase text-gray-800">
                    Discussione in corso
                </h3>
                <span className="flex items-center text-[10px] md:text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-start sm:self-auto">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                    {likes} leggendo
                </span>
            </div>

            <div className="space-y-4">
                {comments.map((c, i) => (
                    <div key={i} className="flex gap-2.5 md:gap-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs md:text-sm shrink-0">
                            {c.name.charAt(0)}
                        </div>
                        <div className="flex-1 bg-gray-50 p-2.5 md:p-3 rounded-lg rounded-tl-none">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="font-bold text-xs md:text-sm text-blue-900">{c.name}</span>
                                <span className="text-[10px] md:text-xs text-gray-400">{c.time}</span>
                            </div>
                            <p className="text-xs md:text-sm text-gray-700 leading-snug">{c.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 bg-yellow-50 p-3 rounded border border-yellow-200 text-[10px] md:text-xs text-yellow-800 flex items-start gap-2">
                <ShieldCheck size={14} className="mt-0.5 shrink-0" />
                <p>Commenti moderati. A causa dell'alto volume, la pubblicazione potrebbe subire ritardi.</p>
            </div>
        </div>
    );
};

const Footer: React.FC = () => (
    <footer className="bg-gray-900 text-gray-500 py-8 md:py-12 mt-8 text-xs pb-24 md:pb-12">
        <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                 <Lock size={14} className="text-red-600"/>
                 <span className="font-bold text-white uppercase text-base">Segreti<span className="text-red-600">Svelati</span></span>
            </div>
            <p className="mb-4 text-center md:text-left text-[10px]">La tua fonte per notizie non censurate su salute e benessere.</p>
            <div className="border-t border-gray-800 pt-4 mt-4">
                <p className="leading-relaxed text-[9px] md:text-[10px] text-gray-600 text-center md:text-left">
                    Advertorial a scopo informativo. Non sostituisce il parere medico. I risultati variano da persona a persona.
                    © 2024 Segreti Svelati Media Group.
                </p>
            </div>
        </div>
    </footer>
);

const StickyCTA: React.FC<{isVisible: boolean; minutes: number; seconds: number}> = ({ isVisible, minutes, seconds }) => {
    if (!isVisible) return null;
    return (
        <div className="fixed bottom-0 w-full bg-white border-t-2 md:border-t-4 border-red-600 shadow-[0_-5px_20px_rgba(0,0,0,0.2)] z-50 p-2 md:p-3 safe-area-bottom">
            <div className="container mx-auto max-w-5xl flex items-center justify-between gap-2 md:gap-4">
                <div className="hidden sm:flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-500">Offerta limitata</span>
                    <span className="font-bold text-base md:text-xl text-gray-900">Tarassac Slim™</span>
                </div>

                <div className="flex-1 flex items-center justify-between sm:justify-end gap-2 md:gap-6">
                     <div className="text-left sm:text-right">
                        <div className="text-[9px] md:text-[10px] text-gray-400 line-through">€99,98</div>
                        <div className="text-base md:text-2xl font-black text-red-600 leading-none">2x49,99€</div>
                        <div className="text-[9px] text-red-500 font-bold sm:hidden">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
                     </div>
                     <Link
                        href="/tarassac-feg"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 md:py-3 px-4 md:px-8 rounded shadow-lg uppercase tracking-wide text-xs md:text-sm flex items-center gap-1.5 transition-transform transform active:scale-95"
                     >
                        Ordina Ora <ArrowRight size={16} />
                     </Link>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---

export default function Advertorial1Page() {
  const [showSticky, setShowSticky] = useState(false);
  const [minutes, setMinutes] = useState(14);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    const timer = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        } else {
            if (minutes === 0) {
                clearInterval(timer);
            } else {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
        }
    }, 1000);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        clearInterval(timer);
    };
  }, [seconds, minutes]);

  const currentDate = new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900 overflow-x-hidden">
      <Header />

      <main className="flex-grow container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">

          {/* Main Article Content */}
          <article className="lg:w-2/3 bg-white p-4 md:p-10 shadow-sm border border-gray-100 rounded-sm">

            {/* Editorial Meta */}
            <div className="flex items-center flex-wrap gap-1.5 text-red-600 font-bold text-[10px] uppercase tracking-wider mb-3">
              <span className="bg-red-600 text-white px-1.5 py-0.5 rounded-sm">Esclusiva</span>
              <span>Reportage</span>
              <span className="text-gray-300">/</span>
              <span>Metabolismo</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-2xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3 md:mb-4">
              "Mi Hanno Minacciato, Ma Non Tacerò": Esperto Svela La "Molecola Spazzina" Che Svuota Le Cellule Di Grasso
            </h1>

            {/* Subhead */}
            <h2 className="text-sm md:text-xl text-gray-600 mb-4 md:mb-6 leading-relaxed border-l-4 border-red-600 pl-3 md:pl-4 italic">
              Se hai più di 40 anni e la dieta non funziona più, leggi questo prima che venga oscurato.
            </h2>

            {/* Author Byline */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-200 pb-4 mb-6 text-sm">
              <div className="flex items-center gap-2.5">
                 <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">MV</div>
                 <div>
                    <span className="block font-bold text-gray-900 text-sm">Dr. Marco Valli</span>
                    <span className="text-[10px] md:text-xs text-gray-500">Investigatore Scientifico</span>
                 </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] md:text-xs text-gray-500">
                <span>{currentDate}</span>
                <span className="flex items-center gap-1"><Eye size={11}/> 142.3k</span>
                <span className="flex items-center gap-1 text-red-600 font-bold"><Clock size={11}/> 3 min</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="prose prose-sm md:prose-lg max-w-none">

                <p className="text-base md:text-2xl font-serif text-gray-800 italic mb-4 md:mb-6">
                    <span className="text-4xl md:text-5xl float-left mr-2 md:mr-3 mt-[-5px] md:mt-[-10px] font-black text-red-600">"N</span>
                    on vogliono che tu sappia che il dimagrimento è una questione chimica, non calorica."
                </p>

                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                    Queste sono le parole del Dr. Valli che hanno fatto tremare i giganti dell'industria dietetica. Per anni, ci hanno venduto l'idea che per dimagrire bisogna soffrire. Fame. Palestra. Rinunce.
                </p>

                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                    <strong className="text-gray-900">Ma è una bugia.</strong> E oggi abbiamo le prove.
                </p>

                <figure className="my-6 md:my-8">
                    <div className="w-full rounded shadow-md border border-gray-200 overflow-hidden">
                        <img
                            src="/images/TARASSIC/cellui.jpg"
                            alt="Ricerca cellulare in laboratorio"
                            className="w-full h-auto"
                        />
                    </div>
                    <figcaption className="text-[10px] md:text-xs text-gray-500 mt-2 italic text-center">Cellule adipose "bloccate" dalle tossine. Finché non vengono liberate, nessun esercizio le brucerà.</figcaption>
                </figure>

                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-6 md:mt-8 mb-3 md:mb-4">La Scoperta in un Laboratorio di Torino</h3>

                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                    Mentre studiava gli effetti dell'inquinamento sul fegato, il team del Dr. Valli ha notato un'anomalia. Un gruppo perdeva peso a velocità doppia rispetto agli altri.
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                    Il loro segreto? Nel sangue c'erano tracce elevatissime di <strong className="text-gray-900">Inulina da Tarassaco Concentrato</strong>.
                </p>

                <div className="bg-red-50 p-4 md:p-6 my-6 md:my-8 rounded border-l-4 border-red-600 shadow-sm">
                    <h4 className="flex items-center gap-2 font-bold text-red-600 uppercase mb-2 text-sm md:text-base">
                        <Zap className="fill-current" size={18}/>
                        Il Meccanismo "Switch"
                    </h4>
                    <p className="text-xs md:text-base mb-0 font-medium text-gray-700">
                        Il fegato ha un "interruttore" di sicurezza. Quando rileva troppe tossine, <strong className="text-gray-900">smette di bruciare grassi</strong> e li immagazzina per proteggere gli organi. Ecco perché la tua dieta non funziona!
                    </p>
                </div>

                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                    <strong className="text-gray-900">Tarassac Slim</strong> non è una semplice tisana. È il risultato di un processo di <em>Crio-Estrazione</em> che isola la molecola attiva, capace di "convincere" il fegato che il pericolo è passato.
                </p>

                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                    Nel momento in cui questo accade, il corpo rilascia il grasso come una diga che si apre.
                </p>

                <ul className="space-y-3 my-6 md:my-8 bg-gray-50 p-4 md:p-6 rounded-lg list-none">
                    {[
                        "Sgonfiamento addominale in 48 ore",
                        "Energia mentale triplicata",
                        "Nessuna dieta da fame richiesta",
                        "100% Naturale"
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2.5">
                            <CheckCircle className="text-green-500 shrink-0" size={20} />
                            <span className="font-bold text-gray-800 text-sm md:text-base">{item}</span>
                        </li>
                    ))}
                </ul>

                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-6 md:mt-8 mb-3 md:mb-4">Perché non lo trovi in farmacia?</h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                    Semplice. Una cura che funziona <em>troppo velocemente</em> non è redditizia. Se perdi peso e non lo riprendi più, smetti di comprare pillole e abbonamenti.
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                    Hanno provato a fermare la distribuzione di <strong className="text-gray-900">Tarassac Slim</strong>, ma grazie a Internet, la verità sta venendo a galla.
                </p>

                {/* THE OFFER - HIGH CONVERSION BLOCK */}
                <div id="special-offer" className="mt-8 md:mt-12 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 font-bold uppercase tracking-wider text-[10px] md:text-sm shadow-md rounded-full z-10 whitespace-nowrap">
                        Offerta Riservata Ai Lettori
                    </div>

                    <div className="border-3 md:border-4 border-red-600 rounded-xl bg-white p-4 md:p-10 shadow-2xl relative overflow-hidden">
                        <div className="text-center relative z-10">
                            <h4 className="text-2xl md:text-5xl font-black text-gray-900 mb-1 md:mb-2">Tarassac Slim™</h4>
                            <p className="text-sm md:text-lg text-gray-600 mb-4 md:mb-6 font-serif italic">Formula Clinica Avanzata</p>

                            <div className="flex flex-col items-center gap-4 md:gap-8 mb-6 md:mb-8">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-green-400 rounded-full filter blur-xl opacity-20"></div>
                                    <img
                                        src="/images/TARASSIC/Tarassic1.png"
                                        alt="Tarassac Slim"
                                        className="w-36 md:w-56 relative z-10 drop-shadow-2xl"
                                    />
                                    <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-yellow-400 text-black font-bold w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-full text-center text-[9px] md:text-xs shadow-lg transform rotate-12">
                                        NUOVA<br/>FORMULA<br/>2025
                                    </div>
                                </div>

                                <div className="text-center space-y-2 md:space-y-4">
                                    <div className="flex items-end justify-center gap-2 md:gap-3">
                                        <span className="text-gray-400 line-through text-lg md:text-2xl">€99,98</span>
                                        <span className="text-3xl md:text-5xl font-black text-red-600">2x49,99€</span>
                                    </div>
                                    <div className="text-green-600 font-bold text-xs md:text-sm bg-green-50 px-3 py-1 rounded-full inline-flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                                        Disponibilità Immediata
                                    </div>
                                    <p className="text-[10px] md:text-xs text-gray-500">
                                        *Prezzo bloccato per <span className="font-bold text-red-600">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span> min.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 md:space-y-4 max-w-lg mx-auto">
                                <Link
                                    href="/tarassac-feg"
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 md:py-5 px-6 rounded-lg text-lg md:text-2xl shadow-xl flex items-center justify-center group active:scale-[0.98] transition-transform"
                                >
                                    ORDINA ORA
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={22} />
                                </Link>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-6 text-[10px] md:text-xs text-gray-500 font-medium">
                                    <span className="flex items-center gap-1"><ShieldCheck size={12}/> Pagamento alla consegna</span>
                                    <span className="flex items-center gap-1"><Star size={12}/> Soddisfatti o Rimborsati</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <CommentSection />
          </article>

          {/* Sidebar Column */}
          <div className="lg:w-1/3">
             <Sidebar />
          </div>

        </div>
      </main>

      <Footer />
      <StickyCTA isVisible={showSticky} minutes={minutes} seconds={seconds} />
    </div>
  );
}
