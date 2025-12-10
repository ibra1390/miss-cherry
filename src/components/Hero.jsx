import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-cherry-bg pt-10 pb-20 md:pt-20">
      
      {/* Decoración de fondo (Burbujas flotantes) */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full blur-2xl opacity-40 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* TEXTO */}
        <div className="text-center md:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-pink-100 text-cherry-red font-bold text-sm transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
            <Sparkles size={16} />
            <span className="font-body">Nueva Colección 2025</span>
          </div>
          
          <h1 className="font-kawaii text-6xl md:text-8xl text-cherry-dark leading-[0.9]">
            Aromas que <br />
            <span className="text-cherry-red">Enamoran</span>
          </h1>
          
          <p className="font-body text-gray-500 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
            Velas artesanales 100% de soja. Crea momentos mágicos y espacios llenos de paz con un toque <span className="font-bold text-pink-500">kawaii</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Link 
              to="/tienda" 
              className="group bg-cherry-red text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-pink-300/50 hover:bg-pink-400 hover:scale-105 transition-all flex items-center justify-center gap-2 font-kawaii tracking-wide"
            >
              Ver Catálogo
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/nosotros" 
              className="bg-white text-cherry-dark border-2 border-pink-100 px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-50 hover:border-pink-200 transition-all font-kawaii tracking-wide"
            >
              Nuestra Historia
            </Link>
          </div>
        </div>

        {/* IMAGEN HERO (Ahora usa hero.jpg local) */}
        <div className="relative group">
          {/* Marco decorativo giratorio */}
          <div className="absolute inset-0 bg-pink-200 rounded-[3rem] rotate-3 transform scale-105 opacity-50 group-hover:rotate-6 transition-all duration-700"></div>
          
          <img 
            src="/hero.jpg" 
            alt="Vela Hero Miss Cherry" 
            className="relative w-full h-[400px] md:h-[500px] object-cover rounded-[3rem] shadow-2xl border-4 border-white transform -rotate-2 group-hover:rotate-0 transition duration-700"
          />

          {/* Etiqueta flotante (Solo visible en PC para no tapar en móvil) */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-pink-100 hidden md:block animate-bounce-slow">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full text-green-600">🌿</div>
              <div>
                <p className="font-bold text-cherry-dark text-sm font-body">100% Vegano</p>
                <p className="text-xs text-gray-400 font-body">Cruelty Free</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}