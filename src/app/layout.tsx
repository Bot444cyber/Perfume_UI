import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Suspense } from "react";
import AuthTokenHandler from "@/components/AuthTokenHandler";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "PureSmell | Luxury Fragrances",
  description: "Luxury fragrances for the elite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${playfairDisplay.variable} font-sans antialiased`}
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
