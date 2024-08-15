import type { Metadata } from "next";
import { inter, lusitana } from '@/app/ui/fonts';
import '@/app/ui/global.css';


export const metadata: Metadata = {
  title: "Silveroak",
  description: "Developed by Grafame Tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
