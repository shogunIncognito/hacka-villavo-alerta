import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Ola from "@/components/ola";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import SessionAuthProvider from "@/context/SessionProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "VillavoAlertas",
  description: "Web para ver las ultimas novedades en la seguridad de Villavicencio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <SessionAuthProvider>
          <Navbar />
          <Ola rotateClass="rotate-180" />
          {children}
          <Ola />
          <Footer />
          <Toaster position="top-center" richColors />
        </SessionAuthProvider>
      </body>
    </html>
  );
}
