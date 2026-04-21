// components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* Columna 1: Marca y descripción */}
        <div className="md:col-span-1 flex flex-col items-start">
          <Link href="/" className="mb-6 relative w-[120px] h-[40px]">
            <Image 
              src="/LogoSinFondo.png" 
              alt="DAFMI Joyería" 
              fill
              className="object-contain object-left opacity-90 hover:opacity-100 transition-opacity" 
              sizes="120px"
            />
          </Link>
          <p className="text-sm font-light leading-relaxed text-gray-500">
            Tradición, elegancia y diseño exclusivo. Creando momentos inolvidables a través de nuestras piezas más finas.
          </p>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div>
          <h4 className="text-[10px] text-gray-400 font-medium mb-6 uppercase tracking-[0.2em]">
            Explorar
          </h4>
          <ul className="space-y-4 text-sm font-light">
            <li>
              <Link href="/" className="text-gray-500 hover:text-white transition-colors duration-300">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/catalogo" className="text-gray-500 hover:text-white transition-colors duration-300">
                Catálogo Completo
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
                Sobre Nosotros
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div>
          <h4 className="text-[10px] text-gray-400 font-medium mb-6 uppercase tracking-[0.2em]">
            Contacto
          </h4>
          <ul className="space-y-4 text-sm font-light text-gray-500">
            <li className="flex items-start gap-3 group cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors mt-0.5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="group-hover:text-gray-300 transition-colors">Av. de las Américas 1234,<br/>Guadalajara, Jal.</span>
            </li>
            <li className="flex items-center gap-3 group cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span className="group-hover:text-gray-300 transition-colors">+52 (33) 1234 5678</span>
            </li>
            <li className="flex items-center gap-3 group cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span className="group-hover:text-gray-300 transition-colors">contacto@dafmi.com</span>
            </li>
          </ul>
        </div>

        {/* Columna 4: Horarios */}
        <div>
          <h4 className="text-[10px] text-gray-400 font-medium mb-6 uppercase tracking-[0.2em]">
            Horario de Atención
          </h4>
          <ul className="space-y-4 text-sm font-light text-gray-500">
            <li>
              <span className="text-gray-300 block mb-1">Lunes a Viernes</span>
              10:00 AM - 8:00 PM
            </li>
            <li>
              <span className="text-gray-300 block mb-1">Sábados</span>
              10:00 AM - 4:00 PM
            </li>
            <li>
              <span className="text-gray-300 block mb-1">Domingos</span>
              <span className="text-gray-600 italic">Cerrado</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Barra de Copyright inferior */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-600 font-light tracking-wide">
          {new Date().getFullYear()} DAFMI Joyería. Te deseamos un excelente día.
        </p>
        {/* <div className="flex gap-6 text-xs text-gray-600 font-light uppercase tracking-[0.1em]">
          <Link href="#" className="hover:text-gray-300 transition-colors">Términos</Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">Privacidad</Link>
        </div> */}
      </div>
    </footer>
  );
}