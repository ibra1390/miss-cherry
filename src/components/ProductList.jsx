import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { ShoppingBag, Heart, Loader, Check } from 'lucide-react'
import { useCart } from '../context/CartContext' // <--- Importamos el carrito
import { useNavigate } from 'react-router-dom'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [addingId, setAddingId] = useState(null) // Para mostrar efecto de carga en el botón
  
  const { addToCart } = useCart() // <--- Sacamos la función mágica
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    /* ... (El código de fetch sigue igual) ... */
    const { data } = await supabase.from('products').select('*').limit(6)
    setProducts(data || [])
    setLoading(false)
  }

  // FUNCIÓN PARA MANEJAR EL CLIC
  const handleAdd = async (product) => {
    setAddingId(product.id) // Ponemos el botón en modo "pensando"
    
    const result = await addToCart(product)
    
    if (result.error) {
      alert(result.error) // O redirigir a login
      if(result.error.includes('iniciar')) navigate('/login')
    }
    
    // Quitamos el modo "pensando" después de medio segundo
    setTimeout(() => setAddingId(null), 500)
  }

  if (loading) return <div className="text-center py-10"><Loader className="animate-spin inline text-cherry-red"/></div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product.id} className="group relative bg-white rounded-[2rem] border border-pink-50 hover:border-pink-200 shadow-sm hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
          
          {/* Imagen ... (Igual que antes) */}
          <div className="relative h-64 overflow-hidden bg-gray-50">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"/>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm font-kawaii text-xl text-cherry-dark">${product.price}</div>
          </div>

          <div className="p-6 text-center">
            <h3 className="font-kawaii text-3xl text-gray-800 mb-2 truncate">{product.name}</h3>
            <p className="font-body text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">
              {product.description || "Aroma dulce y relajante..."}
            </p>

            {/* BOTÓN REAL */}
            <button 
              className={`w-full font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-kawaii text-xl tracking-wide
                ${addingId === product.id 
                  ? 'bg-green-400 text-white border-2 border-green-400 scale-95' // Estilo de éxito
                  : 'bg-cherry-bg text-cherry-red border-2 border-cherry-pink hover:bg-cherry-red hover:text-white'
                }
              `}
              onClick={() => handleAdd(product)}
              disabled={addingId === product.id}
            >
              {addingId === product.id ? (
                <> <Check size={20} /> <span>¡Agregado!</span> </>
              ) : (
                <> <ShoppingBag size={20} /> <span>Lo quiero</span> </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}