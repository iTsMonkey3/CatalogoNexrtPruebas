// app/page.tsx
import Link from 'next/link';
import TopProducts from '@/components/TopProducts'; 

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      
      {/* SECCIÓN HERO */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a] z-10"></div>
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

      {/* COMPONENTE DINÁMICO: Lo más buscado */}
      <TopProducts />


      {/* ============================================================ */}
      {/* SECCIÓN CATEGORÍAS (Cuadrícula 2x2)                            */}
      {/* ============================================================ */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-[10px] font-medium tracking-[0.3em] text-gray-500 uppercase mb-4 block">
            Descubre tu estilo
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
            Nuestras <span className="italic text-gray-300">Categorías</span>
          </h2>
          <div className="h-[1px] w-12 bg-[#333] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          
          {/* CATEGORÍA 1: Anillos */}
          <Link href="/catalogo?categoria=Anillos" className="group relative aspect-square md:aspect-[4/3] overflow-hidden bg-[#050505] border border-[#1a1a1a]">
            {/* Recuerda cambiar el src por tu foto real */}
            <img src="/Anillo.png" alt="Anillos" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-3xl font-serif text-white mb-3 tracking-wide">Anillos</h3>
              <span className="text-[10px] text-white uppercase tracking-[0.2em] border-b border-white/50 pb-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                Explorar Colección
              </span>
            </div>
          </Link>

          {/* CATEGORÍA 2: Collares */}
          <Link href="/catalogo?categoria=Collares" className="group relative aspect-square md:aspect-[4/3] overflow-hidden bg-[#050505] border border-[#1a1a1a]">
            <img src="/Collares.png" alt="Collares" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-3xl font-serif text-white mb-3 tracking-wide">Collares</h3>
              <span className="text-[10px] text-white uppercase tracking-[0.2em] border-b border-white/50 pb-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                Explorar Colección
              </span>
            </div>
          </Link>

          {/* CATEGORÍA 3: Pulseras */}
          <Link href="/catalogo?categoria=Pulseras" className="group relative aspect-square md:aspect-[4/3] overflow-hidden bg-[#050505] border border-[#1a1a1a]">
            <img src="/Pulseras.png" alt="Pulseras" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-3xl font-serif text-white mb-3 tracking-wide">Pulseras</h3>
              <span className="text-[10px] text-white uppercase tracking-[0.2em] border-b border-white/50 pb-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                Explorar Colección
              </span>
            </div>
          </Link>

          {/* CATEGORÍA 4: Dijes y Aretes */}
          {/* Nota: En el link dice "Dijes", asegúrate de tener esa categoría en tu catálogo */}
          <Link href="/catalogo?categoria=Dijes" className="group relative aspect-square md:aspect-[4/3] overflow-hidden bg-[#050505] border border-[#1a1a1a]">
            <img src="/Varios.png" alt="Dijes y Aretes" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-3xl font-serif text-white mb-3 tracking-wide">Dijes & Aretes</h3>
              <span className="text-[10px] text-white uppercase tracking-[0.2em] border-b border-white/50 pb-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                Explorar Colección
              </span>
            </div>
          </Link>

        </div>
      </section>



      {/* ============================================================ */}
      {/* NUEVA SECCIÓN EDITORIAL: DATOS CURIOSOS Y EDUCACIÓN          */}
      {/* ============================================================ */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* BLOQUE 1: Imagen Izquierda, Texto Derecha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-32 group">
          <div className="relative aspect-[4/5] bg-[#111] overflow-hidden border border-[#1a1a1a]">
            {/* Cambia la ruta por tu imagen real */}
            <img src="/Dato1_2.png" alt="El secreto del oro" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-4 block">Sabiduría Joyera</span>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">El secreto del <span className="italic text-gray-300">Quilataje</span></h2>
            <div className="h-[1px] w-12 bg-[#333] mb-6"></div>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              ¿Sabías que el oro puro de 24 quilates es demasiado blando para usarlo en joyería diaria? Para crear piezas que duren toda la vida, los maestros joyeros alean el oro puro con metales nobles como la plata o el cobre. 
            </p>
            <p className="text-gray-400 font-light leading-relaxed">
              El oro de 14k o 18k no solo te ofrece una resistencia excepcional a los arañazos, sino que también permite crear esas hermosas tonalidades de oro rosa y oro blanco que tanto nos encantan.
            </p>
          </div>
        </div>

        {/* BLOQUE 2: Texto Izquierda, Video Derecha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-32 group">
          {/* order-2 en móvil (abajo), order-1 en desktop (izquierda) */}
          <div className="flex flex-col justify-center order-2 md:order-1">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-4 block">Guía Experta</span>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">¿Cómo identificar el <span className="italic text-gray-300">Oro Auténtico</span>?</h2>
            <div className="h-[1px] w-12 bg-[#333] mb-6"></div>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              El mercado está lleno de imitaciones, pero el oro real tiene características inconfundibles. Conocer la diferencia entre oro macizo, laminado y chapeado te ahorrará malas experiencias.
            </p>
            <p className="text-gray-400 font-light leading-relaxed">
              En este video, te mostramos los sellos de autenticidad que debes buscar, la prueba del magnetismo y los detalles que garantizan que estás haciendo una inversión verdadera.
            </p>
          </div>
          {/* order-1 en móvil (arriba), order-2 en desktop (derecha) */}
          <div className="relative aspect-video bg-[#111] overflow-hidden border border-[#1a1a1a] shadow-2xl order-1 md:order-2">
            {/* Reemplaza el src con el link de "Embed" o "Insertar" que te da YouTube */}
            <iframe 
              src="https://www.youtube.com/embed/PS_7znBuK8Q?si=afpY3_fw6xcLELxJ" 
              title="¿Cómo saber si es oro auténtico?" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </div>

        {/* BLOQUE 3: Imagen Izquierda, Texto Derecha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center group">
          <div className="relative aspect-[4/5] bg-[#111] overflow-hidden border border-[#1a1a1a]">
            {/* Cambia la ruta por tu imagen real */}
            <img src="/Dato2.png" alt="Eligiendo la joya ideal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-4 block">El Arte de Elegir</span>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">Encuentra tu <span className="italic text-gray-300">Pieza Ideal</span></h2>
            <div className="h-[1px] w-12 bg-[#333] mb-6"></div>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              Comprar una joya es elegir un compañero para toda la vida. Para encontrar tu pieza perfecta, primero define el propósito: ¿Es para uso diario o para eventos de gala? 
            </p>
            <p className="text-gray-400 font-light leading-relaxed">
              Si es para uso constante, recomendamos cadenas de eslabón cubano o fígaro por su resistencia extrema. Si buscas resaltar tu tono de piel, el oro amarillo brilla espectacularmente en pieles cálidas, mientras que el oro blanco hace resaltar a las pieles frías.
            </p>
          </div>
        </div>

      </section>
      {/* ============================================================ */}
      {/* FIN NUEVA SECCIÓN EDITORIAL                                    */}
      {/* ============================================================ */}


      {/* SECCIÓN: Valores / Diferenciales */}
      {/* Cambiamos el fondo a #050505 (casi negro puro) y bajamos el padding de py-32 a py-20 */}
      <section className="py-20 px-6 md:px-12 bg-[#050505] border-t border-[#1a1a1a]">
        {/* Redujimos el contenedor a max-w-5xl y el gap a 12 para hacerlo más compacto */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="text-center group">
            {/* Ícono de fuego/forja en lugar del destello */}
            <div className="w-14 h-14 mx-auto mb-6 border border-[#222] flex items-center justify-center rounded-full group-hover:border-white group-hover:bg-white transition-all duration-500 text-gray-500 group-hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
              </svg>
            </div>
            <h3 className="text-[11px] font-medium tracking-[0.3em] uppercase mb-3 text-white">Forjado a Detalle</h3>
            <p className="text-gray-500 text-xs leading-relaxed font-light px-4">
              Oro sólido y metales nobles, trabajados con una precisión meticulosa para crear joyas que resistan el paso del tiempo.
            </p>
          </div>

          <div className="text-center group">
            {/* Ícono de estrella/diseño en lugar del diamante */}
            <div className="w-14 h-14 mx-auto mb-6 border border-[#222] flex items-center justify-center rounded-full group-hover:border-white group-hover:bg-white transition-all duration-500 text-gray-500 group-hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <h3 className="text-[11px] font-medium tracking-[0.3em] uppercase mb-3 text-white">Identidad Propia</h3>
            <p className="text-gray-500 text-xs leading-relaxed font-light px-4">
              Cada colección está diseñada pensando en la individualidad, asegurando que tu pieza destaque y hable por ti.
            </p>
          </div>

          <div className="text-center group">
            {/* Ícono de chat/boutique en lugar de las manos */}
            <div className="w-14 h-14 mx-auto mb-6 border border-[#222] flex items-center justify-center rounded-full group-hover:border-white group-hover:bg-white transition-all duration-500 text-gray-500 group-hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <h3 className="text-[11px] font-medium tracking-[0.3em] uppercase mb-3 text-white">Trato Boutique</h3>
            <p className="text-gray-500 text-xs leading-relaxed font-light px-4">
              Atención cálida y experta por WhatsApp. Te acompañamos a elegir esa pieza que marcará un momento inolvidable.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}