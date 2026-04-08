"use client";

import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import { supabase } from '../../lib/supabase';
import { Product } from '../../lib/types';

export default function Catalogo() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [cargando, setCargando] = useState(true);
  const valorMaximo = 100000
  
  // 1. Nuevos Estados para los Filtros
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [precioMaximo, setPrecioMaximo] = useState(valorMaximo); // Tope inicial alto

  const categorias = ['Todas', 'Anillos', 'Collares', 'Pulseras'];

  useEffect(() => {
    async function obtenerJoyas() {
      const { data, error } = await supabase.from('joyas').select('*').order('name');
      if (error) {
        console.error("Error al traer datos:", error);
      } else if (data) {
        setProductos(data);
      }
      setCargando(false);
    }

    obtenerJoyas();
  }, []);

  // 2. LÓGICA DE FILTRADO MAESTRA
  const joyasFiltradas = productos.filter((joya) => {
    // A) ¿Coincide la categoría?
    const coincideCategoria = categoriaActiva === 'Todas' || joya.category === categoriaActiva;
    
    // B) ¿Coincide el texto de búsqueda? (Buscamos en nombre o descripción, todo en minúsculas)
    const textoBusqueda = busqueda.toLowerCase();
    const coincideTexto = joya.name.toLowerCase().includes(textoBusqueda) || 
                          joya.description.toLowerCase().includes(textoBusqueda);
    
    // C) ¿El precio es menor o igual al límite del usuario?
    const coincidePrecio = joya.price <= precioMaximo;

    // Solo mostramos la joya si cumple con las TRES condiciones a la vez
    return coincideCategoria && coincideTexto && coincidePrecio;
  });

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Colección Exclusiva
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Descubre nuestras piezas únicas y encuentra la ideal para ti.
          </p>
        </header>

        {/* 3. BARRA DE HERRAMIENTAS (Filtros y Búsqueda) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Buscador de texto */}
            <div className="col-span-1 md:col-span-2">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Buscar por nombre, material o detalle..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition-all text-gray-900 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Deslizador de precio */}
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex justify-between items-center">
                <span>Precio máximo:</span>
                
                {/* Nuevo Input Numérico */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-500 font-bold text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    // max="20000" // Opcional: puedes ponerle un límite también a lo que escriben
                    max = {precioMaximo}
                    value={precioMaximo}
                    onChange={(e) => setPrecioMaximo(Number(e.target.value))}
                    className="w-28 pl-6 pr-2 py-1 text-right font-bold text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                </div>
              </label>
              
              <input
                type="range"
                min="0"
                max="20000" // Tope de tu barra
                step="500"
                value={precioMaximo}
                onChange={(e) => setPrecioMaximo(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black mt-2"
              />
            </div>
          </div>

          {/* Botones de Categorías */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaActiva(categoria)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  categoriaActiva === categoria
                    ? 'bg-black text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-black hover:text-black'
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>

        {/* 4. RESULTADOS */}
        {cargando ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Cargando la colección...</p>
          </div>
        ) : (
          <>
            {/* Mensaje de conteo de resultados */}
            <div className="mb-6 text-gray-500 font-medium">
              Mostrando {joyasFiltradas.length} {joyasFiltradas.length === 1 ? 'pieza' : 'piezas'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {joyasFiltradas.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {!cargando && joyasFiltradas.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <p className="text-2xl mb-2">🥲</p>
                <p className="text-xl text-gray-900 font-bold">No encontramos ninguna joya con esos filtros.</p>
                <p className="text-gray-500 mt-2">Intenta subir el precio o cambiar la búsqueda.</p>
                <button 
                  onClick={() => {
                    setBusqueda('');
                    setPrecioMaximo(valorMaximo);
                    setCategoriaActiva('Todas');
                  }}
                  className="mt-6 text-indigo-600 font-semibold hover:text-indigo-800"
                >
                  Limpiar todos los filtros
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
}