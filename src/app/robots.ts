import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // IMPORTANT: Replace with your actual production domain
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://enviosdosruedas.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'], // Disallow crawling of admin pages
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
