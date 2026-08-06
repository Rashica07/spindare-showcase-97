import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'ClaudeBot', 'Anthropic-ai', 'PerplexityBot'],
        allow: ['/', '/llms.txt'],
      }
    ],
    sitemap: 'https://kiqa-dev.it/sitemap.xml',
  }
}
