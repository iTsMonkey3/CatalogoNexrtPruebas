"use client";

import { useState } from "react";
import { supabase } from "../../../../lib/supabase"; // Asegúrate de que la ruta sea correcta
import { useRouter } from "next/navigation";

export default function NuevoProducto() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Anillos");
  
  // 1. Cambiamos el estado de texto a un estado de Archivo
  const [imagen, setImagen] = useState<File | null>(null);
  
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [guardando, setGuardando] = useState(false);

  const agregarJoya = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagen) {
      setMensaje({ texto: "Por favor, selecciona una imagen.", tipo: "error" });
      return;
    }

    setGuardando(true);
    setMensaje({ texto: "Subiendo imagen...", tipo: "info" });

    // 2. Preparamos el nombre del archivo para que sea único (evita sobreescribir fotos)
    const fileExt = imagen.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

    // 3. Subimos la foto al bucket 'joyas-public'
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('joyas-public')
      .upload(fileName, imagen);

    if (uploadError) {
      setMensaje({ texto: "Error al subir la imagen.", tipo: "error" });
      setGuardando(false);
      return;
    }

    setMensaje({ texto: "Guardando datos de la joya...", tipo: "info" });

    // 4. Obtenemos la URL pública de la imagen que acabamos de subir
    const { data: publicUrlData } = supabase.storage
      .from('joyas-public')
      .getPublicUrl(fileName);

    const imageUrlAGuardar = publicUrlData.publicUrl;

    // 5. Ahora sí, guardamos todo en la base de datos
    const { error: dbError } = await supabase.from("joyas").insert([
      {
        name: name,
        description: description,
        price: parseFloat(price),
        category: category,
        image_url: imageUrlAGuardar, // Usamos el link generado por Supabase
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
      // Opcional: limpiar el input de archivo físicamente
      (document.getElementById('file-upload') as HTMLInputElement).value = "";
    }
    setGuardando(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Agregar Nueva Joya</h1>
      
      {mensaje.texto && (
        <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${
          mensaje.tipo === "exito" ? "bg-green-50 text-green-700" : 
          mensaje.tipo === "error" ? "bg-red-50 text-red-700" : 
          "bg-blue-50 text-blue-700"
        }`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={agregarJoya} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio (MXN)</label>
            <input type="number" required min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white">
              <option value="Anillos">Anillos</option>
              <option value="Collares">Collares</option>
              <option value="Pulseras">Pulseras</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea rows={3} required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none resize-none text-gray-900 bg-white" />
          </div>

          {/* NUEVO INPUT DE ARCHIVO */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Foto de la Joya</label>
            {/* <input 
              id="file-upload"
              type="file" 
              accept="image/*" 
              required 
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImagen(e.target.files[0]);
                }
              }} 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800" 
            /> */}

            <input 
              id="file-upload"
              type="file" 
              accept="image/*" 
              required 
              onChange={(e) => {
                // 1. Verificamos que el usuario sí seleccionó un archivo
                if (e.target.files && e.target.files.length > 0) {
                  const archivoSeleccionado = e.target.files[0];
                  
                  // 2. Definimos nuestro límite (ejemplo: 2 Megabytes)
                  const LIMITE_MB = 2;
                  const LIMITE_BYTES = LIMITE_MB * 1024 * 1024; 

                  // 3. Validamos el peso
                  if (archivoSeleccionado.size > LIMITE_BYTES) {
                    // Si se pasa, mostramos error, limpiamos el input y no guardamos nada
                    setMensaje({ 
                      texto: `⚠️ La imagen es muy pesada. El límite es de ${LIMITE_MB}MB. Por favor, comprímela.`, 
                      tipo: "error" 
                    });
                    e.target.value = ""; // Resetea el input visualmente
                    setImagen(null);
                    return; // Detiene la función aquí mismo
                  }

                  // 4. Si todo está bien, guardamos la imagen y borramos errores viejos
                  setImagen(archivoSeleccionado);
                  setMensaje({ texto: "", tipo: "" }); 
                }
              }} 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800" 
            />
            
            {/* AQUÍ ESTÁ LA MAGIA DE LA PREVISUALIZACIÓN */}
            {imagen && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 inline-block">
                <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Vista previa:</p>
                <img 
                  src={URL.createObjectURL(imagen)} 
                  alt="Previsualización" 
                  className="w-32 h-32 object-cover rounded-md shadow-sm border border-gray-200"
                />
              </div>
            )}
          </div>
        </div>

        <button type="submit" disabled={guardando} className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-colors mt-4 disabled:bg-gray-400">
          {guardando ? "Procesando..." : "Agregar al Catálogo"}
        </button>
      </form>
    </div>
  );
}