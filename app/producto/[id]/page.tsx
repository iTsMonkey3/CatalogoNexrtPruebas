// app/producto/[id]/page.tsx
// FÍJATE QUE YA NO DICE "use client" AQUÍ ARRIBA

import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BotonesProducto from '../../../components/BotonesProducto'; // <-- Importamos tu nuevo componente

// 1. LA MAGIA PARA WHATSAPP
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { data: product } = await supabase.from('joyas').select('*').eq('id', id).single();

  if (!product) return { title: 'Joya no encontrada' };

  return {
    title: `${product.name} | Catálogo de Joyería`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image_url],
    },
  };
}

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from('joyas')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    notFound();
  }

  // 2. CONFIGURACIÓN DEL MENSAJE DE WHATSAPP
  const numeroEmpresa = "523320704632"; 
  const urlDelProducto = `https://catalogo-nexrt-pruebas.vercel.app/producto/${product.id}`; 
  const mensajeBase = `¡Hola! Me interesa preguntar por la disponibilidad de esta pieza:\n\n*${product.name}*\nPrecio: $${product.price} MXN\n\nPuedes verla aquí: ${urlDelProducto}`;
  const linkWhatsApp = `https://wa.me/${numeroEmpresa}?text=${encodeURIComponent(mensajeBase)}`;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-full object-cover min-h-[400px]"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
            {product.category}
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-lg text-gray-500 mb-6 leading-relaxed">
            {product.description}
          </p>
          
          <div className="mt-auto">
            <span className="text-3xl font-bold text-gray-900 block mb-6">
              ${product.price.toLocaleString('en-US')} MXN
            </span>
            
            {/* 3. AQUÍ INYECTAMOS TU COMPONENTE DE CLIENTE */}
            <BotonesProducto product={product} linkWhatsApp={linkWhatsApp} />
            
            <div className="mt-6 text-center">
              <Link href="/catalogo" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
                &larr; Volver al catálogo
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}