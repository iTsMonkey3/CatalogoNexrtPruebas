// app/admin/dashboard/editar/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../../../lib/supabase"; 
import { useRouter, useParams } from "next/navigation";
import { comprimirImagen } from "../../../../../lib/utils";

export default function EditarJoya() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string; 
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Anillos");
  const [imageUrl, setImageUrl] = useState(""); // URL actual en la BD
  
  // NUEVO: Estado para el archivo de imagen nuevo (si deciden cambiarla)
  const [nuevaImagen, setNuevaImagen] = useState<File | null>(null);
  
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [guardando, setGuardando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  comprimirImagen

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
        setMensaje({ texto: "No se encontró la pieza.", tipo: "error" });
      }
      setCargandoDatos(false);
    };

    if (id) obtenerJoya();
  }, [id]);

  const actualizarJoya = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje({ texto: "Aplicando cambios...", tipo: "info" });

    let urlFinal = imageUrl; // Por defecto, usamos la que ya estaba

    // 1. SI HAY UNA IMAGEN NUEVA, GESTIONAMOS EL ARCHIVO
    if (nuevaImagen) {
      setMensaje({ texto: "Actualizando fotografía...", tipo: "info" });
      
      // A. Intentamos borrar la imagen vieja del bucket para no dejar basura
      // Solo lo hacemos si la URL anterior venía de nuestro bucket de Supabase
      if (imageUrl && imageUrl.includes('joyas-public')) {
        const nombreArchivoViejo = imageUrl.split('/').pop();
        if (nombreArchivoViejo) {
          await supabase.storage.from('joyas-public').remove([nombreArchivoViejo]);
        }
      }

      // B. Subimos la nueva imagen
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.webp`;
      const { error: uploadError } = await supabase.storage
        .from('joyas-public')
        .upload(fileName, nuevaImagen);

      if (uploadError) {
        setMensaje({ texto: "Error al subir la nueva imagen.", tipo: "error" });
        setGuardando(false);
        return;
      }

      // C. Obtenemos la nueva URL
      const { data: publicUrlData } = supabase.storage
        .from('joyas-public')
        .getPublicUrl(fileName);

      urlFinal = publicUrlData.publicUrl; // Actualizamos la variable para guardar esta nueva
    }

    // 2. GUARDAMOS LOS CAMBIOS EN LA BASE DE DATOS
    const { error } = await supabase
      .from("joyas")
      .update({
        name: name,
        description: description,
        price: parseFloat(price),
        category: category,
        image_url: urlFinal, // Mandamos la vieja o la nueva, dependiendo del flujo
      })
      .eq("id", id);

    if (error) {
      setMensaje({ texto: "Hubo un error al actualizar la base de datos.", tipo: "error" });
      setGuardando(false);
    } else {
      router.push("/admin/dashboard");
    }
  };

  if (cargandoDatos) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white border-solid"></div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="mb-10">
        <h1 className="text-3xl font-serif text-white tracking-wide mb-2">Editar Pieza</h1>
        <div className="h-[1px] w-12 bg-[#333] mb-4"></div>
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
          Modificar información del catálogo
        </p>
      </div>

      <div className="bg-[#111111] p-8 md:p-12 border border-[#1a1a1a]">
        
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

            {/* SECCIÓN DE IMAGEN REDISEÑADA */}
            <div className="md:col-span-2 pt-4 border-t border-[#1a1a1a]">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">Fotografía Principal</label>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                
                <div>
                  <input 
                    id="file-upload"
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    // Ya no es required porque puede que solo quieran cambiar el precio
                    onChange={async (e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const archivoSeleccionado = e.target.files[0];
                        
                        try {
                          setMensaje({ texto: "Optimizando fotografía...", tipo: "info" });
                          const archivoComprimido = await comprimirImagen(archivoSeleccionado);
                          setNuevaImagen(archivoComprimido);
                          setMensaje({ texto: "", tipo: "" });
                        } catch (error) {
                          setMensaje({ texto: "Hubo un error al optimizar la imagen.", tipo: "error" });
                          e.target.value = ""; 
                          setNuevaImagen(null);
                        }
                      }
                    }} 
                  />
                  <label 
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center justify-center border border-[#333] bg-[#050505] text-gray-400 px-8 py-4 text-[10px] font-medium uppercase tracking-[0.2em] hover:border-white hover:text-white transition-all duration-300 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5 mr-3 opacity-70 group-hover:opacity-100 transition-opacity">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                    {nuevaImagen ? "Seleccionar Otra" : "Reemplazar Fotografía"}
                  </label>
                </div>
                
                {/* PREVISUALIZACIÓN INTELIGENTE */}
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="relative w-20 aspect-[4/5] bg-[#050505] border border-[#333] overflow-hidden shrink-0">
                    {/* Si subieron una nueva, mostramos esa. Si no, mostramos la actual de la BD */}
                    <img 
                      src={nuevaImagen ? URL.createObjectURL(nuevaImagen) : imageUrl} 
                      alt="Previsualización de la joya" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                      {nuevaImagen ? "Nueva Fotografía" : "Fotografía Actual"}
                    </span>
                    {nuevaImagen && (
                      <button 
                        type="button"
                        onClick={() => {
                          setNuevaImagen(null);
                          (document.getElementById('file-upload') as HTMLInputElement).value = "";
                        }}
                        className="text-[10px] text-red-500 hover:text-red-400 mt-2 text-left uppercase tracking-wider"
                      >
                        Deshacer Cambio
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
            
          </div>

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