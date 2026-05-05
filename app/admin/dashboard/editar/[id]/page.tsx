// app/admin/dashboard/editar/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../../../lib/supabase"; 
import { useRouter, useParams } from "next/navigation";

export default function EditarJoya() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string; 
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Anillos");
  const [imageUrl, setImageUrl] = useState("");
  
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [guardando, setGuardando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  useEffect(() => {
    const obtenerJoya = async () => {
      const { data, error } = await supabase.from("joyas").select("*").eq("id", id).single();
      
      if (data) {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price.toString());
        setCategory(data.category);
        setImageUrl(data.image_url);
      } else if (error) {
        setMensaje({ texto: "No se encontró la joya.", tipo: "error" });
      }
      setCargandoDatos(false);
    };

    if (id) obtenerJoya();
  }, [id]);

  const actualizarJoya = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje({ texto: "", tipo: "" });

    const { error } = await supabase
      .from("joyas")
      .update({
        name: name,
        description: description,
        price: parseFloat(price),
        category: category,
        image_url: imageUrl,
      })
      .eq("id", id);

    if (error) {
      setMensaje({ texto: "Hubo un error al actualizar la joya.", tipo: "error" });
      setGuardando(false);
    } else {
      router.push("/admin/dashboard");
    }
  };

  // ESTADO DE CARGA ESTILIZADO
  if (cargandoDatos) {
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
        <h1 className="text-3xl font-serif text-white tracking-wide mb-2">Editar Pieza</h1>
        <div className="h-[1px] w-12 bg-[#333] mb-4"></div>
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
          Modificar información del catálogo
        </p>
      </div>

      <div className="bg-[#111111] p-8 md:p-12 border border-[#1a1a1a]">
        
        {/* MENSAJE DE ERROR ESTILIZADO */}
        {mensaje.texto && (
          <div className={`p-4 mb-8 text-[11px] uppercase tracking-wider text-center border ${
            mensaje.tipo === "error" ? "bg-red-950/20 text-red-400 border-red-900/30" : "bg-[#1a1a1a] text-gray-300 border-[#333]"
          }`}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={actualizarJoya} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="md:col-span-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Nombre de la Pieza</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white focus:border-white outline-none transition-all font-light text-sm" 
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Precio (MXN)</label>
              <input 
                type="number" 
                required 
                min="0" 
                step="0.01" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white focus:border-white outline-none transition-all font-light text-sm" 
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Categoría</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white focus:border-white outline-none transition-all font-light text-sm appearance-none cursor-pointer"
              >
                <option value="Anillos">Anillos</option>
                <option value="Collares">Collares</option>
                <option value="Pulseras">Pulseras</option>
                <option value="Dijes">Dijes</option>
                <option value="Aretes">Aretes</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Descripción / Detalles</label>
              <textarea 
                rows={4} 
                required 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white focus:border-white outline-none resize-none transition-all font-light text-sm leading-relaxed" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">URL de la Imagen Actual</label>
              <input 
                type="url" 
                required 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-gray-400 focus:border-white outline-none transition-all font-light text-sm" 
              />
              {/* Mostramos una previsualización de la URL que está guardada */}
              {imageUrl && (
                <div className="mt-6 flex items-start gap-4 border-t border-[#1a1a1a] pt-6">
                  <div className="relative w-20 aspect-[4/5] bg-[#050505] border border-[#333] overflow-hidden shrink-0">
                    <img src={imageUrl} alt="Joya actual" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] leading-relaxed">
                    Fotografía enlazada. Modifica la URL únicamente si alojaste la nueva imagen en un servidor externo.
                  </p>
                </div>
              )}
            </div>
            
          </div>

          {/* BOTONES REDISEÑADOS */}
          <div className="flex flex-col-reverse sm:flex-row gap-4 pt-8 mt-4 border-t border-[#1a1a1a]">
            
            <button 
              type="button" 
              onClick={() => router.push("/admin/dashboard")} 
              className="w-full sm:w-1/3 bg-[#050505] border border-[#333] text-gray-400 py-4 px-6 text-[11px] font-medium uppercase tracking-[0.2em] hover:text-white hover:border-white transition-all duration-300"
            >
              Cancelar
            </button>
            
            <button 
              type="submit" 
              disabled={guardando} 
              className="w-full sm:w-2/3 bg-white text-black border border-white py-4 px-10 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-[#0a0a0a] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              {guardando ? "Aplicando Cambios..." : "Guardar Cambios"}
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}