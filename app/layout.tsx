import type { Metadata } from "next";
import { inter, lusitana } from '@/app/ui/fonts';
import '@/app/ui/global.css';


export const metadata: Metadata = {
  title: "HiddoJacayl",
  description: "Developed by Shacab Technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <script src="//code.tidio.co/uxesf4jarnatcc2fltflyi4wtx6taknq.js" async></script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
