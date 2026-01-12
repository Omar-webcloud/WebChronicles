import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://web-chronicles.vercel.app';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
