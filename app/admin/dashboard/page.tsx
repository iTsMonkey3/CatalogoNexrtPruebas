// app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Product } from "../../../lib/types"; 
import Link from 'next/link';

export default function InventarioPage() {
  const [joyas, setJoyas] = useState<Product[]>([]);
  const [cargando, setCargando] = useState(true);

  // 1. Traemos las joyas al cargar la página
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

  // 2. Función para borrar una joya
  const eliminarJoya = async (id: string) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta pieza? Esta acción no se puede deshacer.");
    if (!confirmar) return;

    const { error } = await supabase.from("joyas").delete().eq("id", id);
    
    if (error) {
      alert("Hubo un error al eliminar la joya.");
      console.error(error);
    } else {
      setJoyas(joyas.filter((joya) => joya.id !== id));
    }
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white border-solid"></div>
      </div>
    );
  }

  return (
    <div className="text-white">
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
            
            {/* Encabezados */}
            <thead>
              <tr className="bg-[#050505] border-b border-[#1a1a1a] text-gray-500 text-[10px] uppercase tracking-[0.2em]">
                <th className="p-5 font-medium whitespace-nowrap">Pieza</th>
                <th className="p-5 font-medium whitespace-nowrap">Nombre</th>
                <th className="p-5 font-medium whitespace-nowrap">Categoría</th>
                <th className="p-5 font-medium whitespace-nowrap">Inversión (MXN)</th>
                <th className="p-5 font-medium text-center whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            
            {/* Cuerpo de la tabla */}
            <tbody className="divide-y divide-[#1a1a1a]">
              {joyas.map((joya) => (
                <tr key={joya.id} className="hover:bg-[#1a1a1a]/50 transition-colors group">
                  <td className="p-5">
                    {/* Hacemos la imagen con la misma proporción 4/5 que en la tienda */}
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
                  <td className="p-5 font-light text-gray-300">
                    ${joya.price.toLocaleString('en-US')}
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex justify-center gap-3">
                      {/* BOTÓN EDITAR (Minimalista) */}
                      <Link href={`/admin/dashboard/editar/${joya.id}`}>
                        <button className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white border border-transparent hover:border-white px-4 py-2 transition-all duration-300">
                          Editar
                        </button>
                      </Link>
                      
                      {/* BOTÓN ELIMINAR (Sutil pero claro) */}
                      <button 
                        onClick={() => eliminarJoya(joya.id)}
                        className="text-[10px] uppercase tracking-[0.2em] text-red-900 hover:text-red-500 border border-transparent hover:border-red-900/50 px-4 py-2 transition-all duration-300"
                      >
                        Remover
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mensaje si no hay nada en la BD */}
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