import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/app/components/Header";
import "./globals.css";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Lucinda Brown | Health Product Design Leader",
  description: "Portfolio of Lucinda Brown",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-[72px]">
        <Header />
        {children}
      </body>
    </html>
  );
}
