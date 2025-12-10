import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { useCart } from '../context/CartContext'
import { Search, ShoppingBag, Check, Loader } from 'lucide-react'

// Categorías "quemadas" en código (luego podríamos sacarlas de la DB si quisieras)
const CATEGORIES = ["Todas", "Relajante", "Dulce", "Frutal", "Floral"]

export default function Store() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [searchTerm, setSearchTerm] = useState("")
  const [addingId, setAddingId] = useState(null) // Para animación del botón

  const { addToCart } = useCart()

  useEffect(() => {
    fetchAllProducts()
  }, [])

  async function fetchAllProducts() {
    // Traemos TODO sin límite
    const { data } = await supabase.from('products').select('*')
    setProducts(data || [])
    setLoading(false)
  }

  const handleAdd = async (product) => {
    setAddingId(product.id)
    await addToCart(product)
    setTimeout(() => setAddingId(null), 500)
  }

  // Lógica de Filtrado (Magia pura ✨)
  const filteredProducts = products.filter(product => {
    // 1. Filtro por Categoría
    const matchesCategory = selectedCategory === "Todas" || product.scent === selectedCategory || product.coleccion === selectedCategory
    // 2. Filtro por Buscador (Nombre)
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* HEADER DE LA TIENDA */}
      <div className="bg-cherry-bg pt-12 pb-16 px-4 text-center rounded-b-[3rem] mb-12 relative overflow-hidden">
        {/* Círculo decorativo */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <h1 className="font-kawaii text-6xl text-cherry-dark mb-4 relative z-10">
          Nuestro Catálogo 🕯️
        </h1>
        <p className="font-body text-gray-500 text-lg max-w-xl mx-auto relative z-10">
          Explora todas nuestras creaciones. Usa los filtros para encontrar tu aroma ideal.
        </p>

        {/* BARRA DE BÚSQUEDA */}
        <div className="max-w-md mx-auto mt-8 relative z-10">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-cherry-pink" size={24} />
            <input 
              type="text" 
              placeholder="¿Qué aroma buscas hoy?" 
              className="w-full pl-12 pr-6 py-3 rounded-full border-2 border-pink-100 focus:border-cherry-pink focus:outline-none font-body text-gray-600 shadow-sm transition-all focus:shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        
        {/* FILTROS (Botones Pastilla) */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold font-kawaii text-2xl transition-all duration-300 border-2 
                ${selectedCategory === cat 
                  ? 'bg-cherry-red text-white border-cherry-red shadow-lg shadow-pink-200 scale-105' 
                  : 'bg-white text-gray-400 border-gray-100 hover:border-pink-200 hover:text-cherry-red'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRILLA DE PRODUCTOS */}
        {loading ? (
          <div className="flex justify-center h-40"><Loader className="animate-spin text-cherry-red" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-[2rem] border border-pink-50 hover:border-pink-200 shadow-sm hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col">
                
                {/* Imagen */}
                <div className="relative h-56 overflow-hidden bg-gray-50">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"/>
                  {/* Precio Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm font-kawaii text-xl text-cherry-dark">
                    ${product.price}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 text-center flex-grow flex flex-col">
                  <span className="text-xs font-bold text-cherry-pink uppercase tracking-wider mb-1">
                    {product.scent || "General"}
                  </span>
                  <h3 className="font-kawaii text-3xl text-gray-800 mb-2 leading-none">{product.name}</h3>
                  <div className="flex-grow"></div> {/* Empuja el botón al fondo */}
                  
                  {/* Botón */}
                  <button 
                    className={`w-full font-bold py-2 mt-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-kawaii text-xl tracking-wide
                      ${addingId === product.id 
                        ? 'bg-green-100 text-green-600 border-2 border-green-200' 
                        : 'bg-cherry-bg text-cherry-red border-2 border-cherry-pink hover:bg-cherry-red hover:text-white'
                      }
                    `}
                    onClick={() => handleAdd(product)}
                    disabled={addingId === product.id}
                  >
                     {addingId === product.id ? <Check size={20}/> : <ShoppingBag size={20}/>}
                     {addingId === product.id ? "¡Listo!" : "Agregar"}
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-20">
                <p className="font-kawaii text-4xl text-gray-300">No encontramos velas con ese aroma 😢</p>
                <button onClick={() => {setSelectedCategory("Todas"); setSearchTerm("")}} className="mt-4 text-cherry-red underline font-bold">
                  Ver todo de nuevo
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}