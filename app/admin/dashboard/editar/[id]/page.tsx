// app/admin/dashboard/editar/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../../../lib/supabase"; // Son 5 niveles hacia arriba
import { useRouter, useParams } from "next/navigation";

export default function EditarJoya() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string; // Sacamos el ID de la URL
  
  // Estados para el formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Anillos");
  const [imageUrl, setImageUrl] = useState("");
  
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [guardando, setGuardando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  // Al cargar la página, vamos a Supabase por los datos actuales de la joya
  useEffect(() => {
    const obtenerJoya = async () => {
      const { data, error } = await supabase.from("joyas").select("*").eq("id", id).single();
      
      if (data) {
        // Llenamos el formulario con los datos que ya existen
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

  // Función para guardar los CAMBIOS en Supabase
  const actualizarJoya = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje({ texto: "", tipo: "" });

    // Usamos .update() en lugar de .insert(), y le decimos qué ID actualizar con .eq()
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
      // Si se actualizó bien, lo regresamos a la tabla de inventario
      router.push("/admin/dashboard");
    }
  };

  if (cargandoDatos) {
    return <div className="p-10 text-center">Cargando información de la joya...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar Joya</h1>
      
      {mensaje.texto && (
        <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${mensaje.tipo === "error" ? "bg-red-50 text-red-700" : ""}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={actualizarJoya} className="space-y-6">
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

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">URL de la Imagen</label>
            <input type="url" required value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white" />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button type="button" onClick={() => router.push("/admin/dashboard")} className="w-1/3 bg-gray-200 text-gray-800 font-bold py-4 rounded-lg hover:bg-gray-300 transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={guardando} className="w-2/3 bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400">
            {guardando ? "Actualizando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}