import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookieName = 'kiqa_lang';
  const hasLangCookie = request.cookies.has(cookieName);

  if (!hasLangCookie) {
    // Vercel populates x-vercel-ip-country on Edge
    const country = request.headers.get('x-vercel-ip-country') || '';
    
    let lang = 'en';
    if (country === 'IT') lang = 'it';
    else if (country === 'AL' || country === 'XK') lang = 'sq'; // XK is Kosovo
    else if (country === 'DE' || country === 'AT' || country === 'CH') lang = 'de';

    const response = NextResponse.next();
    response.cookies.set(cookieName, lang, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
