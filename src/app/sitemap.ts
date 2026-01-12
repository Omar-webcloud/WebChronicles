import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
 
  const baseUrl = 'https://web-chronicles.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },

  ];
}
