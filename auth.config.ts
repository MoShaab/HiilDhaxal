import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to /properties after login
      return baseUrl + '/properties';
    },
    authorized({ auth, request: { nextUrl } }) {
      console.log("Auth User:", auth?.user);
      console.log("Next URL:", nextUrl.pathname);

      const isLoggedIn = !!auth?.user;
      const isRestrictedPage =
        nextUrl.pathname === '/properties/sell_property/create' ||
        nextUrl.pathname === '/properties/edit';

      if (isRestrictedPage) {
        if (isLoggedIn) {
          console.log("User is logged in. Granting access.");
          return true; 
        }
        console.log("User is not logged in. Redirecting to login.");
        return Response.redirect(new URL('/properties', nextUrl));
      }

      console.log("User is accessing a non-restricted page.");
      return true;
    },
  },
  providers: [], // Add providers as needed
} satisfies NextAuthConfig;
