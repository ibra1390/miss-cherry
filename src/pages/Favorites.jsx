import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { Heart, ArrowLeft, Loader2, Ghost } from 'lucide-react'
import ProductCard from '../components/ProductCard' // Reutilizamos tu card maestra

export default function Favorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchFavorites()
  }, [user])

  async function fetchFavorites() {
    try {
      // MAGIA DE SUPABASE:
      // Traemos la tabla 'favorites' Y TAMBIÉN los datos del 'product' relacionado
      const { data, error } = await supabase
        .from('favorites')
        .select('*, products(*)') 
        .eq('user_id', user.id)

      if (error) throw error
      
      // La data viene como: [{id: 1, products: {name: 'Vela', ...}}, ...]
      // La limpiamos para tener solo el array de productos
      const products = data.map(item => item.products)
      setFavorites(products)

    } catch (error) {
      console.error('Error cargando favoritos:', error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center">
        <Loader2 className="animate-spin text-cherry-red w-12 h-12 mb-4" />
        <p className="font-kawaii text-xl text-gray-400 animate-pulse">Buscando tus tesoros...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="text-center md:text-left">
             <h1 className="font-kawaii text-5xl text-cherry-dark mb-2 flex items-center justify-center md:justify-start gap-3">
               Mis Favoritos <Heart className="text-cherry-red fill-cherry-red animate-bounce" />
             </h1>
             <p className="font-body text-gray-500">
               Tu colección personal de aromas mágicos. ✨
             </p>
          </div>
          
          <Link to="/tienda" className="group flex items-center gap-2 text-cherry-red font-bold hover:bg-white hover:shadow-sm px-4 py-2 rounded-full transition-all">
             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
             Volver a la tienda
          </Link>
        </div>

        {/* Grid de Favoritos */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((product) => (
               // ¡REUTILIZAMOS TU COMPONENTE PRODUCTCARD!
               // Como ya tiene la lógica del corazón, si le das click aquí, se borrará de la lista.
               <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // ESTADO VACÍO (EMPTY STATE)
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-pink-200">
             <div className="inline-block p-6 bg-pink-50 rounded-full mb-6 animate-float">
                <Ghost size={64} className="text-cherry-pink" />
             </div>
             <h2 className="font-kawaii text-3xl text-gray-700 mb-2">¡Está muy vacío aquí!</h2>
             <p className="font-body text-gray-400 mb-8 max-w-md mx-auto">
               Aún no has guardado ninguna velita. Ve a la tienda y dale corazón a las que te enamoren.
             </p>
             <Link to="/tienda" className="bg-cherry-red text-white px-8 py-3 rounded-xl font-bold font-kawaii text-xl shadow-lg shadow-pink-200 hover:bg-pink-500 transition-all hover:-translate-y-1 inline-block">
               Ir a Explorar
             </Link>
          </div>
        )}
      </div>
    </div>
  )
}