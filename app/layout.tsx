// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Título y descripción premium para el SEO y al compartir enlaces
export const metadata: Metadata = {
  title: "DAFMI | Alta Joyería", 
  description: "Catálogo exclusivo de joyería fina y diseño de autor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* CAMBIO CLAVE: Fondo base oscuro para toda la app (bg-[#0a0a0a] text-white) */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white flex flex-col min-h-screen`}>
        
        {/* Navbar con lógica del cliente */}
        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        {/* Footer con lógica del cliente */}
        <Footer />
        
      </body>
    </html>
  );
}