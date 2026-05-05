// app/admin/dashboard/nuevo/page.tsx
"use client";

import { useState } from "react";
import { supabase } from "../../../../lib/supabase"; 
import { useRouter } from "next/navigation";
import { comprimirImagen } from "../../../../lib/utils";

export default function NuevoProducto() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Anillos");
  
  const [imagen, setImagen] = useState<File | null>(null);
  
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [guardando, setGuardando] = useState(false);

  comprimirImagen

  const agregarJoya = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagen) {
      setMensaje({ texto: "Por favor, selecciona una imagen.", tipo: "error" });
      return;
    }

    setGuardando(true);
    setMensaje({ texto: "Subiendo imagen...", tipo: "info" });

    // La imagen ya viene como .webp gracias a nuestra función
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.webp`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('joyas-public')
      .upload(fileName, imagen);

    if (uploadError) {
      setMensaje({ texto: "Error al subir la imagen.", tipo: "error" });
      setGuardando(false);
      return;
    }

    setMensaje({ texto: "Guardando datos de la joya...", tipo: "info" });

    const { data: publicUrlData } = supabase.storage
      .from('joyas-public')
      .getPublicUrl(fileName);

    const imageUrlAGuardar = publicUrlData.publicUrl;

    const { error: dbError } = await supabase.from("joyas").insert([
      {
        name: name,
        description: description,
        price: parseFloat(price),
        category: category,
        image_url: imageUrlAGuardar, 
      },
    ]);

    if (dbError) {
      setMensaje({ texto: "Hubo un error al guardar la joya en la base de datos.", tipo: "error" });
    } else {
      setMensaje({ texto: "¡Joya agregada al catálogo con éxito!", tipo: "exito" });
      setName("");
      setDescription("");
      setPrice("");
      setCategory("Anillos");
      setImagen(null);
      (document.getElementById('file-upload') as HTMLInputElement).value = "";
    }
    setGuardando(false);
  };

  return (
    <div className="text-white">
      <div className="mb-10">
        <h1 className="text-3xl font-serif text-white tracking-wide mb-2">Agregar Nueva Pieza</h1>
        <div className="h-[1px] w-12 bg-[#333] mb-4"></div>
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
          Ingresar producto al catálogo
        </p>
      </div>

      <div className="bg-[#111111] p-8 md:p-12 border border-[#1a1a1a]">
        
        {mensaje.texto && (
          <div className={`p-4 mb-8 text-[11px] uppercase tracking-wider text-center border ${
            mensaje.tipo === "exito" ? "bg-green-950/20 text-green-400 border-green-900/30" : 
            mensaje.tipo === "error" ? "bg-red-950/20 text-red-400 border-red-900/30" : 
            "bg-[#1a1a1a] text-gray-300 border-[#333]"
          }`}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={agregarJoya} className="space-y-8">
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
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Inversión (MXN)</label>
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

            <div className="md:col-span-2 pt-4 border-t border-[#1a1a1a]">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">Fotografía Principal</label>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                
                <div>
                  <input 
                    id="file-upload"
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    required={!imagen} 
                    onChange={async (e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const archivoSeleccionado = e.target.files[0];
                        
                        try {
                          // Avisamos que estamos trabajando
                          setMensaje({ texto: "Optimizando fotografía...", tipo: "info" });
                          
                          // Ejecutamos la compresión
                          const archivoComprimido = await comprimirImagen(archivoSeleccionado);
                          
                          setImagen(archivoComprimido);
                          setMensaje({ texto: "", tipo: "" }); // Limpiamos mensaje de info
                        } catch (error) {
                          setMensaje({ 
                            texto: "Hubo un error al optimizar la imagen.", 
                            tipo: "error" 
                          });
                          e.target.value = ""; 
                          setImagen(null);
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
                    {imagen ? "Cambiar Fotografía" : "Seleccionar Archivo"}
                  </label>
                </div>
                
                {imagen && (
                  <div className="relative w-24 aspect-[4/5] bg-[#050505] border border-[#333] overflow-hidden shrink-0 mt-4 sm:mt-0">
                    <img 
                      src={URL.createObjectURL(imagen)} 
                      alt="Previsualización" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-8 mt-4 border-t border-[#1a1a1a]">
            <button 
              type="submit" 
              disabled={guardando} 
              className="w-full sm:w-auto bg-white text-black border border-white py-4 px-10 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-[#0a0a0a] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              {guardando ? "Procesando Colección..." : "Ingresar al Catálogo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}