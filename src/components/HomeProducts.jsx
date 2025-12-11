import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Heart, Cloud } from 'lucide-react'
import ProductList from './ProductList' 

export default function HomeProducts() {
  return (
    <section className="relative pt-32 pb-40 bg-cherry-bg/30 overflow-hidden">
      
      {/* FONDO DECORATIVO */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ff85a2 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* OLA SUPERIOR */}
      <div className="absolute top-0 left-0 w-full rotate-180 leading-none z-10">
        <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[90px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
           <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>

      {/* ELEMENTOS FLOTANTES */}
      <div className="absolute top-20 right-10 text-white/60 animate-float-delayed pointer-events-none hidden md:block">
        <Cloud size={80} fill="currentColor" />
      </div>
      <div className="absolute bottom-40 left-10 text-cherry-pink/20 animate-float pointer-events-none">
        <Heart size={64} fill="currentColor" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* ENCABEZADO */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-yellow-400 animate-pulse">
              <Sparkles size={32} />
          </div>
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-sm border-2 border-pink-100 text-cherry-red font-bold tracking-widest uppercase text-xs mb-4 transform hover:scale-105 transition-transform cursor-default">
              <Sparkles size={14} className="text-yellow-400 fill-yellow-400 animate-spin-slow" />
              Best Sellers
              <Sparkles size={14} className="text-yellow-400 fill-yellow-400 animate-spin-slow" />
          </div>
          <h2 className="font-kawaii text-5xl md:text-7xl text-cherry-dark mb-4 drop-shadow-sm">
              Favoritos del Mes
          </h2>
          <p className="font-body text-gray-500 max-w-lg mx-auto text-lg leading-relaxed bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm">
              Pequeñas dosis de felicidad hechas cera.<br/> 
              Enciende la magia y transforma tu espacio en un <span className="text-cherry-red font-bold">refugio dulce</span>.
          </p>
        </div>
        
        {/* LISTA DE PRODUCTOS (Solo los 6 primeros) */}
        <div className="relative">
           <ProductList limit={6} /> 
        </div>

        {/* BOTÓN VER TODOS */}
        <div className="text-center mt-20">
          <Link 
            to="/tienda" 
            className="group bg-cherry-red text-white px-8 py-4 rounded-full font-bold text-2xl shadow-lg shadow-pink-300/50 hover:bg-pink-400 hover:scale-105 transition-all inline-flex items-center justify-center gap-2 font-kawaii tracking-wide"
          >
            Ver todas las velas
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

      {/* OLA INFERIOR */}
      <div className="absolute bottom-0 left-0 w-full leading-none z-10">
        <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[90px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
           <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>

    </section>
  )
}