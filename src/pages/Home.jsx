import Hero from '../components/Hero'
import Features from '../components/Features'
import HomeProducts from '../components/HomeProducts'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Portada */}
      <Hero />
      
      {/* 2. Beneficios */}
      <Features />

      {/* 3. Sección de Productos */}
      <HomeProducts />
    </div>
  )
}