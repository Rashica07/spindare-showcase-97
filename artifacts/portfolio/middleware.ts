import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // llms.txt is served as a plain file at /llms.txt (linked from robots.txt) and
  // is not swapped in for "/" based on User-Agent. Serving different content at
  // the same URL depending on who's asking is cloaking — it looks the same to a
  // crawler's abuse detection whether the intent is malicious or not, and it's
  // exactly the kind of behavior AI fetch tools' safety layers are built to flag.
  const cookieName = 'kiqa_lang';
  const hasLangCookie = request.cookies.has(cookieName);

  if (!hasLangCookie) {
    // Vercel populates x-vercel-ip-country on Edge; Cloudflare Workers populates
    // cf-ipcountry instead. Check both so this works on either platform.
    const country = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry') || '';

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
