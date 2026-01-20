import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ==================== NO WHITELIST - BLOCK ALL BOTS ====================
// All bots will be redirected to safe pages
const ALLOWED_BOTS: string[] = [];

// ==================== BOT BLACKLIST (BLOCKED) ====================
// These bots will be redirected to safe pages
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
  'Moz',
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
  'scraper',
  'Scraper',
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

  // AI Crawlers (block for content protection)
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

  // Known bad IPs patterns (user agents)
  'masscan',
  'zgrab',
  'censys',
  'shodan',
];

// ==================== SUSPICIOUS IP RANGES ====================
// Known datacenter/VPN/proxy IP ranges often used for scraping
const SUSPICIOUS_IP_PREFIXES = [
  // Common VPS/Cloud providers used for scraping
  '45.33.',    // Linode
  '45.56.',    // Linode
  '139.162.',  // Linode
  '172.104.',  // Linode
  '192.81.',   // Linode
  '66.175.',   // Linode
  '198.58.',   // Linode
  '23.239.',   // Linode
  '173.255.',  // Linode
  '69.164.',   // Linode
  '178.79.',   // Linode
  '188.166.',  // DigitalOcean
  '159.65.',   // DigitalOcean
  '167.99.',   // DigitalOcean
  '206.189.',  // DigitalOcean
  '178.62.',   // DigitalOcean
  '104.131.',  // DigitalOcean
  '104.236.',  // DigitalOcean
  '107.170.',  // DigitalOcean
  '138.68.',   // DigitalOcean
  '139.59.',   // DigitalOcean
  '142.93.',   // DigitalOcean
  '45.55.',    // DigitalOcean
  '46.101.',   // DigitalOcean
  '162.243.',  // DigitalOcean
  '192.241.',  // DigitalOcean
  '95.85.',    // DigitalOcean
  '5.101.',    // Vultr
  '45.32.',    // Vultr
  '45.63.',    // Vultr
  '45.76.',    // Vultr
  '45.77.',    // Vultr
  '66.42.',    // Vultr
  '104.238.',  // Vultr
  '108.61.',   // Vultr
  '149.28.',   // Vultr
  '155.138.',  // Vultr
  '207.148.',  // Vultr
  '209.250.',  // Vultr
  '216.128.',  // Vultr
  '185.92.',   // Hetzner
  '213.239.',  // Hetzner
  '144.76.',   // Hetzner
  '148.251.',  // Hetzner
  '176.9.',    // Hetzner
  '5.9.',      // Hetzner
  '78.46.',    // Hetzner
  '78.47.',    // Hetzner
  '85.10.',    // Hetzner
  '88.198.',   // Hetzner
  '88.99.',    // Hetzner
  '94.130.',   // Hetzner
  '95.216.',   // Hetzner
  '116.202.',  // Hetzner
  '116.203.',  // Hetzner
  '135.181.',  // Hetzner
  '157.90.',   // Hetzner
  '168.119.',  // Hetzner
  '195.201.',  // Hetzner
];

// ==================== FUNCTIONS ====================

// Check if bot is in whitelist
function isAllowedBot(userAgent: string): boolean {
  const lowerUA = userAgent.toLowerCase();
  for (const pattern of ALLOWED_BOTS) {
    if (lowerUA.includes(pattern.toLowerCase())) {
      return true;
    }
  }
  return false;
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

// Check for suspicious IP
function isSuspiciousIP(ip: string): boolean {
  if (!ip) return false;
  for (const prefix of SUSPICIOUS_IP_PREFIXES) {
    if (ip.startsWith(prefix)) {
      return true;
    }
  }
  return false;
}

// Detect generic bot patterns
function isGenericBot(userAgent: string): boolean {
  if (!userAgent || userAgent.length < 20) return true; // Too short = suspicious

  const lowerUA = userAgent.toLowerCase();

  // Generic bot keywords (only if not whitelisted)
  const genericPatterns = ['bot', 'crawler', 'spider', 'scraper', 'fetch', 'http'];
  for (const pattern of genericPatterns) {
    if (lowerUA.includes(pattern) && !isAllowedBot(userAgent)) {
      return true;
    }
  }

  return false;
}

// Check if is mobile device
function isMobileDevice(userAgent: string): boolean {
  const mobileRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(userAgent);
}

// Check if is tablet
function isTabletDevice(userAgent: string): boolean {
  const tabletRegex = /iPad|Android(?!.*Mobile)|Tablet|tablet|PlayBook|Silk/i;
  return tabletRegex.test(userAgent);
}

// ==================== MIDDLEWARE ====================

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                   request.headers.get('x-real-ip') ||
                   '';

  // ==================== ZEMPBIO PROTECTION ====================
  if (pathname === '/zempbio') {
    // Allow whitelisted bots (Facebook, Google, etc.)
    if (isAllowedBot(userAgent)) {
      return NextResponse.next();
    }

    // Block blacklisted bots → redirect to safe page
    if (isBlockedBot(userAgent) || isGenericBot(userAgent) || isSuspiciousIP(clientIP)) {
      const url = request.nextUrl.clone();
      url.pathname = '/zempbio-info';
      return NextResponse.redirect(url);
    }

    // Real users pass through
    return NextResponse.next();
  }

  // Prevent bots from accessing zempbio-info directly and going back to zempbio
  if (pathname === '/zempbio-info') {
    // If it's a real user (not a bot), redirect to main page
    if (!isBlockedBot(userAgent) && !isGenericBot(userAgent) && !isSuspiciousIP(clientIP) && userAgent.length > 50) {
      const url = request.nextUrl.clone();
      url.pathname = '/zempbio';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ==================== MENOBALANCE PROTECTION ====================
  if (pathname === '/menobalance') {
    // Allow whitelisted bots
    if (isAllowedBot(userAgent)) {
      return NextResponse.next();
    }

    // Block bad bots
    if (isBlockedBot(userAgent) || isGenericBot(userAgent) || isSuspiciousIP(clientIP)) {
      return NextResponse.next(); // Let them see the clean menobalance page
    }

    // Real users: Mobile → redirect to system
    const isMobile = isMobileDevice(userAgent);
    const isTablet = isTabletDevice(userAgent);

    if (isMobile && !isTablet) {
      const url = request.nextUrl.clone();
      url.pathname = '/menobalance-system';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (pathname === '/menobalance-system') {
    // Block bots from mobile page
    if (isBlockedBot(userAgent) || isGenericBot(userAgent)) {
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
