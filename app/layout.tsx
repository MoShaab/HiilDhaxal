import type { Metadata } from "next";
import Script from "next/script";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";
import { inter } from "@/app/ui/fonts";
import "@/app/ui/global.css";
// import GoogleTranslate from "./ui/landingPage/components/google-translate";



const Navbar = dynamic(() => import("./ui/landingPage/components/Navbar/Navbar"), { ssr: true });
const Footer = dynamic(() => import("./ui/landingPage/components/Footer/Footer"), { ssr: true });

export const metadata: Metadata = {
  title: "HiilDhaxal | Somali Heritage and Culture",
  description: "This is about Somali heritage, culture, history, language, and its rich literature, including songs, poetry, and insightful narratives. Wuxuu ku saabsanyahay hiddaha, dhaqanka, taariikhda iyo luuqadda Soomaaliyeed. Waxaan meesha ka maqnayn suugaanta qaniga ku tahay Soomaalidu sida heesaha iyo gabayada ama maansooyinka leh murtida",
  keywords: "Somali heritage, Dhaxal, Somali culture, Dhaqan, Somali history, Taariikh, Somali literature, Somali poetry, Gabayo, Maansooyin, Somali language, Afka Hooyo",
  openGraph: {
    title: "HiilDhaxal",
    description: "Hiddiyo dhaqan, Taariikh, Suugaanta, Khayraadka.",
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
         {/* Add Google Fonts for Poppins */}
         <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <Script
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="lazyOnload"
        />
        {/* Any additional meta tags */}
      </head>
      <body>
        <Navbar />
        {/* <GoogleTranslate /> */}
          {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
