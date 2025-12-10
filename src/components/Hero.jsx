import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Wand2, Flame } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-cherry-bg pt-10 pb-20 md:pt-20">
      
      {/* Decoración de fondo */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full blur-2xl opacity-40 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* TEXTO */}
        <div className="text-center md:text-left space-y-6 order-2 md:order-1">
          
          {/* BADGE MEJORADO */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-pink-100 text-cherry-red font-bold text-sm transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
            <Flame size={18} className="text-orange-400 fill-orange-400 animate-pulse" />
            <span className="font-body text-cherry-dark">Nueva Colección 2025</span>
          </div>
          
          {/* TÍTULO */}
          <h1 className="font-kawaii text-6xl md:text-8xl text-cherry-dark leading-[0.9]">
            Aromas que <br />
            <span className="text-cherry-red">Enamoran</span>
          </h1>
          
          {/* Descripción */}
          <p className="font-body text-gray-500 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
            ¿Te encanta el aroma de los postres recién horneados? ¡Entonces te encantarán nuestras <span className="font-bold text-pink-500">velas</span>!
          </p>
          
          {/* BOTONES */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Link 
              to="/tienda" 
              className="group bg-cherry-red text-white px-8 py-4 rounded-full font-bold text-2xl shadow-lg shadow-pink-300/50 hover:bg-pink-400 hover:scale-105 transition-all flex items-center justify-center gap-2 font-kawaii tracking-wide"
            >
              Ver Catálogo
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/tienda" 
              className="bg-white text-cherry-dark border-2 border-pink-100 px-8 py-4 rounded-full font-bold text-2xl hover:bg-pink-50 hover:border-pink-200 transition-all font-kawaii tracking-wide flex items-center justify-center gap-2"
            >
              <Wand2 size={20} />
              ¡Personalizar!
            </Link>
          </div>
        </div>

        {/* IMAGEN HERO */}
        <div className="relative group order-1 md:order-2">
          <div className="absolute inset-0 bg-pink-200 rounded-[3rem] rotate-3 transform scale-105 opacity-50 group-hover:rotate-6 transition-all duration-700"></div>
          
          <img 
            src="/hero.png" 
            alt="Vela Hero Miss Cherry" 
            className="relative w-full h-[400px] md:h-[500px] object-cover rounded-[3rem] shadow-2xl border-4 border-white transform -rotate-2 group-hover:rotate-0 transition duration-700 z-10"
          />

          {/* STICKER */}
          <div className="absolute bottom-6 -left-4 z-20 bg-yellow-200 text-cherry-red font-kawaii text-xl px-4 py-2 rounded-2xl shadow-[0_4px_0_#ca8a04] border-2 border-white transform -rotate-12 group-hover:rotate-0 transition-all duration-500 pointer-events-none flex items-center gap-2">
             <span>100% Artesanal</span>
             <Sparkles size={20} className="fill-white text-yellow-600 animate-spin-slow" />
          </div>
        </div>

      </div>
    </section>
  )
}