// app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Product } from "../../../lib/types"; 
import Link from 'next/link';

export default function InventarioPage() {
  const [joyas, setJoyas] = useState<Product[]>([]);
  const [cargando, setCargando] = useState(true);

  // ESTADOS PARA EL MODAL DE OCULTAR/PUBLICAR
  const [joyaAAlternar, setJoyaAAlternar] = useState<Product | null>(null);
  const [procesando, setProcesando] = useState(false);
  const [errorAccion, setErrorAccion] = useState(""); 

  useEffect(() => {
    obtenerJoyas();
  }, []);

  const obtenerJoyas = async () => {
    setCargando(true);
    const { data, error } = await supabase
      .from("joyas")
      .select("*")
      .order("name", { ascending: true });
      
    if (data) setJoyas(data);
    setCargando(false);
  };

  const solicitarAlternarEstado = (joya: Product) => {
    setErrorAccion(""); 
    setJoyaAAlternar(joya);
  };

  const confirmarAlternarEstado = async () => {
    if (!joyaAAlternar) return;
    
    setProcesando(true);
    setErrorAccion("");

    // Si 'activo' es undefined (porque acabas de crear la columna), asumimos que era true
    const estadoActual = joyaAAlternar.activo !== false; 
    const nuevoEstado = !estadoActual;

    // Solo actualizamos la columna "activo" en lugar de hacer un delete
    const { error } = await supabase
      .from("joyas")
      .update({ activo: nuevoEstado })
      .eq("id", joyaAAlternar.id);
    
    if (error) {
      setErrorAccion("Ocurrió un error inesperado al intentar cambiar el estado de la pieza.");
      console.error("Error detallado de BD:", error);
    } else {
      // Actualizamos el estado local para ver el cambio instantáneamente
      setJoyas(joyas.map((j) => j.id === joyaAAlternar.id ? { ...j, activo: nuevoEstado } : j));
      setJoyaAAlternar(null); 
    }
    
    setProcesando(false);
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white border-solid"></div>
      </div>
    );
  }

  // Variables para saber si estamos ocultando o publicando en el Modal
  const esJoyaActiva = joyaAAlternar?.activo !== false;

  return (
    <div className="text-white relative">
      
      {/* --- MODAL INTELIGENTE DE ESTADO --- */}
      {joyaAAlternar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => !procesando && setJoyaAAlternar(null)} 
          ></div>
          
          <div className="relative z-10 bg-[#0a0a0a] border border-[#333] p-8 md:p-10 max-w-md w-full shadow-2xl animate-fade-in text-center">
            
            {/* Ícono cambia dependiendo de la acción (Ojo tachado o Ojo normal) */}
            <div className={`w-16 h-16 mx-auto border rounded-full flex items-center justify-center mb-6 ${esJoyaActiva ? 'bg-orange-950/30 border-orange-900/50 text-orange-500' : 'bg-green-950/30 border-green-900/50 text-green-500'}`}>
              {esJoyaActiva ? (
                // Ícono de Ocultar
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                // Ícono de Publicar
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </div>

            <h3 className="text-xl font-serif text-white mb-2">
              {esJoyaActiva ? "¿Ocultar esta pieza?" : "¿Publicar esta pieza?"}
            </h3>
            <p className="text-sm font-light text-gray-400 mb-6 leading-relaxed">
              {esJoyaActiva ? (
                <>Estás a punto de ocultar <span className="font-bold text-white">"{joyaAAlternar.name}"</span>. Dejará de aparecer en la tienda pública, pero conservarás su historial.</>
              ) : (
                <>La pieza <span className="font-bold text-white">"{joyaAAlternar.name}"</span> volverá a ser visible en el catálogo público para todos los clientes.</>
              )}
            </p>

            {errorAccion && (
              <div className="mb-6 bg-red-950/20 border border-red-900/30 text-red-400 p-4 text-[10px] tracking-wider text-center uppercase leading-relaxed">
                {errorAccion}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setJoyaAAlternar(null)}
                disabled={procesando}
                className="w-full sm:w-1/2 bg-[#111111] border border-[#333] text-gray-400 py-3 text-[10px] uppercase tracking-[0.2em] font-medium hover:text-white hover:border-white transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              
              <button 
                onClick={confirmarAlternarEstado}
                disabled={procesando}
                className={`w-full sm:w-1/2 text-white border py-3 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors disabled:opacity-50 flex justify-center items-center gap-2 ${
                  esJoyaActiva 
                    ? 'bg-orange-900/80 border-orange-900 hover:bg-orange-800 hover:border-orange-500' 
                    : 'bg-green-900/80 border-green-900 hover:bg-green-800 hover:border-green-500'
                }`}
              >
                {procesando ? (
                  <>
                    <div className="w-3 h-3 border-t-2 border-white rounded-full animate-spin"></div>
                    Procesando...
                  </>
                ) : (
                  esJoyaActiva ? "Sí, Ocultar" : "Sí, Publicar"
                )}
              </button>
            </div>
            
          </div>
        </div>
      )}
      {/* --- FIN DEL MODAL --- */}


      {/* Encabezado del Dashboard */}
      <div className="mb-10">
        <h1 className="text-3xl font-serif text-white tracking-wide mb-2">Inventario Actual</h1>
        <div className="h-[1px] w-12 bg-[#333] mb-4"></div>
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
          Gestión de catálogo y existencias
        </p>
      </div>
      
      {/* Contenedor de la tabla */}
      <div className="bg-[#111111] border border-[#1a1a1a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            <thead>
              <tr className="bg-[#050505] border-b border-[#1a1a1a] text-gray-500 text-[10px] uppercase tracking-[0.2em]">
                <th className="p-5 font-medium whitespace-nowrap">Pieza</th>
                <th className="p-5 font-medium whitespace-nowrap">Nombre</th>
                <th className="p-5 font-medium whitespace-nowrap">Categoría</th>
                <th className="p-5 font-medium whitespace-nowrap">Estado</th>
                <th className="p-5 font-medium whitespace-nowrap">Inversión (MXN)</th>
                <th className="p-5 font-medium text-center whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-[#1a1a1a]">
              {joyas.map((joya) => {
                const estaActiva = joya.activo !== false; // Consideramos true si es undefined

                return (
                  // Bajamos la opacidad de la fila si la pieza está inactiva
                  <tr key={joya.id} className={`hover:bg-[#1a1a1a]/50 transition-colors group ${!estaActiva ? 'opacity-50 hover:opacity-100' : ''}`}>
                    <td className="p-5">
                      <div className="w-12 h-16 bg-[#050505] border border-[#333] overflow-hidden">
                        <img 
                          src={joya.image_url || '/placeholder.jpg'} 
                          alt={joya.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                        />
                      </div>
                    </td>
                    <td className="p-5 font-serif text-gray-200 text-lg">
                      {joya.name}
                    </td>
                    <td className="p-5">
                      <span className="border border-[#333] text-gray-400 text-[10px] uppercase tracking-widest px-3 py-1">
                        {joya.category}
                      </span>
                    </td>
                    
                    {/* NUEVA COLUMNA DE ESTADO */}
                    <td className="p-5">
                      <span className={`text-[9px] uppercase tracking-[0.2em] px-3 py-1 border ${
                        estaActiva 
                          ? 'text-green-500 border-green-900/30 bg-green-950/20' 
                          : 'text-orange-500 border-orange-900/30 bg-orange-950/20'
                      }`}>
                        {estaActiva ? 'Visible' : 'Oculto'}
                      </span>
                    </td>

                    <td className="p-5 font-light text-gray-300">
                      ${joya.price.toLocaleString('en-US')}
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex justify-center gap-3">
                        <Link href={`/admin/dashboard/editar/${joya.id}`}>
                          <button className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white border border-transparent hover:border-white px-4 py-2 transition-all duration-300">
                            Editar
                          </button>
                        </Link>
                        
                        {/* BOTÓN CAMBIA DEPENDIENDO DEL ESTADO */}
                        <button 
                          onClick={() => solicitarAlternarEstado(joya)}
                          className={`text-[10px] uppercase tracking-[0.2em] border border-transparent px-4 py-2 transition-all duration-300 ${
                            estaActiva 
                              ? 'text-orange-800 hover:text-orange-500 hover:border-orange-900/50' 
                              : 'text-green-800 hover:text-green-500 hover:border-green-900/50'
                          }`}
                        >
                          {estaActiva ? 'Ocultar' : 'Publicar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {joyas.length === 0 && (
            <div className="p-16 text-center border-t border-[#1a1a1a]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 mx-auto text-gray-700 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              <p className="text-sm text-gray-500 font-light">
                No hay piezas en el inventario.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}