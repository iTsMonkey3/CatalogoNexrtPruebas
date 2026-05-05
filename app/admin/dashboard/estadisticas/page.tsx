// app/admin/dashboard/estadisticas/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";

// Definimos cómo se ve un Lead para TypeScript
interface Lead {
  id: string;
  created_at: string;
  resumen_pedido: string;
  total_estimado: number;
  cantidad_piezas: number;
}

export default function EstadisticasPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerLeads() {
      // Traemos los leads ordenados del más nuevo al más viejo
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error al traer los leads:", error);
      } else if (data) {
        setLeads(data);
      }
      setCargando(false);
    }

    obtenerLeads();
  }, []);

  // Calculamos algunos datos rápidos para ponerlos hasta arriba
  const totalCotizado = leads.reduce((sum, lead) => sum + lead.total_estimado, 0);
  const totalPiezasCotizadas = leads.reduce((sum, lead) => sum + lead.cantidad_piezas, 0);

  // Cargador estilizado
  if (cargando) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white border-solid"></div>
      </div>
    );
  }

  return (
    <div className="text-white">
      
      {/* ENCABEZADO */}
      <div className="mb-10">
        <h1 className="text-3xl font-serif text-white tracking-wide mb-2">Cotizaciones y Leads</h1>
        <div className="h-[1px] w-12 bg-[#333] mb-4"></div>
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
          Métricas e historial de solicitudes
        </p>
      </div>
      
      {/* TARJETAS DE RESUMEN RÁPIDO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        <div className="bg-[#111111] p-8 border border-[#1a1a1a]">
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em] mb-4">Total de Leads</p>
          <p className="text-4xl font-light text-white">{leads.length}</p>
        </div>
        
        <div className="bg-[#111111] p-8 border border-[#1a1a1a]">
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em] mb-4">Valor Cotizado</p>
          <p className="text-4xl font-light text-white">
            ${totalCotizado.toLocaleString('en-US')} <span className="text-sm text-gray-500 ml-1 tracking-normal">MXN</span>
          </p>
        </div>
        
        <div className="bg-[#111111] p-8 border border-[#1a1a1a]">
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em] mb-4">Piezas Solicitadas</p>
          <p className="text-4xl font-light text-white">{totalPiezasCotizadas}</p>
        </div>
        
      </div>

      {/* TABLA DE LEADS */}
      <div className="bg-[#111111] border border-[#1a1a1a] overflow-hidden">
        
        <div className="p-6 border-b border-[#1a1a1a] bg-[#050505]">
          <h2 className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em]">Historial de Solicitudes</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            <thead>
              <tr className="bg-[#050505] border-b border-[#1a1a1a] text-gray-500 text-[10px] uppercase tracking-[0.2em]">
                <th className="p-5 font-medium whitespace-nowrap">Fecha y Hora</th>
                <th className="p-5 font-medium whitespace-nowrap">Resumen del Pedido</th>
                <th className="p-5 font-medium text-center whitespace-nowrap">Piezas</th>
                <th className="p-5 font-medium text-right whitespace-nowrap">Total Estimado</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-[#1a1a1a]">
              {leads.map((lead) => {
                const fecha = new Date(lead.created_at);
                const fechaFormateada = fecha.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
                const horaFormateada = fecha.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

                return (
                  <tr key={lead.id} className="hover:bg-[#1a1a1a]/50 transition-colors">
                    
                    <td className="p-5">
                      <div className="font-medium text-gray-200 text-sm tracking-wide">{fechaFormateada}</div>
                      <div className="text-[10px] text-gray-500 tracking-wider mt-1">{horaFormateada}</div>
                    </td>
                    
                    {/* Le pusimos un max-width y truncate por si el cliente pide 20 cosas, no se rompa la tabla */}
                    <td className="p-5 text-sm font-light text-gray-400 leading-relaxed max-w-xs truncate">
                      {lead.resumen_pedido}
                    </td>
                    
                    <td className="p-5 text-center font-light text-gray-300">
                      {lead.cantidad_piezas}
                    </td>
                    
                    <td className="p-5 text-right font-light text-white">
                      ${lead.total_estimado.toLocaleString('en-US')}
                    </td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* ESTADO VACÍO ESTILIZADO */}
          {leads.length === 0 && (
            <div className="p-16 text-center border-t border-[#1a1a1a]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 mx-auto text-gray-700 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <p className="text-sm text-gray-500 font-light">
                Aún no hay cotizaciones registradas. ¡Pronto llegarán los clientes!
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}