// app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Product } from "../../../lib/types"; 
import Link from 'next/link';

export default function InventarioPage() {
  const [joyas, setJoyas] = useState<Product[]>([]); // El useState<Product[]>([]) le dice a react que va a guardar especificamente un arreglo del tipo Product
  const [cargando, setCargando] = useState(true);

  // 1. Traemos las joyas al cargar la página
  useEffect(() => {
    obtenerJoyas();
  }, []);

  const obtenerJoyas = async () => {
    setCargando(true);
    // Pedimos las joyas y las ordenamos por nombre alfabéticamente
    const { data, error } = await supabase
      .from("joyas")
      .select("*")
      .order("name", { ascending: true });
      
    if (data) setJoyas(data);
    setCargando(false);
  };

  // 2. Función para borrar una joya
  const eliminarJoya = async (id: string) => {
    // Alerta de confirmación nativa del navegador
    const confirmar = window.confirm("¿Estás súper seguro de que deseas eliminar esta pieza? Esta acción no se puede deshacer.");
    if (!confirmar) return;

    // Le decimos a Supabase que la borre
    const { error } = await supabase.from("joyas").delete().eq("id", id);
    
    if (error) {
      alert("Hubo un error al eliminar la joya.");
      console.error(error);
    } else {
      // Truco pro: Filtramos la lista local para quitar la joya borrada 
      // y así no tenemos que recargar toda la página de nuevo
      setJoyas(joyas.filter((joya) => joya.id !== id));
    }
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Inventario Actual</h1>
      
      {/* Contenedor de la tabla */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            {/* Encabezados */}
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Imagen</th>
                <th className="p-4 font-semibold">Nombre</th>
                <th className="p-4 font-semibold">Categoría</th>
                <th className="p-4 font-semibold">Precio (MXN)</th>
                <th className="p-4 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            
            {/* Cuerpo de la tabla */}
            <tbody className="divide-y divide-gray-100 table-row-group">
              {joyas.map((joya) => (
                <tr key={joya.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <img src={joya.image_url} alt={joya.name} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                  </td>
                  <td className="p-4 font-medium text-gray-900">{joya.name}</td>
                  <td className="p-4 text-sm text-gray-500">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{joya.category}</span>
                  </td>
                  <td className="p-4 text-gray-900 font-semibold">${joya.price}</td>
                  <td className="p-4 text-center flex justify-center gap-2">
                    {/* NUEVO BOTÓN DE EDITAR */}
                    <Link href={`/admin/dashboard/editar/${joya.id}`}>
                      <button className="text-blue-500 hover:text-white hover:bg-blue-500 px-3 py-1 rounded-md font-medium text-sm transition-colors border border-blue-500 hover:border-transparent">
                        Editar
                      </button>
                    </Link>
                    
                    <button 
                      onClick={() => eliminarJoya(joya.id)}
                      className="text-red-500 hover:text-white hover:bg-red-500 px-3 py-1 rounded-md font-medium text-sm transition-colors border border-red-500 hover:border-transparent"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          {/* Mensaje si no hay nada en la BD */}
          {joyas.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No hay joyas en el inventario. ¡Ve a la pestaña de "Agregar Joya" para empezar!
            </div>
          )}

        </div>
      </div>
    </div>
  );
}