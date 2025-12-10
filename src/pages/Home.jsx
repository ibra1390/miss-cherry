import Hero from '../components/Hero'
import Features from '../components/Features'
import ProductList from '../components/ProductList' // <--- 1. Importamos

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Portada */}
      <Hero />
      
      {/* 2. Beneficios */}
      <Features />

      {/* 3. Sección de Productos */}
      <section className="py-20 bg-cherry-bg/30 relative"> {/* Fondo suave */}
        
        {/* Decoración de fondo (opcional) */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>

        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-cherry-red font-bold tracking-widest uppercase text-xs bg-white px-4 py-1 rounded-full shadow-sm border border-pink-100">
              Best Sellers
            </span>
            <h2 className="font-kawaii text-5xl md:text-6xl text-cherry-dark mt-4 mb-2">
              Favoritos del Mes 💖
            </h2>
            <p className="font-body text-gray-500 max-w-lg mx-auto">
              Las velitas que todos están amando. Hechas a mano para llenar tu hogar de magia.
            </p>
          </div>
          
          {/* AQUÍ VA EL COMPONENTE DE PRODUCTOS */}
          <ProductList /> 

          <div className="text-center mt-16">
            <a href="/tienda" className="inline-block border-b-2 border-cherry-red text-cherry-red font-bold hover:text-pink-600 hover:border-pink-600 transition pb-1 font-body">
              Ver todas las velas &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}