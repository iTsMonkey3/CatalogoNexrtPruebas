'use client';

import { useState, useRef } from 'react';

interface ProductImageZoomProps {
  src: string;
  alt: string;
}

export default function ProductImageZoom({ src, alt }: ProductImageZoomProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Maneja el movimiento del mouse en escritorio
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    
    // Calculamos el porcentaje de la posición del mouse dentro de la imagen
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
  };

  return (
    <div
      ref={imageContainerRef}
      className="relative w-full h-full overflow-hidden rounded-xl cursor-zoom-in group"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
      // Para móviles: un toque activa/desactiva el zoom
      onClick={() => setIsZoomed(!isZoomed)}
    >
      <img
        src={src}
        alt={alt}
        // Aplicamos la transición solo al transform para que el origin (el seguimiento del mouse) sea instantáneo y no se sienta "laggeado"
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
        style={{
          transform: isZoomed ? 'scale(2.5)' : 'scale(1)', // 2.5x de zoom, puedes ajustarlo
          transformOrigin: `${position.x}% ${position.y}%`
        }}
      />
    </div>
  );
}