import type { Metadata } from "next";
import Script from "next/script";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";
import { inter } from "@/app/ui/fonts";
import "@/app/ui/global.css";

const Navbar = dynamic(() => import("./ui/landingPage/components/Navbar/Navbar"), { ssr: true });
const Footer = dynamic(() => import("./ui/landingPage/components/Footer/Footer"), { ssr: true });

export const metadata: Metadata = {
  title: "HiilDhaxal | Somali Heritage and Culture",
  description: "This is about Somali heritage, culture, history, language, and its rich literature, including songs, poetry, and insightful narratives. Wuxuu ku saabsanyahay hiddaha, dhaqanka, taariikhda iyo luuqadda Soomaaliyeed. Waxaan meesha ka maqnayn suugaanta qaniga ku tahay Soomaalidu sida heesaha iyo gabayada ama maansooyinka leh murtida",
  keywords: "Somali heritage, Somali culture, Somali history, Somali literature, Somali poetry, Somali language",
  openGraph: {
    title: "HiilDhaxal",
    description: "Explore the culture, history, and literature of Somalia.",
    type: "website",
    locale: "en_US",
    url: "https://hiildhaxal.online",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="lazyOnload"
        />
        {/* Any additional meta tags */}
      </head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
