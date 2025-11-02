import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://enviosdosruedas.com';

  const staticRoutes = [
    '/',
    '/contacto',
    '/cotizar/express',
    '/cotizar/lowcost',
    '/nosotros/nuestras-redes',
    '/nosotros/preguntas-frecuentes',
    '/nosotros/sobre-nosotros',
    '/servicios/envios-express',
    '/servicios/envios-lowcost',
    '/servicios/enviosflex',
    '/servicios/moto-fija',
    '/servicios/plan-emprendedores',
    '/ordenes',
    '/seguimiento',
    '/politica-de-privacidad',
    '/terminos-y-condiciones',
    '/admin',
    '/admin/login',
    '/admin/ordenes',
    '/admin/cotizaciones',
    '/admin/etiquetas',
    '/admin/add-post',
    '/admin/crea-imagenes',
  ];
 
  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : (route.startsWith('/admin') ? 0.3 : 0.8),
  }));
}
