import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Yaseen | Analytics Simulation",
  description: "A simple website for practicing Google Analytics event tracking.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-GK6X9DKH47" strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-GK6X9DKH47');
    `}</Script>
    {children}
  </body></html>;
}
