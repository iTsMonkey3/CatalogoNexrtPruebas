// app/carrito/page.tsx
"use client";

import { useCartStore } from '../../components/store/cartStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function CarritoPage() {
  const { items, eliminarDelCarrito, limpiarCarrito } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = items.reduce((sum, item) => sum + (item.price * item.cantidad), 0);

  const enviarPedidoPorWhatsApp = async () => {
    const numeroEmpresa = "523320704632"; 
    const dominioBase = "https://catalogo-nexrt-pruebas.vercel.app";
    
    let mensaje = `¡Hola! Me gustaría cotizar estas piezas:\n\n`;
    let resumenParaBaseDeDatos = "";
    
    items.forEach((item) => {
      mensaje += `*${item.cantidad}x ${item.name}* - $${item.price.toLocaleString('en-US')} MXN\n`;
      mensaje += `🔗 Ver: ${dominioBase}/producto/${item.id}\n\n`; 
      resumenParaBaseDeDatos += `${item.cantidad}x ${item.name}, `;
    });

    mensaje += `*Total estimado: $${total.toLocaleString('en-US')} MXN*`;

    // GUARDADO RELACIONAL: Primero el Lead
    const totalPiezas = items.reduce((sum, item) => sum + item.cantidad, 0);
    
    const { data: nuevoLead, error: errorLead } = await supabase
      .from('leads')
      .insert([{
        resumen_pedido: resumenParaBaseDeDatos,
        total_estimado: total,
        cantidad_piezas: totalPiezas
      }])
      .select() 
      .single();

    if (nuevoLead) {
      // Guardamos cada item vinculado a ese Lead
      const itemsRelacionales = items.map(item => ({
        lead_id: nuevoLead.id,
        product_id: item.id,
        cantidad: item.cantidad
      }));

      const { error: errorItems } = await supabase
        .from('lead_items')
        .insert(itemsRelacionales);
        
      if (errorItems) console.error("Error guardando items:", errorItems);
    }

    // Abrimos WhatsApp
    window.open(`https://wa.me/${numeroEmpresa}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Encabezado Editorial */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-4">
            Selección de Piezas
          </h1>
          <div className="h-[1px] w-12 bg-white mx-auto md:mx-0"></div>
        </header>

        {items.length === 0 ? (
          // ESTADO VACÍO
          <div className="text-center py-24 border border-[#1a1a1a] bg-[#111111]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 mx-auto text-gray-600 mb-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            <p className="text-lg text-white font-serif mb-8">Tu selección está vacía.</p>
            <Link 
              href="/catalogo" 
              className="inline-block border border-white text-white px-8 py-3 text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
            >
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="bg-[#111111] border border-[#1a1a1a] p-6 md:p-10">
            
            {/* LISTA DE ITEMS */}
            <div className="divide-y divide-[#1a1a1a]">
              {items.map((item) => (
                <div key={item.id} className="py-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 group">
                  
                  {/* IMAGEN: Ahora es un Link clickeable */}
                  <Link href={`/producto/${item.id}`} className="relative w-24 aspect-[4/5] bg-[#050505] shrink-0 overflow-hidden block cursor-pointer">
                    <img 
                      src={item.image_url || '/placeholder.jpg'} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </Link>
                  
                  {/* Detalles del item */}
                  <div className="flex-1 text-center sm:text-left flex flex-col justify-center h-full">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2 block">
                      {item.category}
                    </span>
                    {/* NOMBRE: Ahora es un Link clickeable con efecto hover */}
                    <Link href={`/producto/${item.id}`} className="inline-block hover:opacity-75 transition-opacity">
                      <h3 className="text-xl font-serif text-white leading-tight mb-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-gray-400 font-light text-sm">
                      ${item.price.toLocaleString('en-US')} MXN
                    </p>
                  </div>
                  
                  {/* Controles de Cantidad y Eliminar */}
                  <div className="flex flex-col items-center sm:items-end justify-center gap-4 h-full">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest border border-[#333] px-4 py-2">
                      Cant: {item.cantidad}
                    </span>
                    <button 
                      onClick={() => eliminarDelCarrito(item.id)}
                      className="text-[10px] text-gray-600 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Remover
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* SECCIÓN INFERIOR: Total y Botones */}
            <div className="border-t border-[#1a1a1a] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
              
              <div className="text-center md:text-left">
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-2">Costo estimado</p>
                <p className="text-3xl font-light text-white tracking-wide">
                  ${total.toLocaleString('en-US')} <span className="text-sm text-gray-500 ml-1">MXN</span>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
                <button 
                  onClick={limpiarCarrito} 
                  className="text-[10px] text-gray-600 hover:text-white uppercase tracking-widest transition-colors order-2 sm:order-1"
                >
                  Vaciar Selección
                </button>

                <button 
                  onClick={enviarPedidoPorWhatsApp}
                  className="w-full sm:w-auto order-1 sm:order-2 flex items-center justify-center gap-3 bg-white text-black px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                    <path d="M12.031 21c-1.637 0-3.21-.42-4.6-1.218l-5.11 1.34 1.362-4.981A9.957 9.957 0 012.031 11.03 10.023 10.023 0 0112.031 1c5.523 0 10 4.485 10 10s-4.477 10-10 10zm0-18.428a8.423 8.423 0 00-8.41 8.428c0 1.65.432 3.235 1.253 4.636l.13.22-1.077 3.938 4.032-1.058.213.125a8.416 8.416 0 004.269 1.157c4.646 0 8.423-3.782 8.423-8.446 0-4.646-3.777-8.428-8.423-8.428H12.031zm4.512 11.606c-.247-.123-1.46-.723-1.688-.806-.228-.083-.394-.124-.56.124-.165.248-.638.805-.783.97-.145.165-.29.186-.537.062-.248-.124-1.042-.385-1.986-1.23-.734-.658-1.23-1.472-1.375-1.72-.145-.248-.016-.381.107-.504.111-.111.248-.288.372-.432.124-.145.165-.248.248-.413.083-.165.041-.31-.02-.434-.062-.124-.56-1.352-.767-1.85-.202-.486-.407-.421-.56-.428-.145-.006-.31-.008-.475-.008-.165 0-.434.062-.661.31-.227.248-.868.847-.868 2.066s.888 2.396 1.012 2.56c.124.165 1.747 2.668 4.234 3.742.592.256 1.053.409 1.413.524.594.189 1.136.162 1.564.098.481-.072 1.46-.596 1.666-1.171.206-.575.206-1.067.145-1.171-.062-.103-.227-.165-.474-.289z"/>
                  </svg>
                  Solicitar Cotización
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </main>
  );
}