import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', // Applies the rules to all crawlers
        allow: '/', // Allows everything by default
      },
      {
        userAgent: '*', 
        disallow: '/login', // Exclude login page
      },
      {
        userAgent: '*',
        disallow: '/generateSignUpCode', // Exclude signup code generation
      },
      {
        userAgent: '*',
        disallow: '/properties/sell_property/create', // Exclude property creation
      },
    ],
    sitemap: 'https://hiildhaxal.online/sitemap.xml',
  };
}
