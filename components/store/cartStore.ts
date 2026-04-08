// store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../../lib/types';

// Extendemos tu tipo de Producto para agregarle la "cantidad"
export interface CartItem extends Product {
  cantidad: number;
}

interface CartState {
  items: CartItem[];
  agregarAlCarrito: (producto: Product) => void;
  eliminarDelCarrito: (id: string) => void;
  limpiarCarrito: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      
      agregarAlCarrito: (producto) => set((state) => {
        // Revisamos si la joya ya está en el carrito
        const existe = state.items.find((item) => item.id === producto.id);
        
        if (existe) {
          // Si ya existe, le sumamos 1 a la cantidad
          return {
            items: state.items.map((item) =>
              item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
            ),
          };
        }
        // Si no existe, la agregamos con cantidad 1
        return { items: [...state.items, { ...producto, cantidad: 1 }] };
      }),

      eliminarDelCarrito: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      })),

      limpiarCarrito: () => set({ items: [] }),
    }),
    {
      name: 'joyeria-carrito', // El nombre con el que se guardará en el navegador
    }
  )
);