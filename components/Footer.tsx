// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Columna 1: Marca y descripción */}
        <div className="md:col-span-1">
          <h3 className="text-white text-2xl font-extrabold tracking-widest uppercase mb-4">
            Joyería
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Tradición, elegancia y diseño exclusivo. Creando momentos inolvidables a través de nuestras piezas más finas.
          </p>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div>
          <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Explorar</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
            <li><Link href="/catalogo" className="hover:text-white transition-colors">Catálogo Completo</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div>
          <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contacto</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span>📍</span> 
              <span>Av. de las Américas 1234,<br/>Guadalajara, Jal.</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span> 
              <span>+52 (33) 1234 5678</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span> 
              <span>contacto@joyeria.com</span>
            </li>
          </ul>
        </div>

        {/* Columna 4: Horarios */}
        <div>
          <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Horario</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><span className="text-white">Lunes a Viernes:</span><br/> 10:00 AM - 8:00 PM</li>
            <li><span className="text-white">Sábados:</span><br/> 10:00 AM - 4:00 PM</li>
            <li><span className="text-white">Domingos:</span><br/> Cerrado</li>
          </ul>
        </div>

      </div>

      {/* Barra de Copyright inferior */}
      <div className="max-w-6xl mx-auto px-8 mt-16 pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Joyería. Todos los derechos reservados.</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-white transition-colors">Términos</a>
          <a href="#" className="hover:text-white transition-colors">Privacidad</a>
        </div>
      </div>
    </footer>
  );
}