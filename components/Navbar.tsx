// components/Navbar.tsx
"use client";

import Link from 'next/link';
import { useCartStore } from './store/cartStore'; // Asumiendo que metiste 'store' dentro de 'components'
import { useEffect, useState } from 'react';

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  // Esperamos a que el componente se monte en el navegador para leer el localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculamos el total de piezas sumando las cantidades
  const totalItems = items.reduce((total, item) => total + item.cantidad, 0);

  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-8 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold tracking-widest text-black uppercase">
          Joyería
        </Link>
        <div className="space-x-6 flex items-center">
          <Link href="/" className="text-gray-600 hover:text-black font-medium transition-colors">Inicio</Link>
          <Link href="/catalogo" className="text-gray-600 hover:text-black font-medium transition-colors">Catálogo</Link>
          
          <Link href="/carrito" className="relative text-gray-600 hover:text-black font-medium transition-colors flex items-center gap-1">
            <span>🛒</span>
            <span>Carrito</span>
            {/* La burbuja solo aparece si ya cargó la página y hay más de 0 items */}
            {mounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}