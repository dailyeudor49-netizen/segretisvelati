import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

  // Applica solo alla pagina /menobalance
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

  // Applica anche alla pagina /menobalance-system
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
