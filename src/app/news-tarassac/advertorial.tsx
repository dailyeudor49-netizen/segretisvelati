import React, { useState, useEffect } from 'react';
import { 
  Menu, Search, User, Clock, Eye, MessageCircle, Share2, 
  ThumbsUp, CheckCircle, ArrowRight, AlertTriangle, Lock, 
  TrendingUp, Star, ShieldCheck, Zap
} from 'lucide-react';

// --- SUB-COMPONENTS DEFINED INTERNALLY FOR SINGLE FILE PORTABILITY ---

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
      <div className="bg-brand-dark text-white py-1 text-xs text-center font-bold tracking-widest uppercase px-4">
        <span className="text-brand-red mr-2">● IN DIRETTA:</span> Report Investigativo Speciale - Lettura consigliata prima della rimozione
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-4 md:hidden">
          <Menu className="w-6 h-6 text-gray-700" />
        </div>
        
        <div className="flex-grow md:flex-grow-0 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="bg-brand-red text-white p-1 rounded-sm">
                <Lock size={20} />
            </div>
            <h1 className="font-headline text-2xl md:text-3xl font-bold text-brand-dark tracking-tighter uppercase">
              Segreti<span className="text-brand-red">Svelati</span>
            </h1>
          </div>
          <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 hidden md:block mt-1">
            Giornalismo d'inchiesta indipendente • Senza Censura
          </p>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6 font-bold text-xs uppercase text-gray-700">
            <a href="#" className="hover:text-brand-red transition-colors">Inchieste</a>
            <a href="#" className="hover:text-brand-red text-brand-red transition-colors">Salute Proibita</a>
            <a href="#" className="hover:text-brand-red transition-colors">Economia</a>
            <a href="#" className="hover:text-brand-red transition-colors">Tech</a>
          </nav>
          <div className="flex items-center space-x-3 border-l pl-6 border-gray-300">
            <Search className="w-5 h-5 text-gray-500 cursor-pointer hover:text-brand-red" />
            <span className="text-xs font-bold text-gray-400">{today}</span>
          </div>
        </div>
        
        <div className="md:hidden">
            <Search className="w-6 h-6 text-gray-700" />
        </div>
      </div>
      
      {/* Breaking Ticker */}
      <div className="bg-red-50 py-2 px-4 flex items-center justify-center border-b border-red-100">
        <div className="animate-pulse flex items-center gap-2 text-brand-red font-bold text-xs md:text-sm uppercase">
            <AlertTriangle size={16} />
            <span>Attenzione: Alto volume di traffico su questa pagina.</span>
        </div>
      </div>
    </header>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="space-y-8">
      {/* Author Widget */}
      <div className="bg-white p-6 border-t-4 border-brand-red shadow-sm">
        <h3 className="font-headline font-bold text-lg mb-4 uppercase text-gray-800">Chi ha scritto questo report?</h3>
        <div className="flex items-start space-x-4">
          <img src="https://picsum.photos/seed/doc_investigator/100/100" className="w-16 h-16 rounded-full object-cover grayscale contrast-125" alt="Dr Valli" />
          <div>
            <p className="font-bold text-sm text-brand-dark">Dr. Marco Valli</p>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Ex consulente per le grandi multinazionali del farmaco, ora "whistleblower" (informatore). Ha deciso di rivelare le verità che l'industria vuole tenere nascoste.
            </p>
          </div>
        </div>
      </div>

      {/* Trending "Secrets" */}
      <div className="bg-white p-4 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4 border-b border-gray-200 pb-2">
          <TrendingUp className="w-5 h-5 text-brand-red mr-2" />
          <h3 className="font-headline font-bold text-lg uppercase">Inchieste Popolari</h3>
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
                <p className="text-[10px] text-brand-red font-bold uppercase mb-1">Esclusivo</p>
                <h4 className="font-serif font-bold text-sm text-gray-800 leading-tight group-hover:text-brand-red transition-colors">
                  {title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Native Ad */}
      <div className="bg-gray-900 text-white p-6 text-center shadow-lg relative overflow-hidden group cursor-pointer" onClick={() => document.getElementById('special-offer')?.scrollIntoView({behavior: 'smooth'})}>
        <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 uppercase">Sponsorizzato</div>
        <p className="font-headline text-2xl font-bold mb-2 uppercase text-yellow-400">Pancia Gonfia?</p>
        <p className="text-sm text-gray-300 mb-4">Non è aria. È una "colla tossica" nel tuo intestino.</p>
        <img src="https://picsum.photos/seed/belly_fat/300/200" className="w-full h-32 object-cover mb-4 rounded opacity-80 group-hover:opacity-100 transition-opacity" alt="Ad" />
        <button className="w-full bg-brand-red text-white font-bold py-2 uppercase text-sm hover:bg-red-700 transition-colors">
            Vedi il rimedio >
        </button>
      </div>
    </aside>
  );
};

