import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lista completa di bot conosciuti
const BOT_PATTERNS = [
  // Social Media Crawlers
  'facebookexternalhit',
  'Facebot',
  'FacebookBot',
  'fb_iab',
  'FB_IAB',
  'FBAV',
  'FBAN',
  'Instagram',
  'LinkedInBot',
  'Twitterbot',
  'Pinterest',
  'Pinterestbot',
  'TelegramBot',
  'WhatsApp',
  'Snapchat',
  'Discordbot',
  'Slackbot',
  'vkShare',
  'Viber',

  // Search Engine Bots
  'Googlebot',
  'Google-InspectionTool',
  'Storebot-Google',
  'GoogleOther',
  'Google-Extended',
  'AdsBot-Google',
  'Mediapartners-Google',
  'APIs-Google',
  'bingbot',
  'BingPreview',
  'msnbot',
  'adidxbot',
  'Baiduspider',
  'YandexBot',
  'YandexImages',
  'YandexMobileBot',
  'DuckDuckBot',
  'DuckDuckGo-Favicons-Bot',
  'Sogou',
  'Exabot',
  'ia_archiver',
  'archive.org_bot',

  // SEO & Analytics Tools
  'AhrefsBot',
  'AhrefsSiteAudit',
  'SemrushBot',
  'SEMrushBot',
  'MJ12bot',
  'DotBot',
  'BLEXBot',
  'MegaIndex',
  'SeznamBot',
  'seoscanners',
  'SEOkicks',
  'sistrix',
  'SISTRIX',
  'Screaming Frog',
  'screaming',

  // Security & Vulnerability Scanners
  'Nessus',
  'Nikto',
  'sqlmap',
  'nmap',
  'masscan',
  'ZmEu',
  'Morfeus',
  'Zgrab',
  'wpscan',
  'WPScan',
  'nuclei',
  'dirbuster',
  'gobuster',
  'whatweb',
  'httpx',

  // Generic Bots & Crawlers
  'bot',
  'Bot',
  'BOT',
  'crawler',
  'Crawler',
  'spider',
  'Spider',
  'scraper',
  'Scraper',
  'curl',
  'Curl',
  'wget',
  'Wget',
  'python-requests',
  'Python-urllib',
  'python-urllib',
  'Python',
  'Go-http-client',
  'Java',
  'libwww',
  'httpunit',
  'nutch',
  'phpcrawl',
  'msnbot',
  'jyxobot',
  'FAST-WebCrawler',
  'FAST Enterprise Crawler',
  'biglotron',
  'teoma',
  'convera',
  'seekbot',
  'gigablast',
  'voilabot',
  'ia_archiver',
  'GingerCrawler',
  'webmon',
  'httrack',
  'HTTrack',
  'webcrawler',
  'grub.org',
  'UsineNouvelleCrawler',
  'antibot',
  'netresearchserver',
  'speedy',
  'fluffy',
  'findlink',
  'msrbot',
  'panscient',
  'yacybot',
  'AISearchBot',
  'ips-agent',
  'tagoobot',
  'MJ12bot',
  'woriobot',
  'yanga',
  'buzzbot',
  'mlbot',
  'yandex',
  'purebot',
  'Linguee Bot',
  'CyberPatrol',
  'voilabot',
  'baiduspider',
  'citeseerxbot',
  'spbot',
  'twengabot',
  'postrank',
  'turnitinbot',
  'scribdbot',
  'page2rss',
  'sitebot',
  'linkdex',
  'ezooms',
  'dotbot',
  'mail.ru_bot',
  'discobot',
  'heritrix',
  'findthatfile',
  'europarchive.org',
  'NerdByNature.Bot',
  'sistrix crawler',
  'ahrefsbot',
  'aboundex',
  'domaincrawler',
  'wbsearchbot',
  'summify',
  'ccbot',
  'CCBot',
  'edisterbot',
  'seznambot',
  'ec2linkfinder',
  'gslfbot',
  'aihitbot',
  'intelium_bot',
  'yeti',
  'retrevopageanalyzer',
  'lb-spider',
  'sogou',
  'lssbot',
  'careerbot',
  'wotbox',
  'wocbot',
  'ichiro',
  'duckduckgo',
  'lssrocketcrawler',
  'drupact',
  'webcompanycrawler',
  'acoonbot',
  'openindexspider',
  'gnam gnam spider',
  'web-hierarchyspider',
  'backlinkcrawler',
  'coccoc',
  'integromedb',
  'content crawler spider',
  'toplistbot',
  'seokicks-robot',
  'it2media-domain-crawler',
  'ip-web-crawler.com',
  'siteexplorer.info',
  'elisabot',
  'proximic',
  'changedetection',
  'blexbot',
  'arabot',
  'WeSEE:Search',
  'niki-bot',
  'crystalsemanticsbot',
  'rogerbot',
  '360Spider',
  'psbot',
  'interfaxscanbot',
  'lipperheyseoservice',
  'cc metadata scaper',
  'g00g1e.net',
  'grapeshotcrawler',
  'urlappendbot',
  'brainobot',
  'fr-crawler',
  'binlar',
  'simplecrawler',
  'livelapbot',
  'tweetmemebot',
  'paperlibot',
  'sogou web spider',
  'megaindex.ru',
  'ltx71',
  'obot',
  'PetalBot',
  'Applebot',
  'Bytespider',
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'cohere-ai',
  'PerplexityBot',
  'YouBot',

  // Headless Browsers & Automation
  'HeadlessChrome',
  'PhantomJS',
  'Selenium',
  'WebDriver',
  'puppeteer',
  'Puppeteer',
  'playwright',
  'Playwright',
  'CasperJS',
  'SlimerJS',
  'Nightmare',
  'Electron',
  'Zombie',

  // Monitoring & Uptime
  'UptimeRobot',
  'Pingdom',
  'Site24x7',
  'StatusCake',
  'NewRelicPinger',
  'Datadog',
  'Catchpoint',
  'monitis',
  'GTmetrix',
  'PageSpeed',

  // Preview Services
  'Embedly',
  'Quora Link Preview',
  'Slack-ImgProxy',
  'redditbot',
  'Tumblr',
  'vkShare',
  'W3C_Validator',
  'W3C-checklink',
  'W3C-mobileOK',

  // Misc Suspicious
  'Apache-HttpClient',
  'okhttp',
  'axios',
  'node-fetch',
  'undici',
  'got',
  'request',
  'superagent',
  'http.rb',
  'Faraday',
  'RestSharp',
  'libcurl',
  'PycURL',
  'aiohttp',
  'httpx',
  'Mechanize',
  'WWW-Mechanize',
  'LWP::Simple',
  'URI::Fetch',
  'Zend_Http_Client',
  'Guzzle',
  'Typhoeus',
];

