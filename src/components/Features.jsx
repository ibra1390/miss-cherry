import { Leaf, Palette, Sparkles, Heart } from 'lucide-react'

const features = [
  {
    icon: <Leaf size={32} />,
    title: "Soya 100% Natural",
    desc: "Cera vegetal biodegradable que no emite toxinas.",
    color: "bg-green-100 text-green-600",
    blob: "rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]"
  },
  {
    icon: <Palette size={32} />,
    title: "A Tu Gusto",
    desc: "¡Tú mandas! Elige los colores y fragancias para crear tu vela soñada.",
    color: "bg-purple-100 text-purple-500",
    blob: "rounded-[56%_44%_71%_29%_/_52%_52%_48%_48%]"
  },
  {
    icon: <Sparkles size={32} />,
    title: "Aditivos Naturales",
    desc: "Usamos mejoradores de quemado seguros y libres de químicos agresivos.",
    color: "bg-yellow-100 text-yellow-600",
    blob: "rounded-[41%_59%_38%_62%_/_52%_39%_61%_48%]"
  },
  {
    icon: <Heart size={32} />,
    title: "Hecho con Amor",
    desc: "Cada pieza es vertida y decorada a mano, haciéndola única como tú.",
    color: "bg-red-100 text-cherry-red",
    blob: "rounded-[66%_34%_54%_46%_/_38%_62%_38%_62%]"
  }
]

export default function Features() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Fondo decorativo (Puntitos) */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffc2d1 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* ENCABEZADO */}
        <div className="text-center mb-20">
          <span className="inline-block bg-cherry-red/10 text-cherry-red font-bold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full mb-4 border border-cherry-pink/20">
            ¿Por qué elegirnos?
          </span>
          <h2 className="font-kawaii text-5xl md:text-6xl text-cherry-dark leading-tight">
            Pequeños detalles, <br/> 
            <span className="relative inline-block mt-2">
              Grandes Diferencias
              {/* Subrayado amarillo */}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h2>
        </div>

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-[2.5rem] border-2 border-transparent hover:border-pink-100 shadow-sm hover:shadow-xl hover:shadow-pink-100/60 transition-all duration-500 hover:-translate-y-2 hover:rotate-1 text-center"
            >
              {/* ICONO CON FONDO "BLOB" */}
              <div 
                className={`w-20 h-20 mx-auto flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${item.color}`}
                style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
              >
                <div className={`absolute inset-0 ${item.blob} opacity-50`}></div>
                <div className="relative z-10">
                  {item.icon}
                </div>
              </div>

              <h3 className="font-kawaii text-2xl text-cherry-dark mb-3">
                {item.title}
              </h3>
              
              <p className="font-body text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}