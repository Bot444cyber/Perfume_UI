import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Suspense } from "react";
import AuthTokenHandler from "@/components/AuthTokenHandler";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "K.A.R Perfumes",
  description: "Luxury fragrances for the elite.",
  icons: {
    icon: '/image/site-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interTight.variable} font-sans antialiased`}
      >
        {children}
        <Suspense fallback={null}>
          <AuthTokenHandler />
        </Suspense>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
