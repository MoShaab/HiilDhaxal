import type { Metadata } from "next";
import { inter, lusitana } from '@/app/ui/fonts';
import '@/app/ui/global.css';
import Navbar from "./ui/landingPage/components/Navbar/Navbar";
import Footer from "./ui/landingPage/components/Footer/Footer";


export const metadata: Metadata = {
  title: "HiilDhaxal",
  description: "This is about Somali heritage, culture, history, language and its rich literature. Wuxuu ku saabsanyahay hiddaha, dhaqanka, taariikhda iyo luuqadda Soomaaliyeed. Waxaan meesha ka maqnayn suugaanta qaniga ku tahay Soomaalidu sida heesaha iyo gabayada ama maansooyinka leh murtida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <script src="//code.tidio.co/uxesf4jarnatcc2fltflyi4wtx6taknq.js" async></script> */}
      <body className={inter.className}>
        <Navbar />
        
        {children}
        <Footer />
        </body>
    </html>
  );
}
