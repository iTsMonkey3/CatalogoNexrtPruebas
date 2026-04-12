// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      
      {/* SECCIÓN HERO: Elegancia y Enfoque Visual */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo con overlay gradiente para que el texto resalte */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a] z-10"></div>
          {/* Aquí puedes poner tu imagen de joyería fina */}
          <img 
            src="/FondoPrincipal.png" 
            alt="Fondo Joyería" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <span className="text-sm font-light tracking-[0.5em] text-gray-400 uppercase mb-4 block animate-fade-in">
            Exclusividad en cada detalle
          </span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight mb-8 leading-tight">
            Joyas que <br /> <span className="italic font-light text-gray-300">Cuentan Historias</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Tradición y diseño exclusivo para los momentos que merecen ser recordados para siempre.
          </p>
          
          <Link 
            href="/catalogo" 
            className="inline-block border border-white text-white font-medium text-sm tracking-[0.2em] py-5 px-12 uppercase hover:bg-white hover:text-black transition-all duration-500 transform hover:-translate-y-1"
          >
            Explorar Catálogo
          </Link>
        </div>
      </section>

      {/* SECCIÓN: Lo más destacado (Placeholder del Carrusel) */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl font-bold tracking-widest uppercase mb-2">Lo más destacado</h2>
            <div className="h-1 w-20 bg-white"></div>
          </div>
          <Link href="/catalogo" className="text-sm text-gray-500 hover:text-white transition-colors border-b border-gray-800 pb-1">
            Ver todo
          </Link>
        </div>

        {/* Grid de productos destacados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((item) => (
            <div key={item} className="group cursor-pointer">
              <div className="relative aspect-[4/5] bg-[#1a1a1a] mb-6 overflow-hidden">
                {/* Imagen del producto */}
                <div className="absolute inset-0 bg-gray-800 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute bottom-4 left-4">
                   <button className="bg-white text-black text-[10px] font-bold py-2 px-4 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     Vista Rápida
                   </button>
                </div>
              </div>
              <h4 className="text-sm font-medium tracking-widest uppercase mb-1 text-gray-300">Pieza de Colección</h4>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Desde $1,200 MXN</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN: Valores / Diferenciales */}
      <section className="py-32 px-8 bg-[#111111] border-y border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-8 border border-[#2a2a2a] flex items-center justify-center rounded-full group-hover:border-white transition-colors duration-500">
              <span className="text-2xl opacity-70 group-hover:scale-125 transition-transform">✨</span>
            </div>
            <h3 className="text-lg font-bold tracking-[0.2em] uppercase mb-4">Artesanía Pura</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-light">
              Cada pieza es trabajada a mano con metales nobles y gemas seleccionadas, garantizando una calidad eterna.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-8 border border-[#2a2a2a] flex items-center justify-center rounded-full group-hover:border-white transition-colors duration-500">
              <span className="text-2xl opacity-70 group-hover:scale-125 transition-transform">💎</span>
            </div>
            <h3 className="text-lg font-bold tracking-[0.2em] uppercase mb-4">Diseño de Autor</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-light">
              Joyas que rompen con lo convencional. Creaciones únicas diseñadas para resaltar tu estilo personal.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-8 border border-[#2a2a2a] flex items-center justify-center rounded-full group-hover:border-white transition-colors duration-500">
              <span className="text-2xl opacity-70 group-hover:scale-125 transition-transform">🤝</span>
            </div>
            <h3 className="text-lg font-bold tracking-[0.2em] uppercase mb-4">Experiencia VIP</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-light">
              Atención personalizada para ayudarte a elegir esa joya especial, guiándote en cada paso de tu compra.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}