const CommentSection: React.FC = () => {
    // Fake live update effect
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
            img: "https://picsum.photos/seed/u1/50/50",
            text: "Ho letto l'articolo e ho ordinato subito. Sono al 5° giorno e ho perso 2kg, ma la cosa pazzesca è l'energia che ho. Non mi addormento più sul divano dopo cena!",
            time: "12 min fa"
        },
        {
            name: "Luca B.",
            loc: "Torino",
            img: "https://picsum.photos/seed/u2/50/50",
            text: "Il mio medico era scettico, ma quando ha visto le mie analisi dopo un mese di Tarassac Slim mi ha chiesto lui dove comprarlo. Assurdo.",
            time: "45 min fa"
        },
        {
            name: "Alessandra F.",
            loc: "Roma",
            img: "https://picsum.photos/seed/u3/50/50",
            text: "Fate presto perché il sito ogni tanto va giù per le troppe richieste. Io ne ho prese 6 confezioni per fare scorta per tutto l'anno.",
            time: "1 ora fa"
        }
    ];

    return (
        <div className="bg-white border border-gray-200 p-6 md:p-8 rounded shadow-sm mt-10">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <h3 className="font-headline text-xl font-bold uppercase text-gray-800">
                    Discussione in corso
                </h3>
                <span className="flex items-center text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    {likes} persone stanno leggendo
                </span>
            </div>

            <div className="space-y-6">
                {comments.map((c, i) => (
                    <div key={i} className="flex gap-4">
                        <img src={c.img} className="w-10 h-10 rounded-full border border-gray-200" alt={c.name} />
                        <div className="flex-1 bg-gray-50 p-3 rounded-lg rounded-tl-none">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="font-bold text-sm text-blue-900">{c.name}</span>
                                <span className="text-xs text-gray-400">{c.time}</span>
                            </div>
                            <p className="text-sm text-gray-700 leading-snug">{c.text}</p>
                            <div className="mt-2 flex gap-4 text-xs text-gray-500 font-bold cursor-pointer">
                                <span className="hover:text-blue-600">Mi piace</span>
                                <span className="hover:text-blue-600">Rispondi</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 bg-yellow-50 p-4 rounded border border-yellow-200 text-xs text-yellow-800 flex items-start gap-2">
                <ShieldCheck size={16} className="mt-0.5 shrink-0" />
                <p>I commenti sono moderati per evitare spam. A causa dell'alto volume di messaggi, la pubblicazione potrebbe subire ritardi.</p>
            </div>
        </div>
    );
};

const Footer: React.FC = () => (
    <footer className="bg-brand-dark text-gray-500 py-12 mt-12 text-xs">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
                <div className="flex items-center gap-2 mb-4">
                     <Lock size={16} className="text-brand-red"/>
                     <span className="font-headline font-bold text-white uppercase text-lg">Segreti<span className="text-brand-red">Svelati</span></span>
                </div>
                <p className="mb-4">La tua fonte numero 1 per notizie non censurate su salute, benessere e verità scomode.</p>
                <p className="text-gray-600">© 2024 Segreti Svelati Media Group.</p>
            </div>
            <div>
                <h4 className="text-white font-bold uppercase mb-3">Informazioni</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white">Chi Siamo</a></li>
                    <li><a href="#" className="hover:text-white">Redazione</a></li>
                    <li><a href="#" className="hover:text-white">Contattaci</a></li>
                </ul>
            </div>
            <div className="col-span-1 md:col-span-2">
                <h4 className="text-white font-bold uppercase mb-3">Disclaimer Importante</h4>
                <p className="leading-relaxed mb-2 text-[10px] text-justify">
                    I contenuti di questo sito web sono a scopo puramente informativo e di intrattenimento (advertorial). Non sostituiscono il parere medico professionale. "Segreti Svelati" è un brand di marketing. La storia del Dr. Valli è una drammatizzazione basata su casi reali. I risultati di Tarassac Slim variano da persona a persona.
                </p>
                <p className="text-[10px] text-justify">
                    Questo prodotto non è destinato a diagnosticare, trattare, curare o prevenire alcuna malattia. Le testimonianze riportate sono di utenti reali, ma per la privacy alcuni nomi e foto potrebbero essere stati cambiati.
                </p>
            </div>
        </div>
    </footer>
);

const StickyCTA: React.FC<{isVisible: boolean}> = ({ isVisible }) => {
    if (!isVisible) return null;
    return (
        <div className="fixed bottom-0 w-full bg-white border-t-4 border-brand-red shadow-[0_-5px_20px_rgba(0,0,0,0.2)] z-50 p-3 animate-in slide-in-from-bottom duration-500">
            <div className="container mx-auto max-w-5xl flex items-center justify-between gap-4">
                <div className="hidden md:flex flex-col">
                    <span className="text-xs uppercase font-bold text-gray-500">Offerta a tempo limitato</span>
                    <span className="font-headline font-bold text-xl text-brand-dark">Tarassac Slim™</span>
                </div>
                
                <div className="flex-1 flex items-center justify-end gap-3 md:gap-6">
                     <div className="text-right">
                        <div className="text-[10px] text-gray-400 line-through">PREZZO: €99.00</div>
                        <div className="text-xl md:text-2xl font-black text-brand-red leading-none">€49.00</div>
                     </div>
                     <button 
                        onClick={() => document.getElementById('special-offer')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-brand-red hover:bg-red-700 text-white font-bold py-3 px-6 md:px-10 rounded shadow-lg uppercase tracking-wider text-sm md:text-base flex items-center gap-2 transition-transform transform hover:scale-105 active:scale-95"
                     >
                        Sblocca Offerta <ArrowRight size={18} />
                     </button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [showSticky, setShowSticky] = useState(false);
  
  // Timer for scarcity effect
  const [minutes, setMinutes] = useState(14);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Countdown logic
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

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Article Content */}
          <article className="lg:w-2/3 bg-white p-6 md:p-10 shadow-sm border border-gray-100 rounded-sm">
            
            {/* Editorial Meta */}
            <div className="flex items-center space-x-2 text-brand-red font-bold text-[10px] md:text-xs uppercase tracking-wider mb-4 font-headline">
              <span className="bg-brand-red text-white px-2 py-0.5 rounded-sm">Esclusiva</span>
              <span>Reportage</span>
              <span className="text-gray-300">/</span>
              <span>Metabolismo</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-brand-dark leading-tight mb-4">
              "Mi Hanno Minacciato, Ma Non Tacerò": Esperto Italiano Svela La "Molecola Spazzina" Che Svuota Le Cellule Di Grasso (E Perché È Stata Nascosta)
            </h1>

            {/* Subhead */}
            <h2 className="text-lg md:text-xl text-gray-600 mb-6 font-sans leading-relaxed border-l-4 border-brand-red pl-4 italic">
              Se hai più di 40 anni e la dieta non funziona più, leggi questo articolo prima che venga oscurato. La causa del tuo blocco metabolico non è il cibo.
            </h2>

            {/* Author Byline */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8 text-sm">
              <div className="flex items-center gap-3">
                 <img src="https://picsum.photos/seed/doc_investigator/50/50" className="w-10 h-10 rounded-full border border-gray-300 grayscale" alt="Author" />
                 <div>
                    <span className="block font-bold text-brand-dark">Dr. Marco Valli</span>
                    <span className="text-xs text-gray-500">Investigatore Scientifico</span>
                 </div>
              </div>
              <div className="text-right text-xs text-gray-500">
                <p>Aggiornato il: <span className="font-bold text-gray-700">{currentDate}</span></p>
                <div className="flex justify-end gap-2 mt-1">
                   <span className="flex items-center gap-1"><Eye size={12}/> 142.3k Letture</span>
                   <span className="flex items-center gap-1 text-brand-red font-bold"><Clock size={12}/> 3 min rimasti</span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-brand-dark prose-strong:font-black">
                
                <p className="lead text-xl md:text-2xl font-serif text-gray-800 italic mb-6">
                    <span className="text-5xl float-left mr-3 mt-[-10px] font-black text-brand-red">"N</span>
                    on vogliono che tu sappia che il dimagrimento è una questione chimica, non calorica."
                </p>

                <p>
                    Queste sono le parole del Dr. Valli che hanno fatto tremare i giganti dell'industria dietetica. Per anni, ci hanno venduto l'idea che per dimagrire bisogna soffrire. Fame. Palestra. Rinunce.
                </p>
                
                <p>
                    <strong>Ma è una bugia.</strong> E oggi abbiamo le prove.
                </p>

                <figure className="my-8">
                    <img src="https://picsum.photos/seed/fat_cells/800/400" className="w-full rounded shadow-md border border-gray-200" alt="Microscopio" />
                    <figcaption className="text-xs text-gray-500 mt-2 italic text-center">Figura 1: Cellule adipose "bloccate" dalle tossine ambientali. Finché non vengono liberate, nessun esercizio le brucerà.</figcaption>
                </figure>

                <h3 className="text-2xl text-brand-dark mt-8 mb-4">La Scoperta Casuale in un Laboratorio di Torino</h3>

                <p>
                    Mentre studiava gli effetti dell'inquinamento sul fegato, il team del Dr. Valli ha notato un'anomalia. Un gruppo di soggetti, nonostante mangiasse normalmente, perdeva peso a una velocità doppia rispetto agli altri.
                </p>
                <p>
                    Il loro segreto? Nel loro sangue c'erano tracce elevatissime di <strong>Inulina da Tarassaco Concentrato</strong>.
                </p>

                <div className="bg-red-50 p-6 my-8 rounded border-l-4 border-brand-red shadow-sm">
                    <h4 className="flex items-center gap-2 font-bold text-brand-red uppercase mb-2">
                        <Zap className="fill-current" size={20}/>
                        Il Meccanismo "Switch"
                    </h4>
                    <p className="text-sm md:text-base mb-0 font-medium">
                        Il fegato umano ha un "interruttore" di sicurezza. Quando rileva troppe tossine (da cibo spazzatura, aria, stress), <strong>smette di bruciare grassi</strong> e inizia a immagazzinarli per proteggere gli organi vitali. È un meccanismo di difesa. Ecco perché la tua dieta non funziona: il tuo corpo sta cercando di salvarti!
                    </p>
                </div>

                <p>
                    Il <strong>Tarassac Slim</strong> non è una semplice tisana. È il risultato di un processo di <em>Crio-Estrazione</em> che isola la molecola attiva del tarassaco, capace di "convincere" il fegato che il pericolo è passato.
                </p>
                
                <p>
                    Nel momento in cui questo accade, il corpo rilascia il grasso accumulato come una diga che si apre.
                </p>

                <ul className="space-y-4 my-8 bg-gray-50 p-6 rounded-lg list-none">
                    {[
                        "Sgonfiamento addominale visibile in 48 ore",
                        "Energia mentale triplicata (addio nebbia cerebrale)",
                        "Nessuna dieta da fame richiesta",
                        "100% Naturale e privo di effetti collaterali noti"
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                            <CheckCircle className="text-green-500 shrink-0" size={24} />
                            <span className="font-bold text-gray-800">{item}</span>
                        </li>
                    ))}
                </ul>

                <h3 className="text-2xl text-brand-dark mt-8 mb-4">Perché non lo trovi in farmacia?</h3>
                <p>
                    Semplice. Una cura che funziona <em>troppo velocemente</em> non è redditizia. Se perdi peso e non lo riprendi più, smetti di comprare pillole, barrette e abbonamenti.
                </p>
                <p>
                    Hanno provato a fermare la distribuzione di <strong>Tarassac Slim</strong>, ma grazie a Internet, la verità sta venendo a galla.
                </p>

                {/* THE OFFER - HIGH CONVERSION BLOCK */}
                <div id="special-offer" className="mt-12 relative">
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-brand-red text-white px-4 py-1 font-bold uppercase tracking-widest text-sm shadow-md rounded-full z-10 whitespace-nowrap">
                        Offerta Riservata Ai Lettori
                    </div>
                    
                    <div className="border-4 border-brand-red rounded-xl bg-white p-6 md:p-10 shadow-2xl relative overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>

                        <div className="text-center relative z-10">
                            <h4 className="font-headline text-4xl md:text-5xl font-black text-brand-dark mb-2">Tarassac Slim™</h4>
                            <p className="text-lg text-gray-600 mb-6 font-serif italic">Formula Clinica Avanzata</p>
                            
                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-blue-400 rounded-full filter blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                    <img src="https://picsum.photos/seed/supp_bottle/300/400" alt="Product" className="w-48 md:w-56 relative z-10 drop-shadow-2xl transform transition hover:scale-105 duration-500" />
                                    <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black font-bold w-20 h-20 flex items-center justify-center rounded-full text-center text-xs shadow-lg transform rotate-12">
                                        NUOVA<br/>FORMULA<br/>2025
                                    </div>
                                </div>
                                
                                <div className="text-left space-y-4">
                                    <div className="flex items-end gap-3">
                                        <span className="text-gray-400 line-through text-2xl">€99.00</span>
                                        <span className="text-5xl font-black text-brand-red">€49.00</span>
                                    </div>
                                    <div className="text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full inline-flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                                        Disponibilità Immediata
                                    </div>
                                    <p className="text-xs text-gray-500 max-w-xs">
                                        *Prezzo bloccato per i prossimi <span className="font-bold text-brand-red">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span> minuti.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 max-w-lg mx-auto">
                                <button 
                                    className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-5 px-6 rounded-lg text-xl md:text-2xl shadow-xl transform transition hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center group animate-pulse-slow"
                                    onClick={() => alert('Redirecting to secure checkout...')}
                                >
                                    ORDINA ORA <span className="text-sm font-normal ml-2 opacity-80">(Sconto 50%)</span>
                                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                                </button>
                                
                                <img src="https://picsum.photos/seed/payments/400/50" alt="Pagamenti Sicuri" className="h-6 mx-auto opacity-60 grayscale hover:grayscale-0 transition-all" />
                                
                                <div className="flex items-center justify-center gap-6 text-xs text-gray-500 font-medium">
                                    <span className="flex items-center gap-1"><ShieldCheck size={14}/> Pagamento alla consegna</span>
                                    <span className="flex items-center gap-1"><Star size={14}/> Garanzia Soddisfatti/Rimborsati</span>
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
      <StickyCTA isVisible={showSticky} />
    </div>
  );
};

export default App;