// Funzione per rilevare se è un bot
function isBot(userAgent: string): boolean {
  if (!userAgent || userAgent.length < 10) return true; // UA troppo corto = sospetto

  const lowerUA = userAgent.toLowerCase();

  // Controlla ogni pattern
  for (const pattern of BOT_PATTERNS) {
    if (lowerUA.includes(pattern.toLowerCase())) {
      return true;
    }
  }

  return false;
}

// Funzione per rilevare se è mobile
function isMobileDevice(userAgent: string): boolean {
  const mobileRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(userAgent);
}

// Funzione per rilevare se è tablet
function isTabletDevice(userAgent: string): boolean {
  const tabletRegex = /iPad|Android(?!.*Mobile)|Tablet|tablet|PlayBook|Silk/i;
  return tabletRegex.test(userAgent);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';

  // PROTEZIONE BOT: Tutti i bot vanno su /menobalance (pagina pulita)
  if (isBot(userAgent)) {
    if (pathname !== '/menobalance') {
      const url = request.nextUrl.clone();
      url.pathname = '/menobalance';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // UTENTI REALI: Logica mobile/desktop

  // Applica alla pagina /menobalance
  if (pathname === '/menobalance') {
    const isMobile = isMobileDevice(userAgent);
    const isTablet = isTabletDevice(userAgent);

    // Mobile (non tablet) → redirect a /menobalance-system
    if (isMobile && !isTablet) {
      const url = request.nextUrl.clone();
      url.pathname = '/menobalance-system';
      return NextResponse.redirect(url);
    }

    // Desktop e Tablet → restano su /menobalance
    return NextResponse.next();
  }

  // Applica alla pagina /menobalance-system
  if (pathname === '/menobalance-system') {
    const isMobile = isMobileDevice(userAgent);
    const isTablet = isTabletDevice(userAgent);

    // Desktop e Tablet → redirect a /menobalance
    if (!isMobile || isTablet) {
      const url = request.nextUrl.clone();
      url.pathname = '/menobalance';
      return NextResponse.redirect(url);
    }

    // Mobile → resta su /menobalance-system
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configura su quali path applicare il middleware
export const config = {
  matcher: ['/menobalance', '/menobalance-system'],
};
