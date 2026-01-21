import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ==================== BOT BLACKLIST (BLOCKED) ====================
const BLOCKED_BOTS = [
  // Facebook/Meta
  'facebookexternalhit',
  'Facebot',
  'FacebookBot',
  'fb_iab',
  'FB_IAB',
  'meta-externalagent',

  // Google
  'Googlebot',
  'Google-InspectionTool',
  'Storebot-Google',
  'GoogleOther',
  'AdsBot-Google',
  'Mediapartners-Google',
  'APIs-Google',

  // Bing
  'bingbot',
  'BingPreview',
  'msnbot',
  'adidxbot',

  // Other search engines
  'DuckDuckBot',
  'Applebot',
  'YandexBot',
  'Baiduspider',

  // SEO & Competitor Tools
  'AhrefsBot',
  'AhrefsSiteAudit',
  'SemrushBot',
  'SEMrushBot',
  'MJ12bot',
  'DotBot',
  'BLEXBot',
  'MegaIndex',
  'seoscanners',
  'SEOkicks',
  'sistrix',
  'SISTRIX',
  'Screaming Frog',
  'screaming',
  'Moz/',
  'rogerbot',
  'MajesticSEO',
  'majestic',
  'spyfu',
  'SpyFu',
  'serpstat',

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
  'acunetix',
  'netsparker',
  'burpsuite',

  // Scrapers & Data Mining
  'curl/',
  'Curl/',
  'wget',
  'Wget',
  'python-requests',
  'Python-urllib',
  'python-urllib',
  'Go-http-client',
  'Java/',
  'libwww',
  'httpunit',
  'nutch',
  'phpcrawl',
  'httrack',
  'HTTrack',
  'webcopy',
  'WebCopy',
  'webzip',
  'WebZip',
  'teleport',
  'Teleport',
  'sitesucker',
  'SiteSucker',

  // AI Crawlers
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'cohere-ai',
  'PerplexityBot',
  'YouBot',
  'CCBot',
  'Bytespider',

  // Headless Browsers & Automation
  'HeadlessChrome',
  'PhantomJS',
  'Selenium',
  'WebDriver',
  'puppeteer',
  'Puppeteer',
  'playwright',
  'Playwright',

  // Misc Suspicious
  'Apache-HttpClient',
  'okhttp/',
  'node-fetch',
  'axios/',
  'got/',
  'libcurl',
  'PycURL',
  'aiohttp',
  'Mechanize',
  'Guzzle',
  'censys',
  'shodan',
];

// ==================== FUNCTIONS ====================

// Check if it's a REAL browser (mobile or desktop)
function isRealBrowser(userAgent: string): boolean {
  if (!userAgent || userAgent.length < 30) return false;

  const lowerUA = userAgent.toLowerCase();

  // Must contain at least one of these browser signatures
  const browserSignatures = [
    'mozilla/',
    'chrome/',
    'safari/',
    'firefox/',
    'edge/',
    'opera/',
    'samsung',
    'ucbrowser',
    'crios',  // Chrome iOS
    'fxios',  // Firefox iOS
  ];

  const hasBrowserSignature = browserSignatures.some(sig => lowerUA.includes(sig));

  // Must NOT contain bot keywords
  const botKeywords = ['bot', 'crawler', 'spider', 'scraper'];
  const hasBotKeyword = botKeywords.some(kw => lowerUA.includes(kw));

  return hasBrowserSignature && !hasBotKeyword;
}

// Check if it's a mobile device
function isMobileDevice(userAgent: string): boolean {
  const mobileRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS|FxiOS/i;
  return mobileRegex.test(userAgent);
}

// Check if it's a tablet
function isTabletDevice(userAgent: string): boolean {
  const tabletRegex = /iPad|Android(?!.*Mobile)|Tablet|tablet|PlayBook|Silk/i;
  return tabletRegex.test(userAgent);
}

// Check if bot is in blacklist
function isBlockedBot(userAgent: string): boolean {
  const lowerUA = userAgent.toLowerCase();
  for (const pattern of BLOCKED_BOTS) {
    if (lowerUA.includes(pattern.toLowerCase())) {
      return true;
    }
  }
  return false;
}

// ==================== MIDDLEWARE ====================

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';

  // ==================== ZEMPBIO PROTECTION ====================
  if (pathname === '/zempbio') {
    // PRIORITY 1: Real mobile/tablet devices ALWAYS see /zempbio
    if (isMobileDevice(userAgent) || isTabletDevice(userAgent)) {
      if (isRealBrowser(userAgent)) {
        return NextResponse.next();
      }
    }

    // PRIORITY 2: Real desktop browsers see /zempbio
    if (isRealBrowser(userAgent) && !isBlockedBot(userAgent)) {
      return NextResponse.next();
    }

    // PRIORITY 3: Block known bots → redirect to safe page
    if (isBlockedBot(userAgent)) {
      const url = request.nextUrl.clone();
      url.pathname = '/zempbio-info';
      return NextResponse.redirect(url);
    }

    // PRIORITY 4: Unknown/suspicious user agents → redirect to safe page
    if (!isRealBrowser(userAgent)) {
      const url = request.nextUrl.clone();
      url.pathname = '/zempbio-info';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Prevent accessing zempbio-info directly (redirect real users to zempbio)
  if (pathname === '/zempbio-info') {
    // Real browsers should go to main page
    if (isRealBrowser(userAgent) && !isBlockedBot(userAgent)) {
      const url = request.nextUrl.clone();
      url.pathname = '/zempbio';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ==================== MENOBALANCE PROTECTION ====================
  if (pathname === '/menobalance') {
    // Real users: Mobile → redirect to system
    if (isRealBrowser(userAgent) && !isBlockedBot(userAgent)) {
      const isMobile = isMobileDevice(userAgent);
      const isTablet = isTabletDevice(userAgent);

      if (isMobile && !isTablet) {
        const url = request.nextUrl.clone();
        url.pathname = '/menobalance-system';
        return NextResponse.redirect(url);
      }
    }
    return NextResponse.next();
  }

  if (pathname === '/menobalance-system') {
    // Block bots from mobile page
    if (isBlockedBot(userAgent) || !isRealBrowser(userAgent)) {
      const url = request.nextUrl.clone();
      url.pathname = '/menobalance';
      return NextResponse.redirect(url);
    }

    // Desktop/Tablet users → redirect to menobalance
    const isMobile = isMobileDevice(userAgent);
    const isTablet = isTabletDevice(userAgent);

    if (!isMobile || isTablet) {
      const url = request.nextUrl.clone();
      url.pathname = '/menobalance';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configure which paths to apply middleware
export const config = {
  matcher: ['/menobalance', '/menobalance-system', '/zempbio', '/zempbio-info'],
};
