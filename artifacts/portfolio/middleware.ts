import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Markdown for Agents: Serve llms.txt if AI bot is detected or if requested via text/markdown
  const userAgent = request.headers.get('user-agent') || '';
  const acceptHeader = request.headers.get('accept') || '';
  const isAIBot = /GPTBot|ChatGPT-User|ClaudeBot|Claude-Web|Anthropic-ai|PerplexityBot|OAI-SearchBot/i.test(userAgent);
  const wantsMarkdown = acceptHeader.includes('text/markdown');
  
  if ((isAIBot || wantsMarkdown) && request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/llms.txt', request.url));
  }

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
