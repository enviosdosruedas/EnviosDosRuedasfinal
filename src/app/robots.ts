import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://enviosdosruedas.com';

  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: '/admin/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
