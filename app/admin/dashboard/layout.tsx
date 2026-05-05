// app/admin/dashboard/layout.tsx
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import { useEffect, useState } from 'react'; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const verificarSesion = async () => { 
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/admin");
      } else {
        setAutorizado(true);
      }
    };

    verificarSesion();
  }, [router]);

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  if (!autorizado) {
    // Spinner de carga ajustado al modo oscuro
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white border-solid"></div>
      </div>
    );
  }

  return (
    // Fondo base del layout ahora es #0a0a0a
    <div className="min-h-screen flex bg-[#0a0a0a] text-white">
      
      {/* MENÚ LATERAL (Sidebar) */}
      <aside className="w-64 bg-[#050505] border-r border-[#1a1a1a] flex flex-col fixed h-full z-20">
        
        {/* LOGO EN LUGAR DE TEXTO */}
        <div className="p-8 border-b border-[#1a1a1a] flex justify-center items-center">
          <Link href="/">
            <img 
              src="/LogoSinFondo.png" 
              alt="DAFMI Admin" 
              className="w-[120px] object-contain opacity-90 hover:opacity-100 transition-opacity" 
            />
          </Link>
        </div>
        
        {/* NAVEGACIÓN */}
        <nav className="flex-1 py-8 px-4 space-y-3 overflow-y-auto">
          <Link 
            href="/admin/dashboard" 
            className={`block px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
              pathname === '/admin/dashboard' 
                ? 'bg-[#111111] text-white border border-[#333]' 
                : 'text-gray-500 border border-transparent hover:border-[#333] hover:text-white'
            }`}
          >
            Inventario
          </Link>
          
          <Link 
            href="/admin/dashboard/nuevo" 
            className={`block px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
              pathname === '/admin/dashboard/nuevo' 
                ? 'bg-[#111111] text-white border border-[#333]' 
                : 'text-gray-500 border border-transparent hover:border-[#333] hover:text-white'
            }`}
          >
            Agregar Pieza
          </Link>

          <Link 
            href="/admin/dashboard/estadisticas" 
            className={`block px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
              pathname === '/admin/dashboard/estadisticas' 
                ? 'bg-[#111111] text-white border border-[#333]' 
                : 'text-gray-500 border border-transparent hover:border-[#333] hover:text-white'
            }`}
          >
            Cotizaciones
          </Link>
        </nav>

        {/* BOTÓN CERRAR SESIÓN */}
        <div className="p-6 border-t border-[#1a1a1a]">
          <button 
            onClick={cerrarSesion} 
            className="w-full flex items-center justify-center gap-3 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-red-900 border border-transparent hover:border-red-900/50 hover:text-red-500 transition-all duration-300 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Salir
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      {/* Añadimos un fondo oscuro y aseguramos que ocupe al menos toda la pantalla */}
      <main className="flex-1 p-8 md:p-12 ml-64 bg-[#0a0a0a] min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}