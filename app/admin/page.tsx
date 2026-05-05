// app/admin/page.tsx
"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const router = useRouter();

  const iniciarSesion = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError("Credenciales inválidas. Acceso denegado.");
      setCargando(false);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 relative overflow-hidden">
      
      {/* MARCA DE AGUA DE FONDO (Opcional, pero da mucha elegancia) */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02]">
        <img 
          src="/LogoSinFondo.png" 
          alt="DAFMI Watermark" 
          className="w-[80vw] max-w-2xl object-contain grayscale"
        />
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="max-w-md w-full bg-[#111111]/90 backdrop-blur-md p-10 md:p-12 border border-[#1a1a1a] relative z-10">
        
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8 relative w-[100px] h-[30px] hover:opacity-80 transition-opacity">
             <img src="/LogoSinFondo.png" alt="DAFMI" className="w-full h-full object-contain" />
          </Link>
          <h1 className="text-3xl font-serif text-white mb-4 tracking-wide">Acceso Privado</h1>
          <div className="h-[1px] w-12 bg-[#333] mx-auto mb-5"></div>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Panel de Administración</p>
        </div>

        {/* ALERTA DE ERROR ESTILIZADA */}
        {error && (
          <div className="bg-red-950/20 border border-red-900/30 text-red-400 p-4 text-[11px] tracking-wider mb-8 text-center uppercase">
            {error}
          </div>
        )}

        <form onSubmit={iniciarSesion} className="space-y-8">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white placeholder-[#444] focus:border-white outline-none transition-all font-light text-sm"
              placeholder="admin@dafmi.com"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white placeholder-[#444] focus:border-white outline-none transition-all font-light text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-white text-black py-4 mt-2 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cargando ? "Verificando..." : "Ingresar"}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-[#1a1a1a] pt-8">
          <Link href="/" className="text-[10px] text-gray-600 hover:text-white uppercase tracking-[0.2em] transition-colors group inline-flex items-center">
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">&larr;</span> 
            Volver a la tienda
          </Link>
        </div>
      </div>
    </main>
  );
}