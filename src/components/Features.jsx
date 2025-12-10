import { Leaf, Heart, Star, Flame } from 'lucide-react'

const features = [
  {
    icon: <Leaf size={32} />,
    title: "Cera de Soja",
    desc: "Eco-friendly y biodegradable. Quema limpio y dura más.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: <Heart size={32} />,
    title: "Hecho a Mano",
    desc: "Cada vela es vertida a mano con mucho amor y detalle.",
    color: "bg-red-100 text-red-500"
  },
  {
    icon: <Star size={32} />,
    title: "Aromas Premium",
    desc: "Esencias naturales que llenan tu hogar de magia.",
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    icon: <Flame size={32} />,
    title: "Mecha de Algodón",
    desc: "Sin plomo ni tóxicos. Solo luz pura para ti.",
    color: "bg-orange-100 text-orange-500"
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cherry-red font-bold tracking-widest uppercase text-xs bg-pink-50 px-3 py-1 rounded-full">Why Miss Cherry?</span>
          <h2 className="font-kawaii text-5xl md:text-6xl text-cherry-dark mt-4">
            Pequeños detalles, <br/> Grandes diferencias
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div key={index} className="group p-8 rounded-[2rem] border border-pink-50 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300 bg-white text-center hover:-translate-y-2">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="font-kawaii text-3xl text-gray-800 mb-3">{item.title}</h3>
              <p className="font-body text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}